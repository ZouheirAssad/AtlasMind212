import "server-only";

import { track } from "@vercel/analytics/server";
import { createAdminClient } from "@/lib/supabase/server";

type JsonPrimitive = string | number | boolean | null;
type AnalyticsMetadata = Record<string, JsonPrimitive>;

type RecordAnalyticsEventInput = {
  eventName:
    | "guide_downloaded"
    | "lead_submitted"
    | "contact_submitted"
    | "article_viewed"
    | "download_form_submitted"
    | "gated_download_completed";
  request?: Request;
  path?: string;
  route?: string;
  guide?: {
    id: string;
    slug: string;
    title: string;
  };
  metadata?: AnalyticsMetadata;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function trimValue(value: string | null | undefined, maxLength = 500) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function getRequestUrl(request?: Request) {
  if (!request) return null;

  try {
    return new URL(request.url);
  } catch {
    return null;
  }
}

function getUtmParams(url: URL | null) {
  return Object.fromEntries(
    UTM_KEYS.map((key) => [key, trimValue(url?.searchParams.get(key), 255)]),
  ) as Record<(typeof UTM_KEYS)[number], string | null>;
}

function toVercelProperties(input: RecordAnalyticsEventInput, path: string | null) {
  const properties: Record<string, JsonPrimitive> = {
    path,
    route: input.route ?? null,
    guide_slug: input.guide?.slug ?? null,
    guide_title: input.guide?.title?.slice(0, 255) ?? null,
    ...input.metadata,
  };

  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      key,
      typeof value === "string" ? value.slice(0, 255) : value,
    ]),
  );
}

export async function recordAnalyticsEvent(input: RecordAnalyticsEventInput) {
  const url = getRequestUrl(input.request);
  const path = input.path ?? url?.pathname ?? null;
  const referrer = trimValue(input.request?.headers.get("referer"));
  const utms = getUtmParams(url);
  const occurredAt = new Date().toISOString();

  await Promise.allSettled([
    writeSupabaseEvent({
      event_name: input.eventName,
      occurred_at: occurredAt,
      path,
      route: input.route ?? null,
      guide_id: input.guide?.id ?? null,
      guide_slug: input.guide?.slug ?? null,
      guide_title: input.guide?.title ?? null,
      referrer,
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_content: utms.utm_content,
      utm_term: utms.utm_term,
      metadata: input.metadata ?? {},
    }),
    writeVercelEvent(input, path),
  ]);
}

async function writeSupabaseEvent(row: {
  event_name: string;
  occurred_at: string;
  path: string | null;
  route: string | null;
  guide_id: string | null;
  guide_slug: string | null;
  guide_title: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  metadata: AnalyticsMetadata;
}) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("analytics_events").insert(row);
    if (error) throw error;
  } catch (error) {
    console.error("[analytics] Supabase event write failed:", error);
  }
}

async function writeVercelEvent(input: RecordAnalyticsEventInput, path: string | null) {
  try {
    await track(input.eventName, toVercelProperties(input, path), {
      request: input.request ? { headers: input.request.headers } : undefined,
    });
  } catch (error) {
    console.error("[analytics] Vercel event write failed:", error);
  }
}
