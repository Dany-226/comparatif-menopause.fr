import Link from "next/link";

/**
 * Bandeau placé en tête de chaque classement : critère de classement par défaut,
 * caractère non exhaustif, absence de référencement payant, liens rémunérés.
 */
export function BandeauTransparence() {
  return (
    <section aria-label="Transparence" className="border-y border-trait bg-sauge">
      <div className="conteneur flex flex-wrap items-center gap-x-4 gap-y-1 py-3.5 text-[15px] md:py-4 md:text-[16px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="hidden shrink-0 md:block">
          <circle cx="10" cy="10" r="8.5" stroke="#1F3A2B" strokeWidth="1.6" />
          <path d="M10 9v5M10 6.2v.2" stroke="#1F3A2B" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <p className="min-w-0 flex-[1_1_520px]">
          Classé par note globale, de la plus haute à la plus basse. Sélection non exhaustive. Aucune marque ne paie
          pour y figurer. Certains liens sont rémunérés, sans effet sur le classement.
        </p>
        <Link href="/comment-nous-classons/" className="lien py-2">
          Notre méthode
        </Link>
      </div>
    </section>
  );
}
