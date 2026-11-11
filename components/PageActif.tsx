import Link from "next/link";
import { produits } from "@/data/produits";
import { actifs, niveaux, sources, symptomes, type Preuve } from "@/data/preuves";
import { site } from "@/data/site";
import { actifsAvecPage, cheminActif, lignesActif } from "@/lib/actifs";
import { lienProduit } from "@/lib/liens";
import { EncadreMedical } from "./EncadreMedical";
import { Faq, type Question } from "./Faq";
import { Pilule } from "./Icones";
import { JsonLd } from "./JsonLd";
import { NiveauPreuve } from "./NiveauPreuve";

const minuscule = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

/** Résumé d'une ligne de preuve en une phrase : « Bouffées de chaleur : signal positif à confirmer (niveau B). » */
function phrase(p: Preuve): string {
  return `${symptomes[p.symptome]} : ${minuscule(niveaux[p.niveau].titre)} (niveau ${p.niveau}).`;
}

/** Page d'un actif. Tout vient de data/preuves.ts et data/produits.ts : aucun texte n'est saisi à la main. */
export function PageActif({ id }: { id: string }) {
  const actif = actifs[id];
  const nom = actif.nom;
  const lignes = lignesActif(id);
  const utiles = lignes.filter((l) => l.niveau !== "E");
  const meilleure = utiles[0];
  const dans = produits
    .flatMap((p) => p.actifs.filter((a) => a.id === id).map((a) => ({ produit: p, actif: a })))
    .sort((a, b) => Number(b.actif.comparable) - Number(a.actif.comparable) || a.produit.nom.localeCompare(b.produit.nom, "fr"));
  const aDose = dans.filter((d) => d.actif.comparable);
  const idsSources = [...new Set([...lignes.flatMap((l) => l.sources), ...(actif.sourcesVigilance ?? [])])];
  const adresse = `${site.url}${cheminActif(id)}`;
  const verifieLe = lignes.map((l) => l.verifieLe).sort().reverse()[0];
  // Tous les actifs étudiés sur les mêmes symptômes, sans plafond : un plafond coupait toujours les mêmes
  // (la fin de l'ordre alphabétique) et les laissait presque sans lien entrant.
  const symptomesEtudies = [...new Set(lignes.map((l) => l.symptome))];
  const voisins = actifsAvecPage.filter(
    (a) => a !== id && lignesActif(a).some((l) => symptomesEtudies.includes(l.symptome)),
  );

  const questions: Question[] = [
    {
      question: `${nom} : est-ce efficace à la ménopause ?`,
      texte: utiles.map((l) => `${phrase(l)} ${l.conclusion}`).join(" "),
      reponse: (
        <>
          {utiles.map((l) => (
            <p key={l.id}>
              <strong>{phrase(l)}</strong> {l.conclusion}
            </p>
          ))}
        </>
      ),
    },
    ...(lignes.some((l) => l.doseEssais)
      ? [
          {
            question: `${nom} : quelle dose dans les études ?`,
            texte: lignes
              .filter((l) => l.doseEssais)
              .map((l) => `${symptomes[l.symptome]} : ${minuscule(l.doseEssais)}.`)
              .join(" "),
            reponse: (
              <>
                {lignes
                  .filter((l) => l.doseEssais)
                  .map((l) => (
                    <p key={l.id}>
                      {symptomes[l.symptome]} : {minuscule(l.doseEssais)}.
                    </p>
                  ))}
                <p>Une dose plus faible que celle des études ne permet pas d'attendre le même résultat.</p>
              </>
            ),
          },
        ]
      : []),
    ...(actif.vigilance
      ? [
          {
            question: `${nom} : quelles précautions ?`,
            texte: actif.vigilance,
            reponse: <p>{actif.vigilance}</p>,
          },
        ]
      : []),
    ...(dans.length > 0
      ? [
          {
            question: `${nom} : dans quels compléments ?`,
            texte: `Dans notre comparatif : ${dans.map((d) => `${d.produit.nom} (${d.actif.dose}${d.actif.comparable ? ", dose comparable aux études" : ""})`).join(", ")}.`,
            reponse: (
              <p>
                Dans notre comparatif :{" "}
                {dans.map((d, i) => (
                  <span key={d.produit.id}>
                    {i > 0 && ", "}
                    <Link href={lienProduit(d.produit)}>{d.produit.nom}</Link> ({d.actif.dose}
                    {d.actif.comparable ? ", dose comparable aux études" : ""})
                  </span>
                ))}
                .
              </p>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: `${nom} et ménopause : ce que disent les études`,
              inLanguage: "fr-FR",
              dateModified: verifieLe,
              author: { "@type": "Organization", name: site.signature, url: site.url },
              publisher: { "@type": "Organization", name: site.editeur },
              mainEntityOfPage: adresse,
              citation: idsSources.map((s) => sources[s].url),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Les preuves", item: `${site.url}/preuves-complements-menopause/` },
                { "@type": "ListItem", position: 3, name: nom, item: adresse },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: questions.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.texte } })),
            },
          ],
        }}
      />

      <section className="conteneur flex flex-col gap-5 pb-8 pt-7 md:pb-12 md:pt-12">
        <nav aria-label="Fil d'Ariane" className="text-[15px] text-discret">
          <Link href="/" className="underline-offset-4 hover:underline">
            Accueil
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href="/preuves-complements-menopause/" className="underline-offset-4 hover:underline">
            Les preuves
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{nom}</span>
        </nav>
        <div className="surtitre md:!text-[14px]">Actif · niveau de preuve · vérifié le {new Date(verifieLe).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</div>
        <h1 className="titre-1 max-w-[15em] md:!text-[56px]">
          {nom} et ménopause : ce que disent les études <Pilule className="ml-1 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-citron" />
        </h1>
        <div className="flex max-w-[44em] items-start gap-4 rounded-[22px] bg-sauge p-5 md:p-6">
          <NiveauPreuve niveau={meilleure.niveau} grand />
          <div className="flex flex-col gap-1.5">
            <p className="text-[18px] font-semibold leading-snug">En une phrase</p>
            <p className="text-[17px] leading-snug">
              {utiles.map((l) => phrase(l)).join(" ")}
              {aDose.length > 0
                ? ` ${aDose.length === 1 ? "Une formule" : `${aDose.length} formules`} de notre comparatif en ${aDose.length === 1 ? "contient" : "contiennent"} à une dose comparable aux études.`
                : dans.length > 0
                  ? " Aucune formule de notre comparatif n'en contient à la dose des études."
                  : ""}
            </p>
          </div>
        </div>
      </section>

      <div className="conteneur flex flex-col gap-12 md:gap-14">
        <section className="flex flex-col gap-4">
          <h2 className="titre-2">Les études, symptôme par symptôme</h2>
          <ul className="flex flex-col gap-3">
            {lignes.map((l) => (
              <li key={l.id} className="flex items-start gap-4 rounded-[20px] border border-trait bg-white p-5">
                <NiveauPreuve niveau={l.niveau} />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <h3 className="text-[19px] font-semibold leading-snug">
                    {symptomes[l.symptome]} · {minuscule(niveaux[l.niveau].titre)}
                  </h3>
                  <p className="text-doux">{l.conclusion}</p>
                  {l.doseEssais && <p className="text-[15px] text-discret">Dose des études : {minuscule(l.doseEssais)}.</p>}
                  {l.sources.length > 0 && (
                    <p className="text-[14px] text-discret">
                      Sources :{" "}
                      {l.sources.map((s, i) => (
                        <span key={s}>
                          {i > 0 && " · "}
                          <a href={sources[s].url} target="_blank" rel="noopener" className="underline underline-offset-2">
                            {sources[s].court}, {sources[s].annee}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-[15px] text-discret">
            Niveaux de A (effet démontré) à E (aucun essai) :{" "}
            <Link href="/comment-nous-classons/" className="lien">
              notre échelle
            </Link>
            .
          </p>
        </section>

        {actif.vigilance && (
          <section className="flex flex-col gap-3 rounded-3xl border-[1.5px] border-rouille bg-argile px-6 py-6 md:px-8">
            <h2 className="text-[22px] font-medium leading-tight md:text-[26px]">Précautions</h2>
            <p className="max-w-[46em]">{actif.vigilance}</p>
            {actif.sourcesVigilance && (
              <p className="text-[14px] text-discret">
                Sources :{" "}
                {actif.sourcesVigilance.map((s, i) => (
                  <span key={s}>
                    {i > 0 && " · "}
                    <a href={sources[s].url} target="_blank" rel="noopener" className="underline underline-offset-2">
                      {sources[s].court}, {sources[s].annee}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </section>
        )}

        {dans.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="titre-2">Les compléments qui en contiennent</h2>
            <p className="max-w-[44em] text-doux">
              Les formules de nos comparatifs, avec la dose par jour affichée sur leur fiche. Une dose « comparable »
              atteint au moins les trois quarts de celle des études, avec le même type d'extrait.
            </p>
            <ul className="flex flex-col">
              {dans.map(({ produit, actif: a }) => (
                <li key={produit.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-trait py-3.5 last:border-b">
                  <Link href={lienProduit(produit)} className="text-[18px] font-semibold underline-offset-4 hover:underline">
                    {produit.nom}
                  </Link>
                  <span className="text-[16px] text-doux">
                    {a.dose} ·{" "}
                    {a.comparable ? (
                      <strong className="font-semibold text-encre">dose comparable aux études</strong>
                    ) : (
                      `dose non comparable${a.remarque ? ` : ${a.remarque}` : ""}`
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="flex flex-col gap-6">
          <h2 className="titre-2">Vos questions</h2>
          <Faq questions={questions} />
        </section>

        {voisins.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="titre-3">
              Autres actifs étudiés · {symptomesEtudies.map((x) => symptomes[x].toLowerCase()).join(", ")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {voisins.map((v) => (
                <Link key={v} href={cheminActif(v)} className="rounded-full border border-trait bg-white px-4 py-2 text-[15px] hover:bg-sauge">
                  {actifs[v].nom}
                </Link>
              ))}
              <Link href="/actifs/" className="rounded-full bg-foret px-4 py-2 text-[15px] text-white">
                Tous les actifs
              </Link>
            </div>
          </section>
        )}

        <EncadreMedical sujet="Cette page porte sur un ingrédient de compléments alimentaires." />
      </div>
    </>
  );
}
