import type { NextConfig } from "next";
import legacyJournalSlugs from "./config/legacy-journal-slugs.json";
import legacyRedirects from "./config/legacy-redirects.json";

/**
 * Old WordPress URLs on lavishcars.com mapped to their new routes (see docs/REDIRECTS.md).
 * Blog posts lived at the site root (/<slug>/); they now live at /journal/<slug>.
 */
const redirects = [
  ...(legacyRedirects as [source: string, destination: string][]),
  ...legacyJournalSlugs.map((slug): [string, string] => [`/${slug}`, `/journal/${slug}`]),
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // All imagery is served locally from /public/images — no remote hosts.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return redirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
