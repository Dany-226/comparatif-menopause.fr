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
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#F2F5EA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
