import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import LegalPage from "@/components/LegalPage";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de cookies",
  description:
    "Las cookies de analítica que usa Bookata, para qué sirven, cuánto duran y cómo aceptarlas, rechazarlas o retirar el consentimiento.",
  path: "/cookies",
});

const GA_COOKIES = [
  {
    name: "_ga",
    purpose: "Distinguir visitas de forma seudónima para las estadísticas de uso.",
    duration: "2 años",
  },
  {
    name: "_ga_DBKB5VF49W",
    purpose: "Mantener el estado de la sesión en la propiedad de Google Analytics de Bookata.",
    duration: "2 años",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      description="Bookata solo usa cookies de analítica, y solo si las aceptas."
    >
      <h2>Qué cookies usamos</h2>
      <p>
        Bookata no usa cookies de publicidad ni de redes sociales. Las únicas
        cookies son las de Google Analytics 4, de origen propio (se guardan en
        el dominio bookata.es), y solo se instalan si pulsas Aceptar en el
        aviso de cookies.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-text">
              <th className="py-2 pr-4 font-semibold">Cookie</th>
              <th className="py-2 pr-4 font-semibold">Finalidad</th>
              <th className="py-2 font-semibold">Duración</th>
            </tr>
          </thead>
          <tbody>
            {GA_COOKIES.map((c) => (
              <tr key={c.name} className="border-b border-border align-top">
                <td className="py-2 pr-4 font-mono text-xs text-text">{c.name}</td>
                <td className="py-2 pr-4">{c.purpose}</td>
                <td className="py-2 whitespace-nowrap">{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Tu elección (aceptar o rechazar) se guarda en el almacenamiento local de
        tu navegador, no en una cookie, para no volver a preguntarte en cada
        página. Se borra si borras los datos del sitio en tu navegador.
      </p>

      <h2>Cómo aceptar, rechazar o retirar el consentimiento</h2>
      <p>
        La primera vez que entras aparece un aviso con dos botones del mismo
        tamaño, Aceptar y Rechazar. Mientras no aceptes, Google Analytics
        funciona sin cookies. Puedes cambiar de opinión cuando quieras con este
        botón, que vuelve a abrir el aviso; si rechazas después de haber
        aceptado, las cookies de analítica se borran.
      </p>
      <div>
        <CookiePreferencesButton />
      </div>
      <p>
        También puedes borrar o bloquear las cookies desde la configuración de
        tu navegador.
      </p>
    </LegalPage>
  );
}
