import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import { ArrowIcon } from "@/components/ui/icons";
import { SITE, marketList } from "@/content/site";
import { storyChapters, storyIntro } from "@/content/story";

export const metadata: Metadata = {
  title: "Our Story — From One Car in Dubai to a Global Marketplace",
  description:
    "LavishCars.com launched in Dubai in 2024 with a single car and founder Sir Bilawal Merani. Today it is a luxury car rental marketplace across the UAE and the USA.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const [first, ...rest] = storyChapters;

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            It started with
            <span className="text-paper-muted"> one car.</span>
          </>
        }
        lede={storyIntro}
        backdropWord="SINCE 2024"
        image={{
          src: "/images/fleet/ferrari-sp3-daytona-showroom.jpg",
          alt: "A single Ferrari spotlit in a dark showroom",
          focus: "60% 40%",
        }}
      />

      <section aria-labelledby={first.id} className="py-[var(--section)]">
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
            <p className="eyebrow">Dubai · {SITE.founded}</p>
            <h2 id={first.id} className="display mt-6 text-step-4">
              {first.title}
            </h2>
            <div className="mt-6 space-y-5 text-paper-muted">
              {first.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "lede" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="The story so far" className="border-y border-line bg-ink-0 py-[var(--section)]">
        <ol className="mx-auto grid max-w-[110rem] gap-16 px-[var(--gutter)]">
          {rest.map((chapter, i) => (
            <Reveal as="li" key={chapter.id} className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span aria-hidden="true" className="font-display text-sm text-champagne">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h2 id={chapter.id} className="mt-3 font-display text-step-3 leading-tight">
                  {chapter.title}
                </h2>
              </div>
              <div className="max-w-2xl space-y-5 text-paper-muted lg:col-span-7 lg:col-start-6">
                {chapter.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="about-cta" className="py-[var(--section)]">
        <Reveal className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
          <p className="eyebrow eyebrow--plain">Say hello</p>
          <h2 id="about-cta" className="display mt-6 text-step-5">
            Renting a luxury car should feel as good as the car itself.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <WhatsAppButtons />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {marketList.map((m) => (
              <Link key={m.id} href={m.href} className="link-line">
                Rent in {m.city}
                <ArrowIcon />
              </Link>
            ))}
            <Link href="/list-your-car" className="link-line">
              List your car
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
