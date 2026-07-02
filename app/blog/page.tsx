import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/container";
import { GuideCard } from "@/components/guide-card";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listPublishedGuidesRecoverable } from "@/lib/guides";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "AI Guides",
  description: "Download practical AtlasMind212 AI guides shared from TikTok and the AtlasMind learning library.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AI Guides",
    description: "Download practical AtlasMind212 AI guides shared from TikTok and the AtlasMind learning library.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Guides",
    description: "Download practical AtlasMind212 AI guides shared from TikTok and the AtlasMind learning library.",
  },
};

export default async function BlogPage() {
  const result = await listPublishedGuidesRecoverable();
  const guides = result.status === "ok" ? result.guides : [];
  const isUnavailable = result.status === "unavailable";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "AI Guides", href: "/blog" },
      ])} />
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-70" />
        <div className="absolute inset-0 -z-10 bg-glow-dual opacity-60 mask-fade-y" />
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <Badge className="mb-6">AI Guides</Badge>
            <h1 className="font-display text-6xl leading-[0.96] tracking-[-0.055em] sm:text-7xl">
              Downloadable guides for smarter AI work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              A focused library of practical PDF guides from AtlasMind212, ready to share, save, and use alongside your AI workflow.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-neutral-surface py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 editorial-grid-soft paper-grain mask-fade-y opacity-60" />
        <Container>
          {guides.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {guides.map((guide, index) => (
                <Reveal key={guide.id} delay={index * 0.04}>
                  <GuideCard guide={guide} priority={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : isUnavailable ? (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-dashed border-primary/40 bg-card/80 p-10 text-center shadow-xl">
                <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-secondary text-primary">
                  <FileText className="size-6" />
                </span>
                <h2 className="mt-6 font-display text-4xl tracking-[-0.04em]">Guide library is temporarily unavailable.</h2>
                <p className="mt-4 text-muted-foreground">
                  We couldn&rsquo;t reach the guide library right now. Please check back shortly, or reach out and we&rsquo;ll share what you need directly.
                </p>
                <Button asChild className="mt-7">
                  <Link href="/contact?project=ai-integration">
                    Contact the team <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-dashed bg-card/80 p-10 text-center shadow-xl">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <FileText className="size-6" />
                </span>
                <h2 className="mt-6 font-display text-4xl tracking-[-0.04em]">Guides are coming soon.</h2>
                <p className="mt-4 text-muted-foreground">
                  The public library is ready. Publish the first PDF from the private CMS and it will appear here.
                </p>
                <Button asChild variant="outline" className="mt-7">
                  <Link href="/contact">
                    Ask about AI education <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
