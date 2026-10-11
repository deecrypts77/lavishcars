import type { Faq } from "@/content/faqs";

/** Journal types and helpers that are safe to import from client components. */

export type ArticleImage = { src: string; alt: string; width: number; height: number };

export type Article = {
  slug: string;
  title: string;
  /** Optional <title> override when the search title differs from the headline. */
  seoTitle?: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  topic: string;
  tags: string[];
  image?: ArticleImage;
  faqs: Faq[];
  readingMinutes: number;
  body: string;
};

export type ArticleSummary = Pick<Article, "slug" | "title" | "description" | "date" | "topic" | "readingMinutes">;

export const articleHref = (slug: string) => `/journal/${slug}`;

/** Anchor id for an article heading; the outline and the rendered headings must agree. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
