import Link from "next/link";
import { EncadreMedical } from "@/components/EncadreMedical";
import { Faq, type Question } from "@/components/Faq";
import { Pilule } from "@/components/Icones";
import { JsonLd } from "@/components/JsonLd";
import { NiveauPreuve } from "@/components/NiveauPreuve";
import { Photo } from "@/components/Photo";
import { produits } from "@/data/produits";
import { actifs, preuves, sources, type Source } from "@/data/preuves";
import { pagesReference, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { lienProduit } from "@/lib/liens";
import { meta } from "@/lib/meta";

const chemin = "/ventre-gonfle-menopause/";
const comparatifVentre = "/complement-alimentaire-ventre-gonfle-menopause/";
const majLe = "2026-11-02";

export const metadata = meta({
  titre: "Ventre gonflé à la ménopause : causes, solutions et quand consulter",
  titreComplet: true,
  description:
    "Ventre gonflé à la ménopause : gaz ou graisse, ce que disent les études, ce qui a fait ses preuves contre les ballonnements et les signes qui doivent faire consulter.",
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
  { href: "#frequent", libelle: "Est-ce fréquent ?" },
  { href: "#gaz-ou-graisse", libelle: "Gaz ou graisse" },
  { href: "#pourquoi", libelle: "Pourquoi le ventre gonfle" },
  { href: "#solutions", libelle: "Ce qui a fait ses preuves" },
  { href: "#consulter", libelle: "Quand consulter" },
  { href: "#questions", libelle: "Vos questions" },
];

const questions: Question[] = [
  {
    question: "Est-ce normal d'avoir le ventre gonflé à la ménopause ?",
    texte:
      "C'est fréquent. Dans une enquête présentée en 2025 auprès de près de 600 femmes de 44 à 73 ans, 77 % disaient avoir des ballonnements, et 82 % situaient le début ou l'aggravation de leurs troubles digestifs à la périménopause ou à la ménopause. Fréquent ne veut pas dire sans importance : un gonflement qui persiste se montre à un médecin.",
    reponse: (
      <>
        <p>
          C'est fréquent. Dans une enquête présentée en 2025 auprès de près de 600 femmes de 44 à 73 ans, 77 % disaient
          avoir des ballonnements, et 82 % situaient le début ou l'aggravation de leurs troubles digestifs à la
          périménopause ou à la ménopause.
        </p>
        <p>Fréquent ne veut pas dire sans importance : un gonflement qui persiste se montre à un médecin.</p>
        <p>
          <Cite s={sources.denby2025} />
        </p>
      </>
    ),
  },
  {
    question: "Ventre gonflé ou prise de poids : comment faire la différence ?",
    texte:
      "Un ventre gonflé par des gaz varie dans la journée et se dégonfle. Un ventre qui s'arrondit au fil des mois tient plutôt à la graisse abdominale, qui augmente plus vite pendant la transition ménopausique : environ 8 % par an dans l'étude SWAN, à partir de deux ans avant les dernières règles.",
    reponse: (
      <>
        <p>
          Un ventre gonflé par des gaz varie dans la journée et se dégonfle. Un ventre qui s'arrondit au fil des mois
          tient plutôt à la graisse abdominale.
        </p>
        <p>
          Celle-ci augmente plus vite pendant la transition ménopausique : environ 8 % par an dans l'étude américaine
          SWAN, à partir de deux ans avant les dernières règles. <Cite s={sources.samargandy2021} />
        </p>
      </>
    ),
  },
  {
    question: "Le ventre gonflé passe-t-il après la ménopause ?",
    texte:
      "Rien ne l'indique. Dans une cohorte canadienne de 1 832 femmes de 40 à 60 ans, la part de femmes ayant des ballonnements et des gaz au-delà de la normale était la même avant, pendant et après la ménopause.",
    reponse: (
      <>
        <p>
          Rien ne l'indique. Dans une cohorte canadienne de 1 832 femmes de 40 à 60 ans, la part de femmes ayant des
          ballonnements et des gaz au-delà de la normale était la même avant, pendant et après la ménopause.
        </p>
        <p>
          <Cite s={sources.solomon2026} />
        </p>
      </>
    ),
  },
  {
    question: "Ventre gonflé et dur à la ménopause : faut-il s'inquiéter ?",
    texte:
      "Il faut consulter si le ventre reste gonflé, ou gonfle plus de 12 fois par mois, surtout après 50 ans : les recommandations britanniques demandent alors un examen, parce qu'un gonflement persistant peut révéler une maladie de l'ovaire. Même chose avec une satiété rapide, des douleurs du ventre, une perte de poids inexpliquée ou un changement du transit.",
    reponse: (
      <>
        <p>
          Il faut consulter si le ventre reste gonflé, ou gonfle plus de 12 fois par mois, surtout après 50 ans : les
          recommandations britanniques demandent alors un examen, parce qu'un gonflement persistant peut révéler une
          maladie de l'ovaire.
        </p>
        <p>Même chose avec une satiété rapide, des douleurs du ventre, une perte de poids inexpliquée ou un changement du transit.</p>
        <p>
          <Cite s={sources.nice2011} />
        </p>
      </>
    ),
  },
  {
    question: "Quel complément contre le ventre gonflé à la ménopause ?",
    texte:
      "Le seul actif qui a une allégation de santé autorisée contre les gaz est le charbon actif, à 1 g au moins 30 minutes avant le repas et 1 g juste après. Les formules « ventre plat » vendues pour la ménopause n'en contiennent pas assez ou visent le poids. Notre comparatif les classe une par une.",
    reponse: (
      <>
        <p>
          Le seul actif qui a une allégation de santé autorisée contre les gaz est le charbon actif, à 1 g au moins 30
          minutes avant le repas et 1 g juste après.
        </p>
        <p>
          Les formules « ventre plat » vendues pour la ménopause n'en contiennent pas assez ou visent le poids.{" "}
          <Link href={comparatifVentre}>Notre comparatif</Link> les classe une par une.
        </p>
      </>
    ),
  },
];

export default function Page() {
  const page = pagesReference.find((p) => p.chemin === chemin)!;
  const lignes = preuves.filter((p) => p.symptome === "ballonnements");
  const charbon = produits.find((p) => p.usage === "ventre" && p.actifs.some((a) => a.id === "charbon" && a.comparable));
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
              image: `${site.url}/photos/03-ventre-gonfle-canape-1600.webp`,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Ventre gonflé à la ménopause", item: adresse },
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
              Ventre gonflé à la ménopause : causes, solutions et quand consulter{" "}
              <Pilule className="ml-1 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-ciel" />
            </h1>
            <p className="max-w-[38em] text-[18px] leading-normal text-doux md:text-[20px]">
              Trois femmes sur quatre s'en plaignent autour de la ménopause. Ce que l'on sait des causes, ce qui a fait
              ses preuves contre les ballonnements, et les signes qui ne doivent pas attendre.
            </p>
          </div>
          <div className="relative aspect-[1070/941] overflow-hidden rounded-[22px] bg-photo md:rounded-[28px]">
            <Photo nom="03-ventre-gonfle-canape" sizes="(min-width: 1024px) 460px, 100vw" prioritaire className="absolute inset-0" />
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
            <li>Les ballonnements touchent environ trois femmes sur quatre autour de la ménopause, et ne disparaissent pas après.</li>
            <li>Un ventre qui varie dans la journée, ce sont des gaz. Un ventre qui s'arrondit au fil des mois, c'est surtout de la graisse abdominale.</li>
            <li>Les causes des ballonnements à la ménopause ne sont pas établies : les pistes hormonales et le microbiote restent des hypothèses.</li>
            <li>
              Contre les gaz, un seul actif a une allégation autorisée : le charbon actif, à 1 g avant et 1 g après le repas.{" "}
              <Link href={comparatifVentre} className="lien">
                Voir le comparatif
              </Link>
              .
            </li>
            <li>
              Un gonflement persistant après 50 ans se montre à un médecin :{" "}
              <a href="#consulter" className="lien">
                les signes
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <div className="conteneur flex flex-col gap-14 pt-12 md:gap-16 md:pt-16">
        <section id="frequent" className="prose max-w-[46em] scroll-mt-6">
          <h2>Est-ce fréquent ?</h2>
          <p>
            Très. Dans une enquête présentée au congrès 2025 de la Menopause Society, auprès de près de 600 femmes de 44 à
            73 ans, 77 % disaient avoir des ballonnements, 54 % de la constipation et 49 % des remontées acides. 82 %
            situaient le début ou l'aggravation de ces troubles à la périménopause ou à la ménopause, et un tiers
            seulement avait reçu un diagnostic d'intestin irritable. <Cite s={sources.denby2025} />
          </p>
          <p>
            Une cohorte canadienne de 1 832 femmes de 40 à 60 ans va dans le même sens : deux sur trois ont des
            ballonnements et des gaz au-delà de la normale, et cette proportion est la même avant, pendant et après la
            ménopause. <Cite s={sources.solomon2026} />
          </p>
          <p>
            Ces deux études ont été présentées en congrès : leurs résultats complets ne sont pas encore publiés dans une
            revue. Elles mesurent ce que les femmes ressentent, pas ce qui le provoque.
          </p>
        </section>

        <section id="gaz-ou-graisse" className="prose max-w-[46em] scroll-mt-6">
          <h2>Gaz ou graisse : deux ventres différents</h2>
          <p>
            Le ventre gonflé par des gaz change dans la journée : plat le matin, tendu le soir ou après certains repas.
            Il se dégonfle.
          </p>
          <p>
            Le ventre qui s'arrondit au fil des mois est une autre affaire. Dans l'étude américaine SWAN, la graisse
            abdominale profonde augmente d'environ 8 % par an pendant la transition ménopausique, à partir de deux ans
            avant les dernières règles, indépendamment de l'âge. <Cite s={sources.samargandy2021} />
          </p>
          <p>
            La distinction compte, parce que les solutions ne sont pas les mêmes. Beaucoup de compléments vendus « ventre
            plat » promettent les deux à la fois ; leurs ingrédients ont été étudiés sur le poids, pas sur les
            ballonnements.
          </p>
        </section>

        <section id="pourquoi" className="prose max-w-[46em] scroll-mt-6">
          <h2>Pourquoi le ventre gonfle : ce qu'on sait, ce qu'on suppose</h2>
          <p>
            Honnêtement, les causes ne sont pas établies. Les chercheurs qui ont présenté les études citées plus haut le
            disent eux-mêmes : les mécanismes restent à comprendre.
          </p>
          <p>
            <strong>Le microbiote.</strong> Après la ménopause, la flore intestinale semble moins diversifiée et, dans
            plusieurs études, plus proche de celle des hommes. Ces études sont petites et observent des femmes à un seul
            moment : aucune n'a suivi les mêmes femmes avant et après la ménopause. Le lien avec les ballonnements n'est
            pas démontré. <Cite s={sources.peters2022} />
          </p>
          <p>
            <strong>Les hormones.</strong> La progestérone ralentit le transit intestinal, et ses variations à la
            périménopause sont une piste souvent avancée. C'est une hypothèse, pas un fait établi chez les femmes
            ménopausées. <Cite s={sources.peters2022} />
          </p>
          <p>
            <strong>L'anxiété.</strong> Dans la cohorte canadienne, les troubles digestifs vont de pair avec l'anxiété,
            plus fréquente à la périménopause. On ne sait pas lequel entraîne l'autre. <Cite s={sources.solomon2026} />
          </p>
        </section>

        <section id="solutions" className="flex scroll-mt-6 flex-col gap-6">
          <div className="prose max-w-[46em]">
            <h2>Ce qui a fait ses preuves contre les ballonnements</h2>
            <p>
              Aucune étude ne porte sur les ballonnements à la ménopause. Les preuves ci-dessous viennent de personnes
              souffrant de troubles digestifs, à tout âge. Le niveau va de A (effet démontré) à E (aucun essai) :{" "}
              <Link href="/preuves-complements-menopause/#ballonnements">l'échelle complète</Link>.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {lignes.map((l) => (
              <li key={l.id} className="flex items-start gap-4 rounded-[20px] border border-trait bg-white p-5">
                <NiveauPreuve niveau={l.niveau} />
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-[19px] font-semibold leading-snug">{actifs[l.actifId].nom}</h3>
                  <p className="text-doux">{l.conclusion}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 rounded-[24px] bg-sauge p-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[40em] text-[17px]">
              Six compléments vendus pour le ventre gonflé, comparés sur leurs doses, ces preuves, leur prix et leurs
              précautions.
              {charbon && (
                <>
                  {" "}
                  Un seul apporte la dose de charbon de l'allégation :{" "}
                  <Link href={lienProduit(charbon)} className="lien">
                    {charbon.nom}
                  </Link>
                  .
                </>
              )}
            </p>
            <Link href={comparatifVentre} className="bouton bouton-foret shrink-0 text-[17px]">
              Voir le comparatif
            </Link>
          </div>
        </section>

        <section id="consulter" className="scroll-mt-6">
          <aside className="flex flex-col gap-3 rounded-3xl border-[1.5px] border-rouille bg-argile px-6 py-7 md:px-8">
            <h2 className="text-[22px] font-medium leading-tight md:text-[26px]">Quand le ventre gonflé doit faire consulter</h2>
            <ul className="flex max-w-[46em] list-disc flex-col gap-2 pl-5">
              <li>le ventre reste gonflé, ou gonfle plus de 12 fois par mois, surtout après 50 ans ;</li>
              <li>une sensation de satiété rapide ou une perte d'appétit qui s'installe ;</li>
              <li>des douleurs du ventre ou du bas-ventre, des envies d'uriner plus fréquentes ;</li>
              <li>une perte de poids ou une fatigue inexpliquées, un changement du transit.</li>
            </ul>
            <p className="max-w-[46em]">
              Les recommandations britanniques demandent un examen dans ces situations, parce qu'un gonflement persistant
              peut révéler une maladie de l'ovaire. Un complément ne doit pas retarder cette consultation.
            </p>
            <a href={sources.nice2011.url} target="_blank" rel="noopener" className="lien self-start py-2 text-[16px]">
              Source : NICE, standard de qualité sur le cancer de l'ovaire
            </a>
          </aside>
        </section>

        <section id="questions" className="flex scroll-mt-6 flex-col gap-6">
          <h2 className="titre-2">Vos questions</h2>
          <Faq questions={questions} />
        </section>

        <EncadreMedical sujet="Cette page informe sur un symptôme ; elle ne remplace pas un avis médical." />
      </div>
    </>
  );
}
