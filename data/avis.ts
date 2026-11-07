/**
 * Pages d'avis : une par produit, publiée quand son texte est relu.
 * Tout ce qui est chiffré (note, rang, prix, niveaux de preuve) est calculé ailleurs
 * et passé en paramètre : ce fichier ne contient que le texte éditorial.
 * Règle : aucune phrase ici ne doit affirmer un fait absent de data/produits.ts ou data/preuves.ts.
 */
import type { ProduitClasse } from "../lib/score.ts";
import { prix } from "../lib/format.ts";

export type QuestionAvis = { question: string; paragraphes: string[] };

export type Avis = {
  /** Identifiant du produit dans data/produits.ts. */
  produit: string;
  /** Adresse de la page : /avis/<slug>/ */
  slug: string;
  publiee: boolean;
  /** Date de dernière relecture du texte, AAAA-MM-JJ. */
  majLe: string;
  /** Requête visée, pour mémoire : elle guide le titre et la description. */
  requete: string;
  titre: (p: ProduitClasse, total: number) => string;
  description: (p: ProduitClasse, total: number) => string;
  /** Le verdict, en trois à cinq phrases. Affiché en tête de page. */
  verdict: (p: ProduitClasse, total: number) => string[];
  pourQui: string[];
  aEviter: string[];
  /** Questions propres au produit. Les réponses citent les données, jamais une promesse. */
  questions: (p: ProduitClasse) => QuestionAvis[];
};

export const avis: Avis[] = [
  {
    produit: "manhae-menopause",
    slug: "manhae-menopause",
    publiee: true,
    majLe: "2026-11-02",
    requete: "manhaé ménopause avis",
    titre: (p, total) => `Manhaé ménopause : notre avis (${p.note}/10, ${p.rang}e sur ${total})`,
    description: (p) =>
      `Avis sur Manhaé Ménopause : composition analysée actif par actif face aux études, ${prix(p.parJour)} par jour, précautions, prise de poids. Ce que la formule fait bien, et ce qu'elle ne documente pas.`,
    verdict: (p, total) => [
      `Manhaé obtient ${p.note}/10 et se classe ${p.rang}e sur ${total} dans notre comparatif. Cette note vient de son prix, le plus bas par jour du comparatif (${prix(p.parJour)}), d'une étiquette qui affiche la dose de chaque actif et de précautions d'emploi réduites.`,
      "Elle ne vient pas des preuves : aucun de ses actifs n'est présent à une dose étudiée chez des femmes ménopausées. Les oméga-3 sont environ vingt fois moins dosés que dans l'essai de référence, qui n'a d'ailleurs pas montré de différence avec le placebo sur les bouffées de chaleur.",
      "Manhaé est donc une formule peu chère et simple à prendre, sans phyto-œstrogènes ni actée à grappes. Si vous cherchez un actif dont l'effet a été mesuré, d'autres formules du classement en contiennent.",
    ],
    pourQui: [
      "Vous voulez éviter les phyto-œstrogènes (soja, trèfle rouge, houblon) et l'actée à grappes",
      "Le prix compte : la boîte de 90 capsules couvre trois mois",
      "Vous préférez une seule capsule par jour",
    ],
    aEviter: [
      "Vous cherchez un actif dont l'effet sur les bouffées de chaleur a été mesuré face à un placebo",
      "Vous êtes allergique au poisson : la formule contient de l'huile de poisson",
      "Vous évitez les sulfites",
    ],
    questions: (p) => [
      {
        question: "Manhaé est-il efficace contre les bouffées de chaleur ?",
        paragraphes: [
          "Nous jugeons une formule sur ses actifs, un par un, à la dose où elle les contient.",
          "Les oméga-3 ont été testés à 1,8 g par jour pendant douze semaines chez 355 femmes : pas de différence avec le placebo sur les bouffées de chaleur. Manhaé en apporte 90 mg. Pour l'huile de bourrache, aucun essai randomisé n'a été trouvé chez des femmes ménopausées. La vitamine E donne des résultats inconstants, à des doses bien supérieures aux 12 mg de la formule. L'extrait de citrus n'a pas encore de ligne de preuve dans notre base.",
        ],
      },
      {
        question: "Manhaé contient-il des hormones ou des phyto-œstrogènes ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Manhaé ne contient pas non plus de phyto-œstrogènes (soja, trèfle rouge, houblon, lin) ni d'actée à grappes, d'après la composition publiée.",
        ],
      },
      {
        question: "Combien coûte Manhaé ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 90 capsules au dernier relevé, soit ${prix(p.parJour)} par jour à raison d'une capsule. ${p.prixNote ?? ""}`.trim(),
        ],
      },
      {
        question: "Manhaé fait-il grossir ?",
        paragraphes: [
          "Aucune étude n'a mesuré l'effet de Manhaé sur le poids, ni dans un sens ni dans l'autre. Ses actifs (oméga-3, huile de bourrache, vitamine E, extrait de citrus) n'ont pas, dans notre base de preuves, d'effet documenté sur le poids aux doses de la formule. On ne peut donc ni affirmer qu'il fait grossir, ni affirmer le contraire.",
          "La prise de poids est en revanche fréquente pendant la transition ménopausique, avec ou sans complément : dans la cohorte américaine SWAN, le gain de masse grasse double au début de la transition et se poursuit jusqu'à deux ans après les dernières règles. Une prise de poids qui commence en même temps qu'un complément peut donc avoir une autre cause. Si elle vous inquiète, parlez-en à votre médecin.",
        ],
      },
      {
        question: "Peut-on prendre Manhaé après un cancer du sein ?",
        paragraphes: [
          "La formule ne contient ni phyto-œstrogènes ni actée à grappes, les deux familles habituellement déconseillées après un cancer hormono-dépendant. Ce n'est pas pour autant une autorisation : pendant ou après un cancer, tout complément se discute avec l'équipe qui vous suit.",
        ],
      },
    ],
  },
  {
    produit: "menophytea-silhouette-ventre-plat",
    slug: "menophytea-ventre-plat",
    publiee: true,
    majLe: "2026-11-02",
    requete: "ménophytea ventre plat avis",
    titre: (p, total) => `Ménophytea Ventre Plat : notre avis (${p.note}/10, ${p.rang}e sur ${total})`,
    description: (p) =>
      `Avis sur Ménophytea Silhouette Ventre Plat : charbon, probiotique, fibres et caféine comparés aux doses des études, ${prix(p.parJour)} par jour, précautions. Ce que la formule peut faire contre le ventre gonflé.`,
    verdict: (p, total) => [
      `Ménophytea Silhouette Ventre Plat obtient ${p.note}/10 et se classe ${p.rang}e sur ${total} dans notre comparatif « ventre gonflé ». Sa note tient à une étiquette complète et à un prix de ${prix(p.parJour)} par jour.`,
      "Le seul actif de la formule qui a une allégation autorisée contre les gaz est le charbon. Ménophytea en apporte 120 mg par jour, alors que l'allégation demande 1 g avant et 1 g après le repas : environ seize fois moins. La levure Saccharomyces boulardii et les fibres n'ont pas de preuve sur les ballonnements à ces doses dans notre base.",
      "La formule contient aussi 80 mg de caféine par jour, ce qui lui coûte ses points de précautions. Si votre gêne est le ballonnement après les repas, un charbon actif à la bonne dose a de meilleurs arguments.",
    ],
    pourQui: [
      "Vous voulez une seule prise, le matin",
      "Le prix compte : moins de 0,60 € par jour",
      "Vous tolérez bien la caféine",
    ],
    aEviter: [
      "Vous cherchez un effet mesuré sur les gaz : la dose de charbon est trop faible",
      "Vous êtes sensible à la caféine, ou vous en prenez déjà beaucoup",
      "Vous êtes enceinte ou vous allaitez : la fiche le déconseille",
    ],
    questions: (p) => [
      {
        question: "Ménophytea Ventre Plat est-il efficace contre le ventre gonflé ?",
        paragraphes: [
          "Nous jugeons une formule sur ses actifs, à la dose où elle les contient. Le charbon actif est le seul ingrédient qui a une allégation autorisée contre les gaz, à condition d'en prendre 1 g avant et 1 g après le repas. Ménophytea en apporte 120 mg par jour.",
          "La levure Saccharomyces boulardii, l'inuline et la gomme d'acacia n'ont pas, à ces doses, de preuve sur les ballonnements dans notre base.",
        ],
      },
      {
        question: "Ménophytea Ventre Plat contient-il de la caféine ?",
        paragraphes: [
          "Oui : 80 mg par jour pour deux gélules, d'après la fiche. La marque conseille de le prendre avant 16 heures aux personnes sensibles à la caféine. La fiche le déconseille aux enfants et aux femmes enceintes ou qui allaitent.",
        ],
      },
      {
        question: "Combien coûte Ménophytea Ventre Plat ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 60 gélules au dernier relevé, soit ${prix(p.parJour)} par jour à raison de deux gélules. ${p.prixNote ?? ""}`.trim(),
        ],
      },
      {
        question: "Quelle différence avec un charbon actif vendu seul ?",
        paragraphes: [
          "La dose. Un charbon actif vendu seul peut apporter 1 g avant et 1 g après le repas, la dose de l'allégation autorisée. Ménophytea en apporte 120 mg par jour, mélangés à d'autres ingrédients dont de la caféine.",
        ],
      },
    ],
  },
  {
    produit: "fleurance-capital-feminite",
    slug: "capital-feminite-fleurance",
    publiee: true,
    majLe: "2026-11-02",
    requete: "capital féminité avis",
    titre: (p, total) => `Capital Féminité (Fleurance) : notre avis (${p.note}/10, ${p.rang === 1 ? "1er" : `${p.rang}e`} sur ${total})`,
    description: (p) =>
      `Avis sur Capital Féminité Jour et Nuit de Fleurance Nature : isoflavones de soja à la dose des études, ${prix(p.parJour)} par jour, précautions. Ce que l'on peut en attendre.`,
    verdict: (p, total) => [
      `Capital Féminité Jour et Nuit obtient ${p.note}/10 et se classe ${p.rang === 1 ? "premier" : `${p.rang}e`} sur ${total} dans notre comparatif. C'est la seule formule qui réunit un actif étudié à la dose des essais, une étiquette complète, la vitamine B6 et un prix de ${prix(p.parJour)} par jour.`,
      "Son actif principal, les isoflavones de soja, est dosé à 50 mg par jour, proche de la dose médiane des essais (54 mg). L'effet mesuré est modeste : environ 20 % de bouffées de chaleur en moins face au placebo dans une méta-analyse, moins d'une bouffée par jour dans une autre. La revue Cochrane ne juge pas ces preuves concluantes.",
      "La formule contient des phyto-œstrogènes (soja, houblon). Elle est déconseillée en cas d'antécédent personnel ou familial de cancer du sein : dans ce cas, regardez les formules sans phyto-œstrogènes du classement.",
    ],
    pourQui: [
      "Vos bouffées de chaleur sont votre principale gêne",
      "Vous voulez un actif étudié, à la dose des études, pour moins de 0,50 € par jour",
      "Vous n'avez pas d'antécédent personnel ou familial de cancer du sein",
    ],
    aEviter: [
      "Vous avez, ou avez eu, un cancer du sein, ou un antécédent dans votre famille",
      "Vous cherchez un effet comparable à celui d'un traitement hormonal : aucun complément ne l'apporte",
      "Votre gêne principale est le moral ou le sommeil : d'autres actifs y ont été étudiés",
    ],
    questions: (p) => [
      {
        question: "Capital Féminité est-il efficace contre les bouffées de chaleur ?",
        paragraphes: [
          "Son actif principal, les isoflavones de soja, est à une dose comparable à celle des essais. Dans une méta-analyse de 17 essais, la fréquence des bouffées de chaleur baisse de 20,6 % face au placebo ; dans une autre, d'environ 0,8 bouffée par jour.",
          "L'effet est donc modeste, et la revue Cochrane de 2013 ne juge pas ces preuves concluantes. Les autres actifs de la formule (sauge, houblon, vitamine E) ne sont pas à une dose comparable à celle des études.",
        ],
      },
      {
        question: "Capital Féminité contient-il des hormones ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Capital Féminité contient des phyto-œstrogènes : des isoflavones de soja et du houblon, des composés végétaux qui imitent faiblement les œstrogènes.",
        ],
      },
      {
        question: "Peut-on prendre Capital Féminité après un cancer du sein ?",
        paragraphes: [
          "C'est déconseillé : les compléments de phyto-œstrogènes sont déconseillés en cas d'antécédent personnel ou familial de cancer du sein. Parlez-en à l'équipe qui vous suit ; les formules sans phyto-œstrogènes ni actée à grappes sont signalées dans notre classement.",
        ],
      },
      {
        question: "Combien coûte Capital Féminité ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 60 comprimés au dernier relevé, soit ${prix(p.parJour)} par jour à raison d'un comprimé le matin et d'un le soir.`,
        ],
      },
    ],
  },
  {
    produit: "serelys-meno",
    slug: "serelys-meno",
    publiee: true,
    majLe: "2026-11-07",
    requete: "sérélys ménopause avis",
    titre: (p, total) => `Sérélys Meno : notre avis (${p.note}/10, ${p.rang === 1 ? "1er" : `${p.rang}e`} sur ${total})`,
    description: (p) =>
      `Avis sur Sérélys Meno : l'extrait de pollen des essais, à leur dose, ${prix(p.parJour)} par jour, sans phyto-œstrogènes. Ce que montrent les études contrôlées, et ce qu'elles ne confirment pas.`,
    verdict: (p, total) => [
      `Sérélys Meno obtient ${p.note}/10 et se classe ${p.rang === 1 ? "1er" : `${p.rang}e`} sur ${total} dans notre comparatif. C'est l'une des rares formules dont l'actif principal est exactement celui des essais, à la même dose : 320 mg par jour d'extrait de pollen purifié.`,
      "Les résultats sont plus fragiles que cette cohérence ne le laisse croire. L'essai contre placebo de référence, chez 64 femmes, est favorable : 65 % de répondeuses contre 38 % sous placebo. Mais la méta-analyse de 2024 montre que l'amélioration n'est plus significative quand on ne garde que les études contrôlées.",
      `La formule ne contient ni phyto-œstrogènes ni actée à grappes, et demande peu de précautions. À ${prix(p.parJour)} par jour, c'est une option à considérer si vous devez éviter les phyto-œstrogènes, en sachant que son effet reste incertain.`,
    ],
    pourQui: [
      "Vous devez ou voulez éviter les phyto-œstrogènes (soja, trèfle rouge, houblon) et l'actée à grappes",
      "Vous voulez un produit qui contient l'extrait et la dose de son essai, pas un mélange de petits dosages",
      "Vous préférez une seule gélule par jour",
    ],
    aEviter: [
      "Vous êtes allergique au pollen : demandez conseil avant",
      "Vous attendez un effet démontré de façon solide : les études contrôlées ne le confirment pas",
      "Le prix par jour est votre premier critère : d'autres formules du classement coûtent moins cher",
    ],
    questions: (p) => [
      {
        question: "Sérélys est-il efficace contre les bouffées de chaleur ?",
        paragraphes: [
          "Son extrait de pollen a été testé à 320 mg par jour pendant trois mois, dans un essai contre placebo chez 64 femmes : 65 % ont vu leurs bouffées de chaleur diminuer, contre 38 % sous placebo. Sérélys Meno apporte cette dose en une gélule.",
          "La méta-analyse de 2024 (5 études, 420 femmes) nuance ce résultat : une partie des études étaient ouvertes, sans placebo, et quand on ne garde que les études contrôlées, l'amélioration n'est plus significative. Nous classons donc cette preuve au niveau C.",
        ],
      },
      {
        question: "Sérélys contient-il des hormones ou des phyto-œstrogènes ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Sérélys Meno ne contient pas non plus de phyto-œstrogènes ni d'actée à grappes : sa formule se limite à l'extrait de pollen et à de la vitamine E, d'après la composition publiée.",
        ],
      },
      {
        question: "Peut-on prendre Sérélys après un cancer du sein ?",
        paragraphes: [
          "La formule ne contient ni phyto-œstrogènes ni actée à grappes, les deux familles habituellement déconseillées après un cancer hormono-dépendant. Ce n'est pas pour autant une autorisation : pendant ou après un cancer, tout complément se discute avec l'équipe qui vous suit.",
        ],
      },
      {
        question: "Combien coûte Sérélys Meno ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 60 gélules au dernier relevé, soit ${prix(p.parJour)} par jour à raison d'une gélule. ${p.prixNote ?? ""}`.trim(),
        ],
      },
    ],
  },
  {
    produit: "ymea-menopause-ventre-plat",
    slug: "ymea-menopause-ventre-plat",
    publiee: true,
    majLe: "2026-11-07",
    requete: "ymea ménopause ventre plat avis",
    titre: (p, total) => `Ymea Ménopause Ventre Plat : notre avis (${p.note}/10, ${p.rang === 1 ? "1er" : `${p.rang}e`} sur ${total})`,
    description: (p) =>
      `Avis sur Ymea Ménopause Ventre Plat : artichaut, sauge et maca comparés aux doses des études, ${prix(p.parJour)} par jour, précautions. Ce que la formule peut faire contre le ventre gonflé.`,
    verdict: (p, total) => [
      `Ymea Ménopause Ventre Plat obtient ${p.note}/10 et se classe ${p.rang === 1 ? "1er" : `${p.rang}e`} sur ${total} dans notre comparatif « ventre gonflé ». Sa note tient à une étiquette complète, à des précautions d'emploi réduites et à l'absence de phyto-œstrogènes.`,
      "Elle ne tient pas aux preuves sur le ventre. Le seul actif de la formule étudié sur la digestion est l'artichaut : 250 mg par jour, environ huit fois moins que les 1 920 mg de l'essai, qui portait d'ailleurs sur des troubles digestifs hors ménopause.",
      "La sauge, à 300 mg, vise les bouffées de chaleur, pas le ventre. Ymea est donc une formule ménopause généraliste vendue sous l'angle du ventre plat. Si votre gêne principale est le ballonnement après les repas, un charbon actif à la dose de l'allégation autorisée a de meilleurs arguments.",
    ],
    pourQui: [
      "Vous voulez une formule sans phyto-œstrogènes ni actée à grappes",
      "Vous cherchez une formule ménopause générale plutôt qu'un produit ciblé sur le ventre",
      "Vous voulez connaître la dose de chaque actif : elles sont toutes affichées",
    ],
    aEviter: [
      "Vous cherchez un effet mesuré sur les ballonnements : aucun actif n'est à une dose étudiée sur le ventre",
      "Vous attendez une perte de ventre ou de poids : aucun actif de la formule n'a de preuve à ce sujet dans notre base",
    ],
    questions: (p) => [
      {
        question: "Ymea Ventre Plat est-il efficace contre le ventre gonflé ?",
        paragraphes: [
          "Nous jugeons une formule sur ses actifs, à la dose où elle les contient. L'artichaut est le seul actif d'Ymea étudié sur la digestion : dans un essai de 244 personnes, 1 920 mg d'extrait de feuille par jour ont réduit les symptômes digestifs face au placebo. Ymea en apporte 250 mg.",
          "La maca, la sauge, le piment, le zinc et les vitamines B6 et D n'ont pas, dans notre base, de preuve sur les ballonnements.",
        ],
      },
      {
        question: "Ymea contient-il des hormones ou des phyto-œstrogènes ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Ymea Ménopause Ventre Plat ne contient pas de phyto-œstrogènes ni d'actée à grappes, d'après la composition publiée.",
        ],
      },
      {
        question: "Et contre les bouffées de chaleur ?",
        paragraphes: [
          "La formule contient 300 mg d'extrait de sauge. Un essai a montré un effet face au placebo chez 80 femmes, mais la méta-analyse de quatre essais (310 femmes) ne trouve pas de différence significative. Les doses varient beaucoup d'un extrait à l'autre, ce qui rend la comparaison difficile.",
        ],
      },
      {
        question: "Combien coûte Ymea Ménopause Ventre Plat ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 64 gélules au dernier relevé, soit ${prix(p.parJour)} par jour à raison de deux gélules.`,
        ],
      },
    ],
  },
];

export const avisPublies = avis.filter((a) => a.publiee);

export function avisDe(idProduit: string): Avis | undefined {
  return avisPublies.find((a) => a.produit === idProduit);
}

export const cheminAvis = (a: Pick<Avis, "slug">) => `/avis/${a.slug}/`;
