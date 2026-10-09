import Link from "next/link";
import { EntetePage } from "@/components/EntetePage";
import { Photo } from "@/components/Photo";
import { site } from "@/data/site";
import { meta } from "@/lib/meta";

const chemin = "/a-propos/";

export const metadata = meta({
  titre: "À propos",
  description:
    "Qui édite Comparatif Ménopause, comment le site travaille et ce qu'il n'est pas : ni un site médical, ni une boutique.",
  chemin,
});

export default function Page() {
  return (
    <>
      <EntetePage
        surtitre="Le site"
        titre="À propos"
        chapo="Un comparateur de compléments alimentaires pour la ménopause, qui montre sa grille, ses sources et sa rémunération."
      />
      <div className="conteneur grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
        <div className="prose">
          <h2 className="!mt-0">Pourquoi ce site</h2>
          <p>
            Les rayons et les boutiques en ligne proposent des dizaines de formules « ménopause ». Leurs étiquettes se
            ressemblent, leurs prix vont du simple au triple, et les études publiées disent souvent moins que les
            emballages.
          </p>
          <p>
            Ce site fait une chose : mettre ces formules côte à côte avec une grille publique, puis dire ce que les
            études montrent et ce qu'elles ne montrent pas.
          </p>
          <h2>Qui l'édite</h2>
          <p>
            Le site est édité par {site.editeur}, une société indépendante : elle n'appartient à aucun laboratoire ni à
            aucun marchand, et ne fabrique aucun produit. Le nom du directeur de la publication figure dans les{" "}
            <Link href="/mentions-legales/">mentions légales</Link>.
          </p>
          <p>
            Aucun professionnel de santé ne participe à la rédaction. C'est pourquoi le site ne donne aucun avis médical
            et ne s'appuie sur aucune opinion personnelle : tout ce
            qu'il affirme sur la ménopause ou sur un actif renvoie à une source publiée, que vous pouvez ouvrir et lire.
            La liste complète est dans <Link href="/preuves-complements-menopause/">le tableau des preuves</Link>.
          </p>
          <h2>Ce que le site n'est pas</h2>
          <ul>
            <li>
              <strong>Ce n'est pas un site médical.</strong> Il ne donne pas d'avis personnel et ne remplace pas une
              consultation.
            </li>
            <li>
              <strong>Ce n'est pas une boutique.</strong> Il ne vend rien : les boutons renvoient vers des marchands.
            </li>
            <li>
              <strong>Ce n'est pas un site de marque.</strong> Il n'appartient à aucun fabricant.
            </li>
          </ul>
          <h2>Comment il se finance</h2>
          <p>
            Par des liens rémunérés vers certains marchands, sans effet sur le classement. Le détail est dans la{" "}
            <Link href="/politique-affiliation/">politique d'affiliation</Link>, et la grille dans{" "}
            <Link href="/comment-nous-classons/">Comment nous classons</Link>.
          </p>
          <h2>Signaler une erreur</h2>
          <p>
            Un prix qui a changé, une composition modifiée, une étude que nous n'avons pas vue : les coordonnées de
            contact figurent dans les <Link href="/mentions-legales/">mentions légales</Link>.
          </p>
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-photo md:rounded-[28px] lg:aspect-[4/4.4]">
            <Photo nom="05-perimenopause-fenetre" sizes="(min-width: 1024px) 420px, 100vw" prioritaire className="absolute inset-0" />
          </div>
        </aside>
      </div>
    </>
  );
}
