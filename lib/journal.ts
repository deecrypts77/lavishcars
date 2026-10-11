import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { type Article, type ArticleSummary, headingId } from "@/lib/journal-shared";

export * from "@/lib/journal-shared";

/**
 * Journal articles are Markdown files in content/journal/<slug>.md with YAML frontmatter.
 * Reads are synchronous so every article is prerendered into the static shell at build time.
 */
const JOURNAL_DIR = path.join(process.cwd(), "content/journal");
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const WORDS_PER_MINUTE = 220;
const REQUIRED = ["title", "description", "date", "author", "topic"] as const;

type Frontmatter = Partial<Omit<Article, "slug" | "body" | "readingMinutes">>;

function readArticle(file: string): Article {
  const source = readFileSync(path.join(JOURNAL_DIR, file), "utf8");
  const match = source.match(FRONTMATTER);
  const data: Frontmatter = match ? (parse(match[1]) ?? {}) : {};
  const body = match ? source.slice(match[0].length) : source;

  const missing = REQUIRED.filter((field) => !data[field]);
  if (missing.length) throw new Error(`content/journal/${file}: frontmatter is missing ${missing.join(", ")}`);

  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title!,
    seoTitle: data.seoTitle,
    description: data.description!,
    date: String(data.date),
    updated: String(data.updated ?? data.date),
    author: data.author!,
    topic: data.topic!,
    tags: data.tags ?? [],
    image: data.image,
    faqs: data.faqs ?? [],
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / WORDS_PER_MINUTE)),
    body,
  };
}

/** All articles, newest first. */
export const getArticles = cache((): Article[] =>
  readdirSync(JOURNAL_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readArticle)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)),
);

export const getArticle = (slug: string): Article | undefined => getArticles().find((a) => a.slug === slug);

export type OutlineItem = { id: string; text: string };

/** Second-level headings of an article body, in order, for the "In this article" navigation. */
export function getOutline(body: string): OutlineItem[] {
  return [...body.matchAll(/^##\s+(.+?)\s*#*\s*$/gm)].map(([, raw]) => {
    const text = raw
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\\(.)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    return { id: headingId(text), text };
  });
}

export const toSummary = ({ slug, title, description, date, topic, readingMinutes }: Article): ArticleSummary => ({
  slug,
  title,
  description,
  date,
  topic,
  readingMinutes,
});
