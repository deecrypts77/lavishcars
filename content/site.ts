export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lavishcars.com";

export const SITE = {
  name: "LavishCars",
  domain: "LavishCars.com",
  tagline: "A luxury car rental marketplace",
  motto: "From Dubai to the world",
  founded: 2024,
  founder: "Sir Bilawal Merani",
} as const;

export const EMAIL = "info@lavishcars.com";

export const HOURS = {
  label: "Mon – Sat · 9:00 AM – 9:00 PM",
  schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:00" },
} as const;

export type MarketId = "dubai" | "houston";

export type Market = {
  id: MarketId;
  city: string;
  region: string;
  country: string;
  countryCode: "AE" | "US";
  href: string;
  coverage: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsapp: string;
  address: string;
  postal: { street: string; locality: string; region?: string; postalCode?: string };
  mapsUrl: string;
  airports: string[];
  rating: { value: number; count: number };
  image: string;
  imageAlt: string;
};

export const markets: Record<MarketId, Market> = {
  dubai: {
    id: "dubai",
    city: "Dubai",
    region: "United Arab Emirates",
    country: "UAE",
    countryCode: "AE",
    href: "/uae/dubai",
    coverage: "Dubai and all seven emirates — delivered to airports, hotels and everywhere in between.",
    phoneDisplay: "+971 585 5319 23",
    phoneE164: "+971585531923",
    whatsapp: "971585531923",
    address: "Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, UAE",
    postal: { street: "Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba", locality: "Dubai" },
    mapsUrl: "https://maps.app.goo.gl/dw2r5pcxzuF3FAUU7",
    airports: ["DXB", "DWC", "AUH"],
    rating: { value: 4.7, count: 63 },
    image: "/images/fleet/dubai-skyline.jpg",
    imageAlt: "Dubai skyline at sunset with Burj Khalifa and Sheikh Zayed Road interchanges",
  },
  houston: {
    id: "houston",
    city: "Houston",
    region: "Texas, USA",
    country: "USA",
    countryCode: "US",
    href: "/usa/houston",
    coverage: "Greater Houston — with Los Angeles, Miami, Las Vegas, New York and Dallas next.",
    phoneDisplay: "+1 626 769 7384",
    phoneE164: "+16267697384",
    whatsapp: "16267697384",
    address: "10480 Grant Rd, Suite 126, Houston, TX 77070, USA",
    postal: { street: "10480 Grant Rd, Suite 126", locality: "Houston", region: "TX", postalCode: "77070" },
    mapsUrl: "https://maps.app.goo.gl/HyooYn6PAjoj46nu8",
    airports: ["IAH", "HOU"],
    rating: { value: 5.0, count: 4 },
    image: "/images/fleet/houston-downtown-skyline.jpg",
    imageAlt: "Downtown Houston skyline under a clear blue sky",
  },
};

export const marketList: Market[] = [markets.dubai, markets.houston];

/** US cities announced on lavishcars.com as "coming soon". */
export const comingSoon = ["Los Angeles", "Miami", "Las Vegas", "New York", "Dallas"] as const;

export type SocialId = "instagram" | "facebook" | "youtube" | "tiktok" | "linkedin";

export const socials: { id: SocialId; label: string; href: string }[] = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/lavishcarsglobal/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/lavishcarsglobal/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@lavishcarsglobal" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@lavishcarsglobal" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/lavishcarsglobal/" },
];

export const INSTAGRAM_HANDLE = "@lavishcarsglobal";

export const paymentMethods = [
  { id: "google-pay", label: "Google Pay" },
  { id: "apple-pay", label: "Apple Pay" },
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "amex", label: "American Express" },
  { id: "discover", label: "Discover" },
] as const;
