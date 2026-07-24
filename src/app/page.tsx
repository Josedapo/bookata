import Image from "next/image";
import { getBooksByAge } from "@/lib/data";
import { AGE_GROUPS } from "@/lib/config";
import { buildWebsiteJsonLd, buildOrganizationJsonLd } from "@/lib/jsonld";
import BookCarousel from "@/components/BookCarousel";
import GenreNav from "@/components/GenreNav";

export default function HomePage() {
  const booksByAge = AGE_GROUPS.map((ag) => ({
    ...ag,
    books: getBooksByAge(ag.range),
  }));

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

      {/* Hero banner */}
      <section className="-mt-8 mb-12 animate-reveal" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <h1 className="sr-only">
          Encuentra el libro perfecto para tu hijo: recomendaciones por edad y género
        </h1>
        <Image
          src="/images/brand/banner-cabecera.png"
          alt="Bookata: libros infantiles y juveniles recomendados por edad y género"
          width={1536}
          height={470}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </section>

      {/* Carousels by age, interleaved with genre nav */}
      <div className="space-y-12">
        {booksByAge.map((ag, i) => {
          const prefix = parseInt(ag.range.split("-")[0]) >= 12 ? "adolescentes" : "niños";
          return (
            <div key={ag.range}>
              {i === 3 && <div className="mb-12"><GenreNav /></div>}
              <BookCarousel
                title={`Libros para ${prefix} de ${ag.label}`}
                books={ag.books}
                href={`/${ag.slug}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
