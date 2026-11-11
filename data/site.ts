/** Réglages du site. Tout ce qui change d'une mise à jour à l'autre vit ici. */
export const site = {
  nom: "Comparatif Ménopause",
  url: "https://comparatif-menopause.fr",
  description:
    "Comparatifs de compléments alimentaires pour la ménopause, classés sur la transparence, les preuves, le prix par jour et les précautions d'emploi.",
  /** Date de la dernière mise à jour éditoriale, au format AAAA-MM-JJ. */
  majLe: "2026-11-11",
  /**
   * Signature des pages : le site, pas une personne. Aucun nom de personne
   * n'apparaît sur le site (choix de l'éditeur) : le directeur de la
   * publication y est désigné par sa fonction.
   * Ne jamais mettre ici un nom, un portrait ou un diplôme inventés.
   */
  signature: "Comparatif Ménopause",
  editeur: "DIGICORPEX SASU",
  siret: "940 521 719 00010",
  /** Année de la dernière mise à jour, pour les titres. */
  annee: "2026",
};

/** Historique des mises à jour, la plus récente d'abord. Affiché en bas des comparatifs. */
export const historique: { date: string; texte: string }[] = [
  { date: "2026-11-11", texte: "Nouvelles pages qui regroupent tous nos avis et tous les actifs étudiés ; liens entre les avis des formules qui se comparent." },
  { date: "2026-11-09", texte: "Cinq nouveaux avis détaillés : Circles Meno, Feminabiane Méno'Confort, Phyto Soya Ménopause, Ménophytea Bouffées de chaleur et Valebio Complexe Ménopause." },
  { date: "2026-11-07", texte: "Nouvelle page sur la prise de poids à la ménopause ; avis détaillés sur Sérélys Meno et Ymea Ménopause Ventre Plat." },
  { date: "2026-11-02", texte: "Nouvelle page d'information sur le ventre gonflé et avis détaillé sur Ménophytea Silhouette Ventre Plat." },
  { date: "2026-11-02", texte: "Nouveau comparatif : compléments pour le ventre gonflé, six formules et quatre lignes de preuve sur les ballonnements." },
  { date: "2026-11-02", texte: "Première page d'avis détaillé (Manhaé Ménopause), reliée depuis sa fiche." },
  { date: "2026-10-09", texte: "Première publication : dix formules comparées, prix relevés, preuves vérifiées actif par actif." },
];

/**
 * Mentions légales. Une valeur à null s'affiche « à compléter » et bloque la
 * construction stricte (npm run build:prod).
 */
export const legal: Record<string, { libelle: string; valeur: string | null }> = {
  denomination: { libelle: "Éditeur", valeur: "DIGICORPEX SASU, société par actions simplifiée unipersonnelle" },
  siret: { libelle: "SIRET", valeur: "940 521 719 00010" },
  siege: { libelle: "Siège social", valeur: "226 rue Camille Godard, 33000 Bordeaux" },
  capital: { libelle: "Capital social", valeur: "500 €" },
  rcs: { libelle: "Immatriculation", valeur: "940 521 719 R.C.S. Bordeaux" },
  tva: { libelle: "TVA intracommunautaire", valeur: "FR69940521719" },
  directeur: { libelle: "Directeur de la publication", valeur: "Le président de DIGICORPEX SASU" },
  contact: { libelle: "Contact", valeur: "contact@comparatif-menopause.fr" },
  hebergeur: {
    libelle: "Hébergeur",
    valeur: "Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis, +1 650 319 8930",
  },
};

export type PageSite = {
  chemin: string;
  titre: string;
  /** Titre court, pour les menus et les pastilles. */
  court: string;
  resume: string;
  /** Pour un comparatif : la famille de produits qu'il classe. */
  usage?: "confort" | "ventre";
  /** Une page non publiée n'apparaît ni dans les menus ni dans le plan du site. */
  publiee: boolean;
};

export const pilier = "/meilleur-complement-alimentaire-menopause/";

/** Les comparatifs, dans l'ordre de publication prévu. */
export const comparatifs: PageSite[] = [
  {
    chemin: pilier,
    titre: "Meilleur complément alimentaire pour la ménopause",
    court: "Confort général",
    resume: "Les formules généralistes, celles que l'on prend pour l'ensemble des symptômes.",
    usage: "confort",
    publiee: true,
  },
  {
    chemin: "/complement-alimentaire-ventre-gonfle-menopause/",
    titre: "Compléments pour le ventre gonflé à la ménopause",
    court: "Ventre gonflé",
    resume: "Ballonnements ou ventre plat : ce que contiennent vraiment les formules vendues pour la ménopause.",
    usage: "ventre",
    publiee: true,
  },
  {
    chemin: "/complement-alimentaire-menopause-prise-de-poids/",
    titre: "Compléments et prise de poids à la ménopause",
    court: "Prise de poids",
    resume: "Ce que l'on sait de la prise de poids à la ménopause, et ce que valent les compléments qui promettent de l'éviter.",
    publiee: true,
  },
];

/** Pages de référence : du contenu de fond, cité par les comparatifs. */
export const pagesReference: PageSite[] = [
  {
    chemin: "/ventre-gonfle-menopause/",
    titre: "Ventre gonflé à la ménopause : causes, solutions, quand consulter",
    court: "Ventre gonflé : causes",
    resume: "Pourquoi le ventre gonfle, gaz ou graisse, ce qui a fait ses preuves et quand consulter.",
    publiee: true,
  },
  {
    chemin: "/preuves-complements-menopause/",
    titre: "Le tableau des preuves",
    court: "Les preuves",
    resume: "Le niveau de preuve de chaque actif, symptôme par symptôme, avec ses sources.",
    publiee: true,
  },
  {
    chemin: "/actifs/",
    titre: "Les actifs des compléments ménopause",
    court: "Les actifs",
    resume: "Chaque ingrédient, son niveau de preuve par symptôme et la dose des études.",
    publiee: true,
  },
  {
    chemin: "/avis/",
    titre: "Nos avis sur les compléments ménopause",
    court: "Les avis",
    resume: "Une page par formule : composition face aux études, note, prix par jour et précautions.",
    publiee: true,
  },
];

export const pagesInstitutionnelles: PageSite[] = [
  {
    chemin: "/comment-nous-classons/",
    titre: "Comment nous classons",
    court: "Notre méthode",
    resume: "La grille, la règle de classement et les sources.",
    publiee: true,
  },
  {
    chemin: "/politique-affiliation/",
    titre: "Politique d'affiliation",
    court: "Politique d'affiliation",
    resume: "Qui nous rémunère, et ce que cela change.",
    publiee: true,
  },
  { chemin: "/a-propos/", titre: "À propos", court: "À propos", resume: "Qui édite ce site.", publiee: true },
  {
    chemin: "/mentions-legales/",
    titre: "Mentions légales",
    court: "Mentions légales",
    resume: "Éditeur, hébergeur, données personnelles.",
    publiee: true,
  },
];
