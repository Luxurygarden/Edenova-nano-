# EDENOVA – premium e-commerce dla ogrodów: winter protection, irrigation, plant care

Podwalina operacyjna marki EDENOVA (Shopify). Wszystko, co da się policzyć i powtórzyć, jest tu jako dane + skrypt, a nie wiedza w głowie. Struktura odpowiada master systemowi EDENOVA (pozycjonowanie premium, Product Lab, unit economics, Olive Winter PRO jako flagowy produkt).

```
edenova-shop/
├── config/pricing.json               # parametry: VAT, kurs, prowizje, CAC, wysyłka, narzuty per kategoria
├── data/products.csv                 # katalog roboczy – produkty katalogowe (ochrona zimowa, nawadnianie...)
├── data/master-product-database.csv  # Master Product Database (sekcja 12) – pełny rekord per SKU/wariant
├── data/bom-olive-winter-pro.csv     # BOM produktu flagowego S/M/L/XL, moduły ROOT + CROWN
├── scripts/pricing.mjs               # silnik cen rynkowych -> raport marży + import CSV do Shopify
├── scripts/unit-economics.mjs        # kalkulator "koszt -> cena od zadanej marży brutto" (sekcja 13)
├── scripts/*.test.mjs                # testy (npm test)
├── docs/strategia.md                 # pozycjonowanie, kategorie, model sprzedaży, etapy
├── docs/zrodla-produktow.md          # skąd brać produkty, kryteria dostawcy, model stock/dropship
├── docs/automatyzacja.md             # pipeline: dostawca -> cena -> Shopify -> treść -> kampania
├── docs/product-lab.md               # pipeline produktowy + stage-gate (retail test -> own product)
├── docs/dashboard.md                 # KPI do monitorowania od pierwszej sprzedaży
├── docs/olive-winter-pro-plan.md     # priorytet #1: 15 kroków od BOM do pierwszej sprzedaży
└── docs/prototypy-sklepu.md          # 5 koncepcji sklepu (wiedza + e-commerce) + prompty do mockupów
```

## Dwa silniki cenowe – kiedy który

- **`pricing.mjs`** – dla katalogu wielo-SKU sprzedawanego w cenie rynkowej (produkty wejściowe, SEO, ruch). Liczy od narzutu kategorii i ogranicza się do widełek konkurencji.
- **`unit-economics.mjs`** – dla produktów flagowych typu Olive Winter PRO, gdzie **nie porównujemy się do konkurencji cenowo**, tylko liczymy cenę od zadanej marży brutto na pełnym landed cost, a potem sprawdzamy realną marżę kontrybucyjną po CAC/płatnościach/zwrotach. To wdrożenie formuły z sekcji 13 master systemu.

## Jak używać (5 minut)

1. Dopisz produkt do `data/products.csv` (koszt EUR od dostawcy, cena konkurencji, klasa gabarytu).
2. `node scripts/pricing.mjs  (lub: npm run price)`
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

## Aktualny priorytet: Olive Winter PRO

Zgodnie z master systemem EDENOVA (sekcja 21), katalog powyżej to tło – **flagowy produkt to Olive Winter PRO** (kompletny system ROOT+CROWN ochrony oliwek w donicach, warianty S/M/L/XL, kolory anthracite/warm beige). Plan 15 kroków od BOM do pierwszej sprzedaży: `docs/olive-winter-pro-plan.md`. BOM z wymaganiami funkcjonalnymi (komponenty do potwierdzenia z kartami katalogowymi, nie zgadywane): `data/bom-olive-winter-pro.csv`.

**FAKT / ZAŁOŻENIE / HIPOTEZA** – rozróżnienie stosowane w tych dokumentach zgodnie z sekcją 20 master systemu: żaden parametr techniczny (moc kabla, gramatura włókniny, wymiary wariantów) nie jest tu zgadywany – jest oznaczony `DO USTALENIA` do czasu potwierdzenia na realnym komponencie.
