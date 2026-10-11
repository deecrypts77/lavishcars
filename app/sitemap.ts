import type { MetadataRoute } from "next";
import { fleet } from "@/content/fleet";
import { SITE_URL } from "@/content/site";
import { articleHref, getArticles } from "@/lib/journal";

const LAST_MODIFIED = "2026-10-11";

const pages = [
  "/",
  "/uae/dubai",
  "/usa/houston",
  "/fleet",
  "/services",
  "/about",
  "/journal",
  "/invest",
  "/list-your-car",
  "/contact",
  "/faq",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refunds",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : route.startsWith("/legal") ? 0.3 : 0.7,
    })),
    ...fleet.map((v) => ({
      url: `${SITE_URL}/vehicles/${v.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getArticles().map((a) => ({
      url: `${SITE_URL}${articleHref(a.slug)}`,
      lastModified: a.updated,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
