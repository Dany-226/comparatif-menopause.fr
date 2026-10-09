import { sources } from "@/data/preuves";

const points: { titre: string; texte: string; ids: string[] }[] = [
  {
    titre: "Isoflavones de soja et de trèfle rouge",
    texte:
      "En 2015, l'Autorité européenne de sécurité des aliments n'a pas relevé d'effet indésirable sur le sein, l'utérus ou la thyroïde chez les femmes ménopausées, aux doses de 35 à 150 mg par jour. Sa conclusion ne couvre pas les femmes qui ont ou ont eu un cancer dépendant des œstrogènes. En France, ces compléments sont déconseillés en cas d'antécédent personnel ou familial de cancer du sein.",
    ids: ["efsa2015", "afssa2005", "cngof2021"],
  },
  {
    titre: "Actée à grappes",
    texte:
      "L'Agence européenne des médicaments signale des atteintes du foie : arrêt et consultation en cas de signe d'alerte, pas plus de six mois sans avis médical, pas d'usage sans avis médical après un cancer du sein. En 2007, l'agence sanitaire française recommandait d'éviter cette plante en complément alimentaire.",
    ids: ["ema2018", "afssa2007"],
  },
  {
    titre: "Ashwagandha",
    texte:
      "L'agence sanitaire française déconseille cette plante en cas de maladie de la thyroïde, du foie ou du cœur, pendant la grossesse, et aux personnes qui prennent des sédatifs.",
    ids: ["anses2024", "ansesRapport2024"],
  },
  {
    titre: "Ce que les étiquettes ont le droit de dire",
    texte:
      "Pour le soja, l'Autorité européenne a jugé les preuves insuffisantes pour établir un effet sur les bouffées de chaleur. Parmi les vitamines et les minéraux, la seule allégation autorisée qui touche à l'usage est celle de la vitamine B6, qui « contribue à réguler l'activité hormonale ». Les allégations sur les plantes sont, pour la plupart, encore en attente d'évaluation.",
    ids: ["efsa2012", "reglement432"],
  },
  {
    titre: "Contrôle et signalement",
    texte:
      "Un complément alimentaire n'a pas d'autorisation de mise sur le marché : il est déclaré à l'administration avant sa vente. Un effet indésirable se signale au dispositif de nutrivigilance de l'agence sanitaire, par un professionnel de santé ou par vous-même.",
    ids: ["dgal", "nutrivigilance"],
  },
];

/** « Ces compléments sont-ils sûrs ? » : les positions des autorités, avec leurs sources. */
export function Securite() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {points.map((p, i) => (
        <article
          key={p.titre}
          className={`flex flex-col gap-3 rounded-3xl border border-trait bg-white p-6 md:p-7 ${
            i === points.length - 1 && points.length % 2 === 1 ? "md:col-span-2" : ""
          }`}
        >
          <h3 className="titre-3">{p.titre}</h3>
          <p className="max-w-[48em] text-doux">{p.texte}</p>
          <p className="mt-auto text-[14px] text-discret">
            Sources :{" "}
            {p.ids.map((id, n) => (
              <span key={id}>
                {n > 0 && " · "}
                <a href={sources[id].url} target="_blank" rel="noopener" className="underline underline-offset-2">
                  {sources[id].court}, {sources[id].annee}
                </a>
              </span>
            ))}
          </p>
        </article>
      ))}
    </div>
  );
}
