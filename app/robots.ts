import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const PRIVATE_PATHS = ["/admin", "/admin/", "/api", "/api/"];

/**
 * AI search and assistant crawlers are named explicitly (GEO): being crawlable
 * by them is what lets ChatGPT, Perplexity, Claude, Gemini and Copilot cite
 * the site. They get the same access as everyone else.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
