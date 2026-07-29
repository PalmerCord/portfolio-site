import { SITE_URL, SWRV_URL } from "@/lib/site";

const profiles = [
  "https://github.com/PalmerCord",
  "https://www.linkedin.com/in/cordpalmer/",
  "https://www.instagram.com/cordian23/",
];

const personId = `${SITE_URL}/about#cord-palmer`;
const swrvId = `${SWRV_URL}/#organization`;

/**
 * Person + Organization graph for the About page.
 *
 * The two nodes reference each other (`founder` / `foundingDate` on the org,
 * `worksFor` on the person) so search engines can resolve Cord Palmer and SWRV
 * Tech as one connected entity rather than two unrelated sites that happen to
 * link.
 */
export const aboutPageGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Cord Palmer",
      url: `${SITE_URL}/about`,
      jobTitle: "Full Stack Engineer",
      description:
        "Full-stack engineer with 5+ years and 150+ shipped sites, specializing in Next.js, React, TypeScript, WordPress, and ecommerce in regulated industries.",
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "WordPress",
        "WooCommerce",
        "Ecommerce Development",
        "Cannabis Retail Technology",
        "Web Performance",
        "Technical SEO",
      ],
      sameAs: [...profiles, SWRV_URL],
      worksFor: { "@id": swrvId },
      founder: { "@id": swrvId },
    },
    {
      "@type": "Organization",
      "@id": swrvId,
      name: "SWRV Tech",
      alternateName: "SWRV",
      url: SWRV_URL,
      description:
        "SWRV Tech builds websites, ecommerce, mobile apps, dashboards, and automation as one connected system.",
      founder: { "@id": personId },
      employee: { "@id": personId },
      areaServed: "US",
      address: {
        "@type": "PostalAddress",
        addressRegion: "PR",
        addressCountry: "US",
      },
      knowsAbout: [
        "Web Development",
        "Ecommerce",
        "Mobile Applications",
        "Business Automation",
        "Systems Integration",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Cord Palmer",
      publisher: { "@id": personId },
      inLanguage: "en-US",
    },
  ],
};

/**
 * Serialize a JSON-LD payload for `dangerouslySetInnerHTML`, escaping `<` so a
 * value can never break out of the script tag.
 */
export function serializeJsonLd(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
