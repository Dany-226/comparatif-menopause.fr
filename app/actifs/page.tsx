import Link from "next/link";
import { EncadreMedical } from "@/components/EncadreMedical";
import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { NiveauPreuve } from "@/components/NiveauPreuve";
import { actifs, niveaux, preuves, rangNiveau, symptomes, type Symptome } from "@/data/preuves";
import { produits } from "@/data/produits";
import { site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { actifsAvecPage, cheminActif } from "@/lib/actifs";
import { meta } from "@/lib/meta";

const chemin = "/actifs/";

export const metadata = meta({
  titre: `Actifs des compléments ménopause : ${actifsAvecPage.length} ingrédients face aux études`,
  titreComplet: true,
  description:
    "Soja, actée à grappes, safran, pollen, sauge, charbon : chaque ingrédient des compléments pour la ménopause, son niveau de preuve par symptôme et la dose des études.",
  chemin,
});

const ordreSymptomes: Symptome[] = ["bouffees", "humeur", "sommeil", "global", "force", "ballonnements"];
const ancre = (s: Symptome) => `symptome-${s}`;

/** Les lignes de preuve qui disent quelque chose (niveaux A à D), par symptôme, la meilleure d'abord. */
function lignesDu(symptome: Symptome) {
  return preuves
    .filter((p) => p.symptome === symptome && p.niveau !== "E" && actifsAvecPage.includes(p.actifId))
    .sort((a, b) => rangNiveau(a.niveau) - rangNiveau(b.niveau) || actifs[a.actifId].nom.localeCompare(actifs[b.actifId].nom, "fr"));
}

/** Nombre de formules comparées qui contiennent l'actif. */
const nombreFormules = (id: string) => produits.filter((p) => p.actifs.some((a) => a.id === id)).length;

export default function Page() {
  const groupes = ordreSymptomes.map((s) => ({ symptome: s, lignes: lignesDu(s) })).filter((g) => g.lignes.length > 0);
  const verifieLe = preuves.map((p) => p.verifieLe).sort().at(-1)!;

  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: "Les actifs des compléments pour la ménopause",
              url: `${site.url}${chemin}`,
              inLanguage: "fr-FR",
              dateModified: verifieLe,
              publisher: { "@type": "Organization", name: site.editeur },
              mainEntity: {
                "@type": "ItemList",
                itemListElement: actifsAvecPage.map((id, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: actifs[id].nom,
                  url: `${site.url}${cheminActif(id)}`,
                })),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Les actifs", item: `${site.url}${chemin}` },
              ],
            },
          ],
        }}
      />

      <EntetePage
        surtitre={`Ingrédients · preuves vérifiées le ${dateLongue(verifieLe)}`}
        titre="Les actifs des compléments ménopause"
        chapo={`${actifsAvecPage.length} ingrédients que l'on trouve dans les formules vendues pour la ménopause, classés par symptôme et par niveau de preuve. Chaque page donne la dose utilisée dans les études, les précautions et les formules qui en contiennent.`}
      />

      <div className="conteneur flex flex-col gap-12 md:gap-16">
        <section aria-label="Tous les actifs" className="flex flex-col gap-3">
          <h2 className="titre-3">De A à Z</h2>
          <div className="flex flex-wrap gap-2">
            {actifsAvecPage.map((id) => (
              <Link key={id} href={cheminActif(id)} className="rounded-full border border-trait bg-white px-4 py-2 text-[15px] hover:bg-sauge">
                {actifs[id].nom}
              </Link>
            ))}
          </div>
        </section>

        <nav aria-label="Par symptôme" className="flex flex-wrap gap-2">
          {groupes.map((g) => (
            <a key={g.symptome} href={`#${ancre(g.symptome)}`} className="rounded-full bg-sauge px-4 py-2 text-[15px] hover:bg-citron">
              {symptomes[g.symptome]}
            </a>
          ))}
        </nav>

        {groupes.map((g) => (
          <section key={g.symptome} id={ancre(g.symptome)} className="flex scroll-mt-6 flex-col gap-5">
            <h2 className="titre-2">{symptomes[g.symptome]}</h2>
            <ul className="flex flex-col divide-y divide-trait rounded-[22px] border border-trait bg-white">
              {g.lignes.map((l) => {
                const n = nombreFormules(l.actifId);
                return (
                  <li key={l.id} className="flex items-start gap-4 px-5 py-4 md:px-6">
                    <NiveauPreuve niveau={l.niveau} />
                    <div className="flex min-w-0 flex-col gap-1">
                      <Link href={cheminActif(l.actifId)} className="text-[18px] font-medium underline-offset-4 hover:underline">
                        {actifs[l.actifId].nom}
                      </Link>
                      <p className="text-[15px] leading-snug text-doux">
                        {niveaux[l.niveau].titre}
                        {l.doseEssais ? ` · dose des études : ${l.doseEssais}` : ""}
                      </p>
                      {n > 0 && (
                        <p className="text-[14px] text-discret">
                          Dans {n} formule{n > 1 ? "s" : ""} de nos comparatifs
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="flex flex-col gap-3">
          <h2 className="titre-2">Lire les niveaux</h2>
          <p className="max-w-[44em] leading-relaxed">
            De A, effet démontré, à D, essais sans effet face au placebo. Les actifs sans aucun essai chez des femmes
            ménopausées (niveau E) n'ont pas de page ici. La règle de chaque niveau et toutes les sources sont dans le{" "}
            <Link href="/preuves-complements-menopause/" className="lien">
              tableau des preuves
            </Link>
            ; ce que nous en faisons pour noter les formules est expliqué dans{" "}
            <Link href="/comment-nous-classons/" className="lien">
              notre méthode
            </Link>
            .
          </p>
        </section>

        <div className="pb-6">
          <EncadreMedical sujet="Cette page porte sur des ingrédients de compléments alimentaires." />
        </div>
      </div>
    </>
  );
}
