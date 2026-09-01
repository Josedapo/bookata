import Image from "next/image";

/**
 * The tile artwork for genres, ages and collections is built from real covers
 * in the catalogue. Bookata has no stock image bank and the brief forbids
 * inventing content, so the books themselves are the imagery.
 *
 * Decorative by design: the visible label carries the meaning, so these images
 * take an empty alt rather than repeating the label to a screen reader.
 */
export default function CoverMosaic({
  covers,
  sizes = "(min-width: 1024px) 110px, 33vw",
}: {
  covers: string[];
  sizes?: string;
}) {
  if (covers.length === 0) {
    return <div className="absolute inset-0 bg-ink-elevated" />;
  }

  return (
    <div className="absolute inset-0 flex" aria-hidden="true">
      {covers.map((cover, i) => (
        <div key={`${cover}-${i}`} className="relative h-full flex-1">
          <Image
            src={cover}
            alt=""
            fill
            sizes={sizes}
            loading="lazy"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
