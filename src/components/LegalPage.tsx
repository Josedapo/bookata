import type { ReactNode } from "react";
import { LEGAL_UPDATED } from "@/lib/config";
import Breadcrumbs from "./Breadcrumbs";
import PageHeader from "./PageHeader";

/** Shared shell for the aviso legal, privacy and cookies pages. */
export default function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Información legal"
        title={title}
        description={description}
        breadcrumbs={<Breadcrumbs variant="light" items={[{ label: title }]} />}
      />
      <article className="shell py-12 sm:py-16">
        <div className="legal mx-auto max-w-2xl space-y-5 leading-relaxed text-text-secondary">
          {children}
          <p className="pt-4 text-sm">Última actualización: {LEGAL_UPDATED}.</p>
        </div>
      </article>
    </>
  );
}
