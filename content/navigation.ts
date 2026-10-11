export type NavLink = { href: string; label: string; external?: boolean };

export const primaryNav: NavLink[] = [
  { href: "/fleet", label: "Fleet" },
  { href: "/uae/dubai", label: "Dubai" },
  { href: "/usa/houston", label: "Houston" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Our Story" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/fleet", label: "The fleet" },
      { href: "/services", label: "Services" },
      { href: "/uae/dubai", label: "Rent in Dubai" },
      { href: "/usa/houston", label: "Rent in Houston" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/journal", label: "Journal" },
      { href: "/invest", label: "Invest with us" },
      { href: "/list-your-car", label: "List your car" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms & conditions" },
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/refunds", label: "Refund policy" },
    ],
  },
];
