import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { footerNav } from "@/content/navigation";
import { EMAIL } from "@/content/site";

const legalLinks = footerNav.find((g) => g.title === "Legal")?.links ?? [];

type LegalPageProps = {
  title: string;
  liveUrl: string;
  liveLabel: string;
  sections: { heading: string; body: string }[];
};

export default function LegalPage({ title, liveUrl, liveLabel, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} size="compact" />

      <section aria-label={title} className="pb-[var(--section)]">
        <div className="mx-auto grid max-w-[110rem] gap-14 px-[var(--gutter)] lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="border border-line bg-ink-2 p-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow eyebrow--plain">Status</p>
              <p className="mt-3 text-sm text-paper-muted">
                This page is being migrated. The binding version is the current live policy:
              </p>
              <a href={liveUrl} className="prose-link mt-3 inline-block text-sm break-all">
                {liveLabel}
              </a>
              <nav aria-label="Legal" className="mt-6 border-t border-line pt-6 text-sm">
                <ul className="space-y-2">
                  {legalLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-paper-muted hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="max-w-3xl lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.heading} className="border-t border-line py-10 first:border-t-0 first:pt-0">
                <h2 className="flex items-baseline gap-4 font-display text-step-2">
                  <span className="font-sans text-xs tracking-[0.2em] text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                <p className="mt-4 text-paper-muted">{s.body}</p>
              </section>
            ))}
            <p className="border-t border-line pt-10 text-sm text-paper-subtle">
              Questions about this policy? Email{" "}
              <a href={`mailto:${EMAIL}`} className="prose-link">
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
