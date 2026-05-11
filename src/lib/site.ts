import type { Metadata } from "next";

const defaultTitle = "Cord Palmer | Full Stack Engineer";
const defaultDescription =
  "Personal and agency portfolio showcasing high-performance web experiences, shipped products, and modern full-stack engineering work.";
const defaultOgImage = "/opengraph-image";

function getMetadataBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl) {
    try {
      return new URL(siteUrl);
    } catch {
      return new URL("http://localhost:3000");
    }
  }

  return new URL("http://localhost:3000");
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
