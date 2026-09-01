"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AGE_GROUPS, GENRES } from "@/lib/config";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes whatever was open.
  useEffect(() => {
    setMobileOpen(false);
    setGenresOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Transparent only while sitting over the home hero.
  const solid = !isHome || scrolled || mobileOpen;

  const navLink =
    "text-sm font-medium text-on-ink-soft transition-colors hover:text-on-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "border-b border-ink-line/60 bg-ink/95 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-19">
          {/*
            The logo is the existing brand artwork, untouched. Only its rendered
            height changes between breakpoints; the files, colours, proportions
            and shapes are exactly the ones Bookata already used.
          */}
          <Link href="/" className="flex flex-none items-center gap-2" aria-label="Bookata, inicio">
            <Image
              src="/images/brand/imagotype.png"
              alt=""
              width={566}
              height={441}
              priority
              className="h-8 w-auto sm:h-9"
            />
            <Image
              src="/images/brand/logo.png"
              alt="Bookata"
              width={973}
              height={256}
              priority
              className="h-6 w-auto sm:h-7"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
            <Link href="/" className={navLink}>
              Inicio
            </Link>
            <Link href="/por-edades" className={navLink}>
              Por edades
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setGenresOpen(true)}
              onMouseLeave={() => setGenresOpen(false)}
            >
              <button
                onClick={() => setGenresOpen((v) => !v)}
                aria-expanded={genresOpen}
                className={`${navLink} flex items-center gap-1`}
              >
                Géneros
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className={`transition-transform ${genresOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {genresOpen && (
                <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3">
                  <div className="animate-fade overflow-hidden rounded-2xl border border-ink-line bg-ink-soft p-2 shadow-2xl">
                    {GENRES.map((g) => (
                      <Link
                        key={g.id}
                        href={`/${g.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm text-on-ink-soft transition-colors hover:bg-ink-elevated hover:text-on-ink"
                      >
                        {g.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/colecciones" className={navLink}>
              Colecciones
            </Link>
          </nav>

          <div className="flex flex-none items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar libros"
              className="flex items-center gap-2 rounded-full border border-ink-line/70 px-3.5 py-2 text-sm font-medium text-on-ink-soft transition-colors hover:border-primary hover:text-on-ink sm:px-4"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <span className="hidden sm:inline">Buscar</span>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 text-on-ink md:hidden"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/*
        Sibling of <header> on purpose: the header's backdrop-blur creates a
        containing block for fixed descendants, which collapsed the drawer down
        to the header's own 64px box.
      */}
      {mobileOpen && (
        <div className="animate-fade fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink md:hidden">
          <nav className="shell py-6" aria-label="Navegación móvil">
            <Link
              href="/"
              className="block border-b border-ink-line/50 py-3.5 font-display text-xl font-semibold text-on-ink"
            >
              Inicio
            </Link>
            <Link
              href="/por-edades"
              className="block border-b border-ink-line/50 py-3.5 font-display text-xl font-semibold text-on-ink"
            >
              Por edades
            </Link>

            <p className="pt-6 pb-1 text-xs font-semibold uppercase tracking-widest text-on-ink-soft/60">
              Por edad
            </p>
            <div className="grid grid-cols-2 gap-2 pb-4">
              {AGE_GROUPS.map((ag) => (
                <Link
                  key={ag.range}
                  href={`/${ag.slug}`}
                  className="rounded-xl border border-ink-line/60 px-3 py-2.5 text-sm text-on-ink-soft"
                >
                  {ag.label}
                </Link>
              ))}
            </div>

            <p className="pt-2 pb-1 text-xs font-semibold uppercase tracking-widest text-on-ink-soft/60">
              Géneros
            </p>
            <div className="grid grid-cols-2 gap-2 pb-5">
              {GENRES.map((g) => (
                <Link
                  key={g.id}
                  href={`/${g.slug}`}
                  className="rounded-xl border border-ink-line/60 px-3 py-2.5 text-sm text-on-ink-soft"
                >
                  {g.label}
                </Link>
              ))}
            </div>

            <Link
              href="/colecciones"
              className="block border-t border-ink-line/50 py-3.5 font-display text-xl font-semibold text-on-ink"
            >
              Colecciones
            </Link>

            <div className="mt-6 flex gap-5 border-t border-ink-line/50 pt-5 text-sm text-on-ink-soft">
              <Link href="/sobre-bookata">Sobre Bookata</Link>
              <Link href="/como-seleccionamos">Cómo seleccionamos</Link>
            </div>
          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
