import type { Metadata } from "next";
import { GENRES } from "@/lib/config";
import { buildPageMetadata } from "@/lib/metadata";
import GenrePageTemplate from "@/components/GenrePageTemplate";

const genre = GENRES.find((g) => g.id === "aventuras")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros de aventuras para niños y adolescentes",
  description: "Libros de aventuras juveniles: exploraciones, viajes y héroes que mantienen el ritmo de principio a fin.",
  path: "/libros-aventuras-juvenil",
});

export default function Page() {
  return <GenrePageTemplate genre={genre} />;
}
