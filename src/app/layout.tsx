import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

const display = Archivo({ subsets: ["latin"], variable: "--font-archivo", axes: ["wdth"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Pipeline, Integrity & Equipment Solutions`,
    template: `%s | ${site.short}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/images/stock/night-plant-4.jpg", width: 2200, height: 1466 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#003198" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 7B Road 7B, Victory Estate, Elelenwo",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-berry focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
