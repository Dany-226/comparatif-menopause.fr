import { Pilule } from "./Icones";

/** Ouverture des pages de méthode et des pages légales. */
export function EntetePage({ surtitre, titre, chapo }: { surtitre: string; titre: string; chapo?: string }) {
  return (
    <div className="conteneur flex flex-col gap-4 pb-8 pt-9 md:gap-5 md:pb-12 md:pt-16">
      <div className="surtitre md:!text-[14px]">{surtitre}</div>
      <h1 className="titre-1 max-w-[15em] md:!text-[58px]">
        {titre} <Pilule className="ml-1 h-[0.46em] w-[0.9em] -rotate-[16deg] bg-citron" />
      </h1>
      {chapo && <p className="max-w-[38em] text-[18px] leading-normal text-doux md:text-[20px]">{chapo}</p>}
    </div>
  );
}
