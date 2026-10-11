import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { getArticles, toSummary } from "@/lib/journal";
import JournalIndex from "./_components/JournalIndex";

export const metadata: Metadata = {
  title: "Journal — Driving, Deposits & Rental Guides for Dubai and Houston",
  description:
    "Practical guides from LavishCars: Salik tolls and speed cameras, security deposits, licences and documents, marque histories and head-to-head car comparisons.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const articles = getArticles().map(toSummary);
  const topicCounts = Map.groupBy(articles, (a) => a.topic);
  const topics = [...topicCounts.keys()].sort((a, b) => topicCounts.get(b)!.length - topicCounts.get(a)!.length);

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={
          <>
            Insight for the road
            <span className="text-paper-muted"> ahead.</span>
          </>
        }
        lede="Guides on driving, tolls, deposits and choosing the right car — written by the team that hands over the keys."
        backdropWord="JOURNAL"
        size="compact"
      />

      <section aria-label="Articles" className="pb-[var(--section)]">
        <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
          <JournalIndex articles={articles} topics={topics} />
        </div>
      </section>
    </>
  );
}
