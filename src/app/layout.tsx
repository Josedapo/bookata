import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_DESCRIPTION } from "@/lib/config";
import { Outfit, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/*
 * GA4 measurement id for the Bookata property, created 2026-09-09. It is not a
 * secret: it ships in the HTML of every page by design, so it lives here rather
 * than in a Vercel environment variable, where a missing value would silently
 * mean no analytics at all. NEXT_PUBLIC_GA_ID still overrides it, which is what
 * a staging property would use.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-DBKB5VF49W";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1030",
};

export const metadata: Metadata = {
  verification: {
    google: "oYSYjFG44v1TZSHcp3_BPo2OJjDiWrTVy2niHiUnXd0",
  },
  title: {
    default: "Bookata — Libros infantiles y juveniles recomendados por edad",
    template: "%s | Bookata",
  },
  description: SITE_DESCRIPTION,
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
          {/*
            lazyOnload, not afterInteractive: gtag.js costs about 880 ms of
            main-thread blocking on a throttled mobile CPU, which took the home
            page from 90 ms to 970 ms of total blocking time and made its LCP
            swing between 3 and 9 seconds. Loading it after the page has settled
            keeps the measurement and costs only the events of a visitor who
            leaves within the first seconds.
          */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
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
