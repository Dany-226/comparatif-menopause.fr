import { EntetePage } from "@/components/EntetePage";
import { legal, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { meta } from "@/lib/meta";

const chemin = "/mentions-legales/";

export const metadata = meta({
  titre: "Mentions légales",
  description: "Éditeur, directeur de la publication, hébergeur et données personnelles du site Comparatif Ménopause.",
  chemin,
});

export default function Page() {
  return (
    <>
      <EntetePage surtitre={`Mise à jour le ${dateLongue(site.majLe)}`} titre="Mentions légales" />
      <div className="conteneur flex flex-col gap-12">
        <section className="flex max-w-[820px] flex-col gap-5">
          <h2 className="titre-2 md:!text-[32px]">Éditeur et hébergeur</h2>
          <dl className="flex flex-col rounded-3xl border border-trait bg-white px-6">
            {Object.entries(legal).map(([cle, l]) => (
              <div key={cle} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-trait py-4 first:border-t-0">
                <dt className="text-[16px] text-discret">{l.libelle}</dt>
                <dd className={`text-[17px] font-medium md:text-right ${l.valeur ? "" : "text-discret"}`}>{l.valeur ?? "À compléter"}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="prose">
          <h2 className="!mt-0">Nature du site</h2>
          <p>
            {site.nom} est un site d'information et de comparaison. Il ne vend aucun produit. Ses contenus ne
            constituent pas un avis médical et ne remplacent pas une consultation.
          </p>
          <h2>Données personnelles</h2>
          <p>
            Le site ne propose ni compte, ni formulaire, ni lettre d'information. Il ne collecte aucune donnée
            nominative et ne dépose aucun cookie.
          </p>
          <p>
            Les liens vers les marchands ouvrent des sites tiers. Le marchand ou sa régie d'affiliation peut y déposer
            un traceur pour attribuer la visite. Ces traitements relèvent de leur propre politique de confidentialité.
          </p>
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, les tableaux et la grille de notation sont la propriété de l'éditeur. Les noms de produits et de
            marques appartiennent à leurs titulaires et ne sont cités que pour les besoins de la comparaison.
          </p>
        </section>
      </div>
    </>
  );
}
