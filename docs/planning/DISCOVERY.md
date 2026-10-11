# Discovery — LavishCars.com (Phase 0)

Date: 2026-10-11

This audit documents the current public site at `https://lavishcars.com/`, its information architecture, visible tech stack, customer-facing facts, booking flow, and SEO considerations. Evidence is drawn directly from the live site pages cited below.

## URL inventory (customer-facing)

- Home: `/`
- UAE
  - UAE hub: `/uae/`
  - Dubai: `/uae/dubai/`
  - Category/brand examples (pattern: `/uae/dubai/rent-<brand>-in-dubai/`)
    - `/uae/dubai/sports-car-rental-dubai/`
    - `/uae/dubai/rent-ferrari-in-dubai/`
    - `/uae/dubai/rent-lamborghini-in-dubai/`
    - `/uae/dubai/rent-porsche-in-dubai/`
- USA
  - Houston: `/usa/houston/`
  - Houston fleet: `/usa/houston/fleet/`
  - Category/brand examples (pattern: `/usa/houston/rent-<brand>-in-houston/`)
    - `/usa/houston/rent-mercedes-benz-in-houston/`
- Company/pages
  - Our Story: `/our-story/`
  - Contact: `/contact-us/`
  - Privacy Policy: `/privacy-policy/`
  - Terms & Conditions: `/terms-conditions/`

Notes:
- Brand and category pages strongly suggest a templated structure per market (e.g., “rent-<brand>-in-<city>”).
- The site references expansion to additional U.S. cities (Los Angeles, Miami, Las Vegas, New York, Dallas).

## Booking and enquiry flow (observed)

- Primary CTA: WhatsApp-first with market phone numbers surfaced on key pages.
  - Dubai WhatsApp/Call: `+971 585 5319 23`
  - Houston Call/WhatsApp: `+1 626 769 7384`
- Online enquiries: Contact form on `/contact-us/` (consent copy references informational SMS from `+1 832 664 7782`; privacy policy echoes this).
- Delivery-first operations (airport/hotel/residence); no counter pickup UX emphasized.
- Self-drive and chauffeur services present across both markets; monthly rentals available.

## Real business facts (from the live site)

- Markets and coverage:
  - UAE: Dubai + inter-emirate travel approved (DXB, DWC, AUH deliveries).
  - USA: Houston (deliveries incl. IAH and HOU).
- Contact
  - Email: `info@lavishcars.com`
  - Phone (Dubai): `+971 585 5319 23`
  - Phone (USA/Houston): `+1 626 769 7384`
  - Dubai address (Contact page): Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E
  - Houston address: 10480 Grant Rd, Suite 126, Houston, Texas 77070, USA
- Services: self-drive, chauffeur, airport delivery, daily/weekly/monthly rentals.

## Known fleet brands/categories (live site mentions only)

- Dubai mentions include: Lamborghini (incl. Urus, Huracán references), Ferrari, Porsche, Rolls‑Royce (Cullinan/Ghost refs), Mercedes‑Benz (G‑Class, AMG, Maybach), Bugatti, BMW, Audi, Ford (Mustang), Chevrolet (Corvette), McLaren, Bentley.
- Houston mentions include: Mercedes‑Benz (GLE, G‑Class, S‑Class), Land Rover (Range Rover), BMW (X7), Toyota, Jeep, Dodge, Subaru, Mini (Cooper).
- Categories: luxury sedans, performance/sports/supercars, luxury SUVs, chauffeur.

## Tech fingerprint (visible)

- Platform: WordPress (confirmed via `https://lavishcars.com/wp-json/`).
- Plugins observed in REST namespaces: Yoast SEO, Google Site Kit, Elementor (+ Pro + AI), Smush, Redirection, etc.
- Implications: existing SEO metadata and redirects likely managed in WordPress; analytics via Site Kit (GA/GTAG).

## SEO and migration considerations

- Preserve high-value paths and patterns (examples):
  - `/uae/dubai/` and `/uae/`
  - Brand pages: `/uae/dubai/rent-<brand>-in-dubai/`
  - `/usa/houston/` and `/usa/houston/fleet/` and `/usa/houston/rent-<brand>-in-houston/`
  - `/contact-us/`, `/privacy-policy/`, `/terms-conditions/`, `/our-story/`
- Trailing slashes: current site uses trailing slashes; decide canonicalization and 301 accordingly.
- Content quality: heavy long-form marketing copy; ensure improved information density and scannability in redesign while retaining search intent coverage.
- Address consistency: Contact page shows Meydan Grandstand; Terms page lists “The Exchange Tower, Business Bay”. Resolve canonical Dubai address before launch (structured data + footer).
- Analytics: confirm current GA/Tag setup and carry over measurement plan; plan event mapping for WhatsApp clicks and enquiry forms.

## Open questions for client

1. Confirm canonical Dubai office address (Meydan Grandstand vs. Business Bay) for footer and JSON‑LD.
2. Confirm primary WhatsApp numbers per market and whether separate sales lines exist.
3. Confirm brand usage rights (logos, model names) and any OEM co‑marketing constraints.
4. Provide clarity on vehicle inventory governance (do not list models without explicit approval).
5. Current booking backend: WhatsApp-first + WP forms only, or any external CRM/DMS integration to preserve?
6. Approvals for airport codes and coverage claims (DXB/DWC/AUH and IAH/HOU) to keep in structured data.
7. Analytics/ads: confirm GA property, GTM usage, conversions to track (WhatsApp clicks, form submits, phone taps).
8. U.S. expansion roadmap (city order) to inform scalable IA and geo pages.

## Quality/inspiration bar (for later phases; not copying)

- Editorial luxury automotive: Porsche, Rolls‑Royce, Ferrari, Bentley brand sites — cinematic pacing, minimal UI, impeccable type, tactile motion, high-contrast dark palettes, reduced chrome. Use only as inspiration for craft standards and motion language.

## Booking flow preservation

- Preserve WhatsApp-first + online enquiry; do not display unverified availability, pricing, or reviews; no fake inventory.

