import type { Metadata } from "next";
import MarketPage from "@/components/templates/MarketPage";

export const metadata: Metadata = {
  title: "Dubai — Luxury, Exotic & Chauffeur Car Rental",
  description:
    "Rent supercars, grand tourers and chauffeur-driven cars in Dubai with delivery to hotels, residences and DXB, DWC and AUH airports. WhatsApp-first booking.",
  alternates: { canonical: "/uae/dubai" },
};

export default function DubaiPage() {
  return (
    <MarketPage
      id="dubai"
      title={
        <>
          Dubai,
          <span className="text-paper-muted"> after dark and after hours.</span>
        </>
      }
      lede="Self-drive supercars and chauffeured grand tourers, delivered across the city and to the airports. Inter-emirate travel is welcome."
      focus="50% 40%"
      intro={{
        heading: "A city built for arriving well.",
        body: "From Downtown dinners to a morning run up Jebel Jais, we match the car to the plan — then bring it to you. Visiting? Many guests drive on their home licence or an International Driving Permit; the team confirms what applies to you before delivery.",
      }}
      deliveryPoints={[
        "Downtown & DIFC",
        "Dubai Marina & JBR",
        "Palm Jumeirah",
        "Business Bay",
        "DXB · DWC · AUH airports",
      ]}
      highlights={[
        {
          title: "Airport hand-over",
          body: "Land, clear arrivals and find your car waiting — no rental desk, no queue.",
        },
        {
          title: "Weddings & events",
          body: "Chauffeured Rolls-Royce and Bentley arrivals, timed to the minute with your planner.",
        },
        {
          title: "Monthly rentals",
          body: "Living in Dubai for a season? Keep the car as long as you need it.",
        },
      ]}
    />
  );
}
