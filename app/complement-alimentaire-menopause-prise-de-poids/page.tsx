import Link from "next/link";
import { EncadreMedical } from "@/components/EncadreMedical";
import { Faq, type Question } from "@/components/Faq";
import { Pilule } from "@/components/Icones";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { avisDe, cheminAvis } from "@/data/avis";
import { produits } from "@/data/produits";
import { sources, type Source } from "@/data/preuves";
import { comparatifs, pilier, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { lienProduit } from "@/lib/liens";
import { meta } from "@/lib/meta";

const chemin = "/complement-alimentaire-menopause-prise-de-poids/";
const pageVentre = "/ventre-gonfle-menopause/";
const majLe = "2026-11-07";

export const metadata = meta({
  titre: "Complément alimentaire ménopause et prise de poids : le vrai du faux",
  titreComplet: true,
  description:
    "Prise de poids à la ménopause : ce que disent les études, ce que valent les compléments qui promettent de l'éviter, et si Manhaé ou le traitement hormonal font grossir.",
  chemin,
});

function Cite({ s }: { s: Source }) {
  return (
    <a href={s.url} target="_blank" rel="noopener">
      {s.court}, {s.annee}
    </a>
  );
}

const sommaire = [
  { href: "#menopause-ou-age", libelle: "La ménopause fait-elle grossir ?" },
  { href: "#complements", libelle: "Ce que valent les compléments" },
  { href: "#font-ils-grossir", libelle: "Les compléments font-ils grossir ?" },
  { href: "#questions", libelle: "Vos questions" },
];

const manhae = produits.find((p) => p.id === "manhae-menopause");
const avisManhae = manhae ? avisDe(manhae.id) : undefined;
const lienManhae = avisManhae ? cheminAvis(avisManhae) : pilier;
const terravita = produits.find((p) => p.id === "terravita-ventre-plat");
const nbFormules = produits.length;

const questions: Question[] = [
  {
    question: "La ménopause fait-elle grossir ?",
    texte:
      "Pas directement. Le poids augmente en moyenne d'environ 0,5 kg par an à l'âge adulte, surtout sous l'effet de l'âge et du mode de vie. La ménopause change en revanche la répartition des graisses : elles se déplacent vers le ventre, et la masse grasse augmente plus vite pendant la transition, jusqu'à deux ans après les dernières règles.",
    reponse: (
      <>
        <p>
          Pas directement. Le poids augmente en moyenne d'environ 0,5 kg par an à l'âge adulte, surtout sous l'effet de
          l'âge et du mode de vie. <Cite s={sources.davis2012} />
        </p>
        <p>
          La ménopause change en revanche la répartition des graisses : elles se déplacent vers le ventre, et la masse
          grasse augmente plus vite pendant la transition, jusqu'à deux ans après les dernières règles.{" "}
          <Cite s={sources.greendale2019} />
        </p>
      </>
    ),
  },
  {
    question: "Manhaé fait-il grossir ?",
    texte:
      "Aucune étude n'a mesuré l'effet de Manhaé sur le poids. Ses actifs n'ont pas d'effet documenté sur le poids aux doses de la formule : on ne peut ni affirmer qu'il fait grossir, ni le contraire. Une prise de poids qui commence en même temps qu'un complément peut avoir une autre cause, puisqu'elle est fréquente pendant la transition ménopausique.",
    reponse: (
      <>
        <p>
          Aucune étude n'a mesuré l'effet de Manhaé sur le poids. Ses actifs n'ont pas d'effet documenté sur le poids aux
          doses de la formule : on ne peut ni affirmer qu'il fait grossir, ni le contraire.
        </p>
        <p>
          Une prise de poids qui commence en même temps qu'un complément peut avoir une autre cause, puisqu'elle est
          fréquente pendant la transition ménopausique. <Link href={lienManhae}>Notre avis complet sur Manhaé</Link>.
        </p>
      </>
    ),
  },
  {
    question: "Le traitement hormonal de la ménopause fait-il grossir ?",
    texte:
      "D'après la revue de l'International Menopause Society, non. Elle ajoute que le traitement pourrait limiter l'augmentation de la graisse abdominale après la ménopause. Le traitement se décide avec un médecin, selon votre situation.",
    reponse: (
      <>
        <p>
          D'après la revue de l'International Menopause Society, non. Elle ajoute que le traitement pourrait limiter
          l'augmentation de la graisse abdominale après la ménopause. <Cite s={sources.davis2012} />
        </p>
        <p>Le traitement se décide avec un médecin, selon votre situation.</p>
      </>
    ),
  },
  {
    question: "Quel complément alimentaire pour ne pas grossir à la ménopause ?",
    texte:
      "Aucun complément n'a montré qu'il évitait la prise de poids de la ménopause. Le seul ingrédient de complément que nous connaissions avec une allégation autorisée sur la perte de poids est le glucomannane (konjac) : 3 g par jour, en trois prises avant les repas avec un à deux verres d'eau, et seulement dans le cadre d'un régime hypocalorique.",
    reponse: (
      <>
        <p>Aucun complément n'a montré qu'il évitait la prise de poids de la ménopause.</p>
        <p>
          Le seul ingrédient de complément que nous connaissions avec une allégation autorisée sur la perte de poids est
          le glucomannane (konjac) : 3 g par jour, en trois prises avant les repas avec un à deux verres d'eau, et
          seulement dans le cadre d'un régime hypocalorique. <Cite s={sources.efsaGlucomannane2010} />
        </p>
      </>
    ),
  },
];

export default function Page() {
  const page = comparatifs.find((p) => p.chemin === chemin)!;
  const adresse = `${site.url}${chemin}`;

  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: page.titre,
              description: page.resume,
              inLanguage: "fr-FR",
              datePublished: majLe,
              dateModified: majLe,
              author: { "@type": "Organization", name: site.signature, url: site.url },
              publisher: { "@type": "Organization", name: site.editeur },
              mainEntityOfPage: adresse,
              image: `${site.url}/photos/04-prise-de-poids-marche-1600.webp`,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Prise de poids à la ménopause", item: adresse },
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
        <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="surtitre md:!text-[14px]">Comprendre · mis à jour le {dateLongue(majLe)}</div>
            <h1 className="titre-1 md:!text-[56px]">
              Prise de poids à la ménopause : que valent les compléments ?{" "}
              <Pilule className="ml-1 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-ciel" />
            </h1>
            <p className="max-w-[38em] text-[18px] leading-normal text-doux md:text-[20px]">
              Ce que les études disent vraiment de la prise de poids à la ménopause, ce que l'on peut attendre d'un
              complément, et la réponse aux questions qui reviennent : Manhaé fait-il grossir, le traitement hormonal
              aussi ?
            </p>
          </div>
          <div className="relative aspect-[1070/941] overflow-hidden rounded-[22px] bg-photo md:rounded-[28px]">
            <Photo nom="04-prise-de-poids-marche" sizes="(min-width: 1024px) 460px, 100vw" prioritaire className="absolute inset-0" />
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

      <section className="conteneur">
        <div className="flex flex-col gap-4 rounded-[28px] bg-sauge p-6 md:p-8">
          <h2 className="titre-3">En bref</h2>
          <ul className="flex max-w-[52em] list-disc flex-col gap-2.5 pl-5 text-[17px] leading-snug">
            <li>Le poids augmente avec l'âge, ménopause ou non. Ce que la ménopause change, c'est l'endroit où la graisse se loge : le ventre.</li>
            <li>La masse grasse augmente plus vite pendant la transition, puis se stabilise environ deux ans après les dernières règles.</li>
            <li>
              Aucune des {nbFormules} formules de notre base n'a d'actif étudié sur le poids des femmes ménopausées, à la
              dose de la formule.
            </li>
            <li>Le seul ingrédient de complément que nous connaissions avec une allégation autorisée sur la perte de poids, le glucomannane, ne marche qu'avec un régime hypocalorique.</li>
            <li>
              Rien n'indique que Manhaé ou le traitement hormonal fassent grossir :{" "}
              <a href="#font-ils-grossir" className="lien">
                le détail
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <div className="conteneur flex flex-col gap-14 pt-12 md:gap-16 md:pt-16">
        <section id="menopause-ou-age" className="prose max-w-[46em] scroll-mt-6">
          <h2>La ménopause fait-elle grossir ?</h2>
          <p>
            Moins qu'on ne le croit. Une revue de l'International Menopause Society conclut que la prise de poids tient
            surtout à l'âge et au mode de vie : en moyenne, environ 0,5 kg par an à l'âge adulte, que la ménopause soit
            passée ou non. <Cite s={sources.davis2012} />
          </p>
          <p>
            Ce que la ménopause change, c'est la composition du corps. Dans la cohorte américaine SWAN, le gain de masse
            grasse double au début de la transition ménopausique, pendant que la masse maigre diminue. Les deux mouvements
            se poursuivent jusqu'à environ deux ans après les dernières règles, puis se stabilisent. Le poids total, lui,
            n'accélère pas au début de la transition : il augmente au même rythme qu'avant, puis se stabilise. <Cite s={sources.greendale2019} />
          </p>
          <p>
            Cette graisse se loge surtout dans le ventre : la graisse abdominale profonde augmente d'environ 8 % par an
            pendant la transition, dans un volet de la même cohorte. <Cite s={sources.samargandy2021} /> C'est pourquoi beaucoup de
            femmes ont l'impression de grossir du ventre sans que la balance bouge beaucoup. Un ventre qui gonfle dans la
            journée, lui, n'est pas de la graisse : <Link href={pageVentre}>gaz ou graisse, comment les distinguer</Link>.
          </p>
        </section>

        <section id="complements" className="prose max-w-[46em] scroll-mt-6">
          <h2>Ce que valent les compléments « prise de poids »</h2>
          <p>
            Nous avons analysé {nbFormules} formules, actif par actif. Aucune ne contient un actif
            étudié sur le poids des femmes ménopausées, à la dose de la formule.
          </p>
          {terravita && (
            <p>
              La seule formule dont un actif est à la dose de son essai sur le poids est{" "}
              <Link href={lienProduit(terravita)}>{terravita.nom}</Link>, avec un extrait d'algue brune et de pépins de
              raisin. C'est un essai unique, financé par le fournisseur de l'extrait.
            </p>
          )}
          <p>
            Le seul ingrédient de complément que nous connaissions avec une allégation de santé autorisée sur la perte de
            poids est le glucomannane, une fibre tirée du konjac. Les conditions sont strictes : 3 g par jour, en trois
            prises d'au moins 1 g avec un à deux verres d'eau avant les repas, et dans le cadre d'un régime hypocalorique.{" "}
            <Cite s={sources.efsaGlucomannane2010} /> <Cite s={sources.reglement432} /> Autrement dit, il peut aider un
            régime, pas le remplacer. Aucune des formules ménopause de notre base n'en contient.
          </p>
          <p>
            Méfiez-vous donc des formules « ménopause ventre plat » ou « minceur » : leurs actifs visent le plus souvent les
            bouffées de chaleur ou la digestion, et sont rarement dosés comme dans les études.{" "}
            <Link href="/complement-alimentaire-ventre-gonfle-menopause/">Notre comparatif ventre gonflé</Link> les analyse
            une par une.
          </p>
        </section>

        <section id="font-ils-grossir" className="prose max-w-[46em] scroll-mt-6">
          <h2>Les compléments ménopause font-ils grossir ?</h2>
          <p>
            La question revient souvent, en particulier pour Manhaé. Aucune étude n'a mesuré l'effet de Manhaé sur le poids,
            et ses actifs (oméga-3, huile de bourrache, vitamine E, extrait de citrus) n'ont pas d'effet documenté sur le
            poids aux doses de la formule. On ne peut ni affirmer qu'il fait grossir, ni affirmer le contraire.{" "}
            <Link href={lienManhae}>Notre avis complet sur Manhaé</Link>.
          </p>
          <p>
            Comme la prise de poids est fréquente pendant la transition ménopausique, une prise de poids qui commence en
            même temps qu'un complément peut avoir une autre cause. Si elle vous inquiète, parlez-en à votre médecin.
          </p>
          <p>
            Même chose pour le traitement hormonal : d'après la revue de l'International Menopause Society, il ne fait pas
            grossir, et il pourrait même limiter l'augmentation de la graisse abdominale. <Cite s={sources.davis2012} />
          </p>
        </section>

        <div className="flex flex-col gap-3 rounded-[24px] bg-sauge p-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[40em] text-[17px]">
            Pour les bouffées de chaleur, le sommeil ou le moral, les compléments ont des preuves, inégales selon les
            actifs. Notre comparatif les classe sur leurs doses, ces preuves, leur prix et leurs précautions.
          </p>
          <Link href={pilier} className="bouton bouton-foret shrink-0 text-[17px]">
            Voir le comparatif
          </Link>
        </div>

        <section id="questions" className="flex scroll-mt-6 flex-col gap-6">
          <h2 className="titre-2">Vos questions</h2>
          <Faq questions={questions} />
        </section>

        <EncadreMedical sujet="Cette page informe sur la prise de poids à la ménopause ; elle ne remplace pas un avis médical." />
      </div>
    </>
  );
}
