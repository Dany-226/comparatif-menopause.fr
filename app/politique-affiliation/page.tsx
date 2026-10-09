import Link from "next/link";
import { EntetePage } from "@/components/EntetePage";
import { produits } from "@/data/produits";
import { comparatifs, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { meta } from "@/lib/meta";

const chemin = "/politique-affiliation/";

export const metadata = meta({
  titre: "Politique d'affiliation",
  description:
    "Comment Comparatif Ménopause se finance : l'état des liens rémunérés, les marchands concernés, et pourquoi la rémunération ne change pas le classement.",
  chemin,
});

export default function Page() {
  const usages = comparatifs.filter((c) => c.publiee && c.usage).map((c) => c.usage);
  const lignes = produits.filter((p) => usages.includes(p.usage));
  const remuneres = lignes.flatMap((p) => p.marchands).filter((m) => m.url && m.remunere).length;

  return (
    <>
      <EntetePage
        surtitre={`Transparence · mise à jour le ${dateLongue(site.majLe)}`}
        titre="Politique d'affiliation"
        chapo="Le site est gratuit et sans publicité. Il a vocation à se financer par des liens rémunérés vers des marchands. Voici où il en est, et ce que cela change."
      />
      <div className="conteneur flex flex-col gap-12">
        <section className="prose">
          <h2 className="!mt-0">Où en est le site</h2>
          {remuneres === 0 ? (
            <p>
              <strong>Au {dateLongue(site.majLe)}, aucun lien du site n'est rémunéré.</strong> Les boutons « Voir
              l'offre » mènent à la fiche du marchand, sans aucun suivi. Le site prévoit de rejoindre des programmes
              d'affiliation ; le tableau ci-dessous indique, pour chaque marchand, celui qui existe.
            </p>
          ) : (
            <p>
              Au {dateLongue(site.majLe)}, {remuneres} lien{remuneres > 1 ? "s" : ""} du site {remuneres > 1 ? "sont rémunérés" : "est rémunéré"}. Le
              tableau ci-dessous dit lesquels.
            </p>
          )}
          <h2>Comment fonctionne un lien rémunéré</h2>
          <p>
            Si vous achetez après avoir cliqué sur un lien d'affiliation, le marchand verse une commission au site,
            calculée le plus souvent en pourcentage de votre panier. Vous payez le même prix que si vous étiez venue par
            un autre chemin.
          </p>
          <p>
            Chaque lien rémunéré est signalé par la mention « lien rémunéré » à côté du bouton. Un lien sans cette
            mention ne rapporte rien au site.
          </p>
          <h2>Ce que la rémunération ne change pas</h2>
          <p>
            Elle ne change ni la note, ni le rang, ni le choix des formules comparées. Le calcul du rang ne lit pas les
            commissions, et un test automatique le vérifie avant chaque mise en ligne. Le bouton mène au marchand le
            moins cher que nous avons relevé, qu'il nous rémunère ou non. La règle complète est décrite dans{" "}
            <Link href="/comment-nous-classons/">Comment nous classons</Link>.
          </p>
          <p>
            Aucune marque ne paie pour figurer dans un comparatif. Si une offre était un jour mise en avant contre
            paiement, elle porterait la mention « Annonce ».
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="titre-2 md:!text-[32px]">Les marchands vers lesquels nous renvoyons</h2>
          <div className="overflow-x-auto rounded-3xl border border-trait bg-white">
            <table className="w-full min-w-[720px] border-collapse text-[17px]">
              <thead>
                <tr className="text-left text-[13px] uppercase tracking-[0.1em] text-discret">
                  <th scope="col" className="py-4 pl-6 pr-3 font-semibold">
                    Produit
                  </th>
                  <th scope="col" className="px-3 py-4 font-semibold">
                    Marchand
                  </th>
                  <th scope="col" className="px-3 py-4 font-semibold">
                    Programme d'affiliation existant
                  </th>
                  <th scope="col" className="py-4 pl-3 pr-6 font-semibold">
                    Lien rémunéré aujourd'hui
                  </th>
                </tr>
              </thead>
              <tbody>
                {lignes.flatMap((p) =>
                  p.marchands
                    .filter((m) => m.url)
                    .map((m) => (
                      <tr key={`${p.id}-${m.nom}`} className="border-t border-trait">
                        <th scope="row" className="py-3.5 pl-6 pr-3 text-left font-semibold">
                          {p.nom}
                        </th>
                        <td className="px-3 py-3.5 text-doux">{m.nom === "Site de la marque" ? `Site de ${p.marque}` : m.nom}</td>
                        <td className="px-3 py-3.5 text-doux">{m.programme === "aucun" ? "Aucun trouvé" : m.programme}</td>
                        <td className="py-3.5 pl-3 pr-6">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-[15px] font-semibold ${
                              m.remunere ? "bg-citron" : "bg-sauge"
                            }`}
                          >
                            {m.remunere ? "Oui" : "Non"}
                          </span>
                        </td>
                      </tr>
                    )),
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="prose">
          <h2 className="!mt-0">Traceurs</h2>
          <p>
            Ce site ne dépose aucun cookie. Quand vous cliquez sur un lien vers un marchand, vous quittez le site : le
            marchand ou sa régie d'affiliation peut alors déposer un traceur pour savoir que la visite vient de chez
            nous. Les règles applicables sont alors les leurs.
          </p>
        </section>
      </div>
    </>
  );
}
