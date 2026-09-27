import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { psychRound, psychRoundDown, priceProduct } from './pricing.mjs';

const cfg = JSON.parse(readFileSync(new URL('../config/pricing.json', import.meta.url), 'utf8'));
const base = { sku: 'T', name: 'Test', category: 'ochrona-zimowa', supplier_cost_eur: '10', inbound_shipping_eur: '0', duty_rate: '0', shipping_class: 'S', sourcing_model: 'stock' };

describe('pricing', () => {
  it('rounds up to psychological endings', () => {
    expect(psychRound(52)).toBe(59);
    expect(psychRound(151, [49, 69, 99])).toBe(169);
  });
  it('rounds down without exceeding cap', () => {
    expect(psychRoundDown(177.45, [49, 69, 99])).toBe(169);
    expect(psychRoundDown(61.9)).toBe(59);
  });
  it('never exceeds competitor cap', () => {
    const r = priceProduct({ ...base, competitor_price_pln: '59' }, cfg);
    expect(r.price_gross_pln).toBeLessThanOrEqual(59 * cfg.maxPriceVsCompetitor);
    expect(r.capped_by_competitor).toBe(true);
  });
  it('lifts price toward market when far below competitor', () => {
    const r = priceProduct({ ...base, competitor_price_pln: '500' }, cfg);
    expect(r.lifted_to_market).toBe(true);
    expect(r.price_gross_pln).toBeGreaterThan(400);
  });
  it('flags low margin', () => {
    const r = priceProduct({ ...base, supplier_cost_eur: '50', competitor_price_pln: '99' }, cfg);
    expect(r.status).toBe('REVIEW_MARGIN');
  });
});
