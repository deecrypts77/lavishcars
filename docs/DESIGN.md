# Design System — LavishCars Showroom

Updated: 2026-10-11

A dark, studio-lit luxury marque site for exotic and chauffeur car rental in Dubai and Houston. WhatsApp-first. Placeholder fleet imagery only — no pricing, no OEM licensing claims.

## Art direction (locked)

- **Primary — `docs/refs/03-aurus-dark-hero.png`:** full-bleed black stage, the car as flagship, an oversized wordmark behind the vehicle, champagne accents, thin minimal nav.
- **Lighting — `docs/refs/01-studio-porsche-cinematic.png`:** glossy black car, soft backlight, specular highlights, reflective floor.
- **Secondary — `docs/refs/02-unique-light-layout.png`:** type hierarchy and whitespace only. The site stays dark.
- Never a split-panel “SaaS landing” layout. Editorial rhythm, generous negative space, restraint.

## Home hero composition (`components/sections/HeroShowroom.tsx`)

Only the essentials: one giant wordmark, one car, one line of copy, the CTAs.

1. **Stage:** `ink-0` black, lit cinematically with **neutral** light only (no warm or gold side glow). The layers are a soft overhead key-light cone (cool white at ~16% opacity, from above), a dark edge vignette and fine grain.
2. **Wordmark:** a single giant `LAVISHCARS` (`.wordmark .text-chrome-soft`, `--hero-wm: clamp(4rem, 14.6vw, 18rem)`). Light geometric caps in a quiet silver gradient that dissolves toward the floor, so the car stays the brightest object. `aria-hidden`.
3. **Car:** the cut-out `hero-porsche-911-gt3-black.png` (2109×602, rendered at `quality={90}`) is pulled up over the lower half of the wordmark (`margin-top: calc(var(--hero-wm) * -0.5)`), so the roof sits in front of the letters.
4. **Floor:** matches the overhead light seen in the paint. It has a wide, soft light pool on the floor, a dark contact shadow under the wheels, and a faint glossy reflection (flipped, 16% opacity, 1 px blur, masked to fade out).
5. **Sizing:** car width is `min(96vw, 58rem, 100svh)`, so the CTA stays above the fold on 720 px laptop screens. The group is vertically centred.
6. **Copy:** one h1 line, the WhatsApp Dubai/Houston buttons, and "View the fleet".

**Hero image processing** (from `docs/hero img.png` with sharp): trim the transparent margin; darken the near-white window glass to smoked glass with a smooth luminance ramp; feather the hard binary alpha edge inward by about 1 px with dark edge colour so there's no white halo. The source is only 735 px wide, so supply a ≥2400 px cut-out for a sharper render.

The home page below the hero keeps only the collection, chauffeur band, cities and booking CTA.

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display / headings / wordmarks | **Jost** (`--font-display`, `font-display` utility, `.display`, `.wordmark`) | Clean geometric sans in the Futura lineage. Weight 300 for large headings, 400 for card titles and h3s. |
| Body / UI | **Inter** (`--font-sans`) | Weight 400 for body and lede copy, never 300 on dark. |

- The earlier hairline Didone (Bodoni Moda) was retired for legibility.
- Fluid scale lives in `globals.css` as `--step--2 … --step-6` and `--wordmark`. Use it via the utilities `text-step-N` and `text-wordmark`, defined in `@theme inline`. Do **not** write `text-[var(--step-N)]`, because Tailwind 4 reads that as a colour.
- Minimum UI label size is 0.72rem; `--step--2` is ≥0.75rem. Uppercase label tracking is ≤0.22em.
- `.display` gives line-height 1.04 and tracking -0.01em. `.wordmark` gives line-height 0.8, tracking 0.06em and uppercase.

## Colour (dark-only)

| Token | Value | Use |
| --- | --- | --- |
| `--ink-0 … --ink-4` | #050506 → #222226 | Layered blacks; surfaces never use pure #000 |
| `--paper` | #f3f0ea | Primary text |
| `--paper-muted` | #b3aea4 (9.4:1) | Secondary text |
| `--paper-subtle` | #8f8a81 (5.9:1) | Labels and meta |
| `--champagne` | #c9ab71 (9.3:1) | The only accent: CTAs, eyebrows, focus |
| `--line`, `--line-strong` | paper at 10% / 20% | Hairlines |

Text contrast meets WCAG 2.2 AA on `ink-1`. Text over photography always gets a scrim: bottom and side gradients, plus a top scrim wherever the fixed header overlaps an image.

## CSS architecture

- Tokens are in `:root` and mapped to Tailwind in `@theme inline`.
- Helper classes (`.eyebrow`, `.display`, `.wordmark`, `.lede`, `.text-chrome`, `.btn*`, `.link-line`, `.prose-link`, `.grain`, `.studio-glow`, `.media-frame`, `.marquee*`) live in **`@layer components`**, so Tailwind utilities can override them. Unlayered CSS beats every layered utility in Tailwind 4.
- `.media-frame` sets no `position`; add `relative` or `absolute` at the call site.

## Motion

- CSS keyframes only: `lc-rise`, `lc-fade`, `lc-wordmark` (tracking settles), `lc-car-in` (car slides in from darkness), `lc-drift`, `lc-lights-up`, `lc-marquee`. Stagger with `.delay-1 … .delay-4`.
- `<Reveal>` arms a scroll reveal only for elements below the fold at mount, so above-the-fold content never flashes.
- The brand marquee pauses on hover/focus and has a visible Pause/Play control (WCAG 2.2.2). Under reduced motion it becomes a static wrapped row.
- `prefers-reduced-motion: reduce` sets all animation and transition durations to ~0 and forces `[data-reveal]` visible. Smooth scrolling is applied only when motion is allowed.

## Components

Folder rules: `components/layout` (site chrome), `components/sections` (home-page sections, one per file), `components/templates` (page templates shared by several routes), `components/ui` (small reusable pieces). Components used by a single route live in that route's private `_components/` folder. Copy and data never live in components — they come from `content/`.

- **Header:** fixed and transparent, turning frosted after scroll. Nav from `content/navigation.ts` with `aria-current`, a gold “Book” WhatsApp popover listing both cities and opening hours, and a full-screen mobile dialog (focus trap, Escape to close, scroll lock).
- **Footer:** official logo, hours, email, socials; per-city Google Maps listing, WhatsApp, call and SMS; Explore / Company / Legal columns; payment methods.
- **Logo:** the official LC mark and wordmark (`public/images/logo/lavishcars.png`).
- **Home sections:** HeroShowroom → BrandMarquee → CollectionSection → StorySection → HowItWorks → ChauffeurBand → LocationsSection (with US “coming soon” cities) → ReviewsSection (real Google reviews and ratings) → PressStrip → JournalSection → ClosingCta.
- **UI:** `SectionHeader` (eyebrow + display title + optional action), `Marquee`, `ArticleList`, `SocialLinks`, `JsonLd`, `PageHero`, `Reveal`, `VehicleCard`, `WhatsAppButtons`, `icons`.
- **Templates:** `MarketPage` (Dubai, Houston) and `LegalPage`.

## Pages

Home · `/fleet` · `/vehicles/[slug]` · `/uae/dubai` · `/usa/houston` · `/services` · `/about` (Our Story) · `/journal` (topic filter) · `/journal/[slug]` (115 imported articles: outline nav, Markdown body, FAQs, BlogPosting + FAQPage JSON-LD) · `/invest` · `/list-your-car` (WhatsApp/email composer; nothing is stored) · `/contact` (WhatsApp composer) · `/faq` (FAQPage JSON-LD) · `/legal/privacy` · `/legal/terms` · `/legal/refunds` · 404. Legacy WordPress URLs redirect per `docs/REDIRECTS.md`.

## Accessibility & SEO

- Skip link, landmarks, one h1 per page, visible champagne focus ring, 44 px+ targets, decorative layers `aria-hidden`.
- `next/image` everywhere. The hero uses `preload`, and AVIF/WebP output is configured in `next.config.ts`.
- Organization + AutoRental (per market, with hours and map) JSON-LD built in `lib/json-ld.ts`, a sitemap including vehicle slugs, and robots rules.

## Image policy

- Local files only, from `public/images/` (`fleet/`, `brands/`, `press/`, `payments/`, `logo/`); no hotlinking. Unused but licensed-for-review photos are kept outside the build in `assets/library/`. New files are logged in `docs/ASSET_REGISTER.md`.
- All fleet imagery is placeholder and needs licence verification before launch. The vehicle naming matches what each photo actually shows.
