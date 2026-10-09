/**
 * Calcul de la note et du rang.
 * Règle de conformité : ce fichier ne lit ni les vendeurs ni ce qu'ils versent au site.
 * Un test automatique (tests/score.test.ts) le vérifie.
 */
import type { Points, Produit, Usage } from "../data/produits.ts";
import { preuvesDe, rangNiveau, type Preuve, type Symptome } from "../data/preuves.ts";

export type CleCritere = "transparence" | "allegation" | "preuves" | "prix" | "precautions";

/** La grille publiée. La page « Comment nous classons » lit cette même constante. */
export const grille: { cle: CleCritere; titre: string; mesure: string; bareme: string }[] = [
  {
    cle: "transparence",
    titre: "Transparence",
    mesure: "La dose de chaque actif est affichée, les extraits et les souches sont identifiés.",
    bareme: "2 points si tout est affiché, 1 si une partie l'est, 0 sinon.",
  },
  {
    cle: "allegation",
    titre: "Allégation autorisée",
    mesure:
      "La formule peut s'appuyer sur une allégation de santé autorisée dans l'Union européenne. Une seule touche à l'usage : celle de la vitamine B6 sur l'activité hormonale.",
    bareme: "2 points avec la vitamine B6 à dose suffisante, 1 pour une allégation générale (fatigue, os), 0 sinon.",
  },
  {
    cle: "preuves",
    titre: "Preuves",
    mesure:
      "Le meilleur niveau de preuve parmi les actifs présents à une dose comparable à celle des essais : au moins les trois quarts, avec le même type d'extrait.",
    bareme: "2 points pour un niveau A ou B, 1 point pour un niveau C, 0 pour D, E ou une dose trop éloignée.",
  },
  {
    cle: "prix",
    titre: "Prix par jour",
    mesure: "Le prix de la boîte divisé par le nombre de jours qu'elle couvre à la posologie conseillée.",
    bareme: "2 points jusqu'à 0,50 €, 1 point jusqu'à 0,99 €, 0 à partir de 1,00 €.",
  },
  {
    cle: "precautions",
    titre: "Précautions",
    mesure: "Caféine, iode, phyto-œstrogènes, actée à grappes, interactions avec des médicaments.",
    bareme: "2 points s'il y en a peu, 1 pour une seule famille de précautions, 0 pour plusieurs.",
  },
];

export const noteMax = grille.length * 2;

/** Les symptômes pris en compte pour le critère « preuves », selon le comparatif. */
const symptomesComptes: Record<Usage, Symptome[]> = {
  confort: ["bouffees", "humeur", "sommeil", "global"],
  ventre: [],
};

/** Prix par jour, arrondi au centime comme il est affiché. */
export function prixParJour(p: Pick<Produit, "prix" | "jours">): number {
  return Math.round((p.prix / p.jours) * 100) / 100;
}

export function pointsPrix(parJour: number): Points {
  if (parJour <= 0.5) return 2;
  if (parJour < 1) return 1;
  return 0;
}

/** La meilleure ligne de preuve parmi les actifs présents à dose comparable, ou null. */
export function meilleurePreuve(p: Pick<Produit, "actifs" | "usage">): Preuve | null {
  const lignes = p.actifs
    .filter((a) => a.comparable)
    .flatMap((a) => preuvesDe(a.id, symptomesComptes[p.usage]));
  if (lignes.length === 0) return null;
  return lignes.sort((a, b) => rangNiveau(a.niveau) - rangNiveau(b.niveau))[0];
}

export function pointsPreuves(p: Pick<Produit, "actifs" | "usage">): Points {
  const meilleure = meilleurePreuve(p);
  if (!meilleure) return 0;
  if (meilleure.niveau === "A" || meilleure.niveau === "B") return 2;
  if (meilleure.niveau === "C") return 1;
  return 0;
}

export function pointsParCritere(p: Produit): Record<CleCritere, Points> {
  return {
    transparence: p.criteres.transparence,
    allegation: p.criteres.allegation,
    preuves: pointsPreuves(p),
    prix: pointsPrix(prixParJour(p)),
    precautions: p.criteres.precautions,
  };
}

export function note(p: Produit): number {
  return Object.values(pointsParCritere(p)).reduce((s: number, v) => s + v, 0);
}

export type ProduitClasse = Produit & { rang: number; note: number; parJour: number };

/**
 * Classement d'un usage : note décroissante, puis prix par jour croissant, puis nom.
 */
export function classer(tous: Produit[], usage: Usage): ProduitClasse[] {
  return tous
    .filter((p) => p.usage === usage)
    .map((p) => ({ ...p, note: note(p), parJour: prixParJour(p) }))
    .sort((a, b) => b.note - a.note || a.parJour - b.parJour || a.nom.localeCompare(b.nom, "fr"))
    .map((p, i) => ({ ...p, rang: i + 1 }));
}

/** Âge d'un relevé de prix, en jours, à une date donnée. */
export function ageReleve(prixReleveLe: string, aujourdHui: Date): number {
  return Math.floor((aujourdHui.getTime() - new Date(prixReleveLe).getTime()) / 86_400_000);
}
