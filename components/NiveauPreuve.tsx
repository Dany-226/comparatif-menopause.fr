import type { Niveau } from "@/data/preuves";
import { niveaux } from "@/data/preuves";

const fonds: Record<Niveau, string> = {
  A: "bg-citron",
  B: "bg-preuve-b",
  C: "bg-pale",
  D: "bg-preuve-d",
  E: "",
};

/** Pastille carrée d'un niveau de preuve, de A à E. */
export function NiveauPreuve({
  niveau,
  grand = false,
  surSombre = false,
}: {
  niveau: Niveau;
  grand?: boolean;
  surSombre?: boolean;
}) {
  const taille = grand ? "size-12 rounded-[14px] text-[22px]" : "size-[34px] rounded-[10px] text-[17px]";
  const style =
    niveau === "E"
      ? `border-[1.5px] border-dashed ${surSombre ? "border-pale text-white" : "border-pointille text-encre"}`
      : `${fonds[niveau]} text-encre`;
  return (
    <span className={`inline-flex shrink-0 items-center justify-center font-bold ${taille} ${style}`}>
      <span aria-hidden="true">{niveau}</span>
      <span className="sr-only">
        Niveau {niveau} : {niveaux[niveau].titre}
      </span>
    </span>
  );
}
