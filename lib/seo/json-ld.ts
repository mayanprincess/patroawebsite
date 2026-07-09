import { siteConfig, getSiteUrl } from "./site";

const SERVICES = [
  {
    name: "Fuel Supply & Distribution",
    description:
      "Reliable wholesale fuel supply supported by dependable logistics and competitive pricing for commercial and industrial clients.",
  },
  {
    name: "Marine Bunkering",
    description:
      "Safe, efficient, and compliant fuel delivery for commercial vessels, ferries, fishing fleets, private yachts, and cruise operations.",
  },
  {
    name: "LNG Operations Management",
    description:
      "Strategic support for complex LNG projects including planning, government permitting, customs coordination, and full execution.",
  },
  {
    name: "Regulatory & Government Support",
    description:
      "End-to-end assistance navigating permits, customs procedures, environmental compliance, and maritime regulations in Honduras.",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "What services does PETROA provide in Honduras?",
    answer:
      "PETROA provides wholesale fuel supply and distribution, marine bunkering, LNG operations management, and regulatory and government support across Honduras and the Caribbean.",
  },
  {
    question: "Where is PETROA located?",
    answer:
      "PETROA is based in the Bay Islands of Honduras and serves commercial, industrial, and marine clients throughout Honduras and the Caribbean.",
  },
  {
    question: "Does PETROA offer marine bunkering services?",
    answer:
      "Yes. PETROA delivers marine fuel supply and bunkering for commercial vessels, passenger ferries, cargo ships, fishing fleets, private yachts, and cruise operations.",
  },
  {
    question: "How long has PETROA been operating?",
    answer:
      "PETROA has been a trusted energy partner since 2009, with more than 15 years of wholesale fuel and logistics experience.",
  },
] as const;

export function buildHomeJsonLd() {
  const logoUrl = getSiteUrl("/images/petroa-logo.svg");
  const pageUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${pageUrl}#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: pageUrl,
        logo: logoUrl,
        image: getSiteUrl(siteConfig.ogImage.path),
        description: siteConfig.description,
        foundingDate: siteConfig.foundingDate,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        areaServed: [
          { "@type": "Country", name: "Honduras" },
          { "@type": "Place", name: "Caribbean" },
        ],
        sameAs: Object.values(siteConfig.social),
      },
      {
        "@type": "LocalBusiness",
        "@id": `${pageUrl}#localbusiness`,
        name: siteConfig.name,
        url: pageUrl,
        image: getSiteUrl(siteConfig.ogImage.path),
        description: siteConfig.description,
        email: siteConfig.email,
        foundingDate: siteConfig.foundingDate,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.countryName,
        },
        parentOrganization: { "@id": `${pageUrl}#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        url: pageUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${pageUrl}#organization` },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${pageUrl}#website` },
        about: { "@id": `${pageUrl}#organization` },
        inLanguage: "en",
      },
      ...SERVICES.map((service, index) => ({
        "@type": "Service",
        "@id": `${pageUrl}#service-${index + 1}`,
        name: service.name,
        description: service.description,
        provider: { "@id": `${pageUrl}#organization` },
        areaServed: siteConfig.address.countryName,
      })),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
