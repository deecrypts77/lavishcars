import { EMAIL, HOURS, SITE, SITE_URL, type Market, marketList, socials } from "@/content/site";
import type { Faq } from "@/content/faqs";
import { type Article, articleHref } from "@/lib/journal-shared";

type Schema = Record<string, unknown>;

/** Serialises structured data for a <script type="application/ld+json"> tag. */
export function serializeJsonLd(data: Schema): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

function businessSchema(m: Market): Schema {
  return {
    "@type": "AutoRental",
    "@id": `${SITE_URL}${m.href}#business`,
    name: `${SITE.name} ${m.city}`,
    url: `${SITE_URL}${m.href}`,
    parentOrganization: { "@id": ORGANIZATION_ID },
    email: EMAIL,
    telephone: m.phoneE164,
    image: `${SITE_URL}${m.image}`,
    hasMap: m.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: m.postal.street,
      addressLocality: m.postal.locality,
      addressRegion: m.postal.region,
      postalCode: m.postal.postalCode,
      addressCountry: m.countryCode,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: HOURS.schema.days,
      opens: HOURS.schema.opens,
      closes: HOURS.schema.closes,
    },
    areaServed: { "@type": "City", name: m.city },
  };
}

export function siteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE.domain,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo/lavishcars.png`,
        email: EMAIL,
        foundingDate: String(SITE.founded),
        founder: { "@type": "Person", name: SITE.founder },
        sameAs: socials.map((s) => s.href),
      },
      ...marketList.map(businessSchema),
    ],
  };
}

export function articleSchema(article: Article): Schema {
  const url = `${SITE_URL}${articleHref(article.slug)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        url,
        mainEntityOfPage: url,
        datePublished: article.date,
        dateModified: article.updated,
        author: { "@type": "Person", name: article.author },
        publisher: { "@id": ORGANIZATION_ID },
        ...(article.image ? { image: `${SITE_URL}${article.image.src}` } : {}),
        ...(article.tags.length ? { keywords: article.tags.join(", ") } : {}),
        articleSection: article.topic,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
}

export function faqSchema(faqs: Faq[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
