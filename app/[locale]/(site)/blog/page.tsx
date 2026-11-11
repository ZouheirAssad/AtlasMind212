import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/container";
import { GuideCard } from "@/components/guide-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getGuideThumbnailUrl, listPublishedGuidesRecoverable } from "@/lib/guides";
import { getDictionary, localizePath, localizedMetadata, resolveLocale, type LocaleParams } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

type BlogPageProps = { params: LocaleParams };

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).blog;
  return localizedMetadata({ locale, path: "/blog", title: t.metaTitle, description: t.metaDescription, ogDescription: t.ogDescription });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.blog;
  const href = (path: string) => localizePath(locale, path);
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
        { name: dict.nav.home, href: href("/") },
        { name: t.breadcrumb, href: href("/blog") },
      ])} />
      <section className="border-b bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.eyebrow}</p>
            <h1 className="mt-5 text-6xl leading-[0.94] text-display-brand sm:text-8xl lg:text-9xl">{t.title}</h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-muted-foreground">{t.intro}</p>
            {locale !== "en" && <p className="mx-auto mt-4 max-w-3xl text-sm text-muted-foreground">{t.contentLanguageNote}</p>}
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--surface-raised)] py-16 sm:py-24">
        <Container className="max-w-5xl">
          {guidesWithThumbnails.length ? (
            <div>
              {guidesWithThumbnails.map(({ guide, thumbnailUrl }, index) => (
                <Reveal key={guide.id} delay={index * 0.04}>
                  <GuideCard guide={guide} thumbnailUrl={thumbnailUrl} locale={locale} priority={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : isUnavailable ? (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center border border-dashed border-primary/40 bg-white p-10 text-center shadow-[0_12px_40px_rgb(64_68_71/0.08)]">
                <span className="flex size-14 items-center justify-center bg-secondary text-primary">
                  <FileText className="size-6" />
                </span>
                <h2 className="mt-6 text-4xl">{t.unavailableTitle}</h2>
                <p className="mt-4 text-muted-foreground">{t.unavailableText}</p>
                <Button asChild className="mt-7">
                  <Link href={href("/contact?project=technical-consulting")}>
                    {dict.common.contactTeam} <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center border border-dashed bg-white p-10 text-center shadow-[0_12px_40px_rgb(64_68_71/0.08)]">
                <span className="flex size-14 items-center justify-center bg-secondary text-primary">
                  <FileText className="size-6" />
                </span>
                <h2 className="mt-6 text-4xl">{t.emptyTitle}</h2>
                <p className="mt-4 text-muted-foreground">{t.emptyText}</p>
                <Button asChild variant="outline" className="mt-7">
                  <Link href={href("/contact")}>
                    {t.suggestTopic} <ArrowRight data-icon="inline-end" />
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
