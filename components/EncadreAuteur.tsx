import Link from "next/link";
import { sourcesCitees } from "@/data/preuves";
import { site } from "@/data/site";
import { dateLongue } from "@/lib/format";

/**
 * Qui signe la page, quand elle a été vérifiée, comment signaler une erreur.
 * La signature est celle du site : la confiance repose sur la grille et les
 * sources, que chacun peut ouvrir, et non sur un portrait.
 */
export function EncadreAuteur() {
  return (
    <aside className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border border-trait bg-white px-6 py-5">
      <div
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-foret text-[15px] font-semibold text-citron"
      >
        CM
      </div>
      <div className="min-w-0 flex-[1_1_320px]">
        <div className="text-[17px] font-semibold">Établi par {site.signature}</div>
        <div className="text-[15px] text-doux">
          Grille publique, {sourcesCitees().length} sources citées, éditeur indépendant des fabricants. Prix et sources
          vérifiés le {dateLongue(site.majLe)}.
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
        <Link href="/a-propos/" className="lien">
          Qui édite ce site
        </Link>
        <Link href="/comment-nous-classons/" className="lien">
          La méthode
        </Link>
        <Link href="/comment-nous-classons/#corrections" className="lien">
          Signaler une erreur
        </Link>
      </div>
    </aside>
  );
}
