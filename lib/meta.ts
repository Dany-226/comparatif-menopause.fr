import type { Metadata } from "next";
import { site } from "@/data/site";

/** Métadonnées d'une page : titre, description, adresse canonique et carte de partage. */
export function meta({
  titre,
  description,
  chemin,
  titreComplet = false,
}: {
  titre: string;
  description: string;
  chemin: string;
  titreComplet?: boolean;
}): Metadata {
  return {
    title: titreComplet ? { absolute: titre } : titre,
    description,
    alternates: { canonical: chemin },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.nom,
      title: titre,
      description,
      url: chemin,
      images: [{ url: "/photos/partage.jpg", width: 1200, height: 630 }],
    },
  };
}
