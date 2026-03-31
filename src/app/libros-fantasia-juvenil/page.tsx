import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "fantasia")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de fantasía para niños y adolescentes",
  description: "Los mejores libros de fantasía juvenil: mundos mágicos, criaturas extraordinarias y aventuras épicas para jóvenes lectores.",
  path: "/libros-fantasia-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
