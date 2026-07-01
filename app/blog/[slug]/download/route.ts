import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { recordAnalyticsEvent } from "@/lib/analytics/events";
import { getGuidePdfUrl, getPublishedGuideBySlug } from "@/lib/guides";

export const dynamic = "force-dynamic";

type DownloadRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: DownloadRouteContext) {
  const { slug } = await params;
  const guide = await getPublishedGuideBySlug(slug);

  if (!guide) notFound();

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
