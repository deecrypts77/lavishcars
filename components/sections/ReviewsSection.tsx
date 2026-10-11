import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { StarIcon } from "@/components/ui/icons";
import { reviews } from "@/content/reviews";
import { marketList, markets } from "@/content/site";

export default function ReviewsSection() {
  return (
    <section aria-labelledby="reviews-title" className="border-y border-line bg-ink-0 py-[var(--section)]">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
        <SectionHeader
          id="reviews-title"
          eyebrow="Client reviews"
          title={
            <>
              Kept by service,
              <span className="text-paper-muted"> not by contract.</span>
            </>
          }
          action={
            <ul className="flex gap-10">
              {marketList.map((m) => (
                <li key={m.id}>
                  <a
                    href={m.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-display text-step-4 font-light leading-none">
                        {m.rating.value.toFixed(1)}
                      </span>
                      <StarIcon className="h-5 w-5 text-champagne" />
                      <span className="sr-only">out of 5</span>
                    </span>
                    <span className="mt-2 block text-[0.72rem] uppercase tracking-[0.18em] text-paper-subtle transition-colors group-hover:text-paper">
                      {m.city} · {m.rating.count} Google reviews
                    </span>
                    <span className="sr-only">(opens Google Maps in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          }
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.author} delay={(i % 3) * 100}>
              <figure className="flex h-full flex-col border border-line bg-ink-1 p-8">
                <blockquote className="flex-1 font-display text-step-1 font-light leading-snug text-paper">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between border-t border-line pt-5 text-sm">
                  <span className="text-paper">{r.author}</span>
                  <span className="text-[0.72rem] uppercase tracking-[0.18em] text-paper-subtle">
                    Google · {markets[r.market].city}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
