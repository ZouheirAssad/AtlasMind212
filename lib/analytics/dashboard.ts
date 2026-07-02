import "server-only";

import { createAdminClient } from "@/lib/supabase/server";
import {
  type AnalyticsDashboardData,
  type AnalyticsRange,
  type AnalyticsRangeKey,
  type BreakdownRow,
  type RecentEventRow,
  type SourceStatus,
  type TrendPoint,
} from "@/lib/analytics/types";
import { getVercelAnalytics } from "@/lib/analytics/vercel";

type AnalyticsEventRow = {
  id: string;
  event_name: string;
  occurred_at: string;
  path: string | null;
  guide_slug: string | null;
  guide_title: string | null;
  metadata: Record<string, unknown> | null;
};

type VercelDrainEventRow = {
  id: string;
  occurred_at: string;
  event_type: string;
  event_name: string | null;
  path: string | null;
  route: string | null;
};

type VercelAnalyticsData = Awaited<ReturnType<typeof getVercelAnalytics>>;
type CountableTable = "analytics_events" | "contact_messages" | "leads" | "vercel_analytics_events";

const RANGE_OPTIONS: Record<AnalyticsRangeKey, { label: string; days: number | null }> = {
  "7d": { label: "7 days", days: 7 },
  "30d": { label: "30 days", days: 30 },
  "90d": { label: "90 days", days: 90 },
  all: { label: "All tracked", days: null },
};

function normalizeRange(value?: string): AnalyticsRangeKey {
  return value === "7d" || value === "90d" || value === "all" ? value : "30d";
}

export function resolveAnalyticsRange(value?: string): AnalyticsRange {
  const key = normalizeRange(value);
  const until = new Date();
  const option = RANGE_OPTIONS[key];
  const since = option.days
    ? new Date(until.getTime() - option.days * 24 * 60 * 60 * 1000).toISOString()
    : null;

  return {
    key,
    label: option.label,
    since,
    until: until.toISOString(),
  };
}

function getTrendSince(range: AnalyticsRange) {
  return (
    range.since ??
    new Date(new Date(range.until).getTime() - 365 * 24 * 60 * 60 * 1000).toISOString()
  );
}

function getDayKey(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

function formatShortDate(dayKey: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dayKey}T00:00:00.000Z`));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function toNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function vercelBreakdown(
  rows: Array<Record<string, string | number | null | undefined>>,
  field: string,
  metric: "pageviews" | "visitors" | "count" = "pageviews",
): BreakdownRow[] {
  return rows
    .map((row) => ({
      label: String(row[field] ?? "Direct / unknown"),
      value: toNumber(row[metric]),
      secondary: metric === "pageviews" ? `${toNumber(row.visitors)} visitors` : undefined,
      href: field === "requestPath" && typeof row[field] === "string" ? String(row[field]) : undefined,
    }))
    .filter((row) => row.value > 0 && row.label !== "null")
    .slice(0, 8);
}

function increment(map: Map<string, number>, key: string, value = 1) {
  map.set(key, (map.get(key) ?? 0) + value);
}

async function countRows(
  table: CountableTable,
  since: string | null,
  dateColumn: "created_at" | "occurred_at",
) {
  const supabase = createAdminClient();
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (since) query = query.gte(dateColumn, since);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function countAnalyticsEvent(eventName: string, since: string | null) {
  const supabase = createAdminClient();
  let query = supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .eq("event_name", eventName);
  if (since) query = query.gte("occurred_at", since);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function getAnalyticsEvents(range: AnalyticsRange) {
  const supabase = createAdminClient();
  const since = range.key === "all" ? getTrendSince(range) : range.since;
  let query = supabase
    .from("analytics_events")
    .select("id,event_name,occurred_at,path,guide_slug,guide_title,metadata")
    .order("occurred_at", { ascending: false })
    .limit(10000);
  if (since) query = query.gte("occurred_at", since);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as AnalyticsEventRow[];
}

async function getDrainEvents(range: AnalyticsRange) {
  const supabase = createAdminClient();
  const since = range.key === "all" ? getTrendSince(range) : range.since;
  let query = supabase
    .from("vercel_analytics_events")
    .select("id,occurred_at,event_type,event_name,path,route")
    .order("occurred_at", { ascending: false })
    .limit(100);
  if (since) query = query.gte("occurred_at", since);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as VercelDrainEventRow[];
}

function buildTrends(
  range: AnalyticsRange,
  vercelRows: Array<Record<string, string | number | null | undefined>>,
  events: AnalyticsEventRow[],
) {
  const points = new Map<string, TrendPoint>();

  function ensurePoint(dayKey: string) {
    if (!points.has(dayKey)) {
      points.set(dayKey, {
        date: dayKey,
        label: formatShortDate(dayKey),
        pageviews: 0,
        visitors: 0,
        downloads: 0,
      });
    }
    return points.get(dayKey)!;
  }

  if (range.key !== "all") {
    const start = new Date(getTrendSince(range));
    const end = new Date(range.until);
    for (let cursor = start; cursor <= end; cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000)) {
      ensurePoint(cursor.toISOString().slice(0, 10));
    }
  }

  vercelRows.forEach((row) => {
    if (typeof row.timestamp !== "string") return;
    const point = ensurePoint(getDayKey(row.timestamp));
    point.pageviews = toNumber(row.pageviews);
    point.visitors = toNumber(row.visitors);
  });

  events
    .filter((event) => event.event_name === "guide_downloaded" || event.event_name === "gated_download_completed")
    .forEach((event) => {
      ensurePoint(getDayKey(event.occurred_at)).downloads += 1;
    });

  return [...points.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function buildTopGuides(events: AnalyticsEventRow[]) {
  const counts = new Map<string, number>();
  const titles = new Map<string, string>();

  events
    .filter((event) => event.event_name === "guide_downloaded" || event.event_name === "gated_download_completed")
    .forEach((event) => {
      const slug = event.guide_slug ?? "unknown-guide";
      increment(counts, slug);
      titles.set(slug, event.guide_title ?? slug);
    });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([slug, value]) => ({
      label: titles.get(slug) ?? slug,
      value,
      secondary: `/${slug}`,
      href: slug === "unknown-guide" ? undefined : `/blog/${slug}`,
    }));
}

async function getTopLeadContent(since: string | null): Promise<BreakdownRow[]> {
  const supabase = createAdminClient();
  let query = supabase
    .from("leads")
    .select("content_slug, content_title");
  if (since) query = query.gte("created_at", since);
  const { data, error } = await query;
  if (error) throw error;

  const counts = new Map<string, number>();
  const titles = new Map<string, string>();

  (data ?? []).forEach((row) => {
    if (!row.content_slug) return;
    const slug = row.content_slug;
    const title = row.content_title || slug;
    increment(counts, slug);
    titles.set(slug, title);
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([slug, value]) => ({
      label: titles.get(slug) ?? slug,
      value,
      secondary: `/${slug}`,
      href: `/blog/${slug}`,
    }));
}

function buildRecentEvents(events: AnalyticsEventRow[], drainEvents: VercelDrainEventRow[]) {
  const supabaseEvents: RecentEventRow[] = events.slice(0, 12).map((event) => ({
    id: event.id,
    eventName: event.event_name,
    occurredAt: formatDateTime(event.occurred_at),
    path: event.path,
    guideTitle: event.guide_title,
    guideSlug: event.guide_slug,
    source: "supabase",
  }));

  const vercelEvents: RecentEventRow[] = drainEvents.slice(0, 8).map((event) => ({
    id: event.id,
    eventName: event.event_name ?? event.event_type,
    occurredAt: formatDateTime(event.occurred_at),
    path: event.path ?? event.route,
    guideTitle: null,
    guideSlug: null,
    source: "vercel-drain",
  }));

  return [...supabaseEvents, ...vercelEvents].slice(0, 16);
}

function sourceStatus(
  id: SourceStatus["id"],
  label: string,
  state: SourceStatus["state"],
  message: string,
): SourceStatus {
  return { id, label, state, message };
}

function withTimeout<T>(promise: Promise<T>, label: string, timeoutMs = 6500) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new Error(`${label} timed out.`)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timeout) clearTimeout(timeout);
  });
}

function emptyVercelData(error: string): VercelAnalyticsData {
  return {
    available: false,
    partial: false,
    errors: [error],
    totals: {},
    guideViews: {},
    trafficTrend: [],
    topPages: [],
    topReferrers: [],
    countries: [],
    devices: [],
    utmSources: [],
    utmCampaigns: [],
    customEvents: [],
  };
}

export async function getAnalyticsDashboardData(range: AnalyticsRange): Promise<AnalyticsDashboardData> {
  const statuses: SourceStatus[] = [];
  let events: AnalyticsEventRow[] = [];
  let drainEvents: VercelDrainEventRow[] = [];
  let downloads = 0;
  let leads = 0;
  let contactMessages = 0;
  let topLeads: BreakdownRow[] = [];

  try {
    const [eventsData, downloadsNonGated, downloadsGated, leadsCount, contactCount, topLeadsData] = await withTimeout(
      Promise.all([
        getAnalyticsEvents(range),
        countAnalyticsEvent("guide_downloaded", range.since),
        countAnalyticsEvent("gated_download_completed", range.since),
        countRows("leads", range.since, "created_at"),
        countRows("contact_messages", range.since, "created_at"),
        getTopLeadContent(range.since),
      ]),
      "Supabase analytics",
    );
    events = eventsData;
    downloads = downloadsNonGated + downloadsGated;
    leads = leadsCount;
    contactMessages = contactCount;
    topLeads = topLeadsData;
    statuses.push(sourceStatus("supabase", "Supabase business logs", "ready", "Counts and recent events loaded."));
  } catch (error) {
    statuses.push(sourceStatus(
      "supabase",
      "Supabase business logs",
      "partial",
      error instanceof Error ? error.message : "Unable to load Supabase analytics.",
    ));
  }

  try {
    drainEvents = await withTimeout(getDrainEvents(range), "Vercel drain reads", 4500);
    statuses.push(sourceStatus(
      "vercel-drains",
      "Vercel Web Analytics Drains",
      process.env.VERCEL_ANALYTICS_DRAIN_SECRET ? "ready" : "not-configured",
      process.env.VERCEL_ANALYTICS_DRAIN_SECRET
        ? `${drainEvents.length} recent drain rows available.`
        : "Set VERCEL_ANALYTICS_DRAIN_SECRET and configure a Vercel Web Analytics Drain.",
    ));
  } catch (error) {
    statuses.push(sourceStatus(
      "vercel-drains",
      "Vercel Web Analytics Drains",
      process.env.VERCEL_ANALYTICS_DRAIN_SECRET ? "partial" : "not-configured",
      error instanceof Error ? error.message : "Drain rows are not available yet.",
    ));
  }

  let vercel = emptyVercelData("Vercel metrics are unavailable.");
  try {
    vercel = await withTimeout(getVercelAnalytics(range), "Vercel Analytics", 6500);
  } catch (error) {
    vercel = emptyVercelData(error instanceof Error ? error.message : "Vercel metrics are unavailable.");
  }

  const vercelState: SourceStatus["state"] = vercel.available
    ? "ready"
    : vercel.partial
      ? "partial"
      : vercel.errors.some((error) => error.includes("VERCEL_ANALYTICS_TOKEN"))
        ? "not-configured"
        : "unavailable";

  statuses.push(sourceStatus(
    "vercel-api",
    "Vercel Web Analytics API",
    vercelState,
    vercel.available
      ? "Visitors, pageviews, and traffic breakdowns loaded."
      : vercel.errors[0] ?? "Vercel metrics are unavailable.",
  ));

  const guidePageviews = toNumber(vercel.guideViews.pageviews);
  const guideConversionRate = guidePageviews > 0 ? downloads / guidePageviews : null;

  return {
    range,
    generatedAt: formatDateTime(new Date().toISOString()),
    kpis: {
      visitors: vercel.available || vercel.partial ? toNumber(vercel.totals.visitors) : null,
      pageviews: vercel.available || vercel.partial ? toNumber(vercel.totals.pageviews) : null,
      downloads,
      leads,
      contactMessages,
      guideConversionRate,
    },
    trends: buildTrends(range, vercel.trafficTrend, events),
    topGuides: buildTopGuides(events),
    topLeads,
    topPages: vercelBreakdown(vercel.topPages, "requestPath"),
    topReferrers: vercelBreakdown(vercel.topReferrers, "referrerHostname"),
    countries: vercelBreakdown(vercel.countries, "country"),
    devices: vercelBreakdown(vercel.devices, "deviceType"),
    utmSources: vercelBreakdown(vercel.utmSources, "utmSource"),
    utmCampaigns: vercelBreakdown(vercel.utmCampaigns, "utmCampaign"),
    recentEvents: buildRecentEvents(events, drainEvents),
    sourceStatuses: statuses,
  };
}
