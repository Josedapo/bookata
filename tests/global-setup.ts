import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/*
 * Builds the site once for the whole run, offline and reproducibly:
 * - .next is deleted first: its cache would otherwise serve fonts and bypass the mock below;
 * - next/font/google reads the CSS and woff2 files pinned in tests/fixtures/fonts;
 * - `new Date()` is frozen (Footer prints the year), through NODE_OPTIONS so workers inherit it;
 * - NEXT_PUBLIC_GA_ID is removed so the build uses the production fallback in src/lib/analytics.ts;
 * - NODE_ENV is removed so next build runs as production (see below).
 */
export default function setup() {
  const root = path.resolve(__dirname, "..");
  if (process.env.BK_SKIP_BUILD === "1") return;
  fs.rmSync(path.join(root, ".next"), { recursive: true, force: true });
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: "1",
    NEXT_FONT_GOOGLE_MOCKED_RESPONSES: path.join(__dirname, "fixtures", "fonts", "mock.cjs"),
    NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ""} --require ${path.join(__dirname, "frozen-clock.cjs")}`.trim(),
  };
  delete env.NEXT_PUBLIC_GA_ID;
  // Vitest sets NODE_ENV=test; next build would keep it and Tailwind would skip its production
  // optimisation, so the pinned CSS would not be the one Vercel serves.
  delete env.NODE_ENV;
  execFileSync(path.join(root, "node_modules", ".bin", "next"), ["build"], {
    cwd: root,
    env,
    stdio: ["ignore", "ignore", "inherit"],
  });
}
