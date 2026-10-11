import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section
      aria-labelledby="nf-title"
      className="studio-glow relative isolate flex min-h-[90svh] items-center overflow-hidden"
    >
      <p
        aria-hidden="true"
        className="wordmark text-chrome pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none text-center text-wordmark opacity-20"
      >
        404
      </p>
      <div className="grain -z-10" />
      <div className="mx-auto w-full max-w-3xl px-[var(--gutter)] pt-[var(--header-h)] text-center">
        <p className="eyebrow eyebrow--plain">Not found</p>
        <h1 id="nf-title" className="display mt-6 text-step-5">
          This bay is empty.
        </h1>
        <p className="lede mx-auto mt-6 max-w-lg">
          The page you&apos;re looking for has moved or never existed. The rest of the garage is
          open.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link href="/fleet" className="btn btn-gold">
            View the fleet
          </Link>
          <Link href="/" className="link-line">
            Home
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
