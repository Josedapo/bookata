"use client";

/**
 * The affiliate CTA. The href, target, rel and the GA `click_amazon` event are
 * exactly the ones Bookata already used: only the styling and the placement
 * change. Do not alter the link or the tracking call.
 */
export default function AmazonButton({
  url,
  bookTitle,
  variant = "primary",
  id,
}: {
  url: string;
  bookTitle: string;
  variant?: "primary" | "compact";
  id?: string;
}) {
  const handleClick = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "click_amazon", {
        book_title: bookTitle,
        link_url: url,
      });
    }
  };

  const styles =
    variant === "primary"
      ? "w-full justify-center gap-2 px-8 py-4 text-base sm:w-auto sm:text-lg"
      : "justify-center gap-2 px-6 py-3 text-sm";

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className={`inline-flex items-center rounded-full bg-primary font-bold text-white shadow-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-xl active:scale-[0.98] ${styles}`}
    >
      Ver precio
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
    </a>
  );
}
