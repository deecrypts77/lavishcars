import type { Metadata } from "next";
import MarketPage from "@/components/templates/MarketPage";

export const metadata: Metadata = {
  title: "Houston — Luxury, Exotic & Chauffeur Car Rental",
  description:
    "Exotic cars, executive saloons and luxury SUVs in Houston, delivered to hotels, offices and IAH and HOU airports. Visit us at 10480 Grant Rd Suite 126 or book on WhatsApp.",
  alternates: { canonical: "/usa/houston" },
};

export default function HoustonPage() {
  return (
    <MarketPage
      id="houston"
      title={
        <>
          Houston,
          <span className="text-paper-muted"> built for the long way round.</span>
        </>
      }
      lede="Performance cars for Texas roads, executive saloons for the work week and full-size SUVs for everything else — delivered across Houston."
      focus="50% 60%"
      intro={{
        heading: "Big city, bigger distances.",
        body: "Houston rewards a car that's comfortable at speed. We deliver to the Galleria, Downtown and both airports, and our Grant Road base serves the northwest suburbs directly.",
      }}
      deliveryPoints={[
        "Downtown & Midtown",
        "Uptown & the Galleria",
        "River Oaks",
        "The Woodlands & Cypress",
        "IAH · HOU airports",
      ]}
      highlights={[
        {
          title: "Executive travel",
          body: "Chauffeured saloons and SUVs for client days, conferences and multi-stop schedules.",
        },
        {
          title: "Weekend exotics",
          body: "A supercar for the weekend, delivered Friday, collected Monday.",
        },
        {
          title: "Airport delivery",
          body: "Your car meets you at IAH or HOU — and is collected when you fly out.",
        },
      ]}
    />
  );
}
