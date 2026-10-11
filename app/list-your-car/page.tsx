import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ListingComposer from "./_components/ListingComposer";

export const metadata: Metadata = {
  title: "List Your Car — Partner With the LavishCars Marketplace",
  description:
    "Own a luxury or exotic car in Dubai or Houston? List it on LavishCars.com — a luxury car rental marketplace that brings you the demand.",
  alternates: { canonical: "/list-your-car" },
};

const benefits = [
  { title: "We bring the demand", body: "Clients come to LavishCars across the UAE and the USA. Your car is matched to them." },
  { title: "One standard", body: "Every listing is held to the same delivery, condition and pricing-transparency standard." },
  { title: "A real team", body: "Bookings, client communication and hand-overs are coordinated by people, on WhatsApp." },
];

export default function ListYourCarPage() {
  return (
    <>
      <PageHero
        eyebrow="List your car"
        title={
          <>
            A platform,
            <span className="text-paper-muted"> not a fleet.</span>
          </>
        }
        lede="LavishCars.com is a marketplace where suppliers list their vehicles and customers rent with complete confidence. Tell us about your car."
        backdropWord="PARTNERS"
        size="compact"
      />

      <section aria-labelledby="listing-title" className="pt-10 pb-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-14 px-[var(--gutter)] lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="listing-title" className="display text-step-4">
              Why list with us
            </h2>
            <ol className="mt-10 space-y-8">
              {benefits.map((b, i) => (
                <li key={b.title} className="border-t border-line pt-6">
                  <span aria-hidden="true" className="font-display text-sm text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-step-2">{b.title}</h3>
                  <p className="mt-2 text-paper-muted">{b.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <ListingComposer />
          </Reveal>
        </div>
      </section>
    </>
  );
}
