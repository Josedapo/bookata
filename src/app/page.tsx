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
      <section className="bg-warm-gradient -mx-4 -mt-8 mb-12 px-4 py-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 animate-reveal rounded-b-3xl">
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
            Recomendaciones curadas por edad y género, con opinión editorial para que aciertes seguro.
          </p>
        </div>
      </section>

      {/* Carousels by age, interleaved with genre nav */}
      <div className="space-y-12">
        {/* Age 6-8 */}
        <BookCarousel
          title={`Libros para niños de ${booksByAge[0].label}`}
          books={booksByAge[0].books}
          href={`/${booksByAge[0].slug}`}
        />

        {/* Age 8-10 */}
        <BookCarousel
          title={`Libros para niños de ${booksByAge[1].label}`}
          books={booksByAge[1].books}
          href={`/${booksByAge[1].slug}`}
        />

        {/* Genre navigation */}
        <GenreNav />

        {/* Age 10-12 */}
        <BookCarousel
          title={`Libros para niños de ${booksByAge[2].label}`}
          books={booksByAge[2].books}
          href={`/${booksByAge[2].slug}`}
        />

        {/* Age 12-14 */}
        <BookCarousel
          title={`Libros para adolescentes de ${booksByAge[3].label}`}
          books={booksByAge[3].books}
          href={`/${booksByAge[3].slug}`}
        />

        {/* Age 14-16 */}
        <BookCarousel
          title={`Libros para adolescentes de ${booksByAge[4].label}`}
          books={booksByAge[4].books}
          href={`/${booksByAge[4].slug}`}
        />
      </div>
    </>
  );
}
