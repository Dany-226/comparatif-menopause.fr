import Link from "next/link";
import type { Avis } from "@/data/avis";
import { cheminAvis } from "@/data/avis";
import { produits } from "@/data/produits";
import { comparatifs, pilier, site } from "@/data/site";
import { dateLongue, prix } from "@/lib/format";
import { mention } from "@/lib/marchand";
import { classer, noteMax } from "@/lib/score";
import { BandeauTransparence } from "./BandeauTransparence";
import { EncadreMedical } from "./EncadreMedical";
import { Faq, type Question } from "./Faq";
import { FicheProduit } from "./FicheProduit";
import { Coche, Pilule, Tiret } from "./Icones";
import { JsonLd } from "./JsonLd";
import { LienMarchand } from "./LienMarchand";
import { TableauComparatif } from "./TableauComparatif";

/**
 * Gabarit d'une page d'avis. Le texte vient de data/avis.ts ; la note, le rang, le prix,
 * les actifs et les alternatives viennent des mêmes données que le comparatif.
 */
export function PageAvis({ avis }: { avis: Avis }) {
  const usage = produits.find((p) => p.id === avis.produit)!.usage;
  const classes = classer(produits, usage);
  const produit = classes.find((p) => p.id === avis.produit)!;
  const total = classes.length;
  const [marchand] = produit.marchands;
  const adresse = `${site.url}${cheminAvis(avis)}`;
  const comparatif = comparatifs.find((c) => c.usage === usage && c.publiee) ?? comparatifs.find((c) => c.chemin === pilier)!;
  const base = comparatif.chemin;
  const libelleFil = usage === "confort" ? "Meilleur complément ménopause" : "Ventre gonflé ménopause";

  // Alternatives : les deux premiers du classement, puis (pour le confort) le mieux classé sans phyto-œstrogènes ni actée.
  const sansHormonal =
    usage === "confort" ? classes.find((p) => p.id !== produit.id && !p.faits.phytoOestrogenes && !p.faits.actee) : undefined;
  const alternatives = [produit, ...classes.filter((p) => p.id !== produit.id).slice(0, 2), ...(sansHormonal ? [sansHormonal] : [])]
    .filter((p, i, t) => t.findIndex((q) => q.id === p.id) === i)
    .sort((a, b) => a.rang - b.rang);

  const deuxPremiers = classes.filter((p) => p.id !== produit.id).slice(0, 2);
  const sansHormonalEnPlus = sansHormonal && !deuxPremiers.some((p) => p.id === sansHormonal.id);
  const verdict = avis.verdict(produit, total);
  const questions: Question[] = avis.questions(produit).map((q) => ({
    question: q.question,
    texte: q.paragraphes.join(" "),
    reponse: (
      <>
        {q.paragraphes.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </>
    ),
  }));

  const sommaire = [
    { href: "#verdict", libelle: "Notre verdict" },
    { href: "#pour-qui", libelle: "Pour qui, et pour qui pas" },
    { href: "#analyse", libelle: "Composition et preuves" },
    { href: "#alternatives", libelle: "Les alternatives" },
    { href: "#questions", libelle: "Vos questions" },
  ];

  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@graph": [
            {
              // Produit en entité principale, avis imbriqué : c'est la forme que Google valide
              // pour un avis éditorial (un Product seul exige offers, review ou aggregateRating).
              "@type": "Product",
              name: produit.nom,
              brand: { "@type": "Brand", name: produit.marque },
              description: produit.composition,
              review: {
                "@type": "Review",
                name: avis.titre(produit, total),
                url: adresse,
                inLanguage: "fr-FR",
                datePublished: avis.majLe,
                dateModified: avis.majLe,
                reviewBody: verdict.join(" "),
                author: { "@type": "Organization", name: site.signature, url: site.url },
                publisher: { "@type": "Organization", name: site.editeur },
                reviewRating: { "@type": "Rating", ratingValue: produit.note, bestRating: noteMax, worstRating: 0 },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: comparatif.titre, item: `${site.url}${base}` },
                { "@type": "ListItem", position: 3, name: `Avis ${produit.nom}`, item: adresse },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: questions.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: { "@type": "Answer", text: q.texte },
              })),
            },
          ],
        }}
      />

      <section className="conteneur flex flex-col gap-7 pb-8 pt-7 md:gap-9 md:pb-12 md:pt-12">
        <nav aria-label="Fil d'Ariane" className="text-[15px] text-discret">
          <Link href="/" className="underline-offset-4 hover:underline">
            Accueil
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href={base} className="underline-offset-4 hover:underline">
            {libelleFil}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>Avis {produit.nom}</span>
        </nav>

        <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="surtitre md:!text-[14px]">
              Avis · {produit.marque} · mis à jour le {dateLongue(avis.majLe)}
            </div>
            <h1 className="titre-1 md:!text-[58px]">
              {produit.nom} : notre avis{" "}
              <Pilule className="ml-1 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-citron" />
            </h1>
            <p className="max-w-[38em] text-[18px] leading-normal text-doux md:text-[20px]">{produit.resume}</p>
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] bg-sauge p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[46px] font-semibold leading-none tracking-[-0.02em] tabular-nums">
                  {produit.note}
                  <span className="text-[20px] font-normal text-discret">/{noteMax}</span>
                </div>
                <div className="mt-1 text-[15px] text-doux">
                  {produit.rang === 1 ? "1er" : `${produit.rang}e`} sur {total} au{" "}
                  <Link href={`${base}#classement`} className="lien">
                    classement
                  </Link>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[28px] font-semibold leading-none tabular-nums">{prix(produit.parJour)}</div>
                <div className="mt-1 text-[15px] text-doux">par jour</div>
              </div>
            </div>
            <LienMarchand produit={produit} emplacement="avis-entete" className="min-h-14 w-full text-[18px]" />
            <div className="text-center text-[14px] leading-snug text-discret first-letter:uppercase">{mention(marchand)}</div>
          </div>
        </div>

        <nav aria-label="Sommaire" className="flex flex-wrap gap-2">
          {sommaire.map((s) => (
            <a key={s.href} href={s.href} className="rounded-full border border-trait bg-white px-4 py-2 text-[15px] hover:bg-sauge">
              {s.libelle}
            </a>
          ))}
        </nav>
      </section>

      <BandeauTransparence />

      <section id="verdict" className="conteneur flex scroll-mt-6 flex-col gap-5 pt-12 md:pt-16">
        <h2 className="titre-2">Notre verdict</h2>
        <div className="flex max-w-[46em] flex-col gap-4 text-[18px] leading-relaxed">
          {verdict.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>

      <section id="pour-qui" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <h2 className="titre-2">Pour qui, et pour qui pas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-[20px] bg-sauge px-6 py-6">
            <h3 className="surtitre">Peut convenir si</h3>
            <ul className="flex flex-col gap-3">
              {avis.pourQui.map((t) => (
                <li key={t} className="flex gap-2.5 text-[17px] leading-snug">
                  <Coche className="mt-[3px] shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] bg-argile px-6 py-6">
            <h3 className="surtitre !text-rouille">À écarter si</h3>
            <ul className="flex flex-col gap-3">
              {avis.aEviter.map((t) => (
                <li key={t} className="flex gap-2.5 text-[17px] leading-snug">
                  <Tiret className="mt-[3px] shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="analyse" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <div className="flex flex-col gap-2">
          <h2 className="titre-2">Composition, note et preuves</h2>
          <p className="max-w-[44em] text-doux">
            La même fiche que dans le comparatif : chaque actif est comparé à la dose utilisée dans les essais, et chaque
            niveau de preuve renvoie au{" "}
            <Link href="/preuves-complements-menopause/" className="lien">
              tableau des preuves
            </Link>
            . La note suit{" "}
            <Link href="/comment-nous-classons/" className="lien">
              notre grille
            </Link>
            .
          </p>
        </div>
        <FicheProduit produit={produit} lienAvis={false} />
      </section>

      <section id="alternatives" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <div className="flex flex-col gap-2">
          <h2 className="titre-2">Les alternatives à {produit.nom}</h2>
          <p className="max-w-[44em] text-doux">
            Les deux premières formules du classement
            {sansHormonalEnPlus
              ? ", et la mieux classée sans phyto-œstrogènes ni actée à grappes."
              : sansHormonal
                ? `. ${sansHormonal.nom} est aussi la mieux classée sans phyto-œstrogènes ni actée à grappes${sansHormonal.faits.antidepresseurs ? ", mais elle est déconseillée sous antidépresseurs" : ""}.`
                : "."}
          </p>
        </div>
        <TableauComparatif produits={alternatives} compact base={base} emplacement="avis-alternatives" />
        <Link href={`${base}#classement`} className="lien self-start py-2">
          Voir les {total} formules du classement
        </Link>
      </section>

      <section id="questions" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <h2 className="titre-2">Vos questions sur {produit.nom}</h2>
        <Faq questions={questions} />
      </section>

      <section className="conteneur pb-6 pt-12 md:pt-16">
        <EncadreMedical sujet="Cette page analyse un complément alimentaire." />
      </section>
    </>
  );
}
