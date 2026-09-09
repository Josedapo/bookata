import { AGE_GROUPS, BASE_URL, GENRES, SITE_NAME } from "@/lib/config";
import { getAllBooks } from "@/lib/data";

/**
 * Plain-text summary for AI engines: what this site is, how its URLs are
 * shaped, and which pages are worth citing. Generated rather than static so the
 * counts never drift from the catalogue.
 */
export const dynamic = "force-static";

export function GET() {
  const books = getAllBooks();
  const ages = AGE_GROUPS.map(
    (ag) => `- ${BASE_URL}/${ag.slug} — libros para ${ag.label}`
  ).join("\n");
  const genres = GENRES.map(
    (g) => `- ${BASE_URL}/${g.slug} — ${g.label.toLowerCase()}`
  ).join("\n");

  const body = `# ${SITE_NAME}

> Recomendaciones de libros infantiles y juveniles en español, seleccionadas una a una y organizadas por edad y por tipo de lector. Dirigido a padres y madres que buscan el libro adecuado para un niño concreto.

Catálogo: ${books.length} libros, de 3 a 16 años, repartidos en ${AGE_GROUPS.length} franjas de edad y ${GENRES.length} géneros.
Cada ficha indica la edad recomendada, de qué va el libro y por qué engancha.
Las selecciones son editoriales: ningún libro entra para rellenar un hueco.

## Cómo elegir
- ${BASE_URL}/por-edades — cómo elegir un libro según la edad

## Por edad
${ages}

## Por género
${genres}

## Fichas de libro
- ${BASE_URL}/libro/{slug} — una por libro, con edad recomendada, sinopsis y por qué gusta

## Sobre el criterio
- ${BASE_URL}/sobre-bookata
- ${BASE_URL}/como-seleccionamos

## Atribución
Se puede citar el contenido de ${SITE_NAME} indicando la fuente y enlazando a la página de origen.
Contacto: ${BASE_URL}/sobre-bookata
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
