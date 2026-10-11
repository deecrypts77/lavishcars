import Reveal from "@/components/ui/Reveal";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  action?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
};

export default function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  action,
  align = "start",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={`flex flex-col gap-8 ${
        centered ? "items-center text-center" : "justify-between md:flex-row md:items-end"
      } ${className}`}
    >
      <div className="max-w-3xl">
        <p className={`eyebrow ${centered ? "eyebrow--plain" : ""}`}>{eyebrow}</p>
        <h2 id={id} className="display mt-6 text-step-5">
          {title}
        </h2>
        {lede ? <p className={`lede mt-6 max-w-xl ${centered ? "mx-auto" : ""}`}>{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
