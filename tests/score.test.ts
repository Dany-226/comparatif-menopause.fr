import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { produits } from "../data/produits.ts";
import { actifs, preuves, sources } from "../data/preuves.ts";
import { classer, note, noteMax, pointsPreuves, pointsPrix, prixParJour } from "../lib/score.ts";

test("le calcul du rang ne lit ni les marchands ni leur rémunération", () => {
  const code = readFileSync(new URL("../lib/score.ts", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => !l.trim().startsWith("*") && !l.trim().startsWith("//") && !l.trim().startsWith("/*"))
    .join("\n");
  for (const mot of ["marchands", "commission", "remunere", "programme", "codePromo"]) {
    assert.ok(!code.includes(mot), `lib/score.ts ne doit pas lire « ${mot} »`);
  }
});

test("le classement est identique quand les commissions changent", () => {
  for (const usage of ["confort", "ventre"] as const) {
    const avant = classer(produits, usage).map((p) => p.id);
    const modifies = produits.map((p, i) => ({
      ...p,
      marchands: p.marchands.map((m) => ({ ...m, commission: `${(i * 7) % 40} %`, remunere: i % 2 === 0 })),
    }));
    const apres = classer(modifies, usage).map((p) => p.id);
    assert.deepEqual(apres, avant);
  }
});

test("barème du prix par jour", () => {
  assert.equal(pointsPrix(0.36), 2);
  assert.equal(pointsPrix(0.5), 2);
  assert.equal(pointsPrix(0.51), 1);
  assert.equal(pointsPrix(0.99), 1);
  assert.equal(pointsPrix(1), 0);
});

test("le critère « preuves » suit le niveau de preuve et la dose", () => {
  const points = (id: string) => pointsPreuves(produits.find((p) => p.id === id)!);
  assert.equal(points("fleurance-capital-feminite"), 2, "soja, niveau B, dose comparable");
  assert.equal(points("circles-meno"), 2, "safran, niveau B sur l'humeur, dose des essais");
  assert.equal(points("serelys-meno"), 1, "pollen, niveau C");
  assert.equal(points("miye-equilibre-feminin"), 0, "ashwagandha de niveau B, mais à un dixième de la dose");
  assert.equal(points("manhae-menopause"), 0, "aucun actif à dose comparable");
});

test("les notes attendues", () => {
  const attendu: Record<string, number> = {
    "fleurance-capital-feminite": 9,
    "circles-meno": 8,
    "manhae-menopause": 7,
    "pileje-feminabiane-meno-confort": 7,
    "serelys-meno": 7,
    "arkopharma-phyto-soya": 6,
    "miye-equilibre-feminin": 6,
    "menophytea-bouffees-de-chaleur": 5,
    "valebio-complexe-menopause": 4,
    "nutri-and-co-menopause": 3,
  };
  for (const p of produits.filter((x) => x.usage === "confort")) {
    assert.equal(note(p), attendu[p.id], p.nom);
    assert.ok(note(p) <= noteMax);
  }
});

test("à note égale, le moins cher par jour passe devant", () => {
  const confort = classer(produits, "confort");
  for (let i = 1; i < confort.length; i++) {
    const [a, b] = [confort[i - 1], confort[i]];
    assert.ok(a.note > b.note || (a.note === b.note && a.parJour <= b.parJour), `${a.nom} avant ${b.nom}`);
  }
});

test("les superlatifs écrits dans les fiches sont vrais", () => {
  for (const usage of ["confort"] as const) {
    const liste = produits.filter((p) => p.usage === usage);
    const prix = liste.map(prixParJour);
    for (const p of liste) {
      const texte = [p.resume, ...p.pour, ...p.contre].join(" ");
      if (/prix par jour le plus bas/i.test(texte)) assert.equal(prixParJour(p), Math.min(...prix), p.nom);
      if (/prix par jour le plus élevé/i.test(texte)) assert.equal(prixParJour(p), Math.max(...prix), p.nom);
      if (/moins de 0,50 €/i.test(texte)) assert.ok(prixParJour(p) < 0.5, p.nom);
    }
  }
});

test("le prix affiché est celui du premier marchand, et c'est le moins cher à 1 % près", () => {
  for (const p of produits) {
    assert.equal(p.marchands[0].prix, p.prix, p.nom);
    const moinsCher = Math.min(...p.marchands.map((m) => m.prix));
    assert.ok(p.prix <= moinsCher * 1.01, `${p.nom} : un marchand moins cher existe`);
  }
});

test("chaque actif et chaque source cités existent", () => {
  for (const p of produits) for (const a of p.actifs) assert.ok(actifs[a.id], `${p.nom} : actif « ${a.id} » inconnu`);
  for (const l of preuves) {
    assert.ok(actifs[l.actifId], `preuve ${l.id} : actif inconnu`);
    for (const id of l.sources) assert.ok(sources[id], `preuve ${l.id} : source « ${id} » inconnue`);
    if (l.niveau !== "E") assert.ok(l.sources.length > 0, `preuve ${l.id} : aucune source`);
  }
  for (const a of Object.values(actifs)) for (const id of a.sourcesVigilance ?? []) assert.ok(sources[id], `source « ${id} » inconnue`);
});
