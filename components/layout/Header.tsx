"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { primaryNav as nav } from "@/content/navigation";
import { HOURS, marketList } from "@/content/site";
import { whatsappHref, enquiryMessage } from "@/lib/contact";
import { CloseIcon, WhatsAppIcon } from "@/components/ui/icons";
import Logo from "@/components/layout/Logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function WhatsAppMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="btn btn-gold btn-sm"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <WhatsAppIcon />
        Book
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute right-0 top-[calc(100%+0.75rem)] w-72 border border-line bg-ink-1/95 p-2 shadow-2xl backdrop-blur-xl"
      >
        <p className="px-3 pb-2 pt-2 text-[0.7rem] uppercase tracking-[0.2em] text-paper-subtle">
          WhatsApp concierge
        </p>
        <ul>
          {marketList.map((m) => (
            <li key={m.id}>
              <a
                href={whatsappHref(m.id, enquiryMessage(m.id))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 px-3 py-3 transition-colors hover:bg-ink-3"
                onClick={() => setOpen(false)}
              >
                <span>
                  <span className="block font-display text-lg leading-tight">{m.city}</span>
                  <span className="block text-xs text-paper-muted">{m.phoneDisplay}</span>
                </span>
                <WhatsAppIcon className="h-4 w-4 text-champagne" />
                <span className="sr-only">(opens WhatsApp in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-3 pb-1 pt-3 text-xs text-paper-subtle">{HOURS.label}</p>
      </div>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-paper lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        Menu
        <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
          <span className="h-px w-full bg-paper" />
          <span className="h-px w-2/3 self-end bg-champagne" />
        </span>
      </button>

      {open ? (
        <div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="studio-glow fixed inset-0 z-[60] flex flex-col overflow-y-auto px-[var(--gutter)] pb-10 lg:hidden"
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} aria-label="LavishCars home">
              <Logo />
            </Link>
            <button
              type="button"
              data-autofocus
              className="inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em]"
              onClick={close}
            >
              Close <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.href} className="anim-rise" style={{ animationDelay: `${60 * i}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-[2.4rem] leading-tight text-paper aria-[current=page]:text-champagne"
                  >
                    <span className="font-sans text-[0.72rem] tracking-[0.2em] text-paper-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-auto pt-10 text-sm text-paper-subtle">{HOURS.label}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {marketList.map((m) => (
              <a
                key={m.id}
                href={whatsappHref(m.id, enquiryMessage(m.id))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost justify-between"
              >
                <span>WhatsApp {m.city}</span>
                <WhatsAppIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function Header() {
  const pathname = usePathname() ?? "/";
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      el.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className="group/header fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:bg-ink-1/80 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[110rem] items-center justify-between gap-6 px-[var(--gutter)]">
        <Link href="/" aria-label="LavishCars home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/75 transition-colors hover:text-paper aria-[current=page]:text-champagne"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <WhatsAppMenu />
          </div>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
