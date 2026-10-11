import Image from "next/image";
import Link from "next/link";
import { type Vehicle, vehicleName } from "@/content/fleet";
import { markets } from "@/content/site";
import { whatsappHref, enquiryMessage } from "@/lib/contact";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/icons";

type VehicleCardProps = {
  vehicle: Vehicle;
  index?: number;
  aspect?: "portrait" | "landscape" | "wide";
  sizes?: string;
  headingLevel?: "h2" | "h3";
};

const aspectClass = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export default function VehicleCard({
  vehicle,
  index,
  aspect = "landscape",
  sizes = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
  headingLevel: Heading = "h3",
}: VehicleCardProps) {
  const name = vehicleName(vehicle);
  const href = `/vehicles/${vehicle.slug}`;
  const image = vehicle.images[0];
  const headingId = `vehicle-${vehicle.slug}`;

  return (
    <article aria-labelledby={headingId} className="group relative flex h-full flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <div className={`media-frame relative ${aspectClass[aspect]}`}>
          <Image
            src={image.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: image.focus ?? "50% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-0/85 via-ink-0/5 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-0/75 to-transparent" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-[0.72rem] font-medium uppercase tracking-[0.2em]">
            {typeof index === "number" ? (
              <span className="text-paper/80">N° {String(index + 1).padStart(2, "0")}</span>
            ) : (
              <span />
            )}
            <span className="text-champagne">{vehicle.category}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-paper/70">
              {vehicle.markets.map((m) => markets[m].city).join(" · ")}
              {vehicle.chauffeur ? " · Chauffeur" : ""}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col border-x border-b border-line bg-ink-2/60 p-5 sm:p-6">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-paper-subtle">
          {vehicle.marque}
        </p>
        <Heading id={headingId} className="mt-1 font-display text-step-2 leading-tight">
          <Link href={href} className="transition-colors hover:text-champagne-bright">
            <span className="sr-only">{vehicle.marque} </span>
            {vehicle.model}
          </Link>
        </Heading>
        <p className="mt-2 text-sm text-paper-muted">{vehicle.tagline}</p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
          {vehicle.specs.slice(0, 3).map((s) => (
            <div key={s.label}>
              <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-paper-subtle">{s.label}</dt>
              <dd className="mt-1 text-[0.8rem] leading-snug text-paper">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {vehicle.markets.map((m) => (
            <a
              key={m}
              href={whatsappHref(m, enquiryMessage(m, name))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost"
              aria-label={`Enquire about the ${name} in ${markets[m].city} on WhatsApp (opens in a new tab)`}
            >
              <WhatsAppIcon className="text-champagne" />
              {vehicle.markets.length > 1 ? markets[m].city : `Enquire · ${markets[m].city}`}
            </a>
          ))}
          <Link href={href} className="link-line ml-auto" aria-label={`View ${name} details`}>
            Details
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
