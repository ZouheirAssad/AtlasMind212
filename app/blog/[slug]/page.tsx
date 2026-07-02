import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ArrowLeft, ArrowRight, BookOpen, Download, FileText, Share2 } from "lucide-react";
import { isDownloadUnlocked } from "@/lib/download-cookie";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentDisclosure } from "@/components/content-disclosure";
import { GatedDownloadForm } from "@/components/gated-download-form";
import { MarkdownContent } from "@/components/markdown-content";
import { recordAnalyticsEvent } from "@/lib/analytics/events";
import { getGuideThumbnailUrl, getPublishedGuideBySlugRecoverable } from "@/lib/guides";
import { JsonLd, breadcrumbJsonLd, guideDigitalDocumentJsonLd, articleBlogPostingJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublishedGuideBySlugRecoverable(slug);

  if (result.status === "unavailable") {
    return { title: "Content temporarily unavailable", robots: { index: false, follow: false } };
  }

  const guide = result.guide;
  if (!guide) {
    return { title: "Content not found" };
  }

  const thumbnailUrl = await getGuideThumbnailUrl(guide);
  const title = guide.meta_title || guide.title;
  const description = guide.meta_description || guide.description;
  const canonicalUrl = guide.canonical_slug
    ? `/blog/${guide.canonical_slug}`
    : `/blog/${guide.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/blog/${guide.slug}`),
      publishedTime: guide.published_at ?? guide.created_at,
      images: thumbnailUrl ? [{ url: thumbnailUrl, alt: guide.thumbnail_alt ?? title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: thumbnailUrl ? [thumbnailUrl] : undefined,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const result = await getPublishedGuideBySlugRecoverable(slug);

  if (result.status === "unavailable") {
    return (
      <article>
        <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-dashed border-primary/40 bg-card/80 p-10 text-center shadow-xl">
              <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-secondary text-primary">
                <FileText className="size-6" />
              </span>
              <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] sm:text-5xl">
                This content is temporarily unavailable.
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                We couldn&rsquo;t reach the content library right now. Please check back shortly, or get in touch.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link href="/contact?project=ai-integration">
                  Contact the team <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      </article>
    );
  }

  const guide = result.guide;
  if (!guide) notFound();

  // Track page view analytics
  await recordAnalyticsEvent({
    eventName: "article_viewed",
    route: "/blog/[slug]",
    path: `/blog/${slug}`,
    guide: {
      id: guide.id,
      slug: guide.slug,
      title: guide.title,
    },
  });

  const cookieStore = await cookies();
  const isUnlocked = await isDownloadUnlocked(guide.slug, cookieStore);
  const hasPdf = guide.hasPdf;
  const isGated = guide.gate_type !== "none";
  const isHardGated = guide.gate_type === "hard";
  const canDownload = !isGated || isUnlocked;
  const thumbnailUrl = await getGuideThumbnailUrl(guide);

  const schemas: Array<Record<string, unknown>> = [
    breadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "AI Guides", href: "/blog" },
      { name: guide.title, href: `/blog/${guide.slug}` },
    ]),
  ];

  if (guide.content_type === "article" && !hasPdf) {
    schemas.push(articleBlogPostingJsonLd(guide, thumbnailUrl));
  } else {
    schemas.push(guideDigitalDocumentJsonLd(guide, thumbnailUrl));
  }

  return (
    <article>
      <JsonLd data={schemas} />
      <section className="relative overflow-hidden bg-cream py-10 sm:py-16">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container>
          <Button asChild variant="outline" className="mb-8">
            <Link href="/blog">
              <ArrowLeft data-icon="inline-start" /> All library content
            </Link>
          </Button>

          <div className={thumbnailUrl ? "grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" : "max-w-3xl mx-auto"}>
            <div>
              <Badge className="mb-6">
                {guide.content_type === "article" ? <BookOpen className="size-3" /> : <FileText className="size-3" />}
                <span className="ml-1 uppercase tracking-wider">{guide.content_type}</span>
              </Badge>
              <h1 className="font-display text-5xl leading-tight tracking-[-0.05em] sm:text-7xl">
                {guide.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {guide.description}
              </p>

              <ContentDisclosure guide={guide} className="mt-6" />

              {/* Gated form / direct download button only if PDF exists and there is NO article body */}
              {!guide.article_body && hasPdf && (
                <div className="mt-8">
                  {canDownload ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild size="lg" className="h-12">
                        <Link href={`/blog/${guide.slug}/download`}>
                          <Download data-icon="inline-start" /> Download PDF
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="h-12">
                        <Link href={`/blog/${guide.slug}`}>
                          <Share2 data-icon="inline-start" /> Share URL
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="max-w-md">
                      <GatedDownloadForm guide={guide} isHardGated={isHardGated} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {thumbnailUrl && (
              <div className="relative overflow-hidden rounded-[2rem] border bg-secondary shadow-[0_28px_80px_rgb(0_0_0/0.35)]">
                <Image
                  src={thumbnailUrl}
                  alt={guide.thumbnail_alt || guide.title}
                  width={1200}
                  height={1200}
                  priority
                  className="aspect-square w-full object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Article Body Section & Gated Download Form */}
      {guide.article_body && (
        <section className="relative overflow-hidden bg-neutral-surface py-16">
          <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-60" />
          <Container className="max-w-3xl mx-auto">
            {guide.article_body && <MarkdownContent source={guide.article_body} />}

            {/* If PDF exists alongside article body, render the gate/download CTA card at the bottom */}
            {hasPdf && (
              <div className="mt-16 border-t border-border pt-12">
                <h3 className="font-display text-3xl mb-4">Companion Guide Download</h3>
                <p className="text-muted-foreground mb-6 leading-7">
                  Get a handy downloadable PDF version of this article to save, reference, or share with your team.
                </p>
                {canDownload ? (
                  <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-xl">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Unlocked</p>
                      <h4 className="text-xl font-semibold mt-1">Your PDF is ready for download.</h4>
                    </div>
                    <Button asChild size="lg" className="h-12">
                      <Link href={`/blog/${guide.slug}/download`}>
                        <Download data-icon="inline-start" /> Download PDF
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="max-w-md">
                    <GatedDownloadForm guide={guide} isHardGated={isHardGated} />
                  </div>
                )}
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Fallback direct download section if no article body but it's already unlocked/ungated */}
      {!guide.article_body && hasPdf && canDownload && (
        <section className="relative overflow-hidden bg-neutral-surface py-16">
          <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-60" />
          <Container>
            <div className="rounded-3xl border bg-card/94 p-6 shadow-xl sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Unlocked Direct PDF</p>
                  <h2 className="mt-2 text-2xl font-semibold">Ready to download and send.</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use this page URL for a preview card, or use the download button for the PDF file.
                  </p>
                </div>
                <Button asChild size="lg" className="h-12">
                  <Link href={`/blog/${guide.slug}/download`}>
                    <Download data-icon="inline-start" /> Download guide
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
