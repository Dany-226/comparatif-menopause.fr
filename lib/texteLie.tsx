import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Liens dans les textes éditoriaux, écrits « [texte du lien](/chemin/) ».
 * Seuls les chemins internes sont acceptés : un lien marchand passe toujours par LienMarchand.
 */
const motif = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Le texte avec ses liens, pour l'affichage. */
export function TexteLie({ texte }: { texte: string }) {
  const morceaux: ReactNode[] = [];
  let dernier = 0;
  for (const m of texte.matchAll(motif)) {
    const debut = m.index ?? 0;
    if (debut > dernier) morceaux.push(texte.slice(dernier, debut));
    morceaux.push(
      <Link key={debut} href={m[2]} className="lien">
        {m[1]}
      </Link>,
    );
    dernier = debut + m[0].length;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return <>{morceaux}</>;
}

/** Le même texte sans la syntaxe des liens, pour les données structurées et les métadonnées. */
export function texteBrut(texte: string): string {
  return texte.replace(motif, "$1");
}

/** Les chemins cités dans un texte, pour les contrôles. */
export function cheminsCites(texte: string): string[] {
  return [...texte.matchAll(motif)].map((m) => m[2]);
}
