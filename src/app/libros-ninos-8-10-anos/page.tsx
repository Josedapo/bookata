import type { Metadata } from "next";
import { AGE_GROUPS } from "@/lib/config";
import { getBooksByAge } from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import AgePageTemplate from "@/components/AgePageTemplate";

const ageGroup = AGE_GROUPS.find((ag) => ag.range === "8-10")!;

const bookCount = getBooksByAge(ageGroup.range).length;

export const metadata: Metadata = buildPageMetadata({
  title: "Libros para niños de 8 a 10 años recomendados",
  description: `${bookCount} libros para niños de 8 a 10 años, elegidos uno a uno y agrupados por tipo de lector. Con edad recomendada y por qué engancha cada uno.`,
  path: "/libros-ninos-8-10-anos",
});

export default function Page() {
  return <AgePageTemplate ageGroup={ageGroup} />;
}
