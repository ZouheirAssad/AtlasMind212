import "server-only";

import { createAdminClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

export const GUIDE_ASSETS_BUCKET = "guide-assets";
export const GUIDE_THUMBNAIL_MAX_BYTES = 5 * 1024 * 1024;
export const GUIDE_PDF_MAX_BYTES = 25 * 1024 * 1024;
export const GUIDE_THUMBNAIL_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const GUIDE_PDF_TYPES = ["application/pdf"] as const;

export type GuideStatus = "draft" | "published";

type GuideBase = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_path: string | null;
  thumbnail_alt: string | null;
  status: GuideStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  content_type: "article" | "guide";
  article_body: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_slug: string | null;
  has_affiliate_links: boolean;
  is_sponsored: boolean;
  sponsor_name: string | null;
  disclosure_note: string | null;
  gate_type: "hard" | "soft" | "none";
};

/** Public-safe guide: never exposes raw storage paths. */
export type Guide = GuideBase & {
  hasPdf: boolean;
};

/** Admin/full guide variant with raw storage paths for management. */
export type AdminGuide = GuideBase & {
  pdf_path: string | null;
};

const PUBLIC_GUIDE_SELECT =
  "id, slug, title, description, thumbnail_path, thumbnail_alt, status, published_at, created_at, updated_at, content_type, article_body, meta_title, meta_description, canonical_slug, has_affiliate_links, is_sponsored, sponsor_name, disclosure_note, gate_type, has_pdf";

const ADMIN_GUIDE_SELECT = `${PUBLIC_GUIDE_SELECT}, pdf_path`;

function isMissingGuidesTableError(error: { code?: string; message?: string } | null) {
  return error?.code === "PGRST205" || /Could not find the table 'public\.guides'/i.test(error?.message ?? "");
}

function isColumnMissingError(error: { code?: string; message?: string } | null) {
  return error?.code === "42703" || /column .* does not exist|undefined_column/i.test(error?.message ?? "");
}

function isRecoverableReadError(error: unknown) {
  if (!error) return false;
  const code = (error as { code?: string })?.code;
  const message = (error as { message?: string })?.message ?? "";
  if (isColumnMissingError({ code, message })) return true;
  // Missing table is a config state, not a connectivity failure — treat as empty.
  if (code === "PGRST205" || /Could not find the table 'public\.guides'/i.test(message)) return false;
  // Network / connectivity / config errors that should degrade gracefully.
  const recoverableCodes = [
    "PGRST116", // Relation not found (config)
    "57014",    // query cancelled
    "ETIMEDOUT",
    "ECONNRESET",
    "ECONNREFUSED",
    "EAI_AGAIN",
    "ENOTFOUND",
  ];
  if (code && recoverableCodes.includes(code)) return true;
  return /fetch failed|network error|getaddrinfo|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|ECONNRESET|invalid api key|Invalid API key|incorrect endpoint|JWSError|JWT/i.test(message);
}

function logReadError(operation: string, error: unknown) {
  const code = (error as { code?: string })?.code;
  const message = (error as { message?: string })?.message ?? String(error);

  if (isColumnMissingError({ code, message })) {
    console.error(
      `[guides] Schema drift suspected during ${operation}: Postgres 42703 / undefined_column. ` +
        `Verify all required columns exist on public.guides (content_type, gate_type, article_body, meta_title, meta_description, canonical_slug, has_affiliate_links, is_sponsored, sponsor_name, disclosure_note, has_pdf) and public.leads (content_slug, content_title), and that the latest migration is applied.`,
      { code, message: message.split("\n")[0] },
    );
    return;
  }

  console.error(`[guides] Read failure during ${operation}:`, { code, message: message.split("\n")[0] });
}

export type GuideListResult =
  | { status: "ok"; guides: Guide[] }
  | { status: "unavailable" };

export type GuideReadResult =
  | { status: "ok"; guide: Guide | null }
  | { status: "unavailable" };

export type AdminGuideListResult =
  | { status: "ok"; guides: AdminGuide[] }
  | { status: "schema-drift"; message: string }
  | { status: "unavailable"; message: string };

const CMS_SCHEMA_DRIFT_MESSAGE =
  "The CMS database schema is missing required content columns. Apply supabase/migrations/20260702190000_fix_cms_monetization_columns.sql to the active Supabase database, then reload this page.";

function mapGuideBase(row: Record<string, unknown>): GuideBase {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: String(row.description),
    thumbnail_path: row.thumbnail_path ? String(row.thumbnail_path) : null,
    thumbnail_alt: row.thumbnail_alt ? String(row.thumbnail_alt) : null,
    status: row.status === "published" ? "published" : "draft",
    published_at: row.published_at ? String(row.published_at) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    content_type: row.content_type === "guide" ? "guide" : "article",
    article_body: row.article_body ? String(row.article_body) : null,
    meta_title: row.meta_title ? String(row.meta_title) : null,
    meta_description: row.meta_description ? String(row.meta_description) : null,
    canonical_slug: row.canonical_slug ? String(row.canonical_slug) : null,
    has_affiliate_links: Boolean(row.has_affiliate_links),
    is_sponsored: Boolean(row.is_sponsored),
    sponsor_name: row.sponsor_name ? String(row.sponsor_name) : null,
    disclosure_note: row.disclosure_note ? String(row.disclosure_note) : null,
    gate_type: (row.gate_type === "soft" ? "soft" : row.gate_type === "none" ? "none" : "hard") as "hard" | "soft" | "none",
  };
}

function mapPublicGuide(row: Record<string, unknown>): Guide {
  return { ...mapGuideBase(row), hasPdf: Boolean(row.has_pdf) };
}

function mapAdminGuide(row: Record<string, unknown>): AdminGuide {
  return { ...mapGuideBase(row), pdf_path: row.pdf_path ? String(row.pdf_path) : null };
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
    .select(PUBLIC_GUIDE_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (isMissingGuidesTableError(error)) return [];
  if (error) {
    logReadError("listPublishedGuides", error);
    throw error;
  }

  return (data ?? []).map((row) => mapPublicGuide(row));
}

/**
 * Recoverable list read for public surfaces (blog index, sitemap).
 * Returns `{ status: "unavailable" }` when a connectivity/config/network
 * error prevents reading, instead of throwing. A missing guides table is
 * treated as an empty result (`{ status: "ok", guides: [] }`).
 */
export async function listPublishedGuidesRecoverable(): Promise<GuideListResult> {
  try {
    return { status: "ok", guides: await listPublishedGuides() };
  } catch (error) {
    logReadError("listPublishedGuidesRecoverable", error);
    if (isRecoverableReadError(error)) return { status: "unavailable" };
    throw error;
  }
}

export async function listAdminGuides() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guides")
    .select(ADMIN_GUIDE_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    logReadError("listAdminGuides", error);
    throw error;
  }

  return (data ?? []).map((row) => mapAdminGuide(row));
}

export async function listAdminGuidesRecoverable(): Promise<AdminGuideListResult> {
  try {
    return { status: "ok", guides: await listAdminGuides() };
  } catch (error) {
    const code = (error as { code?: string })?.code;
    const message = (error as { message?: string })?.message ?? "";

    if (isColumnMissingError({ code, message })) {
      return { status: "schema-drift", message: CMS_SCHEMA_DRIFT_MESSAGE };
    }

    return {
      status: "unavailable",
      message: "The CMS content library could not be loaded right now. Check the server logs and Supabase connection, then reload this page.",
    };
  }
}

export async function getPublishedGuideBySlug(slug: string) {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("guides")
    .select(PUBLIC_GUIDE_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (isMissingGuidesTableError(error)) return null;
  if (error) {
    logReadError("getPublishedGuideBySlug", error);
    throw error;
  }

  return data ? mapPublicGuide(data) : null;
}

/**
 * Recoverable single-guide read for public surfaces (blog detail, download).
 * Returns `{ status: "unavailable" }` for connectivity/config/network errors
 * instead of throwing so callers can render a noindex unavailable state.
 */
export async function getPublishedGuideBySlugRecoverable(slug: string): Promise<GuideReadResult> {
  try {
    return { status: "ok", guide: await getPublishedGuideBySlug(slug) };
  } catch (error) {
    logReadError("getPublishedGuideBySlugRecoverable", error);
    if (isRecoverableReadError(error)) return { status: "unavailable" };
    throw error;
  }
}

export async function getAdminGuideById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guides")
    .select(ADMIN_GUIDE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    logReadError("getAdminGuideById", error);
    throw error;
  }

  return data ? mapAdminGuide(data) : null;
}

export async function getAdminGuideBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guides")
    .select(ADMIN_GUIDE_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    logReadError("getAdminGuideBySlug", error);
    throw error;
  }

  return data ? mapAdminGuide(data) : null;
}

async function createSignedAssetUrl(
  path: string,
  expiresInSeconds: number,
  options?: { download?: string | boolean },
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(GUIDE_ASSETS_BUCKET)
    .createSignedUrl(path, expiresInSeconds, options);

  if (error) {
    console.error(`[guides] Failed to create signed URL for ${path}:`, error);
    return "";
  }

  return data.signedUrl;
}

export async function getGuideThumbnailUrl(guide: { thumbnail_path: string | null }) {
  if (!guide.thumbnail_path) return "";
  return createSignedAssetUrl(guide.thumbnail_path, 60 * 60 * 24);
}

export async function getAdminGuidePdfUrl(guide: AdminGuide) {
  if (!guide.pdf_path) return "";
  return createSignedAssetUrl(guide.pdf_path, 60 * 60, { download: `${guide.slug}.pdf` });
}

export async function createSignedPdfDownloadUrl(
  guide: { slug: string; pdf_path: string | null },
  expiresInSeconds = 300,
) {
  if (!guide.pdf_path) return null;
  const url = await createSignedAssetUrl(guide.pdf_path, expiresInSeconds, { download: `${guide.slug}.pdf` });
  return url || null;
}
