import Image from "next/image";
import Link from "next/link";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import { ArrowIcon } from "@/components/ui/icons";

const HERO_CAR = {
  src: "/images/fleet/hero-porsche-911-gt3-black.png",
  width: 2109,
  height: 602,
};

/**
 * Aurus-grade home hero: one giant wordmark, the car parked across it on a dark
 * studio floor, and only the essentials beneath.
 */
export default function HeroShowroom() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink-0 [--car-w:min(96vw,58rem,100svh)] [--hero-wm:clamp(4rem,14.6vw,18rem)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_34%_62%_at_50%_-4%,rgba(226,232,240,0.16),transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_75%_at_50%_42%,transparent_45%,rgba(0,0,0,0.9)_100%)]"
      />
      <div aria-hidden="true" className="grain -z-10" />
      <div aria-hidden="true" className="h-[var(--header-h)] shrink-0" />

      <div className="relative flex flex-col items-center pt-4">
        <p
          aria-hidden="true"
          className="wordmark text-chrome-soft anim-wordmark relative z-0 select-none text-center text-[length:var(--hero-wm)]"
        >
          LavishCars
        </p>

        <div
          className="relative z-10 w-[var(--car-w)]"
          style={{ marginTop: "calc(var(--hero-wm) * -0.5)" }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-x-[38%] top-[27%] -z-10 h-[90%] bg-[radial-gradient(closest-side,rgba(226,232,240,0.1),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-[4%] bottom-[20%] -z-10 h-[16%] rounded-[100%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.95),transparent)] blur-[6px]"
          />
          <Image
            src={HERO_CAR.src}
            width={HERO_CAR.width}
            height={HERO_CAR.height}
            alt="A black Porsche 911 GT3 in side profile"
            preload
            quality={90}
            sizes="(min-width: 640px) 58rem, 96vw"
            className="anim-car-in relative h-auto w-full"
          />
          <div
            aria-hidden="true"
            className="anim-car-in pointer-events-none relative -mt-[2px] aspect-[2109/228] overflow-hidden opacity-[0.16] blur-[1px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
          >
            <Image
              src={HERO_CAR.src}
              width={HERO_CAR.width}
              height={HERO_CAR.height}
              alt=""
              quality={90}
              sizes="(min-width: 640px) 58rem, 96vw"
              className="absolute inset-x-0 top-0 h-auto w-full -scale-y-100"
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-3xl px-[var(--gutter)] pb-12 pt-10 text-center lg:pb-16">
        <h1
          id="hero-title"
          className="anim-rise delay-3 font-display text-step-1 font-normal leading-snug text-paper"
        >
          Exotic &amp; chauffeur car rental{" "}
          <span className="text-paper-muted">in Dubai and Houston.</span>
        </h1>
        <div className="anim-rise delay-4 mt-8 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButtons />
          <Link href="/fleet" className="link-line mx-4">
            View the fleet
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
