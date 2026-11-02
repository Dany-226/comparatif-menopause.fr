import Link from "next/link";
import { lienProduit } from "@/lib/liens";
import { produits, type Usage } from "@/data/produits";
import { actifs, preuves, sources, sourcesCitees, symptomes } from "@/data/preuves";
import { comparatifs, historique, site, type PageSite } from "@/data/site";
import type { NomPhoto } from "@/data/photos";
import { classer, grille, noteMax, pointsPreuves } from "@/lib/score";
import { selections } from "@/lib/selections";
import { dateCourte, dateLongue, prix } from "@/lib/format";
import { ou } from "@/lib/marchand";
import { BandeauTransparence } from "./BandeauTransparence";
import { Bibliographie } from "./Bibliographie";
import { CarteSelection } from "./CarteSelection";
import { EncadreAuteur } from "./EncadreAuteur";
import { EncadreMedical } from "./EncadreMedical";
import { Faq, type Question } from "./Faq";
import { FicheProduit } from "./FicheProduit";
import { Etoile, FlecheBas, Pilule } from "./Icones";
import { JsonLd } from "./JsonLd";
import { Photo } from "./Photo";
import { SectionPreuves } from "./SectionPreuves";
import { Securite } from "./Securite";
import { SelonSituation } from "./SelonSituation";
import { TableauComparatif } from "./TableauComparatif";
import { TuilesComparatif, type Pastille } from "./TuilesComparatif";

type Props = {
  page: PageSite;
  usage: Usage;
  /** Le titre est coupé en deux pour y glisser la pilule décorative. */
  titre: [string, string];
  chapo: string;
  photo: NomPhoto;
  photoPosition?: string;
  /** Questions propres à la page, ajoutées avant les questions communes. */
  questions?: Question[];
};

const sommaire = [
  { href: "#selections", libelle: "Nos trois sélections" },
  { href: "#classement", libelle: "Le classement complet" },
  { href: "#situation", libelle: "Selon votre situation" },
  { href: "#preuves", libelle: "Ce que disent les études" },
  { href: "#fiches", libelle: "Les produits en détail" },
  { href: "#etiquette", libelle: "Lire une étiquette" },
  { href: "#securite", libelle: "Sécurité" },
  { href: "#questions", libelle: "Vos questions" },
  { href: "#sources", libelle: "Sources" },
];

/** Gabarit d'un comparatif. Tout ce qui est chiffré vient de data/ et de lib/score. */
export function PageComparatif({ page, usage, titre, chapo, photo, photoPosition, questions = [] }: Props) {
  const classes = classer(produits, usage);
  const premier = classes[0];
  const troisSelections = selections(classes);
  const prixReleveLe = classes.map((p) => p.prixReleveLe).sort()[0];
  const toutesSources = sourcesCitees();
  const idsActifs = classes.flatMap((p) => p.actifs.map((a) => a.id));

  const autres = comparatifs.filter((c) => c.publiee && c.chemin !== page.chemin);
  const parSymptome = autres.length >= 2;
  const pastilles: Pastille[] = parSymptome
    ? autres.map((c) => ({ libelle: c.court, href: c.chemin }))
    : [
        { libelle: "Le classement", href: "#classement" },
        { libelle: "Les preuves", href: "#preuves" },
        { libelle: "Votre situation", href: "#situation" },
        { libelle: "Vos questions", href: "#questions" },
      ];

  // Faits tirés des données, pour l'encadré « En bref » et les réponses.
  const niveauxB = preuves.filter((p) => p.niveau === "B" && p.symptome !== "force");
  const actifsB = (symptome: string) => niveauxB.filter((p) => p.symptome === symptome).map((p) => actifs[p.actifId].nom.toLowerCase());
  const aucunA = !preuves.some((p) => p.niveau === "A");
  const sansHormonal = classes.find((p) => !p.faits.phytoOestrogenes && !p.faits.actee);
  const parJour = classes.map((p) => p.parJour);
  const [moinsCher, plusCher] = [Math.min(...parJour), Math.max(...parJour)];
  const ecart = classes
    .filter((p) => p.marchands.length > 1)
    .map((p) => ({ p, bas: p.marchands[0], haut: [...p.marchands].sort((a, b) => b.prix - a.prix)[0] }))
    .sort((a, b) => b.haut.prix / b.bas.prix - a.haut.prix / a.bas.prix)[0];
  const liste = (mots: string[]) => (mots.length > 1 ? `${mots.slice(0, -1).join(", ")} et ${mots[mots.length - 1]}` : mots[0]);

  const communes: Question[] = [
    ...(sansHormonal
      ? [
          {
            question: "Quel est le meilleur complément pour la ménopause sans hormones ?",
            texte: `Aucun complément alimentaire ne contient d'hormones. La vraie question est celle des phyto-œstrogènes, des composés végétaux qui imitent faiblement les œstrogènes, et de l'actée à grappes. Sans l'un ni l'autre, la formule la mieux notée de ce comparatif est ${sansHormonal.nom} (${sansHormonal.note}/${noteMax}, ${prix(sansHormonal.parJour)} par jour).`,
            reponse: (
              <>
                <p>
                  Aucun complément alimentaire ne contient d'hormones. La vraie question est celle des phyto-œstrogènes,
                  des composés végétaux qui imitent faiblement les œstrogènes (soja, trèfle rouge, houblon, lin), et de
                  l'actée à grappes.
                </p>
                <p>
                  Sans l'un ni l'autre, la formule la mieux notée de ce comparatif est{" "}
                  <a href={lienProduit(sansHormonal, "")}>{sansHormonal.nom}</a> : {sansHormonal.note}/{noteMax},{" "}
                  {prix(sansHormonal.parJour)} par jour.
                </p>
              </>
            ),
          },
        ]
      : []),
    {
      question: "Un complément alimentaire peut-il remplacer un traitement hormonal ?",
      texte:
        "Non. Un complément alimentaire n'est pas un médicament et ne peut revendiquer aucun effet thérapeutique. Le traitement hormonal est un médicament sur ordonnance, que la Haute Autorité de santé place en première intention quand les troubles altèrent la qualité de vie, et qui ne peut pas être recommandé à toutes les femmes. Commencer, refuser ou arrêter un traitement se décide avec un médecin.",
      reponse: (
        <>
          <p>
            Non. Un complément alimentaire n'est pas un médicament et ne peut revendiquer aucun effet thérapeutique.
          </p>
          <p>
            Le traitement hormonal est un médicament sur ordonnance. La Haute Autorité de santé le place en première
            intention quand les troubles altèrent la qualité de vie, et rappelle qu'il ne peut pas être recommandé à
            toutes les femmes. Commencer, refuser ou arrêter un traitement se décide avec un médecin.
          </p>
          <p>
            <a href={sources.has2025.url} target="_blank" rel="noopener">
              Source : Haute Autorité de santé, 2025
            </a>
          </p>
        </>
      ),
    },
    {
      question: "Les phyto-œstrogènes agissent-ils sur les bouffées de chaleur ?",
      texte:
        "Un peu. Une méta-analyse de 17 essais trouve une fréquence des bouffées de chaleur réduite de 20,6 % face au placebo avec les isoflavones de soja ; une autre, parue dans le JAMA, environ 0,8 bouffée de moins par jour. La revue Cochrane de 2013 ne juge pas ces preuves concluantes, et la Menopause Society ne recommande pas le soja.",
      reponse: (
        <>
          <p>
            Un peu. Avec les isoflavones de soja, une méta-analyse de 17 essais trouve une fréquence des bouffées de
            chaleur réduite de 20,6 % face au placebo. Une autre, parue dans le JAMA, chiffre l'effet à environ 0,8
            bouffée de moins par jour, et note que les trois quarts des essais sont de qualité médiocre.
          </p>
          <p>
            Les avis divergent sur ce que vaut cet effet. La revue Cochrane de 2013 ne juge pas les preuves concluantes,
            sauf pour la génistéine à plus de 30 mg par jour. Les recommandations françaises de 2021 retiennent un
            bénéfice de la génistéine ; la Menopause Society, en 2023, ne recommande pas le soja.
          </p>
          <p>
            <a href={sources.taku2012.url} target="_blank" rel="noopener">
              Taku et al., 2012
            </a>{" "}
            ·{" "}
            <a href={sources.franco2016.url} target="_blank" rel="noopener">
              JAMA, 2016
            </a>{" "}
            ·{" "}
            <a href={sources.cochrane2013.url} target="_blank" rel="noopener">
              Cochrane, 2013
            </a>{" "}
            ·{" "}
            <a href={sources.cngof2021.url} target="_blank" rel="noopener">
              CNGOF, 2021
            </a>{" "}
            ·{" "}
            <a href={sources.menopauseSociety2023.url} target="_blank" rel="noopener">
              Menopause Society, 2023
            </a>
          </p>
        </>
      ),
    },
    {
      question: "Les phyto-œstrogènes sont-ils dangereux ?",
      texte:
        "En 2015, l'Autorité européenne de sécurité des aliments n'a pas relevé d'effet indésirable sur le sein, l'utérus ou la thyroïde chez les femmes ménopausées, à des doses de 35 à 150 mg d'isoflavones par jour. Cette conclusion ne couvre pas les femmes qui ont ou ont eu un cancer dépendant des œstrogènes : pour elles, ces compléments sont déconseillés.",
      reponse: (
        <>
          <p>
            En 2015, l'Autorité européenne de sécurité des aliments n'a pas relevé d'effet indésirable sur le sein,
            l'utérus ou la thyroïde chez les femmes ménopausées, à des doses de 35 à 150 mg d'isoflavones par jour.
          </p>
          <p>
            Cette conclusion ne couvre pas les femmes qui ont ou ont eu un cancer dépendant des œstrogènes. En France,
            les compléments d'isoflavones sont déconseillés en cas d'antécédent personnel ou familial de cancer du sein.
          </p>
          <p>
            <a href={sources.efsa2015.url} target="_blank" rel="noopener">
              EFSA, 2015
            </a>{" "}
            ·{" "}
            <a href={sources.afssa2005.url} target="_blank" rel="noopener">
              Afssa, 2005
            </a>
          </p>
        </>
      ),
    },
    {
      question: "Quelle vitamine prendre à la ménopause ?",
      texte:
        "Aucune vitamine n'a montré d'effet sur les symptômes de la ménopause. Dans un essai de 34 157 femmes, la vitamine D associée au calcium n'a pas réduit le nombre de symptômes. La vitamine B6 a une allégation autorisée sur l'activité hormonale, mais aucun essai chez des femmes ménopausées.",
      reponse: (
        <>
          <p>
            Aucune vitamine n'a montré d'effet sur les symptômes de la ménopause. Dans un essai de 34 157 femmes, la
            vitamine D associée au calcium n'a pas réduit le nombre de symptômes. Pour la vitamine E, les résultats sur
            les bouffées de chaleur sont inconstants.
          </p>
          <p>
            La vitamine B6 a le droit d'afficher qu'elle « contribue à réguler l'activité hormonale ». C'est une
            allégation générale : nous n'avons trouvé aucun essai de la vitamine B6 seule chez des femmes ménopausées.
          </p>
          <p>
            <Link href="/preuves-complements-menopause/">Le tableau complet des preuves</Link>
          </p>
        </>
      ),
    },
    {
      question: "Combien coûte un complément pour la ménopause ?",
      texte: `Dans ce comparatif, de ${prix(moinsCher)} à ${prix(plusCher)} par jour, soit ${prix(Math.round(moinsCher * 30))} à ${prix(Math.round(plusCher * 30))} par mois. Le prix par jour est le prix de la boîte divisé par le nombre de jours qu'elle couvre.`,
      reponse: (
        <>
          <p>
            Dans ce comparatif, de {prix(moinsCher)} à {prix(plusCher)} par jour, soit environ{" "}
            {Math.round(moinsCher * 30)} à {Math.round(plusCher * 30)} € par mois.
          </p>
          <p>
            Nous relevons le prix de la boîte sur la fiche du marchand indiqué, puis nous le divisons par le nombre de
            jours que couvre la boîte à la posologie conseillée. Un contrôle automatique empêche de publier un prix
            relevé depuis plus de 90 jours.
          </p>
        </>
      ),
    },
    ...(ecart
      ? [
          {
            question: "Pharmacie en ligne ou site de la marque : quelle différence ?",
            texte: `Le produit est le même et la réglementation aussi : un complément alimentaire est déclaré à l'administration avant sa vente, où qu'il soit vendu. La différence est le prix. Exemple relevé le ${dateLongue(prixReleveLe)} : ${ecart.p.nom}, ${prix(ecart.bas.prix)} ${ou(ecart.bas)} contre ${prix(ecart.haut.prix)} ${ou(ecart.haut)}.`,
            reponse: (
              <>
                <p>
                  Le produit est le même et la réglementation aussi : un complément alimentaire est déclaré à
                  l'administration avant sa vente, où qu'il soit vendu. Il n'a pas d'autorisation de mise sur le marché
                  comme un médicament.
                </p>
                <p>
                  La différence est le prix. Exemple relevé le {dateLongue(prixReleveLe)} : {ecart.p.nom},{" "}
                  {prix(ecart.bas.prix)} {ou(ecart.bas)} contre {prix(ecart.haut.prix)} {ou(ecart.haut)}. Nous affichons
                  toujours le prix le plus bas que nous avons relevé.
                </p>
                <p>
                  <a href={sources.dgal.url} target="_blank" rel="noopener">
                    Source : ministère de l'Agriculture
                  </a>
                </p>
              </>
            ),
          },
        ]
      : []),
    {
      question: "Quand faut-il consulter ?",
      texte:
        "Dès que les symptômes gênent la vie quotidienne : c'est la situation dans laquelle un traitement peut se discuter. Des symptômes de ménopause avant 40 ans justifient aussi une consultation, pour en rechercher la cause.",
      reponse: (
        <>
          <p>
            Dès que les symptômes gênent la vie quotidienne : c'est la situation dans laquelle un traitement peut se
            discuter. Des symptômes de ménopause avant 40 ans justifient aussi une consultation, pour en rechercher la
            cause.
          </p>
          <p>
            À cette période de la vie, le risque cardiovasculaire est le premier risque de santé. C'est une raison de
            faire le point avec un médecin, avec ou sans traitement.
          </p>
          <p>
            <a href={sources.has2025.url} target="_blank" rel="noopener">
              Source : Haute Autorité de santé, 2025
            </a>
          </p>
        </>
      ),
    },
  ];

  const toutesQuestions = [...questions, ...communes];
  const adresse = `${site.url}${page.chemin}`;

  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${adresse}#article`,
              headline: page.titre,
              description: chapo,
              inLanguage: "fr-FR",
              datePublished: historique[historique.length - 1].date,
              dateModified: site.majLe,
              author: { "@type": "Organization", name: site.signature, url: `${site.url}/a-propos/` },
              publisher: {
                "@type": "Organization",
                name: site.nom,
                legalName: site.editeur,
                url: site.url,
                identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: site.siret.replace(/ /g, "") },
                publishingPrinciples: `${site.url}/comment-nous-classons/`,
              },
              mainEntityOfPage: adresse,
              image: `${site.url}/photos/${photo}-1600.webp`,
              citation: toutesSources.map((s) => ({ "@type": "CreativeWork", name: s.titre, url: s.url })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: page.titre, item: adresse },
              ],
            },
            {
              "@type": "ItemList",
              name: page.titre,
              numberOfItems: classes.length,
              itemListElement: classes.map((p) => ({
                "@type": "ListItem",
                position: p.rang,
                name: p.nom,
                url: `${adresse}#${p.id}`,
              })),
            },
            {
              "@type": "FAQPage",
              mainEntity: toutesQuestions.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: { "@type": "Answer", text: q.texte },
              })),
            },
          ],
        }}
      />

      <section className="conteneur flex flex-col gap-7 pb-8 pt-7 md:gap-9 md:pb-14 md:pt-12">
        <div className="grid items-end gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-[18px]">
            <div className="surtitre md:!text-[14px]">
              Comparatif · mis à jour le <span className="md:hidden">{dateCourte(site.majLe)} {site.majLe.slice(0, 4)}</span>
              <span className="max-md:hidden">{dateLongue(site.majLe)}</span>
            </div>
            <h1 className="titre-1">
              {titre[0]} <Pilule className="mx-0.5 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-ciel md:mx-1" />{" "}
              <br className="max-xl:hidden" />
              {titre[1]}
              <span className="sr-only"> : </span> <br className="max-xl:hidden" />
              <span className="whitespace-nowrap">
                <Etoile className="mx-0.5 inline-block size-[0.7em] align-middle" /> {classes.length} formules
              </span>{" "}
              comparées
            </h1>
          </div>
          <div className="flex min-w-0 flex-col items-stretch gap-[18px] md:items-start">
            <p className="text-[18px] leading-normal text-doux md:text-[19px]">{chapo}</p>
            <a
              href="#classement"
              className="bouton bouton-foret min-h-14 justify-between gap-3.5 py-[9px] pl-7 pr-[9px] text-[18px]"
            >
              Voir le classement
              <span className="flex size-[38px] items-center justify-center rounded-full bg-citron">
                <FlecheBas taille={18} couleur="#14241B" />
              </span>
            </a>
          </div>
        </div>

        <TuilesComparatif
          premier={premier}
          nombre={classes.length}
          nombreSources={toutesSources.length}
          prixReleveLe={prixReleveLe}
          photo={photo}
          photoPosition={photoPosition}
          titrePastilles={parSymptome ? "Par symptôme" : "Dans cette page"}
          pastilles={pastilles}
        />
      </section>

      <BandeauTransparence />

      <section className="conteneur grid gap-5 pt-10 md:gap-6 md:pt-14 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4 rounded-3xl bg-sauge p-6 md:p-8">
          <h2 className="surtitre md:!text-[14px]">En bref</h2>
          <ul className="flex flex-col gap-3 text-[17px] leading-snug md:text-[19px]">
            {aucunA && (
              <li>
                <strong className="font-semibold">Aucun actif n'atteint le niveau A.</strong> Aucun complément n'a
                l'efficacité démontrée d'un médicament.
              </li>
            )}
            <li>
              <strong className="font-semibold">Les mieux étayés, au niveau B :</strong> {liste(actifsB("bouffees"))} pour
              les bouffées de chaleur, {liste(actifsB("humeur"))} pour l'humeur, {liste(actifsB("global"))} pour
              l'ensemble des symptômes. L'effet est modeste.
            </li>
            <li>
              <strong className="font-semibold">En tête du classement :</strong>{" "}
              <a href={lienProduit(premier, "")} className="lien">
                {premier.nom}
              </a>
              , {premier.note}/{noteMax}, {prix(premier.parJour)} par jour.
            </li>
            <li>
              <strong className="font-semibold">Quand les symptômes gênent la vie quotidienne,</strong> le traitement
              de première intention est médical et se décide avec un médecin.
            </li>
          </ul>
        </div>
        <nav aria-label="Sommaire" className="flex flex-col gap-3 rounded-3xl border border-trait bg-white p-6 md:p-8">
          <h2 className="surtitre md:!text-[14px]">Sommaire</h2>
          <ol className="flex flex-col text-[17px]">
            {sommaire.map((s, i) => (
              <li key={s.href}>
                <a href={s.href} className="flex gap-3 py-1.5 underline-offset-4 hover:underline">
                  <span className="w-5 shrink-0 text-right tabular-nums text-discret">{i + 1}</span>
                  {s.libelle}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section id="selections" className="conteneur flex scroll-mt-4 flex-col gap-6 pb-3 pt-11 md:gap-8 md:pb-6 md:pt-[72px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="titre-2 flex items-center gap-4">
            Nos trois sélections
            <span aria-hidden="true" className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-encre md:flex">
              <FlecheBas couleur="#D6F15B" />
            </span>
          </h2>
          <p className="max-w-[30em] text-[16px] text-discret md:text-[17px]">
            Trois façons de choisir, tirées du même classement.
          </p>
        </div>
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {troisSelections.map((s, i) => (
            <CarteSelection key={s.produit.id} produit={s.produit} titre={s.titre} enAvant={i === 0} />
          ))}
        </div>
      </section>

      <section id="classement" className="conteneur flex scroll-mt-4 flex-col gap-5 pb-3 pt-11 md:gap-7 md:pb-6 md:pt-[72px]">
        <div className="flex flex-col gap-2.5">
          <h2 className="titre-2 flex items-center gap-4">
            Le classement complet
            <Pilule className="hidden h-[26px] w-[52px] shrink-0 -rotate-[14deg] bg-citron md:inline-block" />
          </h2>
          <p className="max-w-[46em] text-[16px] text-discret md:text-[17px]">
            Note sur {noteMax} : {grille.length} critères notés chacun sur 2 points, soit{" "}
            {grille.map((c) => c.titre.toLowerCase()).join(", ")}. Prix relevés le {dateLongue(prixReleveLe)}.{" "}
            <Link href="/comment-nous-classons/" className="lien whitespace-nowrap">
              Le détail de la grille
            </Link>
          </p>
        </div>
        <TableauComparatif produits={classes} />
      </section>

      <section className="conteneur pb-4 pt-6 md:pt-8">
        <EncadreMedical />
      </section>

      <section id="situation" className="conteneur flex scroll-mt-4 flex-col gap-6 pb-14 pt-11 md:gap-8 md:pb-20 md:pt-[72px]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="titre-2">Lequel choisir selon votre situation ?</h2>
          <p className="max-w-[30em] text-[16px] text-discret md:text-[17px]">
            Chaque liste applique un filtre au classement. Aucune formule n'y est placée à la main.
          </p>
        </div>
        <SelonSituation classes={classes} />
      </section>

      <SectionPreuves idsActifs={idsActifs} />

      <section id="fiches" className="conteneur flex scroll-mt-4 flex-col gap-5 pt-14 md:gap-7 md:pt-[88px]">
        <h2 className="titre-2 md:!text-[40px]">Les {classes.length} produits en détail</h2>
        {classes.map((p) => (
          <FicheProduit key={p.id} produit={p} replie={p.rang > 1} />
        ))}
      </section>

      <section id="etiquette" className="conteneur flex scroll-mt-4 flex-col gap-6 pt-14 md:gap-8 md:pt-[88px]">
        <h2 className="titre-2 md:!text-[40px]">Comment lire une étiquette ?</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {[
            {
              titre: "La dose par jour",
              texte:
                "Une étiquette donne souvent la dose par gélule. Comptez pour la journée : certaines formules demandent quatre prises pour atteindre la dose annoncée.",
              fond: "bg-sauge",
            },
            {
              titre: "Le nom de l'extrait",
              texte:
                "Un extrait nommé permet de retrouver les essais qui l'ont testé. Deux extraits de la même plante ne se valent pas : un essai sur l'un ne prouve rien pour l'autre.",
              fond: "bg-ciel",
            },
            {
              titre: "Extrait ou plante sèche",
              texte:
                "« 400 mg en équivalent de plante sèche » n'est pas 400 mg d'extrait. C'est la quantité de plante qui a servi à le fabriquer, toujours plus élevée.",
              fond: "border border-trait bg-white",
            },
            {
              titre: "Isoflavones : en aglycones",
              texte:
                "Les essais comptent les isoflavones en aglycones. Une étiquette qui annonce 70 mg d'isoflavones sous une autre forme peut n'en apporter que 44 mg dans cette unité.",
              fond: "border border-trait bg-white",
            },
          ].map((c) => (
            <div key={c.titre} className={`flex flex-col gap-3 rounded-3xl p-6 md:p-7 ${c.fond}`}>
              <h3 className="titre-3">{c.titre}</h3>
              <p className="text-doux">{c.texte}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-3xl bg-sauge p-6 md:p-7">
            <h3 className="titre-3">Ce que la note mesure</h3>
            <p className="text-doux">
              Cinq choses vérifiables : les doses affichées, une allégation de santé autorisée, le niveau de preuve des
              actifs à leur dose, le prix par jour et les précautions d'emploi.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl bg-ciel p-6 md:p-7">
            <h3 className="titre-3">Ce qu'elle ne mesure pas</h3>
            <p className="text-doux">
              Elle ne dit pas si le produit soulagera vos symptômes. Aucune des formules n'a de niveau A, et la réponse
              varie beaucoup d'une femme à l'autre, y compris sous placebo.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-trait bg-white p-6 md:p-7">
            <h3 className="titre-3">Ce qui ne compte pas</h3>
            <p className="text-doux">
              La rémunération du site. Le calcul du rang ne lit pas les commissions, et un test automatique le vérifie
              à chaque mise à jour.{" "}
              <Link href="/politique-affiliation/" className="lien">
                Notre politique d'affiliation
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="securite" className="conteneur flex scroll-mt-4 flex-col gap-6 pt-14 md:gap-8 md:pt-[88px]">
        <h2 className="titre-2 md:!text-[40px]">Ces compléments sont-ils sûrs ?</h2>
        <Securite />
      </section>

      <section id="questions" className="conteneur flex scroll-mt-4 flex-col gap-6 pt-14 md:gap-8 md:pt-[88px]">
        <h2 className="titre-2 md:!text-[40px]">Vos questions</h2>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
          <Faq questions={toutesQuestions} />
          <div className="relative hidden aspect-[4/4.6] overflow-hidden rounded-[28px] bg-photo lg:block">
            <Photo nom="08-traitement-hormonal-conversation" sizes="360px" position="50% 40%" className="absolute inset-0" />
          </div>
        </div>
      </section>

      <section id="sources" className="conteneur flex scroll-mt-4 flex-col gap-6 pt-14 md:gap-8 md:pt-[88px]">
        <h2 className="titre-2 md:!text-[40px]">Sources</h2>
        <details className="group rounded-3xl border border-trait bg-white">
          <summary className="flex min-h-[64px] list-none items-center justify-between gap-4 px-6 py-4">
            <span className="text-[18px] font-medium md:text-[20px]">
              Les {toutesSources.length} sources du comparatif et du tableau des preuves
            </span>
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sauge transition-transform group-open:rotate-45">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9h12" stroke="#1F3A2B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-6 md:px-6">
            <Bibliographie />
          </div>
        </details>
        <EncadreAuteur />
        <div className="flex flex-col gap-2">
          <h3 className="surtitre">Historique des mises à jour</h3>
          <ul className="flex flex-col text-[16px] text-doux">
            {historique.map((h) => (
              <li key={h.date + h.texte} className="flex flex-wrap gap-x-3 border-t border-trait py-2.5">
                <span className="w-[9.5em] shrink-0 font-semibold text-encre">{dateLongue(h.date)}</span>
                <span className="min-w-0 flex-[1_1_300px]">{h.texte}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
