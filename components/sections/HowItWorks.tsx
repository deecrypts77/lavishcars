import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";

const steps = [
  {
    title: "Message us",
    body: "Send your destination, preferred car and dates on WhatsApp — Dubai or Houston.",
  },
  {
    title: "Confirm",
    body: "We reply straight away with availability and a transparent price. What you book is what you pay.",
  },
  {
    title: "Drive",
    body: "Your car arrives at your hotel, home, office or the arrivals hall. Collection is part of the service.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="py-[var(--section)]">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title={
            <>
              Three steps.
              <span className="text-paper-muted"> No counters.</span>
            </>
          }
        />

        <ol className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="border-t border-line pt-6">
              <span aria-hidden="true" className="display text-chrome block text-step-5 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-step-2">{s.title}</h3>
              <p className="mt-3 max-w-sm text-paper-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-wrap gap-3">
          <WhatsAppButtons />
        </Reveal>
      </div>
    </section>
  );
}
