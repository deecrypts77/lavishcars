#!/usr/bin/env node
/**
 * Imports the WordPress blog on lavishcars.com into content/journal/*.md.
 *
 *   node scripts/import-journal.mjs [--origin https://lavishcars.com] [--force]
 *
 * - Posts come from the public WP REST API (title, dates, author, Yoast meta, featured image).
 * - Elementor HTML is converted to GitHub-flavoured Markdown; FAQ accordions move to frontmatter.
 * - Every image is downloaded to public/images/journal/ (never hotlinked).
 * - Links to old WordPress URLs are rewritten to their routes on this site.
 * - Writes config/legacy-journal-slugs.json, which next.config.ts uses to redirect /<slug> → /journal/<slug>.
 *
 * Existing Markdown files are left untouched unless --force is passed, so edits made after the
 * import are never overwritten by accident.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { selectAll, matches, select } from "hast-util-select";
import { toString } from "hast-util-to-string";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import sharp from "sharp";
import { unified } from "unified";
import { stringify as toYaml } from "yaml";

const args = process.argv.slice(2);
const ORIGIN = (args.includes("--origin") ? args[args.indexOf("--origin") + 1] : "https://lavishcars.com").replace(/\/$/, "");
const FORCE = args.includes("--force");
const ROOT = path.resolve(import.meta.dirname, "..");
const POSTS_DIR = path.join(ROOT, "content/journal");
const IMAGE_DIR = path.join(ROOT, "public/images/journal");
const IMAGE_URL = "/images/journal";

const legacyRedirects = JSON.parse(await readFile(path.join(ROOT, "config/legacy-redirects.json"), "utf8"));
const report = {
  written: 0,
  skipped: 0,
  images: 0,
  unresolvedLinks: new Set(),
  droppedMedia: new Set(),
  brokenImages: new Set(),
};

/* --- Fetching ----------------------------------------------------------- */

async function fetchAllPosts() {
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${ORIGIN}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=1`);
    if (!res.ok) throw new Error(`WP API ${res.status} on page ${page}`);
    posts.push(...(await res.json()));
    if (page >= Number(res.headers.get("x-wp-totalpages") ?? 1)) return posts;
  }
}

const downloads = new Map();

const MAX_IMAGE_WIDTH = 1600;

/**
 * Downloads a WordPress upload once and re-encodes it as WebP (WordPress keeps multi-megabyte PNG
 * originals). Resolves to `{ src, width, height }`, or null if the file is gone from WordPress.
 */
function localImage(remoteUrl) {
  const url = new URL(remoteUrl, ORIGIN);
  url.search = "";
  const key = url.href;
  if (!downloads.has(key)) {
    // WordPress filenames are only unique within an upload month, so keep the month as a prefix.
    const month = url.pathname.match(/\/uploads\/(\d{4})\/(\d{2})\//)?.slice(1).join("-");
    const base = path.parse(url.pathname).name.toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
    const name = `${month ? `${month}-` : ""}${base}.webp`;
    const file = path.join(IMAGE_DIR, name);
    const describe = async () => {
      const { width, height } = await sharp(file).metadata();
      return { src: `${IMAGE_URL}/${name}`, width, height };
    };
    const job = existsSync(file)
      ? describe()
      : fetch(key).then(async (res) => {
          if (!res.ok) {
            report.brokenImages.add(`${res.status} ${key}`);
            return null;
          }
          await sharp(Buffer.from(await res.arrayBuffer()))
            .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(file);
          report.images++;
          return describe();
        });
    downloads.set(key, job);
  }
  return downloads.get(key);
}

/* --- Link rewriting ------------------------------------------------------ */

/** Supports the subset of Next.js path syntax used in legacy-redirects.json: `:param+` and `:param(regex)`. */
const redirectPatterns = legacyRedirects.map(([source, destination]) => [
  new RegExp(`^${source.replace(/:\w+\+/g, ".+").replace(/:\w+\(([^)]+)\)/g, "(?:$1)")}$`),
  destination,
]);

const matchRedirect = (pathname) => redirectPatterns.find(([re]) => re.test(pathname))?.[1] ?? null;

async function rewriteHref(href, postSlugs) {
  let url;
  try {
    url = new URL(href, ORIGIN);
  } catch {
    return href;
  }
  if (!/^https?:$/.test(url.protocol)) return href;
  if (url.hostname.replace(/^www\./, "") !== new URL(ORIGIN).hostname.replace(/^www\./, "")) return url.href;

  const pathname = url.pathname.replace(/\/+$/, "") || "/";
  if (pathname.startsWith("/wp-content/uploads/")) {
    return /\.(webp|jpe?g|png|gif|avif)$/i.test(pathname) ? ((await localImage(url.href))?.src ?? null) : null;
  }
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (first && !rest.length && postSlugs.has(first)) return `/journal/${first}${url.hash}`;
  const redirected = matchRedirect(pathname);
  if (redirected) return redirected;
  if (!existsSync(path.join(ROOT, "app", pathname, "page.tsx"))) report.unresolvedLinks.add(pathname);
  return `${pathname}${url.hash}`;
}

/* --- HTML → Markdown ----------------------------------------------------- */

const FAQ_HEADING = /f\w*ently\s+asked|\bfaqs?\b/i;
const clean = (s) => s.replace(/\s+/g, " ").trim();

/** Removes every descendant for which `drop` returns true. */
function prune(node, drop) {
  if (!node.children) return;
  node.children = node.children.filter((child) => !drop(child));
  node.children.forEach((child) => prune(child, drop));
}

/** Replaces matching elements with their children. */
function unwrap(node, selector) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) =>
    child.type === "element" && matches(selector, child) ? (child.children ?? []) : [child],
  );
  node.children.forEach((child) => unwrap(child, selector));
}

function extractFaqs(tree) {
  return selectAll(".ct-accordion-item", tree)
    .map((item) => {
      const question = clean(toString(select(".ct-ac-title-text", item) ?? item));
      const content = select(".ct-ac-content", item);
      const paragraphs = content ? selectAll("p, li", content).map((p) => clean(toString(p))) : [];
      const answer = (paragraphs.length ? paragraphs : [clean(toString(content ?? item))]).filter(Boolean).join("\n\n");
      return { question, answer };
    })
    .filter((f) => f.question && f.answer);
}

const isElement = (node, selector) => node.type === "element" && matches(selector, node);

async function toMarkdown(html, { postSlugs, slug, featuredSrc }) {
  const tree = unified().use(rehypeParse, { fragment: true }).parse(html);
  const faqs = extractFaqs(tree);

  prune(tree, (n) => {
    if (isElement(n, ".elementor-widget-ct_accordion, script, style, noscript")) return true;
    if (isElement(n, ".elementor-widget-heading") && FAQ_HEADING.test(toString(n))) return true;
    return false;
  });

  // Embedded video: link to YouTube rather than shipping a third-party iframe; drop self-hosted files.
  for (const widget of selectAll(".elementor-widget-video, iframe, video", tree)) {
    const src = select("iframe, source, video", widget)?.properties?.src ?? widget.properties?.src ?? "";
    const youtube = String(src).match(/youtube\.com\/embed\/([\w-]+)/);
    widget.tagName = "p";
    widget.properties = {};
    widget.children = youtube
      ? [{ type: "element", tagName: "a", properties: { href: `https://www.youtube.com/watch?v=${youtube[1]}` }, children: [{ type: "text", value: "Watch the video on YouTube" }] }]
      : [];
    if (!youtube && src) report.droppedMedia.add(`${slug}: ${src}`);
  }

  for (const img of selectAll("img", tree)) {
    const image = await localImage(String(img.properties.src));
    img.properties = image ? { src: image.src, alt: clean(String(img.properties.alt ?? "")) } : { dataBroken: true };
  }
  prune(tree, (n) => isElement(n, "img[data-broken]") || (featuredSrc && isElement(n, `img[src="${featuredSrc}"]`)));
  prune(tree, (n) => isElement(n, "figure") && !select("img", n));
  prune(tree, (n) => isElement(n, "tr") && !clean(toString(n)));
  for (const figure of selectAll("figure", tree)) {
    const alt = select("img", figure)?.properties.alt ?? "";
    prune(figure, (n) => isElement(n, "figcaption") && clean(toString(n)).toLowerCase() === String(alt).toLowerCase());
  }
  for (const a of selectAll("a[href]", tree)) {
    const href = await rewriteHref(String(a.properties.href), postSlugs);
    a.properties = href ? { href } : {};
    if (!href) a.tagName = "span";
    const text = toString(a);
    if (href && /^\s*https?:\/\/(www\.)?lavishcars\.com/i.test(text)) {
      a.children = [{ type: "text", value: `${/^\s/.test(text) ? " " : ""}LavishCars.com` }];
    }
  }

  // WordPress tables have no <thead>; promote the first row so Markdown gets a real header.
  for (const table of selectAll("table", tree)) {
    if (select("th", table)) continue;
    const body = select("tbody", table) ?? table;
    const first = body.children.find((n) => isElement(n, "tr"));
    if (!first) continue;
    body.children = body.children.filter((n) => n !== first);
    for (const cell of first.children) if (cell.type === "element") cell.tagName = "th";
    table.children.unshift({ type: "element", tagName: "thead", properties: {}, children: [first] });
  }

  // Headings and table header cells carry their own weight; inline bold there is noise.
  for (const el of selectAll("h1, h2, h3, h4, h5, h6, th", tree)) unwrap(el, "b, strong");
  unwrap(tree, "span");

  const mdast = await unified().use(rehypeRemark).run(tree);
  const markdown = unified()
    .use(remarkGfm)
    .use(remarkStringify, { bullet: "-", emphasis: "_", strong: "*", rule: "-", fences: true })
    .stringify(mdast)
    .replace(/^(?:\u00a0|&#x20;|&#xA0;)+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { markdown, faqs };
}

/* --- Metadata ------------------------------------------------------------ */

const decode = (html) => clean(toString(unified().use(rehypeParse, { fragment: true }).parse(html)));

/** First match wins; keywords are matched as whole hyphen-separated words of the slug. */
const TOPICS = [
  ["Electric & hybrid", "electric ev evs byd tesla hybrid self-driving smart-transport"],
  ["Driving in the UAE", "licence license licenses documents rules road-safety salik tolls speed-cameras fines drive-to driving-in under-25 checklist newcomers oman saudi-arabia"],
  ["Comparisons", "vs versus compared comparing comparison compare"],
  ["Costs & deposits", "deposit security-deposit insurance price prices pricing cost cheaper budget-friendly affordability deals rates fees"],
  ["Travel & lifestyle", "hotels tourist tourists visitor vacation travel explore season weekend wedding events hatta desert coastline road-trip family adventure adventures roads"],
].map(([topic, words]) => [topic, new RegExp(`(?:^|-)(?:${words.split(" ").join("|")})(?:-|$)`)]);
const topicFor = (slug) => TOPICS.find(([, re]) => re.test(slug))?.[0] ?? "Marques & models";

const featuredMedia = (post) => post._embedded?.["wp:featuredmedia"]?.[0];
const featuredImage = async (post) => {
  const url = featuredMedia(post)?.source_url;
  return url ? localImage(url) : null;
};

async function frontmatterFor(post, faqs) {
  const yoast = post.yoast_head_json ?? {};
  const media = featuredMedia(post);
  const image = await featuredImage(post);
  const title = decode(post.title.rendered);
  const description = clean(yoast.description || decode(post.excerpt.rendered).replace(/\s*\[…\]\s*$/, "…"));
  const data = {
    title,
    ...(yoast.title && decode(yoast.title) !== title ? { seoTitle: decode(yoast.title) } : {}),
    description,
    date: post.date.slice(0, 10),
    updated: post.modified.slice(0, 10),
    author: post._embedded?.author?.[0]?.name ?? "LavishCars",
    topic: topicFor(post.slug),
    tags: (post._embedded?.["wp:term"]?.[1] ?? []).map((t) => decode(t.name).replace(/^#/, "")),
  };
  if (image) {
    const alt = clean(media.alt_text ?? "");
    const altIsSlug = alt.toLowerCase().replace(/[^a-z0-9]+/g, "-") === post.slug;
    data.image = { ...image, alt: alt && !altIsSlug ? alt : title };
  }
  if (faqs.length) data.faqs = faqs;
  return data;
}

/* --- Run ----------------------------------------------------------------- */

await mkdir(POSTS_DIR, { recursive: true });
await mkdir(IMAGE_DIR, { recursive: true });

const posts = await fetchAllPosts();
const postSlugs = new Set(posts.map((p) => p.slug));
console.log(`Fetched ${posts.length} posts from ${ORIGIN}`);

for (const post of posts) {
  const file = path.join(POSTS_DIR, `${post.slug}.md`);
  if (existsSync(file) && !FORCE) {
    report.skipped++;
    continue;
  }
  const { markdown, faqs } = await toMarkdown(post.content.rendered, {
    postSlugs,
    slug: post.slug,
    featuredSrc: (await featuredImage(post))?.src,
  });
  const frontmatter = toYaml(await frontmatterFor(post, faqs), { lineWidth: 0 });
  await writeFile(file, `---\n${frontmatter}---\n\n${markdown}\n`);
  report.written++;
}

await writeFile(
  path.join(ROOT, "config/legacy-journal-slugs.json"),
  `${JSON.stringify([...postSlugs].sort(), null, 2)}\n`,
);

console.log(`Wrote ${report.written} posts (${report.skipped} existing kept), downloaded ${report.images} images.`);
if (report.unresolvedLinks.size) console.log("Internal links without a new route:", [...report.unresolvedLinks].sort());
if (report.droppedMedia.size) console.log("Dropped self-hosted media:", [...report.droppedMedia]);
if (report.brokenImages.size) console.log("Images missing on WordPress (left out):", [...report.brokenImages]);
