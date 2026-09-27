import { describe, it, expect } from 'vitest';
import { computeUnitEconomics } from './unit-economics.mjs';

describe('unit-economics', () => {
  it('matches the brief example: 420 PLN cost, 60% gross margin -> 1050 PLN', () => {
    const r = computeUnitEconomics({ landedCostPln: 420, targetGrossMarginPct: 0.6 });
    expect(r.price_for_target_gross_margin_pln).toBe(1050);
    expect(r.gross_profit_pln).toBe(630);
  });

  it('flags negative contribution margin when variable costs exceed gross profit', () => {
    const r = computeUnitEconomics({
      landedCostPln: 100,
      targetGrossMarginPct: 0.1, // slaby narzut
      paymentFeePct: 0.03,
      returnsRatePct: 0.05,
      cacPln: 50,
    });
    expect(r.contribution_profit_pln).toBeLessThan(0);
    expect(r.warning).not.toBeNull();
  });

  it('throws on margin >= 100%', () => {
    expect(() => computeUnitEconomics({ landedCostPln: 100, targetGrossMarginPct: 1 })).toThrow();
  });
});
