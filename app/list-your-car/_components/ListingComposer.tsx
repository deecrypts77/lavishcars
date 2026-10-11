"use client";

import { useId, useMemo, useState } from "react";
import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { EMAIL, type MarketId, marketList, markets } from "@/content/site";
import { mailtoHref, whatsappHref } from "@/lib/contact";

const field =
  "mt-2 block w-full border border-line bg-ink-1 px-4 py-3 text-paper placeholder:text-paper-subtle focus:border-champagne focus:outline-none";
const label = "text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper-muted";

export default function ListingComposer() {
  const uid = useId();
  const [market, setMarket] = useState<MarketId>("dubai");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [specs, setSpecs] = useState("");
  const [name, setName] = useState("");

  const message = useMemo(() => {
    const lines = [`Hello LavishCars ${markets[market].city}, I'd like to list my car.`];
    lines.push(`Vehicle: ${[year, brand, model].filter(Boolean).join(" ") || "—"}`);
    if (specs.trim()) {
      lines.push("Features / specs:");
      for (const line of specs.split("\n").map((l) => l.trim()).filter(Boolean)) lines.push(`• ${line}`);
    }
    if (name) lines.push(`— ${name}`);
    return lines.join("\n");
  }, [market, brand, model, year, specs, name]);

  return (
    <form
      className="grid gap-6 border border-line bg-ink-2 p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappHref(market, message), "_blank", "noopener,noreferrer");
      }}
    >
      <fieldset>
        <legend className={label}>City</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {marketList.map((m) => (
            <label
              key={m.id}
              className="flex min-h-12 cursor-pointer items-center justify-center border border-line px-4 font-display text-lg transition-colors has-[:checked]:border-champagne has-[:checked]:bg-champagne has-[:checked]:text-ink-1 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-champagne-bright"
            >
              <input
                type="radio"
                name={`${uid}-market`}
                value={m.id}
                checked={market === m.id}
                onChange={() => setMarket(m.id)}
                className="sr-only"
              />
              {m.city}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor={`${uid}-brand`} className={label}>
            Brand <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-brand`}
            type="text"
            required
            placeholder="e.g. Lamborghini"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-model`} className={label}>
            Model
          </label>
          <input
            id={`${uid}-model`}
            type="text"
            placeholder="e.g. Urus"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-year`} className={label}>
            Year
          </label>
          <input
            id={`${uid}-year`}
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="2024"
            value={year}
            onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-specs`} className={label}>
          Features / specs <span className="normal-case tracking-normal text-paper-subtle">(one per line)</span>
        </label>
        <textarea
          id={`${uid}-specs`}
          rows={4}
          placeholder={"Colour and interior\nMileage\nOptions or modifications"}
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          className={`${field} resize-y`}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-name`} className={label}>
          Your name <span className="normal-case tracking-normal text-paper-subtle">(optional)</span>
        </label>
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="submit" className="btn btn-gold justify-between">
          <span>Send on WhatsApp</span>
          <WhatsAppIcon />
        </button>
        <a
          href={mailtoHref(EMAIL, "List my car with LavishCars", message)}
          className="btn btn-ghost justify-between"
        >
          <span>Send by email</span>
          <MailIcon />
        </a>
      </div>
      <p className="-mt-2 text-xs text-paper-subtle">
        Opens WhatsApp or your email app with the details ready to send. Nothing is stored on this site.
      </p>
    </form>
  );
}
