import { type MarketId, markets } from "@/content/site";

export function whatsappHref(market: MarketId, message?: string): string {
  const base = `https://wa.me/${markets[market].whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function enquiryMessage(market: MarketId, vehicleName?: string): string {
  const city = markets[market].city;
  return vehicleName
    ? `Hello LavishCars, I'd like to enquire about the ${vehicleName} in ${city}.`
    : `Hello LavishCars, I'd like to arrange a car in ${city}.`;
}

export function telHref(market: MarketId): string {
  return `tel:${markets[market].phoneE164}`;
}

export function smsHref(market: MarketId): string {
  return `sms:${markets[market].phoneE164}`;
}

export function mailtoHref(to: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return query ? `mailto:${to}?${query}` : `mailto:${to}`;
}
