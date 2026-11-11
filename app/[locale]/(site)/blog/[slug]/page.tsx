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
import { getDictionary, languageAlternates, localizePath, ogLocales, resolveLocale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type GuidePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).guide;
  const { slug } = await params;
  const result = await getPublishedGuideBySlugRecoverable(slug);

  if (result.status === "unavailable") {
    return { title: t.unavailableMeta, robots: { index: false, follow: false } };
  }

  const guide = result.guide;
  if (!guide) {
    return { title: t.notFoundMeta };
  }

  const thumbnailUrl = await getGuideThumbnailUrl(guide);
  const title = guide.meta_title || guide.title;
  const description = guide.meta_description || guide.description;
  const canonicalPath = `/blog/${guide.canonical_slug || guide.slug}`;
  const pageUrl = absoluteUrl(localizePath(locale, `/blog/${guide.slug}`));

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(localizePath(locale, canonicalPath)), languages: languageAlternates(canonicalPath) },
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      locale: ogLocales[locale],
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
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.guide;
  const href = (path: string) => localizePath(locale, path);
  const { slug } = await params;
  const result = await getPublishedGuideBySlugRecoverable(slug);

  if (result.status === "unavailable") {
    return (
      <article>
        <section className="bg-[var(--surface-raised)] py-16 sm:py-24">
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center border border-dashed border-primary/40 bg-card p-10 text-center shadow-[0_12px_40px_rgb(64_68_71/0.08)]">
              <span className="flex size-14 items-center justify-center border border-primary/30 bg-secondary text-primary">
                <FileText className="size-6" />
              </span>
              <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] sm:text-5xl">{t.unavailableTitle}</h1>
              <p className="mt-4 max-w-xl text-muted-foreground">{t.unavailableText}</p>
              <Button asChild variant="outline" className="mt-7">
                <Link href={href("/contact?project=technical-consulting")}>
                  {dict.common.contactTeam} <ArrowRight data-icon="inline-end" />
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
      { name: dict.nav.home, href: href("/") },
      { name: dict.blog.breadcrumb, href: href("/blog") },
      { name: guide.title, href: href(`/blog/${guide.slug}`) },
    ]),
  ];

  if (guide.content_type === "article" && !hasPdf) {
    schemas.push(articleBlogPostingJsonLd(guide, thumbnailUrl, locale));
  } else {
    schemas.push(guideDigitalDocumentJsonLd(guide, thumbnailUrl, locale));
  }

  return (
    <article>
      <JsonLd data={schemas} />
      <section className="bg-[var(--surface-raised)] py-12 sm:py-20">
        <Container>
          <Button asChild variant="outline" className="mb-8">
            <Link href={href("/blog")}>
              <ArrowLeft data-icon="inline-start" /> {t.allContent}
            </Link>
          </Button>

          <div className={thumbnailUrl ? "grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" : "max-w-3xl mx-auto"}>
            <div>
              <Badge className="mb-6">
                {guide.content_type === "article" ? <BookOpen className="size-3" /> : <FileText className="size-3" />}
                <span className="ms-1 uppercase tracking-wider">{guide.content_type === "article" ? t.typeArticle : t.typeGuide}</span>
              </Badge>
              {/* Guide content is managed in the CMS and published in English. */}
              <div lang="en" dir="ltr">
                <h1 className="text-5xl leading-[1.02] sm:text-7xl">
                  {guide.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  {guide.description}
                </p>
              </div>

              <ContentDisclosure guide={guide} locale={locale} className="mt-6" />

              {/* Gated form / direct download button only if PDF exists and there is NO article body */}
              {!guide.article_body && hasPdf && (
                <div className="mt-8">
                  {canDownload ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild size="lg" className="h-12">
                        <Link href={href(`/blog/${guide.slug}/download`)}>
                          <Download data-icon="inline-start" /> {t.downloadPdf}
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="h-12">
                        <Link href={href(`/blog/${guide.slug}`)}>
                          <Share2 data-icon="inline-start" /> {t.shareUrl}
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
              <div className="relative overflow-hidden border bg-secondary shadow-[0_12px_40px_rgb(64_68_71/0.1)]">
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
        <section className="bg-white py-16">
          <Container className="max-w-3xl mx-auto">
            {guide.article_body && <div lang="en" dir="ltr"><MarkdownContent source={guide.article_body} /></div>}

            {/* If PDF exists alongside article body, render the gate/download CTA card at the bottom */}
            {hasPdf && (
              <div className="mt-16 border-t border-border pt-12">
                <h3 className="font-display text-3xl mb-4">{t.companionTitle}</h3>
                <p className="text-muted-foreground mb-6 leading-7">{t.companionText}</p>
                {canDownload ? (
                  <div className="flex flex-col gap-4 border-s-4 border-primary bg-[var(--surface-raised)] p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.unlocked}</p>
                      <h4 className="text-xl font-semibold mt-1">{t.readyTitle}</h4>
                    </div>
                    <Button asChild size="lg" className="h-12">
                      <Link href={href(`/blog/${guide.slug}/download`)}>
                        <Download data-icon="inline-start" /> {t.downloadPdf}
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
        <section className="bg-white py-16">
          <Container>
            <div className="border bg-card p-6 shadow-[0_12px_40px_rgb(64_68_71/0.08)] sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.unlockedDirect}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{t.readyToSend}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t.readyToSendText}</p>
                </div>
                <Button asChild size="lg" className="h-12">
                  <Link href={href(`/blog/${guide.slug}/download`)}>
                    <Download data-icon="inline-start" /> {t.downloadGuide}
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
