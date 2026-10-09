import Link from "next/link";
import { EntetePage } from "@/components/EntetePage";
import { NiveauPreuve } from "@/components/NiveauPreuve";
import { Photo } from "@/components/Photo";
import { niveaux, preuves, sourcesCitees, type Niveau } from "@/data/preuves";
import { produits } from "@/data/produits";
import { comparatifs, legal, site } from "@/data/site";
import { dateLongue } from "@/lib/format";
import { meta } from "@/lib/meta";
import { grille, noteMax } from "@/lib/score";

const chemin = "/comment-nous-classons/";

export const metadata = meta({
  titre: "Comment nous classons",
  description:
    "La grille de notation, la règle de classement, les niveaux de preuve et les sources de Comparatif Ménopause. Ce que la rémunération change, et ce qu'elle ne change pas.",
  chemin,
});

const ordre: Niveau[] = ["A", "B", "C", "D", "E"];

export default function Page() {
  const publies = comparatifs.filter((c) => c.publiee && c.usage);
  const nombre = produits.filter((p) => publies.some((c) => c.usage === p.usage)).length;
  const nombreSources = sourcesCitees().length;

  return (
    <>
      <EntetePage
        surtitre={`Méthode · mise à jour le ${dateLongue(site.majLe)}`}
        titre="Comment nous classons"
        chapo="Une grille de cinq critères, appliquée de la même façon à chaque formule. Le rang se calcule à partir de la note, jamais à partir de ce que le site gagne."
      />

      <div className="conteneur grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-12 md:gap-16">
          <section className="prose">
            <h2 className="!mt-0">La règle de classement</h2>
            <p>
              Chaque formule reçoit une note sur {noteMax}. Le classement suit cette note, de la plus haute à la plus
              basse. À note égale, la formule la moins chère par jour passe devant.
            </p>
            <p>
              <strong>La rémunération n'entre pas dans le calcul.</strong> Le programme qui calcule le rang ne lit ni le
              nom des marchands ni leurs commissions. Un test automatique le vérifie avant chaque mise en ligne : il
              modifie toutes les commissions et contrôle que l'ordre ne bouge pas.
            </p>
            <p>Aucune marque ne peut payer pour figurer dans un comparatif, ni pour y gagner une place.</p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="titre-2 md:!text-[32px]">Les cinq critères</h2>
            <ol className="grid gap-4 md:grid-cols-2">
              {grille.map((c, i) => (
                <li key={c.cle} className="flex flex-col gap-2.5 rounded-3xl border border-trait bg-white p-6 md:[&:last-child:nth-child(odd)]:col-span-2">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-citron text-[16px] font-bold">
                      {i + 1}
                    </span>
                    <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.01em]">{c.titre}</h3>
                  </div>
                  <p className="text-[17px] text-doux">{c.mesure}</p>
                  <p className="mt-auto border-t border-trait pt-3 text-[15px] text-discret">{c.bareme}</p>
                </li>
              ))}
            </ol>
            <p className="max-w-[44em] text-doux">
              Le critère « preuves » n'est pas saisi à la main. Il se calcule à partir du{" "}
              <Link href="/preuves-complements-menopause/" className="lien">
                tableau des preuves
              </Link>{" "}
              et de la dose de chaque actif dans la formule. Une formule qui contient un actif bien étudié, mais à une
              dose très inférieure à celle des essais, ne marque aucun point.
            </p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="titre-2 md:!text-[32px]">Les niveaux de preuve</h2>
            <p className="max-w-[44em] text-doux">
              Un niveau de preuve vaut pour un actif et pour un symptôme. Il n'entre dans notre base qu'avec une source
              publiée, lue et datée. La base compte aujourd'hui {preuves.length} lignes et {nombreSources} sources.
            </p>
            <ul className="flex flex-col rounded-3xl border border-trait bg-white px-6">
              {ordre.map((n) => (
                <li key={n} className="flex items-start gap-4 border-t border-trait py-5 first:border-t-0">
                  <NiveauPreuve niveau={n} grand />
                  <div>
                    <h3 className="text-[19px] font-semibold leading-snug" aria-hidden="true">
                      {niveaux[n].titre}
                    </h3>
                    <p className="text-[16px] text-doux">{niveaux[n].regle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="sources" className="prose scroll-mt-6">
            <h2 className="!mt-0">Nos sources</h2>
            <p>
              Nous leur donnons du poids dans cet ordre : les autorités de santé, les sociétés savantes, les revues
              systématiques et méta-analyses d'essais, les essais randomisés isolés, puis les fiches des fabricants pour
              la composition et le prix.
            </p>
            <p>
              Quand deux synthèses se contredisent, nous citons les deux et la ligne reçoit le niveau C. Quand tous les
              essais d'un actif sont financés par son fabricant, nous le disons. La liste complète des {nombreSources}{" "}
              sources est sur la page <Link href="/preuves-complements-menopause/#sources">Le tableau des preuves</Link>.
            </p>

            <h2>Prix, marchands et mises à jour</h2>
            <p>
              Les prix sont relevés à la main sur la fiche d'un marchand, à la date indiquée sur chaque fiche. Le prix
              par jour est le prix de la boîte divisé par le nombre de jours qu'elle couvre à la posologie conseillée.
            </p>
            <p>
              <strong>Le prix affiché est le plus bas que nous avons relevé</strong>, et le bouton mène au marchand qui
              le pratique. Quand deux prix sont à moins de 1 % l'un de l'autre, nous pouvons retenir le marchand qui
              nous rémunère. Un test automatique vérifie cette règle.
            </p>
            <p>
              Un contrôle bloque la mise en ligne dès qu'un prix a plus de 90 jours : chaque prix est donc relevé au
              moins une fois par trimestre.
            </p>

            <h2>Ce que couvre la sélection</h2>
            <p>
              La sélection n'est pas exhaustive. Elle compte aujourd'hui {nombre} formules, vendues en pharmacie en
              ligne ou par leur marque. Une formule y figure qu'un marchand nous rémunère ou non.
            </p>

            <h2>Nos liens avec les marques</h2>
            <p>
              L'éditeur du site ne détient aucune part dans les marques et les marchands cités, et aucun d'eux n'en
              détient chez lui. Le seul lien possible est commercial : des programmes d'affiliation, décrits dans notre{" "}
              <Link href="/politique-affiliation/">politique d'affiliation</Link>.
            </p>

            <h2 id="corrections" className="scroll-mt-6">
              Corrections
            </h2>
            <p>
              Un prix qui a changé, une composition modifiée, une étude que nous n'avons pas vue : écrivez-nous
              {legal.contact.valeur ? <> à {legal.contact.valeur}</> : <> à l'adresse indiquée dans les <Link href="/mentions-legales/">mentions légales</Link></>}.
              Une erreur confirmée est corrigée dans les données, la note est recalculée, et la correction est inscrite
              dans l'historique en bas du comparatif.
            </p>

            <h2>Ce que nous ne faisons pas</h2>
            <ul>
              <li>Nous ne recopions pas d'avis de clientes ni de notes en étoiles venus d'autres sites.</li>
              <li>Nous ne promettons aucun résultat.</li>
              <li>Nous ne présentons aucun complément comme le substitut d'un traitement prescrit.</li>
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-photo md:rounded-[28px]">
            <Photo nom="10-methode-carnet" sizes="(min-width: 1024px) 380px, 100vw" position="40% 40%" prioritaire className="absolute inset-0" />
          </div>
          <div className="sombre flex flex-col gap-3 rounded-3xl bg-foret p-6 text-white">
            <div className="etiquette text-citron">En bref</div>
            <ul className="flex flex-col gap-2.5 text-[17px] text-sauge">
              <li>Note sur {noteMax}, cinq critères.</li>
              <li>Le critère « preuves » se calcule à partir des études.</li>
              <li>À note égale, le moins cher par jour passe devant.</li>
              <li>Les commissions ne changent pas le rang.</li>
              <li>Aucun prix de plus de 90 jours.</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
