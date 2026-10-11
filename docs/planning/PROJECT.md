# LavishCars — Website Redesign Project (Deecrypt Technologies)

Date: 2026-10-11

## Project goals

- Create an Awwwards‑level luxury automotive digital showroom for LavishCars that elevates brand perception, captures WhatsApp‑first demand, and improves organic discovery (UAE + USA/Houston initially).
- Establish a scalable IA for additional U.S. cities without template “marketplace” aesthetics.
- Ship a performant, accessible, SEO‑sound foundation with progressive motion hooks for future cinematic vehicle experiences.

## Primary audience

- High‑intent renters in Dubai/UAE and Houston, USA seeking luxury, sports/supercars, SUVs, and chauffeur.
- Business/leisure travelers requiring airport/hotel/residence delivery.
- Returning clients cross‑booking between UAE and USA.

## Stack (Phase 0.5 scaffold)

- Next.js (App Router) + TypeScript
- Tailwind CSS with CSS design tokens (luxury dark editorial palette)
- `next/font` (Inter) — system‑grade premium sans
- SSR/SSG for SEO‑critical pages; progressive enhancement for motion (prefers‑reduced‑motion respected)

## Information Architecture (Phase 0 scaffold)

- Home: `/`
- Markets:
  - UAE (hub): `/uae`
  - Dubai (market page): `/uae/dubai`
  - USA (hub in future): `/usa` (stub)
  - Houston (market page): `/usa/houston`
- Fleet:
  - Global fleet overview: `/fleet` (stub; may split per‑market later)
  - Vehicle detail: `/vehicles/[slug]` (stub — canonical per model/series for SEO)
- Company/services:
  - Services: `/services`
  - About: `/about`
  - FAQ: `/faq`
  - Contact: `/contact`
  - Legal: `/legal/privacy`, `/legal/terms`

Redirects will preserve legacy WordPress paths (see `REDIRECTS.md`).

## Non‑goals (Phase 0/0.5)

- No cinematic scroll/video/WebGL yet (placeholders only).
- No booking backend or availability/pricing scrapes.
- No claims of asset licensing; all imagery marked “needs‑verify”.
- No reviews import or third‑party widgets.

## Success criteria (Phase 0 + 0.5)

- Discovery docs accurately reflect the live site (contacts, markets, services, URL patterns).
- Build passes locally with `npm install && npm run build`.
- Accessible, semantic app shell with skip link and focus states.
- Baseline SEO: metadata API, robots, sitemap, LocalBusiness JSON‑LD with real contact facts.
- Sitemap routes scaffolded and linkable; mobile nav and dual‑location footer included.

## Phase 1 — Design direction (next steps)

- Status: In progress — initial tokens, components, and page shells implemented.
- Implemented:
  - Refined tokens (ink/charcoal palette, champagne accent, architectural type scale, elevation).
  - Components: `HeroCinematic`, `VehicleCard` with microinteractions respecting `prefers-reduced-motion`.
  - Pages updated: Home (showroom section), Fleet (premium grid placeholders), Vehicle PDP (cinematic hero shell + enquiry).
  - DESIGN.md added for Atelier review.
- Upcoming:
  - Finalize motion choreography guidelines and reduce-mode specifics.
  - Prepare card variants for SUV/sedan/supercar without implying inventory.
  - Accessibility sweep for interactive elements and contrast.

## Phase 2 — Assets and content

- Asset intake pipeline and licensing verification (see `ASSET_REGISTER.md`).
- Market‑scoped fleet content (brands, categories) signed off by client; no unverified models.
- Photography/video brief for cinematic sequences (multi‑angle, clean backplates).
- Structured content model for vehicles and cities (future CMS, not in Phase 0.5).

## Constraints to preserve

- WhatsApp‑first + online enquiry.
- Real facts only, no fabricated inventory/prices/reviews.
- Dual‑market contact details present at all times (footer/header).

