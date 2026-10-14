import { spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ROOT } from "./helpers";

/*
 * Browser smoke on `next start` over the build made by global-setup. Every request that is not to
 * this server is aborted, and so are /_next/image (the optimizer would fetch the cover from Amazon)
 * and /_vercel/ (speed insights exists only on Vercel; next start answers it with an HTML 404).
 * Playwright is not a dependency of the repo: it is loaded from BK_PLAYWRIGHT (default Dieter's,
 * whose Chromium is already in the cache); this test never downloads a browser.
 */
const PW_DIR = process.env.BK_PLAYWRIGHT ?? path.join(os.homedir(), ".claude/agents/dieter/node_modules");
const GA_ID = "G-DBKB5VF49W";
const PAGES = [
  "/",
  "/libro/la-vaca-que-puso-un-huevo",
  "/libros-ninos-6-8-anos",
  "/por-edades",
  "/colecciones",
  "/cookies",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
let chromium: any;
let browser: any;
let server: ChildProcess;
let base = "";

const freePort = () =>
  new Promise<number>((resolve) => {
    const s = net.createServer().listen(0, () => {
      const { port } = s.address() as net.AddressInfo;
      s.close(() => resolve(port));
    });
  });

async function waitUp(url: string) {
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`next start did not answer at ${url}`);
}

/** A page with external requests aborted, recording analytics requests and errors. */
async function openPage(stored: string | null) {
  const context = await browser.newContext();
  const gtm: string[] = [];
  const errors: string[] = [];
  await context.route("**/*", (route: any) => {
    const u = new URL(route.request().url());
    const local = u.origin === base && !/^\/(_next\/image|_vercel\/)/.test(u.pathname);
    return local ? route.continue() : route.abort();
  });
  // Counts how many times the shim defines the loader (it must run exactly once).
  await context.addInitScript((value: string | null) => {
    let runs = 0;
    let fn: unknown;
    Object.defineProperty(window, "__bookataLoadGA", {
      configurable: true,
      get: () => fn,
      set: (v) => {
        runs++;
        fn = v;
      },
    });
    (window as any).__shimRuns = () => runs;
    if (value !== null && !sessionStorage.getItem("seeded")) {
      localStorage.setItem("bookata-consent", value);
      sessionStorage.setItem("seeded", "1");
    }
  }, stored);
  const page = await context.newPage();
  page.on("request", (r: any) => {
    if (r.url().includes("googletagmanager.com")) gtm.push(r.url());
  });
  page.on("pageerror", (e: Error) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m: any) => {
    // Aborted covers and the Vercel-only speed-insights script surface as resource errors.
    if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(m.text());
  });
  return { context, page, gtm, errors };
}

const commands = (page: any) =>
  page.evaluate(() => ((window as any).dataLayer as IArguments[]).map((a) => a[0]));

beforeAll(async () => {
  if (!fs.existsSync(path.join(PW_DIR, "playwright"))) {
    throw new Error(`No Playwright at ${PW_DIR}: set BK_PLAYWRIGHT to a node_modules that has it.`);
  }
  chromium = createRequire(path.join(PW_DIR, "noop.js"))("playwright").chromium;
  const port = await freePort();
  base = `http://localhost:${port}`;
  server = spawn(path.join(ROOT, "node_modules", ".bin", "next"), ["start", "-p", String(port)], {
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1" },
    stdio: "ignore",
  });
  await waitUp(base + "/robots.txt");
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser?.close();
  server?.kill();
});

describe("smoke on next start", () => {
  for (const route of PAGES) {
    it(`renders ${route}`, async () => {
      const { context, page, errors } = await openPage("denied");
      const res = await page.goto(base + route, { waitUntil: "load" });
      expect(res.status()).toBe(200);
      expect(await page.locator("h1").first().isVisible()).toBe(true);
      expect(await page.locator("footer").count()).toBeGreaterThan(0);
      await page.waitForTimeout(300);
      expect(errors).toEqual([]);
      await context.close();
    });
  }

  it("serves covers through the optimizer from Amazon only", async () => {
    const { context, page } = await openPage("denied");
    await page.goto(base + "/libro/la-vaca-que-puso-un-huevo", { waitUntil: "load" });
    const srcs: string[] = await page.$$eval("img", (imgs: HTMLImageElement[]) => imgs.map((i) => i.getAttribute("src") ?? ""));
    expect(srcs.some((s) => s.startsWith("/_next/image?url=https%3A%2F%2Fm.media-amazon.com"))).toBe(true);
    await context.close();
    const other = await fetch(
      `${base}/_next/image?url=${encodeURIComponent("https://covers.openlibrary.org/b/isbn/9788498381498-M.jpg")}&w=128&q=75`,
    );
    expect(other.status).toBe(400);
  });

  it("consent: nothing loads before a choice, gtag.js once after Aceptar", async () => {
    const { context, page, gtm, errors } = await openPage(null);
    await page.goto(base + "/", { waitUntil: "load" });
    await page.waitForTimeout(1500);
    expect(gtm).toEqual([]);
    expect(await page.evaluate(() => (window as any).__shimRuns())).toBe(1);
    const loaded = page.waitForRequest((r: any) => r.url().includes("googletagmanager.com/gtag/js"));
    await page.getByRole("button", { name: "Aceptar" }).click();
    await loaded;
    await page.waitForTimeout(500);
    expect(gtm).toEqual([`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`]);
    expect((await commands(page)).slice(0, 3)).toEqual(["consent", "js", "config"]);
    expect(await page.evaluate(() => localStorage.getItem("bookata-consent"))).toBe("granted");
    expect(errors).toEqual([]);
    await context.close();
  });

  it("consent: Rechazar and a stored denial load nothing", async () => {
    const fresh = await openPage(null);
    await fresh.page.goto(base + "/", { waitUntil: "load" });
    await fresh.page.getByRole("button", { name: "Rechazar" }).click();
    await fresh.page.waitForTimeout(1000);
    expect(fresh.gtm).toEqual([]);
    expect(await fresh.page.evaluate(() => localStorage.getItem("bookata-consent"))).toBe("denied");
    await fresh.context.close();

    const denied = await openPage("denied");
    await denied.page.goto(base + "/libros-ninos-6-8-anos", { waitUntil: "load" });
    await denied.page.waitForTimeout(1500);
    expect(denied.gtm).toEqual([]);
    expect(await denied.page.getByRole("button", { name: "Aceptar" }).count()).toBe(0);
    expect(await denied.page.evaluate(() => (window as any).__shimRuns())).toBe(1);
    await denied.context.close();
  });

  it("consent: a stored grant loads gtag.js once after the page settles", async () => {
    const { context, page, gtm } = await openPage("granted");
    const loaded = page.waitForRequest((r: any) => r.url().includes("googletagmanager.com/gtag/js"));
    await page.goto(base + "/libro/la-vaca-que-puso-un-huevo", { waitUntil: "load" });
    await loaded;
    await page.waitForTimeout(500);
    expect(gtm).toEqual([`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`]);
    expect((await commands(page)).slice(0, 3)).toEqual(["consent", "js", "config"]);
    expect(await page.evaluate(() => (window as any).__shimRuns())).toBe(1);
    await context.close();
  });
});
