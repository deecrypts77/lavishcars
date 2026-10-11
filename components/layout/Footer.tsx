import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import { ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { footerNav } from "@/content/navigation";
import { EMAIL, HOURS, SITE, marketList, paymentMethods } from "@/content/site";
import { enquiryMessage, smsHref, telHref, whatsappHref } from "@/lib/contact";

const contactLink = "inline-flex min-h-9 items-center gap-3 text-paper-muted transition-colors hover:text-paper";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-0">
      <div className="mx-auto max-w-[110rem] px-[var(--gutter)] pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-12 w-auto" />
            <p className="mt-6 max-w-sm text-paper-muted">
              {SITE.domain} — {SITE.tagline.toLowerCase()}. Exotic, luxury and chauffeur-driven cars,
              delivered in the UAE and the USA.
            </p>
            <ul className="mt-6 space-y-1 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className={contactLink}>
                  <MailIcon className="h-4 w-4 text-champagne" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex min-h-9 items-center gap-3 text-paper-muted">
                <ClockIcon className="h-4 w-4 text-champagne" />
                {HOURS.label}
              </li>
            </ul>
            <SocialLinks className="mt-8" />
          </div>

          {marketList.map((m) => (
            <div key={m.id} className="lg:col-span-2">
              <h2 className="eyebrow eyebrow--plain">{m.city}</h2>
              <address className="mt-5 not-italic text-sm leading-relaxed text-paper-muted">
                <a href={m.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                  {m.address}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </address>
              <ul className="mt-4 space-y-1 text-sm">
                <li>
                  <a
                    href={whatsappHref(m.id, enquiryMessage(m.id))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactLink}
                  >
                    <WhatsAppIcon className="h-4 w-4 text-champagne" />
                    WhatsApp
                    <span className="sr-only">{m.city} (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={telHref(m.id)} className={contactLink}>
                    <PhoneIcon className="h-4 w-4 text-champagne" />
                    {m.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={smsHref(m.id)} className={`${contactLink} pl-7`}>
                    Send an SMS<span className="sr-only"> to {m.city}</span>
                  </a>
                </li>
              </ul>
            </div>
          ))}

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="eyebrow eyebrow--plain">{group.title}</h2>
                <ul className="mt-5 space-y-2 text-sm">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-paper-muted hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="wordmark text-chrome pointer-events-none mt-20 select-none text-center text-wordmark opacity-25"
        >
          LAVISHCARS
        </p>

        <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <ul aria-label="Accepted payment methods" className="flex shrink-0 flex-wrap gap-2">
            {paymentMethods.map((p) => (
              <li key={p.id}>
                <Image
                  src={`/images/payments/${p.id}.png`}
                  alt={p.label}
                  width={105}
                  height={40}
                  className="h-7 w-auto rounded-[3px]"
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 text-xs text-paper-subtle lg:items-end lg:text-right">
            <p>© 2026 {SITE.domain}. All rights reserved. Made with care in Dubai.</p>
            <p>Vehicle imagery is illustrative. Marques shown are the property of their owners.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
