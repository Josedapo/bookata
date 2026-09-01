import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/*
 * Set NEXT_PUBLIC_GA_ID in the Vercel project (and in .env.local for local
 * runs). While it is unset, no analytics script is injected at all: the old
 * hardcoded "G-XXXXXXXXXX" placeholder made every page load googletagmanager
 * for a property that does not exist, so the `click_amazon` events had nowhere
 * to land and the request was pure waste.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1030",
};

export const metadata: Metadata = {
  title: {
    default: "Bookata — Libros infantiles y juveniles recomendados por edad",
    template: "%s | Bookata",
  },
  description:
    "Descubre los mejores libros para niños y adolescentes organizados por edad y género. Recomendaciones curadas para padres con opinión editorial y enlace de compra.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        <Header />
        {/*
          No container here on purpose: sections opt into `.shell` themselves so
          heroes and dark bands can run edge to edge.
        */}
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
