import Link from "next/link";
import { pagesInstitutionnelles, site, sujetsPublies } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { Logo } from "./Icones";

export function PiedDePage() {
  return (
    <footer className="mt-20 border-t border-trait">
      <div className="conteneur grid items-start gap-x-10 gap-y-8 py-12 sm:grid-cols-2 md:py-14 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
        <div className="flex min-w-0 flex-col gap-3">
          <Link href="/" className="flex min-h-[44px] items-center gap-3 self-start">
            <Logo />
            <span className="text-[20px] font-semibold tracking-[-0.01em]">comparatif ménopause</span>
          </Link>
          <p className="max-w-[40em] text-[16px] text-discret">
            Un site d'information et de comparaison. Il ne vend aucun produit et ne remplace pas un avis médical.
          </p>
          <p className="text-[15px] text-discret">
            Dernière mise à jour le {dateLongue(site.majLe)}. Édité par {site.editeur}.
          </p>
        </div>
        {sujetsPublies.map((sujet) => (
          <nav key={sujet.id} aria-label={sujet.nom} className="flex min-w-0 flex-col text-[16px]">
            <div className="surtitre mb-2">{sujet.nom}</div>
            {sujet.pages.map((p) => (
              <Link key={p.chemin} href={p.chemin} className="py-2 leading-snug underline-offset-4 hover:underline">
                {p.libelle}
              </Link>
            ))}
          </nav>
        ))}
        <nav aria-label="Le site" className="flex min-w-0 flex-col text-[16px]">
          <div className="surtitre mb-2">Le site</div>
          {pagesInstitutionnelles
            .filter((p) => p.publiee)
            .map((p) => (
              <Link key={p.chemin} href={p.chemin} className="py-2 leading-snug underline-offset-4 hover:underline">
                {p.titre}
              </Link>
            ))}
        </nav>
      </div>
    </footer>
  );
}
