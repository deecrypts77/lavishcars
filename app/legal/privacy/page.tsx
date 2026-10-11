import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LavishCars handles personal information. The live policy remains binding while content migrates.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      liveUrl="https://lavishcars.com/privacy-policy/"
      liveLabel="lavishcars.com/privacy-policy"
      sections={[
        {
          heading: "Migration in progress",
          body: "The full privacy policy is being reviewed and moved to this page. Until that review is complete, the policy published on the live site applies.",
        },
        {
          heading: "This website",
          body: "This site does not include booking forms that store your details. The WhatsApp composer on the contact page builds a message in your browser and hands it to WhatsApp; nothing you type there is sent to LavishCars until you choose to send it.",
        },
        {
          heading: "Contacting us",
          body: "When you message us on WhatsApp, call or email, we receive the information you choose to share so we can respond to your enquiry.",
        },
      ]}
    />
  );
}
