"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Must match the key the consent script in layout.tsx reads on load. */
const CONSENT_KEY = "bookata-consent";

/** Dispatched by CookiePreferencesButton to show the banner again. */
export const OPEN_CONSENT_EVENT = "bookata:open-consent";

/**
 * Removes the GA4 cookies after a withdrawal. gtag stops writing them once
 * analytics_storage is denied but does not delete what is already there. They
 * are set on the registrable domain (.bookata.es), so every parent domain of
 * the current host is tried.
 */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", `; domain=${host}`];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

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

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const decide = (choice: Choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // The choice still applies to this page view.
    }
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: choice });
    }
    if (choice === "denied") clearAnalyticsCookies();
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
          cookies de publicidad.{" "}
          <Link href="/cookies" className="text-white underline underline-offset-4">
            Política de cookies
          </Link>
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
