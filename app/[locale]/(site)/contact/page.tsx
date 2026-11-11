import type { Metadata } from "next";
import { Suspense } from "react";
import { Check, Clock3, Mail } from "lucide-react";
import { PhoneWhatsAppLinks, SocialLinks } from "@/components/contact-links";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getDictionary, localizedMetadata, resolveLocale, type LocaleParams } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type ContactPageProps = { params: LocaleParams };

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).contactPage;
  return localizedMetadata({ locale, path: "/contact", title: t.metaTitle, description: t.metaDescription, ogDescription: t.ogDescription });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).contactPage;

  return (
    <>
      <PageHero compact eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <Reveal className="order-2 flex flex-col gap-10 lg:order-1 lg:sticky lg:top-28 lg:self-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.fitEyebrow}</p>
              <h2 className="mt-4 text-4xl leading-[1.08]">{t.fitTitle}</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {t.fitItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-7 text-muted-foreground">
                    <Check className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-s-4 border-primary-display bg-[var(--surface-raised)] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.nextEyebrow}</p>
              <ol className="mt-5 flex flex-col gap-5">
                {t.nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center bg-primary text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-4 border-t border-border/40 pt-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">{t.email}</p>
                  <p className="text-muted-foreground"><span dir="ltr">{siteConfig.email}</span></p>
                </div>
              </div>
              <PhoneWhatsAppLinks placement="contact" itemClassName="font-semibold text-foreground hover:text-primary [&_svg]:text-primary" />
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 size-5 text-primary" />
                <div>
                  <p className="font-semibold">{t.responseTime}</p>
                  <p className="text-muted-foreground">{t.responseTimeValue}</p>
                </div>
              </div>
              <SocialLinks itemClassName="text-primary hover:border-primary" />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <Suspense fallback={<div className="min-h-[36rem] border bg-secondary/30" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
