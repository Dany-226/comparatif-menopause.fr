import { actifs, preuves, rangNiveau } from "../data/preuves.ts";

/** Adresse lisible d'un actif : « Actée à grappes » -> « actee-a-grappes ». */
export function slugActif(id: string): string {
  return actifs[id].nom
    .replace(/\(.*?\)/g, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Actifs exclus : la génistéine est traitée avec les isoflavones de soja. */
const exclus = new Set(["genisteine"]);

/**
 * Un actif a sa page dès qu'il a au moins une ligne de preuve au-delà de « aucun essai » (niveau E).
 * Sans cela, la page n'aurait rien à dire.
 */
export const actifsAvecPage: string[] = Object.keys(actifs)
  .filter((id) => !exclus.has(id))
  .filter((id) => preuves.some((p) => p.actifId === id && p.niveau !== "E"))
  .sort((a, b) => actifs[a].nom.localeCompare(actifs[b].nom, "fr"));

export const cheminActif = (id: string) => `/actifs/${slugActif(id)}/`;

export function lienActif(id: string): string | undefined {
  return actifsAvecPage.includes(id) ? cheminActif(id) : undefined;
}

export function actifDuSlug(slug: string): string | undefined {
  return actifsAvecPage.find((id) => slugActif(id) === slug);
}

/** Lignes de preuve d'un actif, la meilleure d'abord. */
export function lignesActif(id: string) {
  return preuves.filter((p) => p.actifId === id).sort((a, b) => rangNiveau(a.niveau) - rangNiveau(b.niveau));
}
