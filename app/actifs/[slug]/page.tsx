import { notFound } from "next/navigation";
import { PageActif } from "@/components/PageActif";
import { actifs, niveaux, symptomes } from "@/data/preuves";
import { actifDuSlug, actifsAvecPage, cheminActif, lignesActif, slugActif } from "@/lib/actifs";
import { meta } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return actifsAvecPage.map((id) => ({ slug: slugActif(id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const id = actifDuSlug((await params).slug);
  if (!id) return {};
  const nom = actifs[id].nom;
  const lignes = lignesActif(id).filter((l) => l.niveau !== "E");
  const resume = lignes.map((l) => `${symptomes[l.symptome].toLowerCase()} : ${niveaux[l.niveau].titre.toLowerCase()}`).join(" ; ");
  return meta({
    titre: `${nom} et ménopause : ce que disent les études`,
    titreComplet: true,
    description: [
      `${nom} à la ménopause, ${resume}. Dose des études, précautions, compléments qui en contiennent. Sources citées.`,
      `${nom} à la ménopause : ${resume}. Dose des études, précautions et compléments concernés.`,
      `${nom} à la ménopause : niveau de preuve par symptôme, dose des études, précautions et compléments concernés.`,
    ].find((d) => d.length <= 160) ?? `${nom} à la ménopause : ce que disent les études, la dose et les précautions.`,
    chemin: cheminActif(id),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const id = actifDuSlug((await params).slug);
  if (!id) notFound();
  return <PageActif id={id} />;
}
