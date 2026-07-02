import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { listPublishedGuidesRecoverable } from "@/lib/guides";
import { services } from "@/lib/site-data";

export const dynamic = "force-dynamic";

const launchDate = new Date("2026-07-01");

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/imprint", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceRoutes = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: launchDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const guideRoutes = await getGuideRoutes();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: launchDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceRoutes,
    ...guideRoutes,
  ];
}

async function getGuideRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const result = await listPublishedGuidesRecoverable();
    if (result.status !== "ok") return [];

    return result.guides.map((guide) => ({
      url: absoluteUrl(`/blog/${guide.slug}`),
      lastModified: guide.updated_at ? new Date(guide.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}
