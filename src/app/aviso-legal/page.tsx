import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, LEGAL_OWNER } from "@/lib/config";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Aviso legal",
  description:
    "Titular de Bookata, datos de contacto, finalidad del sitio, enlaces de afiliado de Amazon y propiedad intelectual de los contenidos.",
  path: "/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <LegalPage
      title="Aviso legal"
      description="Quién está detrás de Bookata y en qué condiciones puedes usar el sitio."
    >
      <h2>Titular del sitio</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la
        sociedad de la información y de comercio electrónico (LSSI), se informa
        de que el titular de bookata.es es {LEGAL_OWNER}.
      </p>
      <p>
        Contacto: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Finalidad del sitio</h2>
      <p>
        Bookata es un sitio de recomendaciones de libros infantiles y juveniles,
        organizadas por edad, género y tipo de lector, para ayudar a madres y
        padres a elegir un libro para un niño o adolescente concreto. Bookata no
        vende libros: cada ficha enlaza a Amazon, donde se realiza la compra.
      </p>

      <h2>Enlaces de afiliado</h2>
      <p>
        Bookata participa en el Programa de Afiliados de Amazon EU, un programa
        de publicidad para afiliados diseñado para ofrecer a sitios web un modo
        de obtener comisiones por publicidad. Cuando compras en Amazon después
        de pulsar un enlace de Bookata, el titular recibe una pequeña comisión,
        sin coste adicional para ti. Los precios, la disponibilidad y la venta
        son responsabilidad de Amazon.
      </p>
      <p>
        Las recomendaciones no dependen de la comisión: cada libro se elige por
        su interés para la edad a la que se recomienda.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos editoriales de Bookata (las recomendaciones, las
        descripciones de las selecciones y las guías por edad) son obra del
        titular y no pueden reproducirse sin su autorización, salvo citas
        breves con enlace a la página de origen.
      </p>
      <p>
        Las portadas, títulos y nombres de autores pertenecen a sus
        respectivas editoriales y autores, y se muestran solo para identificar
        cada libro. Las portadas se obtienen de Amazon.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Bookata no se hace responsable del contenido de los sitios externos a
        los que enlaza, incluida la tienda de Amazon.
      </p>

      <h2>Privacidad y cookies</h2>
      <p>
        El tratamiento de datos personales se explica en la{" "}
        <Link href="/privacidad">política de privacidad</Link> y el uso de
        cookies en la <Link href="/cookies">política de cookies</Link>.
      </p>
    </LegalPage>
  );
}
