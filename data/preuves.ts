/**
 * Niveaux de preuve par actif et par symptôme, et positions des autorités sur la sécurité.
 * Règle : une ligne n'entre ici qu'avec une source lue et datée. Les chiffres sont ceux des résumés.
 */
export type Niveau = "A" | "B" | "C" | "D" | "E";

export const niveaux: Record<Niveau, { titre: string; regle: string }> = {
  A: {
    titre: "Effet démontré",
    regle: "Revues systématiques concordantes, de bonne qualité.",
  },
  B: {
    titre: "Signal positif à confirmer",
    regle: "Méta-analyse positive à effet modeste ou de qualité faible, ou plusieurs essais randomisés concordants.",
  },
  C: {
    titre: "Données insuffisantes ou contradictoires",
    regle: "Un seul essai, de petits effectifs, ou des synthèses qui se contredisent.",
  },
  D: {
    titre: "Essais sans effet face au placebo",
    regle: "Des essais ou une évaluation officielle existent et ne montrent pas de différence avec le placebo.",
  },
  E: {
    titre: "Aucun essai pour ce symptôme",
    regle: "Aucun essai randomisé trouvé chez des femmes en péri- ou post-ménopause.",
  },
};

export type Symptome = "bouffees" | "humeur" | "sommeil" | "global" | "force" | "ballonnements";

export const symptomes: Record<Symptome, string> = {
  bouffees: "Bouffées de chaleur",
  humeur: "Humeur",
  sommeil: "Sommeil",
  global: "Symptômes dans leur ensemble",
  force: "Force musculaire",
  ballonnements: "Ballonnements et gaz",
};

export type TypeSource = "autorite" | "societe" | "revue" | "essai" | "observation" | "reglement";

export type Source = {
  id: string;
  court: string;
  titre: string;
  editeur: string;
  annee: number;
  url: string;
  type: TypeSource;
};

const s = (id: string, type: TypeSource, court: string, annee: number, titre: string, editeur: string, url: string): Source => ({
  id,
  type,
  court,
  annee,
  titre,
  editeur,
  url,
});

const liste: Source[] = [
  // Autorités de santé et textes officiels
  s("has2025", "autorite", "Haute Autorité de santé", 2025, "Spécialités indiquées dans le traitement hormonal de la ménopause, avis de réévaluation", "Haute Autorité de santé, Commission de la transparence", "https://www.has-sante.fr/upload/docs/evamed/CT-21190_THM_PIC_REEV_AvisDef_CT-EVAL469.pdf"),
  s("has2011", "autorite", "Haute Autorité de santé", 2011, "Abufène 400 mg (bêta-alanine), réévaluation du service médical rendu", "Haute Autorité de santé, Commission de la transparence", "https://www.has-sante.fr/jcms/c_1050826"),
  s("anses2025", "autorite", "ANSES", 2025, "Avis relatif à l'élaboration de valeurs toxicologiques de référence pour les isoflavones", "Agence nationale de sécurité sanitaire (ANSES), saisine 2022-SA-0221", "https://www.anses.fr/sites/default/files/VSR2022SA0221RA.pdf"),
  s("afssa2005", "autorite", "Afssa", 2005, "Sécurité et bénéfices des phyto-estrogènes apportés par l'alimentation, recommandations", "Agence française de sécurité sanitaire des aliments (Afssa)", "https://www.anses.fr/fr/system/files/NUT-Sy-phytoestrogenes.pdf"),
  s("efsa2015", "autorite", "EFSA", 2015, "Risk assessment for peri- and post-menopausal women taking food supplements containing isolated isoflavones", "Autorité européenne de sécurité des aliments (EFSA), EFSA Journal 13(10):4246", "https://www.efsa.europa.eu/en/efsajournal/pub/4246"),
  s("efsa2012", "autorite", "EFSA", 2012, "Scientific Opinion on health claims related to soy isoflavones", "Autorité européenne de sécurité des aliments (EFSA), EFSA Journal 2847", "https://www.efsa.europa.eu/en/efsajournal/pub/2847"),
  s("ema2018", "autorite", "Agence européenne des médicaments", 2018, "European Union herbal monograph on Cimicifuga racemosa (L.) Nutt., rhizoma", "Agence européenne des médicaments, comité des médicaments à base de plantes", "https://www.ema.europa.eu/en/documents/herbal-monograph/final-european-union-herbal-monograph-cimicifuga-racemosa-l-nutt-rhizome-revision-1_en.pdf"),
  s("afssa2007", "autorite", "Afssa", 2007, "Avis sur les compléments alimentaires contenant de l'actée à grappes (Cimicifuga racemosa)", "Agence française de sécurité sanitaire des aliments (Afssa), saisine 2007-SA-0171", "https://www.anses.fr/en/system/files/NUT2007sa0171.pdf"),
  s("anses2024", "autorite", "ANSES", 2024, "Avis relatif aux risques liés aux préparations de Withania somnifera (ashwagandha) dans les compléments alimentaires", "Agence nationale de sécurité sanitaire (ANSES), saisine 2021-SA-0077", "https://www.anses.fr/fr/system/files/NUT2021SA0077.pdf"),
  s("ansesRapport2024", "autorite", "ANSES, rapport de nutrivigilance", 2024, "Rapport d'activité de la nutrivigilance 2024", "Agence nationale de sécurité sanitaire (ANSES)", "https://www.anses.fr/system/files/Anses-RA2024-Nutrivigilance.pdf"),
  s("nutrivigilance", "autorite", "ANSES", 2025, "Le dispositif de nutrivigilance", "Agence nationale de sécurité sanitaire (ANSES)", "https://www.anses.fr/fr/nos-missions/surveiller-et-alerter/dispositif-de-nutrivigilance"),
  s("dgal", "autorite", "Ministère de l'Agriculture", 2024, "Qu'est-ce qu'un complément alimentaire ?", "Ministère de l'Agriculture et de la Souveraineté alimentaire", "https://agriculture.gouv.fr/quest-ce-quun-complement-alimentaire"),
  s("reglement432", "reglement", "Règlement (UE) n° 432/2012", 2012, "Liste des allégations de santé autorisées portant sur les denrées alimentaires", "Commission européenne", "https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32012R0432"),
  // Sociétés savantes
  s("menopauseSociety2023", "societe", "The Menopause Society", 2023, "The 2023 nonhormone therapy position statement of The North American Menopause Society", "The Menopause Society, revue Menopause 30(6):573-590", "https://doi.org/10.1097/GME.0000000000002200"),
  s("cngof2021", "societe", "CNGOF et GEMVi", 2021, "Alternatives non hormonales de prise en charge des bouffées vasomotrices post-ménopausiques. Recommandations pour la pratique clinique", "Collège national des gynécologues et obstétriciens français et Groupe d'étude sur la ménopause, Gynécologie Obstétrique Fertilité & Sénologie 49(5):373-393", "https://doi.org/10.1016/j.gofs.2021.03.020"),
  // Revues systématiques et méta-analyses
  s("cochrane2013", "revue", "Revue Cochrane", 2013, "Les phytoestrogènes pour le traitement des symptômes vasomoteurs de la ménopause", "Cochrane, Lethaby et al.", "https://www.cochrane.org/fr/CD001395/MENSTR_les-phytoestrogenes-pour-le-traitement-des-symptomes-vasomoteurs-de-la-menopause"),
  s("cochrane2012", "revue", "Revue Cochrane", 2012, "Black cohosh (Cimicifuga spp.) for menopausal symptoms", "Cochrane, Leach et Moore", "https://www.cochrane.org/evidence/CD007244_black-cohosh-menopausal-symptoms"),
  s("taku2012", "revue", "Taku et al.", 2012, "Extracted or synthesized soybean isoflavones reduce menopausal hot flash frequency and severity: systematic review and meta-analysis of randomized controlled trials", "Revue Menopause 19(7):776-790", "https://doi.org/10.1097/gme.0b013e3182410159"),
  s("franco2016", "revue", "Franco et al., JAMA", 2016, "Use of plant-based therapies and menopausal symptoms: a systematic review and meta-analysis", "JAMA 315(23):2554-2563", "https://doi.org/10.1001/jama.2016.8012"),
  s("kanadys2021", "revue", "Kanadys et al.", 2021, "Méta-analyse des essais du trèfle rouge sur les bouffées de chaleur", "Revue Nutrients 13(4):1258", "https://doi.org/10.3390/nu13041258"),
  s("actee2023", "revue", "Méta-analyse, revue Menopause", 2023, "Black cohosh extracts in women with menopausal symptoms: an updated pairwise meta-analysis", "Revue Menopause 30(7):766-773", "https://doi.org/10.1097/GME.0000000000002196"),
  s("moradi2023", "revue", "Moradi et al.", 2023, "Méta-analyse de 4 essais de la sauge officinale sur les bouffées de chaleur", "International Journal of Community Based Nursing and Midwifery", "https://ijcbnm.sums.ac.ir/article_49350.html"),
  s("genazzani2020", "revue", "Genazzani et al.", 2020, "Purified and specific cytoplasmic pollen extract: a non-hormonal alternative for the treatment of menopausal symptoms", "Gynecological Endocrinology 36(3), revue qui décrit l'essai de Winther et al. (2005, Climacteric)", "https://iris.unito.it/retrieve/4f40a6ed-e846-4d87-b094-c6c9489dd8df/Purified%20and%20specific%20cytoplasmic%20pollen%20extract.pdf"),
  s("acquarulo2024", "revue", "Acquarulo et al.", 2024, "Revue systématique et méta-analyse de l'extrait de pollen purifié sur les symptômes de la ménopause", "Revue Menopause 31(2):154-159", "https://doi.org/10.1097/GME.0000000000002301"),
  s("lee2011", "revue", "Lee et al.", 2011, "Maca (Lepidium meyenii) for treatment of menopausal symptoms: a systematic review", "Revue Maturitas 70(3):227-233", "https://doi.org/10.1016/j.maturitas.2011.07.017"),
  s("christelle2020", "revue", "Christelle et al.", 2020, "Méta-analyse de 5 essais de l'huile d'onagre sur les symptômes de la ménopause", "Current Women's Health Reviews 16(4):265-276", "https://doi.org/10.2174/1573404816999200702162750"),
  s("iqbal2023", "revue", "Iqbal et al.", 2023, "Revue systématique de 9 essais des oméga-3 chez des femmes ménopausées", "Revue Nutrients 15(19):4231", "https://doi.org/10.3390/nu15194231"),
  s("feduniw2023", "revue", "Feduniw et al.", 2023, "Revue systématique de 16 études de la vitamine E chez des femmes en péri- et post-ménopause", "Revue Nutrients 15(1):160", "https://doi.org/10.3390/nu15010160"),
  s("dossantos2021", "revue", "dos Santos et al.", 2021, "Méta-analyse des essais de la créatine associée à l'entraînement en résistance chez des femmes âgées ou ménopausées", "Revue Nutrients 13(11):3757", "https://doi.org/10.3390/nu13113757"),
  // Essais randomisés
  s("dimpfel2021", "essai", "Dimpfel et al.", 2021, "Essai randomisé d'un extrait de feuilles fraîches de sauge chez 80 femmes ménopausées", "Revue Heliyon 7(2):e05910", "https://doaj.org/article/b32ca4a325e14855b9f1aeb53bd27e23"),
  s("heyerick2006", "essai", "Heyerick et al.", 2006, "Essai randomisé d'un extrait de houblon chez 67 femmes ménopausées", "Revue Maturitas 54:164-175", "https://www.epistemonikos.org/en/documents/56342e32fe6c9d47c325271ae9c9217ce78fb5b6"),
  s("erkkola2010", "essai", "Erkkola et al.", 2010, "Essai croisé randomisé d'un extrait de houblon chez 36 femmes ménopausées", "Revue Phytomedicine 17(6):389-396", "https://doi.org/10.1016/j.phymed.2010.01.007"),
  s("steels2017", "essai", "Steels et al.", 2017, "Efficacy of a proprietary Trigonella foenum-graecum L. de-husked seed extract in reducing menopausal symptoms in otherwise healthy women", "Revue Phytotherapy Research", "https://doi.org/10.1002/ptr.5856"),
  s("begum2016", "essai", "Shamshad Begum et al.", 2016, "Essai randomisé d'un extrait de fenugrec chez 88 femmes ménopausées", "Revue Phytotherapy Research 30(11):1775-1784", "https://doi.org/10.1002/ptr.5680"),
  s("lopresti2021", "essai", "Lopresti et Smith", 2021, "Essai randomisé d'un extrait de safran chez 86 femmes en périménopause", "Journal of Menopausal Medicine 27(2):66-78", "https://doi.org/10.6118/jmm.21002"),
  s("kashani2018", "essai", "Kashani et al.", 2018, "Essai randomisé du safran chez 60 femmes ménopausées ayant des bouffées de chaleur", "Archives of Gynecology and Obstetrics 297:717-724", "https://doi.org/10.1007/s00404-018-4655-2"),
  s("lopresti2020", "essai", "Lopresti et al.", 2020, "Essai randomisé du safran sur le sommeil chez 63 adultes", "Journal of Clinical Sleep Medicine 16(6):937-947", "https://doi.org/10.5664/jcsm.8376"),
  s("gopal2021", "essai", "Gopal et al.", 2021, "Essai randomisé d'un extrait de racine d'ashwagandha chez 100 femmes en périménopause", "Journal of Obstetrics and Gynaecology Research", "https://doi.org/10.1111/jog.15030"),
  s("vani2025", "essai", "Vani et al.", 2025, "Essai randomisé d'un extrait de racine d'ashwagandha chez 60 femmes ménopausées", "Frontiers in Reproductive Health 7:1647721", "https://doi.org/10.3389/frph.2025.1647721"),
  s("park2015", "essai", "Park et al.", 2015, "Essai randomisé du magnésium chez 289 femmes ménopausées suivies après un cancer du sein", "Revue Menopause 22(6):627-632", "https://doi.org/10.1097/GME.0000000000000374"),
  s("leblanc2015", "essai", "LeBlanc et al.", 2015, "Calcium et vitamine D : pas d'effet sur les symptômes de la ménopause (analyse de l'essai Women's Health Initiative)", "Revue Maturitas, résultats lus dans le communiqué de l'institution", "https://eurekalert.org/news-releases/587397"),
  s("cohen2014", "essai", "Cohen et al.", 2014, "Efficacy of omega-3 for vasomotor symptoms treatment: a randomized controlled trial", "Revue Menopause 21(4):347-354", "https://divisionofresearch.kaiserpermanente.org/publications/efficacy-of-omega-3-for-vasomotor-symptoms-treatment-a-randomized-controlled-trial"),
  s("korovljev2025", "essai", "Korovljev et al.", 2025, "Essai randomisé de la créatine chez 36 femmes en péri- et post-ménopause", "Journal of the American Nutrition Association", "https://nutrition-evidence.com/article/481576/"),
  s("shirazi2021", "essai", "Shirazi et al.", 2021, "Essai randomisé de la mélisse chez 60 femmes ménopausées ayant un trouble du sommeil", "Revista Brasileira de Ginecologia e Obstetrícia 43(2):126-130", "https://doi.org/10.1055/s-0040-1721857"),
  // Ventre gonflé et ballonnements
  s("efsaCharbon2011", "autorite", "EFSA", 2011, "Scientific Opinion on the substantiation of health claims related to activated charcoal and reduction of excessive intestinal gas accumulation", "Autorité européenne de sécurité des aliments (EFSA), question EFSA-Q-2008-2671", "https://www.efsa.europa.eu/en/efsajournal/pub/2049"),
  s("holtmann2003", "essai", "Holtmann et al.", 2003, "Essai randomisé d'un extrait de feuille d'artichaut chez 247 personnes souffrant de dyspepsie fonctionnelle", "Alimentary Pharmacology & Therapeutics 18(11-12):1099-1105", "https://doi.org/10.1046/j.1365-2036.2003.01767.x"),
  s("ingrosso2022", "revue", "Ingrosso et al.", 2022, "Méta-analyse de l'huile de menthe poivrée dans l'intestin irritable (10 essais, 1 030 personnes)", "Alimentary Pharmacology & Therapeutics 56(6):932-941", "https://doi.org/10.1111/apt.17179"),
  s("goodoory2023", "revue", "Goodoory et al.", 2023, "Méta-analyse des probiotiques dans l'intestin irritable (82 essais, 10 332 personnes)", "Gastroenterology 165(5):1206-1218", "https://doi.org/10.1053/j.gastro.2023.07.018"),
  s("denby2025", "observation", "Denby et al.", 2025, "Symptômes digestifs chez près de 600 femmes de 44 à 73 ans (communication au congrès de la Menopause Society)", "The Menopause Society, congrès annuel 2025, communiqué du 10 octobre 2025", "https://menopause.org/press-releases/digestive-health-issues-more-common-during-perimenopause-and-menopause"),
  s("solomon2026", "observation", "Solomon et al.", 2026, "Symptômes digestifs et anxiété au fil de la ménopause : cohorte canadienne MOMENTUM (1 832 femmes de 40 à 60 ans)", "The Menopause Society, congrès annuel 2026, résumé lu dans Healio", "https://www.healio.com/news/womens-health-ob-gyn/20261028/excessive-bloating-gas-consistent-burden-for-menopausal-women-study-shows"),
  s("greendale2019", "observation", "Greendale et al.", 2019, "Composition corporelle et poids pendant la transition ménopausique : cohorte américaine SWAN", "JCI Insight 4(5):e124865, résultats lus dans le résumé", "https://content.jci.org/articles/view/124865/pdf"),
  s("davis2012", "revue", "Davis et al.", 2012, "Understanding weight gain at menopause, revue de l'International Menopause Society", "Climacteric 15(5), résultats lus dans le communiqué de la société", "https://www.sciencedaily.com/releases/2012/10/121016084938.htm"),
  s("efsaGlucomannane2010", "autorite", "EFSA", 2010, "Avis scientifique sur les allégations de santé du glucomannane (mannane de konjac), dont la réduction du poids", "Autorité européenne de sécurité des aliments, EFSA Journal", "https://www.efsa.europa.eu/en/scdocs/doc/1798.pdf"),
  s("samargandy2021", "observation", "Samargandy et al.", 2021, "Graisse abdominale viscérale pendant la transition ménopausique : étude SWAN Heart (362 femmes)", "Menopause, résultats lus dans le communiqué de l'éditeur", "https://www.eurekalert.org/news-releases/566757"),
  s("peters2022", "revue", "Peters et al.", 2022, "Spotlight on the gut microbiome in menopause: current insights", "International Journal of Women's Health 14:1059-1072", "https://doi.org/10.2147/IJWH.S340491"),
  s("nice2011", "autorite", "NICE", 2011, "Ovarian cancer: recognition and initial management (CG122), standard de qualité QS18, énoncé 1", "National Institute for Health and Care Excellence (Royaume-Uni)", "https://www.nice.org.uk/guidance/qs18/chapter/quality-statement-1-symptoms-and-ca125"),
];

export const sources: Record<string, Source> = Object.fromEntries(liste.map((x) => [x.id, x]));

/** Les actifs que l'on rencontre dans les formules. La vigilance vient d'une autorité de santé, jamais d'une fiche produit. */
export type Actif = { nom: string; vigilance?: string; sourcesVigilance?: string[] };

const phyto = "Phyto-œstrogène : déconseillé en cas d'antécédent personnel ou familial de cancer du sein.";

export const actifs: Record<string, Actif> = {
  genisteine: { nom: "Génistéine", vigilance: phyto, sourcesVigilance: ["afssa2005", "cngof2021"] },
  soja: { nom: "Isoflavones de soja", vigilance: phyto, sourcesVigilance: ["afssa2005", "cngof2021"] },
  "trefle-rouge": { nom: "Trèfle rouge", vigilance: phyto, sourcesVigilance: ["cngof2021"] },
  actee: {
    nom: "Actée à grappes",
    vigilance:
      "Des atteintes du foie ont été signalées. Pas plus de six mois sans avis médical, et pas après un cancer du sein sans avis médical.",
    sourcesVigilance: ["ema2018", "afssa2007"],
  },
  sauge: { nom: "Sauge officinale" },
  houblon: { nom: "Houblon", vigilance: phyto, sourcesVigilance: ["cngof2021"] },
  pollen: { nom: "Extrait de pollen purifié", vigilance: "Demander conseil en cas d'allergie au pollen." },
  fenugrec: { nom: "Fenugrec" },
  maca: { nom: "Maca" },
  onagre: { nom: "Huile d'onagre" },
  bourrache: { nom: "Huile de bourrache" },
  safran: { nom: "Safran" },
  ashwagandha: {
    nom: "Ashwagandha",
    vigilance:
      "Déconseillé en cas de maladie de la thyroïde, du foie ou du cœur, pendant la grossesse et avec des sédatifs.",
    sourcesVigilance: ["anses2024", "ansesRapport2024"],
  },
  magnesium: { nom: "Magnésium" },
  "vitamine-d": { nom: "Vitamine D" },
  omega3: { nom: "Oméga-3" },
  "vitamine-e": { nom: "Vitamine E" },
  creatine: { nom: "Créatine" },
  tryptophane: { nom: "L-tryptophane" },
  "beta-alanine": { nom: "Bêta-alanine" },
  melisse: { nom: "Mélisse" },
  b6: { nom: "Vitamine B6" },
  // Actifs présents dans des formules, sans ligne de preuve à ce jour.
  citrus: { nom: "Extrait de citrus" },
  rhodiole: { nom: "Rhodiole" },
  lin: { nom: "Graines de lin", vigilance: phyto },
  kudzu: { nom: "Kudzu", vigilance: phyto },
  romarin: { nom: "Romarin" },
  // Ventre gonflé et ventre plat
  charbon: { nom: "Charbon actif" },
  artichaut: { nom: "Artichaut (feuille)" },
  "menthe-poivree": { nom: "Huile de menthe poivrée" },
  probiotiques: { nom: "Probiotiques (toutes souches)" },
  "b-lactis-b420": { nom: "Bifidobacterium lactis B420" },
  "l-gasseri": { nom: "Lactobacillus gasseri" },
  "l-plantarum": { nom: "Lactobacillus plantarum" },
  "s-boulardii": { nom: "Saccharomyces boulardii" },
  inuline: { nom: "Inuline et fructo-oligosaccharides" },
  carvi: { nom: "Carvi" },
  "id-alg": { nom: "Extrait d'algue brune et de pépins de raisin (ID-alG)" },
  cafeine: { nom: "Caféine" },
};

export type Preuve = {
  id: string;
  actifId: string;
  symptome: Symptome;
  niveau: Niveau;
  /** Dose et durée dans les essais. Vide quand il n'y a pas d'essai. */
  doseEssais: string;
  conclusion: string;
  sources: string[];
  verifieLe: string;
};

const le = "2026-10-09";
const le2 = "2026-11-02";

export const preuves: Preuve[] = [
  // Bouffées de chaleur
  { id: "genisteine", actifId: "genisteine", symptome: "bouffees", niveau: "B", doseEssais: "Plus de 30 mg par jour", conclusion: "Baisse constante de la fréquence des bouffées de chaleur dans 4 essais. Les recommandations françaises de 2021 retiennent ce bénéfice.", sources: ["cochrane2013", "cngof2021"], verifieLe: le },
  { id: "soja", actifId: "soja", symptome: "bouffees", niveau: "B", doseEssais: "54 mg par jour (médiane), de 6 semaines à 12 mois", conclusion: "Fréquence réduite de 20,6 % face au placebo dans une méta-analyse de 17 essais, et environ 0,8 bouffée de moins par jour dans une autre. Effet modeste : la revue Cochrane ne le juge pas concluant.", sources: ["taku2012", "franco2016", "cochrane2013"], verifieLe: le },
  { id: "trefle-rouge", actifId: "trefle-rouge", symptome: "bouffees", niveau: "C", doseEssais: "37 à 160 mg d'isoflavones par jour", conclusion: "1,7 bouffée de moins par jour dans une méta-analyse de 2021, avec des résultats très dispersés. Pas de différence significative dans la revue Cochrane.", sources: ["kanadys2021", "cochrane2013"], verifieLe: le },
  { id: "actee", actifId: "actee", symptome: "bouffees", niveau: "C", doseEssais: "40 mg par jour (médiane)", conclusion: "Pas de différence avec le placebo dans la revue Cochrane (16 essais, 2 027 femmes). Effet faible dans une méta-analyse de 2023 (22 essais, 2 310 femmes).", sources: ["cochrane2012", "actee2023"], verifieLe: le },
  { id: "sauge", actifId: "sauge", symptome: "bouffees", niveau: "C", doseEssais: "Très variable selon l'extrait, à partir de 300 mg par jour", conclusion: "Un essai positif face au placebo chez 80 femmes, mais la méta-analyse de 4 essais (310 femmes) ne trouve pas de différence significative.", sources: ["moradi2023", "dimpfel2021"], verifieLe: le },
  { id: "houblon", actifId: "houblon", symptome: "bouffees", niveau: "C", doseEssais: "Extrait apportant 100 à 250 µg de 8-prénylnaringénine par jour", conclusion: "Résultats inconstants : dans le principal essai (67 femmes), l'effet observé à 6 semaines ne se retrouve pas à 12 semaines.", sources: ["heyerick2006", "erkkola2010"], verifieLe: le },
  { id: "pollen", actifId: "pollen", symptome: "bouffees", niveau: "C", doseEssais: "320 mg par jour d'extrait PureCyTonin, pendant 3 mois", conclusion: "Un essai contre placebo chez 64 femmes : 65 % de répondeuses contre 38 % sous placebo. Mais dans la méta-analyse de 2024 (5 études, 420 femmes), l'amélioration n'est plus significative quand on ne garde que les études contrôlées.", sources: ["genazzani2020", "acquarulo2024"], verifieLe: le },
  { id: "safran-bouffees", actifId: "safran", symptome: "bouffees", niveau: "C", doseEssais: "28 à 30 mg par jour", conclusion: "Deux petits essais opposés : gêne réduite dans l'un (60 femmes, 6 semaines), aucune amélioration dans l'autre (86 femmes, 12 semaines).", sources: ["kashani2018", "lopresti2021"], verifieLe: le },
  { id: "vitamine-e", actifId: "vitamine-e", symptome: "bouffees", niveau: "C", doseEssais: "400 à 800 UI par jour", conclusion: "Résultats inconstants et études de qualité faible à modérée, selon une revue de 16 études.", sources: ["feduniw2023"], verifieLe: le },
  { id: "onagre", actifId: "onagre", symptome: "bouffees", niveau: "D", doseEssais: "Variable selon les essais", conclusion: "Pas de différence avec le placebo sur la fréquence ni sur l'intensité des bouffées de chaleur (5 essais, 402 femmes).", sources: ["christelle2020"], verifieLe: le },
  { id: "magnesium", actifId: "magnesium", symptome: "bouffees", niveau: "D", doseEssais: "800 à 1 200 mg d'oxyde de magnésium par jour", conclusion: "Pas de différence avec le placebo dans un essai de 289 femmes ménopausées suivies après un cancer du sein.", sources: ["park2015"], verifieLe: le },
  { id: "omega3", actifId: "omega3", symptome: "bouffees", niveau: "D", doseEssais: "1,8 g par jour pendant 12 semaines", conclusion: "2,5 bouffées de moins par jour, contre 2,7 sous placebo : pas de différence (355 femmes).", sources: ["cohen2014"], verifieLe: le },
  { id: "beta-alanine", actifId: "beta-alanine", symptome: "bouffees", niveau: "D", doseEssais: "Médicament à 400 mg par comprimé", conclusion: "Efficacité qui ne se distingue pas de celle d'un placebo, selon la Haute Autorité de santé. Jugée inefficace par les recommandations françaises de 2021.", sources: ["has2011", "cngof2021"], verifieLe: le },
  { id: "bourrache", actifId: "bourrache", symptome: "bouffees", niveau: "E", doseEssais: "", conclusion: "Aucun essai randomisé trouvé chez des femmes ménopausées.", sources: [], verifieLe: le },
  { id: "creatine-bouffees", actifId: "creatine", symptome: "bouffees", niveau: "E", doseEssais: "750 à 1 500 mg par jour pendant 8 semaines, sans mesure des bouffées de chaleur", conclusion: "Le seul essai mené chez des femmes ménopausées (36 femmes) ne rapporte aucun résultat sur les bouffées de chaleur ni sur le sommeil.", sources: ["korovljev2025"], verifieLe: le },
  // Humeur
  { id: "safran-humeur", actifId: "safran", symptome: "humeur", niveau: "B", doseEssais: "28 à 30 mg par jour, pendant 6 à 12 semaines", conclusion: "Symptômes psychologiques réduits face au placebo dans deux essais (86 et 60 femmes).", sources: ["lopresti2021", "kashani2018"], verifieLe: le },
  { id: "omega3-humeur", actifId: "omega3", symptome: "humeur", niveau: "C", doseEssais: "Variable selon les essais", conclusion: "Preuves jugées non concluantes par une revue de 9 essais. Pas de différence avec le placebo dans le plus grand.", sources: ["iqbal2023", "cohen2014"], verifieLe: le },
  { id: "tryptophane", actifId: "tryptophane", symptome: "humeur", niveau: "E", doseEssais: "", conclusion: "Aucun essai randomisé du tryptophane seul trouvé chez des femmes ménopausées.", sources: [], verifieLe: le },
  // Sommeil
  { id: "melisse", actifId: "melisse", symptome: "sommeil", niveau: "C", doseEssais: "Toujours associée à une autre plante", conclusion: "Deux petits essais, où la mélisse est associée à une autre plante : son effet propre n'est pas isolé.", sources: ["shirazi2021"], verifieLe: le },
  { id: "safran-sommeil", actifId: "safran", symptome: "sommeil", niveau: "E", doseEssais: "28 mg par jour pendant 28 jours, chez des adultes et non chez des femmes ménopausées", conclusion: "Un essai positif chez des adultes qui dorment mal (28 mg par jour, 28 jours), aucun chez des femmes ménopausées.", sources: ["lopresti2020"], verifieLe: le },
  // Symptômes dans leur ensemble
  { id: "fenugrec", actifId: "fenugrec", symptome: "global", niveau: "B", doseEssais: "500 à 1 000 mg d'extrait par jour (600 mg pour l'extrait Libifem)", conclusion: "Scores de symptômes réduits face au placebo dans les essais publiés (88 et 115 femmes), tous financés par les fabricants des extraits.", sources: ["steels2017", "begum2016"], verifieLe: le },
  { id: "ashwagandha", actifId: "ashwagandha", symptome: "global", niveau: "B", doseEssais: "600 mg d'extrait de racine par jour, pendant 8 semaines", conclusion: "Score de symptômes réduit face au placebo dans deux essais (100 et 60 femmes), avec un extrait fourni par son fabricant.", sources: ["gopal2021", "vani2025"], verifieLe: le },
  { id: "maca", actifId: "maca", symptome: "global", niveau: "C", doseEssais: "Variable selon les essais", conclusion: "Quatre petits essais favorables, que les auteurs de la revue jugent trop faibles pour conclure.", sources: ["lee2011"], verifieLe: le },
  { id: "vitamine-d", actifId: "vitamine-d", symptome: "global", niveau: "D", doseEssais: "400 UI par jour, avec 1 000 mg de calcium", conclusion: "Autant de symptômes sous supplément que sous placebo chez 34 157 femmes suivies 5,7 ans en moyenne.", sources: ["leblanc2015"], verifieLe: le },
  { id: "b6", actifId: "b6", symptome: "global", niveau: "E", doseEssais: "", conclusion: "Aucun essai randomisé de la vitamine B6 seule trouvé chez des femmes ménopausées.", sources: [], verifieLe: le },
  // Ballonnements et gaz
  { id: "charbon", actifId: "charbon", symptome: "ballonnements", niveau: "B", doseEssais: "1 g au moins 30 minutes avant le repas et 1 g juste après", conclusion: "Effet sur les flatulences après le repas jugé établi par l'EFSA en 2011 : c'est la seule allégation de santé autorisée contre les gaz. Aucun essai chez des femmes ménopausées.", sources: ["efsaCharbon2011", "reglement432"], verifieLe: le2 },
  { id: "artichaut", actifId: "artichaut", symptome: "ballonnements", niveau: "C", doseEssais: "1 920 mg d'extrait de feuille par jour, pendant 6 semaines", conclusion: "Symptômes digestifs réduits face au placebo dans un essai de 244 personnes souffrant de dyspepsie fonctionnelle (troubles digestifs sans cause trouvée). Un seul grand essai, hors ménopause.", sources: ["holtmann2003"], verifieLe: le2 },
  { id: "menthe-poivree", actifId: "menthe-poivree", symptome: "ballonnements", niveau: "C", doseEssais: "Huile en capsules gastro-résistantes, dose variable selon les essais", conclusion: "Dans l'intestin irritable, symptômes globaux et douleur réduits face au placebo (10 essais, 1 030 personnes), avec des preuves de très faible qualité. Les ballonnements ne sont pas chiffrés à part. Plus d'effets indésirables que sous placebo.", sources: ["ingrosso2022"], verifieLe: le2 },
  { id: "probiotiques", actifId: "probiotiques", symptome: "ballonnements", niveau: "C", doseEssais: "Variable selon les souches", conclusion: "Dans l'intestin irritable (82 essais, 10 332 personnes), certains mélanges de souches réduisent les ballonnements, avec une très faible certitude. Le résultat dépend de la souche : il ne se transpose pas d'un produit à l'autre.", sources: ["goodoory2023"], verifieLe: le2 },
  // Force musculaire : ce n'est pas un symptôme de la ménopause, mais l'argument revient souvent.
  { id: "creatine-force", actifId: "creatine", symptome: "force", niveau: "B", doseEssais: "Avec un entraînement en résistance d'au moins 24 semaines", conclusion: "Force augmentée chez des femmes ménopausées ou âgées qui s'entraînent. Aucun effet sur la masse musculaire.", sources: ["dossantos2021"], verifieLe: le },
];

const ordre: Niveau[] = ["A", "B", "C", "D", "E"];

export function rangNiveau(n: Niveau): number {
  return ordre.indexOf(n);
}

/** Les lignes de preuve d'un actif, la meilleure d'abord. */
export function preuvesDe(actifId: string, parmi?: Symptome[]): Preuve[] {
  return preuves
    .filter((p) => p.actifId === actifId && (!parmi || parmi.includes(p.symptome)))
    .sort((a, b) => rangNiveau(a.niveau) - rangNiveau(b.niveau));
}

/** « Taku et al., 2012 · Revue Cochrane, 2013 » */
export function mentionSources(p: Preuve): string {
  return p.sources.map((id) => `${sources[id].court}, ${sources[id].annee}`).join(" · ");
}

/** Toutes les sources citées par les preuves et les mises en garde, plus les textes de référence du site. */
export function sourcesCitees(): Source[] {
  const ids = new Set<string>(["greendale2019", "davis2012", "efsaGlucomannane2010", "nice2011", "has2025", "menopauseSociety2023", "efsa2012", "efsa2015", "anses2025", "reglement432", "nutrivigilance", "dgal"]);
  for (const p of preuves) for (const id of p.sources) ids.add(id);
  for (const a of Object.values(actifs)) for (const id of a.sourcesVigilance ?? []) ids.add(id);
  return [...ids].map((id) => sources[id]);
}

export const libellesTypes: Record<TypeSource, string> = {
  autorite: "Autorités de santé",
  societe: "Sociétés savantes",
  revue: "Revues systématiques et méta-analyses",
  essai: "Essais randomisés",
  observation: "Études d'observation",
  reglement: "Textes réglementaires",
};
