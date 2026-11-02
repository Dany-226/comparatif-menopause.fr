import type { MetadataRoute } from "next";
import { avisPublies, cheminAvis } from "@/data/avis";
import { comparatifs, pagesInstitutionnelles, pagesReference, site } from "@/data/site";

export const dynamic = "force-static";

/** Plan du site : l'accueil et les pages marquées « publiee ». */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...comparatifs, ...pagesReference, ...pagesInstitutionnelles].filter((p) => p.publiee);
  return [
    { url: `${site.url}/`, lastModified: site.majLe },
    ...pages.map((p) => ({ url: `${site.url}${p.chemin}`, lastModified: site.majLe })),
    ...avisPublies.map((a) => ({ url: `${site.url}${cheminAvis(a)}`, lastModified: a.majLe })),
  ];
}
