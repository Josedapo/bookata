import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "./config";

/**
 * Safety net so no page can ship a truncated title or description to search
 * results, whatever the data behind it. Titles are clamped to 50 characters
 * because the layout appends " | Bookata" (10 more), and descriptions to 155.
 * Cuts fall on a word boundary and never mid-word.
 */
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
  title = clamp(title, absoluteTitle ? 60 : 50);
  description = clamp(description, 155);
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
