"use client";

export default function AmazonButton({
  url,
  bookTitle,
}: {
  url: string;
  bookTitle: string;
}) {
  const handleClick = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "click_amazon", {
        book_title: bookTitle,
        link_url: url,
      });
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white hover:bg-red-700 transition-colors"
    >
      Comprar en Amazon
    </a>
  );
}
