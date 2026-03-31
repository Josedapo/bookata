import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({
  items,
  variant = "default",
}: {
  items: BreadcrumbItem[];
  variant?: "default" | "light";
}) {
  const baseColor = variant === "light" ? "text-white/60" : "text-text-muted";
  const hoverColor = variant === "light" ? "hover:text-white" : "hover:text-primary";
  const activeColor = variant === "light" ? "text-white/80" : "text-text-secondary";

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-sm ${baseColor}`}>
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className={`${hoverColor} transition-colors`}>
            Inicio
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link
                href={item.href}
                className={`${hoverColor} transition-colors`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={activeColor}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
