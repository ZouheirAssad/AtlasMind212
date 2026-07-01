export const siteConfig = {
  name: "AtlasMind212",
  url: getSiteUrl(),
  description:
    "AtlasMind212 builds high-performance business websites, connects custom AI assistants, and automates background workflows.",
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
