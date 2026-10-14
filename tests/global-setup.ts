import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";

/*
 * Builds the site once for the whole run, offline and reproducibly:
 * - .next is deleted first: its cache would otherwise serve fonts and bypass the mock below;
 * - next/font/google reads the CSS pinned in tests/fixtures/fonts (mock.cjs) and fetches the
 *   woff2 files from a local static server over that folder (Turbopack fetches font files over
 *   HTTP only; the output file names depend on the content, not on the port);
 * - `new Date()` is frozen (Footer prints the year), through NODE_OPTIONS so workers inherit it;
 * - NEXT_PUBLIC_GA_ID is removed so the build uses the production fallback in src/lib/analytics.ts;
 * - NODE_ENV is removed so next build runs as production (see below).
 */
export default async function setup() {
  const root = path.resolve(__dirname, "..");
  if (process.env.BK_SKIP_BUILD === "1") return;
  fs.rmSync(path.join(root, ".next"), { recursive: true, force: true });

  const fonts = path.join(__dirname, "fixtures", "fonts");
  const server = http.createServer((req, res) => {
    const file = path.join(fonts, path.basename(decodeURIComponent(req.url ?? "")));
    if (!file.endsWith(".woff2") || !fs.existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "content-type": "font/woff2" }).end(fs.readFileSync(file));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: "1",
    NEXT_FONT_GOOGLE_MOCKED_RESPONSES: path.join(fonts, "mock.cjs"),
    BK_FONTS_DIR: fonts,
    BK_FONTS_URL: `http://127.0.0.1:${port}`,
    NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ""} --require ${path.join(__dirname, "frozen-clock.cjs")}`.trim(),
  };
  delete env.NEXT_PUBLIC_GA_ID;
  // Vitest sets NODE_ENV=test; next build would keep it and Tailwind would skip its production
  // optimisation, so the pinned CSS would not be the one Vercel serves.
  delete env.NODE_ENV;
  try {
    const code = await new Promise<number | null>((resolve) => {
      const p = spawn(path.join(root, "node_modules", ".bin", "next"), ["build"], {
        cwd: root,
        env,
        stdio: ["ignore", "ignore", "inherit"],
      });
      p.on("exit", resolve);
    });
    if (code !== 0) throw new Error(`next build exited with ${code}`);
  } finally {
    server.close();
  }
}
