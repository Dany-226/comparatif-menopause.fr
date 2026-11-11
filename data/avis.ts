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

/** Rang abrégé (« 1er », « 4e ») pour les titres, et rang en toutes lettres pour le premier. */
const rangCourt = (p: ProduitClasse) => (p.rang === 1 ? "1er" : `${p.rang}e`);
const rangLong = (p: ProduitClasse) => (p.rang === 1 ? "premier" : `${p.rang}e`);

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
      "La formule contient aussi 80 mg de caféine par jour, ce qui lui coûte ses points de précautions. Si votre gêne est le ballonnement après les repas, un [charbon actif](/actifs/charbon-actif/) à la bonne dose a de meilleurs arguments.",
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
        question: "Quelle différence avec Ménophytea Bouffées de chaleur ?",
        paragraphes: [
          "Ce sont deux produits différents de la même marque. Silhouette Ventre Plat vise le ventre avec du charbon, des fibres, un probiotique et de la caféine. [Ménophytea Bouffées de chaleur](/avis/menophytea-bouffees-de-chaleur/) vise les bouffées de chaleur avec du lin, du houblon et du kudzu, trois sources de phyto-œstrogènes.",
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
          "C'est déconseillé : les compléments de phyto-œstrogènes sont déconseillés en cas d'antécédent personnel ou familial de cancer du sein. Parlez-en à l'équipe qui vous suit ; les formules sans phyto-œstrogènes ni actée à grappes, comme [Sérélys Meno](/avis/serelys-meno/) ou [Manhaé](/avis/manhae-menopause/), sont signalées dans notre classement.",
        ],
      },
      {
        question: "Capital Féminité ou Phyto Soya ?",
        paragraphes: [
          "Les deux formules reposent sur le même actif, à une dose comparable à celle des essais : 50 mg d'isoflavones pour Capital Féminité, 44 mg pour [Phyto Soya Ménopause d'Arkopharma](/avis/phyto-soya-menopause/). Capital Féminité contient en plus de la vitamine B6 et coûte moins cher par jour au dernier relevé, ce qui le place devant dans notre classement. Phyto Soya a l'avantage d'une boîte de trois mois. Les contre-indications liées aux phyto-œstrogènes sont les mêmes.",
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
        question: "Sérélys ou Valebio ?",
        paragraphes: [
          "Les deux formules reposent sur un extrait de pollen et ne contiennent ni phyto-œstrogènes ni actée à grappes. Sérélys Meno contient l'extrait des essais, à leur dose de 320 mg ; [Valebio Complexe Ménopause](/avis/valebio-menopause/) un autre extrait, à 300 mg, avec de la bêta-alanine et du tryptophane. Sérélys est moins cher par jour au dernier relevé, et la fiche de Valebio le déconseille sous antidépresseurs ou triptans.",
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
      "La sauge, à 300 mg, vise les bouffées de chaleur, pas le ventre. Ymea est donc une formule ménopause généraliste vendue sous l'angle du ventre plat. Si votre gêne principale est le ballonnement après les repas, un [charbon actif](/actifs/charbon-actif/) à la dose de l'allégation autorisée a de meilleurs arguments.",
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
  {
    produit: "pileje-feminabiane-meno-confort",
    slug: "feminabiane-meno-confort",
    publiee: true,
    majLe: "2026-11-09",
    requete: "feminabiane méno'confort avis",
    titre: (p, total) => `Feminabiane Méno'Confort : notre avis (${p.note}/10, ${rangCourt(p)} sur ${total})`,
    description: (p) =>
      `Avis sur Pileje Feminabiane Méno'Confort : actée à grappes à la dose des essais, rhodiole, ${prix(p.parJour)} par jour. Ce que montrent les études, et la mise en garde sur le foie.`,
    verdict: (p, total) => [
      `Feminabiane Méno'Confort obtient ${p.note}/10 et se classe ${rangLong(p)} sur ${total} dans notre comparatif. Sa note tient à une étiquette complète, à la vitamine B6 et à un prix de ${prix(p.parJour)} par jour, l'un des plus bas du classement.`,
      "Son actif principal, l'actée à grappes, est dosé à 40 mg par jour : la dose médiane des essais. Mais ces essais se contredisent. La revue Cochrane (16 essais, 2 027 femmes) ne trouve pas de différence avec le placebo sur les bouffées de chaleur ; une méta-analyse de 2023 trouve un effet faible. La rhodiole, à 200 mg, n'a pas de ligne de preuve dans notre base.",
      "La formule perd ses points de précautions : l'Agence européenne des médicaments signale des atteintes du foie avec l'actée à grappes, et la fiche la déconseille en cas de maladie du foie, de cancer hormono-dépendant ou de trouble bipolaire. C'est une formule peu chère à l'effet incertain, à ne pas prendre plus de six mois sans avis médical.",
    ],
    pourQui: [
      "Vous voulez éviter les phyto-œstrogènes (soja, trèfle rouge, houblon)",
      "Le prix compte : moins de 0,50 € par jour à un comprimé",
      "Vous préférez un seul comprimé par jour",
    ],
    aEviter: [
      "Vous avez une maladie du foie, ou vous prenez des médicaments qui le sollicitent",
      "Vous avez, ou avez eu, un cancer hormono-dépendant",
      "Vous avez un trouble bipolaire : la fiche le déconseille",
      "Vous attendez un effet démontré : les essais sur l'actée à grappes se contredisent",
    ],
    questions: (p) => [
      {
        question: "Feminabiane Méno'Confort est-il efficace contre les bouffées de chaleur ?",
        paragraphes: [
          "Nous jugeons une formule sur ses actifs, à la dose où elle les contient. L'actée à grappes est à 40 mg par jour, la dose médiane des essais. Dans la revue Cochrane (16 essais, 2 027 femmes), elle ne fait pas mieux que le placebo ; dans une méta-analyse de 2023 (22 essais, 2 310 femmes), l'effet est faible. Nous classons cette preuve au niveau C.",
          "La rhodiole n'a pas de ligne de preuve dans notre base. Les vitamines D3, B6, B9 et B12 sont aux apports de référence, bien en dessous de toute dose étudiée sur les symptômes de la ménopause.",
        ],
      },
      {
        question: "L'actée à grappes est-elle dangereuse pour le foie ?",
        paragraphes: [
          "Des atteintes du foie ont été signalées chez des personnes qui prenaient de l'actée à grappes. L'Agence européenne des médicaments demande de ne pas la prendre plus de six mois sans avis médical. Si vous avez une maladie du foie, la fiche du produit la déconseille.",
        ],
      },
      {
        question: "Feminabiane Méno'Confort contient-il des hormones ou des phyto-œstrogènes ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Feminabiane Méno'Confort ne contient pas de phyto-œstrogènes (soja, trèfle rouge, houblon, lin), d'après la composition publiée. Il contient en revanche de l'actée à grappes, déconseillée après un cancer du sein sans avis médical. [Sérélys Meno](/avis/serelys-meno/) et [Manhaé](/avis/manhae-menopause/) ne contiennent ni l'un ni l'autre.",
        ],
      },
      {
        question: "Combien coûte Feminabiane Méno'Confort ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 30 comprimés au dernier relevé, soit ${prix(p.parJour)} par jour à raison d'un comprimé. ${p.prixNote ?? ""}`.trim(),
        ],
      },
    ],
  },
  {
    produit: "arkopharma-phyto-soya",
    slug: "phyto-soya-menopause",
    publiee: true,
    majLe: "2026-11-09",
    requete: "phyto soya ménopause avis",
    titre: (p, total) => `Phyto Soya Ménopause (Arkopharma) : notre avis (${p.note}/10, ${rangCourt(p)} sur ${total})`,
    description: (p) =>
      `Avis sur Arkopharma Phyto Soya Ménopause : 44 mg d'isoflavones de soja comparés aux essais, ${prix(p.parJour)} par jour, contre-indications. Ce que l'on peut en attendre.`,
    verdict: (p, total) => [
      `Phyto Soya Ménopause obtient ${p.note}/10 et se classe ${rangLong(p)} sur ${total} dans notre comparatif. Son actif principal est l'un des mieux étudiés : 44 mg d'isoflavones de soja par jour, une dose comparable à celle des essais (54 mg en médiane), et une teneur affichée en aglycones, ce que peu de fiches précisent.`,
      "L'effet mesuré de ces isoflavones reste modeste : environ 20 % de bouffées de chaleur en moins face au placebo dans une méta-analyse de 17 essais, moins d'une bouffée par jour dans une autre. La revue Cochrane ne juge pas ces preuves concluantes. La sauge et la vitamine E de la formule sont en dessous des doses des essais.",
      "Ce qui lui coûte des points, ce sont les précautions : déconseillé en cas d'antécédent de cancer du sein et sous anticoagulants, et susceptible de gêner l'absorption des hormones thyroïdiennes. À actif comparable, [Capital Féminité de Fleurance Nature](/avis/capital-feminite-fleurance/) apporte un peu plus d'isoflavones, de la vitamine B6, et coûte moins cher par jour.",
    ],
    pourQui: [
      "Vos bouffées de chaleur sont votre principale gêne",
      "Vous voulez des isoflavones de soja à la dose des essais, avec une teneur affichée en aglycones",
      "Vous préférez une boîte de trois mois",
    ],
    aEviter: [
      "Vous avez, ou avez eu, un cancer du sein, ou un antécédent dans votre famille",
      "Vous prenez un anticoagulant",
      "Vous prenez des hormones thyroïdiennes : parlez-en d'abord à votre médecin",
      "Vous cherchez le prix le plus bas pour cet actif : d'autres formules du classement coûtent moins cher par jour",
    ],
    questions: (p) => [
      {
        question: "Phyto Soya est-il efficace contre les bouffées de chaleur ?",
        paragraphes: [
          "Son actif principal, les isoflavones de soja, est à une dose comparable à celle des essais : 44 mg par jour, contre 54 mg en médiane. Dans une méta-analyse de 17 essais, la fréquence des bouffées de chaleur baisse de 20,6 % face au placebo ; dans une autre, d'environ 0,8 bouffée par jour. Nous classons cette preuve au niveau B : un signal positif, à confirmer.",
          "La revue Cochrane de 2013 ne juge pas ces preuves concluantes. La sauge (100 mg) et la vitamine E (12 mg) de la formule sont en dessous des doses étudiées.",
        ],
      },
      {
        question: "Phyto Soya contient-il des hormones ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Phyto Soya contient des phyto-œstrogènes : des isoflavones de soja, des composés végétaux qui imitent faiblement les œstrogènes.",
        ],
      },
      {
        question: "Peut-on prendre Phyto Soya après un cancer du sein ?",
        paragraphes: [
          "C'est déconseillé : l'Afssa en 2005, puis les recommandations françaises de 2021, déconseillent les compléments de phyto-œstrogènes en cas d'antécédent personnel ou familial de cancer du sein. Parlez-en à l'équipe qui vous suit ; les formules sans phyto-œstrogènes ni actée à grappes, comme [Sérélys Meno](/avis/serelys-meno/) ou [Manhaé](/avis/manhae-menopause/), sont signalées dans notre classement.",
        ],
      },
      {
        question: "Phyto Soya ou Capital Féminité ?",
        paragraphes: [
          "Les deux formules reposent sur le même actif, à une dose comparable à celle des essais : 44 mg d'isoflavones pour Phyto Soya, 50 mg pour Capital Féminité. Capital Féminité contient en plus de la vitamine B6 et coûte moins cher par jour au dernier relevé, ce qui le place devant dans notre classement. Phyto Soya a l'avantage d'une boîte de trois mois. Les contre-indications liées aux phyto-œstrogènes sont les mêmes.",
        ],
      },
      {
        question: "Combien coûte Phyto Soya Ménopause ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 180 gélules au dernier relevé, soit ${prix(p.parJour)} par jour à raison de deux gélules. La boîte couvre trois mois.`,
        ],
      },
    ],
  },
  {
    produit: "menophytea-bouffees-de-chaleur",
    slug: "menophytea-bouffees-de-chaleur",
    publiee: true,
    majLe: "2026-11-09",
    requete: "ménophytea bouffées de chaleur avis",
    titre: (p, total) => `Ménophytea Bouffées de chaleur : notre avis (${p.note}/10, ${rangCourt(p)} sur ${total})`,
    description: (p) =>
      `Avis sur Ménophytea Bouffées de chaleur : lin, houblon et kudzu face aux études, dose de houblon non affichée, ${prix(p.parJour)} par jour. Ce que la formule documente, et ce qu'elle ne dit pas.`,
    verdict: (p, total) => [
      `Ménophytea Bouffées de chaleur obtient ${p.note}/10 et se classe ${rangLong(p)} sur ${total} dans notre comparatif. Elle gagne des points avec la vitamine B6 et un prix de ${prix(p.parJour)} par jour.`,
      "Elle en perd sur la transparence : la dose de houblon n'est pas affichée sur la fiche, ni les teneurs en lignanes et en isoflavones des extraits de lin et de kudzu. Or c'est la teneur en principe actif qui permet de comparer une formule aux essais. Le lin et le kudzu n'ont pas de ligne de preuve dans notre base ; le houblon a des résultats inconstants.",
      "La formule contient trois sources de phyto-œstrogènes et demande quatre gélules par jour. Si vous cherchez un actif dont la dose est connue et comparable à celle des essais, d'autres formules du classement en contiennent.",
    ],
    pourQui: [
      "Vous voulez une formule sans soja ni actée à grappes",
      "Le prix compte : moins de 0,70 € par jour",
    ],
    aEviter: [
      "Vous avez, ou avez eu, un cancer du sein, ou un antécédent dans votre famille : la formule contient trois sources de phyto-œstrogènes",
      "Vous voulez connaître la dose de chaque actif : celle du houblon n'est pas affichée",
      "Quatre gélules par jour vous paraissent trop",
      "Vous cherchez un actif dont l'effet a été mesuré à la dose de la formule",
    ],
    questions: (p) => [
      {
        question: "Ménophytea Bouffées de chaleur est-il efficace ?",
        paragraphes: [
          "Nous jugeons une formule sur ses actifs, à la dose où elle les contient. Le houblon a été étudié sous forme d'extrait apportant 100 à 250 µg de 8-prénylnaringénine par jour : dans le principal essai (67 femmes), l'effet observé à six semaines ne se retrouve pas à douze. La fiche de Ménophytea n'affiche ni la dose de houblon ni sa teneur en principe actif : on ne peut pas la comparer aux essais.",
          "L'extrait de graines de lin (210 mg) et l'extrait de kudzu (50 mg) n'ont pas de ligne de preuve dans notre base. L'inuline de chicorée est une fibre, sans effet étudié sur les bouffées de chaleur.",
        ],
      },
      {
        question: "Ménophytea Bouffées de chaleur contient-il des hormones ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. La formule contient en revanche trois sources de phyto-œstrogènes : le lin, le houblon et le kudzu.",
        ],
      },
      {
        question: "Peut-on le prendre après un cancer du sein ?",
        paragraphes: [
          "C'est déconseillé : les compléments de phyto-œstrogènes sont déconseillés en cas d'antécédent personnel ou familial de cancer du sein. Parlez-en à l'équipe qui vous suit ; les formules sans phyto-œstrogènes ni actée à grappes, comme [Sérélys Meno](/avis/serelys-meno/) ou [Manhaé](/avis/manhae-menopause/), sont signalées dans notre classement.",
        ],
      },
      {
        question: "Quelle différence avec Ménophytea Silhouette Ventre Plat ?",
        paragraphes: [
          "Ce sont deux produits différents de la même marque. Ménophytea Bouffées de chaleur vise les bouffées de chaleur avec du lin, du houblon et du kudzu. Silhouette Ventre Plat vise le ventre avec du charbon, des fibres, un probiotique et de la caféine ; nous l'analysons dans [notre avis sur Ménophytea Silhouette Ventre Plat](/avis/menophytea-ventre-plat/).",
        ],
      },
      {
        question: "Combien coûte Ménophytea Bouffées de chaleur ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 120 gélules au dernier relevé, soit ${prix(p.parJour)} par jour à raison de deux gélules le matin et deux le soir.`,
        ],
      },
    ],
  },
  {
    produit: "valebio-complexe-menopause",
    slug: "valebio-menopause",
    publiee: true,
    majLe: "2026-11-09",
    requete: "valebio ménopause avis",
    titre: (p, total) => `Valebio Complexe Ménopause : notre avis (${p.note}/10, ${rangCourt(p)} sur ${total})`,
    description: (p) =>
      `Avis sur Valebio Complexe Ménopause : extrait de pollen, bêta-alanine et tryptophane face aux études, ${prix(p.parJour)} par jour, interactions. La différence avec l'extrait des essais.`,
    verdict: (p, total) => [
      `Valebio Complexe Ménopause obtient ${p.note}/10 et se classe ${rangLong(p)} sur ${total} dans notre comparatif. Sa note tient à une étiquette qui affiche la dose de chaque actif ; elle n'a aucune allégation de santé autorisée.`,
      "Son actif principal est un extrait de pollen, mais pas celui des essais cliniques : les études sur le pollen et les bouffées de chaleur portent sur un extrait précis, à 320 mg par jour. La bêta-alanine ne fait pas mieux qu'un placebo selon la Haute Autorité de santé, qui l'a évaluée comme médicament à une dose double. Le tryptophane, à 20 mg, n'a pas d'essai chez des femmes ménopausées.",
      "La fiche la déconseille sous antidépresseurs ou triptans et en cas d'épilepsie. Si l'extrait de pollen vous intéresse, [Sérélys Meno](/avis/serelys-meno/) contient celui des essais, à leur dose, et coûte moins cher par jour au dernier relevé.",
    ],
    pourQui: [
      "Vous voulez une formule sans phyto-œstrogènes ni actée à grappes",
      "Vous préférez une seule gélule par jour",
    ],
    aEviter: [
      "Vous prenez un antidépresseur ou un triptan, ou vous êtes épileptique : la fiche le déconseille",
      "Vous êtes allergique au pollen : demandez conseil avant",
      "Vous cherchez l'extrait de pollen des études : ce n'est pas celui-ci",
    ],
    questions: (p) => [
      {
        question: "Valebio Complexe Ménopause est-il efficace contre les bouffées de chaleur ?",
        paragraphes: [
          "Nous jugeons une formule sur ses actifs, à la dose où elle les contient. Les essais sur le pollen portent sur un extrait de pollen purifié précis, à 320 mg par jour ; même pour cet extrait, la méta-analyse de 2024 ne trouve plus d'amélioration significative quand on ne garde que les études contrôlées. Valebio contient 300 mg d'un autre extrait de pollen : les résultats de ces essais ne s'y appliquent pas.",
          "La bêta-alanine a été évaluée par la Haute Autorité de santé comme médicament, à 400 mg par comprimé : son efficacité ne se distingue pas de celle d'un placebo. Valebio en apporte 200 mg. Le tryptophane n'a pas d'essai randomisé chez des femmes ménopausées.",
        ],
      },
      {
        question: "Valebio ou Sérélys ?",
        paragraphes: [
          "Les deux formules reposent sur un extrait de pollen et ne contiennent ni phyto-œstrogènes ni actée à grappes. Sérélys Meno contient l'extrait des essais, à leur dose de 320 mg ; Valebio un autre extrait, à 300 mg, avec de la bêta-alanine et du tryptophane. Sérélys est aussi moins cher par jour au dernier relevé, et sa fiche ne mentionne pas d'interaction avec les antidépresseurs.",
        ],
      },
      {
        question: "Valebio contient-il des hormones ou des phyto-œstrogènes ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Valebio Complexe Ménopause ne contient pas non plus de phyto-œstrogènes ni d'actée à grappes, d'après la composition publiée.",
        ],
      },
      {
        question: "Combien coûte Valebio Complexe Ménopause ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 30 gélules au dernier relevé, soit ${prix(p.parJour)} par jour à raison d'une gélule. Le site de la marque l'affiche à un prix plus élevé.`,
        ],
      },
    ],
  },
  {
    produit: "circles-meno",
    slug: "circles-meno",
    publiee: true,
    majLe: "2026-11-09",
    requete: "circles meno avis",
    titre: (p, total) => `Circles Meno : notre avis (${p.note}/10, ${rangCourt(p)} sur ${total})`,
    description: (p) =>
      `Avis sur Circles Meno : safran à la dose des essais sur l'humeur, magnésium, tryptophane, vitamine D, ${prix(p.parJour)} par jour. Ce que la formule fait bien, et ses précautions.`,
    verdict: (p, total) => [
      `Circles Meno obtient ${p.note}/10 et se classe ${rangLong(p)} sur ${total} dans notre comparatif. Son actif principal vise l'humeur plutôt que les bouffées de chaleur : 30 mg de safran par jour, la dose des essais.`,
      "Dans deux essais (86 et 60 femmes), le safran a réduit les symptômes psychologiques face au placebo. Sur les bouffées de chaleur, les deux mêmes essais se contredisent. Le magnésium, le tryptophane et la vitamine B6 ne sont pas à des doses étudiées sur les symptômes de la ménopause.",
      "La formule ne contient ni phyto-œstrogènes ni actée à grappes, mais elle est déconseillée sous antidépresseurs, pendant la grossesse et l'allaitement, et sa vitamine D3 est dosée à dix fois l'apport de référence. Si votre gêne principale est le moral ou l'irritabilité, c'est la formule du classement qui a les meilleures preuves : le [safran](/actifs/safran/) est le seul actif classé au niveau B sur l'humeur dans notre base.",
    ],
    pourQui: [
      "Votre gêne principale est le moral, l'irritabilité ou l'anxiété",
      "Vous voulez éviter les phyto-œstrogènes (soja, trèfle rouge, houblon) et l'actée à grappes",
      "Vous voulez connaître la dose de chaque actif : elles sont toutes affichées",
    ],
    aEviter: [
      "Vous prenez un antidépresseur : la fiche le déconseille",
      "Vos bouffées de chaleur sont votre principale gêne : le safran n'a pas de preuve solide à ce sujet",
      "Vous prenez déjà de la vitamine D : la formule en apporte 2 000 UI par jour",
    ],
    questions: (p) => [
      {
        question: "Circles Meno est-il efficace ?",
        paragraphes: [
          "Nous jugeons une formule sur ses actifs, à la dose où elle les contient. Le safran est à 30 mg par jour, la dose des essais. Sur l'humeur, deux essais chez des femmes en péri- ou post-ménopause (86 et 60 femmes, 6 à 12 semaines) montrent une baisse des symptômes psychologiques face au placebo : nous classons cette preuve au niveau B.",
          "Sur les bouffées de chaleur, les deux essais se contredisent : gêne réduite dans l'un, aucune amélioration dans l'autre (niveau C). Le magnésium n'a pas fait mieux que le placebo sur les bouffées de chaleur dans un essai chez 289 femmes suivies après un cancer du sein, à des doses huit à douze fois plus élevées. Le tryptophane n'a pas d'essai randomisé chez des femmes ménopausées.",
        ],
      },
      {
        question: "Pourquoi Circles Meno est-il déconseillé sous antidépresseurs ?",
        paragraphes: [
          "C'est la fiche du produit qui le déconseille sous antidépresseurs, comme pendant la grossesse et l'allaitement. Si vous suivez un traitement, parlez-en à votre médecin ou à votre pharmacien avant de commencer.",
        ],
      },
      {
        question: "Circles Meno contient-il des hormones ou des phyto-œstrogènes ?",
        paragraphes: [
          "Aucun complément alimentaire ne contient d'hormones. Circles Meno ne contient pas non plus de phyto-œstrogènes ni d'actée à grappes, d'après la composition publiée.",
        ],
      },
      {
        question: "La vitamine D de Circles Meno est-elle trop dosée ?",
        paragraphes: [
          "La formule apporte 50 µg de vitamine D3 par jour, soit 2 000 UI : dix fois l'apport de référence. Le point à surveiller est le cumul : si vous prenez déjà de la vitamine D, prescrite ou dans un autre complément, faites le compte avec votre médecin.",
        ],
      },
      {
        question: "Combien coûte Circles Meno ?",
        paragraphes: [
          `${prix(p.prix)} la boîte de 60 gélules au dernier relevé, soit ${prix(p.parJour)} par jour à raison de deux gélules. Le site de la marque l'affiche à un prix plus élevé.`,
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
