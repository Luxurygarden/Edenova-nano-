# edenova.pl: projekt strony i prompty do mockupów

Cel strony: **zamienić obcego człowieka w klienta, który płaci za wiedzę Piotra**, jak najczęściej bez udziału Piotra.
Scenariusz sekcji: `edenova-pl-scenariusz.md`. Ten dokument mówi, jak to ma wyglądać i jak to zarabia.

---

## 1. Do czego ta strona nas prowadzi (model zarabiania)

Strona to lejek, a nie wizytówka. Każda sekcja ma przesunąć człowieka o jeden krok.

| Etap | Co robi klient | Kto pracuje | Przychód |
|---|---|---|---|
| **Wejście** | Ogląda film, rozpoznaje swój ogród | Nikt (strona) | 0 zł |
| **Lead** | Pobiera „7 sygnałów” za e-mail | Nikt (formularz + automatyczny mail) | 0 zł, ale buduje bazę |
| **Sekwencja e-mail** | Dostaje 5–7 maili: historia, błędy, para zdjęć 12:40/18:40, zaproszenie do P1 | Nikt (automat) | — |
| **Produkty cyfrowe** | Kupuje P1 (297 zł) i P2 (790 zł), Księgę (349 zł) | Nikt (Shopify + automatyczna wysyłka PDF) | **Przychód bez Twojego czasu** |
| **Usługi** | P3 (1 490 zł), P4 (3 900 zł), Prywatny Audyt (od 12 000 zł) | Ty | Wysoki przychód, Twój czas |
| **Realizacja** | Audyt zaliczony na poczet ogrodu | Ty + ekipa | 150–400 tys. zł kontraktu |

**Szczerze o „zarabianiu, kiedy śpisz”:**
- Bez Twojego czasu działa tylko warstwa **lead → e-mail → PDF**. To jedyna część, która skaluje się niezależnie od Ciebie.
- Audyty zawsze wymagają Twojego czasu. Tam skaluje się **cena i filtr**: strona ma przysyłać mniej, ale lepszych klientów, którzy już przeczytali PDF i wiedzą, za co płacą.
- Trzeci poziom skalowania przychodzi później: **licencja GWS dla pracowni** (B2B). Wtedy inni robią audyty w Twoim standardzie, a Ty zarabiasz na licencji.

Strona bez sekwencji e-mail to połowa systemu. Film przyciąga, a maile sprzedają.

---

## 2. Jak strona wygląda: komputer i telefon

### Komputer (1440 px i więcej)
- Film w tle zajmuje cały ekran. Scroll przewija film klatka po klatce, bez cięć.
- Tekst pojawia się **po lewej stronie w dolnej części ekranu**, na delikatnym przyciemnieniu, jasnym szeryfem (Source Serif 4, waga 300). Mały złoty nadtytuł nad nagłówkiem, rozstrzelone litery.
- Menu: logo EDENOVA po lewej. Po prawej 3 linki (Metoda · O mnie · Sklep) i jeden cienki złoty przycisk „Umów rozmowę”. Menu jest ledwo widoczne i pojawia się przy ruchu myszki.
- Po prawej stronie, pionowo, cienki pasek postępu z 10 kropkami sekcji.
- Sekcje „Ścieżka” (cennik) i „Piotr” mają wyjątkowo panel z treścią na tle papieru (#F4F0E8), który wysuwa się na film. Tam jest więcej czytania.

### Telefon (390 px)
- Film w pionie (9:16), osobno kadrowany. Obiekt zawsze w środku, lżejsza wersja 720p.
- Tekst na dole ekranu, jedna myśl na ekran, maks. 2 linijki nagłówka.
- Zamiast paska postępu: cienka złota linia u góry ekranu, która rośnie przy przewijaniu.
- Menu jako jedna ikona i **stały przycisk na dole ekranu „7 sygnałów za darmo”**. Na telefonie to główny cel: e-mail, a nie od razu zakup.
- Cennik (ścieżka) jako pionowe karty jedna pod drugą, a nie oś pozioma.

**Zasada:** na komputerze celem jest „Umów rozmowę” (klient premium często ogląda przy biurku). Na telefonie celem jest e-mail (ruch z Instagrama).

---

## 3. Pięć klatek kluczowych: co mają pokazać

Każda klatka to jeden moment filmu z nałożonym wyglądem strony. Oceniamy **nastrój, światło, kadr i układ tekstu**, a nie dokładność napisów.

| # | Sekcja | Po co ta klatka |
|---|---|---|
| A | Świt, otwarcie | Pierwsze 3 sekundy decydują, czy ktoś zostaje. Ma być cicho i luksusowo, bez „sprzedawania”. |
| B | Relacje, wieczorny stół | Emocja: „chcę tak żyć”. Najmocniejszy obraz całej strony. |
| C | GWS, siatka filarów na ogrodzie | Moment zrozumienia: ogród można zmierzyć. Tu pojawia się wiedza. |
| D | Ścieżka i cennik | Moment decyzji: od 0 zł do audytu prywatnego. |
| E | Piotr, prawdziwa budowa | Zaufanie: za tym stoi człowiek, a nie AI. |

---

## 4. Prompty

Wspólne zasady w każdym prompcie: paleta #283128 / #B89655 / #F4F0E8 / #1A1B18, jasny szeryf, zero jaskrawych kolorów, zero białych plastikowych mebli, zero niebieskiego basenu, ludzie bez widocznych twarzy albo w sylwetce (uniknie efektu „stock photo”).

### A. Świt, otwarcie

**Komputer**
```
Single website hero frame mockup, 16:9, desktop 1440px browser view without browser chrome. Full-bleed cinematic photograph: dawn over a mature private garden designed for everyday living - a stone terrace, a wooden bench with a folded linen blanket, a book and a ceramic cup left on it, ornamental grasses, a multi-stem tree, low mist, first warm sunlight grazing the leaves, calm and quiet, shot like a high-end architecture film still. Subtle dark gradient at the bottom left. Overlaid website UI: small logo "EDENOVA" top left in thin letter-spaced capitals, three tiny menu links and one thin gold outline button top right, a thin vertical progress line with 10 small dots on the right edge. Bottom left: a tiny letter-spaced gold overline, beneath it a large elegant light-weight serif headline in warm off-white across two lines. Palette: dark olive #283128, muted gold #B89655, warm paper #F4F0E8. Luxury, restrained, lots of negative space. No bright colors, no people's faces, no stock-photo look.
```
**Telefon**
```
Single mobile website frame mockup, iPhone 390x844 vertical, no device frame. Full-bleed vertical cinematic photograph: dawn in a mature private garden, wooden bench with a folded linen blanket, a book and a ceramic cup, grasses, mist, first warm light, subject centred. Thin gold progress line at the very top. Small "EDENOVA" logo and a menu icon at the top. Bottom third: soft dark gradient, a tiny gold overline, a two-line light-weight serif headline in warm off-white, and a full-width slim dark olive button fixed at the bottom of the screen. Palette #283128, #B89655, #F4F0E8. Quiet luxury, no faces, no bright colors.
```

### B. Relacje, wieczorny stół

**Komputer**
```
Single website section frame mockup, 16:9, desktop 1440px. Full-bleed cinematic photograph at blue hour: a long solid wood dining table on a natural stone terrace in a private garden, set for eight with linen, candles and simple ceramics, warm string of soft lights in a tree above, people seen only as soft backlit silhouettes talking and laughing, lanterns along a path, deep green garden fading into darkness. Bottom left overlay: small gold letter-spaced overline, a large light serif headline in warm off-white, one short line of sans-serif text. Thin vertical progress line with 10 dots on the right edge, the fourth dot highlighted in gold. Palette dark olive #283128, gold #B89655, paper #F4F0E8. Emotional, warm, premium, film still quality, no faces visible, no bright colors.
```
**Telefon**
```
Single mobile website frame mockup, 390x844 vertical, no device frame. Vertical cinematic photograph at blue hour: long wooden dining table on a stone terrace, candles, soft lights in a tree, backlit silhouettes of family and friends, table centred in frame. Thin gold progress line at top at about 35 percent. Bottom: dark gradient, small gold overline, two-line light serif headline in warm off-white, slim dark olive button fixed at the bottom. Premium, warm, no faces.
```

### C. GWS, siatka filarów na ogrodzie

**Komputer**
```
Single website section frame mockup, 16:9, desktop 1440px. Full-bleed aerial photograph, late afternoon, looking down at a complete private garden designed around daily life: terrace, dining area, quiet shaded corner with water, path, planting beds, lawn, privacy hedge. Overlaid on the photo: an elegant thin gold line diagram - 10 small labelled points placed on different zones of the garden, connected by fine lines, like an architectural annotation. Centre right: a refined circular gauge in thin gold line showing a score from 0 to 100. Left side: small gold overline, large light serif headline in warm off-white, two short lines of sans-serif text. Dark olive tint over the photograph for contrast. Palette #283128, #B89655, #F4F0E8. Intelligent, precise, calm, luxury consulting aesthetic. No bright colors, no infographic clip-art.
```
**Telefon**
```
Single mobile website frame mockup, 390x844 vertical. Top half: aerial vertical photograph of a private garden with 10 small thin gold annotation points on different zones connected by fine lines, dark olive tint. Bottom half on dark olive #283128: a thin gold circular score gauge, below it a light serif headline in warm off-white and one line of sans text. Thin gold progress line at the top at about 55 percent. Elegant, precise, minimal.
```

### D. Ścieżka i cennik

**Komputer**
```
Single website section frame mockup, 16:9, desktop 1440px. Left 40 percent: cinematic photograph of a path of large natural stone stepping slabs leading through a refined private garden toward a warm lit house at dusk, camera low, looking forward. Right 60 percent: a warm paper #F4F0E8 panel sliding over the image, with a light serif headline in ink #1A1B18 and a vertical sequence of 6 elegant rows connected by a thin gold line: each row has a small step number, a short title in serif, one line of sans description and a price aligned right. The first row is marked free, the last row is visually more prominent with a thin gold border and a dark olive button. Luxury consulting price list, calm, lots of spacing, no discount badges, no bright colors.
```
**Telefon**
```
Single mobile website frame mockup, 390x844 vertical. Top: short cinematic strip photo of natural stone stepping slabs in a garden at dusk. Below, on warm paper #F4F0E8: light serif headline in ink, then vertically stacked elegant cards connected by a thin gold line on the left, each card with a step number, short serif title and price; the last card larger with a thin gold border and a dark olive button. Premium, clean, easy to read.
```

### E. Piotr, prawdziwa budowa

**Komputer**
```
Single website section frame mockup, 16:9, desktop 1440px. Left 55 percent: documentary style photograph of a landscape builder in his thirties on a real garden construction site, seen from behind or in three-quarter view without a clear face, working hands placing a natural stone edge with a rubber mallet, a laser level and string lines visible, compact excavator softly out of focus in background, morning light, authentic, not staged. Right 45 percent on warm paper #F4F0E8: small gold overline, name in large light serif, three short facts in small letter-spaced capitals separated by thin gold lines, a quote in italic serif, a small signature-like line and a thin gold outline button. Palette #283128, #B89655, #F4F0E8, #1A1B18. Honest, expert, premium, no stock-photo smile, no bright colors.
```
**Telefon**
```
Single mobile website frame mockup, 390x844 vertical. Top 55 percent: documentary vertical photograph of a landscape builder's hands placing a natural stone edge with a mallet, string line and laser level, morning light, no face. Bottom on warm paper #F4F0E8: small gold overline, name in light serif, three short facts in small caps, a two-line italic quote. Slim dark olive button fixed at bottom. Authentic, premium.
```

---

## 5. Jak to generować i oceniać

1. Najpierw **tylko wersje komputerowe A–E** (5 obrazów). Oceń, czy to jedna spójna historia, czy pięć różnych stron.
2. Jeśli spójne, dopiero wtedy wersje telefonowe.
3. Oceniaj według 3 pytań:
   - Czy klient z domem za 3 mln zł poczuje, że to jego świat?
   - Czy widać, że za tym stoi wiedza, a nie tylko ładne zdjęcia?
   - Czy wiadomo, co kliknąć?
4. Te obrazy to **kierunek, nie finalny materiał**. Klatka E w finalnej stronie musi być Twoim prawdziwym zdjęciem z budowy, a nie AI. To jest cała przewaga nad konkurencją.

## 6. Co dalej po zatwierdzeniu mockupów

1. Mapa strony: sekcja → tekst → przycisk → strona Shopify.
2. Sekwencja 5–7 maili po pobraniu „7 sygnałów” (to jest część, która zarabia bez Ciebie).
3. Opis usługi „Prywatny Audyt Ogrodu” i dodanie jej do Shopify.
4. Lista ujęć z drona i z budów do nagrania teraz, jesienią.
5. Dopiero potem film i kod strony.
