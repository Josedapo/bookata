"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AGE_GROUPS, GENRES } from "@/lib/config";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/brand/imagotype.png"
            alt="Bookata"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
          <Image
            src="/images/brand/logo.png"
            alt="Bookata"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="group relative">
            <span className="cursor-pointer text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Por edad
            </span>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-border bg-surface-card p-3 shadow-lg min-w-[200px]">
                {AGE_GROUPS.map((ag) => (
                  <Link
                    key={ag.range}
                    href={`/${ag.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-primary transition-colors"
                  >
                    {ag.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <span className="cursor-pointer text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Por género
            </span>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-border bg-surface-card p-3 shadow-lg min-w-[200px]">
                {GENRES.map((g) => (
                  <Link
                    key={g.id}
                    href={`/${g.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-primary transition-colors"
                  >
                    {g.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/sobre-bookata"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            Sobre Bookata
          </Link>
          <Link
            href="/como-seleccionamos"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            Cómo seleccionamos
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary"
          aria-label="Menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface-card px-4 pb-4 md:hidden">
          <div className="py-3">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Por edad
            </p>
            {AGE_GROUPS.map((ag) => (
              <Link
                key={ag.range}
                href={`/${ag.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:text-primary"
              >
                {ag.label}
              </Link>
            ))}
          </div>
          <div className="py-3">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Por género
            </p>
            {GENRES.map((g) => (
              <Link
                key={g.id}
                href={`/${g.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:text-primary"
              >
                {g.label}
              </Link>
            ))}
          </div>
          <Link
            href="/sobre-bookata"
            onClick={() => setMobileOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary"
          >
            Sobre Bookata
          </Link>
          <Link
            href="/como-seleccionamos"
            onClick={() => setMobileOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary"
          >
            Cómo seleccionamos
          </Link>
        </div>
      )}
    </header>
  );
}
