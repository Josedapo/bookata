/**
 * Fetch book covers from Google Books API by ISBN.
 * Updates src/data/books.json with cover URLs.
 *
 * Usage: node scripts/fetch-covers.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_PATH = join(__dirname, "../src/data/books.json");

const PLACEHOLDER_SIZE = 15567;

async function fetchCover(isbn) {
  const bareIsbn = isbn.replace(/-/g, "");
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${bareIsbn}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const imageLinks = data.items[0].volumeInfo?.imageLinks;
    if (!imageLinks) return null;

    const rawUrl = imageLinks.thumbnail || imageLinks.smallThumbnail;
    if (!rawUrl) return null;

    // Try zoom=2 first for better quality
    const zoom2Url = rawUrl
      .replace("http://", "https://")
      .replace("zoom=1", "zoom=2")
      .replace("&edge=curl", "");

    const zoom2Res = await fetch(zoom2Url);
    const zoom2Buf = await zoom2Res.arrayBuffer();

    if (zoom2Buf.byteLength !== PLACEHOLDER_SIZE) {
      return zoom2Url;
    }

    // Fallback to zoom=1 (smaller but real cover)
    console.log(`    zoom=2 is placeholder, using zoom=1`);
    return rawUrl
      .replace("http://", "https://")
      .replace("&edge=curl", "");
  } catch (err) {
    console.error(`  Error fetching ${isbn}: ${err.message}`);
    return null;
  }
}

async function main() {
  const booksData = JSON.parse(readFileSync(BOOKS_PATH, "utf-8"));
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const book of booksData.books) {
    if (book.coverUrl) {
      console.log(`  SKIP ${book.title} (already has cover)`);
      skipped++;
      continue;
    }

    console.log(`  Fetching cover for: ${book.title} (${book.isbn})`);
    const coverUrl = await fetchCover(book.isbn);

    if (coverUrl) {
      book.coverUrl = coverUrl;
      console.log(`  OK   ${book.title}`);
      updated++;
    } else {
      console.log(`  MISS ${book.title} — no cover found`);
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 300));
  }

  writeFileSync(BOOKS_PATH, JSON.stringify(booksData, null, 2) + "\n");
  console.log(
    `\nDone: ${updated} updated, ${skipped} skipped, ${failed} not found`
  );
}

main();
