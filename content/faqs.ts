import type { NavLink } from "@/content/navigation";

export type Faq = { question: string; answer: string; link?: NavLink };

export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Locations",
    items: [
      {
        question: "Where does LavishCars operate?",
        answer:
          "Throughout the UAE — Dubai and the seven emirates — and in the United States, where we currently serve Houston, with more major US cities planned.",
      },
      {
        question: "Can I rent in Dubai and then rent again in the USA?",
        answer:
          "Yes. Your LavishCars experience follows you — clients who rent with us in Dubai book directly with the same standard in Houston.",
      },
      {
        question: "Will LavishCars expand into more US cities?",
        answer:
          "Yes. Los Angeles, Miami, Las Vegas, New York and Dallas are next. If you need a car in a city that isn’t listed, message us and we’ll tell you what we can do.",
      },
      {
        question: "Is the fleet the same in both countries?",
        answer:
          "The standard is the same. Models are chosen for each market and the roads they suit best, so confirm the exact car on WhatsApp.",
        link: { href: "/fleet", label: "Browse the fleet" },
      },
    ],
  },
  {
    title: "Booking & pricing",
    items: [
      {
        question: "What is the process to rent a car?",
        answer:
          "The quickest way is WhatsApp. Send your destination, preferred car and dates and we’ll reply straight away with availability and pricing.",
        link: { href: "/contact", label: "Prepare your message" },
      },
      {
        question: "Is there anything hidden that adds cost?",
        answer:
          "No. Pricing is transparent in both markets — what you book is what you pay, with no extras at pickup and nothing unexpected at return.",
      },
      {
        question: "Do you offer monthly rentals?",
        answer:
          "Yes, in the UAE and the USA. Monthly rentals are typically better value than daily or weekly rates — ideal for longer holidays or business trips.",
        link: { href: "/services#monthly", label: "Monthly rentals" },
      },
      {
        question: "Is there a security deposit?",
        answer:
          "Yes. The deposit depends on the market and the vehicle, and is confirmed in writing before you book.",
      },
      {
        question: "Can I rent as a tourist?",
        answer:
          "Yes. Requirements — including whether you need an International Driving Permit — depend on the market and the country that issued your licence. The team confirms what applies to you before delivery.",
      },
    ],
  },
  {
    title: "Delivery & service",
    items: [
      {
        question: "Do you deliver to airports in the UAE and the USA?",
        answer:
          "Yes — DXB, DWC and AUH in the UAE, and IAH and HOU in Houston. No counters, no queues: your car is waiting at arrivals.",
      },
      {
        question: "Is a chauffeur service available in both countries?",
        answer:
          "Yes. Professional chauffeur-driven cars are available in the UAE and Houston for daily driving, events, corporate travel and airport transfers.",
        link: { href: "/services#chauffeur", label: "Chauffeur service" },
      },
      {
        question: "Are the cars on this site the exact cars I’ll receive?",
        answer:
          "Imagery is illustrative. Model year, colour and specification are confirmed on WhatsApp before you book.",
      },
      {
        question: "What makes LavishCars different?",
        answer:
          "Most rental companies give you a car and a bill. We bring the car to you, keep the price honest and have a real team on hand when you need them — in Dubai and in Houston.",
        link: { href: "/about", label: "Our story" },
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);
