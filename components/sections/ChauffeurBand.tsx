import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";

export default function ChauffeurBand() {
  return (
    <section
      aria-labelledby="chauffeur-title"
      className="relative isolate flex min-h-[min(92svh,60rem)] items-center overflow-hidden bg-ink-0"
    >
      <Image
        src="/images/fleet/bentley-flying-spur-night.jpg"
        alt="Bentley Flying Spur grille and headlamp at night"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
        style={{ objectPosition: "70% 50%" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-0 via-ink-0/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-1 via-transparent to-ink-1" />
      <div className="grain -z-10" />

      <div className="mx-auto w-full max-w-[110rem] px-[var(--gutter)] py-24">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Chauffeur</p>
          <h2 id="chauffeur-title" className="display mt-6 text-step-5">
            The rear seat is the destination.
          </h2>
          <p className="lede mt-6">
            Professional chauffeurs for daily driving, corporate travel, airport transfers and events —
            in the UAE and Houston.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/services#chauffeur" className="btn btn-gold">
              Chauffeur service
            </Link>
            <Link href="/vehicles/bentley-flying-spur" className="link-line">
              Bentley Flying Spur
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
