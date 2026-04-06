import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "valores")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de valores para niños y adolescentes",
  description: "Libros que transmiten valores a niños y adolescentes: empatía, respeto, amistad y superación a través de historias que emocionan y dejan huella.",
  path: "/libros-valores-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
