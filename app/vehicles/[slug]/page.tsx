import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import VehicleCard from "@/components/ui/VehicleCard";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import { ArrowIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { fleet, getVehicle, vehicleName } from "@/content/fleet";
import { EMAIL, SITE_URL, markets } from "@/content/site";
import { enquiryMessage, mailtoHref, telHref, whatsappHref } from "@/lib/contact";

export function generateStaticParams() {
  return fleet.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/vehicles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  const name = vehicleName(vehicle);
  const cities = vehicle.markets.map((m) => markets[m].city).join(" & ");
  return {
    title: `${name} Rental in ${cities}`,
    description: `${vehicle.tagline} Rent the ${name} in ${cities} with delivery${
      vehicle.chauffeur ? " or a chauffeur" : ""
    }. Enquire on WhatsApp.`,
    alternates: { canonical: `/vehicles/${vehicle.slug}` },
    openGraph: {
      images: [{ url: vehicle.images[0].src, alt: vehicle.images[0].alt }],
    },
  };
}

export default async function VehiclePage({ params }: PageProps<"/vehicles/[slug]">) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const name = vehicleName(vehicle);
  const [hero, ...gallery] = vehicle.images;
  const related = fleet
    .filter((v) => v.slug !== vehicle.slug)
    .sort(
      (a, b) =>
        Number(b.category === vehicle.category) - Number(a.category === vehicle.category) ||
        Number(b.markets.some((m) => vehicle.markets.includes(m))) -
          Number(a.markets.some((m) => vehicle.markets.includes(m))),
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Car",
        name,
        brand: { "@type": "Brand", name: vehicle.marque },
        model: vehicle.model,
        image: vehicle.images.map((i) => `${SITE_URL}${i.src}`),
        description: vehicle.description,
        url: `${SITE_URL}/vehicles/${vehicle.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Fleet", item: `${SITE_URL}/fleet` },
          { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/vehicles/${vehicle.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <section
        aria-labelledby="vehicle-title"
        className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-0"
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          preload
          sizes="100vw"
          className="anim-drift -z-20 object-cover"
          style={{ objectPosition: hero.focus ?? "50% 50%" }}
        />
        <div aria-hidden="true" className="anim-lights-up absolute inset-0 -z-10 bg-ink-0" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-1 via-ink-1/40 to-ink-0/50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-0/80 via-ink-0/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink-0/85 to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[calc(var(--header-h)+1rem)] -z-10 select-none opacity-50"
        >
          <p className="wordmark text-chrome anim-wordmark text-center text-wordmark">
            {vehicle.model.split(" ")[0]}
          </p>
        </div>
        <div className="grain -z-10" />

        <div className="mx-auto w-full max-w-[110rem] px-[var(--gutter)] pb-14 pt-[calc(var(--header-h)+4rem)] sm:pb-20">
          <nav aria-label="Breadcrumb" className="anim-fade">
            <ol className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-paper-muted">
              <li>
                <Link href="/fleet" className="hover:text-paper">
                  Fleet
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-paper">
                {name}
              </li>
            </ol>
          </nav>
          <p className="eyebrow anim-rise mt-8">
            {vehicle.marque} · {vehicle.category}
          </p>
          <h1 id="vehicle-title" className="display anim-rise delay-1 mt-4 text-step-6">
            <span className="sr-only">{vehicle.marque} </span>
            {vehicle.model}
          </h1>
          <p className="lede anim-rise delay-2 mt-4 max-w-xl">{vehicle.tagline}</p>
          <div className="anim-rise delay-3 mt-10 flex flex-wrap gap-3">
            <WhatsAppButtons only={vehicle.markets} vehicleName={name} />
          </div>
        </div>
      </section>

      <section aria-labelledby="overview-title" className="py-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-16 px-[var(--gutter)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Overview</p>
              <h2 id="overview-title" className="display mt-6 text-step-4">
                {name}
              </h2>
              <p className="lede mt-6 max-w-2xl">{vehicle.description}</p>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-paper-subtle">
                Specification (indicative)
              </h3>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {vehicle.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[10rem_1fr] gap-6 py-4 sm:grid-cols-[14rem_1fr]">
                    <dt className="text-sm text-paper-muted">{s.label}</dt>
                    <dd className="font-display text-step-1">{s.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[10rem_1fr] gap-6 py-4 sm:grid-cols-[14rem_1fr]">
                  <dt className="text-sm text-paper-muted">Available in</dt>
                  <dd className="font-display text-step-1">
                    {vehicle.markets.map((m, i) => (
                      <span key={m}>
                        {i > 0 ? " · " : ""}
                        <Link href={markets[m].href} className="prose-link">
                          {markets[m].city}
                        </Link>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-paper-subtle">
                Imagery is illustrative. Model year, colour and exact specification are confirmed
                on WhatsApp before booking.
              </p>
            </Reveal>
          </div>

          <aside aria-labelledby="reserve-title" className="lg:col-span-4 lg:col-start-9">
            <div className="border border-line bg-ink-2 p-7 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow eyebrow--plain">Reserve</p>
              <h2 id="reserve-title" className="mt-3 font-display text-step-2 leading-tight">
                Enquire about the {vehicle.model}
              </h2>
              <p className="mt-3 text-sm text-paper-muted">
                Send your dates and delivery location. The team replies with availability and the
                details for your booking.
              </p>
              <ul className="mt-6 space-y-3">
                {vehicle.markets.map((m, i) => (
                  <li key={m}>
                    <a
                      href={whatsappHref(m, enquiryMessage(m, name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn w-full justify-between ${i === 0 ? "btn-gold" : "btn-ghost"}`}
                    >
                      <span>WhatsApp {markets[m].city}</span>
                      <WhatsAppIcon />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
                {vehicle.markets.map((m) => (
                  <li key={m}>
                    <a href={telHref(m)} className="flex items-center gap-3 text-paper-muted hover:text-paper">
                      <PhoneIcon className="h-4 w-4 text-champagne" />
                      {markets[m].city} · {markets[m].phoneDisplay}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={mailtoHref(EMAIL, `Enquiry: ${name}`)} className="flex items-center gap-3 text-paper-muted hover:text-paper">
                    <MailIcon className="h-4 w-4 text-champagne" />
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {gallery.length ? (
        <section aria-label={`${name} gallery`} className="pb-[var(--section)]">
          <ul className={`mx-auto grid max-w-[110rem] gap-6 px-[var(--gutter)] ${gallery.length > 1 ? "md:grid-cols-2" : ""}`}>
            {gallery.map((img) => (
              <Reveal as="li" key={img.src}>
                <div className="media-frame relative aspect-[16/10]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={gallery.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
                    className="object-cover"
                    style={{ objectPosition: img.focus ?? "50% 50%" }}
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="related-title" className="border-t border-line bg-ink-0 py-[var(--section)]">
        <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Also in the garage</p>
              <h2 id="related-title" className="display mt-6 text-step-4">
                You may also consider
              </h2>
            </div>
            <Link href="/fleet" className="link-line">
              The full fleet
              <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <li key={v.slug}>
                <VehicleCard vehicle={v} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd data={jsonLd} />
    </>
  );
}
