import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBar } from "@/components/layout/MobileBar";
import { ReservationProvider } from "@/components/layout/Reservation";
import { site } from "@/data/site";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});
const sans = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}/`),
  title: { default: `${site.name}, ${site.descriptor}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: `${site.name}, ${site.descriptor}`, description: site.description, locale: "en_GB" },
  alternates: { canonical: `${site.url}/` },
};

export const viewport: Viewport = { themeColor: "#191817", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <ReservationProvider>
          <Header />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <MobileBar />
        </ReservationProvider>
      </body>
    </html>
  );
}
