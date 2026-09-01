"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The interactive shell of a carousel: the scroll container, the arrows and the
 * edge detection. Nothing else.
 *
 * The cards arrive as `children`, already rendered on the server. That is the
 * whole point of this split: when a client component takes `books` as a prop,
 * React serializes every field of every book into the page payload, including
 * `synopsis` and `hook`, which a cover card never displays. On the home page
 * that was 192 KB of dead weight, 17% of the HTML.
 */
export default function CarouselRail({
  children,
}: {
  children: React.ReactNode;
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

  const arrowBase =
    "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/85 text-white shadow-xl backdrop-blur transition-all duration-200 hover:bg-ink hover:scale-105 lg:flex";

  return (
    <div className="group/rail relative mt-4">
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        aria-label="Anterior"
        className={`${arrowBase} left-3 ${
          atStart
            ? "pointer-events-none opacity-0"
            : "opacity-0 group-hover/rail:opacity-100"
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
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByPage(1)}
        aria-label="Siguiente"
        className={`${arrowBase} right-3 ${
          atEnd
            ? "pointer-events-none opacity-0"
            : "opacity-0 group-hover/rail:opacity-100"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
