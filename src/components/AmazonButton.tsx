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
      className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white hover:bg-primary-dark transition-colors shadow-md"
    >
      Ver en Amazon
    </a>
  );
}
