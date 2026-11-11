import { absoluteUrl, isSet, siteConfig, socialProfiles } from "@/lib/site-config";
import type { Guide } from "@/lib/guides";
import type { Service } from "@/lib/site-data";
import { getDictionary } from "@/lib/i18n";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n/config";

function localUrl(locale: Locale, path: string) {
  return absoluteUrl(localizePath(locale, path));
}

/** Drops undefined/null/empty values so schema never carries empty fields. */
function compact<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)),
  ) as Partial<T>;
}

function postalAddressJsonLd() {
  const { street, city, postalCode, country } = siteConfig.address;
  if (!isSet(street) && !isSet(city)) return undefined;
  return compact({ "@type": "PostalAddress", streetAddress: street, addressLocality: city, postalCode, addressCountry: country });
}

function founderJsonLd() {
  const { founder } = siteConfig;
  if (!isSet(founder.name)) return undefined;
  return compact({
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.jobTitle,
    image: isSet(founder.image) ? absoluteUrl(founder.image) : undefined,
    sameAs: isSet(founder.url) ? [founder.url] : undefined,
    worksFor: { "@id": absoluteUrl("/#organization") },
  });
}

export type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

function stringifyJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}

export function organizationJsonLd(locale: Locale = defaultLocale) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: getDictionary(locale).meta.siteDescription,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.logo),
    legalName: siteConfig.legal.legalName,
    telephone: siteConfig.phone,
    address: postalAddressJsonLd(),
    foundingDate: siteConfig.foundingDate,
    founder: founderJsonLd(),
    sameAs: socialProfiles().map((profile) => profile.url),
    hasMap: siteConfig.social.googleBusinessProfile,
    areaServed: AREA_SERVED,
    knowsLanguage: ["fr", "ar", "en"],
    contactPoint: compact({
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      url: localUrl(locale, "/contact"),
      availableLanguage: ["French", "Arabic", "English"],
      areaServed: ["MA", "EU"],
    }),
    knowsAbout: [
      "Website creation",
      "Search engine optimization (SEO)",
      "Generative engine optimization (GEO)",
      "Google Business Profile and Google Maps optimization",
      "Local SEO",
      "Web development",
      "Backend and API development",
      "LLM integration",
      "Workflow automation",
    ],
    serviceType: [
      "Website creation",
      "SEO and GEO",
      "Google Maps and local SEO",
      "Web development",
      "Backend and API development",
      "Technical consulting and product conception",
      "LLM integration and AI consulting",
      "Workflow automation",
    ],
  });
}

const AREA_SERVED = [
  { "@type": "Country", name: "Morocco", identifier: "MA" },
  { "@type": "Place", name: "Europe" },
];

/** ProfessionalService entity for the Morocco page, listing the cities served. */
export function moroccoServiceAreaJsonLd(locale: Locale, cities: readonly string[], description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": localUrl(locale, "/morocco#service-area"),
    name: `${siteConfig.name} Morocco`,
    url: localUrl(locale, "/morocco"),
    description,
    email: siteConfig.email,
    telephone: isSet(siteConfig.phone) ? siteConfig.phone : undefined,
    address: postalAddressJsonLd(),
    hasMap: isSet(siteConfig.social.googleBusinessProfile) ? siteConfig.social.googleBusinessProfile : undefined,
    image: absoluteUrl(siteConfig.logo),
    parentOrganization: { "@id": absoluteUrl("/#organization") },
    inLanguage: locale,
    knowsLanguage: ["fr", "ar", "en"],
    areaServed: [
      { "@type": "Country", name: "Morocco", identifier: "MA" },
      ...cities.map((city) => ({ "@type": "City", name: city, containedInPlace: { "@type": "Country", name: "Morocco" } })),
    ],
  };
}

export function websiteJsonLd(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceJsonLd(service: Service, locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": localUrl(locale, `/services/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    url: localUrl(locale, `/services/${service.slug}`),
    inLanguage: locale,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: AREA_SERVED,
    audience: {
      "@type": "Audience",
      audienceType: service.audience,
    },
    description: service.definition,
    offers: {
      "@type": "Offer",
      description: getDictionary(locale).serviceDetail.offerDescription,
      availability: "https://schema.org/InStock",
      url: localUrl(locale, `/contact?project=${service.slug}`),
    },
  };
}

export function servicesItemListJsonLd(services: readonly Service[], locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AtlasMind services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": localUrl(locale, `/services/${service.slug}#service`),
        name: service.title,
        description: service.definition,
        url: localUrl(locale, `/services/${service.slug}`),
        provider: { "@id": absoluteUrl("/#organization") },
      },
    })),
  };
}

export function faqJsonLd(faqs: Service["faqs"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function guideDigitalDocumentJsonLd(guide: Guide, imageUrl: string, locale: Locale = defaultLocale) {
  const pageUrl = localUrl(locale, `/blog/${guide.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: guide.title,
    description: guide.description,
    image: imageUrl || undefined,
    encodingFormat: "application/pdf",
    url: pageUrl,
    datePublished: guide.published_at ?? guide.created_at,
    dateModified: guide.updated_at,
    author: founderJsonLd() ?? {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}

export function articleBlogPostingJsonLd(guide: Guide, imageUrl: string, locale: Locale = defaultLocale) {
  const pageUrl = localUrl(locale, `/blog/${guide.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: guide.title,
    description: guide.description,
    image: imageUrl || undefined,
    url: pageUrl,
    datePublished: guide.published_at ?? guide.created_at,
    dateModified: guide.updated_at,
    author: founderJsonLd() ?? {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}
