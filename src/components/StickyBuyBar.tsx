"use client";

import { useEffect, useState } from "react";
import AmazonButton from "./AmazonButton";

/**
 * Mobile safety net for the price CTA. The main "Ver precio" already sits in
 * the first screen next to the cover; this bar only appears once that button
 * has scrolled out of view, so the price is never more than a tap away.
 */
export default function StickyBuyBar({
  url,
  title,
  watchId,
}: {
  url: string;
  title: string;
  watchId: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-ink/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-on-ink">
          {title}
        </p>
        <div className="flex-none">
          <AmazonButton url={url} bookTitle={title} variant="compact" />
        </div>
      </div>
    </div>
  );
}
