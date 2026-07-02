import { absoluteUrl, siteConfig } from "@/lib/site-config";
import type { Guide } from "@/lib/guides";
import type { Service } from "@/lib/site-data";

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

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    serviceType: [
      "Business website development",
      "AI assistant integration",
      "Workflow automation",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en",
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

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType: service.audience,
    },
    description: service.definition,
    offers: {
      "@type": "Offer",
      description: "Custom-scoped project pricing is provided after discovery.",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/contact?project=${service.slug}`),
    },
  };
}

export function servicesItemListJsonLd(services: readonly Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AtlasMind212 services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": absoluteUrl(`/services/${service.slug}#service`),
        name: service.title,
        description: service.definition,
        url: absoluteUrl(`/services/${service.slug}`),
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

export function guideDigitalDocumentJsonLd(guide: Guide, imageUrl: string) {
  const pageUrl = absoluteUrl(`/blog/${guide.slug}`);

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
    author: {
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

export function articleBlogPostingJsonLd(guide: Guide, imageUrl: string) {
  const pageUrl = absoluteUrl(`/blog/${guide.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: guide.title,
    description: guide.description,
    image: imageUrl || undefined,
    url: pageUrl,
    datePublished: guide.published_at ?? guide.created_at,
    dateModified: guide.updated_at,
    author: {
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
