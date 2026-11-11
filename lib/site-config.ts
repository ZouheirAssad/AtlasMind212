/**
 * Single source of business facts for pages, structured data and llms.txt.
 *
 * Empty strings mean "not provided": every consumer hides the related UI and
 * omits the related schema field. Never put placeholder values here.
 */
export const siteConfig = {
  name: "AtlasMind",
  url: getSiteUrl(),
  description:
    "AtlasMind creates business websites, improves visibility on Google, Google Maps, and AI search (SEO & GEO), and builds web applications, integrations, and automations for businesses in Morocco and Europe.",
  email: "contact@atlasmind212.com",
  locale: "fr_MA",
  logo: "/atlasmind-logo.png",

  /** International format, e.g. "+212600000000". */
  phone: "",
  /** International format without spaces, e.g. "+212600000000". */
  whatsapp: "",

  legal: {
    /** e.g. "AtlasMind SARL AU". */
    legalName: "",
    /** e.g. "SARL AU", "Auto-entrepreneur". */
    legalForm: "",
    /** Moroccan identifiers. */
    ice: "",
    rc: "",
    if: "",
    /** Person responsible for the content (directeur de la publication). */
    responsiblePerson: "",
  },

  address: {
    street: "",
    city: "",
    postalCode: "",
    /** ISO 3166-1 alpha-2. */
    country: "MA",
  },

  /** e.g. "2025". */
  foundingDate: "",

  founder: {
    name: "",
    jobTitle: "",
    /** Profile URL, e.g. LinkedIn. */
    url: "",
    /** Path under /public. */
    image: "",
  },

  social: {
    instagram: "https://www.instagram.com/atlasmind212.ai/",
    linkedin: "",
    facebook: "",
    github: "",
    googleBusinessProfile: "",
  },
} as const;

/** True when a business fact has been provided (non-empty after trimming). */
export function isSet(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Social and directory profile URLs that are set, for links and schema sameAs. */
export function socialProfiles(): Array<{ key: keyof typeof siteConfig.social; url: string }> {
  return (Object.entries(siteConfig.social) as Array<[keyof typeof siteConfig.social, string]>)
    .filter(([, url]) => isSet(url))
    .map(([key, url]) => ({ key, url }));
}

/** `tel:` href from the configured phone, or null. */
export function phoneHref() {
  return isSet(siteConfig.phone) ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : null;
}

/** `https://wa.me/...` link with an optional prefilled message, or null. */
export function whatsappHref(message?: string) {
  if (!isSet(siteConfig.whatsapp)) return null;
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** Human-readable postal address, or null when street and city are missing. */
export function formattedAddress() {
  const { street, postalCode, city } = siteConfig.address;
  if (!isSet(street) && !isSet(city)) return null;
  return [street, [postalCode, city].filter(isSet).join(" "), "Maroc"].filter(isSet).join(", ");
}

function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlasmind212.com";

  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return "https://atlasmind212.com";
  }
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
