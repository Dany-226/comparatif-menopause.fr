import { avisDe, cheminAvis } from "../data/avis.ts";
import { comparatifs, pilier } from "../data/site.ts";

/**
 * Adresse d'un produit partout où son nom est cliquable :
 * sa page d'avis quand elle est publiée, sinon sa fiche dans son comparatif.
 * `base` vaut "" sur la page du comparatif elle-même (ancre dans la page).
 */
export function lienProduit(p: { id: string; usage?: string }, base?: string): string {
  const avis = avisDe(p.id);
  if (avis) return cheminAvis(avis);
  const page = base ?? comparatifs.find((c) => c.usage === p.usage && c.publiee)?.chemin ?? pilier;
  return `${page}#${p.id}`;
}
