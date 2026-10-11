/**
 * Summarised from the client's investment page. The live page describes returns as
 * "guaranteed"; that wording is deliberately not reproduced here pending legal review.
 */
export const INVEST = {
  minimum: "AED 300,000",
  term: "3 years",
  returnRange: "125–150%",
  market: "Dubai",
} as const;

export const investSteps = [
  {
    title: "You invest",
    body: `Capital from ${INVEST.minimum} is deployed into an actively operating fleet of luxury cars and limousines in Dubai.`,
  },
  {
    title: "We operate",
    body: "Fleet management, drivers, licensing, insurance, bookings, maintenance and client service are handled entirely by LavishCars.",
  },
  {
    title: "You receive returns",
    body: "Returns are paid over the three-year term on the schedule set out in your investment agreement, with regular performance and utilisation reporting.",
  },
];

export const investReasons = [
  { title: "Tourism-led demand", body: "Dubai welcomed 18.72 million visitors in 2024, with year-round demand for premium vehicles." },
  { title: "Asset-backed", body: "Capital is tied to physical, insured, income-producing vehicles rather than speculative instruments." },
  { title: "Fully managed", body: "A silent-partner model — no experience in car rental or the UAE market required." },
  { title: "Diversified fleet", body: "Allocation across luxury cars and limousines to support utilisation." },
];

export const investAudience = [
  "High-net-worth individuals seeking passive income in Dubai",
  "UAE residents and expats looking beyond real estate",
  "International investors without a physical presence in the UAE",
  "Business owners diversifying into transport and hospitality",
];
