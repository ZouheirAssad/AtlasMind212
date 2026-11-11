import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { PageHero } from "@/components/page-hero";
import { getDictionary, localizedMetadata, resolveLocale, type LocaleParams } from "@/lib/i18n";
import { formattedAddress, isSet, phoneHref, siteConfig, whatsappHref } from "@/lib/site-config";

type ImprintPageProps = { params: LocaleParams };

export async function generateMetadata({ params }: ImprintPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).imprint;
  return localizedMetadata({ locale, path: "/imprint", title: t.title, description: t.description });
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b py-3 last:border-0 sm:grid-cols-[12rem_1fr]">
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/**
 * Sections render only from facts set in `siteConfig`; a section whose
 * required facts are missing is omitted instead of showing placeholder text.
 */
export default async function ImprintPage({ params }: ImprintPageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.imprint;
  const { legal } = siteConfig;
  const address = formattedAddress();
  const phone = phoneHref();
  const whatsapp = whatsappHref();

  const sections: Array<{ id: string; title: string; body: React.ReactNode }> = [];

  if (isSet(legal.legalName) || address) {
    sections.push({
      id: "publisher",
      title: t.publisherTitle,
      body: (
        <dl>
          {isSet(legal.legalName) && <Row label={t.legalNameLabel}>{legal.legalName}</Row>}
          {isSet(legal.legalForm) && <Row label={t.legalFormLabel}>{legal.legalForm}</Row>}
          {address && <Row label={t.addressLabel}>{address}</Row>}
          {isSet(legal.ice) && <Row label={t.iceLabel}><span dir="ltr">{legal.ice}</span></Row>}
          {isSet(legal.rc) && <Row label={t.rcLabel}><span dir="ltr">{legal.rc}</span></Row>}
          {isSet(legal.if) && <Row label={t.ifLabel}><span dir="ltr">{legal.if}</span></Row>}
        </dl>
      ),
    });
  }

  sections.push({
    id: "contact",
    title: t.contactTitle,
    body: (
      <dl>
        <Row label={t.emailLabel}><a href={`mailto:${siteConfig.email}`} className="hover:text-primary" dir="ltr">{siteConfig.email}</a></Row>
        {phone && <Row label={t.phoneLabel}><a href={phone} className="hover:text-primary" dir="ltr">{siteConfig.phone}</a></Row>}
        {whatsapp && <Row label={t.whatsappLabel}><a href={whatsapp} className="hover:text-primary" dir="ltr">{siteConfig.whatsapp}</a></Row>}
      </dl>
    ),
  });

  if (isSet(legal.responsiblePerson)) {
    sections.push({ id: "responsibility", title: t.responsibleTitle, body: <p>{legal.responsiblePerson}</p> });
  }

  sections.push({ id: "hosting", title: t.hostingTitle, body: <p>{t.hostingBody}</p> });

  return <><PageHero eyebrow={dict.legal.eyebrow} title={t.title} description={t.description} /><LegalLayout sections={sections} label={dict.legal.onThisPage} /></>;
}
