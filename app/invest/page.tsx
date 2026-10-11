import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { INVEST, investAudience, investReasons, investSteps } from "@/content/invest";
import { EMAIL } from "@/content/site";
import { mailtoHref, whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Invest With Us — Fully Managed Car Rental Investment in Dubai",
  description:
    "A fully managed, asset-backed car rental investment in Dubai from AED 300,000. LavishCars operates the fleet; you receive structured returns over a 3-year term.",
  alternates: { canonical: "/invest" },
};

const enquiry = "Hello LavishCars, I'd like to discuss the Dubai fleet investment programme.";

const terms = [
  { value: INVEST.minimum, label: "Minimum investment" },
  { value: INVEST.term, label: "Investment term" },
  { value: INVEST.returnRange, label: "Total return range*" },
];

export default function InvestPage() {
  return (
    <>
      <PageHero
        eyebrow={`Invest with us · ${INVEST.market}`}
        title={
          <>
            You invest.
            <span className="text-paper-muted"> We run the fleet.</span>
          </>
        }
        lede="A fully managed investment in an actively operating fleet of luxury cars and limousines in Dubai — no vehicles, drivers or bookings to manage."
        backdropWord="INVEST"
        image={{
          src: "/images/fleet/rolls-royce-ghost-white-alley.jpg",
          alt: "White Rolls-Royce Ghost parked in a narrow city lane",
          focus: "50% 55%",
        }}
      >
        <a href={whatsappHref("dubai", enquiry)} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          <WhatsAppIcon />
          Speak to the investment team
          <span className="sr-only">(opens WhatsApp in a new tab)</span>
        </a>
      </PageHero>

      <section aria-label="Key terms" className="border-y border-line bg-ink-0">
        <dl className="mx-auto grid max-w-[110rem] divide-y divide-line px-[var(--gutter)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {terms.map((t) => (
            <div key={t.label} className="flex flex-col-reverse gap-3 py-10 md:px-10 md:first:pl-0">
              <dt className="text-[0.72rem] uppercase tracking-[0.2em] text-paper-subtle">{t.label}</dt>
              <dd className="font-display text-step-4 font-light leading-none">{t.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="invest-how" className="py-[var(--section)]">
        <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
          <SectionHeader id="invest-how" eyebrow="How it works" title="A silent-partner model." />
          <ol className="mt-16 grid gap-12 md:grid-cols-3">
            {investSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 110} className="border-t border-line pt-6">
                <span aria-hidden="true" className="display text-chrome block text-step-5 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-step-2">{s.title}</h3>
                <p className="mt-3 max-w-sm text-paper-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="invest-why" className="border-y border-line bg-ink-0 py-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-14 px-[var(--gutter)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader id="invest-why" eyebrow="Why Dubai" title="A market that drives itself." />
            <ul className="mt-12 grid gap-8 sm:grid-cols-2">
              {investReasons.map((r) => (
                <li key={r.title} className="border-t border-line pt-5">
                  <h3 className="font-display text-step-1">{r.title}</h3>
                  <p className="mt-2 text-sm text-paper-muted">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <div className="border border-line bg-ink-2 p-8">
              <h3 className="eyebrow eyebrow--plain">Designed for</h3>
              <ul className="mt-6 space-y-4 text-paper-muted">
                {investAudience.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-champagne" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="invest-cta" className="py-[var(--section)]">
        <Reveal className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
          <h2 id="invest-cta" className="display text-step-5">
            Request your investment proposal.
          </h2>
          <p className="lede mx-auto mt-6 max-w-xl">
            An initial consultation sets your allocation and payout schedule before any agreement is signed.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={whatsappHref("dubai", enquiry)} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <WhatsAppIcon />
              WhatsApp Dubai
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={mailtoHref(EMAIL, "Dubai fleet investment enquiry")} className="btn btn-ghost">
              <MailIcon />
              {EMAIL}
            </a>
          </div>
          <p className="mx-auto mt-14 max-w-2xl text-xs leading-relaxed text-paper-subtle">
            *Indicative total return over the full term, as set out in LavishCars’ current investor
            materials. Actual returns, payout schedule and protections are defined solely by your signed
            investment agreement. This page is for information only and is not an offer of securities or
            financial advice; seek independent advice before investing.
          </p>
        </Reveal>
      </section>
    </>
  );
}
