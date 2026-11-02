import type { ProduitClasse } from "@/lib/score";
import { grille, noteMax, pointsParCritere } from "@/lib/score";
import { actifs, preuvesDe, symptomes } from "@/data/preuves";
import { dateLongue, prix } from "@/lib/format";
import { mention, ou } from "@/lib/marchand";
import { Coche, Tiret } from "./Icones";
import { LienMarchand, LienMarchandTexte } from "./LienMarchand";
import { NiveauPreuve } from "./NiveauPreuve";
import { VisuelProduit } from "./VisuelProduit";
import { photosProduits } from "@/data/photos-produits";
import { avisDe, cheminAvis } from "@/data/avis";
import Link from "next/link";

/** La fiche détaillée d'un produit : prix, détail de la note, actifs et preuves, pour et contre. */
export function FicheProduit({
  produit,
  replie = false,
  lienAvis = true,
}: {
  produit: ProduitClasse;
  replie?: boolean;
  /** Lien vers la page d'avis du produit, quand elle existe. Faux sur la page d'avis elle-même. */
  lienAvis?: boolean;
}) {
  const avis = lienAvis ? avisDe(produit.id) : undefined;
  const points = pointsParCritere(produit);
  const [marchand, ...autres] = produit.marchands;
  const lignes = produit.actifs.map((a) => ({ ...a, nom: actifs[a.id].nom, preuve: preuvesDe(a.id).filter((p) => p.symptome !== "force")[0] }));

  return (
    <article
      id={produit.id}
      className="flex scroll-mt-6 flex-wrap gap-x-10 gap-y-8 rounded-[28px] border border-trait bg-white p-5 md:p-8"
    >
      <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-5">
        {photosProduits[produit.id] && (
          <VisuelProduit id={produit.id} format={produit.format} className="aspect-square w-full" sizes="(min-width: 768px) 360px, 90vw" />
        )}
        <div className="flex flex-col gap-5 rounded-[20px] bg-sauge p-6">
          <div>
            <div className="text-[40px] font-semibold leading-none tracking-[-0.025em] tabular-nums md:text-[46px]">
              {prix(produit.parJour)}
            </div>
            <div className="mt-1 text-[17px] text-doux">par jour</div>
          </div>
          <dl className="flex flex-col text-[16px]">
            {[
              ["La boîte", prix(produit.prix)],
              ["Format", produit.format],
              ["Durée", `${produit.jours} jours`],
              ["Posologie", produit.posologie],
            ].map(([terme, valeur]) => (
              <div key={terme} className="flex items-baseline justify-between gap-4 border-t border-[#cdd6c0] py-2.5">
                <dt className="text-discret">{terme}</dt>
                <dd className="text-right font-medium">{valeur}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[14px] leading-snug text-discret">
            Prix relevé le {dateLongue(produit.prixReleveLe)}, {ou(marchand)}.{produit.prixNote ? ` ${produit.prixNote}` : ""}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <LienMarchand produit={produit} emplacement="fiche" className="min-h-14 w-full text-[18px]" />
          {marchand.url && marchand.codePromo && (
            <div className="rounded-full border-[1.5px] border-dashed border-pointille px-4 py-2 text-center text-[15px]">
              Code promo : <strong className="font-semibold tracking-[0.04em]">{marchand.codePromo}</strong>
            </div>
          )}
          <div className="text-center text-[14px] leading-snug text-discret first-letter:uppercase">{mention(marchand)}</div>
          {autres
            .filter((m) => m.url)
            .map((m) => (
              <div key={m.nom} className="text-center text-[14px] leading-snug text-discret">
                Aussi relevé à {prix(m.prix)}{" "}
                <LienMarchandTexte produit={produit} marchand={m} emplacement="fiche-autre">
                  {ou(m)}
                </LienMarchandTexte>
                {m.remunere ? " (lien rémunéré)" : ""}
              </div>
            ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-[2_1_480px] flex-col gap-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {photosProduits[produit.id] ? (
            <span
              className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[19px] font-bold ${
                produit.rang === 1 ? "bg-citron" : "bg-sauge"
              }`}
            >
              <span className="sr-only">Rang </span>
              {produit.rang}
            </span>
          ) : (
            <VisuelProduit id={produit.id} format={produit.format} rang={produit.rang} className="ml-1 mt-1 size-[76px]" />
          )}
          <div className="min-w-0 flex-[1_1_240px]">
            <h3 className="text-[25px] font-medium leading-[1.15] tracking-[-0.015em] md:text-[30px]">{produit.nom}</h3>
            <div className="text-[16px] text-discret">{produit.marque}</div>
          </div>
          <div className="text-[40px] font-semibold leading-none tracking-[-0.02em] tabular-nums">
            {produit.note}
            <span className="text-[19px] font-normal text-discret">/{noteMax}</span>
          </div>
        </div>

        <p className="text-doux">{produit.resume}</p>
        {avis && (
          <Link href={cheminAvis(avis)} className="lien -mt-3 self-start py-2 text-[16px] font-semibold">
            Lire notre avis complet sur {produit.nom}
          </Link>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2.5 rounded-[18px] bg-sauge px-[22px] py-5">
            <h4 className="surtitre">Ce qui joue pour</h4>
            <ul className="flex flex-col gap-2.5">
              {produit.pour.map((t) => (
                <li key={t} className="flex gap-2.5 text-[17px] leading-snug">
                  <Coche className="mt-[3px] shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2.5 rounded-[18px] bg-argile px-[22px] py-5">
            <h4 className="surtitre !text-rouille">Ce qui joue contre</h4>
            <ul className="flex flex-col gap-2.5">
              {produit.contre.map((t) => (
                <li key={t} className="flex gap-2.5 text-[17px] leading-snug">
                  <Tiret className="mt-[3px] shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <details open={!replie} className="group border-t border-trait pt-4">
          <summary className="flex min-h-12 list-none items-center justify-between gap-4 text-[17px] font-semibold">
            <span>
              <span className="group-open:hidden">Voir le détail de la note, les actifs et la composition</span>
              <span className="hidden group-open:inline">Détail de la note, actifs et composition</span>
            </span>
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sauge transition-transform group-open:rotate-45">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9h12" stroke="#1F3A2B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="flex flex-col gap-6 pt-5">
          <div className="flex flex-col gap-3">
            <h4 className="surtitre">Détail de la note</h4>
            <dl className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_40px] items-center gap-x-3 gap-y-3 text-[16px] md:grid-cols-[minmax(150px,1.1fr)_minmax(0,2fr)_44px] md:gap-x-4 md:text-[17px]">
              {grille.map((c) => (
                <div key={c.cle} className="contents">
                  <dt>{c.titre}</dt>
                  <dd aria-hidden="true" className="h-2.5 rounded-full bg-sauge">
                    <div className="h-2.5 rounded-full bg-foret" style={{ width: `${points[c.cle] * 50}%` }} />
                  </dd>
                  <dd className="text-right font-semibold tabular-nums">{points[c.cle]}/2</dd>
                </div>
              ))}
            </dl>
          </div>

          {lignes.length > 0 && (
            <div className="flex flex-col gap-3">
              <h4 className="surtitre">Les actifs face aux études</h4>
              <ul className="flex flex-col">
                {lignes.map((a) => (
                  <li key={a.id} className="flex items-start gap-3 border-t border-trait py-3 text-[16px] leading-snug">
                    {a.preuve ? (
                      <NiveauPreuve niveau={a.preuve.niveau} />
                    ) : (
                      <span className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-fond text-[15px] font-semibold text-discret">
                        <span aria-hidden="true">?</span>
                        <span className="sr-only">Pas de ligne de preuve établie</span>
                      </span>
                    )}
                    <div className="min-w-0">
                      <div>
                        <strong className="font-semibold">{a.nom}</strong>, {a.dose}
                        {a.preuve && <span className="text-discret"> · {symptomes[a.preuve.symptome].toLowerCase()}</span>}
                      </div>
                      <div className="text-[15px] text-doux">
                        {!a.preuve
                          ? "Pas encore de ligne de preuve dans notre base."
                          : a.comparable
                            ? `À une dose comparable à celle des essais${a.remarque ? ` : ${a.remarque}` : ""}.`
                            : `Dose non comparable à celle des essais${a.remarque ? ` : ${a.remarque}` : ""}.`}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h4 className="surtitre">Composition par jour</h4>
              <p className="text-[16px] text-doux">{produit.composition}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="surtitre">Précautions</h4>
              <p className="text-[16px] text-doux">{produit.precautionsTexte}</p>
            </div>
          </div>

          <p className="text-[14px] text-discret">
            Sources :{" "}
            {produit.sources.map((s, i) => (
              <span key={s.libelle}>
                {i > 0 && " ; "}
                {s.url ? (
                  <a href={s.url} target="_blank" rel="nofollow noopener" className="underline underline-offset-2">
                    {s.libelle}
                  </a>
                ) : (
                  s.libelle
                )}
              </span>
            ))}
            .
          </p>
          </div>
        </details>
      </div>
    </article>
  );
}
