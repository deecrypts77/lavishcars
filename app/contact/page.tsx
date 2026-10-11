import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import WhatsAppComposer from "./_components/WhatsAppComposer";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { fleet, vehicleName } from "@/content/fleet";
import { EMAIL, HOURS, marketList } from "@/content/site";
import { enquiryMessage, smsHref, telHref, whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact — Book on WhatsApp in Dubai or Houston",
  description:
    "Book a luxury, exotic or chauffeur car on WhatsApp. Dubai +971 585 5319 23 · Houston +1 626 769 7384 · info@lavishcars.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const vehicles = fleet.map((v) => ({ slug: v.slug, name: vehicleName(v), markets: v.markets }));

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            One message.
            <span className="text-paper-muted"> Two cities.</span>
          </>
        }
        lede="WhatsApp is the fastest way to book. Tell us the car, the dates and where you'll be — a person replies, not a bot."
        backdropWord="CONCIERGE"
        size="compact"
      >
        <WhatsAppButtons />
      </PageHero>

      <section aria-label="Locations" className="mx-auto max-w-[110rem] px-[var(--gutter)]">
        <ul className="grid gap-6 lg:grid-cols-2">
          {marketList.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 120}>
              <article
                aria-labelledby={`contact-${m.id}`}
                className="flex h-full flex-col border border-line bg-ink-2 p-8 sm:p-10"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-champagne">{m.region}</p>
                <h2 id={`contact-${m.id}`} className="display mt-3 text-step-5">
                  {m.city}
                </h2>
                <a
                  href={whatsappHref(m.id, enquiryMessage(m.id))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-4 self-start text-step-3 font-light leading-none tracking-tight text-paper hover:text-champagne-bright"
                >
                  <WhatsAppIcon className="h-7 w-7 text-champagne" />
                  {m.phoneDisplay}
                  <span className="sr-only">(WhatsApp, opens in a new tab)</span>
                </a>
                <ul className="mt-10 space-y-4 border-t border-line pt-6 text-sm">
                  <li className="flex gap-4">
                    <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                    <span className="text-paper-muted">
                      <a href={telHref(m.id)} className="hover:text-paper">
                        Call {m.phoneDisplay}
                      </a>
                      {" · "}
                      <a href={smsHref(m.id)} className="hover:text-paper">
                        SMS
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                    <a
                      href={m.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper-muted hover:text-paper"
                    >
                      {m.address}
                      <span className="sr-only"> (opens Google Maps in a new tab)</span>
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                    <span className="text-paper-muted">{HOURS.label}</span>
                  </li>
                  <li className="flex gap-4">
                    <span aria-hidden="true" className="mt-0.5 w-5 shrink-0 text-center text-xs text-champagne">
                      ✈
                    </span>
                    <span className="text-paper-muted">Airport delivery: {m.airports.join(" · ")}</span>
                  </li>
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="compose-title" className="py-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-14 px-[var(--gutter)] lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Compose</p>
            <h2 id="compose-title" className="display mt-6 text-step-4">
              Prepare your request.
            </h2>
            <p className="lede mt-6">
              Fill in what you know and we&apos;ll draft the WhatsApp message for you. Everything is
              optional except the city.
            </p>
            <div className="mt-10 border-t border-line pt-6">
              <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-paper-subtle">
                Prefer email?
              </h3>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 inline-flex items-center gap-3 font-display text-step-2 hover:text-champagne-bright"
              >
                <MailIcon className="h-5 w-5 text-champagne" />
                {EMAIL}
              </a>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <WhatsAppComposer vehicles={vehicles} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
