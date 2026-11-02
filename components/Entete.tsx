import Link from "next/link";
import { Logo } from "./Icones";
import { pilier } from "@/data/site";

const liens = [
  { href: pilier, libelle: "Le comparatif" },
  { href: "/complement-alimentaire-ventre-gonfle-menopause/", libelle: "Ventre gonflé" },
  { href: "/preuves-complements-menopause/", libelle: "Les preuves" },
  { href: "/a-propos/", libelle: "À propos" },
];

export function Entete() {
  return (
    <header className="border-b border-trait bg-fond">
      <div className="conteneur flex min-h-[70px] items-center justify-between gap-4 md:min-h-[76px]">
        <Link href="/" className="flex min-h-[44px] items-center gap-2.5 md:gap-3">
          <Logo />
          <span className="text-[18px] font-semibold tracking-[-0.01em] md:text-[20px]">comparatif ménopause</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-[17px] md:flex">
          {liens.map((l) => (
            <Link key={l.href} href={l.href} className="py-3 hover:underline hover:underline-offset-4">
              {l.libelle}
            </Link>
          ))}
          <Link
            href="/comment-nous-classons/"
            className="rounded-full border-[1.5px] border-foret px-[22px] py-[11px] font-medium transition-colors hover:bg-foret hover:text-white"
          >
            Notre méthode
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary
            aria-label="Menu"
            className="flex size-[46px] list-none items-center justify-center rounded-full border-[1.5px] border-foret"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 6.5h14M3 13.5h14" stroke="#1F3A2B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <nav
            aria-label="Navigation principale"
            className="absolute right-0 top-[56px] z-30 flex w-[250px] flex-col rounded-[20px] border border-trait bg-white p-2 shadow-[0_18px_40px_-18px_rgba(20,36,27,0.35)]"
          >
            {[...liens, { href: "/comment-nous-classons/", libelle: "Notre méthode" }].map((l) => (
              <Link key={l.href} href={l.href} className="rounded-[14px] px-4 py-3 text-[17px] font-medium hover:bg-sauge">
                {l.libelle}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
