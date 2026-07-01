import "server-only";

type VercelCountData = {
  pageviews?: number;
  visitors?: number;
  count?: number;
};

type VercelRow = Record<string, string | number | null | undefined>;

type CachedValue<T> = {
  expiresAt: number;
  value: T;
};

type QueryResult<T> =
  | { ok: true; data: T; error: null }
  | { ok: false; data: T; error: string };

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, CachedValue<unknown>>();

function getVercelConfig() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const slug = process.env.VERCEL_TEAM_SLUG;

  if (!token || !projectId) {
    return {
      ok: false as const,
      message: "Set VERCEL_ANALYTICS_TOKEN and VERCEL_PROJECT_ID to enable Vercel metrics.",
    };
  }

  return { ok: true as const, token, projectId, teamId, slug };
}

function getCached<T>(key: string) {
  const cached = cache.get(key);
  if (!cached || cached.expiresAt < Date.now()) return null;
  return cached.value as T;
}

function setCached<T>(key: string, value: T) {
  cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, value });
  return value;
}

function quoteOdata(value: string) {
  return `'${value.replaceAll("'", "''")}'`;
}

export function odataEquals(field: string, value: string) {
  return `${field} eq ${quoteOdata(value)}`;
}

async function queryVercel<T>(
  endpoint: "visits/count" | "visits/aggregate" | "events/count" | "events/aggregate",
  params: {
    since?: string | null;
    until?: string | null;
    by?: string[];
    filter?: string;
    limit?: number;
  },
  fallback: T,
): Promise<QueryResult<T>> {
  const config = getVercelConfig();
  if (!config.ok) {
    return { ok: false, data: fallback, error: config.message };
  }

  const url = new URL(`https://api.vercel.com/v1/query/web-analytics/${endpoint}`);
  url.searchParams.set("projectId", config.projectId);
  if (config.teamId) url.searchParams.set("teamId", config.teamId);
  if (!config.teamId && config.slug) url.searchParams.set("slug", config.slug);
  if (params.since) url.searchParams.set("since", params.since);
  if (params.until) url.searchParams.set("until", params.until);
  if (params.filter) url.searchParams.set("filter", params.filter);
  if (params.limit) url.searchParams.set("limit", String(params.limit));
  params.by?.forEach((dimension) => url.searchParams.append("by", dimension));

  const cacheKey = url.toString();
  const cached = getCached<QueryResult<T>>(cacheKey);
  if (cached) return cached;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${config.token}` },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      const result: QueryResult<T> = {
        ok: false,
        data: fallback,
        error: `Vercel API ${response.status}: ${body.slice(0, 180) || response.statusText}`,
      };
      return setCached(cacheKey, result);
    }

    const payload = (await response.json()) as { data?: T };
    return setCached<QueryResult<T>>(cacheKey, {
      ok: true,
      data: payload.data ?? fallback,
      error: null,
    });
  } catch (error) {
    return setCached<QueryResult<T>>(cacheKey, {
      ok: false,
      data: fallback,
      error: error instanceof Error && error.name === "AbortError"
        ? "Vercel Analytics request timed out."
        : error instanceof Error
          ? error.message
          : "Unable to query Vercel Analytics.",
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function getVercelAnalytics(range: {
  since: string | null;
  until: string;
}) {
  const since = range.since ?? undefined;
  const aggregateSince =
    range.since ??
    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
  const until = range.until;
  const guideRouteFilter = odataEquals("route", "/blog/[slug]");

  const [
    totals,
    guideViews,
    trafficTrend,
    topPages,
    topReferrers,
    countries,
    devices,
    utmSources,
    utmCampaigns,
    customEvents,
  ] = await Promise.all([
    queryVercel<VercelCountData>("visits/count", { since, until }, {}),
    queryVercel<VercelCountData>("visits/count", { since, until, filter: guideRouteFilter }, {}),
    queryVercel<VercelRow[]>("visits/aggregate", { since: aggregateSince, until, by: ["day"], limit: 100 }, []),
    queryVercel<VercelRow[]>("visits/aggregate", { since: aggregateSince, until, by: ["requestPath"], limit: 10 }, []),
    queryVercel<VercelRow[]>("visits/aggregate", { since: aggregateSince, until, by: ["referrerHostname"], limit: 8 }, []),
    queryVercel<VercelRow[]>("visits/aggregate", { since: aggregateSince, until, by: ["country"], limit: 8 }, []),
    queryVercel<VercelRow[]>("visits/aggregate", { since: aggregateSince, until, by: ["deviceType"], limit: 8 }, []),
    queryVercel<VercelRow[]>("visits/aggregate", { since: aggregateSince, until, by: ["utmSource"], limit: 8 }, []),
    queryVercel<VercelRow[]>("visits/aggregate", { since: aggregateSince, until, by: ["utmCampaign"], limit: 8 }, []),
    queryVercel<VercelRow[]>("events/aggregate", { since: aggregateSince, until, by: ["eventName"], limit: 8 }, []),
  ]);

  const errors = [
    totals,
    guideViews,
    trafficTrend,
    topPages,
    topReferrers,
    countries,
    devices,
    utmSources,
    utmCampaigns,
    customEvents,
  ]
    .filter((result) => !result.ok)
    .map((result) => result.error);

  return {
    available: errors.length === 0,
    partial: errors.length > 0 && errors.length < 10,
    errors,
    totals: totals.data,
    guideViews: guideViews.data,
    trafficTrend: trafficTrend.data,
    topPages: topPages.data,
    topReferrers: topReferrers.data,
    countries: countries.data,
    devices: devices.data,
    utmSources: utmSources.data,
    utmCampaigns: utmCampaigns.data,
    customEvents: customEvents.data,
  };
}
