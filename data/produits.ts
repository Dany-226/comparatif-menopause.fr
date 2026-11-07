/**
 * Tableau maître des produits. Une seule source pour toutes les pages.
 * La note et le rang ne sont jamais saisis ici : ils sont calculés dans lib/score.ts.
 */
export type Usage = "confort" | "ventre";
export type Points = 0 | 1 | 2;

export type Marchand = {
  nom: string;
  /** Adresse de la fiche produit. */
  url?: string;
  /** Prix de la boîte relevé chez ce marchand, en euros. */
  prix: number;
  /** Régie ou « aucun ». Sert à la page de politique d'affiliation, jamais au classement. */
  programme: string;
  /** Taux public relevé, en clair. Jamais lu par le calcul du rang. */
  commission: string;
  /** Vrai seulement quand le lien posé est un lien d'affiliation actif. */
  remunere: boolean;
  codePromo?: string;
};

export type ActifProduit = {
  /** Identifiant d'un actif de data/preuves.ts. */
  id: string;
  /** Dose par jour, telle qu'elle est affichée sur la fiche. */
  dose: string;
  /** Vrai si la dose atteint au moins les trois quarts de celle des essais, avec le même type d'extrait. */
  comparable: boolean;
  /** Pourquoi la dose n'est pas comparable, ou toute précision utile. */
  remarque?: string;
};

export type Produit = {
  id: string;
  nom: string;
  marque: string;
  usage: Usage;
  format: string;
  posologie: string;
  /** Nombre de gélules ou de comprimés par jour. */
  unitesParJour: number;
  /** Durée d'une boîte, en jours. */
  jours: number;
  /** Prix de la boîte en euros, chez le premier marchand de la liste. */
  prix: number;
  prixReleveLe: string;
  prixNote?: string;
  composition: string;
  criteres: {
    /** 2 = dose de chaque actif affichée ; 1 = une partie ; 0 = sinon. */
    transparence: Points;
    /** 2 = vitamine B6 (activité hormonale) ; 1 = allégation autorisée générale ; 0 = aucune. */
    allegation: Points;
    /** 2 = peu de précautions ; 1 = une famille de précautions ; 0 = plusieurs. */
    precautions: Points;
  };
  actifs: ActifProduit[];
  faits: {
    phytoOestrogenes: boolean;
    actee: boolean;
    /** Déconseillé sous antidépresseurs, d'après la fiche. */
    antidepresseurs: boolean;
  };
  precautionsTexte: string;
  resume: string;
  pour: string[];
  contre: string[];
  /** Le premier marchand est celui du bouton : le moins cher relevé. */
  marchands: Marchand[];
  sources: { libelle: string; url?: string }[];
  /** Points encore à vérifier. Une liste non vide bloque la construction stricte. */
  reserves: string[];
};

const releve = "2026-10-09";
const releve2 = "2026-11-02";
const fiche = (marchand: string, url?: string) => ({ libelle: `Fiche produit, ${marchand}, consultée le 9 octobre 2026`, url });
const fiche2 = (marchand: string, url?: string) => ({ libelle: `Fiche produit, ${marchand}, consultée le 2 novembre 2026`, url });
const redcare = { programme: "Awin", commission: "12 % pour un nouveau client, 3,5 % pour un client existant", remunere: false };
const sansProgramme = { programme: "aucun", commission: "aucune", remunere: false };

export const produits: Produit[] = [
  {
    id: "fleurance-capital-feminite",
    nom: "Capital Féminité Jour et Nuit",
    marque: "Fleurance Nature",
    usage: "confort",
    format: "60 comprimés",
    posologie: "Un comprimé le matin, un le soir",
    unitesParJour: 2,
    jours: 30,
    prix: 14.4,
    prixReleveLe: releve,
    composition:
      "Isoflavones de soja 50 mg (en aglycones), sauge 100 mg, houblon 100 mg, lavande 100 mg, vitamine E 24 mg, vitamine C 80 mg, vitamine B6 1,4 mg, vitamine D3 5 µg, calcium 120 mg, magnésium 56 mg, sélénium 50 µg.",
    criteres: { transparence: 2, allegation: 2, precautions: 1 },
    actifs: [
      { id: "soja", dose: "50 mg d'isoflavones", comparable: true },
      { id: "sauge", dose: "100 mg", comparable: false, remarque: "en dessous des doses des essais" },
      { id: "houblon", dose: "100 mg", comparable: false, remarque: "teneur en principe actif non affichée" },
      { id: "vitamine-e", dose: "24 mg", comparable: false, remarque: "très en dessous des doses des essais" },
      { id: "magnesium", dose: "56 mg", comparable: false },
      { id: "vitamine-d", dose: "5 µg", comparable: false },
      { id: "b6", dose: "1,4 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: true, actee: false, antidepresseurs: false },
    precautionsTexte: "Phyto-œstrogènes (soja, houblon). Déconseillé en cas d'antécédent personnel ou familial de cancer du sein.",
    resume: "Des isoflavones de soja à la dose des essais, pour moins de 0,50 € par jour. Déconseillé en cas d'antécédent de cancer du sein.",
    pour: [
      "Isoflavones de soja à une dose comparable à celle des essais",
      "Moins de 0,50 € par jour",
      "Dose de chaque actif affichée",
    ],
    contre: [
      "Phyto-œstrogènes : déconseillé en cas d'antécédent personnel ou familial de cancer du sein",
      "Sauge en dessous des doses étudiées",
    ],
    marchands: [
      {
        nom: "Fleurance Nature",
        url: "https://www.fleurancenature.fr/p/capital-feminite-jour-et-nuit-59289.html",
        prix: 14.4,
        programme: "TimeOne",
        commission: "non vérifiée",
        remunere: false,
      },
    ],
    sources: [fiche("Fleurance Nature", "https://www.fleurancenature.fr/p/capital-feminite-jour-et-nuit-59289.html")],
    reserves: [],
  },
  {
    id: "circles-meno",
    nom: "Circles Meno",
    marque: "Circles",
    usage: "confort",
    format: "60 gélules",
    posologie: "Deux gélules par jour",
    unitesParJour: 2,
    jours: 30,
    prix: 28.49,
    prixReleveLe: releve,
    composition:
      "Magnésium 100 mg, tryptophane 300 mg, extrait de safran 30 mg, vitamines B5 6 mg, B6 1,4 mg et B9 200 µg, vitamine D3 50 µg.",
    criteres: { transparence: 2, allegation: 2, precautions: 1 },
    actifs: [
      { id: "safran", dose: "30 mg", comparable: true },
      { id: "magnesium", dose: "100 mg", comparable: false, remarque: "forme et dose différentes de celles de l'essai" },
      { id: "tryptophane", dose: "300 mg", comparable: false },
      { id: "vitamine-d", dose: "50 µg (2 000 UI)", comparable: true },
      { id: "b6", dose: "1,4 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: true },
    precautionsTexte: "Déconseillé sous antidépresseurs. Vitamine D3 fortement dosée.",
    resume: "Du safran à la dose des essais sur l'humeur, sans phyto-œstrogènes. Déconseillé sous antidépresseurs.",
    pour: ["Safran à la dose des essais sur l'humeur", "Sans phyto-œstrogènes", "Dose de chaque actif affichée"],
    contre: [
      "Déconseillé sous antidépresseurs, pendant la grossesse et l'allaitement",
      "Vitamine D3 à dix fois l'apport de référence",
      "Nom de l'extrait de safran non indiqué",
    ],
    marchands: [
      { nom: "Pharma GDD", url: "https://www.pharma-gdd.com/fr/circles-meno-gelules", prix: 28.49, ...sansProgramme },
      {
        nom: "Site de la marque",
        url: "https://wearecircles.com/products/meno",
        prix: 35,
        programme: "Affilae",
        commission: "5 %",
        remunere: false,
      },
    ],
    sources: [
      fiche("Pharma GDD", "https://www.pharma-gdd.com/fr/circles-meno-gelules"),
      fiche("site de la marque", "https://wearecircles.com/products/meno"),
    ],
    reserves: [],
  },
  {
    id: "manhae-menopause",
    nom: "Manhaé Ménopause",
    marque: "Vitavea",
    usage: "confort",
    format: "90 capsules",
    posologie: "Une capsule par jour",
    unitesParJour: 1,
    jours: 90,
    prix: 32.39,
    prixReleveLe: releve,
    prixNote: "Prix public conseillé affiché : 59,00 €.",
    composition:
      "Extrait de citrus 170 mg, huile de bourrache 135 mg, huile de poisson 125 mg (oméga-3 90 mg), vitamine E 12 mg, vitamine B9 200 µg, zinc 5 mg, fer 5,7 mg, bêta-carotène 3,1 mg.",
    criteres: { transparence: 2, allegation: 1, precautions: 2 },
    actifs: [
      { id: "citrus", dose: "170 mg", comparable: false },
      { id: "bourrache", dose: "135 mg", comparable: false },
      { id: "omega3", dose: "90 mg", comparable: false, remarque: "vingt fois moins que dans l'essai" },
      { id: "vitamine-e", dose: "12 mg", comparable: false, remarque: "très en dessous des doses des essais" },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte: "Peu de précautions. Contient du poisson et des sulfites.",
    resume: "Le prix par jour le plus bas du comparatif et peu de précautions, mais aucun actif à une dose étudiée.",
    pour: ["Le prix par jour le plus bas", "Peu de précautions d'emploi", "Une seule capsule par jour"],
    contre: ["Aucun actif à une dose étudiée chez des femmes ménopausées", "Contient du poisson et des sulfites"],
    marchands: [
      {
        nom: "Redcare Pharmacie",
        url: "https://www.redcare-pharmacie.fr/hygiene-et-sante/BE04506465/vitavea-manhae-menopause.htm",
        prix: 32.39,
        ...redcare,
      },
    ],
    sources: [fiche("Redcare Pharmacie", "https://www.redcare-pharmacie.fr/hygiene-et-sante/BE04506465/vitavea-manhae-menopause.htm")],
    reserves: [],
  },
  {
    id: "pileje-feminabiane-meno-confort",
    nom: "Feminabiane Méno'Confort",
    marque: "Pileje",
    usage: "confort",
    format: "30 comprimés",
    posologie: "Un comprimé par jour",
    unitesParJour: 1,
    jours: 30,
    prix: 13.99,
    prixReleveLe: releve,
    prixNote: "La fiche permet de passer à deux comprimés par jour : la boîte dure alors 15 jours.",
    composition:
      "Extrait de rhodiole 200 mg, extrait d'actée à grappes 40 mg, vitamine D3 5 µg, vitamine B6 1,4 mg, vitamine B9 200 µg, vitamine B12 2,5 µg.",
    criteres: { transparence: 2, allegation: 2, precautions: 0 },
    actifs: [
      { id: "actee", dose: "40 mg", comparable: true },
      { id: "rhodiole", dose: "200 mg", comparable: false },
      { id: "vitamine-d", dose: "5 µg", comparable: false },
      { id: "b6", dose: "1,4 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: true, antidepresseurs: false },
    precautionsTexte:
      "Actée à grappes. Déconseillé en cas de maladie du foie, de cancer hormono-dépendant ou de trouble bipolaire.",
    resume:
      "L'actée à grappes à la dose des essais, pour moins de 0,50 € par jour. Les études se contredisent et la plante fait l'objet d'une mise en garde pour le foie.",
    pour: ["Actée à grappes à la dose des essais", "Moins de 0,50 € par jour", "Un seul comprimé par jour"],
    contre: [
      "Études contradictoires sur l'actée à grappes",
      "Mise en garde européenne sur le foie",
      "Déconseillé en cas de cancer hormono-dépendant ou de trouble bipolaire",
    ],
    marchands: [
      {
        nom: "Pharma GDD",
        url: "https://www.pharma-gdd.com/fr/pileje-feminabiane-meno-confort-30-comprimes",
        prix: 13.99,
        ...sansProgramme,
      },
      {
        nom: "Site de la marque",
        url: "https://solutions.pileje.fr/fr/produit/feminabiane-menoconfort-30-comprimes",
        prix: 20.8,
        ...sansProgramme,
      },
    ],
    sources: [
      fiche("Pharma GDD", "https://www.pharma-gdd.com/fr/pileje-feminabiane-meno-confort-30-comprimes"),
      fiche("site de la marque", "https://solutions.pileje.fr/fr/produit/feminabiane-menoconfort-30-comprimes"),
    ],
    reserves: [],
  },
  {
    id: "serelys-meno",
    nom: "Sérélys Meno",
    marque: "Sérélys Pharma",
    usage: "confort",
    format: "60 gélules",
    posologie: "Une gélule par jour",
    unitesParJour: 1,
    jours: 60,
    prix: 33.99,
    prixReleveLe: releve,
    prixNote: "Prix public conseillé affiché : 39,99 €.",
    composition: "Extraits cytoplasmiques purifiés de pollens (PureCyTonin) 320 mg, vitamine E 10 mg.",
    criteres: { transparence: 2, allegation: 1, precautions: 2 },
    actifs: [
      { id: "pollen", dose: "320 mg", comparable: true, remarque: "l'extrait et la dose de l'essai contre placebo" },
      { id: "vitamine-e", dose: "10 mg", comparable: false, remarque: "très en dessous des doses des essais" },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte: "Peu de précautions. Demander conseil en cas d'allergie au pollen.",
    resume:
      "L'extrait de pollen des essais cliniques, sans phyto-œstrogènes. Les études contrôlées ne confirment pas l'effet observé dans les études ouvertes.",
    pour: ["L'extrait de pollen utilisé dans les essais", "Sans phyto-œstrogènes", "Une seule gélule par jour"],
    contre: [
      "Effet non confirmé quand on ne garde que les études contrôlées",
      "Répartition entre les deux extraits de pollen non affichée",
    ],
    marchands: [
      {
        nom: "Redcare Pharmacie",
        url: "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00564304/serelys-meno.htm",
        prix: 33.99,
        ...redcare,
      },
    ],
    sources: [
      fiche("Redcare Pharmacie", "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00564304/serelys-meno.htm"),
      fiche("site de la marque", "https://www.serelys.fr/nos-produits/26-serelys-meno-3665351000306.html"),
    ],
    reserves: [
      "Prix de la boîte de 60 lu sur la fiche du lot de deux boîtes : trouver l'adresse de la boîte seule",
    ],
  },
  {
    id: "arkopharma-phyto-soya",
    nom: "Phyto Soya Ménopause",
    marque: "Arkopharma",
    usage: "confort",
    format: "180 gélules",
    posologie: "Deux gélules par jour",
    unitesParJour: 2,
    jours: 90,
    prix: 47.49,
    prixReleveLe: releve,
    composition:
      "Extrait de soja 250 mg, dont 44 mg d'isoflavones (en aglycones), sauge 100 mg, vitamine D3 5 µg, vitamine E 12 mg, vitamine K2 25 µg, fer 7 mg, zinc 15 mg.",
    criteres: { transparence: 2, allegation: 1, precautions: 0 },
    actifs: [
      { id: "soja", dose: "44 mg d'isoflavones", comparable: true },
      { id: "sauge", dose: "100 mg", comparable: false, remarque: "en dessous des doses des essais" },
      { id: "vitamine-e", dose: "12 mg", comparable: false, remarque: "très en dessous des doses des essais" },
      { id: "vitamine-d", dose: "5 µg", comparable: false },
    ],
    faits: { phytoOestrogenes: true, actee: false, antidepresseurs: false },
    precautionsTexte:
      "Phyto-œstrogènes (soja). Déconseillé en cas d'antécédent de cancer du sein et sous anticoagulants. Peut gêner l'absorption des hormones thyroïdiennes.",
    resume: "Des isoflavones de soja proches de la dose des essais, en boîte de trois mois. Plusieurs contre-indications.",
    pour: [
      "Isoflavones de soja à une dose comparable à celle des essais",
      "Teneur en isoflavones affichée en aglycones",
      "Boîte de trois mois",
    ],
    contre: [
      "Déconseillé en cas d'antécédent personnel ou familial de cancer du sein",
      "Déconseillé sous anticoagulants",
      "Peut diminuer l'absorption des hormones thyroïdiennes",
    ],
    marchands: [
      {
        nom: "Redcare Pharmacie",
        url: "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00314691/arkopharma-phyto-soya-menopause.htm",
        prix: 47.49,
        ...redcare,
      },
    ],
    sources: [fiche("Redcare Pharmacie", "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00314691/arkopharma-phyto-soya-menopause.htm")],
    reserves: [],
  },
  {
    id: "miye-equilibre-feminin",
    nom: "MiYé Équilibre Féminin",
    marque: "MiYé",
    usage: "confort",
    format: "180 comprimés",
    posologie: "Quatre comprimés par jour",
    unitesParJour: 4,
    jours: 45,
    prix: 44,
    prixReleveLe: releve,
    composition:
      "Extrait de romarin 500 mg, mélisse (400 mg en équivalent de plante sèche), extrait d'ashwagandha 60 mg, vitamine B6 1,4 mg, vitamine B9 200 µg, vitamine D3 5 µg.",
    criteres: { transparence: 2, allegation: 2, precautions: 1 },
    actifs: [
      { id: "ashwagandha", dose: "60 mg d'extrait", comparable: false, remarque: "dix fois moins que dans les essais" },
      { id: "melisse", dose: "400 mg en équivalent de plante sèche", comparable: false },
      { id: "romarin", dose: "500 mg", comparable: false },
      { id: "vitamine-d", dose: "5 µg", comparable: false },
      { id: "b6", dose: "1,4 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte:
      "Contient de l'ashwagandha : avis médical en cas de traitement de la thyroïde. Déconseillé en cas de trouble biliaire.",
    resume: "Une formule à base de plantes, avec dix fois moins d'ashwagandha que dans les essais.",
    pour: ["Sans phyto-œstrogènes", "Extrait d'ashwagandha identifié (KSM-66)"],
    contre: [
      "Ashwagandha à un dixième de la dose des essais",
      "Quatre comprimés par jour",
      "Près de 1 € par jour",
    ],
    marchands: [
      {
        nom: "Site de la marque",
        url: "https://www.miye.care/products/womens-hormonal-balance",
        prix: 44,
        programme: "Affilae",
        commission: "12 %",
        remunere: false,
      },
      {
        nom: "Easypara",
        url: "https://www.easypara.fr/my-equilibre-feminin-180-comprimes-miye.html",
        prix: 43.79,
        ...sansProgramme,
      },
    ],
    sources: [
      fiche("site de la marque", "https://www.miye.care/products/womens-hormonal-balance"),
      fiche("Easypara", "https://www.easypara.fr/my-equilibre-feminin-180-comprimes-miye.html"),
    ],
    reserves: [],
  },
  {
    id: "menophytea-bouffees-de-chaleur",
    nom: "Ménophytea Bouffées de chaleur",
    marque: "Ménophytea",
    usage: "confort",
    format: "120 gélules",
    posologie: "Deux gélules le matin, deux le soir",
    unitesParJour: 4,
    jours: 30,
    prix: 18.99,
    prixReleveLe: releve,
    composition:
      "Extrait de graines de lin 210 mg, houblon (dose non affichée sur la fiche), extrait de kudzu 50 mg, inuline de chicorée 1 150 mg, vitamine B6 0,84 mg.",
    criteres: { transparence: 1, allegation: 2, precautions: 1 },
    actifs: [
      { id: "lin", dose: "210 mg", comparable: false },
      { id: "houblon", dose: "non affichée", comparable: false, remarque: "dose non affichée" },
      { id: "kudzu", dose: "50 mg", comparable: false },
      { id: "b6", dose: "0,84 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: true, actee: false, antidepresseurs: false },
    precautionsTexte:
      "Phyto-œstrogènes (lin, houblon, kudzu). Déconseillé en cas d'antécédent personnel ou familial de cancer du sein.",
    resume: "Lin, houblon et kudzu. La dose de houblon et les teneurs en principes actifs ne sont pas affichées.",
    pour: ["Sans soja ni actée à grappes", "Contient de la vitamine B6"],
    contre: [
      "Dose de houblon non affichée sur la fiche",
      "Teneurs en lignanes et en isoflavones non affichées",
      "Quatre gélules par jour",
      "Déconseillé en cas d'antécédent personnel ou familial de cancer du sein",
    ],
    marchands: [
      {
        nom: "Redcare Pharmacie",
        url: "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00008344/menophytea-bouffees-de-chaleur.htm",
        prix: 18.99,
        ...redcare,
      },
    ],
    sources: [fiche("Redcare Pharmacie", "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00008344/menophytea-bouffees-de-chaleur.htm")],
    reserves: ["Lin et kudzu : aucune ligne de preuve établie à ce jour"],
  },
  {
    id: "valebio-complexe-menopause",
    nom: "Valebio Complexe Ménopause",
    marque: "Valebio",
    usage: "confort",
    format: "30 gélules",
    posologie: "Une gélule par jour",
    unitesParJour: 1,
    jours: 30,
    prix: 20.89,
    prixReleveLe: releve,
    composition: "Extrait de pollen 300 mg, bêta-alanine 200 mg, L-tryptophane 20 mg, fibre d'acacia 28 mg.",
    criteres: { transparence: 2, allegation: 0, precautions: 1 },
    actifs: [
      { id: "pollen", dose: "300 mg", comparable: false, remarque: "extrait différent de celui des essais" },
      { id: "beta-alanine", dose: "200 mg", comparable: false },
      { id: "tryptophane", dose: "20 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: true },
    precautionsTexte: "Déconseillé sous antidépresseurs ou triptans, et en cas d'épilepsie.",
    resume: "Un extrait de pollen, mais pas celui des essais cliniques. Plusieurs interactions avec des médicaments.",
    pour: ["Sans caféine ni phyto-œstrogènes", "Une seule gélule par jour"],
    contre: [
      "Extrait de pollen différent de celui des essais",
      "Bêta-alanine : pas plus efficace qu'un placebo selon la Haute Autorité de santé",
      "Déconseillé sous antidépresseurs ou triptans, et en cas d'épilepsie",
    ],
    marchands: [
      {
        nom: "Boticinal",
        url: "https://www.boticinal.com/valebio-complexe-menopause-bien-etre-anti-bouffees-de-chaleur.html",
        prix: 20.89,
        ...sansProgramme,
      },
      {
        nom: "Site de la marque",
        url: "https://www.valebio.com/nos-produits/460-menopause.html",
        prix: 24.9,
        programme: "Affilae",
        commission: "10 %",
        remunere: false,
      },
    ],
    sources: [
      fiche("Boticinal", "https://www.boticinal.com/valebio-complexe-menopause-bien-etre-anti-bouffees-de-chaleur.html"),
      fiche("site de la marque", "https://www.valebio.com/nos-produits/460-menopause.html"),
    ],
    reserves: [],
  },
  {
    id: "nutri-and-co-menopause",
    nom: "Nutri&Co Ménopause",
    marque: "Nutri&Co",
    usage: "confort",
    format: "60 gélules",
    posologie: "Deux gélules par jour",
    unitesParJour: 2,
    jours: 30,
    prix: 29.9,
    prixReleveLe: releve,
    composition:
      "Extrait de fenugrec Libifem 300 mg, trèfle rouge 300 mg dont 60 mg d'isoflavones, actée à grappes 40 mg.",
    criteres: { transparence: 2, allegation: 0, precautions: 0 },
    actifs: [
      { id: "fenugrec", dose: "300 mg", comparable: false, remarque: "moitié de la dose de l'essai" },
      { id: "trefle-rouge", dose: "60 mg d'isoflavones", comparable: true },
      { id: "actee", dose: "40 mg", comparable: true },
    ],
    faits: { phytoOestrogenes: true, actee: true, antidepresseurs: false },
    precautionsTexte:
      "Phyto-œstrogènes et actée à grappes. Déconseillé en cas d'antécédent de cancer hormono-dépendant, de maladie du foie, ou avec un traitement hormonal.",
    resume:
      "Trois plantes étudiées, mais le fenugrec est à la moitié de la dose de son essai et les études sur le trèfle rouge et l'actée se contredisent.",
    pour: ["Trèfle rouge et actée à grappes à la dose des essais", "Doses et extraits affichés"],
    contre: [
      "Fenugrec à la moitié de la dose de son essai",
      "Études contradictoires sur le trèfle rouge et l'actée à grappes",
      "Phyto-œstrogènes et actée : plusieurs contre-indications",
      "Le prix par jour le plus élevé",
    ],
    marchands: [
      {
        nom: "Site de la marque",
        url: "https://nutriandco.com/fr/produits/menopause",
        prix: 29.9,
        programme: "Affilae",
        commission: "15 %",
        remunere: false,
      },
    ],
    sources: [
      fiche("site de la marque", "https://nutriandco.com/fr/produits/menopause"),
      { libelle: "Notice du produit, consultée le 9 octobre 2026", url: "https://nutriandco.com/qrc/fr/menopause/public/notice.html" },
    ],
    reserves: [],
  },

  // Produits « ventre » : relevés, mais leur comparatif n'est pas publié.
  // Comparatif « ventre gonflé » : prix et compositions relevés le 2 novembre 2026.
  {
    id: "aboca-charbon-vegetal",
    nom: "Charbon Végétal",
    marque: "Aboca",
    usage: "ventre",
    format: "30 comprimés",
    posologie: "Trois comprimés au moins 30 minutes avant le repas, trois juste après",
    unitesParJour: 6,
    jours: 5,
    prix: 5.99,
    prixReleveLe: releve2,
    prixNote: "Le lot de deux boîtes est à 11,79 €.",
    composition:
      "Charbon végétal activé 2 g pour six comprimés, fruit de fenouil en poudre. Contient du gluten (amidon de blé).",
    criteres: { transparence: 2, allegation: 2, precautions: 1 },
    actifs: [{ id: "charbon", dose: "1 g avant et 1 g après le repas", comparable: true }],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte:
      "Peut réduire l'absorption des médicaments pris en même temps, d'après la fiche : les espacer. Contient du gluten.",
    resume:
      "Le seul produit du comparatif qui apporte la dose de l'allégation autorisée contre les gaz. Il n'est pas vendu pour la ménopause, et la boîte ne dure que cinq jours à cette dose.",
    pour: [
      "Charbon actif à la dose de l'allégation autorisée : 1 g avant et 1 g après le repas",
      "Moins de 6 € la boîte",
      "Dose affichée sur la fiche",
    ],
    contre: [
      "1,20 € par jour à la dose conseillée : la boîte dure cinq jours",
      "À espacer des médicaments",
      "Contient du gluten",
    ],
    marchands: [
      {
        nom: "Redcare Pharmacie",
        url: "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00600537/aboca-charbon-vegetal.htm",
        prix: 5.99,
        ...redcare,
      },
    ],
    sources: [fiche2("Redcare Pharmacie", "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00600537/aboca-charbon-vegetal.htm")],
    reserves: [],
  },
  {
    id: "ymea-menopause-ventre-plat",
    nom: "Ymea Ménopause Ventre Plat",
    marque: "Ymea",
    usage: "ventre",
    format: "64 gélules",
    posologie: "Deux gélules par jour",
    unitesParJour: 2,
    jours: 32,
    prix: 22.79,
    prixReleveLe: releve2,
    composition:
      "Extrait de sauge 300 mg, extrait d'artichaut 250 mg, extrait de maca 100 mg, extrait de piment 30 mg, zinc 10 mg, vitamine B6 1,4 mg, vitamine D 5 µg.",
    criteres: { transparence: 2, allegation: 1, precautions: 2 },
    actifs: [
      { id: "artichaut", dose: "250 mg", comparable: false, remarque: "environ huit fois moins que dans l'essai" },
      { id: "sauge", dose: "300 mg", comparable: false, remarque: "vise les bouffées de chaleur, pas le ventre" },
      { id: "maca", dose: "100 mg", comparable: false },
      { id: "b6", dose: "1,4 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte: "Peu de précautions. Sans phyto-œstrogènes.",
    resume:
      "Sans phyto-œstrogènes et avec peu de précautions. L'artichaut, son seul actif étudié sur la digestion, est environ huit fois moins dosé que dans l'essai.",
    pour: ["Sans phyto-œstrogènes", "Peu de précautions d'emploi", "Dose de chaque actif affichée"],
    contre: ["Artichaut environ huit fois moins dosé que dans l'essai sur la digestion", "Aucun actif à une dose étudiée sur les ballonnements"],
    marchands: [
      {
        nom: "Redcare Pharmacie",
        url: "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00535908/ymea-menopause-bouffees-de-chaleur-et-ventre-plat-64-gelules.htm",
        prix: 22.79,
        ...redcare,
      },
      { nom: "Pharma GDD", url: "https://www.pharma-gdd.com/fr/ymea-menopause-ventre-plat-gelules", prix: 22.99, ...sansProgramme },
    ],
    sources: [
      fiche2("Redcare Pharmacie", "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00535908/ymea-menopause-bouffees-de-chaleur-et-ventre-plat-64-gelules.htm"),
      fiche2("Pharma GDD", "https://www.pharma-gdd.com/fr/ymea-menopause-ventre-plat-gelules"),
    ],
    reserves: [],
  },
  {
    id: "menophytea-silhouette-ventre-plat",
    nom: "Ménophytea Silhouette Ventre Plat",
    marque: "Ménophytea",
    usage: "ventre",
    format: "60 gélules",
    posologie: "Deux gélules le matin",
    unitesParJour: 2,
    jours: 30,
    prix: 17.99,
    prixReleveLe: releve2,
    prixNote: "Pharma GDD vend aussi une boîte de 30 gélules à 8,29 €.",
    composition:
      "Gomme d'acacia 170 mg, inuline de chicorée 132 mg, charbon activé 120 mg, argile verte 100 mg, caféine 80 mg, Saccharomyces boulardii 1,4 milliard, huile essentielle de marjolaine 10 mg, vitamine C 80 mg, vitamine B3 16 mg, manganèse 1 mg, chrome 26 µg.",
    criteres: { transparence: 2, allegation: 1, precautions: 0 },
    actifs: [
      { id: "charbon", dose: "120 mg", comparable: false, remarque: "environ seize fois moins que la dose de l'allégation (2 g par jour)" },
      { id: "s-boulardii", dose: "1,4 milliard", comparable: false },
      { id: "inuline", dose: "132 mg", comparable: false },
      { id: "cafeine", dose: "80 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte: "Contient de la caféine (80 mg par jour) et une huile essentielle. Déconseillé pendant la grossesse et l'allaitement.",
    resume: "Du charbon, mais environ seize fois moins que la dose de l'allégation autorisée contre les gaz. Contient de la caféine.",
    pour: ["Dose de chaque actif affichée", "Moins de 0,60 € par jour"],
    contre: [
      "Charbon à 120 mg par jour, loin des 2 g de l'allégation autorisée",
      "Contient de la caféine",
      "Pharma GDD affiche 130 mg de charbon, Redcare 120 mg",
    ],
    marchands: [
      {
        nom: "Redcare Pharmacie",
        url: "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00365056/nutreov-menophytea-silhouette-ventre-plat.htm",
        prix: 17.99,
        ...redcare,
      },
    ],
    sources: [
      fiche2("Redcare Pharmacie", "https://www.redcare-pharmacie.fr/hygiene-et-sante/F00365056/nutreov-menophytea-silhouette-ventre-plat.htm"),
      fiche2("Pharma GDD", "https://www.pharma-gdd.com/fr/menophytea-ventre-plat"),
    ],
    reserves: [],
  },
  {
    id: "terravita-ventre-plat",
    nom: "Terravita Ventre plat",
    marque: "Terravita",
    usage: "ventre",
    format: "60 gélules",
    posologie: "Deux gélules par jour",
    unitesParJour: 2,
    jours: 30,
    prix: 19.9,
    prixReleveLe: releve2,
    composition: "Extrait d'algue brune (Ascophyllum) et de pépins de raisin (ID-alG) 400 mg, carvi 291 mg, pissenlit 80 mg.",
    criteres: { transparence: 2, allegation: 0, precautions: 1 },
    actifs: [
      { id: "id-alg", dose: "400 mg", comparable: true, remarque: "dose de l'essai, qui portait sur le poids et non sur les ballonnements" },
      { id: "carvi", dose: "291 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte: "Contient une algue, source d'iode.",
    resume: "Un extrait d'algue à la dose de son essai, lequel portait sur le poids et non sur les ballonnements.",
    pour: ["Dose de chaque actif affichée", "Moins de 0,70 € par jour"],
    contre: ["Un seul essai, financé par le fournisseur, sur le poids", "Aucune allégation de santé autorisée pour ses actifs"],
    marchands: [
      { nom: "Site de la marque", url: "https://www.terravita.fr/products/ventre-plat", prix: 19.9, programme: "Affilae", commission: "15 %", remunere: false },
    ],
    sources: [fiche2("site de la marque", "https://www.terravita.fr/products/ventre-plat")],
    reserves: [],
  },
  {
    id: "kosbiotic-slim-my-body",
    nom: "Kosbiotic Slim My Body",
    marque: "Kosbiotic",
    usage: "ventre",
    format: "30 gélules",
    posologie: "Une gélule par jour",
    unitesParJour: 1,
    jours: 30,
    prix: 39.9,
    prixReleveLe: releve2,
    prixNote: "35,91 € par mois en abonnement.",
    composition:
      "Bifidobacterium lactis B420 10 milliards, extrait de fucus vésiculeux 50 mg (iode 75 µg), caféine 100 mg, chrome 80 µg, fructo-oligosaccharides 50 mg, fermentat de levure 10 mg.",
    criteres: { transparence: 2, allegation: 1, precautions: 0 },
    actifs: [
      { id: "b-lactis-b420", dose: "10 milliards", comparable: true, remarque: "dose de l'essai sur la masse grasse, pas sur les ballonnements" },
      { id: "cafeine", dose: "100 mg", comparable: false },
      { id: "inuline", dose: "50 mg", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte: "Contient de la caféine (100 mg par jour) et de l'iode (algue).",
    resume: "Une souche à la dose de son essai, qui mesurait la masse grasse et non les ballonnements. Le plus cher par jour.",
    pour: ["Souche identifiée, à la dose de son essai", "Une seule gélule par jour"],
    contre: ["Contient de la caféine et de l'iode", "Plus de 1,30 € par jour", "Essai sur la masse grasse, pas sur les ballonnements"],
    marchands: [
      {
        nom: "Site de la marque",
        url: "https://kosbiotic.com/products/probiotiques-ventre-plat-slim-my-body",
        prix: 39.9,
        programme: "Affilae",
        commission: "taux non public",
        remunere: false,
      },
    ],
    sources: [fiche2("site de la marque", "https://kosbiotic.com/products/probiotiques-ventre-plat-slim-my-body")],
    reserves: [],
  },
  {
    id: "noobiotik-probio-slim",
    nom: "Noobiotik Probiotiques Minceur",
    marque: "Noobiotik",
    usage: "ventre",
    format: "60 gélules",
    posologie: "Deux gélules par jour",
    unitesParJour: 2,
    jours: 30,
    prix: 29.9,
    prixReleveLe: releve2,
    prixNote: "Anciennement « Probio Slim ».",
    composition: "Lactobacillus gasseri CNCM I-5076 20 milliards, Lactobacillus plantarum CNCM I-4909 10 milliards.",
    criteres: { transparence: 2, allegation: 0, precautions: 2 },
    actifs: [
      { id: "l-gasseri", dose: "20 milliards", comparable: false },
      { id: "l-plantarum", dose: "10 milliards", comparable: false },
    ],
    faits: { phytoOestrogenes: false, actee: false, antidepresseurs: false },
    precautionsTexte: "Peu de précautions.",
    resume: "Deux souches identifiées, sans caféine. Aucune allégation autorisée, et aucun essai de ces souches sur les ballonnements dans notre base.",
    pour: ["Souches identifiées et dosées", "Peu de précautions d'emploi"],
    contre: ["Aucune allégation de santé autorisée", "1,00 € par jour"],
    marchands: [
      {
        nom: "Site de la marque",
        url: "https://www.noobiotik.com/products/probiotiques-l-gasseri",
        prix: 29.9,
        programme: "Awin",
        commission: "8 % par défaut",
        remunere: false,
      },
    ],
    sources: [fiche2("site de la marque", "https://www.noobiotik.com/products/probiotiques-l-gasseri")],
    reserves: [],
  },
];
