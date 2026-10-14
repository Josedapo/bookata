import path from "node:path";
import { defineConfig } from "vitest/config";

// Safety net (Martin, 2026-10-14). `npm test` builds the site offline and compares it with
// tests/golden/; `npm run test:update` re-pins after an approved output change.
export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  test: {
    include: ["tests/**/*.test.ts"],
    globalSetup: ["tests/global-setup.ts"],
    fileParallelism: false,
    testTimeout: 120_000,
    hookTimeout: 300_000,
  },
});
