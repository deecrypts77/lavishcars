import { readFileSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import Image from "next/image";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { headingId } from "@/lib/journal-shared";

type HastNode = { type: string; value?: string; children?: HastNode[] };

const textOf = (node?: HastNode): string =>
  node ? (node.value ?? "") + (node.children ?? []).map(textOf).join("") : "";

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  if (!src.startsWith("/")) return null;
  const { width, height } = imageSize(readFileSync(path.join(process.cwd(), "public", src)));
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1024px) 46rem, 100vw"
      className="h-auto w-full"
    />
  );
}

const components: Components = {
  h2: ({ node, children }) => <h2 id={headingId(textOf(node as HastNode))}>{children}</h2>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    ),
  img: ({ src, alt }) => (typeof src === "string" ? <ArticleImage src={src} alt={alt ?? ""} /> : null),
  table: ({ children }) => (
    // Wide comparison tables scroll horizontally; the region is focusable for keyboard users.
    <div className="article-table" role="region" aria-label="Comparison table" tabIndex={0}>
      <table>{children}</table>
    </div>
  ),
};

export default function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="article-body">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </Markdown>
    </div>
  );
}
