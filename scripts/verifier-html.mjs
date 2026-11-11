/**
 * Contrôles sur le site construit (dossier out/), lancés après next build.
 * Une page publiée doit être indexable, avoir un titre, une description,
 * une adresse canonique, un seul titre de niveau 1 et des liens marchands bien marqués.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { comparatifs, pagesInstitutionnelles, pagesReference, site } from "../data/site.ts";

const out = fileURLToPath(new URL("../out", import.meta.url));
const erreurs = [];

if (!existsSync(out)) {
  console.log("Dossier out/ introuvable : lancez d'abord next build.");
  process.exit(1);
}

function pages(dossier) {
  const liste = [];
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) {
      if (nom !== "_next") liste.push(...pages(chemin));
    } else if (nom === "index.html") liste.push(chemin);
  }
  return liste;
}

/** Les apostrophes et les esperluettes sont encodées dans le HTML : on les décode avant de compter. */
function decoder(texte) {
  return texte.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
}

const trouvees = pages(out);
const canoniques = new Set();

for (const fichier of trouvees) {
  const nom = "/" + relative(out, fichier).replace(/index\.html$/, "");
  if (nom.startsWith("/404") || nom.startsWith("/_not-found")) continue;
  const html = readFileSync(fichier, "utf8");

  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) erreurs.push(`${nom} : page marquée noindex`);

  const titre = decoder(html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ?? "");
  if (!titre) erreurs.push(`${nom} : titre absent`);
  else if (titre.length > 70) erreurs.push(`${nom} : titre trop long (${titre.length} caractères)`);

  const description = decoder(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  if (!description) erreurs.push(`${nom} : description absente`);
  else if (description.length > 200) erreurs.push(`${nom} : description trop longue (${description.length} caractères)`);

  const canonique = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!canonique) erreurs.push(`${nom} : adresse canonique absente`);
  else {
    if (canonique !== `${site.url}${nom}`) erreurs.push(`${nom} : adresse canonique inattendue (${canonique})`);
    if (canoniques.has(canonique)) erreurs.push(`${nom} : adresse canonique en double`);
    canoniques.add(canonique);
  }

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) erreurs.push(`${nom} : ${h1} titres de niveau 1 (un seul attendu)`);

  for (const lien of html.match(/<a [^>]*data-marchand[^>]*>/g) ?? []) {
    if (!/rel="[^"]*nofollow/.test(lien)) erreurs.push(`${nom} : lien marchand sans rel="nofollow"`);
    if (!/target="_blank"/.test(lien)) erreurs.push(`${nom} : lien marchand qui ne s'ouvre pas dans un nouvel onglet`);
  }

  // Liens internes : chaque adresse citée doit exister dans le site construit, et aucun lien
  // écrit « [texte](/chemin/) » dans les données ne doit rester visible tel quel.
  for (const [, cible] of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
    if (cible.startsWith("/_next")) continue;
    const fichierCible = cible.endsWith("/") ? join(out, cible, "index.html") : join(out, cible);
    if (!existsSync(fichierCible)) erreurs.push(`${nom} : lien interne vers ${cible}, page introuvable`);
  }
  if (/\]\(\//.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) erreurs.push(`${nom} : lien écrit [texte](/chemin/) non transformé`);

  for (const image of html.match(/<img [^>]*>/g) ?? []) {
    if (!/ alt="/.test(image)) erreurs.push(`${nom} : image sans texte alternatif`);
  }
}

// Chaque page publiée est construite et figure dans le plan du site.
const plan = existsSync(join(out, "sitemap.xml")) ? readFileSync(join(out, "sitemap.xml"), "utf8") : "";
if (!plan) erreurs.push("sitemap.xml absent");
for (const p of [...comparatifs, ...pagesReference, ...pagesInstitutionnelles]) {
  const construite = existsSync(join(out, p.chemin, "index.html"));
  if (p.publiee && !construite) erreurs.push(`${p.chemin} : page publiée non construite`);
  if (p.publiee && !plan.includes(`${site.url}${p.chemin}`)) erreurs.push(`${p.chemin} : absente du plan du site`);
  if (!p.publiee && plan.includes(`${site.url}${p.chemin}`)) erreurs.push(`${p.chemin} : non publiée mais présente dans le plan du site`);
}

if (erreurs.length > 0) {
  console.log(`\n${erreurs.length} erreur(s) dans le site construit :`);
  for (const e of erreurs) console.log(`  ✗ ${e}`);
  console.log("");
  process.exit(1);
}
console.log(`\nSite construit : ${trouvees.length} pages contrôlées, aucune erreur.\n`);
