import { PageVentre } from "@/components/PageVentre";
import { produits } from "@/data/produits";
import { meta } from "@/lib/meta";

const nombre = produits.filter((p) => p.usage === "ventre").length;

export const metadata = meta({
  titre: `Ventre gonflé ménopause : ${nombre} compléments comparés, preuves à l'appui`,
  titreComplet: true,
  description: `Ballonnements ou ventre plat ? ${nombre} compléments vendus pour le ventre gonflé comparés sur leurs doses, les études sur les ballonnements, leur prix par jour et leurs précautions.`,
  chemin: "/complement-alimentaire-ventre-gonfle-menopause/",
});

export default function Page() {
  return <PageVentre />;
}
