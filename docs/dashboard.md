# EDENOVA Dashboard — metryki (sekcja 18)

Minimalny zestaw do monitorowania od dnia pierwszej sprzedaży. Na start wystarczy arkusz; automatyzacja (Shopify Analytics + eksport) dopiero gdy wolumen to uzasadni.

## Poziom sklepu (tygodniowo)
- Revenue
- Gross Profit / Gross Margin
- Contribution Margin (po CAC, płatnościach, zwrotach — patrz `unit-economics.mjs`)
- AOV (średnia wartość zamówienia)
- CAC (rzeczywisty, z wydatków na reklamę / liczba nowych klientów)
- ROAS
- Conversion Rate
- Repeat Purchase Rate
- Refund Rate / Return Rate

## Poziom magazynu
- Inventory Turnover
- Days of Inventory
- Stan vs `min_stock_qty` (alert przy przekroczeniu w dół)

## Poziom SKU (per produkt, z `master-product-database.csv`)
- units_sold, returns, complaints, avg_rating
- margin_pln, margin_pct — rzeczywista, nie planowana
- Decyzja SCALE/MODIFY/DELETE na podstawie powyższych (patrz `product-lab.md`)

## Zasada
Produkt o słabej ekonomii (niska contribution margin, wysoki refund rate) nie zostaje w katalogu "bo już jest" — usuwamy albo przebudowujemy. Dashboard ma to wymuszać, nie tylko raportować.
