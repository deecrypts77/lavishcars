import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import FleetGrid from "./_components/FleetGrid";
import { categories, fleet } from "@/content/fleet";

export const metadata: Metadata = {
  title: "The Fleet — Supercars, Grand Tourers & Chauffeur Cars",
  description:
    "Explore the LavishCars fleet of supercars, grand tourers, SUVs and chauffeur saloons available in Dubai and Houston. Enquire instantly on WhatsApp.",
  alternates: { canonical: "/fleet" },
};

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="The fleet"
        title={
          <>
            The garage,
            <span className="text-paper-muted"> opened.</span>
          </>
        }
        lede="Supercars for the weekend, grand tourers for the coast, and chauffeured saloons for everything in between. Every enquiry goes straight to a person on WhatsApp."
        backdropWord="COLLECTION"
        image={{
          src: "/images/fleet/mclaren-p1-orange-dark.jpg",
          alt: "Orange McLaren P1 in low light, front wheel and headlamp",
          focus: "40% 55%",
        }}
        size="compact"
      >
        <WhatsAppButtons />
      </PageHero>

      <section aria-label="Vehicles" className="mx-auto max-w-[110rem] px-[var(--gutter)] pb-[var(--section)]">
        <FleetGrid vehicles={fleet} categories={categories} />
        <p className="mt-20 max-w-2xl text-sm text-paper-subtle">
          Imagery is illustrative and specifications are indicative. Exact model year, colour and
          availability are confirmed by the team on WhatsApp before booking.
        </p>
      </section>
    </>
  );
}
