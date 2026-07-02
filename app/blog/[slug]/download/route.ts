import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { recordAnalyticsEvent } from "@/lib/analytics/events";
import { getGuidePdfUrl, getPublishedGuideBySlugRecoverable } from "@/lib/guides";

export const dynamic = "force-dynamic";

type DownloadRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: DownloadRouteContext) {
  const { slug } = await params;
  const result = await getPublishedGuideBySlugRecoverable(slug);

  // Recoverable read failures and missing guides both degrade to notFound
  // rather than surfacing a Next server-error page for a transient outage.
  if (result.status === "unavailable" || !result.guide) notFound();
  const guide = result.guide;

  await recordAnalyticsEvent({
    eventName: "guide_downloaded",
    request,
    route: "/blog/[slug]/download",
    guide: {
      id: guide.id,
      slug: guide.slug,
      title: guide.title,
    },
    metadata: { asset_type: "pdf" },
  });

  const response = NextResponse.redirect(getGuidePdfUrl(guide), { status: 302 });
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return response;
}
