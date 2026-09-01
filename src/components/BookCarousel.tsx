"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Book } from "@/lib/types";
import BookCard from "./BookCard";

/**
 * Horizontal rail of covers. Arrows on desktop, native touch scrolling with
 * snap on mobile. No carousel library: the whole behaviour is a flex row with
 * `scroll-snap` plus a `scrollBy` call, which keeps the payload at zero
 * additional kilobytes.
 */
export default function BookCarousel({
  title,
  subtitle,
  books,
  href,
  hrefLabel = "Ver todos",
  tone = "light",
  priority = false,
  headingLevel = "h2",
  limit = 20,
  showBadge = true,
}: {
  title: string;
  subtitle?: string;
  books: Book[];
  href?: string;
  hrefLabel?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  /**
   * Rails show a slice, not the whole shelf: the "Ver todos" link carries the
   * rest. Keeps the home page from mounting the entire 243-book catalogue.
   */
  limit?: number;
  showBadge?: boolean;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;

    const amount = direction * el.clientWidth * 0.85;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      el.scrollBy({ left: amount, behavior: "auto" });
      return;
    }

    const from = el.scrollLeft;
    el.scrollBy({ left: amount, behavior: "smooth" });

    /*
     * Some embedded webviews and headless renderers accept a smooth scroll and
     * never animate it, which would leave the arrows dead. If nothing has moved
     * shortly after, jump instantly instead.
     */
    window.setTimeout(() => {
      const target = railRef.current;
      if (target && Math.abs(target.scrollLeft - from) < 1) {
        target.scrollBy({ left: amount, behavior: "auto" });
      }
    }, 240);
  };

  if (books.length === 0) return null;

  const visible = books.slice(0, limit);

  const Heading = headingLevel;
  const titleColor = tone === "dark" ? "text-on-ink" : "text-text";
  const subtitleColor = tone === "dark" ? "text-on-ink-soft" : "text-text-secondary";

  const arrowBase =
    "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/85 text-white shadow-xl backdrop-blur transition-all duration-200 hover:bg-ink hover:scale-105 lg:flex";

  return (
    <section className="group/rail">
      <div className="shell flex items-end justify-between gap-4">
        <div className="min-w-0">
          <Heading
            className={`font-display text-xl font-bold leading-tight ${titleColor} sm:text-2xl`}
          >
            {title}
          </Heading>
          {subtitle && (
            <p className={`mt-1 text-sm ${subtitleColor}`}>{subtitle}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className={`flex-none text-sm font-semibold transition-colors ${
              tone === "dark"
                ? "text-on-ink-soft hover:text-primary"
                : "text-text-secondary hover:text-primary"
            }`}
          >
            {hrefLabel}
            <span aria-hidden="true"> →</span>
          </Link>
        )}
      </div>

      <div className="relative mt-4">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Anterior"
          className={`${arrowBase} left-3 ${
            atStart ? "pointer-events-none opacity-0" : "opacity-0 group-hover/rail:opacity-100"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div
          ref={railRef}
          className="rail no-scrollbar gap-3 px-4 pb-3 sm:gap-4 sm:px-6 lg:px-8"
        >
          {visible.map((book, i) => (
            <div
              key={book.id}
              className="w-[7.5rem] sm:w-[9.5rem] lg:w-[11.6rem]"
            >
              <BookCard
                book={book}
                tone={tone}
                sizes="(min-width: 1024px) 186px, (min-width: 640px) 152px, 120px"
                priority={priority && i < 6}
                showBadge={showBadge}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Siguiente"
          className={`${arrowBase} right-3 ${
            atEnd ? "pointer-events-none opacity-0" : "opacity-0 group-hover/rail:opacity-100"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
