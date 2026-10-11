import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/icons";
import { comingSoon, marketList } from "@/content/site";
import { enquiryMessage, whatsappHref } from "@/lib/contact";

export default function LocationsSection() {
  return (
    <section aria-labelledby="locations-title" className="py-[var(--section)]">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
        <SectionHeader
          id="locations-title"
          eyebrow="Our locations"
          title={
            <>
              From Dubai
              <span className="text-paper-muted"> to the world.</span>
            </>
          }
          lede="Every location runs to the same fleet standard and the same commitment to a genuinely luxury rental."
        />

        <ul className="mt-16 grid gap-6 lg:grid-cols-2">
          {marketList.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 120}>
              <article className="group relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden border border-line p-8 sm:p-10">
                <div className="media-frame absolute inset-0 -z-10">
                  <Image
                    src={m.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover opacity-70 grayscale-[35%]"
                  />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-0 via-ink-0/70 to-ink-0/10" />
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-champagne">{m.region}</p>
                <h3 className="display mt-3 text-step-6">
                  <Link href={m.href} className="hover:text-champagne-bright">
                    {m.city}
                  </Link>
                </h3>
                <p className="mt-4 max-w-md text-sm text-paper-muted">{m.coverage}</p>
                <dl className="mt-6 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.72rem] uppercase tracking-[0.2em] text-paper-subtle">
                      Airport delivery
                    </dt>
                    <dd className="mt-1 text-paper">{m.airports.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] uppercase tracking-[0.2em] text-paper-subtle">WhatsApp</dt>
                    <dd className="mt-1">
                      <a
                        href={whatsappHref(m.id, enquiryMessage(m.id))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-paper hover:text-champagne-bright"
                      >
                        <WhatsAppIcon className="h-4 w-4 text-champagne" />
                        {m.phoneDisplay}
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                </dl>
                <Link href={m.href} className="link-line mt-8 self-start">
                  Rent in {m.city}
                  <ArrowIcon />
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:gap-10">
          <h3 className="eyebrow eyebrow--plain shrink-0">Coming soon · USA</h3>
          <ul className="flex flex-wrap gap-2">
            {comingSoon.map((city) => (
              <li key={city} className="border border-line px-4 py-2 font-display text-sm tracking-wide text-paper-muted">
                {city}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
