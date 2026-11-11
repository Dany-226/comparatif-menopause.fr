import Link from "next/link";
import { BandeauTransparence } from "@/components/BandeauTransparence";
import { EncadreMedical } from "@/components/EncadreMedical";
import { EntetePage } from "@/components/EntetePage";
import { FlecheDroite } from "@/components/Icones";
import { JsonLd } from "@/components/JsonLd";
import { VisuelProduit } from "@/components/VisuelProduit";
import { avisPublies, cheminAvis } from "@/data/avis";
import { produits, type Usage } from "@/data/produits";
import { comparatifs, site } from "@/data/site";
import { dateLongue, prix } from "@/lib/format";
import { meta } from "@/lib/meta";
import { classer, noteMax, type ProduitClasse } from "@/lib/score";

const chemin = "/avis/";

export const metadata = meta({
  titre: `Avis sur les compléments ménopause : ${avisPublies.length} formules analysées`,
  titreComplet: true,
  description:
    "Nos avis détaillés sur les compléments alimentaires pour la ménopause et le ventre gonflé : composition face aux études, note, prix par jour et précautions, formule par formule.",
  chemin,
});

type Ligne = { produit: ProduitClasse; total: number; chemin: string };

function lignes(usage: Usage): Ligne[] {
  const classes = classer(produits, usage);
  return classes.flatMap((p) => {
    const avis = avisPublies.find((a) => a.produit === p.id);
    return avis ? [{ produit: p, total: classes.length, chemin: cheminAvis(avis) }] : [];
  });
}

const rang = (n: number) => (n === 1 ? "1er" : `${n}e`);

function Carte({ produit, total, chemin }: Ligne) {
  return (
    <Link
      href={chemin}
      className="group flex flex-col gap-4 rounded-[22px] border border-trait bg-white p-5 transition-colors hover:bg-sauge md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <VisuelProduit id={produit.id} format={produit.format} className="size-[72px]" sizes="72px" />
        <div className="min-w-0 flex-1">
          <div className="surtitre !text-[12px]">{produit.marque}</div>
          <h3 className="mt-1 text-[21px] font-medium leading-tight tracking-[-0.01em]">{produit.nom}</h3>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[30px] font-semibold leading-none tabular-nums">
            {produit.note}
            <span className="text-[16px] font-normal text-discret">/{noteMax}</span>
          </div>
          <div className="mt-1 text-[14px] text-discret">
            {rang(produit.rang)} sur {total}
          </div>
        </div>
      </div>
      <p className="text-[16px] leading-snug text-doux">{produit.resume}</p>
      <div className="mt-auto flex items-center justify-between gap-4 text-[15px]">
        <span className="text-discret">{prix(produit.parJour)} par jour</span>
        <span className="inline-flex items-center gap-2 font-medium underline-offset-4 group-hover:underline">
          Lire l'avis <FlecheDroite taille={16} />
        </span>
      </div>
    </Link>
  );
}

export default function Page() {
  const groupes = (["confort", "ventre"] as Usage[])
    .map((usage) => ({ usage, comparatif: comparatifs.find((c) => c.usage === usage && c.publiee), lignes: lignes(usage) }))
    .filter((g) => g.comparatif && g.lignes.length > 0);
  const majLe = avisPublies.map((a) => a.majLe).sort().at(-1)!;

  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: `Avis sur les compléments ménopause`,
              url: `${site.url}${chemin}`,
              inLanguage: "fr-FR",
              dateModified: majLe,
              publisher: { "@type": "Organization", name: site.editeur },
              mainEntity: {
                "@type": "ItemList",
                itemListElement: groupes
                  .flatMap((g) => g.lignes)
                  .map((l, i) => ({ "@type": "ListItem", position: i + 1, name: `Avis ${l.produit.nom}`, url: `${site.url}${l.chemin}` })),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Avis", item: `${site.url}${chemin}` },
              ],
            },
          ],
        }}
      />

      <EntetePage
        surtitre={`Avis détaillés · mis à jour le ${dateLongue(majLe)}`}
        titre="Nos avis sur les compléments ménopause"
        chapo="Une page par formule : chaque actif comparé à la dose des études, la note et le rang qu'elle obtient dans notre classement, son prix par jour et ses précautions d'emploi."
      />

      <BandeauTransparence />

      {groupes.map((g) => (
        <section key={g.usage} className="conteneur flex flex-col gap-6 pt-12 md:pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="titre-2">{g.usage === "confort" ? "Ménopause : formules générales" : "Ventre gonflé"}</h2>
              <p className="max-w-[44em] text-doux">
                {g.lignes.length} avis, dans l'ordre du classement. Le rang et la note sont ceux du{" "}
                <Link href={g.comparatif!.chemin} className="lien">
                  comparatif « {g.comparatif!.court.toLowerCase()} »
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {g.lignes.map((l) => (
              <Carte key={l.chemin} {...l} />
            ))}
          </div>
        </section>
      ))}

      <section className="conteneur flex flex-col gap-3 pt-12 md:pt-16">
        <h2 className="titre-2">Comment nous écrivons ces avis</h2>
        <p className="max-w-[44em] leading-relaxed">
          Aucune formule n'a été testée par nos soins : nous jugeons chacune sur sa composition, actif par actif, à la dose
          où elle les contient, face aux études publiées. La note suit{" "}
          <Link href="/comment-nous-classons/" className="lien">
            notre grille
          </Link>
          , la même pour toutes, et les niveaux de preuve renvoient au{" "}
          <Link href="/preuves-complements-menopause/" className="lien">
            tableau des preuves
          </Link>
          . Aucune marque ne paie pour figurer ici.
        </p>
      </section>

      <section className="conteneur pb-6 pt-12 md:pt-16">
        <EncadreMedical sujet="Ces pages analysent des compléments alimentaires." />
      </section>
    </>
  );
}
