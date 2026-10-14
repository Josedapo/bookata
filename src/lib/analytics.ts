/*
 * GA4 measurement id for the Bookata property, created 2026-09-09. It is not a
 * secret: it ships in the HTML of every page by design, so it lives here rather
 * than in a Vercel environment variable, where a missing value would silently
 * mean no analytics at all. NEXT_PUBLIC_GA_ID still overrides it, which is what
 * a staging property would use.
 * Kept in its own module, apart from config.ts, so that importing it from the
 * client ConsentBanner does not pull the catalogue config into another chunk.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-DBKB5VF49W";
