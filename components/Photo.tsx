import { photos, type NomPhoto } from "@/data/photos";

type Props = {
  nom: NomPhoto;
  /** Largeur occupée à l'écran, au format de l'attribut sizes. */
  sizes: string;
  /** À réserver à la première image visible de la page. */
  prioritaire?: boolean;
  /** Point d'intérêt gardé au recadrage, par exemple « 10% 18% ». */
  position?: string;
  alt?: string;
  className?: string;
};

export function Photo({ nom, sizes, prioritaire = false, position = "50% 50%", alt, className = "" }: Props) {
  const p = photos[nom];
  const petite = Math.min(800, p.largeur);
  return (
    <img
      src={`/photos/${nom}-1600.webp`}
      srcSet={`/photos/${nom}-800.webp ${petite}w, /photos/${nom}-1600.webp ${p.largeur}w`}
      sizes={sizes}
      width={p.largeur}
      height={p.hauteur}
      alt={alt ?? p.alt}
      loading={prioritaire ? "eager" : "lazy"}
      fetchPriority={prioritaire ? "high" : undefined}
      decoding="async"
      className={`size-full object-cover ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
