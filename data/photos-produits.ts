/**
 * Photos des produits. Une entrée par produit photographié ; un produit sans
 * entrée affiche une vignette dessinée (la forme de la prise, pas l'emballage).
 *
 * Fichiers attendus : public/produits/<id du produit>-400.webp et -800.webp,
 * fond clair, produit entier, format carré.
 *
 * Chaque photo dit d'où elle vient. Trois origines sont admises :
 *   « maison »  photo prise par l'éditeur d'un produit qu'il a en main ;
 *   « marque »  visuel fourni par la marque, avec son accord écrit ;
 *   « regie »   visuel du flux d'un programme d'affiliation accepté.
 * Une image copiée sur une boutique sans accord n'a pas sa place ici, pas plus
 * qu'une image générée d'un emballage.
 */
export type OriginePhoto = "maison" | "marque" | "regie";

export type PhotoProduit = {
  alt: string;
  origine: OriginePhoto;
  /** Qui a fourni l'image, et quand : « Photo de l'éditeur, 12 octobre 2026 », « Service de presse de X, courriel du… ». */
  credit: string;
};

export const photosProduits: Record<string, PhotoProduit> = {};
