"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sujetDe, sujetsPublies } from "@/data/site";

/** Bande des sujets, sous le menu, sur toutes les pages. Défile horizontalement sur mobile. */
export function BandeSujets() {
  const chemin = usePathname() ?? "/";
  const actif = sujetDe(chemin.endsWith("/") ? chemin : `${chemin}/`);
  return (
    <nav aria-label="Sujets" className="border-b border-trait bg-fond">
      <div className="conteneur flex items-center gap-2 overflow-x-auto py-2 [scrollbar-width:none]">
        <span className="surtitre mr-1 shrink-0 !text-[12px]">Sujets</span>
        {sujetsPublies.map((s) => {
          const estActif = s.id === actif;
          return (
            <Link
              key={s.id}
              href={s.pages[0].chemin}
              aria-current={estActif ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-[15px] transition-colors ${
                estActif ? "border-foret bg-foret text-white" : "border-trait bg-white hover:bg-sauge"
              }`}
            >
              {s.nom}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
