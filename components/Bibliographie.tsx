import { libellesTypes, sourcesCitees, type TypeSource } from "@/data/preuves";
import { site } from "@/data/site";
import { dateLongue } from "@/lib/format";

const ordre: TypeSource[] = ["autorite", "societe", "revue", "essai", "observation", "reglement"];

/** La liste complète des sources, rangées par type. */
export function Bibliographie() {
  const toutes = sourcesCitees();
  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-[44em] text-doux">
        {toutes.length} sources, toutes consultées le {dateLongue(site.majLe)}. Dans l'ordre où nous leur donnons du
        poids : autorités de santé, sociétés savantes, synthèses d'essais, essais isolés.
      </p>
      {ordre.map((type) => {
        const liste = toutes.filter((s) => s.type === type).sort((a, b) => b.annee - a.annee || a.court.localeCompare(b.court, "fr"));
        if (liste.length === 0) return null;
        return (
          <div key={type} className="flex flex-col gap-3">
            <h3 className="surtitre">{libellesTypes[type]}</h3>
            <ul className="flex flex-col rounded-3xl border border-trait bg-white px-5 md:px-6">
              {liste.map((s) => (
                <li key={s.id} className="border-t border-trait py-3.5 first:border-t-0">
                  <a href={s.url} target="_blank" rel="noopener" className="text-[16px] font-semibold leading-snug underline underline-offset-4 md:text-[17px]">
                    {s.titre}
                  </a>
                  <div className="text-[14px] text-discret">
                    {s.editeur}, {s.annee}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
