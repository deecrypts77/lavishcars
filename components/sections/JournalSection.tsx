import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleList from "@/components/ui/ArticleList";
import { ArrowIcon } from "@/components/ui/icons";
import { getArticles, toSummary } from "@/lib/journal";

const LATEST = 3;

export default function JournalSection() {
  const latest = getArticles().slice(0, LATEST).map(toSummary);

  return (
    <section aria-labelledby="journal-title" className="py-[var(--section)]">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
        <SectionHeader
          id="journal-title"
          eyebrow="Journal"
          title={
            <>
              Know the road
              <span className="text-paper-muted"> before you drive it.</span>
            </>
          }
          action={
            <Link href="/journal" className="link-line">
              All articles
              <ArrowIcon />
            </Link>
          }
        />
        <Reveal className="mt-14">
          <ArticleList articles={latest} />
        </Reveal>
      </div>
    </section>
  );
}
