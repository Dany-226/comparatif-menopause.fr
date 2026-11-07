/**
 * Après `next build` : insère dans le <head> de chaque page HTML de `out/` les balises
 * de vérification qu'un tiers exige à l'identique, guillemets compris.
 * React réécrit les attributs (guillemets doubles, « /> ») : certains robots de
 * vérification cherchent la chaîne exacte et échouent sur la version réécrite.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const balises = [
  // impact.com, chaîne fournie par la régie le 7 novembre 2026 (second code, 17 h 40).
  "<meta name='impact-site-verification' value='bf855711-b0ce-4535-bf1e-cdaf99fa5057'>",
];

const racine = join(process.cwd(), "out");
let n = 0;
function parcourir(dossier) {
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) parcourir(chemin);
    else if (nom.endsWith(".html")) {
      const html = readFileSync(chemin, "utf8");
      const manquantes = balises.filter((b) => !html.includes(b));
      if (manquantes.length === 0 || !html.includes("<head>")) continue;
      writeFileSync(chemin, html.replace("<head>", `<head>${manquantes.join("")}`));
      n++;
    }
  }
}
parcourir(racine);
console.log(`Balises de vérification insérées dans ${n} page(s).`);
