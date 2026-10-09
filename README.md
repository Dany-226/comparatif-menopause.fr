# comparatif-menopause.fr

Site statique : Next.js 16, React 19, Tailwind 4. Aucune base de données, aucun serveur.
Le résultat de la construction est un dossier `out/` de fichiers HTML, à déposer chez n'importe quel hébergeur statique.

## Commandes

| Commande | Effet |
|---|---|
| `npm install` | Installe les dépendances (Node 22 ou plus récent) |
| `npm run dev` | Site en local sur http://localhost:3000 |
| `npm test` | Vérifie le calcul des notes et l'indépendance du classement |
| `npm run verifier` | Contrôles de conformité ; liste ce qui reste à compléter |
| `npm run build` | Tests, contrôles, construction dans `out/`, contrôle du HTML |
| `npm run apercu` | Après une construction : écrit dans `apercu/` le site entier sans JavaScript et en chemins relatifs (ouvrir `apercu/index.html` d'un double-clic), plus `site-complet.html`, tout le site en une page |
| `npm run build:prod` | Même chose, mais refuse de construire tant qu'il reste un point à compléter |

Pour la mise en ligne, utiliser `build:prod`.

## Où changer quoi

| Besoin | Fichier |
|---|---|
| Prix, composition, marchand, adresse d'une offre | `data/produits.ts` |
| Niveau de preuve d'un actif, sources, mises en garde | `data/preuves.ts` |
| Date de mise à jour, pages publiées, mentions légales | `data/site.ts` |
| Grille de notation et règle de classement | `lib/score.ts` |
| Couleurs, typographie, boutons | `app/globals.css` |
| Photos | `public/photos/` et `data/photos.ts` |

La note et le rang ne se saisissent nulle part : ils se calculent à partir de `data/produits.ts`.
Les pages lisent toutes les mêmes données, donc un prix corrigé l'est partout.

## Gestes courants

**Relever un prix.** Dans `data/produits.ts`, changer `prix` du produit et celui de son premier marchand, puis `prixReleveLe`. Au-delà de 90 jours, la construction est refusée. Le premier marchand de la liste doit être le moins cher : un test le vérifie.

**Passer un lien en affiliation.** Remplacer `url` par le lien d'affiliation et passer `remunere` à `true`. Le bouton prend `rel="sponsored nofollow"`, la mention « lien rémunéré » s'affiche et la page d'affiliation se met à jour.

**Ajouter un niveau de preuve.** Dans `data/preuves.ts` : ajouter la source dans la liste, l'actif dans `actifs` s'il est nouveau, puis une ligne dans `preuves` (actif, symptôme, niveau, dose des essais, conclusion, sources, date). Les notes se recalculent seules.

**Ajouter un produit.** Dans `data/produits.ts` : composition, prix, marchands, et la liste `actifs` avec, pour chacun, la dose et `comparable` (vrai si la dose atteint les trois quarts de celle des essais, avec le même type d'extrait). Le critère « preuves » en découle.

**Publier un nouveau comparatif.** Créer `app/<adresse>/page.tsx` sur le modèle de `app/meilleur-complement-alimentaire-menopause/page.tsx` (une vingtaine de lignes : le gabarit `PageComparatif` fait le reste), puis passer `publiee: true` dans `data/site.ts`. Le menu, le pied de page et le plan du site suivent.

**Noter une mise à jour.** Ajouter une ligne en tête de `historique` dans `data/site.ts` et changer `majLe`.

## Ce que les contrôles garantissent

1. Le calcul du rang ne lit ni les marchands ni les commissions (`tests/score.test.ts`).
2. Le critère « preuves » suit le tableau des preuves et la dose de chaque actif.
3. Le prix affiché est celui du premier marchand, et aucun marchand relevé n'est moins cher de plus de 1 %.
4. Les superlatifs écrits dans les fiches (« le prix par jour le plus bas ») sont vrais.
5. Aucune formule interdite dans les textes : « alternative naturelle », « soigne », « cliniquement prouvé », promesse de perte de poids chiffrée, etc. La liste est dans `scripts/verifier-conformite.mjs`.
6. Chaque produit a une source, un prix daté de moins de 90 jours et un marchand ; chaque ligne de preuve a une source connue (sauf niveau E) et une date.
7. Seul `components/LienMarchand.tsx` crée des liens vers les marchands.
8. Dans le site construit : chaque page est indexable, a un titre, une description, une adresse canonique, un seul titre de niveau 1 et figure dans le plan du site.

## Mesure des clics

`components/MesureClics.tsx` envoie un événement « Clic marchand » (produit, marchand, emplacement, page) dès qu'un outil de mesure expose `window.plausible` ou `window.dataLayer`. Sans outil installé, rien n'est envoyé.

## Photos des produits

Un produit sans photo affiche une vignette dessinée : la forme de la prise (gélule, comprimé, capsule), pas l'emballage. Pour poser une vraie photo :

1. Déposer deux fichiers carrés dans `public/produits/` : `<id du produit>-400.webp` et `<id du produit>-800.webp`. L'identifiant est celui de `data/produits.ts`.
2. Ajouter une ligne dans `data/photos-produits.ts` : texte alternatif, origine (`maison`, `marque` ou `regie`) et crédit.

La photo apparaît alors dans le classement, les sélections et la fiche. Le contrôle de conformité refuse une photo sans fichier, sans origine ou sans crédit. Une image copiée sur une boutique sans accord, ou une image générée d'un emballage, ne doit pas y entrer.

## Mise en ligne (GitHub + Cloudflare Pages)

Le dépôt GitHub garde le code et son historique. Cloudflare Pages lit le dépôt : chaque envoi sur la branche `main` reconstruit le site et le met en ligne, sans autre geste.

Réglages du projet Cloudflare Pages :

| Réglage | Valeur |
|---|---|
| Commande de construction | `npm run build` tant que les mentions légales sont incomplètes, puis `npm run build:prod` |
| Dossier de sortie | `out` |
| Version de Node | 22 (lue dans `.nvmrc`) |

Une construction qui échoue (test, conformité, contrôle du HTML) ne remplace pas la version en ligne.

Tant que le domaine n'est pas rattaché, le site répond sur une adresse en `pages.dev`. Le fichier `public/_headers` demande aux moteurs de ne pas indexer cette adresse : seule l'adresse `comparatif-menopause.fr` sera indexable.

Pour rattacher le domaine sans `www`, Cloudflare doit gérer la zone DNS : il faut remplacer les serveurs de noms chez OVH par ceux que Cloudflare indique.
