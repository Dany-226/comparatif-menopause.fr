import Link from "next/link";
import { actifs, mentionSources, niveaux, preuvesDe, symptomes, type Niveau, type Preuve } from "@/data/preuves";
import { rangNiveau } from "@/data/preuves";
import { NiveauPreuve } from "./NiveauPreuve";

const ordre: Niveau[] = ["A", "B", "C", "D", "E"];

/**
 * Section sombre « Que disent les études ? » : l'échelle, puis la meilleure ligne de preuve
 * de chaque actif présent dans les formules comparées.
 */
export function SectionPreuves({ idsActifs, limite = 8 }: { idsActifs: string[]; limite?: number }) {
  const toutes: Preuve[] = [...new Set(idsActifs)]
    .map((id) => preuvesDe(id).filter((p) => p.symptome !== "force")[0])
    .filter((p): p is Preuve => Boolean(p))
    .sort((a, b) => rangNiveau(a.niveau) - rangNiveau(b.niveau) || actifs[a.actifId].nom.localeCompare(actifs[b.actifId].nom, "fr"));
  const lignes = toutes.slice(0, limite);
  const reste = toutes.length - lignes.length;

  return (
    <section id="preuves" className="sombre scroll-mt-0 bg-foret text-white">
      <div className="conteneur flex flex-wrap gap-x-14 gap-y-10 py-16 md:py-[88px]">
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-5 lg:sticky lg:top-8 lg:self-start">
          <div className="surtitre !text-citron">Preuves</div>
          <h2 className="titre-2 md:!text-[44px]">Que disent les études ?</h2>
          <p className="text-[18px] leading-[1.55] text-sauge md:text-[19px]">
            Chaque actif présent dans les formules comparées reçoit un niveau de preuve, de A à E, pour le symptôme où
            il est le mieux étudié. Aucun n'atteint le niveau A.
          </p>
          <ul className="mt-2 flex flex-col gap-3 rounded-[20px] bg-foret-clair px-6 py-[22px]">
            {ordre.map((n) => (
              <li key={n} className="flex items-center gap-3.5 text-[16px]">
                <NiveauPreuve niveau={n} surSombre />
                <span aria-hidden="true">{niveaux[n].titre}</span>
              </li>
            ))}
          </ul>
          <Link href="/preuves-complements-menopause/" className="bouton bouton-citron mt-2 self-start text-[17px]">
            Le tableau complet des preuves
          </Link>
        </div>

        <div className="flex min-w-0 flex-[2_1_560px] flex-col">
          <ul className="border-b border-foret-trait">
            {lignes.map((p) => (
              <li key={p.id} className="flex items-start gap-4 border-t border-foret-trait py-5 md:gap-5 md:py-6">
                <NiveauPreuve niveau={p.niveau} grand surSombre />
                <div className="min-w-0 flex-auto">
                  <h3 className="text-[20px] font-medium leading-snug tracking-[-0.01em] md:text-[22px]">
                    {actifs[p.actifId].nom}
                    <span className="text-[16px] font-normal text-pale"> · {symptomes[p.symptome].toLowerCase()}</span>
                  </h3>
                  <p className="mt-1 text-[16px] text-sauge md:text-[17px]">{p.conclusion}</p>
                  {(p.doseEssais || p.sources.length > 0) && (
                    <p className="mt-1.5 text-[14px] text-pale md:text-[15px]">
                      {p.doseEssais && <>Dose des essais : {p.doseEssais.charAt(0).toLowerCase() + p.doseEssais.slice(1)}. </>}
                      {mentionSources(p)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {reste > 0 && (
            <p className="mt-5 text-[16px] text-sauge">
              {reste} autres actifs de ces formules sont moins bien étayés, pour la plupart aux niveaux D et E.{" "}
              <Link href="/preuves-complements-menopause/" className="lien text-white">
                Les voir tous
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
