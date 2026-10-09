export type Question = { question: string; reponse: React.ReactNode; texte: string };

/** Questions fréquentes, en blocs dépliables sans JavaScript. Le champ « texte » sert aux données structurées. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <div className="flex flex-col gap-3">
      {questions.map((q) => (
        <details key={q.question} className="group rounded-[20px] border border-trait bg-white">
          <summary className="flex min-h-[64px] list-none items-center justify-between gap-4 px-5 py-4 md:px-7">
            <h3 className="text-[18px] font-medium leading-snug md:text-[20px]">{q.question}</h3>
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sauge transition-transform group-open:rotate-45"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9h12" stroke="#1F3A2B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="prose px-5 pb-6 md:px-7">{q.reponse}</div>
        </details>
      ))}
    </div>
  );
}
