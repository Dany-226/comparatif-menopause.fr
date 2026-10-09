import { PageComparatif } from "@/components/PageComparatif";
import { produits } from "@/data/produits";
import { comparatifs, pilier, site } from "@/data/site";
import { meta } from "@/lib/meta";

const page = comparatifs.find((c) => c.chemin === pilier)!;
const nombre = produits.filter((p) => p.usage === "confort").length;
const chapo =
  "Aucun complément n'a l'efficacité démontrée d'un médicament. Nous classons ceux qui existent sur les preuves de leurs actifs, leur prix par jour et leurs précautions d'emploi.";

export const metadata = meta({
  titre: `Meilleur complément alimentaire ménopause : comparatif ${site.annee}`,
  titreComplet: true,
  description: `${nombre} compléments alimentaires pour la ménopause classés sur une grille publique : niveau de preuve de chaque actif, prix par jour, doses et précautions. Sources citées.`,
  chemin: pilier,
});

export default function Page() {
  return (
    <PageComparatif
      page={page}
      usage="confort"
      titre={["Meilleur complément", "alimentaire pour la ménopause"]}
      chapo={chapo}
      photo="02-pilier-yeux-fermes"
      photoPosition="10% 18%"
    />
  );
}
