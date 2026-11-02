import { actifs, preuves, rangNiveau, sources, symptomes, type Symptome } from "@/data/preuves";
import Link from "next/link";
import { produits } from "@/data/produits";
import { lienProduit } from "@/lib/liens";
import { NiveauPreuve } from "./NiveauPreuve";
import { lienActif } from "@/lib/actifs";

function NomActif({ id, nom }: { id: string; nom: string }) {
  const href = lienActif(id);
  return href ? <Link href={href} className="underline-offset-4 hover:underline">{nom}</Link> : <>{nom}</>;
}

/** Les formules du comparatif qui contiennent l'actif à une dose comparable à celle des essais. */
function DansLeComparatif({ actifId }: { actifId: string }) {
  const liste = produits.filter((p) => p.actifs.some((a) => a.id === actifId && a.comparable));
  if (liste.length === 0) return null;
  return (
    <span className="mt-1.5 block text-[14px] text-encre">
      À dose comparable dans :{" "}
      {liste.map((p, i) => (
        <span key={p.id}>
          {i > 0 && ", "}
          <Link href={lienProduit(p)} className="underline underline-offset-2">
            {p.nom}
          </Link>
        </span>
      ))}
    </span>
  );
}

const ordreSymptomes: Symptome[] = ["bouffees", "humeur", "sommeil", "global", "ballonnements", "force"];

function Sources({ ids }: { ids: string[] }) {
  if (ids.length === 0) return <span className="text-discret">Recherche sans résultat</span>;
  return (
    <>
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && " · "}
          <a href={sources[id].url} target="_blank" rel="noopener" className="underline underline-offset-2">
            {sources[id].court}, {sources[id].annee}
          </a>
        </span>
      ))}
    </>
  );
}

/** Le tableau complet : un bloc par symptôme, une ligne par actif, du mieux au moins bien étayé. */
export function TableauActifs() {
  return (
    <div className="flex flex-col gap-12">
      {ordreSymptomes.map((sym) => {
        const lignes = preuves
          .filter((p) => p.symptome === sym)
          .sort((a, b) => rangNiveau(a.niveau) - rangNiveau(b.niveau) || actifs[a.actifId].nom.localeCompare(actifs[b.actifId].nom, "fr"));
        if (lignes.length === 0) return null;
        return (
          <section key={sym} id={sym} className="flex scroll-mt-6 flex-col gap-4">
            <h2 className="titre-2 md:!text-[32px]">{symptomes[sym]}</h2>
            {sym === "force" && (
              <p className="max-w-[44em] text-doux">
                La force musculaire n'est pas un symptôme de la ménopause. La ligne figure ici parce que la créatine est
                souvent présentée comme un complément « ménopause ».
              </p>
            )}

            <div className="hidden overflow-x-auto rounded-3xl border border-trait bg-white lg:block">
              <table className="w-full border-collapse text-[16px]">
                <thead>
                  <tr className="text-left text-[13px] uppercase tracking-[0.1em] text-discret">
                    <th scope="col" className="w-[190px] py-4 pl-6 pr-3 font-semibold">
                      Actif
                    </th>
                    <th scope="col" className="w-[70px] px-3 py-4 font-semibold">
                      Niveau
                    </th>
                    <th scope="col" className="w-[200px] px-3 py-4 font-semibold">
                      Dose des essais
                    </th>
                    <th scope="col" className="px-3 py-4 font-semibold">
                      Ce que montrent les études
                    </th>
                    <th scope="col" className="w-[190px] py-4 pl-3 pr-6 font-semibold">
                      Sources
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lignes.map((p) => (
                    <tr key={p.id} className="border-t border-trait align-top">
                      <th scope="row" className="py-4 pl-6 pr-3 text-left text-[17px] font-semibold">
                        <NomActif id={p.actifId} nom={actifs[p.actifId].nom} />
                      </th>
                      <td className="px-3 py-4">
                        <NiveauPreuve niveau={p.niveau} />
                      </td>
                      <td className="px-3 py-4 text-[15px] text-doux">{p.doseEssais || "Aucun essai"}</td>
                      <td className="px-3 py-4 text-doux">
                        {p.conclusion}
                        {actifs[p.actifId].vigilance && (
                          <span className="mt-1.5 block text-[14px] text-rouille">{actifs[p.actifId].vigilance}</span>
                        )}
                        <DansLeComparatif actifId={p.actifId} />
                      </td>
                      <td className="py-4 pl-3 pr-6 text-[14px] leading-snug text-doux">
                        <Sources ids={p.sources} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="flex flex-col gap-3 lg:hidden">
              {lignes.map((p) => (
                <li key={p.id} className="flex flex-col gap-2 rounded-[20px] border border-trait bg-white p-[18px]">
                  <div className="flex items-center gap-3">
                    <NiveauPreuve niveau={p.niveau} />
                    <h3 className="text-[18px] font-semibold leading-tight"><NomActif id={p.actifId} nom={actifs[p.actifId].nom} /></h3>
                  </div>
                  <p className="text-[16px] text-doux">{p.conclusion}</p>
                  {p.doseEssais && <p className="text-[14px] text-discret">Dose des essais : {p.doseEssais.charAt(0).toLowerCase() + p.doseEssais.slice(1)}.</p>}
                  {actifs[p.actifId].vigilance && <p className="text-[14px] text-rouille">{actifs[p.actifId].vigilance}</p>}
                  <DansLeComparatif actifId={p.actifId} />
                  <p className="text-[14px] text-doux">
                    <Sources ids={p.sources} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
