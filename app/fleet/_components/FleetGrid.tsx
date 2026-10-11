"use client";

import { useMemo, useState } from "react";
import FilterChip from "@/components/ui/FilterChip";
import VehicleCard from "@/components/ui/VehicleCard";
import type { Vehicle, VehicleCategory } from "@/content/fleet";
import type { MarketId } from "@/content/site";

type MarketFilter = "all" | MarketId;
type CategoryFilter = "all" | VehicleCategory;

const marketOptions: { id: MarketFilter; label: string }[] = [
  { id: "all", label: "Both cities" },
  { id: "dubai", label: "Dubai" },
  { id: "houston", label: "Houston" },
];

export default function FleetGrid({
  vehicles,
  categories,
}: {
  vehicles: Vehicle[];
  categories: VehicleCategory[];
}) {
  const [market, setMarket] = useState<MarketFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const visible = useMemo(
    () =>
      vehicles.filter(
        (v) =>
          (market === "all" || v.markets.includes(market)) &&
          (category === "all" || v.category === category || (category === "Chauffeur" && v.chauffeur)),
      ),
    [vehicles, market, category],
  );

  return (
    <>
      <div className="sticky top-[var(--header-h)] z-30 -mx-[var(--gutter)] border-y border-line bg-ink-1/90 px-[var(--gutter)] py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div role="group" aria-label="Filter by city" className="flex flex-wrap gap-2">
            {marketOptions.map((o) => (
              <FilterChip key={o.id} pressed={market === o.id} onClick={() => setMarket(o.id)}>
                {o.label}
              </FilterChip>
            ))}
          </div>
          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
            <FilterChip pressed={category === "all"} onClick={() => setCategory("all")}>
              All types
            </FilterChip>
            {categories.map((c) => (
              <FilterChip key={c} pressed={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <p role="status" className="mt-8 text-[0.7rem] uppercase tracking-[0.2em] text-paper-subtle">
        Showing {visible.length} of {vehicles.length} vehicles
      </p>

      {visible.length ? (
        <ul className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((v, i) => (
            <li key={v.slug}>
              <VehicleCard vehicle={v} index={i} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 border border-line p-10 text-center">
          <p className="font-display text-step-2">Nothing in this combination — yet.</p>
          <p className="mt-3 text-paper-muted">
            Ask the team on WhatsApp; the garage changes more often than this page.
          </p>
        </div>
      )}
    </>
  );
}
