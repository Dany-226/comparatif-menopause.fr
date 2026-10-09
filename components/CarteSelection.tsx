import type { ProduitClasse } from "@/lib/score";
import { noteMax } from "@/lib/score";
import { prix } from "@/lib/format";
import { mention } from "@/lib/marchand";
import { LienMarchand } from "./LienMarchand";
import { VisuelProduit } from "./VisuelProduit";

/** Une des trois sélections en tête de comparatif. La première est sur fond sombre. */
export function CarteSelection({ produit, titre, enAvant = false }: { produit: ProduitClasse; titre: string; enAvant?: boolean }) {
  const discret = enAvant ? "text-pale" : "text-discret";
  const trait = enAvant ? "border-foret-trait" : "border-trait";
  return (
    <article
      className={`flex flex-col gap-5 rounded-3xl p-6 md:p-7 ${
        enAvant ? "sombre bg-foret text-white" : "border border-trait bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`rounded-full px-3.5 py-[7px] text-[13px] font-bold uppercase tracking-[0.08em] text-encre ${
            enAvant ? "bg-citron" : "bg-sauge"
          }`}
        >
          {titre}
        </div>
        <VisuelProduit id={produit.id} format={produit.format} className="size-[72px] text-encre" />
      </div>
      <div>
        <h3 className="text-[25px] font-medium leading-[1.15] tracking-[-0.015em] md:text-[28px]">
          <a href={`#${produit.id}`} className="underline-offset-4 hover:underline">
            {produit.nom}
          </a>
        </h3>
        <div className={`text-[16px] ${discret}`}>
          {produit.marque} · {produit.format}, {produit.jours} jours
        </div>
      </div>
      <div className={`flex gap-8 border-y py-4 ${trait}`}>
        <div>
          <div className="text-[30px] font-medium leading-[1.1] tabular-nums">
            {produit.note}
            <span className={`text-[17px] font-normal ${discret}`}>/{noteMax}</span>
          </div>
          <div className={`text-[14px] ${discret}`}>note globale</div>
        </div>
        <div>
          <div className="text-[30px] font-medium leading-[1.1] tabular-nums">{prix(produit.parJour)}</div>
          <div className={`text-[14px] ${discret}`}>par jour</div>
        </div>
      </div>
      <p className={`flex-auto text-[17px] leading-normal ${enAvant ? "text-sauge" : "text-doux"}`}>{produit.resume}</p>
      <div className="flex flex-col gap-2">
        <LienMarchand
          produit={produit}
          emplacement="selection"
          variante={enAvant ? "citron" : "foret"}
          className="min-h-[54px] w-full text-[18px]"
        />
        <div className={`text-center text-[14px] ${discret}`}>{mention(produit.marchands[0])}</div>
      </div>
    </article>
  );
}
