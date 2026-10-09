import type { Marchand } from "../data/produits.ts";

/** « chez Redcare Pharmacie », « sur le site de la marque ». */
export function ou(m: Marchand): string {
  if (m.nom === "Site de la marque") return "sur le site de la marque";
  if (m.nom === "Pharmacie en ligne") return "en pharmacie en ligne";
  return `chez ${m.nom}`;
}

/** Mention affichée sous un bouton d'offre. */
export function mention(m: Marchand): string {
  if (!m.url) return `${ou(m)} · lien à venir`;
  return m.remunere ? `${ou(m)} · lien rémunéré` : ou(m);
}
