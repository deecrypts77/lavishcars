import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import { ArrowIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Services — Self-Drive, Chauffeur, Airport Delivery & Monthly Rental",
  description:
    "Self-drive exotic cars, professional chauffeurs, airport delivery at DXB, DWC, AUH, IAH and HOU, and monthly luxury car rental in Dubai and Houston.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    id: "self-drive",
    title: "Self-drive",
    kicker: "Take the wheel",
    body: "Choose the car, tell us where you are, and it arrives fuelled and detailed. A full walk-around and hand-over come as standard, with the documents checked before the keys change hands.",
    points: ["Hotel, residence & office delivery", "Hourly, daily, weekly options", "Hand-over walk-around"],
    image: {
      src: "/images/fleet/lamborghini-huracan-performante.jpg",
      alt: "White Lamborghini Huracán Performante, front three-quarter",
      focus: "50% 55%",
    },
    vehicle: { href: "/fleet", label: "Browse supercars" },
  },
  {
    id: "chauffeur",
    title: "Chauffeur",
    kicker: "Be driven",
    body: "Professional, discreet drivers for executive days, airport meet-and-greet, weddings, events and city tours. You plan the day; we plan the route, the timing and the car.",
    points: ["Executive & roadshow days", "Weddings and events", "Multi-stop itineraries"],
    image: {
      src: "/images/fleet/bentley-flying-spur-night.jpg",
      alt: "Bentley Flying Spur front detail at night",
      focus: "65% 50%",
    },
    vehicle: { href: "/vehicles/bentley-flying-spur", label: "Bentley Flying Spur" },
  },
  {
    id: "airport",
    title: "Airport delivery",
    kicker: "Skip the counter",
    body: "Your car meets you at arrivals and is collected when you fly out. No shuttle, no rental desk, no queue — in Dubai, Abu Dhabi and Houston.",
    points: ["DXB · DWC · AUH", "IAH · HOU", "Hand-over at arrivals"],
    image: {
      src: "/images/fleet/porsche-panamera-turbo.jpg",
      alt: "Black Porsche Panamera Turbo on a highway at dusk",
      focus: "50% 60%",
    },
    vehicle: { href: "/vehicles/porsche-panamera-turbo", label: "Porsche Panamera Turbo" },
  },
  {
    id: "monthly",
    title: "Monthly",
    kicker: "Stay a while",
    body: "In town for a season, a project or a relocation? Keep a luxury car or SUV for a month or more, with the same service and support as a weekend booking.",
    points: ["Luxury SUVs & saloons", "Self-drive or chauffeur", "One contact on WhatsApp"],
    image: {
      src: "/images/fleet/range-rover-black.jpg",
      alt: "Black Range Rover in side profile",
      focus: "60% 60%",
    },
    vehicle: { href: "/vehicles/range-rover", label: "Range Rover" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            However you arrive,
            <span className="text-paper-muted"> arrive well.</span>
          </>
        }
        lede="Four ways to use the garage — each arranged personally, over WhatsApp, in Dubai and Houston."
        backdropWord="SERVICES"
        size="compact"
      >
        <nav aria-label="Services on this page" className="flex flex-wrap gap-x-8 gap-y-3">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="link-line">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="pb-[var(--section)]">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="mx-auto max-w-[110rem] px-[var(--gutter)] py-16 sm:py-24"
          >
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="media-frame relative aspect-[16/11]">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: s.image.focus }}
                  />
                  <span className="absolute left-5 top-5 text-[0.72rem] uppercase tracking-[0.2em] text-paper/80">
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
              <Reveal className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`} delay={120}>
                <p className="eyebrow">{s.kicker}</p>
                <h2 id={`${s.id}-title`} className="display mt-5 text-step-5">
                  {s.title}
                </h2>
                <p className="lede mt-6">{s.body}</p>
                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {s.points.map((p) => (
                    <li key={p} className="py-3 text-sm text-paper">
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={s.vehicle.href} className="link-line mt-8">
                  {s.vehicle.label}
                  <ArrowIcon />
                </Link>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="services-cta" className="border-t border-line bg-ink-0 py-[var(--section)]">
        <Reveal className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
          <h2 id="services-cta" className="display text-step-5">
            Tell us the occasion.
            <span className="block text-paper-muted">We&apos;ll suggest the car.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <WhatsAppButtons />
          </div>
        </Reveal>
      </section>
    </>
  );
}
