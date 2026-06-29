import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText, Share2 } from "lucide-react";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getGuideThumbnailUrl, getPublishedGuideBySlug } from "@/lib/guides";

export const dynamic = "force-dynamic";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getPublishedGuideBySlug(slug);

  if (!guide) {
    return { title: "Guide not found" };
  }

  const thumbnailUrl = getGuideThumbnailUrl(guide);

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      images: [{ url: thumbnailUrl, alt: guide.thumbnail_alt ?? guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [thumbnailUrl],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = await getPublishedGuideBySlug(slug);

  if (!guide) notFound();

  const thumbnailUrl = getGuideThumbnailUrl(guide);

  return (
    <article>
      <section className="relative overflow-hidden bg-cream py-10 sm:py-16">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <Container>
          <Button asChild variant="outline" className="mb-8">
            <Link href="/blog">
              <ArrowLeft data-icon="inline-start" /> All guides
            </Link>
          </Button>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge className="mb-6">
                <FileText className="size-3" /> PDF Guide
              </Badge>
              <h1 className="font-display text-5xl leading-tight tracking-[-0.05em] sm:text-7xl">
                {guide.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                {guide.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12">
                  <Link href={`/blog/${guide.slug}/download`}>
                    <Download data-icon="inline-start" /> Download PDF
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12">
                  <Link href={`/blog/${guide.slug}`}>
                    <Share2 data-icon="inline-start" /> Share this URL
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border bg-secondary shadow-[0_28px_80px_rgb(0_0_0/0.35)]">
              <Image
                src={thumbnailUrl}
                alt={guide.thumbnail_alt || ""}
                width={1200}
                height={1200}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-neutral-surface py-16">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-60" />
        <Container>
          <div className="rounded-3xl border bg-card/94 p-6 shadow-xl sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Direct PDF</p>
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
    </article>
  );
}
