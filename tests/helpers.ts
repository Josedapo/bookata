import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(__dirname, "..");
export const NEXT_DIR = path.join(ROOT, ".next");
export const APP_DIR = path.join(NEXT_DIR, "server", "app");
const GOLDEN_DIR = path.join(__dirname, "golden");
export const UPDATE = process.env.UPDATE_GOLDENS === "1";

export const sha256 = (data: string | Buffer) =>
  crypto.createHash("sha256").update(data).digest("hex");

/** Every file under `dir` (relative paths, sorted) whose name ends with one of `exts`. */
export function walk(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  const visit = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) visit(p);
      else if (exts.some((x) => e.name.endsWith(x))) out.push(path.relative(dir, p));
    }
  };
  visit(dir);
  return out.sort();
}

/**
 * Build-id-free text of a build file. The id appears as-is and with "-" turned into "_";
 * replacing both makes two builds of the same code byte-identical.
 */
export function normalisedBuildFile(rel: string): string {
  const id = fs.readFileSync(path.join(NEXT_DIR, "BUILD_ID"), "utf8").trim();
  return fs
    .readFileSync(path.join(APP_DIR, rel), "utf8")
    .replaceAll(id, "<BUILD_ID>")
    .replaceAll(id.replaceAll("-", "_"), "<BUILD_ID>");
}

function readGolden(name: string): unknown {
  const file = path.join(GOLDEN_DIR, name);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing golden ${name}: run \`npm run test:update\` once to pin it.`);
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeGolden(name: string, value: unknown) {
  fs.mkdirSync(GOLDEN_DIR, { recursive: true });
  // One line per top-level key: compact on disk, and a git diff names the page or key that moved.
  const lines = Object.entries(value as Record<string, unknown>).map(
    ([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`,
  );
  fs.writeFileSync(path.join(GOLDEN_DIR, name), `{\n${lines.join(",\n")}\n}\n`);
}

/**
 * Compares a keyed record with its golden and returns a readable list of the keys that were
 * added, removed or changed (empty when equal). With UPDATE_GOLDENS=1 it rewrites the golden.
 */
export function diffGolden(name: string, value: Record<string, unknown>): string[] {
  if (UPDATE) {
    writeGolden(name, value);
    return [];
  }
  const golden = readGolden(name) as Record<string, unknown>;
  const lines: string[] = [];
  for (const k of Object.keys(golden)) {
    if (!(k in value)) lines.push(`removed  ${k}`);
    else if (JSON.stringify(golden[k]) !== JSON.stringify(value[k])) lines.push(`changed  ${k}`);
  }
  for (const k of Object.keys(value)) if (!(k in golden)) lines.push(`added    ${k}`);
  return lines;
}

/** Golden value for a single named key, for a precise diff in the assertion message. */
export function goldenEntry(name: string, key: string): unknown {
  return (readGolden(name) as Record<string, unknown>)[key];
}
