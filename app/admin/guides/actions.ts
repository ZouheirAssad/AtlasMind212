"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin-auth";
import {
  GUIDE_ASSETS_BUCKET,
  GUIDE_PDF_MAX_BYTES,
  GUIDE_PDF_TYPES,
  GUIDE_THUMBNAIL_MAX_BYTES,
  GUIDE_THUMBNAIL_TYPES,
  getAdminGuideById,
  slugifyGuide,
  type GuideStatus,
} from "@/lib/guides";
import { createAdminClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { guideMetadataSchema } from "@/lib/validations";

function redirectToGuides(params: Record<string, string>): never {
  const searchParams = new URLSearchParams(params);
  redirect(`/admin/guides?${searchParams.toString()}`);
}

function getFile(formData: FormData, field: string) {
  const value = formData.get(field);
  return value instanceof File && value.size > 0 ? value : null;
}

function getString(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function validateFile(
  file: File | null,
  {
    required,
    maxBytes,
    allowedTypes,
    label,
  }: {
    required: boolean;
    maxBytes: number;
    allowedTypes: readonly string[];
    label: string;
  },
) {
  if (!file) {
    return required ? `${label} is required.` : null;
  }

  if (!allowedTypes.includes(file.type)) {
    return `${label} must be ${allowedTypes.join(", ")}.`;
  }

  if (file.size > maxBytes) {
    return `${label} must be smaller than ${Math.round(maxBytes / 1024 / 1024)} MB.`;
  }

  return null;
}

function extensionForFile(file: File) {
  const mimeExtensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "application/pdf": "pdf",
  };
  const mimeExtension = mimeExtensions[file.type];
  if (mimeExtension) return mimeExtension;

  const fileExtension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return fileExtension || "bin";
}

async function ensureUniqueSlug(desiredSlug: string, existingId?: string) {
  const supabase = createAdminClient();
  const baseSlug = slugifyGuide(desiredSlug);

  for (let index = 0; index < 100; index += 1) {
    const suffix = index === 0 ? "" : `-${index + 1}`;
    const candidate = `${baseSlug.slice(0, 90 - suffix.length)}${suffix}`;
    const { data, error } = await supabase
      .from("guides")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();

    if (error) throw error;
    if (!data || data.id === existingId) return candidate;
  }

  return `${baseSlug.slice(0, 81)}-${crypto.randomUUID().slice(0, 8)}`;
}

async function uploadGuideAsset(file: File, folder: "thumbnails" | "pdfs", slug: string) {
  const supabase = createAdminClient();
  const extension = extensionForFile(file);
  const path = `${folder}/${slug}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(GUIDE_ASSETS_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });

  if (error) throw error;

  return path;
}

async function removeGuideAssets(paths: Array<string | null | undefined>) {
  const cleanPaths = paths.filter((path): path is string => Boolean(path));
  if (!cleanPaths.length) return;

  const supabase = createAdminClient();
  await supabase.storage.from(GUIDE_ASSETS_BUCKET).remove(cleanPaths);
}

function parseGuideMetadata(formData: FormData) {
  return guideMetadataSchema.safeParse({
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    description: getString(formData, "description"),
    thumbnailAlt: getString(formData, "thumbnailAlt"),
    status: getString(formData, "status") || "draft",
    contentType: getString(formData, "contentType") || "article",
    articleBody: getString(formData, "articleBody"),
    metaTitle: getString(formData, "metaTitle"),
    metaDescription: getString(formData, "metaDescription"),
    canonicalSlug: getString(formData, "canonicalSlug"),
    hasAffiliateLinks: formData.get("hasAffiliateLinks") === "on",
    isSponsored: formData.get("isSponsored") === "on",
    sponsorName: getString(formData, "sponsorName"),
    disclosureNote: getString(formData, "disclosureNote"),
    gateType: getString(formData, "gateType") || "hard",
  });
}

function publishedAtFor(status: GuideStatus, currentPublishedAt?: string | null) {
  return status === "published" ? currentPublishedAt ?? new Date().toISOString() : null;
}

export async function createGuide(formData: FormData) {
  await requireAdminUser();

  const parsed = parseGuideMetadata(formData);
  if (!parsed.success) {
    redirectToGuides({ error: parsed.error.issues[0]?.message ?? "Please check the content fields." });
  }

  const thumbnail = getFile(formData, "thumbnail");
  const pdf = getFile(formData, "pdf");
  const thumbnailError = validateFile(thumbnail, {
    required: false,
    maxBytes: GUIDE_THUMBNAIL_MAX_BYTES,
    allowedTypes: GUIDE_THUMBNAIL_TYPES,
    label: "Thumbnail",
  });
  const pdfError = validateFile(pdf, {
    required: false,
    maxBytes: GUIDE_PDF_MAX_BYTES,
    allowedTypes: GUIDE_PDF_TYPES,
    label: "PDF",
  });

  if (thumbnailError || pdfError) {
    redirectToGuides({ error: thumbnailError ?? pdfError ?? "Please upload valid files." });
  }

  const supabase = createAdminClient();
  const slug = await ensureUniqueSlug(parsed.data.slug || parsed.data.title);
  const uploadedPaths: string[] = [];

  const thumbnailPath = thumbnail ? await uploadGuideAsset(thumbnail, "thumbnails", slug) : null;
  if (thumbnailPath) uploadedPaths.push(thumbnailPath);
  const pdfPath = pdf ? await uploadGuideAsset(pdf, "pdfs", slug) : null;
  if (pdfPath) uploadedPaths.push(pdfPath);

  const now = new Date().toISOString();
  const { error } = await supabase.from("guides").insert({
    slug,
    title: parsed.data.title,
    description: parsed.data.description,
    thumbnail_path: thumbnailPath,
    thumbnail_alt: parsed.data.thumbnailAlt || null,
    pdf_path: pdfPath,
    status: parsed.data.status,
    published_at: publishedAtFor(parsed.data.status),
    created_at: now,
    updated_at: now,
    content_type: parsed.data.contentType,
    article_body: parsed.data.articleBody || null,
    meta_title: parsed.data.metaTitle || null,
    meta_description: parsed.data.metaDescription || null,
    canonical_slug: parsed.data.canonicalSlug || null,
    has_affiliate_links: parsed.data.hasAffiliateLinks,
    is_sponsored: parsed.data.isSponsored,
    sponsor_name: parsed.data.sponsorName || null,
    disclosure_note: parsed.data.disclosureNote || null,
    gate_type: parsed.data.gateType,
  });

  if (error) {
    await removeGuideAssets(uploadedPaths);
    redirectToGuides({ error: "Unable to create the content item. Please try again." });
  }

  revalidatePath("/blog");
  revalidatePath("/admin/guides");
  redirectToGuides({ message: "Content item created." });
}

export async function updateGuide(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");
  if (!id) redirectToGuides({ error: "Missing content id." });

  const current = await getAdminGuideById(id);
  if (!current) redirectToGuides({ error: "Content item not found." });

  const parsed = parseGuideMetadata(formData);
  if (!parsed.success) {
    redirectToGuides({ error: parsed.error.issues[0]?.message ?? "Please check the content fields." });
  }

  const thumbnail = getFile(formData, "thumbnail");
  const pdf = getFile(formData, "pdf");
  const thumbnailError = validateFile(thumbnail, {
    required: false,
    maxBytes: GUIDE_THUMBNAIL_MAX_BYTES,
    allowedTypes: GUIDE_THUMBNAIL_TYPES,
    label: "Thumbnail",
  });
  const pdfError = validateFile(pdf, {
    required: false,
    maxBytes: GUIDE_PDF_MAX_BYTES,
    allowedTypes: GUIDE_PDF_TYPES,
    label: "PDF",
  });

  if (thumbnailError || pdfError) {
    redirectToGuides({ error: thumbnailError ?? pdfError ?? "Please check the uploaded files." });
  }

  const supabase = createAdminClient();
  const slug = await ensureUniqueSlug(parsed.data.slug || parsed.data.title, current.id);
  const uploadedPaths: string[] = [];
  const thumbnailPath = thumbnail ? await uploadGuideAsset(thumbnail, "thumbnails", slug) : current.thumbnail_path;
  if (thumbnail && thumbnailPath) uploadedPaths.push(thumbnailPath);
  const pdfPath = pdf ? await uploadGuideAsset(pdf, "pdfs", slug) : current.pdf_path;
  if (pdf && pdfPath) uploadedPaths.push(pdfPath);

  const { error } = await supabase
    .from("guides")
    .update({
      slug,
      title: parsed.data.title,
      description: parsed.data.description,
      thumbnail_path: thumbnailPath,
      thumbnail_alt: parsed.data.thumbnailAlt || null,
      pdf_path: pdfPath,
      status: parsed.data.status,
      published_at: publishedAtFor(parsed.data.status, current.published_at),
      updated_at: new Date().toISOString(),
      content_type: parsed.data.contentType,
      article_body: parsed.data.articleBody || null,
      meta_title: parsed.data.metaTitle || null,
      meta_description: parsed.data.metaDescription || null,
      canonical_slug: parsed.data.canonicalSlug || null,
      has_affiliate_links: parsed.data.hasAffiliateLinks,
      is_sponsored: parsed.data.isSponsored,
      sponsor_name: parsed.data.sponsorName || null,
      disclosure_note: parsed.data.disclosureNote || null,
      gate_type: parsed.data.gateType,
    })
    .eq("id", current.id);

  if (error) {
    await removeGuideAssets(uploadedPaths);
    redirectToGuides({ error: "Unable to update the content item. Please try again." });
  }

  await removeGuideAssets([
    thumbnail ? current.thumbnail_path : null,
    pdf ? current.pdf_path : null,
  ]);

  revalidatePath("/blog");
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/guides");
  redirectToGuides({ message: "Content item updated." });
}

export async function toggleGuideStatus(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");
  const current = id ? await getAdminGuideById(id) : null;
  if (!current) redirectToGuides({ error: "Guide not found." });

  const nextStatus: GuideStatus = current.status === "published" ? "draft" : "published";
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("guides")
    .update({
      status: nextStatus,
      published_at: publishedAtFor(nextStatus, current.published_at),
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id);

  if (error) redirectToGuides({ error: "Unable to change guide status." });

  revalidatePath("/blog");
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath("/admin/guides");
  redirectToGuides({ message: nextStatus === "published" ? "Guide published." : "Guide moved to draft." });
}

export async function deleteGuide(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");
  const current = id ? await getAdminGuideById(id) : null;
  if (!current) redirectToGuides({ error: "Guide not found." });

  const supabase = createAdminClient();
  const { error } = await supabase.from("guides").delete().eq("id", current.id);
  if (error) redirectToGuides({ error: "Unable to delete the guide." });

  await removeGuideAssets([current.thumbnail_path, current.pdf_path]);

  revalidatePath("/blog");
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath("/admin/guides");
  redirectToGuides({ message: "Guide deleted." });
}

export async function signOutAdmin() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
