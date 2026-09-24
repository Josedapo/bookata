import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_DESCRIPTION } from "@/lib/config";
import { Outfit, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
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
            Two scripts on purpose. The four-line queue shim runs early so
            window.gtag always exists: an event fired before analytics has
            loaded is queued and delivered later, instead of being dropped on
            the floor. gtag.js itself stays lazyOnload because it costs about
            880 ms of main-thread blocking on a throttled mobile CPU, which
            took the home page from 90 ms to 970 ms of total blocking time and
            made its LCP swing between 3 and 9 seconds.
          */}
          {/*
            Consent Mode v2. Every storage type starts denied, so no _ga cookie
            is written until the visitor presses Aceptar in ConsentBanner. A
            choice already stored in localStorage is replayed here, before
            config, so a returning visitor who accepted is measured from the
            first hit. Ad storage stays denied for everyone: Bookata runs no
            ads. The key must match CONSENT_KEY in ConsentBanner.tsx.
          */}
          <Script id="ga4-queue" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = function(){window.dataLayer.push(arguments);};
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              try {
                if (localStorage.getItem('bookata-consent') === 'granted') {
                  gtag('consent', 'update', { analytics_storage: 'granted' });
                }
              } catch (e) {}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
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
        {GA_ID && <ConsentBanner />}
        <SpeedInsights />
      </body>
    </html>
  );
}
