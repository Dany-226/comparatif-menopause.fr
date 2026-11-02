import Link from "next/link";
import { produits } from "@/data/produits";
import { actifs, preuves, sources } from "@/data/preuves";
import { comparatifs, historique, pilier, site } from "@/data/site";
import { dateLongue, prix } from "@/lib/format";
import { lienProduit } from "@/lib/liens";
import { classer, meilleurePreuve, noteMax } from "@/lib/score";
import { BandeauTransparence } from "./BandeauTransparence";
import { EncadreMedical } from "./EncadreMedical";
import { Faq, type Question } from "./Faq";
import { FicheProduit } from "./FicheProduit";
import { Pilule } from "./Icones";
import { Photo } from "./Photo";
import { JsonLd } from "./JsonLd";
import { NiveauPreuve } from "./NiveauPreuve";
import { TableauComparatif } from "./TableauComparatif";

const chemin = "/complement-alimentaire-ventre-gonfle-menopause/";

const sommaire = [
  { href: "#en-bref", libelle: "En bref" },
  { href: "#classement", libelle: "Le classement" },
  { href: "#ventre-plat", libelle: "Ventre plat ou ventre gonflé" },
  { href: "#preuves", libelle: "Ce que disent les études" },
  { href: "#fiches", libelle: "Les produits en détail" },
  { href: "#consulter", libelle: "Quand consulter" },
  { href: "#questions", libelle: "Vos questions" },
];

/** Comparatif « ventre gonflé ». Les chiffres viennent de data/ et de lib/score, comme le comparatif principal. */
export function PageVentre() {
  const page = comparatifs.find((c) => c.chemin === chemin)!;
  const classes = classer(produits, "ventre");
  const premier = classes[0];
  const avecPreuve = classes.filter((p) => meilleurePreuve(p));
  const vendusMenopause = classes.filter((p) => /ménopause|Ménophytea/i.test(`${p.nom} ${p.marque}`));
  const lignes = preuves.filter((p) => p.symptome === "ballonnements");
  const charbon = classes.find((p) => p.actifs.some((a) => a.id === "charbon" && a.comparable));
  const prixReleveLe = classes.map((p) => p.prixReleveLe).sort()[0];
  const adresse = `${site.url}${chemin}`;

  const questions: Question[] = [
    {
      question: "Quel complément prendre contre le ventre gonflé à la ménopause ?",
      texte: `Un seul actif a une allégation de santé autorisée contre les gaz : le charbon actif, à 1 g au moins 30 minutes avant le repas et 1 g juste après. ${charbon ? `Dans ce comparatif, seul ${charbon.nom} (${charbon.marque}) apporte cette dose.` : ""} Les formules « ventre plat » vendues pour la ménopause n'en contiennent pas assez, ou visent le poids plutôt que les ballonnements.`,
      reponse: (
        <>
          <p>
            Un seul actif a une allégation de santé autorisée contre les gaz : le charbon actif, à 1 g au moins 30 minutes
            avant le repas et 1 g juste après.
            {charbon && (
              <>
                {" "}
                Dans ce comparatif, seul <Link href={lienProduit(charbon, "")}>{charbon.nom}</Link> ({charbon.marque})
                apporte cette dose.
              </>
            )}
          </p>
          <p>
            Les formules « ventre plat » vendues pour la ménopause n'en contiennent pas assez, ou visent le poids plutôt
            que les ballonnements.
          </p>
        </>
      ),
    },
    {
      question: "Les probiotiques dégonflent-ils le ventre ?",
      texte:
        "Parfois, et cela dépend de la souche. Dans l'intestin irritable, une méta-analyse de 82 essais trouve que certains mélanges de souches réduisent les ballonnements, avec une très faible certitude. Un résultat obtenu avec une souche ne vaut pas pour une autre. Les souches des formules « ventre plat » de ce comparatif ont été étudiées sur le poids, pas sur les ballonnements.",
      reponse: (
        <>
          <p>
            Parfois, et cela dépend de la souche. Dans l'intestin irritable, une méta-analyse de 82 essais trouve que
            certains mélanges de souches réduisent les ballonnements, avec une très faible certitude. Un résultat obtenu
            avec une souche ne vaut pas pour une autre.
          </p>
          <p>
            Les souches des formules « ventre plat » de ce comparatif ont été étudiées sur le poids, pas sur les
            ballonnements.
          </p>
          <p>
            <a href={sources.goodoory2023.url} target="_blank" rel="noopener">
              Goodoory et al., Gastroenterology, 2023
            </a>
          </p>
        </>
      ),
    },
    {
      question: "Comment prendre le charbon actif ?",
      texte:
        "La dose de l'allégation autorisée est de 1 g au moins 30 minutes avant le repas et 1 g juste après. Le charbon peut réduire l'absorption des médicaments pris en même temps : si vous suivez un traitement, demandez à votre pharmacien comment espacer les prises.",
      reponse: (
        <>
          <p>
            La dose de l'allégation autorisée est de 1 g au moins 30 minutes avant le repas et 1 g juste après. C'est
            la seule allégation de santé autorisée contre les gaz dans l'Union européenne.
          </p>
          <p>
            Le charbon peut réduire l'absorption des médicaments pris en même temps : si vous suivez un traitement,
            demandez à votre pharmacien comment espacer les prises.
          </p>
          <p>
            <a href={sources.reglement432.url} target="_blank" rel="noopener">
              Règlement (UE) n° 432/2012
            </a>{" "}
            ·{" "}
            <a href={sources.efsaCharbon2011.url} target="_blank" rel="noopener">
              EFSA, 2011
            </a>
          </p>
        </>
      ),
    },
    {
      question: "Un complément « ventre plat » fait-il maigrir ?",
      texte:
        "Aucun complément de ce comparatif n'a d'allégation de santé autorisée sur le poids. Deux formules contiennent un actif à la dose d'un essai sur la masse grasse ou le poids : un essai chacune, financé par le fournisseur de l'ingrédient. Ces essais ne portaient pas sur les ballonnements.",
      reponse: (
        <>
          <p>
            Aucun complément de ce comparatif n'a d'allégation de santé autorisée sur le poids. Deux formules contiennent
            un actif à la dose d'un essai sur la masse grasse ou le poids : un essai chacune, financé par le fournisseur
            de l'ingrédient.
          </p>
          <p>Ces essais ne portaient pas sur les ballonnements.</p>
        </>
      ),
    },
    {
      question: "Quand faut-il consulter pour un ventre gonflé ?",
      texte:
        "Quand le ventre reste gonflé, ou gonfle plus de 12 fois par mois, surtout après 50 ans. Les recommandations britanniques demandent alors un examen, parce qu'un gonflement persistant peut révéler une maladie de l'ovaire. Il en va de même avec une satiété rapide, des douleurs du ventre, une perte de poids inexpliquée ou un changement du transit.",
      reponse: (
        <>
          <p>
            Quand le ventre reste gonflé, ou gonfle plus de 12 fois par mois, surtout après 50 ans. Les recommandations
            britanniques demandent alors un examen, parce qu'un gonflement persistant peut révéler une maladie de
            l'ovaire.
          </p>
          <p>
            Il en va de même avec une satiété rapide, des douleurs du ventre, une perte de poids inexpliquée ou un
            changement du transit.
          </p>
          <p>
            <a href={sources.nice2011.url} target="_blank" rel="noopener">
              Source : NICE, standard de qualité sur le cancer de l'ovaire
            </a>
          </p>
        </>
      ),
    },
  ];

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
              description: page.resume,
              inLanguage: "fr-FR",
              datePublished: "2026-11-02",
              dateModified: site.majLe,
              author: { "@type": "Organization", name: site.signature, url: site.url },
              publisher: { "@type": "Organization", name: site.editeur },
              mainEntityOfPage: adresse,
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
              itemListElement: classes.map((p) => ({ "@type": "ListItem", position: p.rang, name: p.nom, url: `${adresse}#${p.id}` })),
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
        <div className="flex flex-col gap-4">
          <div className="surtitre md:!text-[14px]">
            Comparatif · ventre gonflé · prix relevés le {dateLongue(prixReleveLe)}
          </div>
          <h1 className="titre-1 max-w-[16em] md:!text-[58px]">
            Ventre gonflé à la ménopause : les compléments comparés{" "}
            <Pilule className="ml-1 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-ciel" />
          </h1>
          <p className="max-w-[40em] text-[18px] leading-normal text-doux md:text-[20px]">
            La plupart des compléments « ventre plat » vendus pour la ménopause visent le poids, pas les ballonnements.
            Un seul actif a une allégation autorisée contre les gaz : le charbon actif, à la bonne dose.
          </p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[22px] bg-photo md:aspect-[16/9] md:rounded-[28px]">
          <Photo
            nom="11-ventre-gonfle-mains"
            sizes="(min-width: 1280px) 1200px, 100vw"
            prioritaire
            position="50% 40%"
            className="absolute inset-0"
          />
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

      <section id="en-bref" className="conteneur scroll-mt-6 pt-12 md:pt-16">
        <div className="flex flex-col gap-4 rounded-[28px] bg-sauge p-6 md:p-8">
          <h2 className="titre-3">En bref</h2>
          <ul className="flex max-w-[52em] list-disc flex-col gap-2.5 pl-5 text-[17px] leading-snug">
            <li>
              <strong className="font-semibold">{classes.length} formules comparées</strong>, dont {vendusMenopause.length}{" "}
              vendues pour la ménopause.
            </li>
            <li>
              <strong className="font-semibold">
                {avecPreuve.length === 1 ? "Une seule" : avecPreuve.length} contient un actif à une dose étudiée sur les
                ballonnements
              </strong>
              {charbon ? (
                <>
                  {" "}
                  : <Link href={lienProduit(charbon, "")} className="lien">{charbon.nom}</Link>, du charbon actif à 1 g avant
                  et 1 g après le repas. Elle n'est pas vendue pour la ménopause.
                </>
              ) : (
                "."
              )}
            </li>
            <li>
              <strong className="font-semibold">En tête :</strong>{" "}
              <Link href={lienProduit(premier, "")} className="lien">
                {premier.nom}
              </Link>
              , {premier.note}/{noteMax}, {prix(premier.parJour)} par jour.
            </li>
            <li>
              <strong className="font-semibold">Aucune étude ne porte sur les ballonnements à la ménopause.</strong> Les
              preuves viennent de personnes souffrant de troubles digestifs, à tout âge.
            </li>
            <li>
              Un ventre gonflé qui persiste après 50 ans se montre à un médecin :{" "}
              <a href="#consulter" className="lien">
                quand consulter
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <section id="classement" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <div className="flex flex-col gap-2">
          <h2 className="titre-2">Le classement</h2>
          <p className="max-w-[44em] text-doux">
            La même grille que le{" "}
            <Link href={pilier} className="lien">
              comparatif des compléments ménopause
            </Link>
            . Le critère « preuves » ne compte ici que les études sur les ballonnements et les gaz.{" "}
            <Link href="/comment-nous-classons/" className="lien">
              Notre méthode
            </Link>
            .
          </p>
        </div>
        <TableauComparatif produits={classes} emplacement="tableau-ventre" />
      </section>

      <section id="ventre-plat" className="conteneur flex scroll-mt-6 flex-col gap-5 pt-12 md:pt-16">
        <h2 className="titre-2">Ventre plat ou ventre gonflé : deux promesses différentes</h2>
        <div className="prose max-w-[46em]">
          <p>
            Un ventre gonflé par des gaz change dans la journée et se dégonfle. Le ventre qui s'arrondit au fil des mois
            est une autre affaire : il tient surtout à la graisse abdominale, et ne se dégonfle pas. Les compléments vendus « ventre plat » mélangent
            les deux promesses.
          </p>
          <p>
            Sur leurs propres fiches, trois des formules de ce comparatif parlent de minceur, de perte de poids ou de
            masse grasse. Leurs ingrédients phares ont été étudiés sur le poids, pas sur les ballonnements. Les deux
            formules vendues pour la ménopause contiennent un actif digestif (artichaut, charbon), mais bien en dessous
            des doses étudiées.
          </p>
          <p>
            Si votre gêne est le ballonnement après les repas, c'est le charbon actif qui a les meilleurs arguments. Si
            c'est la silhouette, aucun complément de ce comparatif n'a d'allégation autorisée sur le poids.
          </p>
          <p>
            Causes, différence entre gaz et graisse, signes qui doivent faire consulter :{" "}
            <Link href="/ventre-gonfle-menopause/">notre page sur le ventre gonflé à la ménopause</Link>.
          </p>
        </div>
      </section>

      <section id="preuves" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <div className="flex flex-col gap-2">
          <h2 className="titre-2">Ce que disent les études sur les ballonnements</h2>
          <p className="max-w-[44em] text-doux">
            Les actifs que l'on retrouve dans ces formules, ou que l'on conseille souvent pour le ventre. Échelle et
            sources dans le{" "}
            <Link href="/preuves-complements-menopause/#ballonnements" className="lien">
              tableau des preuves
            </Link>
            .
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {lignes.map((l) => (
            <li key={l.id} className="flex items-start gap-4 rounded-[20px] border border-trait bg-white p-5">
              <NiveauPreuve niveau={l.niveau} />
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="text-[19px] font-semibold leading-snug">{actifs[l.actifId].nom}</h3>
                <p className="text-doux">{l.conclusion}</p>
                <p className="text-[14px] text-discret">Dose des études : {l.doseEssais.charAt(0).toLowerCase() + l.doseEssais.slice(1)}.</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="fiches" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <h2 className="titre-2">Les produits en détail</h2>
        {classes.map((p, i) => (
          <FicheProduit key={p.id} produit={p} replie={i > 0} />
        ))}
      </section>

      <section id="consulter" className="conteneur scroll-mt-6 pt-12 md:pt-16">
        <aside className="flex flex-col gap-3 rounded-3xl border-[1.5px] border-rouille bg-argile px-6 py-7 md:px-8">
          <h2 className="text-[22px] font-medium leading-tight md:text-[26px]">Quand le ventre gonflé doit faire consulter</h2>
          <p className="max-w-[46em]">
            Un ventre qui reste gonflé, ou qui gonfle plus de 12 fois par mois, surtout après 50 ans, se montre à un
            médecin : les recommandations britanniques demandent alors un examen, parce qu'un gonflement persistant peut
            révéler une maladie de l'ovaire. Même chose avec une satiété rapide, des douleurs du ventre, une perte de
            poids inexpliquée ou un changement du transit. Un complément ne doit pas retarder cette consultation.
          </p>
          <a href={sources.nice2011.url} target="_blank" rel="noopener" className="lien self-start py-2 text-[16px]">
            Source : NICE, standard de qualité sur le cancer de l'ovaire
          </a>
        </aside>
      </section>

      <section id="questions" className="conteneur flex scroll-mt-6 flex-col gap-6 pt-12 md:pt-16">
        <h2 className="titre-2">Vos questions</h2>
        <Faq questions={questions} />
      </section>

      <section className="conteneur pb-6 pt-12 md:pt-16">
        <EncadreMedical sujet="Ce comparatif porte sur des compléments alimentaires." />
      </section>

      <section className="conteneur pt-6 text-[15px] text-discret">
        <p>
          Historique : {historique.filter((h) => h.texte.includes("ventre")).map((h) => `${dateLongue(h.date)}, ${h.texte.charAt(0).toLowerCase() + h.texte.slice(1)}`).join(" ")}
        </p>
      </section>
    </>
  );
}
