import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import { brands } from "@/content/brands";

const logoClass =
  "h-auto max-h-11 w-auto max-w-[8.5rem] object-contain opacity-60 grayscale transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0";

export default function BrandMarquee() {
  return (
    <section aria-labelledby="marques-title" className="border-y border-line bg-ink-0 py-10 sm:py-12">
      <div className="mx-auto flex max-w-[110rem] flex-col gap-6 px-[var(--gutter)] lg:flex-row lg:items-center lg:gap-12">
        <h2 id="marques-title" className="eyebrow eyebrow--plain shrink-0">
          The marques
        </h2>
        <Marquee
          className="min-w-0 flex-1"
          label="Car brands available through LavishCars"
          items={brands.map((b) => (
            <Image key={b.name} src={b.logo} alt={b.name} width={b.width} height={b.height} className={logoClass} />
          ))}
          clones={brands.map((b) => (
            <Image key={b.name} src={b.logo} alt="" width={b.width} height={b.height} className={logoClass} />
          ))}
        />
      </div>
    </section>
  );
}
