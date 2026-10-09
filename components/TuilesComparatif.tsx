import Link from "next/link";
import type { ProduitClasse } from "@/lib/score";
import { noteMax } from "@/lib/score";
import type { NomPhoto } from "@/data/photos";
import { dateLongue, prix } from "@/lib/format";
import { FlecheBas, FlecheDroite } from "./Icones";
import { NiveauPreuve } from "./NiveauPreuve";
import { Photo } from "./Photo";

export type Pastille = { libelle: string; href: string };

const inclinaisons = ["-rotate-[7deg]", "self-end rotate-[5deg]", "-rotate-[4deg]", "self-center rotate-[6deg]"];

/** Les quatre tuiles sous le titre d'un comparatif. */
export function TuilesComparatif({
  premier,
  nombre,
  nombreSources,
  prixReleveLe,
  photo,
  photoPosition,
  titrePastilles,
  pastilles,
}: {
  premier: ProduitClasse;
  nombre: number;
  nombreSources: number;
  prixReleveLe: string;
  photo: NomPhoto;
  photoPosition?: string;
  titrePastilles: string;
  pastilles: Pastille[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-[1fr_2fr_1.3fr_1fr]">
      <div className="flex min-h-[196px] flex-col justify-between gap-4 rounded-[22px] bg-citron p-4 md:rounded-[28px] md:p-6 lg:min-h-[360px]">
        <div className="etiquette">Le comparatif</div>
        <div>
          <div className="text-[76px] font-normal leading-[0.9] tracking-[-0.05em] lg:text-[120px]">{nombre}</div>
          <div className="mt-2 text-[15px] font-medium leading-[1.3] lg:text-[19px]">
            formules comparées, {nombreSources} sources publiées citées
          </div>
        </div>
        <div className="hidden border-t-[1.5px] border-encre pt-3.5 text-[15px] lg:block">
          Prix relevés le {dateLongue(prixReleveLe)}
        </div>
      </div>

      <div className="order-3 col-span-2 flex flex-col gap-3.5 rounded-[22px] border border-trait bg-white p-4 md:gap-[18px] md:rounded-[28px] md:p-6 lg:order-2 lg:col-span-1 lg:min-h-[360px]">
        <div className="flex items-center justify-between gap-3">
          <div className="etiquette">N° 1 · meilleure note</div>
          <a
            href={`#${premier.id}`}
            aria-label={`Voir la fiche de ${premier.nom}`}
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-encre transition-transform hover:translate-x-0.5"
          >
            <FlecheDroite couleur="#FFFFFF" />
          </a>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
          <div className="text-[24px] font-medium leading-[1.1] tracking-[-0.02em] md:text-[32px]">{premier.nom}</div>
          <div className="flex items-baseline gap-[18px] text-[16px] text-doux md:text-[17px]">
            <span>
              <strong className="text-[28px] font-semibold text-encre md:text-[30px]">{premier.note}</strong>/{noteMax}
            </span>
            <span>
              <strong className="text-[20px] font-semibold text-encre md:text-[22px]">{prix(premier.parJour)}</strong> par
              jour
            </span>
          </div>
        </div>
        <div className="relative min-h-[170px] flex-auto overflow-hidden rounded-2xl bg-photo md:min-h-[190px] md:rounded-[20px]">
          <Photo
            nom={photo}
            sizes="(min-width: 1024px) 430px, 100vw"
            prioritaire
            position={photoPosition}
            className="absolute inset-0"
          />
        </div>
      </div>

      <nav
        aria-label={titrePastilles}
        className="order-2 flex min-h-[196px] flex-col gap-3 rounded-[22px] bg-ciel px-3 py-4 md:gap-[22px] md:rounded-[28px] md:p-6 lg:order-3 lg:min-h-[360px]"
      >
        <div className="etiquette ml-1 md:ml-0">{titrePastilles}</div>
        <div className="flex flex-auto flex-col items-start justify-center gap-2.5 md:gap-4">
          {pastilles.slice(0, 4).map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-white px-3.5 text-[15px] font-medium transition-transform hover:scale-[1.04] md:min-h-12 md:px-4 md:text-[17px] ${inclinaisons[i]} ${i === 3 ? "max-md:hidden" : ""}`}
            >
              {p.libelle}
            </Link>
          ))}
        </div>
      </nav>

      <div className="sombre order-4 col-span-2 flex flex-col justify-between gap-4 rounded-[22px] bg-foret p-4 text-white md:rounded-[28px] md:p-6 lg:col-span-1 lg:min-h-[360px] lg:gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="etiquette text-citron">Preuves</div>
          <a
            href="#preuves"
            aria-label="Lire ce que disent les études"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-citron transition-transform hover:translate-y-0.5"
          >
            <FlecheBas couleur="#14241B" />
          </a>
        </div>
        <div className="text-[21px] font-normal leading-[1.2] tracking-[-0.015em] lg:text-[25px]">
          Chaque actif reçoit un niveau de preuve
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {(["A", "B", "C", "D", "E"] as const).map((n) => (
            <NiveauPreuve key={n} niveau={n} surSombre />
          ))}
        </div>
      </div>
    </div>
  );
}
