import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, BookOpen, LogOut, ShieldCheck } from "lucide-react";
import { signOutAdmin } from "@/app/admin/guides/actions";
import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAnalyticsDashboardData, resolveAnalyticsRange } from "@/lib/analytics/dashboard";
import { requireAdminUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

type AdminAnalyticsPageProps = {
  searchParams: Promise<{ range?: string }>;
};

export default async function AdminAnalyticsPage({ searchParams }: AdminAnalyticsPageProps) {
  const [user, params] = await Promise.all([requireAdminUser(), searchParams]);
  const range = resolveAnalyticsRange(params.range);
  const data = await getAnalyticsDashboardData(range);

  return (
    <section className="relative overflow-hidden bg-neutral-surface py-10 sm:py-16">
      <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
      <Container className="space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-5">
              <BarChart3 className="size-3" /> Private analytics
            </Badge>
            <h1 className="font-display text-5xl tracking-[-0.04em] sm:text-6xl">Analytics</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Traffic, guide downloads, lead capture, and source health for AtlasMind212.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/guides">
                <BookOpen data-icon="inline-start" /> Guides
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/admins">
                <ShieldCheck data-icon="inline-start" /> Admins
              </Link>
            </Button>
            <form action={signOutAdmin}>
              <Button type="submit" variant="outline">
                <LogOut data-icon="inline-start" /> Sign out {user.email}
              </Button>
            </form>
          </div>
        </div>

        <AdminAnalyticsDashboard data={data} />
      </Container>
    </section>
  );
}
