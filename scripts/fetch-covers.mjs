/**
 * Fetch book covers and synopses from Google Books API by ISBN.
 * Updates src/data/books.json with cover URLs and longer synopses.
 *
 * Usage:
 *   node scripts/fetch-covers.mjs           # fetch covers only (skip existing)
 *   node scripts/fetch-covers.mjs --sync    # fetch covers + update synopses
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_PATH = join(__dirname, "../src/data/books.json");
const syncSynopsis = process.argv.includes("--sync");

const PLACEHOLDER_SIZE = 15567;

async function fetchBookData(isbn) {
  const bareIsbn = isbn.replace(/-/g, "");
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${bareIsbn}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return { coverUrl: null, synopsis: null };
    }

    const volumeInfo = data.items[0].volumeInfo;

    // Cover
    let coverUrl = null;
    const imageLinks = volumeInfo?.imageLinks;
    if (imageLinks) {
      const rawUrl = imageLinks.thumbnail || imageLinks.smallThumbnail;
      if (rawUrl) {
        const zoom2Url = rawUrl
          .replace("http://", "https://")
          .replace("zoom=1", "zoom=2")
          .replace("&edge=curl", "");

        const zoom2Res = await fetch(zoom2Url);
        const zoom2Buf = await zoom2Res.arrayBuffer();

        if (zoom2Buf.byteLength !== PLACEHOLDER_SIZE) {
          coverUrl = zoom2Url;
        } else {
          console.log(`    zoom=2 is placeholder, using zoom=1`);
          coverUrl = rawUrl
            .replace("http://", "https://")
            .replace("&edge=curl", "");
        }
      }
    }

    // Synopsis
    const synopsis = volumeInfo?.description || null;

    return { coverUrl, synopsis };
  } catch (err) {
    console.error(`  Error fetching ${isbn}: ${err.message}`);
    return { coverUrl: null, synopsis: null };
  }
}

async function main() {
  const booksData = JSON.parse(readFileSync(BOOKS_PATH, "utf-8"));
  let coversUpdated = 0;
  let synopsesUpdated = 0;
  let skipped = 0;
  let failed = 0;

  for (const book of booksData.books) {
    const needsCover = !book.coverUrl;
    const needsSynopsis = syncSynopsis;

    if (!needsCover && !needsSynopsis) {
      console.log(`  SKIP ${book.title}`);
      skipped++;
      continue;
    }

    console.log(`  Fetching: ${book.title} (${book.isbn})`);
    const { coverUrl, synopsis } = await fetchBookData(book.isbn);

    if (needsCover && coverUrl) {
      book.coverUrl = coverUrl;
      console.log(`  COVER OK`);
      coversUpdated++;
    } else if (needsCover) {
      console.log(`  COVER MISS`);
      failed++;
    }

    if (needsSynopsis && synopsis && synopsis.length > (book.synopsis || "").length) {
      book.synopsis = synopsis;
      console.log(`  SYNOPSIS updated (${synopsis.length} chars)`);
      synopsesUpdated++;
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  writeFileSync(BOOKS_PATH, JSON.stringify(booksData, null, 2) + "\n");
  console.log(
    `\nDone: ${coversUpdated} covers, ${synopsesUpdated} synopses, ${skipped} skipped, ${failed} not found`
  );
}

main();
