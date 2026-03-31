"use client";

import Image from "next/image";
import { useState } from "react";

export default function BookCover({
  src,
  title,
  author,
  genreColor,
  size = "card",
}: {
  src: string;
  title: string;
  author: string;
  genreColor: string;
  size?: "card" | "detail";
}) {
  const [hasError, setHasError] = useState(false);

  const dimensions =
    size === "detail"
      ? { width: 200, height: 300, className: "h-64 w-auto" }
      : { width: 128, height: 192, className: "h-48 w-auto" };

  if (hasError) {
    return (
      <div className="text-center p-6">
        <p
          className="font-display text-lg font-bold leading-tight"
          style={{ color: genreColor }}
        >
          {title}
        </p>
        <p className="mt-2 text-sm text-text-secondary">{author}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`Portada de ${title}`}
      width={dimensions.width}
      height={dimensions.height}
      className={`${dimensions.className} rounded shadow-md object-contain`}
      onError={() => setHasError(true)}
    />
  );
}
