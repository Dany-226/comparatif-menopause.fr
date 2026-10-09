/**
 * Photos d'ambiance. Les fichiers vivent dans public/photos, en deux largeurs :
 * <nom>-800.webp et <nom>-1600.webp. « largeur » est la largeur réelle du grand fichier.
 */
export type PhotoSite = { largeur: number; hauteur: number; alt: string };

export const photos = {
  "01-accueil-horizon": {
    largeur: 1600,
    hauteur: 900,
    alt: "Femme aux cheveux gris qui regarde l'horizon, devant un paysage de collines",
  },
  "02-pilier-yeux-fermes": {
    largeur: 1600,
    hauteur: 900,
    alt: "Femme aux cheveux gris, les yeux fermés, devant un paysage de collines",
  },
  "03-ventre-gonfle-canape": {
    largeur: 1070,
    hauteur: 941,
    alt: "Femme assise sur un canapé clair, une tasse dans les mains",
  },
  "04-prise-de-poids-marche": {
    largeur: 1600,
    hauteur: 900,
    alt: "Femme qui marche sur un sentier en forêt",
  },
  "05-perimenopause-fenetre": {
    largeur: 1600,
    hauteur: 900,
    alt: "Femme debout près d'une fenêtre, dans une lumière douce",
  },
  "06-causes-cuisine": {
    largeur: 1600,
    hauteur: 900,
    alt: "Femme qui prépare des légumes dans une cuisine claire",
  },
  "07-perimenopause-ventre-jardin": {
    largeur: 1536,
    hauteur: 1024,
    alt: "Femme dans un jardin, en fin de journée",
  },
  "08-traitement-hormonal-conversation": {
    largeur: 1600,
    hauteur: 900,
    alt: "Deux femmes en conversation sur un banc",
  },
  "09-diarrhee-gaz-verre": {
    largeur: 1536,
    hauteur: 1024,
    alt: "Verre d'eau posé sur une table en bois",
  },
  "10-methode-carnet": {
    largeur: 1421,
    hauteur: 1024,
    alt: "Mains qui prennent des notes au crayon dans un carnet, sur une table en bois",
  },
} satisfies Record<string, PhotoSite>;

export type NomPhoto = keyof typeof photos;
