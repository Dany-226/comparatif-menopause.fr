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
      `Avis sur Manhaé Ménopause : composition analysée actif par actif face aux études, ${prix(p.parJour)} par jour, précautions. Ce que la formule fait bien, et ce qu'elle ne documente pas.`,
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
];

export const avisPublies = avis.filter((a) => a.publiee);

export function avisDe(idProduit: string): Avis | undefined {
  return avisPublies.find((a) => a.produit === idProduit);
}

export const cheminAvis = (a: Pick<Avis, "slug">) => `/avis/${a.slug}/`;
