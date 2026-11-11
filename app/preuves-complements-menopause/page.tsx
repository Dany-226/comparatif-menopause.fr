import Link from "next/link";
import { Bibliographie } from "@/components/Bibliographie";
import { EncadreAuteur } from "@/components/EncadreAuteur";
import { EncadreMedical } from "@/components/EncadreMedical";
import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { NiveauPreuve } from "@/components/NiveauPreuve";
import { Securite } from "@/components/Securite";
import { TableauActifs } from "@/components/TableauActifs";
import { niveaux, preuves, sourcesCitees, symptomes, type Niveau, type Symptome } from "@/data/preuves";
import { pilier, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { meta } from "@/lib/meta";

const chemin = "/preuves-complements-menopause/";
const nombreActifs = new Set(preuves.map((p) => p.actifId)).size;

export const metadata = meta({
  titre: `Compléments ménopause : les preuves, actif par actif (${nombreActifs} actifs)`,
  titreComplet: true,
  description: `Soja, safran, sauge, actée à grappes, magnésium, vitamine D… Le niveau de preuve de ${nombreActifs} actifs, symptôme par symptôme, avec la dose des essais et les sources.`,
  chemin,
});

const ordre: Niveau[] = ["A", "B", "C", "D", "E"];
const ordreSymptomes: Symptome[] = ["bouffees", "humeur", "sommeil", "global", "force"];

export default function Page() {
  const parNiveau = (n: Niveau) => preuves.filter((p) => p.niveau === n).length;
  const toutes = sourcesCitees();
  return (
    <>
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Compléments pour la ménopause : le tableau des preuves, actif par actif",
          inLanguage: "fr-FR",
          dateModified: site.majLe,
          author: { "@type": "Organization", name: site.signature, url: `${site.url}/a-propos/` },
          publisher: { "@type": "Organization", name: site.nom, legalName: site.editeur, url: site.url },
          mainEntityOfPage: `${site.url}${chemin}`,
          citation: toutes.map((s) => ({ "@type": "CreativeWork", name: s.titre, url: s.url })),
        }}
      />
      <EntetePage
        surtitre={`Preuves · vérifiées le ${dateLongue(site.majLe)}`}
        titre="Compléments pour la ménopause : le tableau des preuves"
        chapo={`${nombreActifs} actifs, ${preuves.length} lignes, ${toutes.length} sources. Pour chaque actif et chaque symptôme : ce que montrent les essais, à quelle dose, et ce qu'en disent les autorités de santé.`}
      />
      <p className="conteneur -mt-4 pb-6 text-[17px] md:-mt-6">
        <Link href="/actifs/" className="lien">
          Voir la page de chaque actif, classée par symptôme
        </Link>
      </p>

      <div className="conteneur flex flex-col gap-12 md:gap-16">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-6">
          <div className="flex flex-col gap-4 rounded-3xl bg-sauge p-6 md:p-8">
            <h2 className="surtitre md:!text-[14px]">En bref</h2>
            <ul className="flex flex-col gap-3 text-[17px] leading-snug md:text-[19px]">
              <li>
                <strong className="font-semibold">Aucun actif n'atteint le niveau A.</strong> {parNiveau("B")} lignes
                sont au niveau B, {parNiveau("C")} au niveau C, {parNiveau("D")} au niveau D et {parNiveau("E")} au
                niveau E.
              </li>
              <li>
                <strong className="font-semibold">Un niveau vaut pour un symptôme.</strong> Le safran est au niveau B
                pour l'humeur, au niveau C pour les bouffées de chaleur.
              </li>
              <li>
                <strong className="font-semibold">Un niveau vaut pour une dose.</strong> Une formule qui contient
                l'actif à une dose très inférieure à celle des essais n'en hérite pas.
              </li>
            </ul>
            <nav aria-label="Symptômes" className="mt-1 flex flex-wrap gap-2">
              {ordreSymptomes.map((sym) => (
                <a key={sym} href={`#${sym}`} className="rounded-full bg-white px-4 py-2 text-[15px] font-medium hover:bg-citron">
                  {symptomes[sym]}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-trait bg-white p-6 md:p-8">
            <h2 className="surtitre md:!text-[14px]">L'échelle</h2>
            <ul className="flex flex-col">
              {ordre.map((n) => (
                <li key={n} className="flex items-start gap-3.5 border-t border-trait py-3 first:border-t-0">
                  <NiveauPreuve niveau={n} />
                  <div>
                    <div className="text-[16px] font-semibold leading-snug" aria-hidden="true">
                      {niveaux[n].titre}
                    </div>
                    <div className="text-[14px] leading-snug text-doux">{niveaux[n].regle}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TableauActifs />

        <section className="flex flex-col gap-6">
          <h2 className="titre-2 md:!text-[32px]">Ce que disent les sociétés savantes</h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <article className="flex flex-col gap-3 rounded-3xl border border-trait bg-white p-6 md:p-7">
              <h3 className="titre-3">En France, 2021</h3>
              <p className="text-doux">
                Les recommandations du Collège national des gynécologues et obstétriciens français retiennent qu'un
                phyto-œstrogène, la génistéine, peut réduire la fréquence des bouffées de chaleur. Elles jugent
                inefficaces l'actée à grappes, le trèfle rouge, la bêta-alanine, la vitamine E, les oméga-3 et l'huile
                d'onagre.
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-3xl border border-trait bg-white p-6 md:p-7">
              <h3 className="titre-3">Aux États-Unis, 2023</h3>
              <p className="text-doux">
                La Menopause Society ne recommande ni les compléments, ni les plantes, ni le soja contre les bouffées de
                chaleur. Parmi les approches sans hormones, elle recommande la thérapie cognitivo-comportementale,
                l'hypnose clinique et certains médicaments sur ordonnance.
              </p>
            </article>
          </div>
          <p className="max-w-[46em] text-doux">
            Les deux textes ne disent pas la même chose de la génistéine. Nous avons retenu le niveau B, « signal
            positif à confirmer », et nous le signalons ici plutôt que de trancher à leur place.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="titre-2 md:!text-[32px]">Ces compléments sont-ils sûrs ?</h2>
          <Securite />
        </section>

        <EncadreMedical sujet="Cette page porte sur des compléments alimentaires." />

        <section className="flex flex-col gap-6">
          <h2 className="titre-2 md:!text-[32px]">Comment ce tableau est construit</h2>
          <div className="prose">
            <p>
              Pour chaque actif, nous cherchons d'abord une revue Cochrane, puis une autre revue systématique ou une
              méta-analyse d'essais randomisés, puis les essais randomisés contre placebo menés chez des femmes en péri-
              ou post-ménopause. Les chiffres cités sont ceux des résumés publiés.
            </p>
            <p>
              Quand deux synthèses se contredisent, la ligne reçoit le niveau C et cite les deux. Quand tous les essais
              d'un actif sont financés par son fabricant, la ligne le dit. « Aucun essai trouvé » décrit le résultat de
              notre recherche, pas une certitude.
            </p>
            <p>
              Les notes des formules se calculent à partir de ce tableau :{" "}
              <Link href="/comment-nous-classons/">Comment nous classons</Link>. Le classement est sur la page{" "}
              <Link href={pilier}>Meilleur complément alimentaire pour la ménopause</Link>.
            </p>
          </div>
        </section>

        <section id="sources" className="flex scroll-mt-6 flex-col gap-6">
          <h2 className="titre-2 md:!text-[32px]">Sources</h2>
          <Bibliographie />
        </section>

        <EncadreAuteur />
      </div>
    </>
  );
}
