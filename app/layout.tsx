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
  title: "CESNULIS.ORG — Neue Website in Vorbereitung",
  description:
    "CESNULIS.ORG, Zürich. Die neue Website ist in Vorbereitung. Anfragen per E-Mail an info@cesnulis.org.",
  metadataBase: new URL("https://cesnulis.org"),
  openGraph: {
    title: "CESNULIS.ORG — Neue Website in Vorbereitung",
    description:
      "CESNULIS.ORG, Zürich. Anfragen per E-Mail an info@cesnulis.org.",
    url: "https://cesnulis.org",
    siteName: "CESNULIS.ORG",
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
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) inject
          attributes on <body> before React hydrates. This only silences
          attribute mismatches on this one element, not its children. */}
      <body className="min-h-full" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
