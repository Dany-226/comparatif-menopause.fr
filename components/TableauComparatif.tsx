import type { ProduitClasse } from "@/lib/score";
import { meilleurePreuve, noteMax } from "@/lib/score";
import { actifs, symptomes } from "@/data/preuves";
import { prix } from "@/lib/format";
import { LienMarchand } from "./LienMarchand";
import { NiveauPreuve } from "./NiveauPreuve";
import { VisuelProduit } from "./VisuelProduit";

function Preuve({ produit }: { produit: ProduitClasse }) {
  const meilleure = meilleurePreuve(produit);
  if (!meilleure) {
    return <span className="text-[15px] leading-snug text-discret">Aucun actif à une dose étudiée</span>;
  }
  return (
    <span className="inline-flex items-center gap-2.5">
      <NiveauPreuve niveau={meilleure.niveau} />
      <span className="text-[15px] leading-snug text-doux">
        {actifs[meilleure.actifId].nom}
        <span className="block text-[13px] text-discret">{symptomes[meilleure.symptome]}</span>
      </span>
    </span>
  );
}

function Rang({ rang }: { rang: number }) {
  return (
    <span
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full font-bold ${
        rang === 1 ? "bg-citron" : "bg-sauge"
      }`}
    >
      <span className="sr-only">Rang </span>
      {rang}
    </span>
  );
}

/**
 * Le classement. Un tableau sur grand écran, une pile de cartes sur téléphone.
 * Chaque offre affiche le prix total de la boîte en plus du prix par jour.
 */
export function TableauComparatif({
  produits,
  compact = false,
  base = "",
  emplacement = "tableau",
}: {
  produits: ProduitClasse[];
  /** Version courte, pour l'accueil : sans les colonnes « niveau de preuve » et « précautions ». */
  compact?: boolean;
  /** Adresse de la page où se trouvent les fiches, quand le tableau est affiché ailleurs. */
  base?: string;
  /** Nom de l'emplacement, pour la mesure des clics. */
  emplacement?: string;
}) {
  return (
    <>
      <div className={`hidden overflow-x-auto rounded-3xl border border-trait bg-white ${compact ? "md:block" : "min-[1080px]:block"}`}>
        <table className={`w-full border-collapse text-[17px] ${compact ? "min-w-[680px]" : "min-w-[980px]"}`}>
          <thead>
            <tr className="text-left text-[13px] uppercase tracking-[0.1em] text-discret">
              <th scope="col" className="w-14 py-[18px] pl-7 pr-3 font-semibold">
                Rang
              </th>
              <th scope="col" className="px-3 py-[18px] font-semibold">
                Produit
              </th>
              {!compact && (
                <th scope="col" className="px-3 py-[18px] font-semibold">
                  Meilleur niveau de preuve
                </th>
              )}
              <th scope="col" className="px-3 py-[18px] font-semibold">
                Prix par jour
              </th>
              {!compact && (
                <th scope="col" className="px-3 py-[18px] font-semibold">
                  Précautions
                </th>
              )}
              <th scope="col" className="px-3 py-[18px] font-semibold">
                Note
              </th>
              <th scope="col" className="py-[18px] pl-3 pr-7 font-semibold">
                <span className="sr-only">Offre</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {produits.map((p) => (
              <tr key={p.id} className={`border-t border-trait ${p.rang === 1 ? "bg-ligne" : ""}`}>
                <td className="py-5 pl-7 pr-3">
                  <Rang rang={p.rang} />
                </td>
                <th scope="row" className="px-3 py-5 text-left font-normal">
                  <div className="flex items-center gap-4">
                    <VisuelProduit id={p.id} format={p.format} className="size-[68px]" />
                    <div className="min-w-0">
                      <a href={`${base}#${p.id}`} className="text-[19px] font-semibold leading-snug underline-offset-4 hover:underline">
                        {p.nom}
                      </a>
                      <div className="text-[15px] text-discret">
                        {p.marque} · {p.format}, {p.jours} jours
                      </div>
                    </div>
                  </div>
                </th>
                {!compact && (
                  <td className="px-3 py-5">
                    <Preuve produit={p} />
                  </td>
                )}
                <td className="px-3 py-5">
                  <div className="whitespace-nowrap text-[21px] font-semibold tabular-nums">{prix(p.parJour)}</div>
                  <div className="whitespace-nowrap text-[14px] text-discret">{prix(p.prix)} la boîte</div>
                </td>
                {!compact && (
                  <td className="max-w-[230px] px-3 py-5 text-[15px] leading-snug text-doux">{p.precautionsTexte}</td>
                )}
                <td className="whitespace-nowrap px-3 py-5 text-[26px] font-semibold tabular-nums">
                  {p.note}
                  <span className="text-[15px] font-normal text-discret">/{noteMax}</span>
                </td>
                <td className="py-5 pl-3 pr-7 text-right">
                  <LienMarchand produit={p} emplacement={emplacement} className="min-h-12 px-6" />
                  <div className="mt-1.5 whitespace-nowrap text-[13px] text-discret">{p.marchands[0].nom}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className={`flex flex-col gap-3.5 ${compact ? "md:hidden" : "min-[1080px]:hidden"}`}>
        {produits.map((p) => {
          const meilleure = meilleurePreuve(p);
          return (
            <li key={p.id} className="flex flex-col gap-3 rounded-[20px] border border-trait bg-white p-[18px]">
              <div className="flex items-center gap-3.5">
                <VisuelProduit id={p.id} format={p.format} rang={p.rang} className="ml-1 mt-1 size-[60px]" />
                <div className="min-w-0 flex-auto">
                  <a href={`${base}#${p.id}`} className="text-[18px] font-semibold leading-tight underline-offset-4 hover:underline">
                    {p.nom}
                  </a>
                  <div className="text-[14px] leading-snug text-discret">
                    {compact || !meilleure ? p.marque : `${actifs[meilleure.actifId].nom} : niveau ${meilleure.niveau}`}
                  </div>
                </div>
                <div className="whitespace-nowrap text-[26px] font-semibold leading-none tabular-nums">
                  {p.note}
                  <span className="text-[14px] font-normal text-discret">/{noteMax}</span>
                </div>
              </div>
              {!compact && <p className="text-[14px] leading-snug text-doux">{p.precautionsTexte}</p>}
              <div className="flex items-center justify-between gap-3 border-t border-trait pt-3">
                <div>
                  <div className="text-[20px] font-semibold tabular-nums">
                    {prix(p.parJour)} <span className="text-[14px] font-normal text-discret">par jour</span>
                  </div>
                  <div className="text-[14px] text-discret">
                    {prix(p.prix)} la boîte · {p.marchands[0].nom}
                  </div>
                </div>
                <LienMarchand produit={p} emplacement={emplacement} className="min-h-[46px] px-[22px] text-[16px]" />
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
