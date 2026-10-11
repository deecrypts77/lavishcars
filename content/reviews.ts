import type { MarketId } from "@/content/site";

export type Review = { author: string; market: MarketId; quote: string };

/**
 * Verbatim excerpts from public Google reviews of the Dubai and Houston listings
 * (as displayed on lavishcars.com). Surnames are shortened to an initial.
 * Ratings and counts live on each market in content/site.ts.
 */
export const reviews: Review[] = [
  {
    author: "Jack E.",
    market: "dubai",
    quote:
      "The booking process was smooth, the team was professional and responsive, and the car was delivered in immaculate condition. Everything was exactly as promised.",
  },
  {
    author: "Chloe S.",
    market: "houston",
    quote:
      "The car was clean, comfortable and exactly what I booked. Pickup and return took only a few minutes, which saved me a lot of time.",
  },
  {
    author: "Lewy B.",
    market: "dubai",
    quote:
      "The experience from start to finish is professional, friendly and convenient… for no fee or inconvenience a new car was with me right away.",
  },
  {
    author: "Alice S.",
    market: "houston",
    quote:
      "I rented a sports car for a special weekend, and it was an unforgettable experience. The car performed flawlessly, and the customer support team was friendly and responsive.",
  },
  {
    author: "Aryan B.",
    market: "dubai",
    quote:
      "Not just one of the best, but actually the best car rental company in Dubai. The staff were friendly, caring, efficient, and knowledgeable.",
  },
  {
    author: "Oliver J.",
    market: "houston",
    quote:
      "The car was clean and ready on time, no drama at all. Pickup and return were super easy, and the whole process felt stress-free.",
  },
];
