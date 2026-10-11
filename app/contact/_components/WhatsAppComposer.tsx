"use client";

import { useId, useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { type MarketId, marketList, markets } from "@/content/site";
import { whatsappHref } from "@/lib/contact";

type VehicleOption = { slug: string; name: string; markets: MarketId[] };

const services = ["Self-drive", "Chauffeur", "Airport delivery", "Monthly rental"];

const field =
  "mt-2 block w-full border border-line bg-ink-1 px-4 py-3 text-paper placeholder:text-paper-subtle focus:border-champagne focus:outline-none";
const label = "text-[0.72rem] font-medium uppercase tracking-[0.22em] text-paper-muted";

export default function WhatsAppComposer({ vehicles }: { vehicles: VehicleOption[] }) {
  const uid = useId();
  const [market, setMarket] = useState<MarketId>("dubai");
  const [service, setService] = useState(services[0]);
  const [vehicle, setVehicle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const options = vehicles.filter((v) => v.markets.includes(market));
  const selectedVehicle = options.some((v) => v.name === vehicle) ? vehicle : "";

  const message = useMemo(() => {
    const lines = [`Hello LavishCars ${markets[market].city},`];
    lines.push(`I'd like to arrange: ${service}.`);
    lines.push(`Car: ${selectedVehicle || "Open to recommendations"}`);
    if (from || to) lines.push(`Dates: ${from || "?"} to ${to || "?"}`);
    if (location) lines.push(`Delivery: ${location}`);
    if (notes) lines.push(`Notes: ${notes}`);
    if (name) lines.push(`— ${name}`);
    return lines.join("\n");
  }, [market, service, selectedVehicle, from, to, location, notes, name]);

  const href = whatsappHref(market, message);

  return (
    <form
      className="grid gap-6 border border-line bg-ink-2 p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-service`} className={label}>
            Service
          </label>
          <select
            id={`${uid}-service`}
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={field}
          >
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-vehicle`} className={label}>
            Car
          </label>
          <select
            id={`${uid}-vehicle`}
            value={selectedVehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className={field}
          >
            <option value="">Recommend one for me</option>
            {options.map((v) => (
              <option key={v.slug} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-from`} className={label}>
            From
          </label>
          <input
            id={`${uid}-from`}
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={`${field} [color-scheme:dark]`}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-to`} className={label}>
            To
          </label>
          <input
            id={`${uid}-to`}
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => setTo(e.target.value)}
            className={`${field} [color-scheme:dark]`}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-location`} className={label}>
          Delivery location
        </label>
        <input
          id={`${uid}-location`}
          type="text"
          autoComplete="street-address"
          placeholder={market === "dubai" ? "Hotel, residence or DXB" : "Hotel, office or IAH"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={field}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
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
        <div>
          <label htmlFor={`${uid}-notes`} className={label}>
            Notes <span className="normal-case tracking-normal text-paper-subtle">(optional)</span>
          </label>
          <input
            id={`${uid}-notes`}
            type="text"
            placeholder="Occasion, passengers, luggage…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div className="border-t border-line pt-6">
        <p id={`${uid}-preview-label`} className={label}>
          Message preview
        </p>
        <pre
          aria-labelledby={`${uid}-preview-label`}
          className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-paper-muted"
        >
          {message}
        </pre>
      </div>

      <button type="submit" className="btn btn-gold w-full justify-between">
        <span>Open in WhatsApp · {markets[market].city}</span>
        <WhatsAppIcon />
      </button>
      <p className="-mt-2 text-xs text-paper-subtle">
        Opens WhatsApp in a new tab with your message ready to send. Nothing is stored on this site.
      </p>
    </form>
  );
}
