"use client";

import { OPEN_CONSENT_EVENT } from "./ConsentBanner";

/** Reopens the consent banner so a visitor can change or withdraw a choice. */
export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="rounded-full border border-border px-5 py-2.5 text-sm font-bold text-text transition-colors hover:border-primary hover:text-primary-dark"
    >
      Cambiar mis preferencias de cookies
    </button>
  );
}
