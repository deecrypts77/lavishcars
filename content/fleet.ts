import type { MarketId } from "./site";

export type VehicleCategory = "Supercar" | "Grand Tourer" | "Chauffeur" | "SUV" | "Sports";

export type VehicleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the frame crops the photo. */
  focus?: string;
};

export type Vehicle = {
  slug: string;
  marque: string;
  model: string;
  category: VehicleCategory;
  tagline: string;
  description: string;
  markets: MarketId[];
  chauffeur: boolean;
  specs: { label: string; value: string }[];
  images: VehicleImage[];
};

/**
 * Placeholder roster. Names match the photography in /public/images/fleet;
 * specs are indicative model-level facts only. No pricing, availability or
 * OEM affiliation is implied — replace with the client's live fleet.
 */
export const fleet: Vehicle[] = [
  {
    slug: "rolls-royce-wraith",
    marque: "Rolls-Royce",
    model: "Wraith",
    category: "Grand Tourer",
    tagline: "Two-tone presence for an evening on the Palm.",
    description:
      "A fastback grand tourer with a coach-built feel — quiet at any speed, unmistakable on arrival. Requested for weddings, galas and long coastal drives.",
    markets: ["dubai"],
    chauffeur: true,
    specs: [
      { label: "Body", value: "Fastback coupé" },
      { label: "Seats", value: "4" },
      { label: "Engine", value: "Twin-turbo V12" },
      { label: "Service", value: "Self-drive or chauffeur" },
    ],
    images: [
      {
        src: "/images/fleet/rolls-royce-wraith.jpg",
        alt: "White and black Rolls-Royce Wraith parked beneath palm trees",
        width: 2400,
        height: 3600,
        focus: "50% 72%",
      },
    ],
  },
  {
    slug: "bentley-flying-spur",
    marque: "Bentley",
    model: "Flying Spur",
    category: "Chauffeur",
    tagline: "The rear seat is the destination.",
    description:
      "A four-door grand tourer built for distance and discretion. Our default for executive transfers, airport meet-and-greet and multi-stop days.",
    markets: ["dubai", "houston"],
    chauffeur: true,
    specs: [
      { label: "Body", value: "Four-door saloon" },
      { label: "Seats", value: "4–5" },
      { label: "Engine", value: "Twin-turbo V8 / W12" },
      { label: "Service", value: "Chauffeur" },
    ],
    images: [
      {
        src: "/images/fleet/bentley-flying-spur-night.jpg",
        alt: "Front three-quarter detail of a Bentley Flying Spur at night, matrix grille and headlamp lit",
        width: 2400,
        height: 1600,
        focus: "62% 55%",
      },
    ],
  },
  {
    slug: "lamborghini-aventador-s",
    marque: "Lamborghini",
    model: "Aventador S",
    category: "Supercar",
    tagline: "Naturally aspirated V12 theatre.",
    description:
      "Scissor doors, a mid-mounted V12 and a silhouette that stops traffic. Delivered to your hotel with a full walk-around before you drive.",
    markets: ["dubai", "houston"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "6.5 L V12" },
      { label: "Drive", value: "All-wheel drive" },
    ],
    images: [
      {
        src: "/images/fleet/lamborghini-aventador-s.jpg",
        alt: "Blue Lamborghini Aventador S in side profile on a city street",
        width: 2400,
        height: 1600,
        focus: "50% 62%",
      },
    ],
  },
  {
    slug: "ferrari-laferrari",
    marque: "Ferrari",
    model: "LaFerrari",
    category: "Supercar",
    tagline: "Hybrid V12. Collector-grade.",
    description:
      "A hybrid V12 hypercar shown here as showroom imagery. Availability is by private request only — message the team to discuss.",
    markets: ["dubai"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "V12 hybrid" },
      { label: "Access", value: "Private request" },
    ],
    images: [
      {
        src: "/images/fleet/hero-ferrari-mono.jpg",
        alt: "Ferrari LaFerrari head-on against a black backdrop, monochrome",
        width: 1800,
        height: 2532,
        focus: "50% 70%",
      },
      {
        src: "/images/fleet/ferrari-laferrari-red.jpg",
        alt: "Red Ferrari LaFerrari in a bright showroom",
        width: 2400,
        height: 1600,
        focus: "50% 70%",
      },
    ],
  },
  {
    slug: "ferrari-f8-tributo",
    marque: "Ferrari",
    model: "F8 Tributo",
    category: "Supercar",
    tagline: "Mid-engine V8, everyday reach.",
    description:
      "The most usable kind of Ferrari — sharp enough for a mountain road, composed enough for a city weekend.",
    markets: ["dubai", "houston"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "3.9 L twin-turbo V8" },
      { label: "Drive", value: "Rear-wheel drive" },
    ],
    images: [
      {
        src: "/images/fleet/ferrari-f8-tributo.jpg",
        alt: "Red Ferrari F8 Tributo parked in front of a weathered concrete wall",
        width: 2000,
        height: 1125,
        focus: "50% 60%",
      },
    ],
  },
  {
    slug: "mclaren-720s",
    marque: "McLaren",
    model: "720S",
    category: "Supercar",
    tagline: "Carbon-tub precision.",
    description:
      "Dihedral doors and a cockpit with a glasshouse view. Light, fast and surprisingly comfortable over distance.",
    markets: ["houston"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "4.0 L twin-turbo V8" },
      { label: "Drive", value: "Rear-wheel drive" },
    ],
    images: [
      {
        src: "/images/fleet/mclaren-720s.jpg",
        alt: "Silver McLaren 720S front three-quarter view on a gravel drive",
        width: 2000,
        height: 1333,
        focus: "50% 65%",
      },
    ],
  },
  {
    slug: "lamborghini-huracan-performante",
    marque: "Lamborghini",
    model: "Huracán Performante",
    category: "Supercar",
    tagline: "V10 with an aero edge.",
    description:
      "Active aerodynamics and a high-revving V10. The sharpest instrument in the garage.",
    markets: ["dubai", "houston"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "5.2 L V10" },
      { label: "Drive", value: "All-wheel drive" },
    ],
    images: [
      {
        src: "/images/fleet/lamborghini-huracan-performante.jpg",
        alt: "White Lamborghini Huracán Performante front three-quarter view",
        width: 2000,
        height: 1333,
        focus: "50% 55%",
      },
    ],
  },
  {
    slug: "porsche-911-gt3-rs",
    marque: "Porsche",
    model: "911 GT3 RS",
    category: "Sports",
    tagline: "Matte black. Motorsport bloodline.",
    description:
      "A track-bred 911 with a swan-neck wing and a flat-six that sings to redline. For drivers who want to feel the road.",
    markets: ["houston"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "Flat-six, naturally aspirated" },
      { label: "Drive", value: "Rear-wheel drive" },
    ],
    images: [
      {
        src: "/images/fleet/porsche-911-black.jpg",
        alt: "Matte black Porsche 911 GT3 RS on a harbour quay at golden hour",
        width: 1600,
        height: 2000,
        focus: "50% 58%",
      },
    ],
  },
  {
    slug: "mercedes-amg-gt",
    marque: "Mercedes-AMG",
    model: "GT",
    category: "Sports",
    tagline: "Long bonnet, front-mid V8.",
    description:
      "A classic sports-car proportion with a hand-built V8. Shown in several specifications — confirm the exact car on WhatsApp.",
    markets: ["dubai", "houston"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "4.0 L twin-turbo V8" },
      { label: "Drive", value: "Rear-wheel drive" },
    ],
    images: [
      {
        src: "/images/fleet/mercedes-amg-gt-black.jpg",
        alt: "Black Mercedes-AMG GT head-on, Panamericana grille, autumn street",
        width: 2000,
        height: 1333,
        focus: "50% 55%",
      },
      {
        src: "/images/fleet/mercedes-amg-gt-r-grey.jpg",
        alt: "Grey Mercedes-AMG GT R with yellow accents on an open lot",
        width: 2400,
        height: 1601,
        focus: "50% 60%",
      },
      {
        src: "/images/fleet/mercedes-amg-gt-r-red.jpg",
        alt: "Red Mercedes-AMG GT R on a forest road at sunset",
        width: 2400,
        height: 1688,
        focus: "60% 70%",
      },
    ],
  },
  {
    slug: "porsche-panamera-turbo",
    marque: "Porsche",
    model: "Panamera Turbo",
    category: "Grand Tourer",
    tagline: "Four doors, no compromise.",
    description:
      "Executive space with sports-car pace. Ideal for airport runs and business days that end somewhere better.",
    markets: ["houston"],
    chauffeur: true,
    specs: [
      { label: "Body", value: "Sport saloon" },
      { label: "Seats", value: "4" },
      { label: "Engine", value: "4.0 L twin-turbo V8" },
      { label: "Service", value: "Self-drive or chauffeur" },
    ],
    images: [
      {
        src: "/images/fleet/porsche-panamera-turbo.jpg",
        alt: "Black Porsche Panamera Turbo at speed on a highway at dusk, rear three-quarter",
        width: 2400,
        height: 1600,
        focus: "50% 62%",
      },
    ],
  },
  {
    slug: "audi-r8-v10",
    marque: "Audi",
    model: "R8 V10",
    category: "Sports",
    tagline: "The everyday supercar.",
    description:
      "A mid-engine V10 with quattro sure-footedness. Easy to live with, impossible to ignore.",
    markets: ["houston"],
    chauffeur: false,
    specs: [
      { label: "Body", value: "Coupé" },
      { label: "Seats", value: "2" },
      { label: "Engine", value: "5.2 L V10" },
      { label: "Drive", value: "All-wheel drive" },
    ],
    images: [
      {
        src: "/images/fleet/audi-r8.jpg",
        alt: "Grey Audi R8 V10 rear three-quarter on a canyon road at sunset",
        width: 2400,
        height: 1602,
        focus: "45% 60%",
      },
    ],
  },
  {
    slug: "range-rover",
    marque: "Land Rover",
    model: "Range Rover",
    category: "SUV",
    tagline: "Command position, full black.",
    description:
      "Space for five and their luggage, with the ride quality to make a long transfer disappear. Available with a chauffeur.",
    markets: ["dubai", "houston"],
    chauffeur: true,
    specs: [
      { label: "Body", value: "Full-size SUV" },
      { label: "Seats", value: "5" },
      { label: "Drive", value: "All-wheel drive" },
      { label: "Service", value: "Self-drive or chauffeur" },
    ],
    images: [
      {
        src: "/images/fleet/range-rover-black.jpg",
        alt: "Black Range Rover in side profile on a residential street",
        width: 2000,
        height: 1333,
        focus: "60% 60%",
      },
      {
        src: "/images/fleet/range-rover-sport-front.jpg",
        alt: "Black Range Rover Sport head-on in front of a dark garage door",
        width: 2400,
        height: 1600,
        focus: "50% 55%",
      },
    ],
  },
];

export const categories: VehicleCategory[] = ["Supercar", "Sports", "Grand Tourer", "Chauffeur", "SUV"];

export function getVehicle(slug: string): Vehicle | undefined {
  return fleet.find((v) => v.slug === slug);
}

export function vehiclesForMarket(market: MarketId): Vehicle[] {
  return fleet.filter((v) => v.markets.includes(market));
}

export function vehicleName(v: Vehicle): string {
  return `${v.marque} ${v.model}`;
}

export const featuredSlugs = [
  "lamborghini-aventador-s",
  "rolls-royce-wraith",
  "ferrari-f8-tributo",
  "bentley-flying-spur",
  "porsche-911-gt3-rs",
  "range-rover",
];

export function featuredVehicles(): Vehicle[] {
  return featuredSlugs.map((s) => getVehicle(s)).filter((v): v is Vehicle => Boolean(v));
}
