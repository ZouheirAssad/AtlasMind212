import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { FeatureCard } from "@/components/feature-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDictionary, localizePath, localizedMetadata, resolveLocale, type LocaleParams } from "@/lib/i18n";
import { JsonLd, moroccoServiceAreaJsonLd } from "@/lib/seo";
import { formattedAddress } from "@/lib/site-config";
import { getServices } from "@/lib/site-data";

type HomePageProps = { params: LocaleParams };

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return localizedMetadata({
    locale,
    path: "/",
    title: { absolute: dict.meta.homeTitle },
    description: dict.meta.homeDescription,
    ogTitle: dict.meta.homeTitle,
    ogDescription: dict.meta.homeDescription,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.home;
  const href = (path: string) => localizePath(locale, path);

  return (
    <>
      {/* Local business entity only once a real address is configured. */}
      {formattedAddress() && <JsonLd data={moroccoServiceAreaJsonLd(locale, dict.morocco.cities, dict.morocco.metaDescription)} />}
      <section className="relative min-h-[46rem] overflow-hidden bg-black text-white sm:min-h-[52rem]">
        <Image
          src="/images/editorial-home-hero-v2.webp"
          alt={t.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-center"
        />
        <div className="photo-overlay absolute inset-0" />
        <Container className="relative flex min-h-[46rem] items-end pb-16 pt-32 sm:min-h-[52rem] sm:pb-20">
          <Reveal className="w-full min-w-0 max-w-6xl">
            <Badge className="mb-7 max-w-full whitespace-normal bg-white text-start text-black">{t.badge}</Badge>
            <h1 className="max-w-5xl text-balance text-[2.6rem] leading-[1] sm:text-7xl sm:leading-[0.95] lg:max-w-4xl lg:text-[4.75rem]">
              {t.titleLead} <span className="text-accent">{t.titleAccent}</span>
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-white/90 sm:text-2xl">{t.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary-display text-white hover:bg-primary"><Link href={href("/contact")}>{dict.common.startProject} <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href={href("/services")}>{dict.common.viewServices}</Link></Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b bg-white py-14 sm:py-16">
        <Container className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
          <h2 className="text-2xl font-bold text-primary">{t.aboutTitle}</h2>
          <p className="max-w-4xl text-lg leading-8 text-muted-foreground">{t.aboutParagraph}</p>
        </Container>
      </section>

      <section className="editorial-section py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.approachEyebrow}</p>
            <h2 className="mt-5 text-balance text-5xl leading-[1.02] text-display-brand sm:text-7xl">{t.approachTitle}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{t.approachText}</p>
          </Reveal>
          <Reveal delay={0.08} className="relative editorial-lines">
            <Image
              src="/images/editorial-workflow-v2.webp"
              alt={t.approachAlt}
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </Reveal>
        </Container>
      </section>

      <section className="editorial-section-tint py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} description={t.servicesDescription} />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {getServices(locale).map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <FeatureCard title={service.title} description={service.description} icon={service.icon} meta={service.engagement} href={href(`/services/${service.slug}`)} ctaLabel={dict.common.viewService} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0a0a0a] py-20 text-white sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-display"><MapPin className="size-4" /> {dict.morocco.homeEyebrow}</p>
            <h2 className="mt-5 text-balance text-5xl leading-[1.02] sm:text-7xl">{dict.morocco.homeTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{dict.morocco.homeText}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8"><Link href={href("/morocco")}>{dict.morocco.homeCta} <ArrowRight /></Link></Button>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid grid-cols-2 gap-3">
              {dict.morocco.cities.map((city) => (
                <li key={city} className="border border-white/15 border-s-4 border-s-primary-display p-4 text-lg font-semibold">{city}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="editorial-section py-20 sm:py-28">
        <Container>
          <Reveal className="grid gap-10 border-y py-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <SectionHeading eyebrow={t.stepsEyebrow} title={t.stepsTitle} />
            <div className="grid gap-0 md:grid-cols-3">
              {t.steps.map((step, index) => (
                <article key={step.title} className="border-t py-7 md:border-s md:border-t-0 md:px-7 md:py-0">
                  <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{step.description}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="editorial-section-tint py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-balance text-5xl leading-[1.02] sm:text-7xl">{t.ctaTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t.ctaText}</p>
            <Button asChild size="lg" className="mt-8"><Link href={href("/contact")}>{t.ctaButton} <ArrowRight /></Link></Button>
          </Reveal>
          <Reveal delay={0.08} className="border-s-4 border-primary-display bg-white p-8 shadow-[0_12px_40px_rgb(64_68_71/0.08)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.scopeEyebrow}</p>
            <ul className="mt-6 space-y-5">
              {t.scopeItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg font-semibold"><Check className="size-5 text-primary" /> {item}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
