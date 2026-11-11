import type { MetadataRoute } from "next";
import { listPublishedGuidesRecoverable } from "@/lib/guides";
import { languageAlternates, locales, localizePath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site-config";
import { services } from "@/lib/site-data";

export const dynamic = "force-dynamic";

const contentUpdateDate = new Date("2026-11-11");

type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  lastModified: Date;
};

const staticRoutes: RouteEntry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: contentUpdateDate },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: contentUpdateDate },
  { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: contentUpdateDate },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly", lastModified: contentUpdateDate },
  { path: "/morocco", priority: 0.9, changeFrequency: "monthly", lastModified: contentUpdateDate },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: contentUpdateDate },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: contentUpdateDate },
  { path: "/imprint", priority: 0.3, changeFrequency: "yearly", lastModified: contentUpdateDate },
];

/** One entry per locale, each carrying hreflang alternates for all locales. */
function localizedEntries(route: RouteEntry): MetadataRoute.Sitemap {
  const languages = languageAlternates(route.path);
  return locales.map((locale) => ({
    url: absoluteUrl(localizePath(locale, route.path)),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceRoutes: RouteEntry[] = services.map((service) => ({
    path: `/services/${service.slug}`,
    lastModified: contentUpdateDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const guideRoutes = await getGuideRoutes();

  return [...staticRoutes, ...serviceRoutes, ...guideRoutes].flatMap(localizedEntries);
}

async function getGuideRoutes(): Promise<RouteEntry[]> {
  try {
    const result = await listPublishedGuidesRecoverable();
    if (result.status !== "ok") return [];

    return result.guides.map((guide) => ({
      path: `/blog/${guide.slug}`,
      lastModified: guide.updated_at ? new Date(guide.updated_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}
