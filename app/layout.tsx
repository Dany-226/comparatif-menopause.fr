import type { Metadata, Viewport } from "next";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import { Entete } from "@/components/Entete";
import { PiedDePage } from "@/components/PiedDePage";
import { MesureClics } from "@/components/MesureClics";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.nom, template: `%s | ${site.nom}` },
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { themeColor: "#F2F5EA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Vérification du domaine par impact.com : le robot lit l'attribut « value », d'où sa présence. */}
        <meta
          name="impact-site-verification"
          content="0b187ce8-7f39-4549-981a-793122ac3d37"
          {...({ value: "0b187ce8-7f39-4549-981a-793122ac3d37" } as object)}
        />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-encre focus:px-5 focus:py-3 focus:text-white"
        >
          Aller au contenu
        </a>
        <Entete />
        <main id="contenu">{children}</main>
        <PiedDePage />
        <MesureClics />
      </body>
    </html>
  );
}
