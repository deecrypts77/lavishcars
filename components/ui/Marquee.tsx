"use client";

import { useState } from "react";

type MarqueeProps = {
  /** Accessible name for the list of items. */
  label: string;
  items: React.ReactNode[];
  /** Decorative duplicates of `items` (same order, empty alt text) that make the loop seamless. */
  clones: React.ReactNode[];
  className?: string;
};

/**
 * Infinite horizontal ticker. Pauses on hover/focus and via an explicit control
 * (WCAG 2.2.2); under reduced motion it renders as a static, wrapped row.
 */
export default function Marquee({ label, items, clones, className = "" }: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={`marquee ${className}`} data-paused={paused || undefined}>
      <div className="marquee-viewport">
        <div className="marquee-track">
          <ul aria-label={label} className="marquee-group">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <ul aria-hidden="true" className="marquee-group marquee-clone">
            {clones.map((clone, i) => (
              <li key={i}>{clone}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="marquee-toggle"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> logo carousel</span>
      </button>
    </div>
  );
}
