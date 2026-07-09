export const siteConfig = {
  name: "PETROA",
  legalName: "Petroleos de Roatan S.A.",
  title: "PETROA | Wholesale Fuel & Marine Bunkering Honduras",
  description:
    "PETROA is your strategic energy partner in Honduras and the Caribbean. Wholesale fuel supply, marine bunkering, LNG operations, and regulatory support since 2009.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.petroa.com",
  locale: "en_US",
  email: "info@petroa.com",
  address: {
    locality: "Bay Islands",
    region: "Bay Islands",
    country: "HN",
    countryName: "Honduras",
  },
  foundingDate: "2009",
  keywords: [
    "wholesale fuel supplier Honduras",
    "marine bunkering Honduras",
    "LNG operations Caribbean",
    "fuel distribution Bay Islands",
    "energy partner Honduras",
    "PETROA",
    "Roatan fuel supply",
    "commercial fuel Honduras",
    "marine fuel supply",
    "energy logistics Caribbean",
  ],
  ogImage: {
    path: "/images/hero-maritime-terminal.jpg",
    width: 1200,
    height: 630,
    alt: "PETROA maritime fuel terminal operations in the Bay Islands, Honduras",
  },
  social: {
    linkedin: "https://www.linkedin.com",
    x: "https://x.com",
    instagram: "https://www.instagram.com",
  },
} as const;

export function getSiteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
