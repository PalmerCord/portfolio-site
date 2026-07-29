import type { Metadata } from "next";

const defaultTitle = "Cord Palmer | Full Stack Engineer";
const defaultDescription =
  "Personal and agency portfolio showcasing high-performance web experiences, shipped products, and modern full-stack engineering work.";
const defaultOgImage = "/opengraph-image";

/**
 * The single canonical origin for the site.
 *
 * This MUST match the host the origin actually serves a 200 on. Vercel serves
 * this project at `www.cordpalmer.com` and 308-redirects the apex, so every
 * canonical, sitemap entry, and robots.txt reference has to use the www host —
 * otherwise Google is handed a sitemap where every URL redirects, which reads
 * as "Page with redirect" / "Discovered - currently not indexed" in Search
 * Console.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cordpalmer.com").replace(
  /\/+$/,
  ""
);

/** The agency Cord Palmer founded. Linked from the About page and the footer. */
export const SWRV_URL = "https://swrv.tech";

function getMetadataBaseUrl() {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL("https://www.cordpalmer.com");
  }
}

export const siteConfig = {
  name: "Cord Palmer",
  title: defaultTitle,
  description: defaultDescription,
  metadataBase: getMetadataBaseUrl(),
  defaultOgImage,
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
