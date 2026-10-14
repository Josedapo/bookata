// Module for NEXT_FONT_GOOGLE_MOCKED_RESPONSES: Next's next/font/google reads the CSS for each
// Google Fonts URL from here instead of the network, and a `src: url(/abs/path)` starting with
// "/" is read from disk. The CSS and woff2 files were captured from Google Fonts on 2026-10-14.
const fs = require("node:fs");
const path = require("node:path");

const css = (file) =>
  fs.readFileSync(path.join(__dirname, file), "utf8").replaceAll("__FONTS__", __dirname);

module.exports = {
  "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap": css("outfit.css"),
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap": css("inter.css"),
};
