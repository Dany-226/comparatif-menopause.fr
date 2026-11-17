import Link from "next/link";
import { Faq, type Question } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { pagesReference, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { meta } from "@/lib/meta";

const chemin = "/menopause-yeux/";
const chalazion = "/chalazion-a-repetition/";
const majLe = "2026-11-17";

export const metadata = meta({
  titre: "Ménopause et yeux : sécheresse, chalazion, vision floue",
  titreComplet: true,
  description:
    "Yeux secs, paupières enflammées, vue qui baisse : ce qui vient des hormones, ce qui vient de l'âge, et ce qui marche vraiment à la ménopause.",
  chemin,
});

/**
 * Sources de la page. Elles ne portent pas sur des compléments : elles vivent ici
 * plutôt que dans data/preuves.ts, qui sert au classement.
 */
const src: Record<string, { court: string; url: string; note?: string }> = {
  schaumberg2001: {
    court: "Schaumberg et al., JAMA, 2001",
    url: "https://jamanetwork.com/journals/jama/fullarticle/194334",
    note: "Women's Health Study, 25 665 femmes ménopausées",
  },
  dews2017: {
    court: "TFOS DEWS II, rapport sexe, genre et hormones, 2017",
    url: "https://research.bidmc.org/eye/publications/tfos-dews-ii-sex-gender-and-hormones-report",
  },
  dewsFacteurs: {
    court: "Optician Online, facteurs de risque selon DEWS II",
    url: "https://www.opticianonline.net/cpd-archive/6579",
    note: "tableau des facteurs de risque de l'œil sec, lu de seconde main",
  },
  enquete2026: {
    court: "Ophthalmology Times, 2 septembre 2026",
    url: "https://www.ophthalmologytimes.com/view/survey-fewer-than-1-in-7-women-link-dry-eye-to-perimenopause-or-menopause",
  },
  dream2018: {
    court: "National Eye Institute, essai DREAM, 2018",
    url: "https://www.nei.nih.gov/about/news-and-events/news/omega-3s-fish-oil-supplements-no-better-placebo-dry-eye",
    note: "535 patients, 12 mois, publié dans le New England Journal of Medicine",
  },
  presbytie: {
    court: "Elsan, la presbytie",
    url: "https://www.elsan.care/fr/pathologie-et-traitement/maladies-des-yeux/presbytie-symptomes-traitements",
  },
  vajaranant2014: {
    court: "Vajaranant et al., Menopause, 2014",
    url: "https://mayoclinic.elsevierpure.com/en/publications/risk-of-glaucoma-after-early-bilateral-oophorectomy",
    note: "ablation des deux ovaires avant 43 ans et glaucome",
  },
  dewundara2016: {
    court: "Dewundara et al., revue, 2016",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4930553",
    note: "œstrogènes et glaucome ; chiffre de l'étude de Rotterdam",
  },
  urgences: {
    court: "Le Quotidien du médecin, urgences ophtalmologiques",
    url: "https://cancerologie.lequotidiendumedecin.fr/specialites/ophtalmologie/lophtalmologie-nest-pas-labri-des-urgences",
  },
  retine: {
    court: "Lemedecin.fr, décollement de la rétine",
    url: "https://lemedecin.fr/medical/pathologies/decollement-de-la-retine.html",
  },
};

function Cite({ s }: { s: string }) {
  return (
    <a href={src[s].url} target="_blank" rel="noopener" className="lien">
      {src[s].court}
    </a>
  );
}

const sommaire = [
  { href: "#pourquoi", libelle: "Pourquoi les yeux changent" },
  { href: "#secheresse", libelle: "Sécheresse oculaire" },
  { href: "#paupieres", libelle: "Paupières et chalazion" },
  { href: "#vision", libelle: "Vision floue" },
  { href: "#traitement-hormonal", libelle: "Traitement hormonal" },
  { href: "#solutions", libelle: "Ce qui marche" },
  { href: "#consulter", libelle: "Quand consulter" },
  { href: "#questions", libelle: "Vos questions" },
];

const questions: Question[] = [
  {
    question: "La ménopause peut-elle donner les yeux secs ?",
    texte:
      "Elle réunit plusieurs facteurs qui favorisent l'œil sec : l'âge, la baisse des androgènes, les changements des glandes des paupières. Le lien direct avec la ménopause elle-même est plausible, mais le rapport international de référence le juge encore non concluant.",
    reponse: (
      <>
        <p>
          Elle réunit plusieurs facteurs qui favorisent l'œil sec : l'âge, la baisse des androgènes, les changements des
          glandes des paupières.
        </p>
        <p>
          Le lien direct avec la ménopause elle-même est plausible, mais le rapport international de référence le juge
          encore non concluant. <Cite s="dewsFacteurs" />
        </p>
      </>
    ),
  },
  {
    question: "Pourquoi ma vue baisse-t-elle depuis la ménopause ?",
    texte:
      "Si c'est de près et de façon stable, c'est presque toujours la presbytie, qui apparaît généralement entre 40 et 45 ans chez tout le monde, hommes compris. Si la vue fluctue dans la journée, pensez à l'œil sec.",
    reponse: (
      <>
        <p>
          Si c'est de près et de façon stable, c'est presque toujours la presbytie, qui apparaît généralement entre 40 et
          45 ans chez tout le monde, hommes compris. <Cite s="presbytie" />
        </p>
        <p>Si la vue fluctue dans la journée, pensez à l'œil sec.</p>
      </>
    ),
  },
  {
    question: "Le traitement hormonal va-t-il améliorer mes yeux secs ?",
    texte:
      "C'est peu probable. Dans la Women's Health Study, le traitement hormonal était associé à davantage de sécheresse oculaire. Il ne se prescrit pas pour les yeux.",
    reponse: (
      <>
        <p>
          C'est peu probable. Dans la Women's Health Study, le traitement hormonal était associé à davantage de
          sécheresse oculaire. Il ne se prescrit pas pour les yeux.
        </p>
        <p>
          <Cite s="schaumberg2001" />
        </p>
      </>
    ),
  },
  {
    question: "Les oméga-3 aident-ils les yeux secs ?",
    texte:
      "L'essai le plus solide, DREAM, n'a pas montré de bénéfice par rapport au placebo chez 535 personnes suivies un an. Les oméga-3 ne remplacent ni les larmes artificielles ni le soin des paupières.",
    reponse: (
      <>
        <p>
          L'essai le plus solide, DREAM, n'a pas montré de bénéfice par rapport au placebo chez 535 personnes suivies un
          an. Les oméga-3 ne remplacent ni les larmes artificielles ni le soin des paupières.
        </p>
        <p>
          <Cite s="dream2018" />
        </p>
      </>
    ),
  },
  {
    question: "Faut-il arrêter ses lentilles de contact ?",
    texte:
      "Pas forcément. Réduire la durée de port, choisir des lentilles journalières et utiliser des larmes compatibles suffit souvent. Parlez-en à votre ophtalmologiste si l'inconfort persiste.",
    reponse: (
      <p>
        Pas forcément. Réduire la durée de port, choisir des lentilles journalières et utiliser des larmes compatibles
        suffit souvent. Parlez-en à votre ophtalmologiste si l'inconfort persiste.
      </p>
    ),
  },
  {
    question: "Une ménopause précoce change-t-elle quelque chose pour les yeux ?",
    texte:
      "Plusieurs études associent une ménopause avant 45 ans, ou une ablation des deux ovaires avant 43 ans, à un risque plus élevé de glaucome. Ce lien ne prouve pas une cause, mais il vaut la peine de le signaler à son ophtalmologiste.",
    reponse: (
      <>
        <p>
          Plusieurs études associent une ménopause avant 45 ans, ou une ablation des deux ovaires avant 43 ans, à un
          risque plus élevé de glaucome. Ce lien ne prouve pas une cause, mais il vaut la peine de le signaler à son
          ophtalmologiste.
        </p>
        <p>
          <Cite s="dewundara2016" />
        </p>
      </>
    ),
  },
];

export default function Page() {
  const page = pagesReference.find((p) => p.chemin === chemin)!;
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
              image: `${site.url}/photos/02-pilier-yeux-fermes-1600.webp`,
              citation: Object.values(src).map((s) => s.url),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Ménopause et yeux", item: adresse },
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
            <h1 className="titre-1 md:!text-[52px]">Ménopause et yeux : ce qui vient des hormones, ce qui vient de l'âge</h1>
            <p className="max-w-[38em] text-[18px] leading-normal text-doux md:text-[20px]">
              Yeux qui piquent, paupières qui gonflent, lunettes de lecture devenues indispensables : entre 45 et 55 ans,
              les yeux changent. Faire la part des hormones et de l'âge permet de choisir le bon geste, et de savoir quand
              consulter.
            </p>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[22px] bg-photo md:rounded-[28px]">
            <Photo nom="02-pilier-yeux-fermes" sizes="(min-width: 1024px) 460px, 100vw" prioritaire position="35% 40%" className="absolute inset-0" />
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
            <li>
              <strong>Le trouble le plus lié aux hormones est l'œil sec.</strong> La baisse des androgènes modifie les
              glandes qui fabriquent la couche grasse des larmes.
            </li>
            <li>
              <strong>La vue qui baisse de près, c'est la presbytie.</strong> Elle dépend de l'âge du cristallin, pas de la
              ménopause.
            </li>
            <li>
              <strong>Les paupières sont en première ligne.</strong> Quand leurs glandes fonctionnent mal, blépharite et
              chalazion trouvent un terrain favorable.
            </li>
            <li>
              <strong>Le traitement hormonal n'est pas un traitement des yeux.</strong> Dans la plus grande étude sur le sujet, il était
              associé à plus de sécheresse oculaire, pas à moins.
            </li>
            <li>
              Certains signes imposent une consultation le jour même :{" "}
              <a href="#consulter" className="lien">
                lesquels
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <div className="conteneur flex flex-col gap-14 pt-12 md:gap-16 md:pt-16">
        <section id="pourquoi" className="prose max-w-[46em] scroll-mt-6">
          <h2>Pourquoi les yeux changent autour de la ménopause</h2>
          <p>
            La surface de l'œil est protégée par le film lacrymal, une couche très fine qui se renouvelle à chaque
            clignement. Il a trois composantes : une couche grasse en surface, produite par les glandes de Meibomius
            situées dans les paupières ; une couche d'eau, produite par les glandes lacrymales ; une couche de mucus qui
            l'accroche à l'œil.
          </p>
          <p>
            Ces glandes sont sensibles aux hormones sexuelles. Les androgènes, présents aussi chez la femme, soutiennent le
            fonctionnement des glandes de Meibomius ; leur baisse est un facteur de risque reconnu de dysfonction de ces
            glandes. <Cite s="dews2017" /> Quand la couche grasse s'appauvrit ou s'épaissit, les larmes s'évaporent trop
            vite : c'est la sécheresse dite « évaporative », la forme la plus fréquente.
          </p>
          <p>
            Un point d'honnêteté : le rapport international de référence sur l'œil sec juge le lien avec la ménopause
            elle-même encore non concluant. Ce qui est établi, ce sont l'âge, le fait d'être une femme, le déficit en
            androgènes et le traitement hormonal. <Cite s="dewsFacteurs" /> La période de la ménopause réunit donc plusieurs
            facteurs de risque à la fois, sans que chaque symptôme puisse être attribué à la seule chute des œstrogènes.
          </p>
        </section>

        <section id="secheresse" className="prose max-w-[46em] scroll-mt-6">
          <h2>La sécheresse oculaire</h2>
          <p>
            C'est le trouble oculaire le plus courant à cette période, et l'un des moins reconnus : dans une enquête relayée
            en septembre 2026, seules 14 % des femmes en périménopause ou après la ménopause l'associaient à la ménopause,
            contre 79 % pour les bouffées de chaleur. <Cite s="enquete2026" />
          </p>
          <p>Les signes typiques :</p>
          <ul>
            <li>sensation de sable ou de brûlure, surtout en fin de journée ;</li>
            <li>yeux rouges, fatigués devant un écran ;</li>
            <li>vision qui se brouille par moments et redevient nette après quelques clignements ;</li>
            <li>larmoiement paradoxal : l'œil irrité produit des larmes de mauvaise qualité qui coulent sans hydrater ;</li>
            <li>lentilles de contact moins bien supportées qu'avant.</li>
          </ul>
          <p>
            Plusieurs facteurs aggravent nettement la gêne : le travail sur écran (on cligne beaucoup moins), l'air sec ou
            climatisé, la ventilation dirigée vers le visage, et certains médicaments courants, comme les antihistaminiques
            ou certains antidépresseurs.
          </p>
        </section>

        <section id="paupieres" className="prose max-w-[46em] scroll-mt-6">
          <h2>Paupières : blépharite et chalazion</h2>
          <p>
            Les glandes de Meibomius débouchent au ras des cils. Quand leur sécrétion devient plus épaisse, elles se
            bouchent plus facilement. Deux situations en découlent souvent :
          </p>
          <ul>
            <li>
              <strong>la blépharite</strong> : bords de paupières rouges, collants au réveil, parfois avec de petites
              croûtes à la base des cils. Elle entretient la sécheresse, qui l'entretient en retour ;
            </li>
            <li>
              <strong>le chalazion</strong> : une glande se bouche complètement et forme une petite boule ferme dans la
              paupière. Ce n'est pas une infection, contrairement à l'orgelet.
            </li>
          </ul>
          <p>
            Aucune étude ne montre à ce jour que le chalazion est plus fréquent après la ménopause. Mais le mécanisme qui le
            favorise, la dysfonction des glandes de Meibomius, est plus courant avec l'âge et la baisse des androgènes.
            Causes, durée, traitements chiffrés et signes d'alerte :{" "}
            <Link href={chalazion}>notre page sur le chalazion à répétition</Link>.
          </p>
        </section>

        <section id="vision" className="flex scroll-mt-6 flex-col gap-6">
          <div className="prose max-w-[46em]">
            <h2>Vision floue : la ménopause ou l'âge ?</h2>
            <p>C'est la confusion la plus fréquente. Deux phénomènes très différents se produisent au même âge.</p>
          </div>
          <div className="overflow-x-auto rounded-[20px] border border-trait bg-white">
            <table className="w-full min-w-[600px] text-left text-[16px]">
              <thead className="bg-sauge">
                <tr>
                  <th scope="col" className="p-4 font-semibold"></th>
                  <th scope="col" className="p-4 font-semibold">Presbytie</th>
                  <th scope="col" className="p-4 font-semibold">Flou lié à l'œil sec</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cause", "Le cristallin perd sa souplesse avec l'âge", "Le film lacrymal se rompt entre deux clignements"],
                  ["Lien avec la ménopause", "Aucun : elle touche aussi les hommes", "Indirect, par les facteurs hormonaux décrits plus haut"],
                  ["Ce qu'on remarque", "On éloigne le livre ou le téléphone pour lire", "La vue fluctue, se brouille puis redevient nette en clignant"],
                  ["Évolution", "Apparaît entre 40 et 45 ans, se stabilise vers 55-60 ans", "Variable selon l'heure, l'écran, l'air ambiant"],
                  ["Ce qui aide", "Lunettes ou lentilles adaptées", "Larmes artificielles, pauses, soin des paupières"],
                ].map(([critere, presbytie, sec]) => (
                  <tr key={critere} className="border-t border-trait align-top">
                    <th scope="row" className="p-4 font-semibold">
                      {critere}
                    </th>
                    <td className="p-4">{presbytie}</td>
                    <td className="p-4">{sec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="prose max-w-[46em]">
            <p className="text-[15px] text-discret">
              Âge de la presbytie : <Cite s="presbytie" />.
            </p>
            <p>
              Si la vue baisse de près de façon stable, il s'agit presque toujours de presbytie, et un examen de la vue
              règle la question. Si elle fluctue au fil de la journée, l'œil sec est le suspect principal. Une baisse de
              vision brutale, ou qui touche un seul œil, n'entre dans aucune de ces deux cases : elle doit faire consulter
              rapidement.
            </p>
          </div>
        </section>

        <section id="glaucome" className="prose max-w-[46em] scroll-mt-6">
          <h2>Glaucome et cataracte : ce que l'on sait</h2>
          <p>
            Ces maladies sont surtout liées à l'âge. Le rôle des hormones est étudié mais reste mal établi, et il serait
            faux d'en faire des « symptômes de la ménopause ».
          </p>
          <ul>
            <li>
              <strong>Glaucome.</strong> Plusieurs études d'observation associent une ménopause précoce à un risque plus
              élevé de glaucome à angle ouvert : risque multiplié par 2,6 avant 45 ans dans l'étude de Rotterdam{" "}
              <Cite s="dewundara2016" />, risque accru après une ablation des deux ovaires avant 43 ans, que le traitement
              par œstrogènes ne semblait pas atténuer <Cite s="vajaranant2014" />. Ces liens ne prouvent pas une cause. Si
              votre ménopause a été précoce ou chirurgicale, signalez-le à votre ophtalmologiste.
            </li>
            <li>
              <strong>Cataracte.</strong> Elle est avant tout liée à l'âge. Rien ne justifie de prendre ou d'arrêter un
              traitement hormonal pour elle.
            </li>
          </ul>
          <p>
            Le glaucome ne donne aucun symptôme avant d'avoir abîmé le nerf optique : passé 45 ans, un examen
            ophtalmologique régulier, au rythme fixé par l'ophtalmologiste, reste la meilleure protection.
          </p>
        </section>

        <section id="traitement-hormonal" className="prose max-w-[46em] scroll-mt-6">
          <h2>Le traitement hormonal et les yeux</h2>
          <p>
            On pourrait penser que remplacer les hormones protège les yeux. Pour la sécheresse oculaire, les données disent
            plutôt l'inverse. Dans la Women's Health Study, qui a suivi plus de 25 000 femmes ménopausées, celles qui
            prenaient un traitement hormonal avaient plus souvent une sécheresse oculaire : risque augmenté de 69 % avec les
            œstrogènes seuls et de 29 % avec l'association œstrogènes et progestatif. Le risque augmentait avec la durée du
            traitement. <Cite s="schaumberg2001" />
          </p>
          <p>
            C'est une étude d'observation : elle ne prouve pas que le traitement cause la sécheresse. Elle suffit en
            revanche à retenir deux règles :
          </p>
          <ul>
            <li>
              le traitement hormonal se décide pour les bouffées de chaleur et les troubles pour lesquels il est indiqué,
              pas pour les yeux ;
            </li>
            <li>
              si vos yeux deviennent plus secs après le début d'un traitement, parlez-en au médecin qui l'a prescrit, sans
              l'arrêter de vous-même.
            </li>
          </ul>
        </section>

        <section id="solutions" className="flex scroll-mt-6 flex-col gap-6">
          <div className="prose max-w-[46em]">
            <h2>Ce qui marche, ce qui ne marche pas</h2>
            <p>
              <strong>Ce qui aide, dans la majorité des cas :</strong>
            </p>
            <ol>
              <li>
                <strong>Des larmes artificielles sans conservateur</strong>, plusieurs fois par jour, et un gel plus épais le
                soir si les réveils sont pénibles. Les conservateurs irritent la surface de l'œil en usage répété. Votre
                pharmacien peut vous orienter.
              </li>
              <li>
                <strong>Le soin des paupières</strong> : chaleur douce 5 à 10 minutes (compresse tiède ou masque chauffant),
                puis nettoyage du bord des paupières. C'est la base de la prise en charge de la sécheresse évaporative et
                des chalazions à répétition.
              </li>
              <li>
                <strong>Des pauses à l'écran</strong> : toutes les 20 minutes, regarder au loin une vingtaine de secondes en
                clignant franchement.
              </li>
              <li>
                <strong>Un air moins sec</strong> : éviter la ventilation ou la climatisation dirigée vers le visage,
                aérer, humidifier une chambre très chauffée.
              </li>
              <li>
                <strong>Faire le point sur ses médicaments</strong> avec son médecin ou son pharmacien.
              </li>
            </ol>
            <p>
              <strong>Ce qui a moins de preuves qu'on ne le dit :</strong>
            </p>
            <ul>
              <li>
                <strong>Les oméga-3.</strong> Ils sont très souvent conseillés pour l'œil sec. Mais dans l'essai DREAM, 535
                personnes atteintes de sécheresse oculaire modérée à sévère n'ont pas mieux évolué en un an sous oméga-3 que
                sous placebo. <Cite s="dream2018" />
              </li>
              <li>
                <strong>Les compléments « spécial ménopause ».</strong> Aucun de ceux que nous avons analysés n'a été étudié
                sur les yeux.
              </li>
            </ul>
            <p>
              Si la gêne persiste malgré ces gestes, l'ophtalmologiste dispose de traitements sur ordonnance, adaptés à la
              cause : collyres anti-inflammatoires, prise en charge d'une rosacée ou d'une blépharite, petits bouchons qui
              ralentissent l'écoulement des larmes.
            </p>
          </div>
        </section>

        <section id="consulter" className="scroll-mt-6">
          <aside className="flex flex-col gap-3 rounded-3xl border-[1.5px] border-rouille bg-argile px-6 py-7 md:px-8">
            <h2 className="text-[22px] font-medium leading-tight md:text-[26px]">Quand consulter, et en combien de temps</h2>
            <ul className="flex max-w-[46em] list-disc flex-col gap-2 pl-5">
              <li>
                <strong>Le jour même, aux urgences ophtalmologiques</strong> : œil rouge et douloureux, baisse brutale de la
                vision <Cite s="urgences" /> ; éclairs, apparition soudaine de « mouches volantes » ou d'un voile noir
                devant un œil <Cite s="retine" /> ; vision double soudaine.
              </li>
              <li>
                <strong>Dans les 24 à 48 heures</strong> : chalazion qui grossit vite, devient très douloureux ou s'accompagne
                de fièvre ou d'un gonflement de toute la paupière.
              </li>
              <li>
                <strong>En consultation programmée</strong> : sécheresse ou irritation qui persiste après 2 à 3 semaines de
                larmes artificielles et de soins des paupières ; chalazion présent depuis plus de 3 semaines, ou qui revient.
              </li>
              <li>
                <strong>En contrôle de routine</strong> : vue de près qui baisse progressivement ; ménopause avant 45 ans ou
                chirurgicale ; aucun examen depuis plus de deux ans.
              </li>
            </ul>
          </aside>
        </section>

        <section id="questions" className="flex scroll-mt-6 flex-col gap-6">
          <h2 className="titre-2">Vos questions</h2>
          <Faq questions={questions} />
        </section>

        <section id="sources" className="prose max-w-[46em] scroll-mt-6">
          <h2>Sources</h2>
          <ul>
            {Object.entries(src).map(([cle, s]) => (
              <li key={cle}>
                <a href={s.url} target="_blank" rel="noopener">
                  {s.court}
                </a>
                {s.note ? ` : ${s.note}` : ""}
              </li>
            ))}
          </ul>
        </section>

        <aside className="flex flex-col gap-2 rounded-3xl border border-trait bg-white px-6 py-7 md:px-8">
          <h2 className="text-[22px] font-medium leading-tight md:text-[24px]">Une page d'information, pas un avis médical</h2>
          <p className="max-w-[46em] text-doux">
            Cette page résume ce que disent les études. Elle ne remplace pas une consultation : en cas de doute sur un
            symptôme oculaire, demandez l'avis d'un professionnel de santé. Voir aussi{" "}
            <Link href="/comment-nous-classons/" className="lien">
              notre méthode
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  );
}
