import "server-only";

import { createAdminClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

export const GUIDE_ASSETS_BUCKET = "guide-assets";
export const GUIDE_THUMBNAIL_MAX_BYTES = 5 * 1024 * 1024;
export const GUIDE_PDF_MAX_BYTES = 25 * 1024 * 1024;
export const GUIDE_THUMBNAIL_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const GUIDE_PDF_TYPES = ["application/pdf"] as const;

export type GuideStatus = "draft" | "published";

export type Guide = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_path: string;
  thumbnail_alt: string | null;
  pdf_path: string;
  status: GuideStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const GUIDE_SELECT =
  "id, slug, title, description, thumbnail_path, thumbnail_alt, pdf_path, status, published_at, created_at, updated_at";

function isMissingGuidesTableError(error: { code?: string; message?: string } | null) {
  return error?.code === "PGRST205" || /Could not find the table 'public\.guides'/i.test(error?.message ?? "");
}

function mapGuide(row: Record<string, unknown>): Guide {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: String(row.description),
    thumbnail_path: String(row.thumbnail_path),
    thumbnail_alt: row.thumbnail_alt ? String(row.thumbnail_alt) : null,
    pdf_path: String(row.pdf_path),
    status: row.status === "published" ? "published" : "draft",
    published_at: row.published_at ? String(row.published_at) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function slugifyGuide(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

  return slug || "guide";
}

export async function listPublishedGuides() {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("guides")
    .select(GUIDE_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (isMissingGuidesTableError(error)) return [];
  if (error) throw error;

  return (data ?? []).map((row) => mapGuide(row));
}

export async function listAdminGuides() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guides")
    .select(GUIDE_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => mapGuide(row));
}

export async function getPublishedGuideBySlug(slug: string) {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("guides")
    .select(GUIDE_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (isMissingGuidesTableError(error)) return null;
  if (error) throw error;

  return data ? mapGuide(data) : null;
}

export async function getAdminGuideById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guides")
    .select(GUIDE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data ? mapGuide(data) : null;
}

export function getGuideThumbnailUrl(guide: Guide) {
  const supabase = createPublicClient();
  return supabase.storage.from(GUIDE_ASSETS_BUCKET).getPublicUrl(guide.thumbnail_path).data.publicUrl;
}

export function getGuidePdfUrl(guide: Guide) {
  const supabase = createPublicClient();
  return supabase.storage
    .from(GUIDE_ASSETS_BUCKET)
    .getPublicUrl(guide.pdf_path, { download: `${guide.slug}.pdf` }).data.publicUrl;
}
