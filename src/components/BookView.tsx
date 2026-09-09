"use client";

import { useEffect } from "react";
import type { Book } from "@/lib/types";

/**
 * Records that a visitor opened a specific book page.
 *
 * This is the step immediately before the affiliate click, and without it a
 * silent month is unreadable: there is no way to tell "nobody reaches a book"
 * from "they reach it and it does not convince them". It fires once per page
 * view, and the queue shim in the layout means it survives being fired before
 * analytics has finished loading.
 *
 * Uses GA4's standard `view_item` name so it lands in the built-in reports
 * rather than needing a custom exploration.
 */
export default function BookView({ book }: { book: Book }) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "view_item", {
      items: [
        {
          item_id: book.isbn || book.slug,
          item_name: book.title,
          item_category: book.genres[0] ?? "",
          item_category2: book.ageRange[0] ?? "",
        },
      ],
      book_title: book.title,
      book_author: book.author,
      age_range: book.ageRange.join(","),
    });
  }, [book]);

  return null;
}
