import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "educativo")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros educativos para niños y adolescentes",
  description: "Libros educativos para niños y adolescentes: ciencia, historia, naturaleza y curiosidades del mundo explicadas de forma amena y visual.",
  path: "/libros-educativos-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
