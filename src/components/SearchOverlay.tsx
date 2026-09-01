"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AGE_GROUPS, GENRES } from "@/lib/config";
import type { AgeRange, Genre } from "@/lib/types";

interface SearchEntry {
  t: string;
  a: string;
  s: string;
  c: string;
  ag: AgeRange[];
  g: Genre[];
}

const MAX_RESULTS = 60;

/** Accent-insensitive so "fantasia" finds "Fantasía" and "Jose" finds "José". */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [age, setAge] = useState<AgeRange | null>(null);
  const [genre, setGenre] = useState<Genre | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetched on first open only, then kept for the rest of the session.
  useEffect(() => {
    if (!open || index) return;
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {
        if (!cancelled) setIndex([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, index]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  const matches = useMemo(() => {
    if (!index) return [];
    const q = normalize(query.trim());
    const terms = q ? q.split(/\s+/) : [];

    return index
      .filter((entry) => {
        if (age && !entry.ag.includes(age)) return false;
        if (genre && !entry.g.includes(genre)) return false;
        if (terms.length === 0) return true;

        // Genre and age labels are searchable too, so "misterio 10" works.
        const genreLabels = entry.g
          .map((g) => GENRES.find((gi) => gi.id === g)?.label ?? g)
          .join(" ");
        const ageLabels = entry.ag
          .map((a) => `${a} ${AGE_GROUPS.find((ag) => ag.range === a)?.label ?? ""}`)
          .join(" ");
        const haystack = normalize(
          `${entry.t} ${entry.a} ${genreLabels} ${ageLabels}`
        );
        return terms.every((term) => haystack.includes(term));
      });
  }, [index, query, age, genre]);

  // Render a bounded slice so a broad query does not mount the whole catalogue,
  // but always report the true number of matches.
  const results = matches.slice(0, MAX_RESULTS);

  const hasFilters = Boolean(age || genre);
  const isSearching = query.trim().length > 0 || hasFilters;

  if (!open) return null;

  return (
    <div
      className="animate-fade fixed inset-0 z-[100] flex flex-col bg-ink/98 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar libros"
    >
      <div className="shell flex-none pt-5 pb-4 sm:pt-7">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-ink-soft"
              width="20"
              height="20"
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
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué libro estás buscando?"
              aria-label="¿Qué libro estás buscando?"
              className="w-full rounded-full border border-ink-line bg-ink-soft py-3.5 pl-12 pr-4 text-base text-on-ink placeholder:text-on-ink-soft/70 focus:border-primary focus:outline-none sm:text-lg"
            />
          </div>
          <button
            onClick={onClose}
            className="flex-none rounded-full border border-ink-line px-4 py-3 text-sm font-semibold text-on-ink-soft transition-colors hover:border-primary hover:text-on-ink"
          >
            Cerrar
          </button>
        </div>

        {/* Filters: Edad and Género, per the brief's discovery-tool framing. */}
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="flex-none text-xs font-semibold uppercase tracking-widest text-on-ink-soft/60">
              Edad
            </span>
            {AGE_GROUPS.map((ag) => (
              <button
                key={ag.range}
                onClick={() => setAge(age === ag.range ? null : ag.range)}
                className={`flex-none rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  age === ag.range
                    ? "border-primary bg-primary text-white"
                    : "border-ink-line text-on-ink-soft hover:border-primary/60 hover:text-on-ink"
                }`}
              >
                {ag.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="flex-none text-xs font-semibold uppercase tracking-widest text-on-ink-soft/60">
              Género
            </span>
            {GENRES.map((g) => (
              <button
                key={g.id}
                onClick={() => setGenre(genre === g.id ? null : g.id)}
                className={`flex-none rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  genre === g.id
                    ? "border-primary bg-primary text-white"
                    : "border-ink-line text-on-ink-soft hover:border-primary/60 hover:text-on-ink"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-16">
        <div className="shell">
          {!index && (
            <p className="py-10 text-center text-on-ink-soft">Cargando el catálogo…</p>
          )}

          {index && !isSearching && (
            <p className="py-10 text-center text-on-ink-soft">
              Busca por título, autor, género o edad. También puedes empezar por
              un filtro de arriba.
            </p>
          )}

          {index && isSearching && results.length === 0 && (
            <p className="py-10 text-center text-on-ink-soft">
              No hemos encontrado ningún libro con esa búsqueda. Prueba con otro
              título, autor o género.
            </p>
          )}

          {index && isSearching && results.length > 0 && (
            <>
              <p className="pb-4 text-sm text-on-ink-soft">
                {matches.length} {matches.length === 1 ? "libro" : "libros"}
                {matches.length > results.length && (
                  <span className="text-on-ink-soft/60">
                    {" "}· mostrando los {results.length} primeros
                  </span>
                )}
              </p>
              <ul className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 lg:grid-cols-6">
                {results.map((entry) => (
                  <li key={entry.s}>
                    <Link
                      href={`/libro/${entry.s}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-ink-soft shadow-cover">
                        {entry.c ? (
                          <Image
                            src={entry.c}
                            alt={`Portada de ${entry.t}`}
                            fill
                            sizes="(min-width: 1024px) 160px, 30vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center p-2 text-center text-xs text-on-ink-soft">
                            {entry.t}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-on-ink">
                        {entry.t}
                      </p>
                      <p className="line-clamp-1 text-xs text-on-ink-soft">
                        {entry.a}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
