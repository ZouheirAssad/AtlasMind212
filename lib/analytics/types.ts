export type AnalyticsRangeKey = "7d" | "30d" | "90d" | "all";

export type AnalyticsRange = {
  key: AnalyticsRangeKey;
  label: string;
  since: string | null;
  until: string;
};

export type TrendPoint = {
  date: string;
  label: string;
  pageviews: number;
  visitors: number;
  downloads: number;
};

export type BreakdownRow = {
  label: string;
  value: number;
  secondary?: string;
  href?: string;
};

export type RecentEventRow = {
  id: string;
  eventName: string;
  occurredAt: string;
  path: string | null;
  guideTitle: string | null;
  guideSlug: string | null;
  source: "supabase" | "vercel-drain";
};

export type SourceStatus = {
  id: "supabase" | "vercel-api" | "vercel-drains";
  label: string;
  state: "ready" | "partial" | "unavailable" | "not-configured";
  message: string;
};

export type AnalyticsDashboardData = {
  range: AnalyticsRange;
  generatedAt: string;
  kpis: {
    visitors: number | null;
    pageviews: number | null;
    downloads: number;
    leads: number;
    contactMessages: number;
    guideConversionRate: number | null;
  };
  trends: TrendPoint[];
  topGuides: BreakdownRow[];
  topLeads: BreakdownRow[];
  topPages: BreakdownRow[];
  topReferrers: BreakdownRow[];
  countries: BreakdownRow[];
  devices: BreakdownRow[];
  utmSources: BreakdownRow[];
  utmCampaigns: BreakdownRow[];
  recentEvents: RecentEventRow[];
  sourceStatuses: SourceStatus[];
};
