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
 *   « regie »   visuel du flux d'un programme d'affiliation accepté ;
 *   « marchand » visuel de la fiche produit d'un marchand ou de la marque, choisi par l'éditeur.
 * Pas d'image générée d'un emballage.
 */
export type OriginePhoto = "maison" | "marque" | "regie" | "marchand";

export type PhotoProduit = {
  alt: string;
  origine: OriginePhoto;
  /** Qui a fourni l'image, et quand : « Photo de l'éditeur, 12 octobre 2026 », « Service de presse de X, courriel du… ». */
  credit: string;
};

export const photosProduits: Record<string, PhotoProduit> = {
  "fleurance-capital-feminite": { alt: "Boîte de Capital Féminité Jour et Nuit, Fleurance Nature", origine: "marchand", credit: "Visuel de la fiche produit, Fleurance Nature, novembre 2026" },
  "circles-meno": { alt: "Pot de Circles Meno", origine: "marchand", credit: "Visuel de la fiche produit, Pharma GDD, novembre 2026" },
  "manhae-menopause": { alt: "Boîte de Manhaé Ménopause, Vitavea", origine: "marchand", credit: "Visuel de la fiche produit, Redcare Pharmacie, novembre 2026" },
  "pileje-feminabiane-meno-confort": { alt: "Boîte de Feminabiane Méno'Confort, Pileje", origine: "marchand", credit: "Visuel de la fiche produit, Pharma GDD, novembre 2026" },
  "serelys-meno": { alt: "Boîte de Sérélys Meno, 60 gélules", origine: "marchand", credit: "Visuel de la fiche produit, Pharmacie Citypharma, novembre 2026" },
  "arkopharma-phyto-soya": { alt: "Boîte de Phyto Soya Ménopause, Arkopharma", origine: "marchand", credit: "Visuel de la fiche produit, Redcare Pharmacie, novembre 2026" },
  "miye-equilibre-feminin": { alt: "Flacon de MiYé Équilibre Féminin", origine: "marchand", credit: "Visuel de la fiche produit, Easypara, novembre 2026" },
  "menophytea-bouffees-de-chaleur": { alt: "Boîte de Ménophytea Bouffées de chaleur", origine: "marchand", credit: "Visuel de la fiche produit, Redcare Pharmacie, novembre 2026" },
  "valebio-complexe-menopause": { alt: "Sachet de Valebio Complexe Ménopause", origine: "marchand", credit: "Visuel de la fiche produit, site de la marque Valebio, novembre 2026" },
  "nutri-and-co-menopause": { alt: "Pilulier de Nutri&Co Ménopause", origine: "marchand", credit: "Visuel de la fiche produit, site de la marque Nutri&Co, novembre 2026" },
  "aboca-charbon-vegetal": { alt: "Flacon d'Aboca Charbon Végétal", origine: "marchand", credit: "Visuel de la fiche produit, Redcare Pharmacie, novembre 2026" },
  "ymea-menopause-ventre-plat": { alt: "Boîte d'Ymea Ménopause Ventre Plat", origine: "marchand", credit: "Visuel de la fiche produit, Pharma GDD, novembre 2026" },
  "menophytea-silhouette-ventre-plat": { alt: "Boîte de Ménophytea Silhouette Ventre Plat", origine: "marchand", credit: "Visuel de la fiche produit, Redcare Pharmacie, novembre 2026" },
  "terravita-ventre-plat": { alt: "Pilulier de Terravita Ventre Plat", origine: "marchand", credit: "Visuel de la fiche produit, site de la marque Terravita, novembre 2026" },
  "noobiotik-probio-slim": { alt: "Pilulier de Noobiotik Probiotiques Minceur", origine: "marchand", credit: "Visuel de la fiche produit, site de la marque Noobiotik, novembre 2026" },
};
