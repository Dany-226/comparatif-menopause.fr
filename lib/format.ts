const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function prix(n: number): string {
  return euros.format(n);
}

const longue = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const courte = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });

/** « 9 octobre 2026 » */
export function dateLongue(iso: string): string {
  return longue.format(new Date(iso));
}

/** « 9 oct. » */
export function dateCourte(iso: string): string {
  return courte.format(new Date(iso));
}
