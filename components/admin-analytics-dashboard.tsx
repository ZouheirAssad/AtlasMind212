"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  Download,
  Eye,
  FileDown,
  Globe2,
  Mail,
  MousePointerClick,
  Signal,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  AnalyticsDashboardData,
  AnalyticsRangeKey,
  BreakdownRow,
  RecentEventRow,
  SourceStatus,
} from "@/lib/analytics/types";
import { cn } from "@/lib/utils";

const RANGE_OPTIONS: Array<{ key: AnalyticsRangeKey; label: string }> = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
  { key: "all", label: "All" },
];

const cyan = "#00c8f5";
const cyanSoft = "rgba(0, 200, 245, 0.16)";
const steel = "#94a3b8";
const navyLine = "rgba(30, 58, 74, 0.78)";

function formatNumber(value: number | null) {
  return value === null ? "Not connected" : new Intl.NumberFormat("en").format(value);
}

function formatPercent(value: number | null) {
  return value === null ? "Not connected" : `${(value * 100).toFixed(1)}%`;
}

function KpiCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Users;
}) {
  return (
    <article className="min-h-36 rounded-3xl border bg-card/94 p-5 shadow-[0_18px_55px_rgb(0_0_0/0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{detail}</p>
    </article>
  );
}

function Panel({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-3xl border bg-card/94 p-5 shadow-[0_18px_55px_rgb(0_0_0/0.22)] sm:p-6", className)}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          {eyebrow && <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">{eyebrow}</p>}
          <h2 className="mt-1 text-xl font-semibold">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed bg-secondary/35 p-6 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}

function TrafficTrend({ data }: { data: AnalyticsDashboardData }) {
  if (!data.trends.some((point) => point.pageviews || point.visitors)) {
    return <EmptyState label="Vercel traffic data will appear here after the API is connected." />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data.trends} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="pageviewsFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor={cyan} stopOpacity={0.32} />
              <stop offset="95%" stopColor={cyan} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={navyLine} strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: steel, fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={22} />
          <YAxis tick={{ fill: steel, fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ stroke: cyan, strokeOpacity: 0.3 }}
            contentStyle={{ background: "#07111f", border: "1px solid #1e3a4a", borderRadius: 16, color: "#f8fafc" }}
          />
          <Area type="monotone" dataKey="pageviews" name="Pageviews" stroke={cyan} fill="url(#pageviewsFill)" strokeWidth={2} />
          <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#94a3b8" fill="transparent" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function DownloadTrend({ data }: { data: AnalyticsDashboardData }) {
  if (!data.trends.some((point) => point.downloads)) {
    return <EmptyState label="Guide download events will appear after the first tracked download." />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.trends} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid stroke={navyLine} strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: steel, fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={22} />
          <YAxis tick={{ fill: steel, fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: cyanSoft }}
            contentStyle={{ background: "#07111f", border: "1px solid #1e3a4a", borderRadius: 16, color: "#f8fafc" }}
          />
          <Bar dataKey="downloads" name="Downloads" fill={cyan} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RankList({ rows, emptyLabel }: { rows: BreakdownRow[]; emptyLabel: string }) {
  if (!rows.length) return <EmptyState label={emptyLabel} />;
  const maxValue = Math.max(...rows.map((row) => row.value), 1);

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={`${row.label}-${row.value}`} className="space-y-2">
          <div className="flex items-start justify-between gap-3 text-sm">
            <div className="min-w-0">
              {row.href ? (
                <Link href={row.href} className="line-clamp-1 font-semibold transition-colors hover:text-primary">
                  {row.label}
                </Link>
              ) : (
                <p className="line-clamp-1 font-semibold">{row.label}</p>
              )}
              {row.secondary && <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{row.secondary}</p>}
            </div>
            <span className="font-mono text-xs text-primary">{formatNumber(row.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(6, (row.value / maxValue) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: SourceStatus }) {
  const tone = {
    ready: "border-primary/35 bg-primary/10 text-primary",
    partial: "border-amber-300/35 bg-amber-300/10 text-amber-200",
    unavailable: "border-destructive/35 bg-destructive/10 text-destructive",
    "not-configured": "border-muted-foreground/25 bg-secondary/45 text-muted-foreground",
  }[status.state];

  return (
    <article className="rounded-2xl border bg-secondary/35 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{status.label}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{status.message}</p>
        </div>
        <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]", tone)}>
          {status.state.replace("-", " ")}
        </span>
      </div>
    </article>
  );
}

function RecentEvents({ rows }: { rows: RecentEventRow[] }) {
  if (!rows.length) return <EmptyState label="Recent event rows will appear after tracking starts." />;

  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="grid grid-cols-[1.1fr_0.9fr_0.8fr] gap-3 border-b bg-secondary/45 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
        <span>Event</span>
        <span>Context</span>
        <span>Time</span>
      </div>
      <div className="divide-y">
        {rows.map((row) => (
          <div key={`${row.source}-${row.id}`} className="grid grid-cols-[1.1fr_0.9fr_0.8fr] gap-3 px-4 py-3 text-sm">
            <div className="min-w-0">
              <p className="line-clamp-1 font-semibold">{row.eventName}</p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{row.source}</p>
            </div>
            <div className="min-w-0 text-muted-foreground">
              <p className="line-clamp-1">{row.guideTitle ?? row.path ?? "No context"}</p>
              {row.guideSlug && <p className="mt-1 line-clamp-1 font-mono text-xs">/{row.guideSlug}</p>}
            </div>
            <p className="text-muted-foreground">{row.occurredAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminAnalyticsDashboard({ data }: { data: AnalyticsDashboardData }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border bg-card/94 p-5 shadow-[0_18px_55px_rgb(0_0_0/0.22)] lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">Window</p>
          <h2 className="mt-1 text-2xl font-semibold">{data.range.label}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Refreshed {data.generatedAt}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {RANGE_OPTIONS.map((option) => (
            <Link
              key={option.key}
              href={`/admin/analytics?range=${option.key}`}
              className={cn(
                "flex h-11 min-w-14 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition-colors",
                data.range.key === option.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-secondary/45 text-muted-foreground hover:border-primary/45 hover:text-foreground",
              )}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <KpiCard label="Visitors" value={formatNumber(data.kpis.visitors)} detail="Vercel unique visitors." icon={Users} />
        <KpiCard label="Pageviews" value={formatNumber(data.kpis.pageviews)} detail="Vercel page views." icon={Eye} />
        <KpiCard label="Downloads" value={formatNumber(data.kpis.downloads)} detail="Tracked PDF requests." icon={FileDown} />
        <KpiCard label="Leads" value={formatNumber(data.kpis.leads)} detail="Stored guide leads." icon={MousePointerClick} />
        <KpiCard label="Contact" value={formatNumber(data.kpis.contactMessages)} detail="Project messages." icon={Mail} />
        <KpiCard label="Guide CVR" value={formatPercent(data.kpis.guideConversionRate)} detail="Downloads per guide pageview." icon={Activity} />
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <Panel title="Traffic trend" eyebrow="Reach" className="xl:col-span-7">
          <TrafficTrend data={data} />
        </Panel>
        <Panel title="Download trend" eyebrow="Guide demand" className="xl:col-span-5">
          <DownloadTrend data={data} />
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <Panel title="Top guides" eyebrow="Downloads" className="xl:col-span-3">
          <RankList rows={data.topGuides} emptyLabel="Tracked guide downloads will appear here." />
        </Panel>
        <Panel title="Top leads" eyebrow="Attribution" className="xl:col-span-3">
          <RankList rows={data.topLeads || []} emptyLabel="Lead capture rankings will appear here." />
        </Panel>
        <Panel title="Top pages" eyebrow="Pageviews" className="xl:col-span-3">
          <RankList rows={data.topPages} emptyLabel="Vercel page rankings will appear here." />
        </Panel>
        <Panel title="Top referrers" eyebrow="Acquisition" className="xl:col-span-3">
          <RankList rows={data.topReferrers} emptyLabel="Referrer data will appear when Vercel has traffic." />
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <Panel title="Countries" eyebrow="Audience" className="xl:col-span-3">
          <RankList rows={data.countries} emptyLabel="Country data unavailable." />
        </Panel>
        <Panel title="Devices" eyebrow="Audience" className="xl:col-span-3">
          <RankList rows={data.devices} emptyLabel="Device data unavailable." />
        </Panel>
        <Panel title="UTM sources" eyebrow="Campaigns" className="xl:col-span-3">
          <RankList rows={data.utmSources} emptyLabel="UTM source data unavailable." />
        </Panel>
        <Panel title="UTM campaigns" eyebrow="Campaigns" className="xl:col-span-3">
          <RankList rows={data.utmCampaigns} emptyLabel="UTM campaign data unavailable." />
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <Panel title="Recent events" eyebrow="Logs" className="xl:col-span-7">
          <RecentEvents rows={data.recentEvents} />
        </Panel>
        <Panel title="Sources" eyebrow="Freshness" className="xl:col-span-5">
          <div className="space-y-3">
            {data.sourceStatuses.map((status) => (
              <StatusPill key={status.id} status={status} />
            ))}
          </div>
        </Panel>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2 rounded-full border bg-secondary/35 px-3 py-2">
          <Signal className="size-4 text-primary" /> Vercel aggregates are cached for 5 minutes.
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border bg-secondary/35 px-3 py-2">
          <Globe2 className="size-4 text-primary" /> First-party logs exclude raw IPs and emails.
        </span>
        <Link href="/admin/guides" className="inline-flex items-center gap-2 rounded-full border bg-secondary/35 px-3 py-2 transition-colors hover:text-primary">
          <Download className="size-4" /> Guides <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
