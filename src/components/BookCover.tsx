"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Fills its parent, which is always an aspect-2/3 box. Falls back to a typeset
 * card if Amazon ever stops serving a cover, so a rail never shows a hole.
 */
export default function BookCover({
  src,
  title,
  author,
  sizes,
  priority = false,
}: {
  src: string | null;
  title: string;
  author?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-ink-elevated p-3 text-center">
        <p className="font-display text-sm font-semibold leading-tight text-on-ink">
          {title}
        </p>
        {author && <p className="text-xs text-on-ink-soft">{author}</p>}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Portada de ${title}`}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
    />
  );
}
