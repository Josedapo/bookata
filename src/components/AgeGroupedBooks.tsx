import { AGE_GROUPS } from "@/lib/config";
import type { AgeBlock } from "@/lib/data";
import BookGrid from "./BookGrid";

export const ageAnchor = (range: string) => `edad-${range}`;

/**
 * A mixed-age list split into one labelled block per age range, youngest
 * first, with a row of chips that jumps to each block. Used by genre pages and
 * collections, where a single grid made a parent sift 3-year-old picture books
 * out of a list for an eleven-year-old.
 */
export default function AgeGroupedBooks({
  blocks,
  showBadge = true,
}: {
  blocks: AgeBlock[];
  showBadge?: boolean;
}) {
  if (blocks.length === 0) return null;

  const labelFor = (range: string) =>
    AGE_GROUPS.find((ag) => ag.range === range)?.label ?? `${range} años`;

  return (
    <>
      <nav aria-label="Ir a una edad" className="-mt-2 mb-10">
        <p className="text-sm font-semibold text-text">¿Qué edad tiene?</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {blocks.map((block) => (
            <li key={block.range}>
              <a
                href={`#${ageAnchor(block.range)}`}
                className="inline-block rounded-full border border-border bg-surface-card px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
              >
                {labelFor(block.range)}
                <span className="ml-1.5 text-text-secondary">{block.books.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-14">
        {blocks.map((block) => (
          <section
            key={block.range}
            id={ageAnchor(block.range)}
            className="scroll-mt-24"
            aria-labelledby={`${ageAnchor(block.range)}-title`}
          >
            <h2
              id={`${ageAnchor(block.range)}-title`}
              className="mb-6 font-display text-2xl font-bold text-text"
            >
              Para {labelFor(block.range)}
              <span className="ml-2 text-base font-medium text-text-secondary">
                {block.books.length} libros
              </span>
            </h2>
            <BookGrid books={block.books} showBadge={showBadge} />
          </section>
        ))}
      </div>
    </>
  );
}
