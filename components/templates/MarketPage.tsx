import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import VehicleCard from "@/components/ui/VehicleCard";
import {
  ArrowIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  StarIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { vehiclesForMarket } from "@/content/fleet";
import { EMAIL, HOURS, type MarketId, markets } from "@/content/site";
import { enquiryMessage, telHref, whatsappHref } from "@/lib/contact";

type MarketPageProps = {
  id: MarketId;
  title: React.ReactNode;
  lede: string;
  focus?: string;
  intro: { heading: string; body: string };
  deliveryPoints: string[];
  highlights: { title: string; body: string }[];
};

export default function MarketPage({
  id,
  title,
  lede,
  focus,
  intro,
  deliveryPoints,
  highlights,
}: MarketPageProps) {
  const m = markets[id];
  const vehicles = vehiclesForMarket(id);
  const other = markets[id === "dubai" ? "houston" : "dubai"];

  return (
    <>
      <PageHero
        eyebrow={`${m.city} · ${m.region}`}
        title={title}
        lede={lede}
        backdropWord={m.city.toUpperCase()}
        image={{ src: m.image, alt: m.imageAlt, focus }}
      >
        <a
          href={whatsappHref(id, enquiryMessage(id))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
        >
          <WhatsAppIcon />
          WhatsApp {m.city}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <Link href="#fleet" className="btn btn-ghost">
          {m.city} fleet
        </Link>
      </PageHero>

      <section aria-labelledby="intro-title" className="py-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-14 px-[var(--gutter)] lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">In {m.city}</p>
            <h2 id="intro-title" className="display mt-6 text-step-4">
              {intro.heading}
            </h2>
            <p className="lede mt-6">{intro.body}</p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={120}>
            <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-paper-subtle">
              Delivery to
            </h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {deliveryPoints.map((p) => (
                <li key={p} className="flex items-center justify-between py-4 font-display text-step-1">
                  {p}
                  <span aria-hidden="true" className="h-px w-8 bg-champagne/60" />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-paper-subtle">
              {m.coverage} Other locations on request — just include the address in your message.
            </p>
          </Reveal>
        </div>

        <ul className="mx-auto mt-20 grid max-w-[110rem] gap-px px-[var(--gutter)] md:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 100} className="border-t border-line pt-6 md:pr-10">
              <span className="font-display text-sm text-champagne">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-step-1">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{h.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="fleet" aria-labelledby="market-fleet-title" className="border-t border-line bg-ink-0 py-[var(--section)]">
        <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Available in {m.city}</p>
              <h2 id="market-fleet-title" className="display mt-6 text-step-5">
                The {m.city} garage
              </h2>
            </div>
            <Link href="/fleet" className="link-line">
              Full fleet
              <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((v, i) => (
              <Reveal as="li" key={v.slug} delay={(i % 3) * 100}>
                <VehicleCard vehicle={v} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="py-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-12 px-[var(--gutter)] lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">Contact {m.city}</p>
            <h2 id="visit-title" className="display mt-6 text-step-5">
              Message first.
              <span className="block text-paper-muted">We&apos;ll handle the rest.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={120}>
            <div className="border border-line bg-ink-2 p-8">
              <a
                href={whatsappHref(id, enquiryMessage(id))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold w-full justify-between"
              >
                <span>WhatsApp {m.phoneDisplay}</span>
                <WhatsAppIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex gap-4">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                  <a href={m.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-paper-muted hover:text-paper">
                    {m.address}
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                </li>
                <li className="flex gap-4">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                  <a href={telHref(id)} className="text-paper-muted hover:text-paper">
                    {m.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-4">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                  <span className="text-paper-muted">{HOURS.label}</span>
                </li>
                <li className="flex gap-4">
                  <StarIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                  <a href={m.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-paper-muted hover:text-paper">
                    {m.rating.value.toFixed(1)} on Google · {m.rating.count} reviews
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                </li>
                <li className="flex gap-4">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                  <a href={`mailto:${EMAIL}`} className="text-paper-muted hover:text-paper">
                    {EMAIL}
                  </a>
                </li>
              </ul>
              <p className="mt-8 border-t border-line pt-6 text-sm text-paper-subtle">
                Travelling on?{" "}
                <Link href={other.href} className="prose-link">
                  LavishCars {other.city}
                </Link>{" "}
                is one message away too.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
