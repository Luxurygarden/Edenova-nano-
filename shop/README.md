# Edenova Shop – sklep premium: donice, zimowanie, nawadnianie, ogrzewanie roślin

Podwalina operacyjna sklepu Shopify. Wszystko, co da się policzyć i powtórzyć, jest tu jako dane + skrypt, a nie wiedza w głowie.

```
shop/
├── config/pricing.json      # parametry: VAT, kurs, prowizje, CAC, wysyłka, narzuty per kategoria
├── data/products.csv        # katalog roboczy (źródło prawdy o kosztach zakupu)
├── scripts/pricing.mjs      # silnik cen -> raport marży + import CSV do Shopify
├── scripts/pricing.test.mjs # testy silnika (npx vitest run shop/)
├── docs/strategia.md        # pozycjonowanie, kategorie, model sprzedaży, etapy
├── docs/zrodla-produktow.md # skąd brać produkty, kryteria dostawcy, model stock/dropship
└── docs/automatyzacja.md    # pipeline: dostawca -> cena -> Shopify -> treść -> kampania
```

## Jak używać (5 minut)

1. Dopisz produkt do `data/products.csv` (koszt EUR od dostawcy, cena konkurencji, klasa gabarytu).
2. `node shop/scripts/pricing.mjs`
3. Przejrzyj `out/pricing-report.csv` – status `OK` / `REVIEW_MARGIN` / `CHECK_COMPETITOR`.
4. `out/shopify-import.csv` → Shopify Admin → Produkty → Importuj. Produkty wchodzą jako **draft** – publikujesz po kontroli.

## Jak liczy cenę

1. **Koszt dostarczony (netto PLN)** = (cena zakupu + transport do magazynu) × (1 + cło) × kurs EUR.
2. **Cena docelowa** = koszt × narzut kategorii × (1 + VAT).
3. **Korekta rynkowa**: nie więcej niż 105% ceny konkurencji (zaokrąglenie w dół); jeśli jesteśmy poniżej 85% konkurencji – podnosimy do 97% (premium nie musi być najtańsze).
4. **Zaokrąglenie psychologiczne**: końcówki 49 / 69 / 99.
5. **Marża netto na sztuce** po odjęciu: bramki płatności, dopłaty do wysyłki, rezerwy na zwroty (3%) i kosztu pozyskania klienta (12% przychodu).
6. Poniżej 25% marży netto → `REVIEW_MARGIN`.

## Co pokazał pierwszy przebieg (na danych przykładowych – ZAŁOŻENIA)

Z 13 pozycji tylko **2 spełniają próg 25%**: czujnik Wi-Fi i **zestaw „Zima w donicy” (33%)**.
Pojedyncze produkty katalogowe (kaptury, kable, maty) sprzedawane w cenie rynku przy 12% CAC dają 10–20%.

Wniosek biznesowy – nie idź w „kolejny sklep z kapturami z włókniny”:
- **Zestawy i rozwiązania** (problem → komplet) – brak bezpośredniego porównania cenowego, wyższy koszyk, darmowa wysyłka się spina.
- **Produkty pod własną marką** (ocieplacze na donice o estetyce premium) – marża wraca, gdy kupujesz od producenta, nie z hurtowni.
- **Gabaryty (donice XL) tylko dropship** i z doliczonym transportem lub progiem – inaczej wysyłka zjada marżę.

Liczby w `products.csv` to **placeholdery** – przed startem podmień na realne oferty dostawców.
