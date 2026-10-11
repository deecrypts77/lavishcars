import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import VehicleCard from "@/components/ui/VehicleCard";
import { ArrowIcon } from "@/components/ui/icons";
import { featuredVehicles, fleet } from "@/content/fleet";

export default function CollectionSection() {
  const featured = featuredVehicles();

  return (
    <section aria-labelledby="collection-title" className="py-[var(--section)]">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
        <SectionHeader
          id="collection-title"
          eyebrow="The collection"
          title={
            <>
              Curated,
              <span className="text-paper-muted"> not catalogued.</span>
            </>
          }
          action={
            <Link href="/fleet" className="link-line">
              View all {fleet.length} vehicles
              <ArrowIcon />
            </Link>
          }
        />

        <ul className="mt-16 grid items-start gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => (
            <Reveal as="li" key={v.slug} delay={(i % 3) * 110} className={i % 3 === 1 ? "lg:mt-28" : ""}>
              <VehicleCard
                vehicle={v}
                index={i}
                aspect="portrait"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
