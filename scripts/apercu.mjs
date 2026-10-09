/**
 * Fabrique un aperçu du site sans JavaScript et en chemins relatifs, dans apercu/.
 * Sert à montrer le site entier hors de son domaine (page partagée, clé USB, pièce jointe).
 * À lancer après next build :  npm run apercu
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("..", import.meta.url));
const out = join(racine, "out");
const cible = join(racine, "apercu");

/** Adresse du site → nom du fichier dans l'aperçu. */
const pages = {
  "/": "index.html",
  "/meilleur-complement-alimentaire-menopause/": "comparatif.html",
  "/preuves-complements-menopause/": "preuves.html",
  "/comment-nous-classons/": "methode.html",
  "/politique-affiliation/": "affiliation.html",
  "/a-propos/": "a-propos.html",
  "/mentions-legales/": "mentions-legales.html",
};

rmSync(cible, { recursive: true, force: true });
mkdirSync(join(cible, "fonts"), { recursive: true });
cpSync(join(out, "photos"), join(cible, "photos"), { recursive: true });
if (existsSync(join(out, "produits"))) cpSync(join(out, "produits"), join(cible, "produits"), { recursive: true });

// Feuille de style : une seule, avec les polices à côté.
const dossierCss = join(out, "_next/static/chunks");
let css = readdirSync(dossierCss)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(dossierCss, f), "utf8"))
  .join("\n");
for (const police of readdirSync(join(out, "_next/static/media"))) {
  cpSync(join(out, "_next/static/media", police), join(cible, "fonts", police));
}
css = css.replace(/url\((["']?)[^)"']*\/media\/([^)"']+)\1\)/g, "url(fonts/$2)");
writeFileSync(join(cible, "site.css"), css);

function relatif(html) {
  return html
    .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/g, (bloc, attributs) => (attributs.includes("application/ld+json") ? bloc : ""))
    .replace(/<link[^>]*rel="preload"[^>]*>/g, "")
    .replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (tout, chemin, ancre = "") =>
      pages[chemin] ? `href="${pages[chemin]}${ancre}"` : tout,
    )
    .replace(/(src|srcSet|srcset)="([^"]*)"/g, (tout, attribut, valeur) =>
      `${attribut}="${valeur.replace(/(^|,\s*)\/(photos|produits)\//g, "$1$2/")}"`,
    );
}

for (const [chemin, fichier] of Object.entries(pages)) {
  const html = readFileSync(join(out, chemin, "index.html"), "utf8");
  const titre = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const corps = relatif(html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1]);
  writeFileSync(
    join(cible, fichier),
    `<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${titre}</title>\n<link rel="stylesheet" href="site.css">\n</head>\n<body>\n${corps}\n</body>\n</html>\n`,
  );
}

/*
 * Version en une seule page, pour les visionneuses qui interdisent de passer d'un fichier à l'autre.
 * Les six pages sont dans le même document. Les liens sont des ancres (#comparatif, #methode…) :
 * sans JavaScript, la règle CSS :target affiche la page visée ; avec JavaScript, un petit script
 * fait la même chose et remonte en haut de page.
 */
const sansScript = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const jeton = (fichier) => (fichier === "index.html" ? "accueil" : fichier.replace(".html", ""));
const extraire = (html, motif) => html.match(motif)?.[1] ?? html.match(motif)?.[0] ?? "";

/**
 * Dans la version en une page, chaque identifiant porte le nom de sa page (« comparatif--classement »),
 * pour que deux pages puissent avoir une section « sources » sans se marcher dessus.
 */
function enAncres(html, page) {
  return html
    .replace(/ id="([^"]+)"/g, (tout, id) => ` id="${page}--${id}"`)
    .replace(/href="#([^"]+)"/g, (tout, id) => `href="#${page}--${id}"`)
    .replace(/href="([a-z-]+\.html)(?:#([^"]*))?"/g, (tout, fichier, ancre) =>
      ancre ? `href="#${jeton(fichier)}--${ancre}"` : `href="#${jeton(fichier)}"`,
    );
}

const accueil = enAncres(sansScript(relatif(readFileSync(join(out, "index.html"), "utf8"))), "accueil");
const entete = extraire(accueil, /<header[\s\S]*?<\/header>/);
const pied = extraire(accueil, /<footer[\s\S]*<\/footer>/);
const sections = Object.entries(pages)
  .map(([chemin, fichier]) => {
    const html = enAncres(sansScript(relatif(readFileSync(join(out, chemin, "index.html"), "utf8"))), jeton(fichier));
    const contenu = extraire(html, /<main[^>]*>([\s\S]*)<\/main>/);
    return `<div data-page id="${jeton(fichier)}">${contenu}</div>`;
  })
  .join("\n");

const base = `
body{background:#f2f5ea;color:#14241b;font-family:"Hanken Grotesk Variable","Hanken Grotesk",system-ui,sans-serif;font-size:17px;line-height:1.55}
@media (min-width:768px){body{font-size:18px}}
[data-page]{scroll-margin-top:200px}
main[data-sans-script] [data-page]{display:none}
main[data-sans-script] [data-page]:target,main[data-sans-script] [data-page]:has(:target){display:block}
main[data-sans-script]:not(:has([data-page]:target)):not(:has([data-page] :target)) #accueil{display:block}
`;
const navigation = `
(function () {
  var principal = document.querySelector("main[data-sans-script]");
  var pages = Array.prototype.slice.call(document.querySelectorAll("[data-page]"));
  var courante = null;
  function montrer(id, defiler) {
    var el = document.getElementById(id);
    if (!el) return false;
    var page = el.closest("[data-page]");
    if (!page) return false;
    var memePage = courante === page;
    pages.forEach(function (p) { p.hidden = p !== page; });
    courante = page;
    document.querySelectorAll("header details[open]").forEach(function (d) { d.open = false; });
    if (defiler === false) return true;
    if (el === page) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    else el.scrollIntoView({ behavior: memePage ? "smooth" : "instant" });
    return true;
  }
  var depart = "";
  try { depart = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
  if (!montrer(depart)) montrer("accueil", false);
  principal.removeAttribute("data-sans-script");
  document.addEventListener("click", function (e) {
    var lien = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!lien) return;
    var id = lien.getAttribute("href").slice(1);
    if (id.endsWith("--contenu")) return;
    e.preventDefault();
    montrer(id);
  });
  window.addEventListener("hashchange", function () {
    try { montrer(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
  });
})();
`;
writeFileSync(
  join(cible, "site-complet.html"),
  `<title>Comparatif Ménopause</title>\n<style>\n${css}\n${base}</style>\n${entete}\n<main id="contenu" data-sans-script>\n${sections}\n</main>\n${pied}\n<script>${navigation}</script>\n`,
);
console.log(`Aperçu écrit dans apercu/ : ${Object.keys(pages).length} pages séparées, plus site-complet.html (tout le site en une page).`);
