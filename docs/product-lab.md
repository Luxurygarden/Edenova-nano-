# EDENOVA Product Lab — pipeline i stage-gate

## Pipeline (sekcja 11 master systemu)

PROBLEM/TREND → RESEARCH → SOURCING → SAMPLE → TEST → BOM → UNIT ECONOMICS →
PROTOTYPE → PHOTO/VIDEO → SHOPIFY → CONTENT/ADS → SALE → CUSTOMER FEEDBACK →
SCALE / MODIFY / DELETE

Zasada: **każdy etap musi mieć zapisany wynik**, zanim produkt przejdzie dalej. Brak wyniku = produkt stoi, nie idzie "na wyczucie" do Shopify.

## Stage-gate wdrażania (sekcja 10)

| Etap | Ilość | Cel | Wyjście z etapu |
|---|---|---|---|
| 1. Retail test | kilka sztuk, zakup detaliczny | Sprawdzić produkt fizycznie + realny popyt | Produkt działa, jest popyt → etap 2. Nie ma popytu → DELETE |
| 2. Small batch | 5–50 szt | Wynegocjować cenę, przetestować sprzedaż na większej próbie | Unit economics spina się przy target marży → etap 3 |
| 3. Wholesale | zakup hurtowy | Obniżyć koszt jednostkowy | Wolumen uzasadnia dalszą inwestycję → etap 4 |
| 4. Private label | producent robi pod marką EDENOVA | Kontrola jakości + marża + marka | Bestseller z powtarzalną sprzedażą → etap 5 |
| 5. Own product | własny projekt/produkcja | Pełna kontrola, najwyższa marża | — |

**Nie zamrażamy kapitału przed walidacją.** Olive Winter PRO wchodzi na etapie 1 (retail test) — patrz `olive-winter-pro-plan.md`.

## Status per produkt

Kolumny `test_status` i `shopify_status` w `master-product-database.csv` śledzą, na którym etapie jest każdy SKU. Wartości `test_status`: `retail-test-not-started` → `retail-test` → `small-batch` → `wholesale` → `private-label` → `own-product` → `killed`.

## Reguła decyzyjna SCALE / MODIFY / DELETE

Po zebraniu danych sprzedażowych (patrz `dashboard.md`):
- **SCALE**: contribution margin ≥ próg, repeat purchase / opinie dobre → zwiększ zamówienie, rozważ private label.
- **MODIFY**: produkt się sprzedaje, ale marża lub reklamacje są problemem → zmień dostawcę, wariant, cenę lub BOM.
- **DELETE**: słaba marża i słaby popyt jednocześnie → zdejmij z Shopify, nie trzymaj SKU "na wszelki wypadek".
