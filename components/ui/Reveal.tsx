"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "article" | "header";
  className?: string;
  delay?: number;
};

/**
 * Fades content up as it enters the viewport. Elements already on screen at
 * mount are never hidden, so first paint and no-JS rendering stay intact.
 */
export default function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "in";
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (el.dataset.reveal === "pending") el.dataset.reveal = "in";
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
