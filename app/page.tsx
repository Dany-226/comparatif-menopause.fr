import Link from "next/link";
import { BandeauTransparence } from "@/components/BandeauTransparence";
import { EncadreMedical } from "@/components/EncadreMedical";
import { Etoile, FlecheBas, FlecheDroite, Pilule } from "@/components/Icones";
import { JsonLd } from "@/components/JsonLd";
import { NiveauPreuve } from "@/components/NiveauPreuve";
import { Photo } from "@/components/Photo";
import { SectionPreuves } from "@/components/SectionPreuves";
import { TableauComparatif } from "@/components/TableauComparatif";
import { produits } from "@/data/produits";
import { sources } from "@/data/preuves";
import { comparatifs, pagesInstitutionnelles, pagesReference, pilier, site } from "@/data/site";
import { dateLongue, prix } from "@/lib/format";
import { meta } from "@/lib/meta";
import { classer, grille, noteMax } from "@/lib/score";

export const metadata = meta({
  titre: `Comparatif compléments ménopause : ${produits.filter((p) => p.usage === "confort").length} formules classées et sourcées`,
  titreComplet: true,
  description: site.description,
  chemin: "/",
});

const chiffres = [
  { valeur: "80 à 90 %", texte: "des femmes ont des symptômes à la ménopause" },
  { valeur: "20 à 25 %", texte: "ont des troubles sévères" },
  { valeur: "51 ans", texte: "l'âge moyen de la ménopause" },
];

/** Les cartes « Nos comparatifs » : seules les pages publiées, jamais d'annonce « en préparation ». */
const cartes = [
  ...comparatifs.filter((c) => c.publiee),
  ...pagesReference.filter((p) => p.publiee),
  ...pagesInstitutionnelles.filter((p) => p.publiee && p.chemin === "/comment-nous-classons/"),
].slice(0, 3);

export default function Accueil() {
  const classes = classer(produits, "confort");
  const premier = classes[0];
  const enTete = classes.slice(0, 5);

  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.nom,
          url: site.url,
          inLanguage: "fr-FR",
          description: site.description,
          publisher: { "@type": "Organization", name: site.editeur },
        }}
      />

      <section className="conteneur flex flex-col gap-7 pb-10 pt-7 md:gap-9 md:pb-16 md:pt-12">
        <div className="grid items-end gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-[18px]">
            <div className="surtitre md:!text-[14px]">Compléments alimentaires · ménopause</div>
            <h1 className="titre-1">
              Comparatif ménopause <Pilule className="mx-0.5 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-ciel md:mx-1" />
              <span className="sr-only"> : </span> <br />
              les compléments classés, <br className="max-xl:hidden" />
              <span className="whitespace-nowrap">
                preuves <Etoile className="mx-0.5 inline-block size-[0.7em] align-middle" /> et prix
              </span>{" "}
              à l'appui
            </h1>
          </div>
          <div className="flex min-w-0 flex-col items-stretch gap-[18px] md:items-start">
            <p className="text-[18px] leading-normal text-doux md:text-[19px]">
              Aucun complément n'a l'efficacité démontrée d'un médicament. Nous comparons ceux qui existent avec une
              grille publique, la même pour tous.
            </p>
            <a href="#le-classement" className="bouton bouton-foret min-h-14 justify-between gap-3.5 py-[9px] pl-7 pr-[9px] text-[18px]">
              Voir le classement
              <span className="flex size-[38px] items-center justify-center rounded-full bg-citron">
                <FlecheBas taille={18} couleur="#14241B" />
              </span>
            </a>
          </div>
        </div>

        <div className="grid gap-3 md:gap-5 lg:grid-cols-[2.1fr_1fr] lg:grid-rows-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-[22px] bg-photo md:min-h-[420px] md:rounded-[28px] lg:row-span-2 lg:min-h-[520px]">
            <Photo
              nom="01-accueil-horizon"
              sizes="(min-width: 1024px) 760px, 100vw"
              prioritaire
              position="22% 30%"
              className="absolute inset-0"
            />
            <Link
              href={`${pilier}#${premier.id}`}
              className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4 rounded-[18px] bg-white/95 p-4 backdrop-blur-sm transition-transform hover:-translate-y-0.5 md:inset-x-auto md:bottom-5 md:right-5 md:w-[340px] md:rounded-[22px] md:p-5"
            >
              <div className="min-w-0">
                <div className="surtitre !text-[12px]">N° 1 du comparatif</div>
                <div className="mt-1 text-[20px] font-medium leading-tight tracking-[-0.01em] md:text-[22px]">{premier.nom}</div>
                <div className="mt-0.5 text-[15px] text-doux">
                  <strong className="font-semibold text-encre">
                    {premier.note}/{noteMax}
                  </strong>{" "}
                  · {prix(premier.parJour)} par jour
                </div>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-encre">
                <FlecheDroite couleur="#FFFFFF" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:contents">
            <div className="flex min-h-[190px] flex-col justify-between gap-4 rounded-[22px] bg-citron p-4 md:rounded-[28px] md:p-6">
              <div className="etiquette">La grille</div>
              <div>
                <div className="text-[76px] font-normal leading-[0.9] tracking-[-0.05em] lg:text-[96px]">{grille.length}</div>
                <div className="mt-2 text-[15px] font-medium leading-[1.3] lg:text-[18px]">
                  critères publics, les mêmes pour chaque formule
                </div>
              </div>
            </div>
            <div className="sombre flex min-h-[190px] flex-col justify-between gap-4 rounded-[22px] bg-foret p-4 text-white md:rounded-[28px] md:p-6">
              <div className="etiquette text-citron">Preuves</div>
              <div className="text-[18px] leading-[1.2] tracking-[-0.015em] lg:text-[23px]">
                Chaque actif reçoit un niveau de preuve
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2" aria-hidden="true">
                {(["A", "B", "C", "D", "E"] as const).map((n) => (
                  <NiveauPreuve key={n} niveau={n} surSombre />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BandeauTransparence />

      <section id="le-classement" className="conteneur flex scroll-mt-4 flex-col gap-5 pb-12 pt-11 md:gap-7 md:pb-[72px] md:pt-[72px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="flex flex-col gap-2.5">
            <h2 className="titre-2 flex items-center gap-4">
              Le classement
              <Pilule className="hidden h-[26px] w-[52px] shrink-0 -rotate-[14deg] bg-citron md:inline-block" />
            </h2>
            <p className="max-w-[40em] text-[16px] text-discret md:text-[17px]">
              Les {enTete.length} premiers des {classes.length} compléments comparés, notés sur {noteMax} avec la même
              grille. Prix relevés le {dateLongue(classes.map((p) => p.prixReleveLe).sort()[0])}.
            </p>
          </div>
          <Link href={pilier} className="bouton bouton-foret text-[17px]">
            Les {classes.length} formules en détail
            <FlecheDroite taille={18} />
          </Link>
        </div>
        <TableauComparatif produits={enTete} compact base={pilier} emplacement="accueil" />
      </section>

      <section aria-label="La ménopause en chiffres" className="border-y border-trait bg-sauge">
        <div className="conteneur flex flex-col gap-5 py-9 md:py-12">
          <dl className="grid gap-6 md:grid-cols-3 md:gap-10">
            {chiffres.map((c) => (
              <div key={c.valeur} className="flex flex-col-reverse justify-end gap-1 border-l-[1.5px] border-foret pl-5">
                <dt className="text-[17px] text-doux">{c.texte}</dt>
                <dd className="text-[40px] font-normal leading-none tracking-[-0.03em] md:text-[52px]">{c.valeur}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[15px] text-discret">
            Source :{" "}
            <a href={sources.has2025.url} target="_blank" rel="noopener" className="lien">
              Haute Autorité de santé, septembre 2025
            </a>
          </p>
        </div>
      </section>

      <section className="conteneur flex flex-col gap-6 pt-12 md:gap-8 md:pt-[80px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="titre-2">Nos comparatifs</h2>
          <p className="max-w-[30em] text-[16px] text-discret md:text-[17px]">
            Mis à jour le {dateLongue(site.majLe)}.
          </p>
        </div>
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {cartes.map((c, i) => (
            <Link
              key={c.chemin}
              href={c.chemin}
              className={`group flex min-h-[260px] flex-col justify-between gap-6 rounded-3xl p-6 md:p-7 ${
                i === 0 ? "sombre bg-foret text-white" : "border border-trait bg-white"
              }`}
            >
              <div className={`etiquette ${i === 0 ? "text-citron" : ""}`}>{c.court}</div>
              <div className="flex flex-col gap-2">
                <h3 className="titre-3">{c.titre}</h3>
                <p className={`text-[16px] ${i === 0 ? "text-sauge" : "text-doux"}`}>{c.resume}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className={`text-[15px] ${i === 0 ? "text-pale" : "text-discret"}`}>
                  {c.usage ? `${classer(produits, c.usage).length} formules comparées` : "Lire la page"}
                </span>
                <span
                  className={`flex size-12 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${
                    i === 0 ? "bg-citron" : "bg-encre"
                  }`}
                >
                  <FlecheDroite couleur={i === 0 ? "#14241B" : "#FFFFFF"} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="conteneur grid items-center gap-8 pt-14 md:gap-14 md:pt-[96px] lg:grid-cols-[1fr_1.15fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-photo md:rounded-[28px] lg:aspect-[5/5.4]">
          <Photo nom="10-methode-carnet" sizes="(min-width: 1024px) 520px, 100vw" position="40% 40%" className="absolute inset-0" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="surtitre md:!text-[14px]">Notre méthode</div>
          <h2 className="titre-2">Cinq critères, notés chacun sur deux points</h2>
          <ol className="flex flex-col">
            {grille.map((c, i) => (
              <li key={c.cle} className="flex gap-4 border-t border-trait py-4 last:border-b">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sauge text-[16px] font-bold tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold leading-snug">{c.titre}</h3>
                  <p className="text-[16px] text-doux">{c.mesure}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-3">
            <Link href="/comment-nous-classons/" className="bouton bouton-foret text-[17px]">
              Lire la méthode complète
            </Link>
            <Link href="/preuves-complements-menopause/" className="bouton border-[1.5px] border-foret text-[17px] hover:bg-sauge">
              Le tableau des preuves
            </Link>
          </div>
        </div>
      </section>

      <section className="conteneur pb-14 pt-14 md:pb-20 md:pt-[88px]">
        <EncadreMedical sujet="Ce site compare des compléments alimentaires." />
      </section>

      <SectionPreuves idsActifs={classes.flatMap((p) => p.actifs.map((a) => a.id))} limite={5} />
    </>
  );
}
