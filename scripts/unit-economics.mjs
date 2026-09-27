// Kalkulator unit economics wg formuly EDENOVA (sekcja 13 Master System):
//   cena = landed_cost / (1 - target_margin_pct)
// Odrebny od pricing.mjs (ktory liczy cene rynkowa z narzutu i porownuje do konkurencji).
// Ten skrypt liczy cene "od kosztu" wymagana do osiagniecia zadanej marzy BRUTTO,
// a nastepnie odejmuje koszty NIEUWZGLEDNIONE w landed_cost (platnosci, zwroty, CAC),
// zeby pokazac realna marze netto/kontrybucyjna - nie tylko brutto.
//
// Uzycie: node scripts/unit-economics.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * @param {object} input
 * @param {number} input.landedCostPln - pelny koszt dostarczony: zakup + transport + magazyn + opakowanie + kompletacja + fulfillment (BEZ platnosci/zwrotow/CAC)
 * @param {number} input.targetGrossMarginPct - docelowa marza BRUTTO jako ulamek (0.60 = 60%)
 * @param {number} input.paymentFeePct - prowizja bramki platnosci jako ulamek przychodu
 * @param {number} input.returnsRatePct - rezerwa na zwroty/reklamacje jako ulamek przychodu
 * @param {number} input.cacPln - przewidywany koszt pozyskania klienta w PLN na sztuke
 */
export function computeUnitEconomics(input) {
  const {
    landedCostPln,
    targetGrossMarginPct,
    paymentFeePct = 0,
    returnsRatePct = 0,
    cacPln = 0,
  } = input;

  if (targetGrossMarginPct >= 1) throw new Error('targetGrossMarginPct musi byc < 1');

  // Krok 1: cena wymagana do osiagniecia zadanej marzy BRUTTO (sekcja 13 wprost).
  const priceForGrossMargin = landedCostPln / (1 - targetGrossMarginPct);
  const grossProfitPln = priceForGrossMargin - landedCostPln;

  // Krok 2: koszty NIE uwzglednione w landed_cost, ktore obniza marza kontrybucyjna.
  const paymentFeePln = priceForGrossMargin * paymentFeePct;
  const returnsReservePln = priceForGrossMargin * returnsRatePct;
  const variableCostsPln = paymentFeePln + returnsReservePln + cacPln;

  const contributionProfitPln = grossProfitPln - variableCostsPln;
  const contributionMarginPct = contributionProfitPln / priceForGrossMargin;

  return {
    landed_cost_pln: round2(landedCostPln),
    price_for_target_gross_margin_pln: round2(priceForGrossMargin),
    gross_profit_pln: round2(grossProfitPln),
    gross_margin_pct: round2(targetGrossMarginPct * 100),
    payment_fee_pln: round2(paymentFeePln),
    returns_reserve_pln: round2(returnsReservePln),
    cac_pln: round2(cacPln),
    contribution_profit_pln: round2(contributionProfitPln),
    contribution_margin_pct: round2(contributionMarginPct * 100),
    warning: contributionMarginPct < 0 ? 'UJEMNA MARZA KONTRYBUCYJNA - marza brutto nie pokrywa platnosci+zwrotow+CAC' : null,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Przyklad z sekcji 13 master systemu: koszt 420 PLN, marza brutto 60%.
  // To PRZYKLAD LICZBOWY z briefu, nie realny SKU - podstaw prawdziwy landed_cost gdy BOM bedzie zamkniety.
  const example = computeUnitEconomics({
    landedCostPln: 420,
    targetGrossMarginPct: 0.6,
    paymentFeePct: 0.029,
    returnsRatePct: 0.03,
    cacPln: 80, // ZALOZENIE do zweryfikowania po pierwszych kampaniach
  });
  console.log('Przyklad z briefu (koszt 420 PLN, marza brutto 60%) - PRZYKLADOWE dane:');
  console.table([example]);
  console.log(
    '\nUwaga: cena 1050 PLN pokrywa 60% marzy BRUTTO, ale po odjeciu platnosci, zwrotow i CAC',
    'realna marza kontrybucyjna jest nizsza - patrz pole contribution_margin_pct.',
  );
}
