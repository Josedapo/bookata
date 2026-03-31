import { getAllBooks } from "@/lib/data";
import { buildWebsiteJsonLd, buildOrganizationJsonLd, buildItemListJsonLd } from "@/lib/jsonld";
import AgeGroupNav from "@/components/AgeGroupNav";
import GenreNav from "@/components/GenreNav";
import BookGrid from "@/components/BookGrid";

export default function HomePage() {
  const books = getAllBooks();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebsiteJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildItemListJsonLd(books, "Libros recomendados")),
        }}
      />

      <section className="bg-warm-gradient -mx-4 -mt-8 mb-12 px-4 py-16 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 animate-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold leading-tight text-text sm:text-5xl">
            Encuentra el libro perfecto para tu hijo
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Recomendaciones curadas de libros infantiles y juveniles, organizadas
            por edad y género. Cada libro con nuestra opinión editorial para que
            aciertes seguro.
          </p>
        </div>
      </section>

      <div className="space-y-12">
        <AgeGroupNav />
        <GenreNav />
        <BookGrid books={books} title="Todos los libros" />
      </div>
    </>
  );
}
