export const siteConfig = {
  name: "AtlasMind",
  url: getSiteUrl(),
  description:
    "AtlasMind builds web applications, backend systems, practical integrations, and workflow automations for businesses and product teams.",
  email: "hello@atlasmind212.com",
  locale: "en_US",
} as const;

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
