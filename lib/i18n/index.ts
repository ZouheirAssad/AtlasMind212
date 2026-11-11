import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/site-config";
import { defaultLocale, isLocale, locales, localizePath, ogLocales, type Locale } from "./config";
import { ar } from "./dictionaries/ar";
import { en, type Dictionary } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";

export * from "./config";
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export type LocaleParams = Promise<{ locale: string }>;

/** Reads and validates the `[locale]` route param, 404ing on unknown locales. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

/** Replaces `{name}` placeholders in a translated string. */
export function format(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/**
 * hreflang alternates for a locale-independent path such as `/services`.
 * x-default is the unprefixed URL, which redirects by device language.
 */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localizePath(locale, path))]),
  );
  languages["x-default"] = absoluteUrl(path);
  return languages;
}

const DEFAULT_SOCIAL_IMAGE = "/images/editorial-home-hero-v2.webp";

/** Canonical, hreflang, Open Graph and Twitter metadata for a localized page. */
export function localizedMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  type = "website",
}: {
  locale: Locale;
  path: string;
  title?: Metadata["title"];
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(localizePath(locale, path));
  const socialTitle = ogTitle ?? (typeof title === "string" ? title : undefined);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: socialTitle,
      description: ogDescription ?? description,
      url,
      locale: ogLocales[locale],
      type,
      images: [{ url: DEFAULT_SOCIAL_IMAGE }],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description: ogDescription ?? description, images: [DEFAULT_SOCIAL_IMAGE] },
  };
}
