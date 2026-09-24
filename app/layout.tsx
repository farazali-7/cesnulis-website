import type { Metadata } from "next";
import { Geist_Mono, Source_Serif_4 } from "next/font/google";

import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KARABULUT — Neue Website in Vorbereitung",
  description:
    "Ferhat Karabulut, Zürich. Die neue Website ist in Vorbereitung. Anfragen per E-Mail an info@karabulut.ch.",
  metadataBase: new URL("https://karabulut.ch"),
  openGraph: {
    title: "KARABULUT — Neue Website in Vorbereitung",
    description:
      "Ferhat Karabulut, Zürich. Anfragen per E-Mail an info@karabulut.ch.",
    url: "https://karabulut.ch",
    siteName: "KARABULUT",
    locale: "de_CH",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${sourceSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
