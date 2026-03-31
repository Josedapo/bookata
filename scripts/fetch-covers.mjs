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

    // Get the best available image, prefer thumbnail
    const rawUrl = imageLinks.thumbnail || imageLinks.smallThumbnail;
    if (!rawUrl) return null;

    // Convert to HTTPS and use zoom=2 for better quality (~300px)
    return rawUrl
      .replace("http://", "https://")
      .replace("zoom=1", "zoom=2")
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
