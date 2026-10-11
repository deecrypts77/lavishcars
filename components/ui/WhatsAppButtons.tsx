import { type MarketId, markets } from "@/content/site";
import { whatsappHref, enquiryMessage } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

type WhatsAppButtonsProps = {
  only?: MarketId[];
  vehicleName?: string;
  primary?: MarketId;
};

export default function WhatsAppButtons({
  only = ["dubai", "houston"],
  vehicleName,
  primary = only[0],
}: WhatsAppButtonsProps) {
  return (
    <>
      {only.map((id) => (
        <a
          key={id}
          href={whatsappHref(id, enquiryMessage(id, vehicleName))}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${id === primary ? "btn-gold" : "btn-ghost"}`}
        >
          <WhatsAppIcon />
          WhatsApp {markets[id].city}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </>
  );
}
