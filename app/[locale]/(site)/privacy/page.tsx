import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { PageHero } from "@/components/page-hero";
import { getDictionary, localizedMetadata, resolveLocale, type LocaleParams } from "@/lib/i18n";

type PrivacyPageProps = { params: LocaleParams };

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).privacy;
  return localizedMetadata({ locale, path: "/privacy", title: t.title, description: t.description });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.privacy;
  const sections = t.sections.map((section) => ({ id: section.id, title: section.title, body: <p>{section.body}</p> }));
  return <><PageHero eyebrow={dict.legal.eyebrow} title={t.title} description={t.description} /><LegalLayout sections={sections} label={dict.legal.onThisPage} /></>;
}
