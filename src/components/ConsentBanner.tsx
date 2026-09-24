"use client";

import { useEffect, useState } from "react";

/** Must match the key the consent script in layout.tsx reads on load. */
const CONSENT_KEY = "bookata-consent";

type Choice = "granted" | "denied";

/**
 * Cookie consent for GA4 (Consent Mode v2). The layout sets every storage type
 * to "denied" before gtag config runs; this banner is the only thing that can
 * lift analytics_storage. Aceptar and Rechazar carry the same visual weight on
 * purpose (AEPD guidance: refusing must be as easy as accepting).
 *
 * Rendered only on the client and only when no choice is stored, so it never
 * appears in the static HTML and never shifts layout: it floats over the page.
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      // Storage blocked: ask every time rather than assume either answer.
    }
    if (stored !== "granted" && stored !== "denied") setOpen(true);
  }, []);

  const decide = (choice: Choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // The choice still applies to this page view.
    }
    if (choice === "granted" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    setOpen(false);
  };

  if (!open) return null;

  const button =
    "flex-1 rounded-full border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/15 sm:flex-none";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-ink-line bg-ink/97 p-4 shadow-2xl backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-sm leading-relaxed text-on-ink-soft">
          Usamos cookies de analítica (Google Analytics) para saber qué libros
          os resultan útiles. Solo se activan si las aceptas, y no usamos
          cookies de publicidad.
        </p>
        <div className="flex flex-none gap-2.5">
          <button type="button" className={button} onClick={() => decide("denied")}>
            Rechazar
          </button>
          <button type="button" className={button} onClick={() => decide("granted")}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
