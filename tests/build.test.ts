import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractPage } from "./extract";
import { APP_DIR, diffGolden, goldenEntry, normalisedBuildFile, sha256, UPDATE, walk } from "./helpers";

/*
 * Two layers over the same build. The byte layer (SHA-256 of every prerendered HTML, RSC payload
 * and route body, build id normalised) detects any change at all. The content layer (title, meta,
 * links, headings, JSON-LD, anchors, image targets per page; full text of the route bodies) says
 * whether a change is visible to a reader or a search engine. A framework upgrade is expected to
 * move the first and must leave the second identical.
 */
const files = walk(APP_DIR, [".html", ".rsc", ".body"]);
const pages = files.filter((f) => f.endsWith(".html"));
const bodies = files.filter((f) => f.endsWith(".body"));

describe("build output", () => {
  it("prerenders the expected number of pages", () => {
    expect({ pages: pages.length, bodies: bodies.length }).toEqual({ pages: 275, bodies: 4 });
  });

  it("matches the pinned content of every page and route body", () => {
    const extract: Record<string, unknown> = {};
    for (const f of pages) extract[f] = extractPage(fs.readFileSync(path.join(APP_DIR, f), "utf8"));
    for (const f of bodies) extract[f] = fs.readFileSync(path.join(APP_DIR, f), "utf8");
    const diff = diffGolden("content.json", extract);
    if (diff.length && !UPDATE) {
      const first = diff[0].slice(9);
      expect(extract[first], `${diff.length} pages differ:\n${diff.slice(0, 40).join("\n")}`).toEqual(
        goldenEntry("content.json", first),
      );
    }
    expect(diff).toEqual([]);
  });

  it("matches the pinned bytes of every page, RSC payload and route body", () => {
    const hashes: Record<string, string> = {};
    for (const f of files) hashes[f] = sha256(normalisedBuildFile(f));
    const diff = diffGolden("build-hashes.json", hashes);
    expect(diff, `${diff.length} files differ:\n${diff.slice(0, 40).join("\n")}`).toEqual([]);
  });
});
