# Asset Register (Seed) — LavishCars

Status legend:
- license status: unknown / needs-verify / approved
- multi-angle available?: yes / no / unknown

Note: Seeded from live site page references only; no downloads performed. All assets require licensing verification.

| vehicle/market                | asset type           | source URL                                                                    | license status | multi-angle available? | notes |
|------------------------------|----------------------|--------------------------------------------------------------------------------|----------------|------------------------|-------|
| Generic hero (global)        | homepage hero image  | https://lavishcars.com/                                                       | needs-verify   | unknown                | Visual language reference only |
| Ferrari (Dubai)              | brand page imagery   | https://lavishcars.com/uae/dubai/rent-ferrari-in-dubai/                       | needs-verify   | unknown                | Self-drive focus; pricing claims present on page |
| Lamborghini (Dubai)          | brand page imagery   | https://lavishcars.com/uae/dubai/rent-lamborghini-in-dubai/                   | needs-verify   | unknown                | Mentions hourly/daily/weekly/monthly |
| Porsche (Dubai)              | brand page imagery   | https://lavishcars.com/uae/dubai/rent-porsche-in-dubai/                       | needs-verify   | unknown                | Mentions 718 Cayman, Macan, 911 |
| Sports (Dubai category)      | category imagery     | https://lavishcars.com/uae/dubai/sports-car-rental-dubai/                     | needs-verify   | unknown                | Mentions Ferrari 488, Huracán, 911 Turbo S |
| Mercedes-Benz (Houston)      | brand page imagery   | https://lavishcars.com/usa/houston/rent-mercedes-benz-in-houston/             | needs-verify   | unknown                | Mentions GLE, G‑Class, S‑Class |
| Fleet (Houston)              | fleet overview       | https://lavishcars.com/usa/houston/fleet/                                     | needs-verify   | unknown                | Sparse imagery on page; confirm source assets |
| Our Story                    | editorial imagery    | https://lavishcars.com/our-story/                                             | needs-verify   | unknown                | Founder narrative; editorial photos if present |
| Contact/locations (Dubai)    | location imagery     | https://lavishcars.com/contact-us/                                            | needs-verify   | unknown                | Meydan Grandstand address |
| Privacy/Legal                | brand UI only        | https://lavishcars.com/privacy-policy/                                        | needs-verify   | n/a                    | UI chrome only; no hero imagery expected |

Open needs:
- Provide original, high‑resolution, multi‑angle vehicle assets (front/3⁄4/rear/interior) for cinematic sequences.
- Confirm brand/logo usage rights and any OEM restrictions.
- Confirm preferred hero formats (image sequence vs. video) per market.

Phase 1 placeholder photography (royalty‑free sources; not licensed for final):

| vehicle/market                | asset type           | source URL                                                                    | license status                 | multi-angle available? | notes |
|------------------------------|----------------------|--------------------------------------------------------------------------------|--------------------------------|------------------------|-------|
| Home hero                    | placeholder image    | https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80 | needs-verify (Unsplash license) | unknown                | Studio‑style coupe placeholder |
| Fleet card                   | placeholder image    | https://images.unsplash.com/photo-1511910849309-0dffb8785146?auto=format&fit=crop&w=1200&q=80 | needs-verify (Unsplash license) | unknown                | Grand tourer placeholder |
| Fleet card                   | placeholder image    | https://images.unsplash.com/photo-1549921296-3c88b0a60393?auto=format&fit=crop&w=1200&q=80 | needs-verify (Unsplash license) | unknown                | SUV placeholder |
| Fleet card                   | placeholder image    | https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80 | needs-verify (Unsplash license) | unknown                | Supercar placeholder |
| Vehicle PDP hero             | placeholder image    | https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80 | needs-verify (Unsplash license) | unknown                | Cinematic hero placeholder |

## Local placeholder pack (verified Oct 11, 2026)

See `docs/ASSET_PACK_SOURCES.md` for the full filename → actual car → source URL table.
Only the photos used by the site stay in `public/images/fleet/` (JPG masters; `next/image` generates AVIF/WebP). The rest of the pack moved to `assets/library/fleet/` — outside the build, still listed in `docs/ASSET_PACK_SOURCES.md` — and duplicate `.webp` copies were removed.

Status: placeholder / needs-verify for final client launch. Unsplash + Pexels licenses.

## Showroom rebuild additions (Oct 11, 2026)

| file (public/images/fleet/) | shows | source | license status | notes |
|---|---|---|---|---|
| hero-porsche-911-gt3-black.png | Black Porsche 911 GT3, side profile, transparent cut-out | Client-supplied `docs/hero img.png` (2172×724, transparent), trimmed to 2109×602 | needs-verify (client to confirm rights) | **Home hero** |
| hero-ferrari-mono.jpg | Ferrari LaFerrari head-on, mono | https://images.unsplash.com/photo-1617654112368-307921291f42 | needs-verify (Unsplash license) | Previous hero; LaFerrari fleet entry |
| bentley-flying-spur-night.jpg | Bentley Flying Spur front, night | https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab | needs-verify (Unsplash license) | Chauffeur band, OG image |
| ferrari-f8-tributo.jpg | Red Ferrari F8 Tributo | https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b | needs-verify (Unsplash license) | |
| lamborghini-huracan-performante.jpg | White Lamborghini Huracán Performante | https://images.unsplash.com/photo-1544829099-b9a0c07fad1a | needs-verify (Unsplash license) | |
| mclaren-720s.jpg | Silver McLaren 720S | https://images.unsplash.com/photo-1542362567-b07e54358753 | needs-verify (Unsplash license) | |
| mercedes-amg-gt-black.jpg | Black Mercedes-AMG GT, front | https://images.unsplash.com/photo-1583267746897-2cf415887172 | needs-verify (Unsplash license) | |
| porsche-911-black.jpg | Black Porsche 911 GT3 RS | https://images.unsplash.com/photo-1580274455191-1c62238fa333 | needs-verify (Unsplash license) | |
| range-rover-black.jpg | Black Range Rover, side | https://images.unsplash.com/photo-1563720360172-67b8f3dce741 | needs-verify (Unsplash license) | |
| houston-downtown-skyline.jpg | Downtown Houston skyline | Wikimedia Commons “Buildings-city-houston-skyline-1870617.jpg” | CC0 | Replaces a mislabelled Austin skyline |

Renamed to match what each photo actually shows: mclaren.jpg → lamborghini-aventador-s.jpg, bentley.jpg → range-rover-sport-front.jpg, aston-martin.jpg → mercedes-amg-gt-r-red.jpg, mercedes-amg.jpg → mercedes-amg-gt-r-grey.jpg, porsche-black-studio.jpg → porsche-panamera-turbo.jpg, ferrari-red.jpg → ferrari-laferrari-red.jpg, hero-side-profile.jpg → garage-collection.jpg (actually a Chevrolet Camaro; swap before launch), rolls-royce.jpg → rolls-royce-wraith.jpg.

Rejected (moved to `docs/rejected-assets/`): bmw-m (a living room, not a car), range-rover (a Honda CR-V), luxury-interior (a duplicate Panamera), houston-skyline (Austin, TX).

## Audit & completion additions (Oct 11, 2026)

Brand, press, payment and logo artwork below was taken from the client's own site, lavishcars.com, so the new build matches the live brand. Third-party marks are used nominatively (to show which marques and publications are referenced) and remain the property of their owners.

| file (public/images/) | shows | source | license status | used in |
|---|---|---|---|---|
| logo/lavishcars.png | Official LC mark + LAVISHCARS wordmark | lavishcars.com header logo | client-owned | Header, footer, Organization JSON-LD |
| brands/{lamborghini,ferrari,bugatti,mclaren,porsche,aston-martin,range-rover,bmw,audi,cadillac,chevrolet,tesla}.png | Marque badges (trimmed; dark parts lightened for a dark background) | lavishcars.com brand marquee | trademarks of their owners — nominative use | Home brand marquee (rendered greyscale) |
| press/{entrepreneur,newsweek,business-insider}.png | Publication wordmarks (white silhouettes) | lavishcars.com “As Featured In” | trademarks of their owners — confirm the coverage links | Home press strip |
| payments/{google-pay,apple-pay,visa,mastercard,amex,discover}.png | Payment method marks | lavishcars.com footer | trademarks of their owners | Footer |
| fleet/ferrari-sp3-daytona-showroom.jpg | Ferrari in a dark showroom | asset pack (see ASSET_PACK_SOURCES.md) | needs-verify | Our Story hero |
| fleet/mclaren-p1-orange-dark.jpg | Orange McLaren P1, low light | asset pack (see ASSET_PACK_SOURCES.md) | needs-verify | Fleet hero |

`garage-collection.jpg` (the Chevrolet Camaro) is no longer used and now lives in `assets/library/fleet/`.

## Journal import (Oct 11, 2026)

| file (public/images/) | shows | source | license status | used in |
|---|---|---|---|---|
| journal/*.webp (244 files) | Article banners and in-article photos for the 115 imported posts | lavishcars.com `/wp-content/uploads/<yyyy>/<mm>/…`, downloaded by `scripts/import-journal.mjs` and re-encoded to WebP (≤ 1600 px wide). Filenames keep the upload month as a prefix. | client-owned (published on the client's blog); any third-party photography inside them carries over its original status | `/journal/[slug]` featured image, article body, OpenGraph |

One in-article image was already missing on WordPress (`2024/05/best-car-for-cross-border-travel-1024x585.jpg`, 404) and was left out. A 24 MB self-hosted MP4 in *SUV vs pickup truck* was not imported; the YouTube video in *Rent a Bentley for your wedding day* is linked rather than embedded.
