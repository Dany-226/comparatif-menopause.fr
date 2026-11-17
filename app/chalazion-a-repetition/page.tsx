import Link from "next/link";
import { Faq, type Question } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { pagesReference, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { meta } from "@/lib/meta";

const chemin = "/chalazion-a-repetition/";
const majLe = "2026-11-17";

export const metadata = meta({
  titre: "Chalazion à répétition : causes, durée, traitements efficaces",
  titreComplet: true,
  description:
    "Pourquoi un chalazion revient, combien de temps il dure, ce que valent compresses, pommades et homéopathie, et quand un chalazion doit être biopsié.",
  chemin,
});

/**
 * Sources de la page. Elles ne portent pas sur des compléments : elles vivent ici
 * plutôt que dans data/preuves.ts, qui sert au classement.
 */
const src: Record<string, { court: string; url: string; note?: string }> = {
  park2025: {
    court: "Park et al., 2025",
    note: "revue de 39 études ; chiffres lus dans le résumé publié par NZ Optics",
    url: "https://new.nzoptics.co.nz/live-articles/oculoplastics-2025-update/",
  },
  essai2019: {
    court: "Essai randomisé, Journal of Current Ophthalmology, 2019",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6742612",
  },
  serieKarachi: {
    court: "Série de cas, Pakistan Journal of Ophthalmology",
    url: "https://distantreader.org/stacks/journals/pjo/pjo-81.pdf",
  },
  etudesCuretage: {
    court: "deux études comparatives",
    note: "Pakistan Journal of Ophthalmology (84 %) et étude népalaise (77 %, nepjol.info)",
    url: "https://distantreader.org/stacks/journals/pjo/pjo-965.pdf",
  },
  orbit2024: {
    court: "Sorensen et al., Orbit, 2024",
    url: "https://pesquisa.bvsalud.org/sms/resource/pt/mdl-38861504",
  },
  oculoplastique: {
    court: "Fiche d'un chirurgien oculoplastique (eyeplastics.com)",
    url: "https://eyeplastics.com/services/chalazion",
  },
  dews2017: {
    court: "TFOS DEWS II, rapport sexe, genre et hormones, 2017",
    url: "https://research.bidmc.org/eye/publications/tfos-dews-ii-sex-gender-and-hormones-report",
  },
  schaumberg2001: {
    court: "Schaumberg et al., JAMA, 2001",
    url: "https://jamanetwork.com/journals/jama/fullarticle/194334",
  },
  has2019: {
    court: "Haute Autorité de santé, 28 juin 2019",
    url: "https://www.has-sante.fr/jcms/p_3066934/fr/medicaments-homeopathiques-une-efficacite-",
  },
  statpearls: {
    court: "StatPearls, Chalazion (NCBI)",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK499889/",
  },
  medscape: {
    court: "Medscape, carcinome sébacé",
    url: "https://img.medscape.com/pi/iphone/medscapeapp/html/A1213781-business.html",
  },
  aao2015: {
    court: "American Academy of Ophthalmology, Ophthalmic Pearls, 2015",
    url: "https://aao.org/Assets/cbf3dc77-415b-42bd-b100-d1b8fcccb26e/635757114200570000/september-2015-ophthalmic-pearls-pdf",
  },
};

type Cle = string;

function Cite({ s }: { s: Cle }) {
  return (
    <a href={src[s].url} target="_blank" rel="noopener" className="lien">
      {src[s].court}
    </a>
  );
}

/** Coupe de la paupière supérieure : où naît un chalazion, où naît un orgelet. Schéma original. */
function SchemaPaupiere() {
  return (
    <figure className="flex flex-col gap-3">
      <svg viewBox="0 0 540 430" role="img" aria-labelledby="schema-titre schema-desc" className="h-auto w-full">
        <title id="schema-titre">Coupe de la paupière supérieure</title>
        <desc id="schema-desc">
          La glande de Meibomius traverse la charpente de la paupière et s'ouvre au bord, derrière les cils. Le
          chalazion se forme dans l'épaisseur de la paupière quand cette glande se bouche ; l'orgelet naît à la base
          d'un cil.
        </desc>
        <rect width="540" height="430" fill="#f7f9f1" />
        <circle cx="535" cy="215" r="275" fill="#d5e4ee" />
        <text x="440" y="60" fontSize="16" fill="#2e4336">Œil</text>
        <path
          d="M150 0 L150 330 Q150 368 188 368 L212 368 Q250 368 250 330 L250 0 Z"
          fill="#e6ecd9"
          stroke="#1f3a2b"
          strokeWidth="2"
        />
        <rect x="204" y="150" width="40" height="208" rx="14" fill="#c9d8b6" />
        <line x1="224" y1="166" x2="224" y2="368" stroke="#1f3a2b" strokeWidth="3" strokeLinecap="round" />
        {[180, 205, 300, 325].map((y) => (
          <g key={y}>
            <circle cx="214" cy={y} r="6" fill="#f7f9f1" stroke="#1f3a2b" strokeWidth="1.5" />
            <circle cx="234" cy={y} r="6" fill="#f7f9f1" stroke="#1f3a2b" strokeWidth="1.5" />
          </g>
        ))}
        <circle cx="224" cy="252" r="31" fill="#f7e8df" stroke="#8a3b1f" strokeWidth="2.5" />
        {[
          [168, 366, 128, 402],
          [174, 368, 142, 410],
          [180, 369, 158, 414],
        ].map(([x1, y1, x2, y2]) => (
          <path key={x2} d={`M${x1} ${y1} Q${x1 - 6} ${y2 - 10} ${x2} ${y2}`} stroke="#14241b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        ))}
        <circle cx="168" cy="350" r="9" fill="#d6f15b" stroke="#8a3b1f" strokeWidth="2" />

        <g fontSize="15" fill="#14241b">
          <line x1="96" y1="90" x2="150" y2="90" stroke="#6f8576" strokeWidth="1.5" />
          <text x="20" y="95">Peau</text>
          <line x1="244" y1="140" x2="290" y2="118" stroke="#6f8576" strokeWidth="1.5" />
          <text x="294" y="114">Tarse : la charpente</text>
          <text x="294" y="132">de la paupière</text>
          <line x1="238" y1="192" x2="290" y2="182" stroke="#6f8576" strokeWidth="1.5" />
          <text x="294" y="187">Glande de Meibomius</text>
          <line x1="255" y1="252" x2="290" y2="252" stroke="#8a3b1f" strokeWidth="1.5" />
          <text x="294" y="248" fontWeight="600" fill="#8a3b1f">Chalazion :</text>
          <text x="294" y="266" fill="#8a3b1f">glande bouchée</text>
          <line x1="226" y1="370" x2="290" y2="392" stroke="#6f8576" strokeWidth="1.5" />
          <text x="294" y="397">Orifice de la glande</text>
          <line x1="158" y1="347" x2="112" y2="318" stroke="#6f8576" strokeWidth="1.5" />
          <text x="20" y="306" fontWeight="600">Orgelet :</text>
          <text x="20" y="324">base d'un cil</text>
          <text x="20" y="420">Cils</text>
          <line x1="58" y1="415" x2="124" y2="404" stroke="#6f8576" strokeWidth="1.5" />
        </g>
      </svg>
      <figcaption className="text-[15px] text-discret">
        Coupe de la paupière supérieure. Le chalazion naît dans l'épaisseur de la paupière, l'orgelet au bord, à la base
        d'un cil.
      </figcaption>
    </figure>
  );
}

const sommaire = [
  { href: "#definition", libelle: "Qu'est-ce qu'un chalazion ?" },
  { href: "#causes", libelle: "Causes" },
  { href: "#repetition", libelle: "Pourquoi il revient" },
  { href: "#duree", libelle: "Durée" },
  { href: "#traitements", libelle: "Traitements chiffrés" },
  { href: "#consulter", libelle: "Quand consulter" },
  { href: "#questions", libelle: "Vos questions" },
];

const questions: Question[] = [
  {
    question: "Un chalazion est-il contagieux ?",
    texte: "Non. Un chalazion est une inflammation autour d'une glande de la paupière bouchée, sans microbe en cause.",
    reponse: (
      <>
        <p>Non. Un chalazion est une inflammation autour d'une glande de la paupière bouchée, sans microbe en cause.</p>
        <p>
          <Cite s="essai2019" />
        </p>
      </>
    ),
  },
  {
    question: "Combien de temps dure un chalazion ?",
    texte:
      "De quelques semaines à plusieurs mois. Environ un sur quatre disparaît seul. Au-delà de 3 à 4 semaines sans amélioration malgré les compresses chaudes, une consultation permet d'envisager un traitement plus rapide.",
    reponse: (
      <>
        <p>De quelques semaines à plusieurs mois. Environ un sur quatre disparaît seul.</p>
        <p>
          Au-delà de 3 à 4 semaines sans amélioration malgré les compresses chaudes, une consultation permet d'envisager
          un traitement plus rapide. <Cite s="serieKarachi" />
        </p>
      </>
    ),
  },
  {
    question: "Pourquoi j'ai des chalazions à répétition ?",
    texte:
      "Le plus souvent, parce que les glandes de Meibomius fonctionnent mal : blépharite, rosacée, sécheresse oculaire. Un chalazion traité disparaît, mais une glande voisine peut se boucher à son tour. Traiter ce terrain au quotidien réduit les récidives.",
    reponse: (
      <>
        <p>
          Le plus souvent, parce que les glandes de Meibomius fonctionnent mal : blépharite, rosacée, sécheresse
          oculaire. Un chalazion traité disparaît, mais une glande voisine peut se boucher à son tour.
        </p>
        <p>
          Prendre soin des paupières chaque jour, et pas seulement pendant les crises, réduit les récidives.{" "}
          <Cite s="oculoplastique" />
        </p>
      </>
    ),
  },
  {
    question: "L'homéopathie marche-t-elle sur un chalazion ?",
    texte:
      "Aucune étude ne le montre. La Haute Autorité de santé a jugé en 2019 l'efficacité des médicaments homéopathiques insuffisante pour justifier leur remboursement.",
    reponse: (
      <>
        <p>
          Aucune étude ne le montre. La Haute Autorité de santé a jugé en 2019 l'efficacité des médicaments
          homéopathiques insuffisante pour justifier leur remboursement.
        </p>
        <p>
          <Cite s="has2019" />
        </p>
      </>
    ),
  },
  {
    question: "Un chalazion peut-il rendre la vue floue ?",
    texte:
      "Oui, s'il est assez gros pour appuyer sur l'œil, surtout sur la paupière supérieure. La vision redevient normale une fois le chalazion parti. Une baisse de vision brutale doit faire consulter en urgence.",
    reponse: (
      <>
        <p>
          Oui, s'il est assez gros pour appuyer sur l'œil, surtout sur la paupière supérieure. La vision redevient
          normale une fois le chalazion parti.
        </p>
        <p>Une baisse de vision brutale, elle, doit faire consulter en urgence.</p>
      </>
    ),
  },
  {
    question: "Peut-on se maquiller avec un chalazion ?",
    texte:
      "Mieux vaut s'en abstenir pendant la phase inflammée, puis bien démaquiller le bord des paupières chaque soir.",
    reponse: <p>Mieux vaut s'en abstenir pendant la phase inflammée, puis bien démaquiller le bord des paupières chaque soir.</p>,
  },
  {
    question: "Faut-il s'inquiéter d'un chalazion qui revient au même endroit ?",
    texte:
      "Il faut le montrer à un ophtalmologiste. Le plus souvent, c'est un simple chalazion. Mais une tumeur rare des glandes de la paupière, le carcinome sébacé, peut l'imiter, surtout chez les personnes âgées : une biopsie permet de l'écarter.",
    reponse: (
      <>
        <p>
          Il faut le montrer à un ophtalmologiste. Le plus souvent, c'est un simple chalazion. Mais une tumeur rare des
          glandes de la paupière, le carcinome sébacé, peut l'imiter, surtout chez les personnes âgées : une biopsie
          permet de l'écarter.
        </p>
        <p>
          <Cite s="statpearls" />
        </p>
      </>
    ),
  },
];

const traitements = [
  {
    nom: "Compresses chaudes, massage, hygiène des paupières",
    qui: "Vous-même",
    disparition: (
      <>
        25 à 50 % selon les études (<Cite s="essai2019" />) ; environ 34 % dans une revue de 2025, même avec une
        pommade (<Cite s="park2025" />)
      </>
    ),
    recidive: "Environ 46 %",
  },
  {
    nom: "Injection de corticoïde (triamcinolone) dans le chalazion",
    qui: "Ophtalmologiste, en consultation",
    disparition: (
      <>
        70 à 92 % pour les petits et moyens chalazions, moins pour les gros (<Cite s="park2025" />)
      </>
    ),
    recidive: "Environ 34 %",
  },
  {
    nom: "Incision et curetage sous anesthésie locale",
    qui: "Ophtalmologiste",
    disparition: (
      <>
        77 à 90 % selon les études (<Cite s="etudesCuretage" />)
      </>
    ),
    recidive: "Environ 19 %",
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
              citation: Object.values(src).map((s) => s.url),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "Chalazion à répétition", item: adresse },
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
        <div className="grid items-center gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="surtitre md:!text-[14px]">Comprendre · mis à jour le {dateLongue(majLe)}</div>
            <h1 className="titre-1 md:!text-[52px]">Chalazion à répétition : causes, durée et traitements qui marchent vraiment</h1>
            <p className="max-w-[38em] text-[18px] leading-normal text-doux md:text-[20px]">
              Une petite boule dans la paupière, bénigne, qui disparaît souvent seule, mais revient chez certaines
              personnes. Pourquoi, ce que valent vraiment les traitements, chiffres à l'appui, et quand un chalazion qui
              revient doit être examiné de plus près.
            </p>
          </div>
          <div className="rounded-[22px] border border-trait bg-white p-4 md:rounded-[28px] md:p-5">
            <SchemaPaupiere />
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
              Un chalazion n'est <strong>pas une infection</strong> et <strong>n'est pas contagieux</strong> : c'est une
              inflammation autour d'une glande de Meibomius bouchée.
            </li>
            <li>
              Les soins à la maison (chaleur, massage, hygiène des paupières) en font disparaître{" "}
              <strong>25 à 50 %</strong> selon les études. L'injection de corticoïde et la petite chirurgie font nettement
              mieux.
            </li>
            <li>
              Un chalazion revient surtout quand la cause de fond n'est pas prise en charge : dysfonction des glandes de
              Meibomius, blépharite, rosacée, sécheresse oculaire.
            </li>
            <li>
              Un chalazion qui <strong>revient toujours au même endroit</strong>, surtout après 50 ans, se montre à un
              ophtalmologiste :{" "}
              <a href="#biopsie" className="lien">
                pourquoi une biopsie
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <div className="conteneur flex flex-col gap-14 pt-12 md:gap-16 md:pt-16">
        <section id="definition" className="prose max-w-[46em] scroll-mt-6">
          <h2>Qu'est-ce qu'un chalazion ?</h2>
          <p>
            Les paupières contiennent des glandes de Meibomius, alignées dans leur épaisseur. Elles sécrètent une huile
            qui forme la couche superficielle des larmes et les empêche de s'évaporer. Quand le canal d'une glande se
            bouche, l'huile s'accumule dans la paupière. Le corps réagit par une inflammation qui encapsule ce dépôt :
            c'est le chalazion, une masse inflammatoire stérile, sans microbe. <Cite s="essai2019" />
          </p>
          <p>
            Il se présente comme une boule ronde et ferme, de la taille d'un grain de riz à celle d'un petit pois. Au
            début, la paupière peut être rouge et sensible. Ensuite, la boule devient le plus souvent indolore.
          </p>
        </section>

        <section id="causes" className="prose max-w-[46em] scroll-mt-6">
          <h2>Causes : pourquoi la glande se bouche</h2>
          <p>
            Le point de départ est presque toujours une sécrétion trop épaisse des glandes de Meibomius. Plusieurs
            situations la favorisent :
          </p>
          <ul>
            <li>
              <strong>la dysfonction des glandes de Meibomius</strong> et la blépharite postérieure (bord des paupières
              rouge et encrassé), cause de fond dans la plupart des cas ;
            </li>
            <li>
              <strong>la rosacée</strong>, y compris sa forme oculaire ;
            </li>
            <li>
              <strong>la sécheresse oculaire</strong>, qui entretient le cercle vicieux ;
            </li>
            <li>un maquillage des yeux mal retiré, des lentilles portées longtemps, le fait de se frotter les yeux.</li>
          </ul>
          <p>
            <Cite s="oculoplastique" />
          </p>
          <p>
            <strong>Et les causes psychologiques ?</strong> C'est une question fréquente. Aucune étude ne montre que le
            stress crée un chalazion. Il peut en revanche modifier des habitudes qui comptent : se frotter les yeux,
            dormir moins, négliger le démaquillage.
          </p>
        </section>

        <section id="repetition" className="prose max-w-[46em] scroll-mt-6">
          <h2>Chalazion à répétition : pourquoi il revient</h2>
          <p>
            Un chalazion qui a disparu ne laisse pas la paupière à l'abri : une glande voisine peut se boucher à son tour
            si la cause de fond reste en place. Selon une revue de 2025, la récidive tourne autour de 46 % après les seuls
            soins locaux, 34 % après une injection de corticoïde et 19 % après une incision. <Cite s="park2025" />
          </p>
          <p>
            Dans un essai randomisé sur des chalazions anciens, le chalazion est revenu chez 34,6 % des patients après
            injection, contre 8 % après incision et curetage. <Cite s="essai2019" /> Une série américaine de 649 patients
            opérés trouve moins d'un tiers de récidives, plus fréquentes chez les patients jeunes, les femmes et ceux qui
            avaient plusieurs chalazions à la fois. <Cite s="orbit2024" />
          </p>
          <p>Quand les chalazions s'enchaînent, c'est le terrain qu'il faut prendre en charge, pas seulement la boule du moment :</p>
          <ol>
            <li>
              <strong>une hygiène des paupières quotidienne</strong>, y compris entre les crises : chaleur douce puis
              nettoyage du bord des paupières, chaque soir ;
            </li>
            <li>
              <strong>la prise en charge de la sécheresse oculaire</strong> si elle est présente ;
            </li>
            <li>
              <strong>le traitement d'une rosacée</strong> quand elle existe : le médecin peut prescrire un antibiotique
              par voie orale à faible dose sur plusieurs semaines, pour son effet anti-inflammatoire sur les glandes ; il
              réduit les récidives <Cite s="oculoplastique" /> ;
            </li>
            <li>
              <strong>un avis ophtalmologique</strong> si les chalazions reviennent malgré tout, en particulier au même
              endroit.
            </li>
          </ol>
        </section>

        <section id="menopause" className="prose max-w-[46em] scroll-mt-6">
          <h2>Après 45 ans et à la ménopause</h2>
          <p>
            Aucune étude ne montre à ce jour que le chalazion est plus fréquent après la ménopause. En revanche, le
            terrain qui le favorise devient plus courant à cette période. Les androgènes, présents aussi chez la femme,
            soutiennent le fonctionnement des glandes de Meibomius ; leur baisse est un facteur de risque reconnu de
            dysfonction de ces glandes. <Cite s="dews2017" />
          </p>
          <p>
            Un point souvent mal compris : le traitement hormonal de la ménopause ne protège pas les paupières. Dans une
            étude qui a suivi plus de 25 000 femmes ménopausées, il était même associé à davantage de sécheresse
            oculaire. <Cite s="schaumberg2001" />
          </p>
        </section>

        <section id="duree" className="prose max-w-[46em] scroll-mt-6">
          <h2>Évolution : quand il mûrit, combien de temps il dure</h2>
          <p>Un chalazion passe généralement par deux phases :</p>
          <ol>
            <li>
              <strong>la phase inflammatoire</strong>, de quelques jours : paupière gonflée, rouge, un peu sensible. C'est
              le chalazion « qui mûrit », et le meilleur moment pour les compresses chaudes ;
            </li>
            <li>
              <strong>la phase enkystée</strong> : l'inflammation retombe, il reste une boule ferme et indolore. Les soins
              locaux agissent alors moins.
            </li>
          </ol>
          <p>
            <strong>Combien de temps dure un chalazion ?</strong> Il n'y a pas de durée fixe. Environ un sur quatre
            disparaît seul. <Cite s="serieKarachi" /> D'autres persistent plusieurs mois. Si la boule ne diminue pas
            après 3 à 4 semaines de soins bien faits, il est raisonnable de consulter.
          </p>
          <p>
            <strong>Un chalazion qui perce</strong> peut s'ouvrir seul, le plus souvent du côté intérieur de la
            paupière. Il ne faut jamais le percer ni le presser soi-même : on risque une surinfection et une cicatrice.
            S'il s'est ouvert, nettoyer doucement et poursuivre les compresses ; consulter s'il saigne, devient très
            douloureux ou si toute la paupière gonfle.
          </p>
        </section>

        <section id="localisation" className="prose max-w-[46em] scroll-mt-6">
          <h2>Paupière supérieure, inférieure ou chalazion interne</h2>
          <ul>
            <li>
              <strong>Paupière supérieure</strong> : un gros chalazion peut appuyer sur l'œil et brouiller la vue.
            </li>
            <li>
              <strong>Paupière inférieure</strong> : mêmes causes et même prise en charge. La boule y est souvent plus
              visible, la peau étant fine.
            </li>
            <li>
              <strong>Chalazion interne</strong> : il se développe vers l'intérieur de la paupière, côté œil. On le voit en
              retournant doucement la paupière, sous la forme d'une zone rouge ou jaunâtre. Il donne surtout une sensation
              de corps étranger. L'incision, si elle est nécessaire, se fait alors par l'intérieur.
            </li>
          </ul>
        </section>

        <section id="orgelet" className="flex scroll-mt-6 flex-col gap-6">
          <div className="prose max-w-[46em]">
            <h2>Chalazion ou orgelet ? Est-ce contagieux ?</h2>
          </div>
          <div className="overflow-x-auto rounded-[20px] border border-trait bg-white">
            <table className="w-full min-w-[560px] text-left text-[16px]">
              <thead className="bg-sauge">
                <tr>
                  <th scope="col" className="p-4 font-semibold"></th>
                  <th scope="col" className="p-4 font-semibold">Chalazion</th>
                  <th scope="col" className="p-4 font-semibold">Orgelet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nature", "Glande de Meibomius bouchée, inflammation sans microbe", "Infection d'une glande à la base d'un cil, le plus souvent par un staphylocoque"],
                  ["Douleur", "Faible ou absente une fois installé", "Nette, la zone est sensible au toucher"],
                  ["Emplacement", "Dans l'épaisseur de la paupière", "Au ras des cils, souvent avec un point blanc"],
                  ["Évolution", "Lente, parfois plusieurs semaines ou mois", "Rapide, en général 1 à 2 semaines"],
                  ["Contagieux", "Non", "Peu, mais ne partagez ni serviette ni maquillage"],
                ].map(([critere, chalazion, orgelet]) => (
                  <tr key={critere} className="border-t border-trait align-top">
                    <th scope="row" className="p-4 font-semibold">
                      {critere}
                    </th>
                    <td className="p-4">{chalazion}</td>
                    <td className="p-4">{orgelet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="prose max-w-[46em]">
            Un orgelet mal résorbé peut laisser un chalazion derrière lui. Un chalazion peut aussi s'infecter : la
            paupière devient chaude, très rouge et douloureuse, ce qui justifie une consultation rapide.
          </p>
        </section>

        <section id="traitements" className="flex scroll-mt-6 flex-col gap-6">
          <div className="prose max-w-[46em]">
            <h2>Traitement : ce qui marche, chiffres à l'appui</h2>
            <p>La plupart des pages listent des solutions sans dire ce qu'elles valent. Voici ce que montrent les études.</p>
          </div>
          <div className="overflow-x-auto rounded-[20px] border border-trait bg-white">
            <table className="w-full min-w-[640px] text-left text-[16px]">
              <thead className="bg-sauge">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Traitement</th>
                  <th scope="col" className="p-4 font-semibold">Qui le réalise</th>
                  <th scope="col" className="p-4 font-semibold">Disparition rapportée</th>
                  <th scope="col" className="p-4 font-semibold">Récidive</th>
                </tr>
              </thead>
              <tbody>
                {traitements.map((t) => (
                  <tr key={t.nom} className="border-t border-trait align-top">
                    <th scope="row" className="p-4 font-semibold">
                      {t.nom}
                    </th>
                    <td className="p-4">{t.qui}</td>
                    <td className="p-4">{t.disparition}</td>
                    <td className="p-4">{t.recidive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="prose max-w-[46em]">
            <p className="text-[15px] text-discret">
              Taux de récidive : <Cite s="park2025" />. Prudence sur ces chiffres : cette revue de 39 études relève que la
              définition de la « disparition » et la durée de suivi varient fortement d'une étude à l'autre. Ils donnent un
              ordre de grandeur, pas une promesse.
            </p>
            <p>
              <strong>Ce qu'il faut en retenir.</strong> Les soins à la maison valent la peine en premier, surtout au
              début : ils sont sans risque et marchent une fois sur trois à une fois sur deux. S'ils échouent après 3 à 4
              semaines, insister des mois n'a guère de sens : l'injection et l'incision sont des gestes courts, faits au
              cabinet, et bien plus efficaces.
            </p>
            <p>
              <strong>Et la pommade antibiotique et corticoïde ?</strong> Elle est souvent prescrite, notamment en
              téléconsultation. Elle a sa place quand il y a une infection ou une inflammation marquée. Mais un chalazion
              n'est pas une infection : l'antibiotique n'agit pas sur sa cause, et l'association pommade plus compresses
              ne fait pas mieux que les compresses seules dans la revue de 2025. <Cite s="park2025" />
            </p>
          </div>
          <aside className="flex flex-col gap-3 rounded-[24px] bg-sauge p-6 md:p-8">
            <h3 className="titre-3">Le protocole des compresses chaudes</h3>
            <ol className="flex max-w-[46em] list-decimal flex-col gap-2 pl-5 text-[17px]">
              <li>Chauffez un gant de toilette propre à l'eau chaude, supportable sur l'intérieur du poignet, ou un masque chauffant pour les yeux.</li>
              <li>Posez-le sur l'œil fermé 10 à 15 minutes, en le réchauffant dès qu'il tiédit.</li>
              <li>Massez ensuite doucement la paupière avec le bout d'un doigt propre, en direction des cils.</li>
              <li>Nettoyez le bord des paupières avec une lingette ou une solution dédiée.</li>
              <li>Répétez 2 à 4 fois par jour pendant la crise, puis une fois par jour si les chalazions reviennent.</li>
            </ol>
          </aside>
        </section>

        <section id="naturel" className="prose max-w-[46em] scroll-mt-6">
          <h2>Homéopathie et remèdes naturels : ce que disent les preuves</h2>
          <p>
            <strong>L'homéopathie.</strong> Aucun essai solide ne montre qu'un produit homéopathique fait disparaître un
            chalazion. Plus largement, la Haute Autorité de santé a conclu en 2019 que les médicaments homéopathiques
            n'avaient pas démontré une efficacité suffisante pour être remboursés. <Cite s="has2019" /> Comme un chalazion
            sur quatre disparaît seul, il est facile d'attribuer une disparition spontanée au produit pris au même moment.
          </p>
          <p>
            <strong>Les « traitements naturels efficaces ».</strong> Le seul remède naturel qui a fait ses preuves est la
            chaleur, appliquée correctement et régulièrement : elle fluidifie l'huile des glandes. Le sachet de thé tiède
            fonctionne pour cette raison, pas grâce au thé.
          </p>
          <p>
            <strong>À éviter</strong> : le vinaigre de cidre, les huiles essentielles et toute préparation maison près de
            l'œil. Ils irritent la surface de l'œil et n'ont aucun effet démontré sur le chalazion.
          </p>
        </section>

        <section id="consulter" className="scroll-mt-6">
          <aside className="flex flex-col gap-4 rounded-3xl border-[1.5px] border-rouille bg-argile px-6 py-7 md:px-8">
            <h2 className="text-[22px] font-medium leading-tight md:text-[26px]">Quand consulter, et en combien de temps</h2>
            <ul className="flex max-w-[46em] list-disc flex-col gap-2 pl-5">
              <li>
                <strong>Le jour même, aux urgences ophtalmologiques</strong> : paupière entière gonflée, chaude et très
                douloureuse, avec fièvre ; œil qui ne bouge plus normalement ; baisse brutale de la vision.
              </li>
              <li>
                <strong>Sous 48 heures</strong> : chalazion qui grossit vite ou devient douloureux.
              </li>
              <li>
                <strong>En consultation programmée</strong> : pas d'amélioration après 3 à 4 semaines de soins, gêne
                visuelle, chalazions qui s'enchaînent.
              </li>
              <li>
                <strong>Chez un ophtalmologiste, en signalant la récidive</strong> : chalazion qui revient au même endroit,
                aspect inhabituel, perte des cils à cet endroit.
              </li>
            </ul>
            <div id="biopsie" className="flex max-w-[46em] scroll-mt-6 flex-col gap-2">
              <h3 className="text-[19px] font-semibold">Pourquoi une biopsie ?</h3>
              <p>
                Un chalazion qui revient toujours au même endroit doit être exploré pour écarter une tumeur.{" "}
                <Cite s="statpearls" /> La plus redoutée est le carcinome sébacé, un cancer rare des glandes de la
                paupière qui peut imiter un chalazion ou une blépharite chronique. <Cite s="medscape" /> Le risque est plus
                élevé chez les personnes âgées. <Cite s="aao2015" /> Le plus souvent, la biopsie confirme un simple
                chalazion ; elle reste le bon réflexe, parce que ce diagnostic est grave quand il est posé tard.
              </p>
            </div>
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
            <li>
              Article original de la revue de 2025 : Park JK, Vyas C, Dagi Glass LR, Chalazia: A Scoping Review to Identify
              the Evidence Behind Treatments, Ophthalmic Plastic and Reconstructive Surgery, 2025, 41(2), p. 134-142,{" "}
              <a href="https://doi.org/10.1097/IOP.0000000000002840" target="_blank" rel="noopener">
                doi:10.1097/IOP.0000000000002840
              </a>
              .
            </li>
          </ul>
        </section>

        <aside className="flex flex-col gap-2 rounded-3xl border border-trait bg-white px-6 py-7 md:px-8">
          <h2 className="text-[22px] font-medium leading-tight md:text-[24px]">Une page d'information, pas un avis médical</h2>
          <p className="max-w-[46em] text-doux">
            Cette page résume ce que disent les études. Elle ne remplace pas une consultation : en cas de doute sur une
            boule de la paupière, demandez l'avis d'un professionnel de santé. Voir aussi{" "}
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
