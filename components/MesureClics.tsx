"use client";

import { useEffect } from "react";

/**
 * Compte les clics vers les marchands. N'envoie rien tant qu'aucun outil de
 * mesure n'est installé : il suffit ensuite que l'outil expose window.plausible
 * ou window.dataLayer.
 */
export function MesureClics() {
  useEffect(() => {
    function surClic(e: MouseEvent) {
      const lien = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[data-marchand]");
      if (!lien) return;
      const props = {
        produit: lien.dataset.produit ?? "",
        marchand: lien.dataset.marchand ?? "",
        emplacement: lien.dataset.emplacement ?? "",
        page: window.location.pathname,
      };
      const w = window as unknown as {
        plausible?: (nom: string, options: { props: Record<string, string> }) => void;
        dataLayer?: unknown[];
      };
      w.plausible?.("Clic marchand", { props });
      w.dataLayer?.push({ event: "clic_marchand", ...props });
    }
    document.addEventListener("click", surClic);
    return () => document.removeEventListener("click", surClic);
  }, []);
  return null;
}
