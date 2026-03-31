import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "ciencia-ficcion")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de ciencia ficción para jóvenes",
  description: "Libros de ciencia ficción juvenil: futuros posibles, viajes espaciales y reflexiones envueltas en historias trepidantes.",
  path: "/libros-ciencia-ficcion-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
