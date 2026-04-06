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

      {/* Hero */}
      <section className="bg-warm-gradient -mx-4 -mt-8 mb-12 px-4 py-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 animate-reveal" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Image
            src="/images/brand/imagotype.png"
            alt=""
            width={80}
            height={80}
            className="h-20 w-auto"
          />
          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Encuentra el libro perfecto para tu hijo
          </h1>
          <p className="text-lg text-white/90">
            Recomendaciones por edad y género seleccionadas por nuestros expertos, con opinión editorial para que aciertes seguro.
          </p>
        </div>
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
