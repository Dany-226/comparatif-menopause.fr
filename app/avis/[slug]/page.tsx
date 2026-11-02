import { notFound } from "next/navigation";
import { PageAvis } from "@/components/PageAvis";
import { avisPublies, cheminAvis } from "@/data/avis";
import { produits } from "@/data/produits";
import { classer } from "@/lib/score";
import { meta } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return avisPublies.map((a) => ({ slug: a.slug }));
}

function trouver(slug: string) {
  const avis = avisPublies.find((a) => a.slug === slug);
  if (!avis) return null;
  const usage = produits.find((p) => p.id === avis.produit)?.usage ?? "confort";
  const classes = classer(produits, usage);
  const produit = classes.find((p) => p.id === avis.produit);
  return produit ? { avis, produit, total: classes.length } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = trouver(slug);
  if (!t) return {};
  return meta({
    titre: t.avis.titre(t.produit, t.total),
    titreComplet: true,
    description: t.avis.description(t.produit, t.total),
    chemin: cheminAvis(t.avis),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = trouver(slug);
  if (!t) notFound();
  return <PageAvis avis={t.avis} />;
}
