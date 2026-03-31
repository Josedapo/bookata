import Link from "next/link";
import { AGE_GROUPS } from "@/lib/config";

export default function AgeGroupNav() {
  return (
    <section className="animate-reveal-delay-1">
      <h2 className="mb-4 font-display text-2xl font-bold text-text">
        Por edad
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {AGE_GROUPS.map((ag) => (
          <Link
            key={ag.range}
            href={`/${ag.slug}`}
            className="book-card-hover group rounded-xl border border-border bg-surface-card p-5 text-center"
          >
            <span className="block font-display text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">
              {ag.range}
            </span>
            <span className="mt-1 block text-sm text-text-secondary">años</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
