import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "amor")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de amor para adolescentes",
  description: "Libros de amor para adolescentes: primeros amores y emociones intensas que resuenan con la experiencia juvenil.",
  path: "/libros-amor-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
