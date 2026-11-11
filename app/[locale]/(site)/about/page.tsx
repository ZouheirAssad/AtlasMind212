import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getDictionary, localizePath, localizedMetadata, resolveLocale, type LocaleParams } from "@/lib/i18n";

type AboutPageProps = { params: LocaleParams };

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).about;
  return localizedMetadata({ locale, path: "/about", title: t.metaTitle, description: t.metaDescription, ogDescription: t.ogDescription });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.about;
  const href = (path: string) => localizePath(locale, path);

  return (
    <>
      <PageHero variant="photo" eyebrow={t.eyebrow} title={t.title} description={t.description} image={{ src: "/images/editorial-about-v2.webp", alt: t.heroAlt }} imagePosition="right" />

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.beliefEyebrow}</p>
            <h2 className="mt-5 text-balance text-5xl leading-[1.02] text-display-brand sm:text-7xl">{t.beliefTitle}</h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-lg leading-8 text-muted-foreground">
            {t.beliefParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--surface-raised)] py-20 sm:py-28">
        <Container>
          <Reveal className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.principlesEyebrow}</p><h2 className="mt-5 text-5xl sm:text-6xl">{t.principlesTitle}</h2></Reveal>
          <div className="mt-12 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {t.principles.map((principle, index) => <Reveal key={principle.title} delay={index * 0.04}><article className="h-full border-t py-7 md:border-s md:border-t-0 md:px-7"><span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-9 text-2xl font-bold">{principle.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{principle.description}</p></article></Reveal>)}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative editorial-lines">
            <Image src="/images/editorial-consulting-v2.webp" alt={t.workingAlt} width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[3/2] w-full object-cover" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.workingEyebrow}</p>
            <h2 className="mt-5 text-5xl leading-[1.04]">{t.workingTitle}</h2>
            <div className="mt-7 divide-y border-y">
              {t.workingItems.map((item) => <p key={item} className="py-4 text-lg font-semibold">{item}</p>)}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--surface-raised)] py-20 sm:py-28">
        <Container>
          <Reveal className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.fitEyebrow}</p><h2 className="mt-5 text-5xl sm:text-6xl">{t.fitTitle}</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal className="border-t-4 border-primary bg-white p-8 shadow-[0_12px_40px_rgb(64_68_71/0.08)]"><h3 className="text-2xl font-bold">{t.goodFitTitle}</h3><ul className="mt-6 space-y-4">{t.goodFit.map((text) => <li key={text} className="flex items-start gap-3 leading-7 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary" />{text}</li>)}</ul></Reveal>
            <Reveal delay={0.08} className="border-t-4 border-black bg-white p-8 shadow-[0_12px_40px_rgb(64_68_71/0.08)]"><h3 className="text-2xl font-bold">{t.badFitTitle}</h3><ul className="mt-6 space-y-4">{t.badFit.map((text) => <li key={text} className="flex items-start gap-3 leading-7 text-muted-foreground"><X className="mt-1 size-4 shrink-0 text-foreground" />{text}</li>)}</ul></Reveal>
          </div>
          <Reveal className="mt-16 flex flex-col gap-6 border-y py-10 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.ctaEyebrow}</p><h2 className="mt-2 text-4xl">{t.ctaTitle}</h2></div><div className="flex flex-wrap gap-3"><Button asChild size="lg"><Link href={href("/contact")}>{t.ctaButton}</Link></Button><Button asChild variant="outline" size="lg"><Link href={href("/services")}>{dict.common.viewServices}</Link></Button></div></Reveal>
        </Container>
      </section>
    </>
  );
}
