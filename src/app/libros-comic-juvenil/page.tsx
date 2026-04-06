import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "comic")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Cómics y novelas gráficas para niños y adolescentes",
  description: "Cómics y novelas gráficas para niños y adolescentes: historias visuales que enganchan desde la primera viñeta, perfectas para todos los niveles de lectura.",
  path: "/libros-comic-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
