import Link from "next/link";
import { pilier } from "@/data/site";

export const metadata = { title: "Page introuvable", robots: { index: false } };

export default function Introuvable() {
  return (
    <div className="conteneur flex min-h-[50vh] flex-col items-start justify-center gap-5 py-20">
      <div className="surtitre">Erreur 404</div>
      <h1 className="titre-1 md:!text-[58px]">Cette page n'existe pas</h1>
      <p className="max-w-[34em] text-doux">L'adresse a peut-être changé. Le comparatif, lui, est toujours là.</p>
      <Link href={pilier} className="bouton bouton-foret">
        Voir le comparatif
      </Link>
    </div>
  );
}
