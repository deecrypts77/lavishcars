import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { SITE, markets } from "@/content/site";

const facts = [
  { value: String(SITE.founded), label: "Founded in Dubai" },
  { value: "7", label: "Emirates served" },
  { value: markets.dubai.rating.value.toFixed(1), label: "Google rating, Dubai" },
];

export default function StorySection() {
  return (
    <section aria-labelledby="story-title" className="border-y border-line bg-ink-0 py-[var(--section)]">
      <div className="mx-auto grid max-w-[110rem] items-center gap-14 px-[var(--gutter)] lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="media-frame relative aspect-[4/5]">
            <Image
              src="/images/fleet/rolls-royce-wraith.jpg"
              alt="Two-tone Rolls-Royce Wraith beneath palm trees in Dubai"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 70%" }}
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <p className="eyebrow">Our story</p>
          <h2 id="story-title" className="display mt-6 text-step-5">
            One car.
            <span className="text-paper-muted"> One standard.</span>
          </h2>
          <div className="mt-6 space-y-5 text-paper-muted">
            <p className="lede">
              {SITE.domain} started in Dubai with one idea: a luxury car rental should feel as good
              as the car itself. No hidden fees, no compromises on the fleet, and a team that shows up.
            </p>
            <p>
              People came for the cars and stayed for the service. That trust took us to the United
              States — same standard, same people-first approach, now across two of the world’s great
              driving destinations.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse gap-2">
                <dt className="text-[0.72rem] uppercase tracking-[0.18em] text-paper-subtle">{f.label}</dt>
                <dd className="font-display text-step-4 font-light leading-none text-paper">{f.value}</dd>
              </div>
            ))}
          </dl>

          <Link href="/about" className="link-line mt-10">
            Read our story
            <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
