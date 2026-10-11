# Decisions Log — LavishCars Redesign

Date: 2026-10-11
Owner: Deecrypt Technologies

## 2026-10-11 — Stack selection

- Decision: Next.js (App Router) + TypeScript + Tailwind CSS + CSS design tokens
- Rationale:
  - SEO: robust SSR/SSG and metadata API
  - Performance: code‑splitting, edge/streaming ready; Tailwind for consistent tokens/utilities
  - Accessibility: semantic React components + linting; easy focus/skip patterns
  - Scalability: clean routing for multi‑market expansion; market‑scoped pages and vehicle slugs

## 2026-10-11 — Cinematic approach

- Decision: Start with image‑sequence/video approach; reserve WebGL only if assets justify (quality, budget, runtime).
- Rationale:
  - Image‑sequence/video offers high craft at lower complexity, easier fallbacks, and better control for `prefers-reduced-motion`.
  - WebGL reserved for verified multi‑angle, high‑resolution assets and a clear ROI in interaction depth.
- Implementation note (future):
  - Progressive enhancement only; never block content.
  - Motion respects system `prefers-reduced-motion`.

## 2026-10-11 — IA and redirects

- Decision: Scaffold canonical routes (`/`, `/uae/dubai`, `/usa/houston`, `/fleet`, `/vehicles/[slug]`, `/services`, `/about`, `/contact`, `/faq`, legal).
- Preserve SEO value by redirecting legacy WordPress slugs to new equivalents (see `REDIRECTS.md`).

## 2026-10-11 — Fonts and tokens

- Decision: Use `next/font` (Inter) and define luxury dark editorial tokens:
  - Ink (near‑black), Champagne/Gold accent (sparing), Neutrals for surfaces, focus/outline variables.
- Rationale: Premium but performant system, consistent brand feel, AA contrast.

## 2026-10-11 — Facts and compliance

- Decision: Use only live‑site facts for markets, phones, emails; follow the client‑provided constraint for Dubai location (Meydan Grandstand) while flagging the live‑site inconsistency for resolution.
- Rationale: Avoid misinformation; keep LocalBusiness JSON‑LD accurate post‑confirmation.

