/**
 * Contrôles de conformité, lancés avant chaque construction du site.
 *
 *   npm run verifier          les erreurs bloquent, les avertissements s'affichent
 *   npm run verifier:strict   les avertissements bloquent aussi (mise en ligne)
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { produits } from "../data/produits.ts";
import { photosProduits } from "../data/photos-produits.ts";
import { actifs, preuves, sources } from "../data/preuves.ts";
import { comparatifs, legal, pagesInstitutionnelles, pagesReference } from "../data/site.ts";
import { ageReleve } from "../lib/score.ts";

const racine = fileURLToPath(new URL("..", import.meta.url));
const strict = process.argv.includes("--strict");
const erreurs = [];
const avertissements = [];

/** Âge maximal d'un relevé de prix, en jours. */
const AGE_MAX = 90;

/**
 * Formules interdites dans les textes du site. Chaque règle dit pourquoi.
 * Sources : avis HAS de septembre 2025, règlement (CE) n° 1924/2006.
 */
const interdits = [
  [/alternative naturelle/i, "présente un complément comme le substitut d'un traitement"],
  [/sans (les )?risques? des hormones/i, "utilise les risques d'un traitement comme argument"],
  [/aussi efficace qu/i, "comparaison d'efficacité avec un médicament"],
  [/(reconnu|valid[ée]|recommand[ée])e?s? par la (HAS|Haute Autorité)/i, "la HAS n'évalue aucun complément"],
  [/\b(soigne|soignent|guérit|guérissent|guérir)\b/i, "allégation thérapeutique"],
  [/\b(traite|traitent) (la|les|le|vos|votre)\b/i, "allégation thérapeutique"],
  [/rééquilibr\w+ hormonal/i, "notion non étayée"],
  [/équilibre hormonal/i, "notion non étayée"],
  [/cliniquement prouvé|prouvé cliniquement|scientifiquement prouvé/i, "promesse de preuve"],
  [/\bmiracle|\bgaranti(e|s|es)?\b|100 ?% (efficace|naturel)/i, "promesse de résultat"],
  [/(perdre|perdez|perte de) \d+ ?(kg|kilos?)/i, "rythme ou importance d'une perte de poids"],
  [/\d+ ?(kg|kilos?) en \d+/i, "rythme ou importance d'une perte de poids"],
  [/recommandé par (les|des|votre) (médecins?|gynécologues?|pharmaciens?)/i, "recommandation d'un professionnel de santé"],
  [/sans effets? (secondaires?|indésirables?)/i, "promesse d'innocuité"],
];

function fichiers(dossier) {
  const liste = [];
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) liste.push(...fichiers(chemin));
    else if (/\.(tsx?|mdx?)$/.test(nom)) liste.push(chemin);
  }
  return liste;
}

// 1. Formules interdites dans les pages, les composants et les données.
for (const dossier of ["app", "components", "data"]) {
  for (const chemin of fichiers(join(racine, dossier))) {
    const lignes = readFileSync(chemin, "utf8").split("\n");
    lignes.forEach((ligne, i) => {
      for (const [motif, raison] of interdits) {
        const trouve = ligne.match(motif);
        if (trouve) erreurs.push(`${relative(racine, chemin)}:${i + 1} « ${trouve[0]} » : ${raison}`);
      }
    });
  }
}

// 2. Seul LienMarchand a le droit de créer un lien vers un marchand.
for (const dossier of ["app", "components"]) {
  for (const chemin of fichiers(join(racine, dossier))) {
    if (chemin.endsWith("LienMarchand.tsx")) continue;
    if (/sponsored|data-marchand=/.test(readFileSync(chemin, "utf8"))) {
      erreurs.push(`${relative(racine, chemin)} crée un lien marchand sans passer par LienMarchand`);
    }
  }
}

// 3. Produits : source, prix daté et récent, données complètes.
const aujourdHui = new Date();
const ids = new Set();
const usagesPublies = comparatifs.filter((c) => c.publiee && c.usage).map((c) => c.usage);
for (const p of produits) {
  // Les points « à traiter » ne concernent que les produits des comparatifs publiés.
  const enLigne = usagesPublies.includes(p.usage);
  if (ids.has(p.id)) erreurs.push(`${p.id} : identifiant en double`);
  ids.add(p.id);
  if (p.sources.length === 0) erreurs.push(`${p.nom} : aucune source`);
  if (!p.composition.trim()) erreurs.push(`${p.nom} : composition vide`);
  if (!(p.jours > 0) || !(p.prix > 0)) erreurs.push(`${p.nom} : prix ou durée invalide`);
  if (p.marchands.length === 0) erreurs.push(`${p.nom} : aucun marchand`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.prixReleveLe)) {
    erreurs.push(`${p.nom} : date de relevé du prix absente ou mal écrite`);
  } else {
    const age = ageReleve(p.prixReleveLe, aujourdHui);
    if (age > AGE_MAX) erreurs.push(`${p.nom} : prix relevé il y a ${age} jours (maximum ${AGE_MAX})`);
    else if (age > AGE_MAX - 15) avertissements.push(`${p.nom} : prix à relever avant ${AGE_MAX - age} jours`);
  }
  for (const a of p.actifs) {
    if (!actifs[a.id]) erreurs.push(`${p.nom} : actif « ${a.id} » absent de data/preuves.ts`);
  }
  if (p.marchands[0].prix !== p.prix) erreurs.push(`${p.nom} : le prix affiché n'est pas celui du premier marchand`);
  const moinsCher = Math.min(...p.marchands.map((m) => m.prix));
  if (p.prix > moinsCher * 1.01) erreurs.push(`${p.nom} : un marchand moins cher est relevé (${moinsCher} €)`);
  for (const m of p.marchands) {
    if (!m.url) enLigne && avertissements.push(`${p.nom} : adresse de l'offre manquante (${m.nom})`);
    else if (!/^https:\/\//.test(m.url)) erreurs.push(`${p.nom} : l'adresse de l'offre doit commencer par https://`);
  }
  if (enLigne) for (const r of p.reserves) avertissements.push(`${p.nom} : ${r}`);
  if (enLigne && p.sources.some((s) => !s.url)) avertissements.push(`${p.nom} : source sans adresse`);
}

// 4. Preuves : chaque ligne a un actif connu, une source connue (sauf niveau E) et une date de vérification.
for (const p of preuves) {
  if (!actifs[p.actifId]) erreurs.push(`Preuve « ${p.id} » : actif inconnu`);
  if (p.niveau !== "E" && p.sources.length === 0) erreurs.push(`Preuve « ${p.id} » : aucune source`);
  for (const s of p.sources) if (!sources[s]) erreurs.push(`Preuve « ${p.id} » : source inconnue « ${s} »`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.verifieLe)) erreurs.push(`Preuve « ${p.id} » : date de vérification absente`);
}
for (const s of Object.values(sources)) {
  if (!/^https:\/\//.test(s.url)) erreurs.push(`Source « ${s.titre} » : adresse absente`);
}

// 5. Chaque page publiée existe, chaque page présente est déclarée.
for (const p of [...comparatifs, ...pagesReference, ...pagesInstitutionnelles]) {
  const fichier = join(racine, "app", p.chemin, "page.tsx");
  if (p.publiee && !existsSync(fichier)) erreurs.push(`${p.chemin} est marquée publiée mais n'a pas de page`);
  if (!p.publiee && existsSync(fichier)) erreurs.push(`${p.chemin} a une page mais n'est pas marquée publiée`);
}

// 5 bis. Photos de produits : fichiers présents, origine admise, crédit renseigné.
for (const [id, photo] of Object.entries(photosProduits)) {
  if (!ids.has(id)) erreurs.push(`Photo de produit « ${id} » : aucun produit ne porte cet identifiant`);
  for (const taille of [400, 800]) {
    if (!existsSync(join(racine, "public/produits", `${id}-${taille}.webp`)))
      erreurs.push(`Photo de produit « ${id} » : fichier public/produits/${id}-${taille}.webp absent`);
  }
  if (!["maison", "marque", "regie", "marchand"].includes(photo.origine)) erreurs.push(`Photo de produit « ${id} » : origine inconnue`);
  if (!photo.credit?.trim()) erreurs.push(`Photo de produit « ${id} » : crédit vide (qui a fourni l'image, et quand)`);
  if (!photo.alt?.trim()) erreurs.push(`Photo de produit « ${id} » : texte alternatif vide`);
}

// 6. Mentions légales complètes.
for (const l of Object.values(legal)) {
  if (!l.valeur) avertissements.push(`Mentions légales : « ${l.libelle} » à compléter dans data/site.ts`);
}

if (avertissements.length > 0) {
  console.log(`\n${avertissements.length} point(s) à traiter avant la mise en ligne :`);
  for (const a of avertissements) console.log(`  · ${a}`);
}
if (erreurs.length > 0) {
  console.log(`\n${erreurs.length} erreur(s) :`);
  for (const e of erreurs) console.log(`  ✗ ${e}`);
}
if (erreurs.length > 0 || (strict && avertissements.length > 0)) {
  console.log(strict ? "\nConstruction stricte refusée.\n" : "\nConstruction refusée.\n");
  process.exit(1);
}
console.log(`\nConformité : ${produits.length} produits, ${preuves.length} preuves, aucune erreur.\n`);
