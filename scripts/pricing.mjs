// Silnik cen sklepu: koszt zakupu -> cena detaliczna -> marża netto -> eksport do Shopify.
// Uruchom: node scripts/pricing.mjs  (wyniki w out/)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const round2 = (n) => Math.round(n * 100) / 100;

export function parseCsv(text) {
  const [header, ...lines] = text.trim().split(/\r?\n/);
  const keys = header.split(',');
  return lines.filter(Boolean).map((line) => {
    const cells = line.split(',');
    return Object.fromEntries(keys.map((k, i) => [k, (cells[i] ?? '').trim()]));
  });
}

// Zaokrąglenie psychologiczne w górę do najbliższej końcówki (np. 149, 199, 249).
export function psychRound(price, endings = [9, 49, 99]) {
  if (price < 100) return Math.ceil((price + 0.01) / 10) * 10 - 1; // 59, 69, 99
  const base = Math.floor(price / 100) * 100;
  const candidates = [];
  for (const b of [base, base + 100]) for (const e of endings) candidates.push(b + e);
  return candidates.filter((c) => c >= price).sort((a, b) => a - b)[0];
}

// Wersja w dół – gdy cena jest ograniczona przez konkurencję, nie wolno przekroczyć limitu.
export function psychRoundDown(price, endings = [9, 49, 99]) {
  if (price < 100) return Math.max(9, Math.floor((price + 1) / 10) * 10 - 1);
  const base = Math.floor(price / 100) * 100;
  const candidates = [base - 1];
  for (const e of endings) candidates.push(base + e);
  return candidates.filter((c) => c <= price).sort((a, b) => b - a)[0];
}

export function priceProduct(p, cfg) {
  const vat = cfg.vatRate;
  const landedNet =
    (Number(p.supplier_cost_eur) + Number(p.inbound_shipping_eur || 0)) *
    (1 + Number(p.duty_rate || 0)) *
    cfg.eurToPln;

  const markup = cfg.targetMarkupByCategory[p.category] ?? 2.0;
  let target = landedNet * markup * (1 + vat);

  const competitor = Number(p.competitor_price_pln) || null;
  let cappedByCompetitor = false;
  let liftedToMarket = false;
  if (competitor && target > competitor * cfg.maxPriceVsCompetitor) {
    target = competitor * cfg.maxPriceVsCompetitor;
    cappedByCompetitor = true;
  } else if (competitor && target < competitor * cfg.liftBelowCompetitor) {
    // Nie zostawiamy pieniędzy na stole: premium nie musi być najtańsze.
    target = competitor * cfg.liftTargetVsCompetitor;
    liftedToMarket = true;
  }
  const price = cappedByCompetitor
    ? psychRoundDown(target, cfg.roundingEndings)
    : psychRound(target, cfg.roundingEndings);
  const revenueNet = price / (1 + vat);

  const shipCost = cfg.shippingCostByClass[p.shipping_class] ?? 0;
  const shipCharge = price >= cfg.freeShippingThreshold ? 0 : cfg.shippingChargeByClass[p.shipping_class] ?? 0;
  const shippingSubsidy = Math.max(0, shipCost - shipCharge / (1 + vat));

  const paymentFee = (price + shipCharge) * cfg.paymentFeeRate + cfg.paymentFeeFixed;
  const returnsReserve = revenueNet * cfg.returnsReserveRate;
  const marketing = revenueNet * cfg.marketingCacRate;

  const netProfit = revenueNet - landedNet - shippingSubsidy - paymentFee - returnsReserve - marketing;
  const netMarginRate = netProfit / revenueNet;

  let status = 'OK';
  if (netMarginRate < cfg.minNetMarginRate) status = 'REVIEW_MARGIN';
  if (!competitor && p.sourcing_model !== 'bundle') status = status === 'OK' ? 'CHECK_COMPETITOR' : status;

  return {
    sku: p.sku,
    name: p.name,
    category: p.category,
    sourcing: p.sourcing_model,
    landed_net_pln: round2(landedNet),
    price_gross_pln: price,
    competitor_pln: competitor ?? '',
    capped_by_competitor: cappedByCompetitor,
    lifted_to_market: liftedToMarket,
    shipping_subsidy_pln: round2(shippingSubsidy),
    net_profit_pln: round2(netProfit),
    net_margin_pct: round2(netMarginRate * 100),
    status,
  };
}

const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const esc = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const toCsv = (rows) =>
  [Object.keys(rows[0]).join(','), ...rows.map((r) => Object.values(r).map(esc).join(','))].join('\n') + '\n';

// Produkty zawsze trafiają do Shopify jako "draft" – publikuje człowiek po kontroli.
export function toShopifyRow(priced, cfg) {
  return {
    Handle: slug(priced.name),
    Title: priced.name,
    Vendor: 'Edenova',
    Type: priced.category,
    Tags: [priced.category, priced.sourcing, 'sezon-zima'].join(', '),
    Published: 'FALSE',
    'Variant SKU': priced.sku,
    'Variant Price': priced.price_gross_pln.toFixed(2),
    'Variant Compare At Price': '',
    'Variant Requires Shipping': 'TRUE',
    'Variant Taxable': 'TRUE',
    'Cost per item': round2(priced.landed_net_pln * (1 + cfg.vatRate)).toFixed(2),
    Status: 'draft',
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const cfg = JSON.parse(readFileSync(join(root, 'config/pricing.json'), 'utf8'));
  const products = parseCsv(readFileSync(join(root, 'data/products.csv'), 'utf8'));
  const priced = products.map((p) => priceProduct(p, cfg));
  mkdirSync(join(root, 'out'), { recursive: true });
  writeFileSync(join(root, 'out/pricing-report.csv'), toCsv(priced));
  writeFileSync(join(root, 'out/shopify-import.csv'), toCsv(priced.map((p) => toShopifyRow(p, cfg))));
  console.table(priced.map(({ sku, landed_net_pln, price_gross_pln, competitor_pln, net_margin_pct, status }) =>
    ({ sku, landed_net_pln, price_gross_pln, competitor_pln, net_margin_pct, status })));
}
