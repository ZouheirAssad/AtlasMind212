import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/container";
import { GuideCard } from "@/components/guide-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getGuideThumbnailUrl, listPublishedGuidesRecoverable } from "@/lib/guides";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Software & Automation Guides",
  description: "Explore practical AtlasMind212 articles and guides about web development, backend systems, integrations, AI, and workflow automation.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Software & Automation Guides",
    description: "Practical articles and guides about web development, backend systems, integrations, AI, and workflow automation.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Software & Automation Guides",
    description: "Practical articles and guides about web development, backend systems, integrations, AI, and workflow automation.",
  },
};

export default async function BlogPage() {
  const result = await listPublishedGuidesRecoverable();
  const guides = result.status === "ok" ? result.guides : [];
  const isUnavailable = result.status === "unavailable";

  const guidesWithThumbnails = await Promise.all(
    guides.map(async (guide) => ({
      guide,
      thumbnailUrl: await getGuideThumbnailUrl(guide),
    })),
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Guides", href: "/blog" },
      ])} />
      <section className="border-b bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">AtlasMind library</p>
            <h1 className="mt-5 text-6xl leading-[0.94] text-display-violet sm:text-8xl lg:text-9xl">Guides</h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-muted-foreground">Practical articles and downloadable guides for building better web products, integrations, AI features, and automated workflows.</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#f7f6ff] py-16 sm:py-24">
        <Container className="max-w-5xl">
          {guidesWithThumbnails.length ? (
            <div>
              {guidesWithThumbnails.map(({ guide, thumbnailUrl }, index) => (
                <Reveal key={guide.id} delay={index * 0.04}>
                  <GuideCard guide={guide} thumbnailUrl={thumbnailUrl} priority={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : isUnavailable ? (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center border border-dashed border-primary/40 bg-white p-10 text-center shadow-[0_12px_40px_rgb(34_25_85/0.08)]">
                <span className="flex size-14 items-center justify-center bg-secondary text-primary">
                  <FileText className="size-6" />
                </span>
                <h2 className="mt-6 text-4xl">Guide library is temporarily unavailable.</h2>
                <p className="mt-4 text-muted-foreground">
                  We couldn&rsquo;t reach the guide library right now. Please check back shortly, or reach out and we&rsquo;ll share what you need directly.
                </p>
                <Button asChild className="mt-7">
                  <Link href="/contact?project=technical-consulting">
                    Contact the team <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center border border-dashed bg-white p-10 text-center shadow-[0_12px_40px_rgb(34_25_85/0.08)]">
                <span className="flex size-14 items-center justify-center bg-secondary text-primary">
                  <FileText className="size-6" />
                </span>
                <h2 className="mt-6 text-4xl">Guides are coming soon.</h2>
                <p className="mt-4 text-muted-foreground">
                  The public library is ready. Publish the first PDF from the private CMS and it will appear here.
                </p>
                <Button asChild variant="outline" className="mt-7">
                  <Link href="/contact">
                    Suggest a guide topic <ArrowRight data-icon="inline-end" />
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
