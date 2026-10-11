# LavishCars

Marketing site for **LavishCars.com** — a luxury car rental marketplace in Dubai (UAE) and Houston (USA).
Dark, cinematic showroom design; booking is WhatsApp-first.

**Stack:** Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript 6 · Tailwind CSS 4 · ESLint 10.

## Getting started

Requires Node.js ≥ 20.9 (developed on Node 24).

```bash
npm install
cp .env.example .env.local   # optional — defaults point at https://lavishcars.com
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` · `npm run lint:fix` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Lint + typecheck — run before every commit |
| `npm run import:journal` | Re-imports the WordPress blog (see below); keeps existing files unless `-- --force` |

## Project structure

```
app/                    Routes only (pages, layout, metadata, sitemap, robots)
  <route>/_components/  Client components used by that one route (not routable)
components/
  layout/               Site chrome: Header, Footer, Logo
  sections/             Home-page sections, one per file
  templates/            Page templates shared by several routes (MarketPage, LegalPage)
  ui/                   Small reusable building blocks (SectionHeader, Marquee, icons…)
content/                All copy and data: site facts, markets, fleet, brands, press,
                        reviews, FAQs, story, navigation, investment terms
  journal/              One Markdown file per article (<slug>.md, YAML frontmatter)
config/                 Legacy WordPress redirect tables read by next.config.ts
lib/                    Helpers: contact links, JSON-LD, journal loader (journal.ts is
                        server-only; journal-shared.ts is safe for client components)
scripts/                One-off tooling (WordPress journal import)
public/images/          Served images: fleet/, brands/, press/, payments/, logo/, journal/
assets/library/         Unused source photos kept out of the build
docs/                   Design system, asset register, redirects, planning notes
```

### Conventions

- **Content lives in `content/`, never in components.** Phone numbers, addresses, hours, ratings,
  FAQs and so on have a single source of truth; pages and JSON-LD read from it.
- **Server Components by default.** Add `"use client"` only for interactivity (header menus,
  composers, marquee pause). Don't pass functions from server to client components.
- **Imports use the `@/` alias** (`@/components/ui/Reveal`, `@/content/site`).
- **Styling:** design tokens in `app/globals.css` (`:root` → `@theme inline`); helper classes live in
  `@layer components` so utilities can override them. See `docs/DESIGN.md`.
- **Images:** local files only, through `next/image`. Log every new file in `docs/ASSET_REGISTER.md`.
- **Accessibility:** WCAG 2.2 AA — one `h1` per page, labelled sections, visible focus, reduced-motion
  support, external links announce “opens in a new tab”.
- **Facts only:** no invented prices, inventory or reviews. Reviews are verbatim Google excerpts.

### Common tasks

- **Add a vehicle:** add an entry to `content/fleet.ts` and its photo to `public/images/fleet/`.
  The fleet grid, vehicle page, sitemap and related cars pick it up automatically.
- **Change contact details or hours:** edit `content/site.ts`.
- **Add a nav or footer link:** edit `content/navigation.ts`.
- **Add a journal article:** create `content/journal/<slug>.md`. Required frontmatter: `title`,
  `description`, `date` (YYYY-MM-DD), `author`, `topic`; optional `updated`, `seoTitle`, `tags`,
  `image` (`src`, `alt`, `width`, `height`) and `faqs` (`question`/`answer` pairs, also emitted as
  FAQPage JSON-LD). Put images in `public/images/journal/`. The index, home teaser, sitemap and
  related-article links update automatically.
- **Add a legacy redirect:** add a pair to `config/legacy-redirects.json` and document it in
  `docs/REDIRECTS.md`.

### Journal import

The 115 articles were imported from the WordPress REST API with `scripts/import-journal.mjs`: Elementor
HTML is converted to Markdown, FAQ accordions move into frontmatter, images are downloaded and
re-encoded to WebP (≤ 1600 px), and links to old WordPress URLs are rewritten to their new routes.
Article text is the client's published copy, imported as-is. The Markdown files are now the source
of truth: only re-run the import with `--force` if you want to discard edits and pull WordPress again.

## Before launch

- Confirm the Dubai address: the site uses Meydan Grandstand, but the Google Business listing is pinned in Business Bay.
- Have the `/invest` copy reviewed by counsel (the live site promises “guaranteed” returns; this build
  presents them as indicative with a disclaimer).
- Verify licences for all photography (`docs/ASSET_REGISTER.md`), and replace the legal page stubs.

## Docs

- `docs/DESIGN.md` — art direction, tokens, components, motion, accessibility.
- `docs/ASSET_REGISTER.md` · `docs/ASSET_PACK_SOURCES.md` — image sources and licence status.
- `docs/REDIRECTS.md` — WordPress → Next.js URL map.
- `docs/planning/` — original discovery, project brief and decisions.
