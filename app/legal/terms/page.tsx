import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "LavishCars rental terms. The live terms remain binding while content migrates.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      liveUrl="https://lavishcars.com/terms-conditions/"
      liveLabel="lavishcars.com/terms-conditions"
      sections={[
        {
          heading: "Migration in progress",
          body: "The full terms and conditions are being reviewed and moved to this page. Until that review is complete, the terms published on the live site apply to all rentals.",
        },
        {
          heading: "Website content",
          body: "Vehicle imagery and specifications on this site are illustrative. The exact vehicle, rental terms, deposit and charges are confirmed in writing by LavishCars before a booking is made.",
        },
      ]}
    />
  );
}
