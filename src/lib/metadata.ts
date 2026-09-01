import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "./config";

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /**
   * Skip the layout's "%s | Bookata" template. Used by the home page, whose
   * title already carries the brand and would otherwise read "… | Bookata |
   * Bookata".
   */
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
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
