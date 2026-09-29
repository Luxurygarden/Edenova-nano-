# EDENOVA: 5 prototypów sklepu

Cel dokumentu: wybrać architekturę jednego sklepu, który łączy **wiedzę i usługi (Garden Wellbeing System™)** z **e-commerce sprawdzonych produktów**. Każdy prototyp ma:

1. ideę i logikę biznesową,
2. strukturę strony głównej i kluczowych podstron,
3. mechanizm połączenia wiedzy z produktami,
4. ocenę: co daje, co kosztuje, jakie ryzyko,
5. gotowe prompty do wygenerowania mockupów (desktop, karta produktu, mobile).

Wspólne dla wszystkich wersji: paleta i typografia marki z `01_FIRMA_FILOZOFIA_MARKA.md`, drabina GWS (0 zł → 3 900 zł), zasada „liczby tylko potwierdzone”.

---

## Zasada wspólna dla e-commerce: „Edenova Approved”

Niezależnie od wybranego prototypu proponuję jeden mechanizm, który spina oba biznesy:

> **Produkt trafia do sklepu tylko wtedy, gdy przeszedł test Piotra i ma kartę testu.**

Karta testu przy każdym produkcie:
- jaki problem ogrodu rozwiązuje (odwołanie do filaru GWS, np. Mikroklimat, Bezpieczeństwo),
- gdzie i jak był sprawdzony (budowa, sezon, warunki),
- jakie błędy wykonawcze pomaga ominąć (biblioteka CE),
- czego produkt **nie** robi (granice, jak w produktach GWS),
- do jakiego ogrodu/rośliny/donicy pasuje.

Dlaczego to ma sens biznesowy: sklep z akcesoriami konkuruje ceną, a sklep z kartą testu konkuruje zaufaniem. Ten sam protokół dowodowy, który sprzedaje audyt, sprzedaje produkt. Każda karta testu to też gotowy materiał na rolkę, artykuł SEO i e-mail.

**Uwaga (FAKT):** dopóki produkt nie jest realnie przetestowany, nie wolno mu dawać oznaczenia. Pusty sklep z 5 sprawdzonymi produktami jest lepszy niż 50 produktów „na wiarę”.

---

## Prototyp 1: ATELIER, czyli „Gabinet eksperta”

### Idea
Sklep wygląda jak strona prywatnej pracowni doradczej, a nie jak sklep. Na pierwszym planie Piotr, metoda i sposób pracy. Produkty cyfrowe, audyty i wyposażenie są „narzędziami pracowni”. Klimat redakcyjny, dużo powietrza, mało przycisków.

### Dla kogo najlepiej działa
Segment B (inwestor przed odbiorem) i klient realizacji premium. Klient, który kupuje człowieka, a nie produkt.

### Strona główna (od góry)
1. **Hero**: pełnoekranowe zdjęcie ogrodu o zmierzchu, jedno zdanie: „Ogród nie jest dekoracją posesji. Jest codziennym środowiskiem życia.” Jeden przycisk: „Zacznij od diagnozy”.
2. **Manifest**: „Najpierw człowiek. Potem przestrzeń.” oraz sześć zasad pracy w dwóch kolumnach.
3. **Metoda**: 10 filarów jako cienkie linie z nazwami, a pod nimi wzór wyniku 0–100.
4. **Ścieżka współpracy**: drabina Poziom 0 → 4 jako oś pozioma z cenami.
5. **Wyposażenie pracowni**: 3–4 produkty Edenova Approved jako obiekty na tle papieru, bez „kup teraz” w miniaturze.
6. **O autorze**: prawdziwa historia (Wiesbaden, Ausbildung 1,0, 16 lat) i prawdziwy cytat.
7. **Przykładowy raport**: podgląd PDF z wyraźnym oznaczeniem „demonstracyjny”.
8. **Stopka**: kontakt, rynki PL/DE, Impressum.

### Kluczowe podstrony
- **Karta usługi (Audyt P4)**: przebieg krok po kroku, co dostajesz, czego nie ma w zakresie, przycisk „Umów rozmowę”.
- **Karta produktu fizycznego**: zdjęcie w ogrodzie, karta testu, „Dlaczego mamy to w pracowni”.

### Ocena
| | |
|---|---|
| Konwersja na usługi premium | ★★★★★ |
| Sprzedaż e-commerce | ★★☆☆☆ (produkty są w tle) |
| Budowa na Shopify | Łatwa: mało stron, dużo treści |
| Utrzymanie | Niskie |
| Skalowanie na DE | Dobre: marka osobista działa w DE (@deingartenupdate) |
| Ryzyko | Sklep zależy od Piotra. Trudno skalować bez jego twarzy. |

### Prompty do mockupów
**Desktop, strona główna**
```
Luxury editorial website homepage mockup for a premium garden consultancy brand "EDENOVA", full-page desktop screenshot 1440px wide, shown on a clean studio background. Hero: full-bleed photograph of a mature private garden at dusk with warm path lighting, stone terrace and an olive tree, dark olive overlay. Large light-weight serif headline (Source Serif style, weight 300) in warm off-white, one thin gold outline button. Below: generous white space on warm paper background #F4F0E8, a two-column manifesto section, a minimal horizontal line diagram of 10 pillars, a horizontal 5-step service ladder with small prices, a row of 3 premium garden products photographed like museum objects on paper background, an author section with a documentary portrait of a landscape builder on site. Color palette: dark olive #283128, muted gold #B89655, paper #F4F0E8, ink #1A1B18. Typography: light serif display + clean humanist sans. Aesthetic references: high-end architecture studio websites, Aesop-level restraint. No bright colors, no stock-photo people smiling, no white plastic furniture, no blue pool water. Minimal readable text, elegant grid, lots of negative space.
```
**Karta usługi / produktu**
```
Premium service detail page mockup, desktop 1440px, brand "EDENOVA". Left column: large documentary photo of an expert inspecting a stone terrace with a measuring tape and a tablet. Right column: light serif title, short calm paragraphs, a vertical timeline of 5 audit steps, a boxed section "What is not included" with thin gold border, a single dark olive button. Below: a downloadable sample report preview with a visible "DEMO" badge. Warm paper background #F4F0E8, dark olive #283128 and gold #B89655 accents, light-weight serif headings. Editorial, quiet, trustworthy, no clutter.
```
**Mobile**
```
Mobile website mockup (iPhone frame, 390px) for premium garden consultancy "EDENOVA": full-screen dusk garden hero with a light serif headline and one thin gold button, then a paper-colored section with a vertical 5-step ladder of services and prices, then an author portrait card. Dark olive and muted gold palette, lots of white space, elegant and calm.
```

---

## Prototyp 2: DIAGNOZA, czyli sklep nawigowany problemem (filary GWS)

### Idea
Klient nie wybiera kategorii produktów. Wybiera **problem, który czuje**. Menu to sygnały i filary GWS: „Za gorąco na tarasie”, „Sąsiad widzi stół”, „Ciemno po zmroku”, „Rośliny w donicach nie przeżywają zimy”, „Woda stoi po deszczu”. Każda strona problemu ma trzy piętra: **wiedza (dlaczego tak jest) → diagnoza (który poziom GWS) → rozwiązanie (sprawdzone produkty lub realizacja)**.

To jedyny prototyp, w którym metodologia jest **architekturą sklepu**, a nie tylko treścią.

### Dla kogo najlepiej działa
Segment A (właściciel 1–3 lata po realizacji, „jest ładnie, ale z tego nie korzystamy”) oraz ruch z Google o intencji problemowej.

### Strona główna (od góry)
1. **Hero z pytaniem**: „Co nie działa w Twoim ogrodzie?” i 6 kafli sygnałów (tekst + mała fotografia sytuacji).
2. **Para zdjęć 12:40 / 18:40**: ten sam taras, różnica sześciu godzin. Tłumaczy metodę bez słów.
3. **Mini-diagnoza (quiz 5 pytań)**: wynik wskazuje najsłabszy filar i ścieżkę. Zbiera e-mail (zastępuje Poziom 0 w koszyku).
4. **10 filarów** jako siatka kart. Każda karta prowadzi do strony problemu.
5. **Sprawdzone rozwiązania**: produkty pogrupowane pod problemy, a nie pod kategorie.
6. **Kiedy potrzebny ekspert**: drabina P1–P4 z jasnym kryterium „kiedy DIY nie wystarczy”.
7. **Biblioteka błędów wykonawczych**: 3 przykłady CE (po weryfikacji prawdziwych kodów).

### Kluczowe podstrony
- **Strona problemu**, np. „Rośliny w donicach nie przeżywają zimy”:
  - dlaczego (korzeń marznie szybciej niż korona, donica nie izoluje),
  - jak sprawdzić samemu (3 obserwacje),
  - sprawdzony zestaw (np. Olive Winter PRO po testach),
  - kiedy wezwać eksperta (P3/P4 albo realizacja).
- **Karta produktu**: nagłówek to problem, a nie nazwa produktu; karta testu; „pasuje do Twojego wyniku, jeśli…”.

### Ocena
| | |
|---|---|
| Konwersja na usługi premium | ★★★★☆ |
| Sprzedaż e-commerce | ★★★★☆ (produkt sprzedawany w momencie uświadomienia problemu) |
| Budowa na Shopify | Średnia: strony problemów jako szablon + metaobjects |
| Utrzymanie | Średnie: każda nowa strona problemu to treść |
| Skalowanie na DE | Bardzo dobre: problemy są uniwersalne, w DE wejście przez „Mängel” |
| SEO | Najlepsze z pięciu: każda strona problemu to fraza z intencją |
| Ryzyko | Wymaga treści na start. Rozwiązanie: 4 strony problemów zamiast 10. |

### Prompty do mockupów
**Desktop, strona główna**
```
Premium e-commerce homepage mockup, desktop 1440px full page, brand "EDENOVA" - a garden wellbeing diagnostic store. Hero on dark olive #283128 background: large light serif question headline, beneath it a grid of 6 elegant tiles, each with a small atmospheric photo of a garden problem situation (hot sunny terrace at midday, neighbour's window overlooking a dining table, dark garden path at night, frost-covered olive tree in a large planter, puddle on stone paving after rain, unused lawn) and a short caption. Next section on warm paper #F4F0E8: a side-by-side photo pair of the same stone terrace at 12:40 in harsh sun and at 18:40 in soft shade, with thin gold timestamps. Then a minimal 5-question quiz card with gold progress line. Then a 10-card grid of pillars with thin line icons. Then a row of premium tested garden products grouped under a problem heading, each with a small gold "tested" seal. Muted gold #B89655 accents, light-weight serif headlines, humanist sans body. Calm, intelligent, editorial luxury. No bright colors, no cartoon icons, no blue pool water.
```
**Strona problemu + karta produktu**
```
Desktop 1440px mockup of a problem-solution landing page for premium garden brand "EDENOVA". Title area: light serif headline about potted plants not surviving winter, subtitle in sans. Section 1 "Why": a clean technical cross-section illustration of a large planter showing root ball, cold penetrating from the pot walls, and insulation layers, drawn in thin gold and olive lines on paper background. Section 2 "Check it yourself": three numbered observation cards. Section 3 "Tested solution": product hero of an anthracite breathable winter cover on a mature olive tree in a large planter wrapped with a thick coconut mat and elegant wide straps, snowy premium garden, with a "Test card" panel listing tested conditions and limits. Section 4 "When to call an expert": a quiet card with a dark olive button. Palette dark olive #283128, gold #B89655, paper #F4F0E8.
```
**Mobile**
```
Mobile mockup (390px iPhone frame) for "EDENOVA" garden diagnostic store: dark olive screen with a light serif question and a 2-column grid of 6 photo tiles showing garden problems; next screen a 5-question quiz with a thin gold progress bar; next screen a result card showing the weakest pillar and a recommended tested product with a small gold seal. Elegant, minimal, premium.
```

---

## Prototyp 3: DWA WEJŚCIA, czyli „Wiedza | Wyposażenie”

### Idea
Najbardziej klasyczna i najprostsza architektura. Strona główna dzieli się na dwie połowy: **Wiedza i usługi** (GWS, audyty, księga) oraz **Wyposażenie** (sprawdzone produkty). Obie połowy mają własne menu, a łączy je wspólna marka i sekcja „Sprawdzone przez Piotra”.

### Dla kogo najlepiej działa
Klient, który przychodzi z jasną intencją (albo „chcę audyt”, albo „szukam ochrony zimowej”). Dobre dla ruchu z reklam produktowych.

### Strona główna (od góry)
1. **Hero dzielony pionowo**: lewa połowa to ogród o zmierzchu i „Wiedza i diagnoza”, prawa to produkt w ogrodzie zimą i „Sprawdzone wyposażenie”. Hover powiększa stronę.
2. **Pasek zaufania**: 16 lat PL/DE · Ausbildung 1,0 · 7 bramek kontroli jakości (tylko liczby potwierdzone).
3. **Sekcja Wiedza**: drabina P0–P4 w kartach.
4. **Sekcja Wyposażenie**: kategorie (Ochrona zimowa, Nawadnianie donic, Ogrzewanie roślin), a później kolejne.
5. **Most**: „Nie wiesz, czego potrzebujesz? Zacznij od 7 sygnałów” (e-mail).
6. **O autorze + stopka**.

### Ocena
| | |
|---|---|
| Konwersja na usługi premium | ★★★☆☆ |
| Sprzedaż e-commerce | ★★★★☆ |
| Budowa na Shopify | Najłatwiejsza: standardowy motyw, kolekcje |
| Utrzymanie | Niskie |
| Skalowanie na DE | Dobre |
| Ryzyko | **Rozdziela markę na dwa sklepy w jednym.** Klient produktowy nie wchodzi w wiedzę, klient wiedzy nie widzi produktów. Traci się główną przewagę: jedno źródło zaufania. |

### Prompty do mockupów
**Desktop, strona główna**
```
Premium garden brand homepage mockup "EDENOVA", desktop 1440px. Hero split vertically into two equal halves: left half - dusk photograph of a refined private garden with warm lighting, dark olive overlay, light serif label "Knowledge & Diagnosis"; right half - winter photograph of a mature olive tree in a large anthracite planter protected by a breathable anthracite cover and coconut insulation mat, light serif label "Tested Equipment". Thin gold vertical divider line. Below: a slim trust bar with three facts in small caps. Then two parallel sections: left a 5-card service ladder with prices, right a 3-card product category grid (winter protection, planter irrigation, plant heating). Palette dark olive #283128, muted gold #B89655, warm paper #F4F0E8. Light-weight serif headlines, clean sans body, luxury minimalism.
```
**Karta produktu**
```
Luxury e-commerce product page mockup, desktop 1440px, brand "EDENOVA". Large gallery left: product in real premium garden context in winter (anthracite breathable plant cover with a full vertical zipper on a tall olive tree, planter wrapped in a thick coconut mat with wide branded straps). Right: light serif product title, price, size selector S/M/L/XL shown as elegant pills, colour swatches anthracite and warm beige, one dark olive add-to-cart button, a collapsible "Test card" panel and a "What's included" list with thin line icons. Paper background, gold accents, generous spacing.
```
**Mobile**
```
Mobile mockup 390px of "EDENOVA" store: stacked split hero (knowledge photo on top, equipment photo below, each with a light serif label), then a horizontal scroll of product cards, then a dark olive email signup card. Premium, minimal.
```

---

## Prototyp 4: STANDARD, czyli „Edenova Approved” jako galeria produktów

### Idea
Sklep prowadzi e-commerce, ale w formie **kuratorowanej galerii**, a nie katalogu. Niewiele produktów, każdy pokazany jak obiekt w muzeum, z pełną kartą testu, rysunkiem technicznym i zdjęciem z realnej budowy. Wiedza (GWS) pełni rolę **standardu**, który nadaje produktom wiarygodność. Audyty i księga to „Standard dla profesjonalistów i właścicieli”.

### Dla kogo najlepiej działa
Klient premium kupujący produkt (Olive Winter PRO, nawadnianie donic) oraz **B2B**: pracownie i wykonawcy, którzy kupują sprawdzony sprzęt i licencję standardu.

### Strona główna (od góry)
1. **Hero produktowy**: flagowiec (np. Olive Winter PRO) w zimowym ogrodzie premium, nagłówek „Sprawdzone tam, gdzie kompromis kosztuje najwięcej.”
2. **Czym jest Edenova Approved**: 4 kroki testu (problem → test na budowie → sezon → karta testu).
3. **Kolekcja**: 6–9 produktów, duże zdjęcia, pod każdym jeden problem, który rozwiązuje.
4. **Rysunek techniczny**: przekrój donicy z ochroną ROOT + CROWN, jako „dowód myślenia”.
5. **Standard GWS**: księga, audyty, licencja B2B.
6. **Dla profesjonalistów**: cennik B2B, licencja „Garden Wellbeing Standard”.

### Ocena
| | |
|---|---|
| Konwersja na usługi premium | ★★★☆☆ |
| Sprzedaż e-commerce | ★★★★★ (najlepsza prezentacja produktu) |
| Budowa na Shopify | Średnia: wymaga dobrych zdjęć i rysunków |
| Utrzymanie | Średnie: każdy produkt wymaga testu i sesji zdjęciowej |
| Skalowanie na DE | Bardzo dobre: „geprüft”, „Qualitätssicherung” to język rynku DE |
| B2B | Najlepsze z pięciu |
| Ryzyko | **Na dziś nie ma jeszcze ani jednego przetestowanego produktu fizycznego.** Sklep otwarty dziś w tej wersji byłby pusty albo nieuczciwy. To wersja na etap 2, nie na start. |

### Prompty do mockupów
**Desktop, strona główna**
```
Curated luxury product gallery homepage mockup, desktop 1440px, brand "EDENOVA APPROVED". Hero: cinematic winter photograph of a premium private garden, mature olive tree in a large dark planter protected by an elegant anthracite breathable cover and thick natural coconut insulation with wide branded straps, soft snow, warm window light in background. Light serif headline in off-white. Next: a 4-step horizontal process strip with thin gold line icons (problem, site test, full season, test card). Then a gallery grid of 6 premium garden products photographed like museum objects on warm paper background, each with one line caption and a tiny gold seal. Then a large technical cross-section drawing of a planter with root and crown protection layers in thin olive and gold lines. Palette dark olive #283128, gold #B89655, paper #F4F0E8. Restrained, architectural, museum-like. No clutter, no discount badges.
```
**Karta produktu**
```
Desktop 1440px mockup of a flagship product page for "EDENOVA Olive Winter PRO". Top: wide cinematic winter garden hero with the product installed on an olive tree. Below: two-column layout - left an exploded technical drawing showing ROOT module (insulated planter, heating cable, thermostat) and CROWN module (breathable cover, zipper, drawstrings) in thin gold lines; right a size selector S/M/L/XL with planter diameter hints, colour choice anthracite / warm beige, price and one dark olive button. Then a "Test card" table with tested conditions and explicit limits, and a "Plug, protect, forget" three-step installation strip. Paper background, premium, technical and calm.
```
**Mobile**
```
Mobile mockup 390px for "EDENOVA APPROVED": full-bleed winter olive tree hero, then a vertical product gallery of museum-style product shots on paper background with small gold seals, then an expandable test card. Luxury, quiet, technical.
```

---

## Prototyp 5: SEZON, czyli sklep prowadzony kalendarzem ogrodu

### Idea
Strona główna zmienia się z porą roku. Oś sklepu to **12 miesięcy życia ogrodu premium**: co zrobić teraz, jaka wiedza jest teraz potrzebna, jakie produkty są teraz sprawdzone. Jesień: zazimowanie nawadniania i ochrona roślin. Zima: ogrzewanie i czujniki. Wiosna: audyt przed sezonem i przed upływem rękojmi. Lato: mikroklimat, cień, nawadnianie wakacyjne.

### Dla kogo najlepiej działa
Budowanie **LTV i powracających klientów**. Najlepiej łączy się z e-mailem, przypomnieniami sezonowymi i cross-sellem.

### Strona główna (od góry)
1. **Hero sezonowy**: „Wrzesień w ogrodzie: 3 rzeczy, które trzeba zrobić przed pierwszym mrozem.”
2. **Oś roku**: poziomy pasek 12 miesięcy z zaznaczonym „teraz”.
3. **Teraz w ogrodzie**: 3 zadania, każde z krótką wiedzą, sprawdzonym produktem i opcją „zrobimy to za Ciebie” (usługa).
4. **Kalendarz Edenova**: zapis na e-mail z przypomnieniami sezonowymi (lead magnet nr 2).
5. **Diagnoza całoroczna**: drabina GWS jako „przegląd roczny ogrodu”.
6. **Z budowy**: rolki i case study z bieżących realizacji.

### Ocena
| | |
|---|---|
| Konwersja na usługi premium | ★★★☆☆ (usługa „zrobimy za Ciebie” to dodatkowy przychód) |
| Sprzedaż e-commerce | ★★★★☆ (sprzedaż w momencie potrzeby) |
| Powracający klienci / LTV | ★★★★★ |
| Budowa na Shopify | Średnia: sekcje sezonowe podmieniane 4× w roku |
| Utrzymanie | **Najwyższe z pięciu**: strona musi żyć, inaczej wygląda na porzuconą |
| Ryzyko | Wymaga dyscypliny treści. Jeśli w lutym wisi wrzesień, marka premium traci wiarygodność. |

### Prompty do mockupów
**Desktop, strona główna**
```
Premium seasonal garden store homepage mockup, desktop 1440px, brand "EDENOVA". Hero: early autumn photograph of a refined private garden with first frost on grass at sunrise, large planters with olive trees and grasses, soft golden light. Light serif headline in off-white about preparing the garden before the first frost. Below the hero: an elegant horizontal 12-month timeline with thin gold ticks and the current month highlighted. Then three task cards side by side, each with a small photo, a short knowledge note, a tested product thumbnail and a subtle secondary link "we can do it for you". Then a dark olive band with an email signup for a seasonal garden calendar. Palette dark olive #283128, muted gold #B89655, warm paper #F4F0E8, clay #A8563A as a tiny accent. Editorial luxury, calm, no bright colors.
```
**Strona zadania sezonowego**
```
Desktop 1440px mockup of a seasonal task page for "EDENOVA": title about winterising a terrace irrigation system. Step-by-step visual guide with 4 numbered photos of hands draining a drip line and opening a drain valve on a premium terrace with large planters, a tested kit product card on the right with a small gold seal, and a bottom card offering an on-site service. Paper background, light serif headings, gold line details.
```
**Mobile**
```
Mobile mockup 390px for "EDENOVA" seasonal store: autumn garden hero with a light serif headline, a horizontally scrollable 12-month timeline with the current month in gold, stacked task cards with product thumbnails, and a dark olive seasonal calendar signup card. Premium and minimal.
```

---

## Porównanie

| Kryterium | 1 Atelier | 2 Diagnoza | 3 Dwa wejścia | 4 Standard | 5 Sezon |
|---|---|---|---|---|---|
| Sprzedaż usług i audytów | 5 | 4 | 3 | 3 | 3 |
| Sprzedaż produktów | 2 | 4 | 4 | 5 | 4 |
| Spójność wiedza + produkt | 3 | **5** | 2 | 4 | 4 |
| SEO / ruch organiczny | 2 | **5** | 3 | 3 | 4 |
| Łatwość budowy | **5** | 3 | **5** | 3 | 3 |
| Niskie utrzymanie | **5** | 3 | **5** | 3 | 1 |
| Gotowość na DE | 4 | 5 | 4 | 5 | 4 |
| Da się otworzyć teraz, uczciwie | 5 | 4 | 4 | **1** | 3 |

(5 = najlepiej. Ocena to moja REKOMENDACJA ekspercka, nie wynik testów z klientami.)

---

## Rekomendacja

**Buduj prototyp 2 (Diagnoza) jako architekturę. Wizualnie weź spokój prototypu 1 (Atelier). Mechanizm „Edenova Approved” z prototypu 4 dodaj wtedy, gdy będą pierwsze przetestowane produkty.**

Dlaczego:
1. **Tylko w nim metodologia jest silnikiem sprzedaży, a nie ozdobnikiem.** GWS nazywa problem, a sklep od razu daje trzy wyjścia: zrób sam (PDF), zapytaj eksperta (audyt), kup sprawdzone rozwiązanie (produkt). Jeden klient może kupić wszystkie trzy.
2. **SEO**: strony problemów to frazy z intencją zakupową („woda stoi na tarasie”, „jak zabezpieczyć oliwkę w donicy na zimę”). To ruch, za który nie płacisz reklamą.
3. **Skaluje się na DE bez przebudowy**: te same problemy, inny język wejścia (Mängel, Qualität).
4. **Da się otworzyć małym krokiem**: 4 strony problemów + istniejące produkty GWS. E-commerce dochodzi problem po problemie, zawsze jako produkt sprawdzony.

Czego **nie** robić: prototypu 3. Najłatwiej go zbudować, ale rozcina markę na dwa sklepy i zabija główną przewagę, czyli to, że produkt poleca ten sam człowiek, który diagnozuje ogród.

Prototyp 5 (Sezon) nie jako architektura, tylko jako **warstwa e-mail i jedna sekcja na stronie głównej**. Daje LTV bez kosztu utrzymywania całej strony w rytmie pór roku.

---

## Jak generować mockupy

- Prompty są po angielsku, bo generatory obrazów lepiej je rozumieją.
- **Generatory psują tekst**, szczególnie polskie znaki. Oceniaj układ, nastrój i hierarchię, a nie napisy. Treść wstawimy przy budowie.
- Najpierw wygeneruj **tylko desktop strony głównej** dla wszystkich 5 wersji i porównaj je obok siebie. Karty produktu i mobile generuj tylko dla 1–2 finalistów.
- Jeśli generator ignoruje paletę, dopisz na końcu: `strict color palette: #283128, #B89655, #F4F0E8, #1A1B18 only`.
