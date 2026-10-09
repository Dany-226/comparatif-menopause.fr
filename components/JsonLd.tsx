/** Données structurées. Aucune note ni avis n'y figure : seulement la page, son auteur et sa date. */
export function JsonLd({ donnees }: { donnees: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />;
}
