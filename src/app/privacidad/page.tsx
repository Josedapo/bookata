import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, LEGAL_OWNER } from "@/lib/config";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de privacidad",
  description:
    "Qué datos trata Bookata, con qué base legal, durante cuánto tiempo y cómo ejercer tus derechos.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      description="Bookata no tiene cuentas de usuario ni formularios. Esto es todo lo que trata."
    >
      <h2>Responsable del tratamiento</h2>
      <p>
        {LEGAL_OWNER}. Contacto:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Qué datos se tratan</h2>
      <p>
        Bookata no tiene cuentas de usuario, formularios ni boletines, así que
        no te pide ningún dato personal. Los únicos tratamientos son estos:
      </p>
      <ul>
        <li>
          <strong>Analítica (Google Analytics 4), solo si la aceptas.</strong>{" "}
          Si pulsas Aceptar en el aviso de cookies, Google Analytics registra
          de forma seudónima qué páginas visitas, qué fichas de libro abres y
          cuándo pulsas un enlace a Amazon, junto con datos técnicos de tu
          navegador y tu ubicación aproximada. Sirve para saber qué
          recomendaciones resultan útiles. Mientras no aceptes, o si pulsas
          Rechazar, Google Analytics ni siquiera se carga: no se envía nada a
          Google ni se guarda ninguna cookie de analítica.
        </li>
        <li>
          <strong>Alojamiento.</strong> El sitio se sirve desde Vercel, que
          trata los datos técnicos necesarios para entregar cada página (como
          la dirección IP) y mide el rendimiento de carga de forma agregada y
          sin cookies (Vercel Speed Insights).
        </li>
        <li>
          <strong>Enlaces a Amazon.</strong> Al pulsar «Ver precio» sales de
          Bookata hacia Amazon, que trata tus datos según su propia política
          de privacidad.
        </li>
      </ul>

      <h2>Base legal</h2>
      <p>
        La analítica se basa en tu consentimiento (artículo 6.1.a del RGPD),
        que puedes retirar en cualquier momento desde la{" "}
        <Link href="/cookies">política de cookies</Link>. Los datos técnicos
        de alojamiento se tratan por el interés legítimo en servir el sitio de
        forma segura (artículo 6.1.f del RGPD).
      </p>

      <h2>Destinatarios</h2>
      <p>
        Google (Google Analytics) y Vercel, como proveedores del servicio.
        Ambos pueden tratar datos fuera del Espacio Económico Europeo con las
        garantías previstas en el RGPD. No se venden ni se ceden datos a nadie
        más.
      </p>

      <h2>Conservación</h2>
      <p>
        Los datos de Google Analytics se conservan durante el plazo de
        conservación configurado en la propiedad de Google Analytics de
        Bookata y después se eliminan. Las cookies de analítica caducan a los
        dos años o cuando retiras el consentimiento.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión,
        oposición, limitación del tratamiento y portabilidad escribiendo a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Como Bookata
        no conoce tu identidad, en la práctica la forma más directa de
        oponerte a la analítica es rechazarla o retirar el consentimiento en
        el aviso de cookies.
      </p>
      <p>
        Si consideras que el tratamiento no se ajusta a la normativa, puedes
        presentar una reclamación ante la Agencia Española de Protección de
        Datos (<a href="https://www.aepd.es">www.aepd.es</a>).
      </p>
    </LegalPage>
  );
}
