import { photosProduits } from "@/data/photos-produits";

type Forme = "gelule" | "comprime" | "capsule";

function forme(format: string): Forme {
  if (/comprim/i.test(format)) return "comprime";
  if (/capsule/i.test(format)) return "capsule";
  return "gelule";
}

const fonds: Record<Forme, string> = { gelule: "bg-sauge", comprime: "bg-ciel", capsule: "bg-preuve-d" };

/** La forme de la prise, dessinée : une gélule, un comprimé ou une capsule molle. */
function Dessin({ f }: { f: Forme }) {
  const trait = { stroke: "var(--color-foret)", strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 64 64" className="size-[72%]" aria-hidden="true" focusable="false">
      {f === "gelule" && (
        <g transform="rotate(-38 32 32)">
          <rect x="9" y="21" width="46" height="22" rx="11" fill="#fff" {...trait} />
          <path d="M32 21H20a11 11 0 0 0 0 22h12Z" fill="var(--color-foret)" {...trait} />
          <path d="M38 27h8" stroke="var(--color-trait)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {f === "comprime" && (
        <g>
          <ellipse cx="32" cy="37" rx="21" ry="17" fill="var(--color-foret)" />
          <ellipse cx="32" cy="30" rx="21" ry="17" fill="#fff" {...trait} />
          <path d="M17 24.5 47 35.5" {...trait} fill="none" />
        </g>
      )}
      {f === "capsule" && (
        <g transform="rotate(-24 32 32)">
          <ellipse cx="32" cy="32" rx="24" ry="14" fill="var(--color-citron)" {...trait} />
          <path d="M18 27c5-4 12-5 19-4" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
}

/**
 * Le visuel d'un produit : sa photo quand elle existe (data/photos-produits.ts),
 * sinon une vignette dessinée. `rang` pose la pastille de rang sur le coin.
 */
export function VisuelProduit({
  id,
  format,
  rang,
  className = "size-16",
  sizes = "96px",
}: {
  id: string;
  format: string;
  rang?: number;
  className?: string;
  sizes?: string;
}) {
  const photo = photosProduits[id];
  const f = forme(format);
  return (
    <span className={`relative inline-flex shrink-0 ${className}`}>
      <span
        className={`flex size-full items-center justify-center overflow-hidden rounded-2xl ${
          photo ? "border border-trait bg-white" : fonds[f]
        }`}
      >
        {photo ? (
          <img
            src={`/produits/${id}-800.webp`}
            srcSet={`/produits/${id}-400.webp 400w, /produits/${id}-800.webp 800w`}
            sizes={sizes}
            width={800}
            height={800}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="size-full object-contain p-1"
          />
        ) : (
          <Dessin f={f} />
        )}
      </span>
      {rang !== undefined && (
        <span
          className={`absolute -left-2 -top-2 inline-flex size-7 items-center justify-center rounded-full text-[14px] font-bold ring-2 ring-white ${
            rang === 1 ? "bg-citron" : "bg-foret text-white"
          }`}
        >
          <span className="sr-only">Rang </span>
          {rang}
        </span>
      )}
    </span>
  );
}
