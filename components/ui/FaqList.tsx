import Link from "next/link";
import { PlusIcon } from "@/components/ui/icons";
import type { Faq } from "@/content/faqs";

type FaqListProps = {
  items: Faq[];
  /** Opens the first answer by default. */
  openFirst?: boolean;
  className?: string;
};

export default function FaqList({ items, openFirst = false, className = "" }: FaqListProps) {
  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((item, i) => (
        <details key={item.question} className="faq-item group border-b border-line" open={openFirst && i === 0}>
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-display text-step-2 leading-snug transition-colors hover:text-champagne-bright">
            {item.question}
            <PlusIcon className="faq-icon h-6 w-6 shrink-0 text-champagne" />
          </summary>
          <div className="max-w-2xl space-y-3 pb-8 text-paper-muted">
            {item.answer.split(/\n{2,}/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {item.link ? (
              <Link href={item.link.href} className="prose-link inline-block">
                {item.link.label}
              </Link>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
