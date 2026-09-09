import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

/**
 * Crawler policy, decided with Seoseda on 2026-09-09 and applied per bot rather
 * than left to a blanket wildcard.
 *
 * Answer-time crawlers are allowed: they are how the site appears inside
 * ChatGPT, Perplexity, Claude and Bing answers, and blocking them removes
 * Bookata from those answers entirely.
 *
 * Training crawlers are blocked: they take the catalogue to train a model and
 * send no reader back. Note that blocking GPTBot does not affect ChatGPT search
 * (that is OAI-SearchBot), and blocking Google-Extended does not affect Google
 * Search or AI Overviews (those use Googlebot).
 */
const ANSWER_TIME = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "Applebot",
];

const TRAINING = [
  "GPTBot",
  "CCBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ANSWER_TIME.map((userAgent) => ({ userAgent, allow: "/" })),
      ...TRAINING.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
