import type { ProduitClasse } from "./score.ts";

export type Selection = { titre: string; produit: ProduitClasse };

/**
 * Les trois sélections d'un comparatif, tirées du classement :
 * le premier, le deuxième, puis le mieux classé des suivants qui demande peu de précautions.
 */
export function selections(classes: ProduitClasse[]): Selection[] {
  const [premier, second, ...reste] = classes;
  if (!premier) return [];
  const liste: Selection[] = [{ titre: "Meilleure note", produit: premier }];
  if (second) {
    liste.push({ titre: second.note === premier.note ? "Ex æquo en tête" : "Deuxième note", produit: second });
  }
  const prudent = reste.find((p) => p.criteres.precautions === 2);
  const troisieme = prudent ?? reste[0];
  if (troisieme) {
    liste.push({ titre: prudent ? "Peu de précautions" : "Troisième note", produit: troisieme });
  }
  return liste;
}

export type Profil = { cle: string; titre: string; texte: string; produits: ProduitClasse[] };

/**
 * « Lequel choisir selon votre situation » : chaque profil applique un filtre aux données,
 * puis garde les mieux classés. Aucun produit n'est placé à la main.
 */
export function profils(
  classes: ProduitClasse[],
  pointsPreuvesDe: (p: ProduitClasse) => number,
  /** Dit si la formule contient, à dose comparable, un actif étudié sur l'humeur. */
  viseHumeur: (p: ProduitClasse) => boolean,
): Profil[] {
  const tete = (liste: ProduitClasse[], n = 3) => liste.slice(0, n);
  const parPrix = [...classes].sort((a, b) => a.parJour - b.parJour);
  const liste: Profil[] = [
    {
      cle: "preuves",
      titre: "Vous voulez d'abord des preuves",
      texte: "Les formules dont un actif atteint le niveau B, à la dose des essais.",
      produits: tete(classes.filter((p) => pointsPreuvesDe(p) === 2)),
    },
    {
      cle: "humeur",
      titre: "Votre moral vous pèse plus que les bouffées de chaleur",
      texte: "Les formules dont un actif a été étudié sur l'humeur, à la dose des essais.",
      produits: tete(classes.filter(viseHumeur)),
    },
    {
      cle: "sans-phyto",
      titre: "Vous ne voulez ni phyto-œstrogènes ni actée à grappes",
      texte:
        "Les formules qui n'en contiennent pas. Après un cancer hormono-dépendant, parlez-en d'abord à votre médecin, quel que soit le produit.",
      produits: tete(classes.filter((p) => !p.faits.phytoOestrogenes && !p.faits.actee)),
    },
    {
      cle: "antidepresseur",
      titre: "Vous prenez un antidépresseur",
      texte: "Les formules dont la fiche ne déconseille pas l'association. Demandez tout de même l'avis de votre pharmacien.",
      produits: tete(classes.filter((p) => !p.faits.antidepresseurs)),
    },
    {
      cle: "budget",
      titre: "Vous regardez d'abord le prix",
      texte: "Les trois formules les moins chères par jour.",
      produits: tete(parPrix),
    },
    {
      cle: "une-prise",
      titre: "Vous voulez une seule prise par jour",
      texte: "Les formules à une gélule, une capsule ou un comprimé par jour.",
      produits: tete(classes.filter((p) => p.unitesParJour === 1)),
    },
  ];
  return liste.filter((p) => p.produits.length > 0);
}
