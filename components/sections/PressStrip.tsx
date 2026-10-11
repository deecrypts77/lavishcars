import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { press } from "@/content/press";

export default function PressStrip() {
  return (
    <section aria-labelledby="press-title" className="py-20 sm:py-24">
      <Reveal className="mx-auto flex max-w-[110rem] flex-col items-center gap-10 px-[var(--gutter)]">
        <h2 id="press-title" className="eyebrow eyebrow--plain">
          As featured in
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {press.map((p) => (
            <li key={p.name}>
              <Image
                src={p.logo}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="h-auto max-h-9 w-auto max-w-[11rem] object-contain opacity-60"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
