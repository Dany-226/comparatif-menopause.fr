import Link from "next/link";
import { comparatifs, pagesInstitutionnelles, pagesReference, site } from "@/data/site";
import { dateLongue } from "@/lib/format";

export function PiedDePage() {
  return (
    <footer className="mt-20 border-t border-trait">
      <div className="conteneur flex flex-wrap items-start gap-x-14 gap-y-8 py-12 md:py-14">
        <div className="flex min-w-0 flex-[2_1_380px] flex-col gap-3">
          <div className="text-[20px] font-semibold tracking-[-0.01em]">comparatif ménopause</div>
          <p className="max-w-[40em] text-[16px] text-discret">
            Un site d'information et de comparaison. Il ne vend aucun produit et ne remplace pas un avis médical.
          </p>
          <p className="text-[15px] text-discret">
            Dernière mise à jour le {dateLongue(site.majLe)}. Édité par {site.editeur}.
          </p>
        </div>
        <nav aria-label="Comparatifs et preuves" className="flex min-w-0 flex-[1_1_220px] flex-col text-[17px]">
          <div className="surtitre mb-2">Comparatifs et preuves</div>
          {[...comparatifs, ...pagesReference]
            .filter((p) => p.publiee)
            .map((p) => (
              <Link key={p.chemin} href={p.chemin} className="py-2.5 underline-offset-4 hover:underline">
                {p.titre}
              </Link>
            ))}
        </nav>
        <nav aria-label="Le site" className="flex min-w-0 flex-[1_1_220px] flex-col text-[17px]">
          <div className="surtitre mb-2">Le site</div>
          {pagesInstitutionnelles
            .filter((p) => p.publiee)
            .map((p) => (
              <Link key={p.chemin} href={p.chemin} className="py-2.5 underline-offset-4 hover:underline">
                {p.titre}
              </Link>
            ))}
        </nav>
      </div>
    </footer>
  );
}
