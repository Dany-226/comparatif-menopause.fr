type Props = { taille?: number; couleur?: string; className?: string };

export function Logo({ taille = 34 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="13" cy="17" r="10" stroke="#1F3A2B" strokeWidth="2" />
      <circle cx="21" cy="17" r="10" fill="#D6F15B" fillOpacity="0.85" stroke="#1F3A2B" strokeWidth="2" />
    </svg>
  );
}

export function FlecheBas({ taille = 20, couleur = "currentColor", className }: Props) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M10 4v12M5 11l5 5 5-5" stroke={couleur} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FlecheDroite({ taille = 20, couleur = "currentColor", className }: Props) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10h12M11 5l5 5-5 5" stroke={couleur} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Coche({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10.5l4 4L16 6" stroke="#1F3A2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tiret({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M5 10h10" stroke="#8A3B1F" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Étoile à quatre branches, signe graphique du site. */
export function Etoile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" aria-hidden="true" className={className}>
      <path
        d="M23 3c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z"
        fill="#D6F15B"
        stroke="#1F3A2B"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Pilule inclinée, second signe graphique du site. */
export function Pilule({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block rounded-full border-[1.5px] border-foret align-middle ${className}`}
    />
  );
}
