import type { Metadata, Viewport } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL } from "@/content/site";
import { siteSchema } from "@/lib/json-ld";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LavishCars — Exotic & Chauffeur Car Rental in Dubai and Houston",
    template: "%s · LavishCars",
  },
  description:
    "Exotic, luxury and chauffeur car rental delivered to your door in Dubai (UAE) and Houston (USA). WhatsApp-first booking with airport delivery.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: "LavishCars",
    locale: "en",
    images: [
      {
        url: "/images/fleet/bentley-flying-spur-night.jpg",
        width: 2400,
        height: 1600,
        alt: "A Bentley Flying Spur at night",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink-1 text-paper">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={siteSchema()} />
      </body>
    </html>
  );
}
