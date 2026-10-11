"use client";

import { useMemo, useState } from "react";
import ArticleList from "@/components/ui/ArticleList";
import FilterChip from "@/components/ui/FilterChip";
import type { ArticleSummary } from "@/lib/journal-shared";

const PAGE_SIZE = 20;

export default function JournalIndex({ articles, topics }: { articles: ArticleSummary[]; topics: string[] }) {
  const [topic, setTopic] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const matching = useMemo(
    () => (topic ? articles.filter((a) => a.topic === topic) : articles),
    [articles, topic],
  );
  const visible = matching.slice(0, limit);

  const choose = (next: string | null) => {
    setTopic(next);
    setLimit(PAGE_SIZE);
  };

  return (
    <>
      <div className="sticky top-[var(--header-h)] z-30 -mx-[var(--gutter)] border-y border-line bg-ink-1/90 px-[var(--gutter)] py-4 backdrop-blur-xl">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          <FilterChip pressed={topic === null} onClick={() => choose(null)}>
            All topics
          </FilterChip>
          {topics.map((t) => (
            <FilterChip key={t} pressed={topic === t} onClick={() => choose(t)}>
              {t}
            </FilterChip>
          ))}
        </div>
      </div>

      <p role="status" className="mt-8 text-[0.7rem] uppercase tracking-[0.2em] text-paper-subtle">
        Showing {visible.length} of {matching.length} articles
      </p>

      <div className="mt-8">
        <ArticleList articles={visible} headingLevel="h2" />
      </div>

      {matching.length > visible.length ? (
        <div className="mt-12 flex justify-center">
          <button type="button" className="btn btn-ghost" onClick={() => setLimit((n) => n + PAGE_SIZE)}>
            Show more articles
          </button>
        </div>
      ) : null}
    </>
  );
}
