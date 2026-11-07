# À compléter avant la mise en ligne

`npm run verifier` donne la liste à jour. `npm run build:prod` refuse de construire tant qu'elle n'est pas vide.

## 1. Ce qui bloque la mise en ligne

| Quoi | Où | Combien |
|---|---|---|
| Sérélys Meno : adresse de la boîte de 60 seule (le prix vient de la fiche du lot de deux) et dose de l'extrait dans les essais | `data/produits.ts`, champ `reserves` | 2 |
| Ménophytea Bouffées de chaleur : lignes de preuve pour le lin et le kudzu | `data/preuves.ts` | 1 |

Une réserve levée se retire de la liste `reserves` du produit.

## 2. À relire, parce que c'est écrit en ton nom

- **Signature des pages et directeur de la publication.** Les pages sont signées « Comparatif Ménopause » (`site.signature` dans `data/site.ts`). Aucun nom de personne n'apparaît sur le site : le directeur de la publication est désigné par sa fonction (« le président de DIGICORPEX SASU »). C'est ton choix ; la loi demande le nom du directeur de la publication, et ce nom est public au registre. Pour le rétablir : champ `legal.directeur`. Ne jamais mettre un nom, un portrait ou un diplôme inventés.
- **Les prix.** Relevés le 9 octobre 2026 par un outil de lecture automatique. Un contrôle à l'œil des dix fiches est prudent avant la mise en ligne.

## 3. Choix faits, tous réversibles

- **Le critère « preuves » remplace « actif étudié ».** Il ne se saisit plus : il se calcule à partir du tableau des preuves et de la dose de chaque actif. Niveau A ou B à dose comparable : 2 points ; niveau C : 1 ; sinon 0. « Comparable » veut dire au moins les trois quarts de la dose des essais, avec le même type d'extrait. Conséquence : Fleurance Nature passe premier (9/10), Circles deuxième (8/10), Manhaé troisième (7/10).
- **Le critère « allégation autorisée » suit une règle écrite.** 2 points avec la vitamine B6 (seule allégation autorisée qui touche à l'activité hormonale), 1 pour une allégation générale, 0 sinon. MiYé gagne un point par rapport au classement à blanc.
- **Valebio perd un point en précautions** : sa fiche déconseille l'association avec les antidépresseurs et les triptans, et l'usage en cas d'épilepsie.
- **Niveaux de preuve revus.** Trèfle rouge et actée à grappes passent de D à C : des méta-analyses de 2021 et 2023 sont positives, contre les revues Cochrane de 2012 et 2013. Les isoflavones de soja passent à B.
- **Le bouton mène au marchand le moins cher relevé**, même s'il ne rémunère pas le site (Circles et Pileje chez Pharma GDD, Valebio chez Boticinal). Le second marchand apparaît en lien de texte sous le bouton. Exception : à moins de 1 % d'écart, le marchand rémunéré peut passer devant (MiYé).
- **Aucun lien n'est rémunéré aujourd'hui.** Les adresses sont celles des fiches, sans suivi : `remunere` vaut `false` partout. Quand un programme t'accepte, remplace l'adresse par le lien d'affiliation et passe `remunere` à `true` : la mention « lien rémunéré » et la page d'affiliation suivent.
- **Dix formules, dont cinq de pharmacie.** Ymea Total n'a pas été retenu : sa posologie ne figure que sur une fiche belge.
- **Les fiches sont repliées** sauf la première : le détail de la note, les actifs et la composition s'ouvrent d'un clic. « Pour » et « contre » restent visibles.
- **Photos.** La mention « illustration générée par IA » a été retirée à ta demande. Le règlement européen sur l'IA (article 50, applicable depuis août 2026) prévoit de signaler les images générées qui passent pour authentiques : à toi de voir si une ligne dans les mentions légales suffit.
- **Mesure d'audience.** Aucun outil installé. Les mentions légales disent que le site ne dépose aucun cookie : à corriger si l'outil choisi en dépose.

## 4. Limites des preuves

- Les fiches PubMed n'étaient pas lisibles par l'outil de recherche : les résumés ont été lus sur les sites des éditeurs, des dépôts d'universités et des bases qui les reprennent. Six sources ont été relues une seconde fois (Taku 2012, JAMA 2016, safran 2021, actée 2023, trèfle rouge 2021, pollen 2024) ; les autres ne l'ont été qu'une fois.
- Trois sources ont été lues de seconde main : l'essai sur la vitamine D (communiqué de l'institution), l'essai sur le fenugrec de 2017 (pages qui le résument) et l'avis complet de la Haute Autorité de santé sur la bêta-alanine (page de synthèse).
- Page prise de poids (7 novembre 2026) : la revue de Davis et al. (2012) a été lue dans le communiqué de l'International Menopause Society ; l'étude SWAN de Greendale et al. (2019) dans son résumé ; les conditions de l'allégation du glucomannane (3 g par jour en trois prises, eau, régime hypocalorique) dans un article de presse professionnelle, l'avis de l'EFSA n'étant lisible que par sa page de titre. À relire à la source.
- « Aucun essai trouvé » (bourrache, tryptophane, vitamine B6) décrit une recherche, pas une certitude.
- Non documentés à ce jour : citrus, rhodiole, lin, kudzu, romarin.

## 5. Non utilisé

- **21st.dev.** Le plugin est installé mais ses outils demandent une clé (gratuite sur https://21st.dev/mcp, variable `API_KEY_21ST`). Les composants ont été écrits à la main à partir de la maquette.

## 6. Étapes suivantes

1. Dépôt GitHub `comparatif-menopause`, hébergeur, domaine pointé.
2. Candidatures Awin (Redcare) et Affilae (Circles, Valebio, MiYé, Nutri&Co), TimeOne (Fleurance Nature).
3. Comparatif « ventre gonflé » : les cinq produits sont dans les données, sans preuves ni adresses.
4. Pages d'information et pages d'avis : le pilier n'a encore que deux pages de soutien (preuves, méthode).
