/**
 * The search-visible content of a built page, independent of framework markup: what a framework
 * upgrade must not change even when every byte of the HTML does. Regex over React's output is
 * enough here: attributes are always double-quoted and the pages hold no user input.
 */
import crypto from "node:crypto";

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };

function decode(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/\s([\w:-]+)(?:="([^"]*)")?/g)) out[m[1].toLowerCase()] = decode(m[2] ?? "");
  return out;
}

const tags = (html: string, name: string) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => attrs(m[0].slice(name.length + 1)));

const text = (inner: string) =>
  decode(inner.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Decoded `url`, `w` and `q` of a /_next/image src; any other src as-is. */
function imageTarget(src: string) {
  if (!src.startsWith("/_next/image?")) return { url: src };
  const p = new URLSearchParams(src.slice(src.indexOf("?") + 1));
  return { url: p.get("url"), w: p.get("w"), q: p.get("q") };
}

/** Hash of the visible text of <body>, scripts and styles removed. */
function bodyTextHash(html: string): string {
  const body = /<body\b[^>]*>([\s\S]*)<\/body>/i.exec(html)?.[1] ?? "";
  const visible = body.replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, " ");
  return crypto.createHash("sha256").update(text(visible)).digest("hex");
}

export function extractPage(html: string) {
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const meta: Record<string, string> = {};
  for (const m of tags(html, "meta")) {
    const key = m.name ?? m.property;
    if (key && "content" in m) meta[key] = m.content;
  }
  const links = tags(html, "link")
    .filter((l) => ["canonical", "alternate", "icon", "apple-touch-icon"].includes(l.rel))
    .map((l) => `${l.rel} ${l.href}${l.hreflang ? ` ${l.hreflang}` : ""}`);
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => JSON.parse(m[1]),
  );
  return {
    title: title ? text(title[1]) : null,
    lang: /<html[^>]*\blang="([^"]*)"/i.exec(html)?.[1] ?? null,
    meta,
    links,
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1])),
    headings: [...html.matchAll(/<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => `h${m[1]} ${text(m[2])}`),
    jsonld,
    anchors: [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => {
      const a = attrs(m[1]);
      return `${a.href ?? ""} | ${text(m[2])}${a.rel ? ` | rel=${a.rel}` : ""}`;
    }),
    bodyText: bodyTextHash(html),
    images: tags(html, "img").map((i) => ({ alt: i.alt ?? null, ...imageTarget(i.src ?? "") })),
  };
}
