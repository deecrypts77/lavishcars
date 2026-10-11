import type { Metadata } from "next";
import FaqList from "@/components/ui/FaqList";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import { allFaqs, faqGroups } from "@/content/faqs";
import { faqSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "FAQ — Locations, Booking, Delivery & Chauffeur Service",
  description:
    "Answers on where LavishCars operates, how WhatsApp booking works, transparent pricing, deposits, airport delivery, monthly rentals and chauffeur service in Dubai and Houston.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Ask us
            <span className="text-paper-muted"> anything.</span>
          </>
        }
        lede="Can't find what you need? The team answers on WhatsApp."
        backdropWord="ANSWERS"
        size="compact"
      />

      <section aria-label="Frequently asked questions" className="pb-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-16 px-[var(--gutter)]">
          {faqGroups.map((group, gi) => (
            <Reveal key={group.title} className="grid gap-6 lg:grid-cols-12">
              <h2 className="eyebrow lg:col-span-3 lg:pt-6">{group.title}</h2>
              <FaqList items={group.items} openFirst={gi === 0} className="lg:col-span-8 lg:col-start-5" />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-cta" className="border-t border-line bg-ink-0 py-[var(--section)]">
        <Reveal className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
          <h2 id="faq-cta" className="display text-step-5">Still curious?</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <WhatsAppButtons />
          </div>
        </Reveal>
      </section>

      <JsonLd data={faqSchema(allFaqs)} />
    </>
  );
}
