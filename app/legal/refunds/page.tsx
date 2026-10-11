import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "LavishCars refund policy. The live policy remains binding while content migrates.",
  alternates: { canonical: "/legal/refunds" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund policy"
      liveUrl="https://lavishcars.com/refund-policy/"
      liveLabel="lavishcars.com/refund-policy"
      sections={[
        {
          heading: "Migration in progress",
          body: "The full refund policy is being reviewed and moved to this page. Until that review is complete, the refund policy published on the live site applies to all bookings.",
        },
        {
          heading: "Security deposits",
          body: "Deposit amounts, any deductions and refund timelines depend on the market and the vehicle, and are confirmed in writing before a booking is made.",
        },
      ]}
    />
  );
}
