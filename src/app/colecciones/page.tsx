import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { BASE_URL } from "@/lib/config";
import { getPopulatedCollections, getCoversForCollection } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import CoverMosaic from "@/components/CoverMosaic";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildPageMetadata({
  title: "Colecciones Bookata — Selecciones de libros por tipo de lector",
  description:
    "Colecciones de libros infantiles y juveniles que cruzan edades y géneros: para lectores que devoran historias, para quienes dicen que no les gusta leer, misterios, clásicos que nunca fallan y más.",
  path: "/colecciones",
});

export default function ColeccionesPage() {
  const collections = getPopulatedCollections();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Inicio", url: BASE_URL },
              { name: "Colecciones" },
            ])
          ),
        }}
      />

      <PageHeader
        eyebrow="Descubrir"
        title="Colecciones Bookata"
        description="Selecciones que cruzan edades y géneros, para cuando no buscas un título concreto sino un tipo de lectura."
        breadcrumbs={<Breadcrumbs variant="light" items={[{ label: "Colecciones" }]} />}
      />

      <div className="shell grid gap-4 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-3">
        {collections.map(({ collection, books }) => (
          <Link
            key={collection.id}
            href={`/colecciones/${collection.slug}`}
            className="group relative block h-52 overflow-hidden rounded-2xl shadow-cover transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-cover-lift"
          >
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
              <CoverMosaic
                covers={getCoversForCollection(collection, 3)}
                sizes="(min-width: 1024px) 145px, (min-width: 640px) 16vw, 33vw"
              />
            </div>
            <div className="scrim-tile absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h2 className="font-display text-xl font-bold leading-tight text-white">
                {collection.label}
              </h2>
              <p className="mt-1 text-sm text-primary">{collection.tagline}</p>
              <p className="mt-1 text-xs text-white/60">{books.length} libros</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
