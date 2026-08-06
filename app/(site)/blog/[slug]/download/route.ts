import { NextResponse } from "next/server";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { recordAnalyticsEvent } from "@/lib/analytics/events";
import { isDownloadUnlocked } from "@/lib/download-cookie";
import { createSignedPdfDownloadUrl, getAdminGuideBySlug, getPublishedGuideBySlugRecoverable } from "@/lib/guides";

export const dynamic = "force-dynamic";

type DownloadRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: DownloadRouteContext) {
  const { slug } = await params;
  const result = await getPublishedGuideBySlugRecoverable(slug);

  if (result.status === "unavailable" || !result.guide) notFound();
  const publicGuide = result.guide;

  // If no PDF file exists, degrade to 404
  if (!publicGuide.hasPdf) notFound();

  // Hard-gated downloads require a server-verified lead submission cookie.
  // Soft and ungated downloads are allowed directly (the article page still
  // shows the form for soft gates, but the file is not access-controlled).
  const isHardGated = publicGuide.gate_type === "hard";
  if (isHardGated) {
    const cookieStore = await cookies();
    const isUnlocked = await isDownloadUnlocked(slug, cookieStore);
    if (!isUnlocked) {
      redirect(`/blog/${slug}`);
    }
  }

  // Fetch the admin view to obtain the raw storage path, then sign a short-lived URL.
  const adminGuide = await getAdminGuideBySlug(slug);
  if (!adminGuide?.pdf_path) notFound();

  const signedUrl = await createSignedPdfDownloadUrl(adminGuide);
  if (!signedUrl) notFound();

  // Record appropriate event: gated download completed vs. ungated guide downloaded
  const eventName = isHardGated ? "gated_download_completed" : "guide_downloaded";

  await recordAnalyticsEvent({
    eventName,
    request,
    route: "/blog/[slug]/download",
    guide: {
      id: publicGuide.id,
      slug: publicGuide.slug,
      title: publicGuide.title,
    },
    metadata: { asset_type: "pdf", gate_type: publicGuide.gate_type },
  });

  const response = NextResponse.redirect(signedUrl, { status: 302 });
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return response;
}
