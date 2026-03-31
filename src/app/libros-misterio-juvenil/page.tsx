import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "misterio")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de misterio para niños y adolescentes",
  description: "Los mejores libros de misterio para jóvenes: enigmas, pistas y finales sorprendentes para mentes curiosas.",
  path: "/libros-misterio-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
