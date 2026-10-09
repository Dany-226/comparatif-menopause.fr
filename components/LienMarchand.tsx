import type { Marchand, Produit } from "@/data/produits";
import { ou } from "@/lib/marchand";

type Props = {
  produit: Pick<Produit, "id" | "nom" | "marchands">;
  /** Où se trouve le bouton dans la page. Sert à la mesure des clics. */
  emplacement: string;
  variante?: "foret" | "citron";
  libelle?: string;
  className?: string;
};

function attributs(produit: Pick<Produit, "id">, m: Marchand, emplacement: string) {
  return {
    href: m.url,
    target: "_blank",
    rel: m.remunere ? "sponsored nofollow noopener" : "nofollow noopener",
    "data-marchand": m.nom,
    "data-produit": produit.id,
    "data-emplacement": emplacement,
  };
}

/**
 * Seul fichier autorisé à créer un lien vers un marchand.
 * Il pose rel="sponsored nofollow" sur les liens rémunérés, rel="nofollow" sur les autres,
 * et les attributs de mesure. Sans adresse renseignée, le bouton affiche un état d'attente.
 */
export function LienMarchand({ produit, emplacement, variante = "foret", libelle = "Voir l'offre", className = "" }: Props) {
  const m = produit.marchands[0];
  if (!m?.url) {
    return <span className={`bouton bouton-attente ${className}`}>Lien à venir</span>;
  }
  return (
    <a {...attributs(produit, m, emplacement)} className={`bouton bouton-${variante} ${className}`}>
      {libelle}
      <span className="sr-only">
        {" "}
        : {produit.nom}, {ou(m)} (nouvel onglet)
      </span>
    </a>
  );
}

/** Lien en texte vers un autre marchand que celui du bouton. */
export function LienMarchandTexte({
  produit,
  marchand,
  emplacement,
  children,
}: {
  produit: Pick<Produit, "id" | "nom">;
  marchand: Marchand;
  emplacement: string;
  children: React.ReactNode;
}) {
  if (!marchand.url) return <>{children}</>;
  return (
    <a {...attributs(produit, marchand, emplacement)} className="lien">
      {children}
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}
