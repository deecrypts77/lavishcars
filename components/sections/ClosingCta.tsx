import Reveal from "@/components/ui/Reveal";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import { InstagramIcon } from "@/components/ui/icons";
import { EMAIL, INSTAGRAM_HANDLE, socials } from "@/content/site";

const instagram = socials.find((s) => s.id === "instagram");

export default function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden border-t border-line py-[var(--section)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(226,232,240,0.07),transparent_70%)]" />
      <div className="grain -z-10" />
      <Reveal className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
        <p className="eyebrow eyebrow--plain">Reservations</p>
        <h2 id="cta-title" className="display mt-6 text-step-5">
          Your car is one message away.
        </h2>
        <p className="lede mx-auto mt-6 max-w-xl">
          Choose your city and say hello. Prefer email? Write to{" "}
          <a href={`mailto:${EMAIL}`} className="prose-link">
            {EMAIL}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <WhatsAppButtons />
        </div>
        {instagram ? (
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex min-h-11 items-center gap-3 text-sm text-paper-muted transition-colors hover:text-paper"
          >
            <InstagramIcon className="h-5 w-5 text-champagne" />
            Behind the wheel — follow <span className="text-paper">{INSTAGRAM_HANDLE}</span>
            <span className="sr-only">on Instagram (opens in a new tab)</span>
          </a>
        ) : null}
      </Reveal>
    </section>
  );
}
