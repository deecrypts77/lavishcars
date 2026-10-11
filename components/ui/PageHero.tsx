import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  backdropWord?: string;
  image?: { src: string; alt: string; focus?: string };
  children?: React.ReactNode;
  size?: "tall" | "compact";
};

export default function PageHero({
  eyebrow,
  title,
  lede,
  backdropWord,
  image,
  children,
  size = "tall",
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-title"
      className={`studio-glow relative isolate flex overflow-hidden ${
        size === "tall" ? "min-h-[min(88svh,56rem)]" : "min-h-[min(62svh,40rem)]"
      } items-end`}
    >
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="100vw"
            className="anim-drift object-cover opacity-60"
            style={{ objectPosition: image.focus ?? "50% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-0/90 via-ink-0/50 to-ink-0/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-1 via-ink-1/30 to-ink-0/60" />
        </div>
      ) : null}

      {backdropWord ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-[calc(var(--header-h)+2vw)] -z-10 select-none ${
            image && size === "tall" ? "opacity-60" : "opacity-[0.14]"
          }`}
        >
          <p className="wordmark text-chrome anim-wordmark text-center text-wordmark">
            {backdropWord}
          </p>
        </div>
      ) : null}

      <div className="grain -z-10" />

      <div className="mx-auto w-full max-w-[110rem] px-[var(--gutter)] pb-16 pt-[calc(var(--header-h)+5rem)] sm:pb-20">
        <p className="eyebrow anim-rise">{eyebrow}</p>
        <h1
          id="page-title"
          className="display anim-rise delay-1 mt-6 max-w-5xl text-step-5"
        >
          {title}
        </h1>
        {lede ? <div className="lede anim-rise delay-2 mt-6 max-w-2xl">{lede}</div> : null}
        {children ? (
          <div className="anim-rise delay-3 mt-10 flex flex-wrap items-center gap-3">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
