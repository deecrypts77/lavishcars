import { socials } from "@/content/site";
import { socialIcons } from "@/components/ui/icons";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socials.map((s) => {
        const Icon = socialIcons[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center border border-line text-paper-muted transition-colors hover:border-champagne/60 hover:text-paper"
            >
              <Icon className="h-[1.1rem] w-[1.1rem]" />
              <span className="sr-only">LavishCars on {s.label} (opens in a new tab)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
