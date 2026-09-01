import type { ReactNode } from "react";

/**
 * Dark editorial band that opens every inner page. Carries the H1 and the
 * descriptive copy that the age and genre pages already had, so the SEO text is
 * preserved rather than dropped in favour of imagery.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink pb-12 pt-24 sm:pb-16 sm:pt-32">
      <div className="shell">
        {breadcrumbs}
        <div className="animate-reveal max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2.5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-on-ink-soft sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
