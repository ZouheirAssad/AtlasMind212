import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { getGuidePdfUrl, getPublishedGuideBySlug } from "@/lib/guides";

export const dynamic = "force-dynamic";

type DownloadRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: DownloadRouteContext) {
  const { slug } = await params;
  const guide = await getPublishedGuideBySlug(slug);

  if (!guide) notFound();

  return NextResponse.redirect(getGuidePdfUrl(guide), { status: 302 });
}
