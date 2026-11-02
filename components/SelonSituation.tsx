import type { ProduitClasse } from "@/lib/score";
import { lienProduit } from "@/lib/liens";
import { noteMax, pointsPreuves } from "@/lib/score";
import { preuvesDe } from "@/data/preuves";
import { profils } from "@/lib/selections";
import { prix } from "@/lib/format";

/** « Lequel choisir selon votre situation ? » : des filtres appliqués au classement, sans choix à la main. */
export function SelonSituation({ classes }: { classes: ProduitClasse[] }) {
  const viseHumeur = (p: ProduitClasse) =>
    p.actifs.some((a) => a.comparable && preuvesDe(a.id, ["humeur"]).some((l) => l.niveau === "A" || l.niveau === "B"));
  const liste = profils(classes, pointsPreuves, viseHumeur);
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {liste.map((profil, i) => (
        <article
          key={profil.cle}
          className={`flex flex-col gap-4 rounded-3xl p-6 md:p-7 ${
            i === 0 ? "bg-citron" : i === 1 ? "bg-ciel" : "border border-trait bg-white"
          }`}
        >
          <h3 className="titre-3">{profil.titre}</h3>
          <p className="text-[16px] text-doux">{profil.texte}</p>
          <ol className="mt-auto flex flex-col">
            {profil.produits.map((p) => (
              <li key={p.id} className="border-t border-encre/15 first:border-t-0">
                <a href={lienProduit(p, "")} className="group flex items-center justify-between gap-4 py-3">
                  <span className="min-w-0">
                    <span className="block text-[17px] font-semibold leading-snug underline-offset-4 group-hover:underline">
                      {p.nom}
                    </span>
                    <span className="block text-[14px] text-doux">{prix(p.parJour)} par jour</span>
                  </span>
                  <span className="whitespace-nowrap text-[20px] font-semibold tabular-nums">
                    {p.note}
                    <span className="text-[13px] font-normal text-doux">/{noteMax}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}
