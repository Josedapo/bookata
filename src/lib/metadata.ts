import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "./config";

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "es_ES",
    },
    twitter: { card: "summary", title, description },
    alternates: { canonical: url },
  };
}
