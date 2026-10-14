// Module for NEXT_FONT_GOOGLE_MOCKED_RESPONSES: Next's next/font/google reads the CSS for each
// Google Fonts URL from here instead of the network, and a `src: url(/abs/path)` starting with
// "/" is read from disk. The CSS and woff2 files were captured from Google Fonts on 2026-10-14.
// Turbopack bundles this module and runs it from its own folder with a virtual __dirname, so the
// folder comes from BK_FONTS_DIR (set by tests/global-setup.ts); __dirname is the webpack fallback.
const fs = require("node:fs");
const path = require("node:path");

const dir = process.env.BK_FONTS_DIR || __dirname;
// Turbopack fetches font files over HTTP only: BK_FONTS_URL points at a local static server
// over this folder. Webpack reads a "/" path from disk.
const base = process.env.BK_FONTS_URL || dir;
const css = (file) => fs.readFileSync(path.join(dir, file), "utf8").replaceAll("__FONTS__", base);

module.exports = {
  "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap": css("outfit.css"),
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap": css("inter.css"),
};
