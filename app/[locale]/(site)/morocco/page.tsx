import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Languages, MapPin } from "lucide-react";
import { PhoneWhatsAppLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { FeatureCard } from "@/components/feature-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getDictionary, localizePath, localizedMetadata, resolveLocale, type LocaleParams } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, moroccoServiceAreaJsonLd } from "@/lib/seo";
import { getServices, type ServiceSlug } from "@/lib/site-data";

type MoroccoPageProps = { params: LocaleParams };

const MOROCCO_SERVICES: ServiceSlug[] = ["website-creation", "seo-geo", "google-maps-local-seo", "web-development"];

export async function generateMetadata({ params }: MoroccoPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).morocco;
  const base = localizedMetadata({ locale, path: "/morocco", title: t.metaTitle, description: t.metaDescription });
  const image = { url: "/images/editorial-consulting-v2.webp", alt: t.heroAlt };
  return { ...base, openGraph: { ...base.openGraph, images: [image] }, twitter: { ...base.twitter, images: [image.url] } };
}

export default async function MoroccoPage({ params }: MoroccoPageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.morocco;
  const href = (path: string) => localizePath(locale, path);
  const services = getServices(locale).filter((service) => MOROCCO_SERVICES.includes(service.slug));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: dict.nav.home, href: href("/") }, { name: t.breadcrumb, href: href("/morocco") }]),
          faqJsonLd([...t.faqs, ...t.extraFaqs]),
          moroccoServiceAreaJsonLd(locale, t.cities, t.metaDescription),
        ]}
      />
      <PageHero
        variant="split"
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        image={{ src: "/images/editorial-consulting-v2.webp", alt: t.heroAlt }}
        imagePosition="right"
      />

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-3 text-primary"><MapPin className="size-6" /><h2 className="text-3xl sm:text-4xl">{t.citiesTitle}</h2></div>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {t.cities.map((city) => (
                <li key={city} className="border-s-4 border-primary-display bg-[var(--surface-raised)] p-4 text-lg font-semibold">{city}</li>
              ))}
            </ul>
            <p className="mt-5 text-muted-foreground">{t.citiesNote}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex items-center gap-3 text-primary"><Languages className="size-6" /><h2 className="text-3xl sm:text-4xl">{t.languagesTitle}</h2></div>
            <p className="mt-8 text-lg leading-8 text-muted-foreground">{t.languagesText}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
              <span className="border px-4 py-2" lang="fr">Français</span>
              <span className="border px-4 py-2" lang="ar" dir="rtl">العربية</span>
              <span className="border px-4 py-2" lang="en">English</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--surface-raised)] py-20 sm:py-28">
        <Container>
          <Reveal><SectionHeading eyebrow={t.whyEyebrow} title={t.whyTitle} /></Reveal>
          <div className="mt-12 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {t.why.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="h-full border-t py-7 md:border-s md:border-t-0 md:px-7">
                  <Check className="size-5 text-primary" />
                  <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <Reveal><SectionHeading eyebrow={t.processEyebrow} title={t.processTitle} /></Reveal>
          <ol className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {t.process.map((step, index) => (
              <li key={step.title} className="border-t py-7 sm:px-6 lg:border-s">
                <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-[var(--surface-raised)] py-20 sm:py-28">
        <Container>
          <Reveal><SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <FeatureCard title={service.title} description={service.description} icon={service.icon} meta={service.engagement} href={href(`/services/${service.slug}`)} ctaLabel={dict.common.viewService} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--surface-raised)] py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.faqEyebrow}</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">{t.ctaTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{t.ctaText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href={href("/contact")}>{t.linkContact} <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href={href("/services")}>{t.linkServices}</Link></Button>
            </div>
            <PhoneWhatsAppLinks placement="morocco" className="mt-6" itemClassName="font-semibold hover:text-primary [&_svg]:text-primary" />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="divide-y border-y">
              {[...t.faqs, ...t.extraFaqs].map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="min-h-11 cursor-pointer list-none text-lg font-bold">{faq.question}</summary>
                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
