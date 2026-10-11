import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";
import { type ArticleSummary, articleHref, formatArticleDate } from "@/lib/journal-shared";

type ArticleListProps = {
  articles: ArticleSummary[];
  headingLevel?: "h2" | "h3";
};

export default function ArticleList({ articles, headingLevel: Heading = "h3" }: ArticleListProps) {
  return (
    <ul className="border-t border-line">
      {articles.map((a) => (
        <li key={a.slug} className="border-b border-line">
          <Link
            href={articleHref(a.slug)}
            className="group grid gap-3 py-8 transition-colors md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <span className="text-[0.72rem] uppercase tracking-[0.18em] text-paper-subtle md:col-span-3">
              <time dateTime={a.date}>{formatArticleDate(a.date)}</time>
              <span className="text-champagne"> · {a.topic}</span>
            </span>
            <span className="md:col-span-8">
              <Heading className="block font-display text-step-2 font-normal leading-snug transition-colors group-hover:text-champagne-bright">
                {a.title}
              </Heading>
              <span className="mt-2 line-clamp-2 max-w-2xl text-sm text-paper-muted">{a.description}</span>
              <span className="mt-3 block text-[0.68rem] uppercase tracking-[0.2em] text-paper-subtle">
                {a.readingMinutes} min read
              </span>
            </span>
            <ArrowIcon className="hidden h-6 w-6 justify-self-end text-paper-subtle transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-champagne md:col-span-1 md:block" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
