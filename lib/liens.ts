import { avisDe, cheminAvis } from "../data/avis.ts";
import { pilier } from "../data/site.ts";

/**
 * Adresse d'un produit partout où son nom est cliquable :
 * sa page d'avis quand elle est publiée, sinon sa fiche dans le comparatif.
 * `base` vaut "" sur la page du comparatif elle-même (ancre dans la page).
 */
export function lienProduit(p: { id: string }, base: string = pilier): string {
  const avis = avisDe(p.id);
  return avis ? cheminAvis(avis) : `${base}#${p.id}`;
}
