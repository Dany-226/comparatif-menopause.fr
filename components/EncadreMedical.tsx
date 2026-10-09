import { sources } from "@/data/preuves";

/** Rappel placé sur chaque comparatif : le traitement de première intention est médical. */
export function EncadreMedical({ sujet = "Ce comparatif porte sur des compléments alimentaires." }: { sujet?: string }) {
  return (
    <aside className="flex flex-wrap items-start gap-x-7 gap-y-5 rounded-3xl border border-trait bg-white px-6 py-7 md:px-8">
      <div className="flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-sauge">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M13 5v16M5 13h16" stroke="#1F3A2B" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-2">
        <h2 className="text-[22px] font-medium leading-tight tracking-[-0.01em] md:text-[24px]">
          Le traitement de première intention est médical
        </h2>
        <p className="max-w-[46em] text-doux">
          {sujet} Quand les symptômes gênent la vie quotidienne, le
          traitement de première intention est un médicament. Il ne convient pas à toutes les femmes et se décide avec
          un médecin.
        </p>
        <a href={sources.has2025.url} target="_blank" rel="noopener" className="lien self-start py-2 text-[16px]">
          Source : Haute Autorité de santé, septembre 2025
        </a>
      </div>
    </aside>
  );
}
