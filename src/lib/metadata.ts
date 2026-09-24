import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "./config";

/**
 * Safety net so no page can ship a truncated title or description to search
 * results, whatever the data behind it. Titles are clamped to 50 characters
 * because the layout appends " | Bookata" (10 more), and descriptions to 155.
 * Cuts fall on a word boundary and never mid-word.
 */
const DEFAULT_OG_IMAGE = {
  url: `${BASE_URL}/images/brand/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: "Bookata, libros infantiles y juveniles recomendados por edad",
};

function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (stop > max * 0.6) return cut.slice(0, stop + 1).trim();
  return cut.slice(0, cut.lastIndexOf(" ")).trim() + "…";
}

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
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
  /**
   * Absolute URL of the share image. Book pages pass their cover; every other
   * page falls back to the brand card built by scripts/build-og.py.
   */
  image?: { url: string; width?: number; height?: number; alt: string };
}): Metadata {
  const url = `${BASE_URL}${path}`;
  title = clamp(title, absoluteTitle ? 60 : 50);
  description = clamp(description, 155);
  const ogImage = image ?? DEFAULT_OG_IMAGE;
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
      images: [ogImage],
    },
    // A portrait book cover crops badly in the large card, so covers use the
    // small one and the landscape brand card uses the large one.
    twitter: {
      card: image ? "summary" : "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    alternates: { canonical: url },
  };
}
