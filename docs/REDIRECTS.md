# Redirects

Preserves SEO equity from the WordPress URLs on lavishcars.com. All are permanent (308) redirects,
assembled in `next.config.ts` from two files:

- `config/legacy-redirects.json` — page and pattern redirects (edit by hand).
- `config/legacy-journal-slugs.json` — every WordPress post slug; `/<slug>` → `/journal/<slug>`.
  Written by `npm run import:journal`.

Next.js strips trailing slashes first, so `/our-story/` → `/our-story` → `/about`. Query strings
(UTM) are kept.

| Old path (WordPress)                          | New path                | Status |
| --------------------------------------------- | ----------------------- | ------ |
| `/`                                           | `/`                     | kept |
| `/<post-slug>/` (115 articles)                | `/journal/<post-slug>`  | 308 |
| `/blogs/`, `/blogs/page/<n>/`                 | `/journal`              | 308 |
| `/tag/<tag>/`, `/category/<cat>/`, `/author/<name>/` | `/journal`       | 308 |
| `/our-story/`                                 | `/about`                | 308 |
| `/contact-us/`                                | `/contact`              | 308 |
| `/privacy-policy/`                            | `/legal/privacy`        | 308 |
| `/terms-conditions/`                          | `/legal/terms`          | 308 |
| `/refund-policy/`                             | `/legal/refunds`        | 308 |
| `/list-your-car/`                             | `/list-your-car`        | kept (slash removed) |
| `/our-fleet/`                                 | `/fleet`                | 308 |
| `/our-fleet/<anything>/`                      | `/uae/dubai#fleet`      | 308 |
| `/rent-<brand>-in-dubai/` (root-level)        | `/uae/dubai#fleet`      | 308 |
| `/uae/`                                       | `/uae/dubai`            | 308 |
| `/usa/`                                       | `/usa/houston`          | 308 |
| `/uae/dubai/` · `/usa/houston/`               | same path               | kept (slash removed) |
| `/uae/dubai/fleet/`                           | `/uae/dubai#fleet`      | 308 |
| `/usa/houston/fleet/`                         | `/usa/houston#fleet`    | 308 |
| `/uae/dubai/car-rental-investment-in-dubai/`  | `/invest`               | 308 |
| `/uae/dubai/rent-<brand>-in-dubai/` (any)     | `/uae/dubai#fleet`      | 308, catch-all |
| `/usa/houston/rent-<brand>-in-houston/` (any) | `/usa/houston#fleet`    | 308, catch-all |

Links inside the imported articles were rewritten to these destinations at import time, so the
journal never bounces readers through a redirect.

## Open items

- **Brand pages** currently fall back to the market fleet. If they rank well, replace the catch-all
  with dedicated brand landing pages.
- **Media URLs** (`/wp-content/uploads/…`) are not redirected; imported images now live under
  `/images/journal/`.
