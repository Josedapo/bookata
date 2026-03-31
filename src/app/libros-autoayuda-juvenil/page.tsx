import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "autoayuda")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de crecimiento personal para niños y adolescentes",
  description: "Libros que inspiran a niños y adolescentes a conocerse mejor y desarrollar empatía a través de historias que dejan huella.",
  path: "/libros-autoayuda-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
