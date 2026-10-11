import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleList from "@/components/ui/ArticleList";
import FaqList from "@/components/ui/FaqList";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButtons from "@/components/ui/WhatsAppButtons";
import { ArrowIcon } from "@/components/ui/icons";
import { articleHref, formatArticleDate, getArticle, getArticles, getOutline, toSummary } from "@/lib/journal";
import { articleSchema, faqSchema } from "@/lib/json-ld";
import ArticleBody from "../_components/ArticleBody";

const MIN_OUTLINE = 3;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.seoTitle ?? article.title,
    description: article.description,
    alternates: { canonical: articleHref(article.slug) },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: [article.author],
      section: article.topic,
      tags: article.tags,
      ...(article.image ? { images: [{ url: article.image.src, alt: article.image.alt }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const outline = getOutline(article.body);
  const others = getArticles().filter((a) => a.slug !== article.slug);
  const related = [...others.filter((a) => a.topic === article.topic), ...others.filter((a) => a.topic !== article.topic)]
    .slice(0, 3)
    .map(toSummary);

  return (
    <>
      <article>
        <header className="studio-glow relative isolate overflow-hidden">
          <div className="grain -z-10" />
          <div className="mx-auto max-w-[110rem] px-[var(--gutter)] pb-12 pt-[calc(var(--header-h)+4rem)] sm:pb-16">
            <nav aria-label="Breadcrumb" className="anim-fade">
              <ol className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-paper-muted">
                <li>
                  <Link href="/journal" className="hover:text-paper">
                    Journal
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-champagne">
                  {article.topic}
                </li>
              </ol>
            </nav>
            <h1 className="display anim-rise delay-1 mt-8 max-w-5xl text-step-4">{article.title}</h1>
            <p className="lede anim-rise delay-2 mt-6 max-w-3xl">{article.description}</p>
            <p className="anim-rise delay-3 mt-8 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] uppercase tracking-[0.18em] text-paper-subtle">
              <span>
                By <span className="text-paper">{article.author}</span>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingMinutes} min read</span>
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-[110rem] gap-12 px-[var(--gutter)] pb-[var(--section)] pt-4 lg:grid-cols-12">
          {outline.length >= MIN_OUTLINE ? (
            <nav aria-labelledby="outline-title" className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-[calc(var(--header-h)+2rem)] border-t border-line pt-6">
                <h2 id="outline-title" className="eyebrow eyebrow--plain">
                  In this article
                </h2>
                <ol className="mt-5 space-y-3 text-sm">
                  {outline.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="block text-paper-muted transition-colors hover:text-paper">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          ) : null}

          <div className="min-w-0 lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-5">
            {article.image ? (
              <figure className="media-frame mb-12">
                <Image
                  src={article.image.src}
                  alt={article.image.alt}
                  width={article.image.width}
                  height={article.image.height}
                  sizes="(min-width: 1024px) 46rem, 100vw"
                  preload
                  className="h-auto w-full"
                />
              </figure>
            ) : null}

            <ArticleBody markdown={article.body} />

            {article.faqs.length ? (
              <section aria-labelledby="article-faq" className="mt-20">
                <h2 id="article-faq" className="display text-step-3">
                  Frequently asked questions
                </h2>
                <FaqList items={article.faqs} className="mt-8" />
              </section>
            ) : null}

            <aside aria-labelledby="article-cta" className="mt-20 border border-line bg-ink-2 p-8 sm:p-10">
              <p className="eyebrow eyebrow--plain">Plan your drive</p>
              <h2 id="article-cta" className="mt-3 font-display text-step-2 leading-tight">
                Questions about your rental? Ask the team directly.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-paper-muted">
                Deposits, delivery, Salik and documents are confirmed on WhatsApp before you book.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButtons />
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="border-t border-line bg-ink-0 py-[var(--section)]">
        <div className="mx-auto max-w-[110rem] px-[var(--gutter)]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Keep reading</p>
              <h2 id="related-title" className="display mt-6 text-step-4">
                More from the journal
              </h2>
            </div>
            <Link href="/journal" className="link-line">
              All articles
              <ArrowIcon />
            </Link>
          </div>
          <Reveal className="mt-14">
            <ArticleList articles={related} />
          </Reveal>
        </div>
      </section>

      <JsonLd data={articleSchema(article)} />
      {article.faqs.length ? <JsonLd data={faqSchema(article.faqs)} /> : null}
    </>
  );
}
