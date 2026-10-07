# Sklep Edenova: stan na 07.10.2026 i plan uruchomienia strony

## 1. Stan sklepu (sprawdzony na żywo przez Shopify)
- Sklep „Edenova”, domena **edenovagws.com**, plan Basic, PLN.
- **73 produkty**: w większości aktywne, plus szkice (koncepcje zimowe i Księga GWS).
- **9 kolekcji**: Garden Wellbeing System (7), Materiały cyfrowe (5), Audyty i konsultacje (9), Biohort (12), in-lite oświetlenie (20), Nawadnianie (4), Serwis i pielęgnacja (4), PlantCARE (8), Plany ogrodu dopasowane do życia (7).
- Nowe od ostatniej rozmowy: Zestawy Zimowe S/M/L (749–949 zł), usługi nawadniania (649–4 490 zł), PlantCARE (990–1 490 zł), Biohort (2 050–11 300 zł), in-lite (39–2 199 zł).
- Kolekcja „Strona główna” jest pusta (0 produktów).
- **Ok. 8 aktywnych produktów nie ma zdjęcia** (głównie drabina GWS). Lista zostanie potwierdzona przy przeglądzie.

## 2. Przegląd folderów i materiałów (kolejność)
| # | Źródło | Co sprawdzamy |
|---|---|---|
| 1 | Pliki z ChatGPT (plan marketingowy + zdjęcia), wgrywa Piotr | Plan: grupy docelowe, hasła, oferty. Zdjęcia: jakość, prawa, czy to AI (podpis!). Przypisanie do sekcji i produktów. |
| 2 | `assets/` w repo | Katowice (wizualizacje), Kraków (prawdziwe), Piotr, styl-referencje (NIE do publikacji). |
| 3 | `docs/` w repo | Scenariusz filmu, mockupy, prototypy, plan GWS. Co wchodzi dziś, a co później. |
| 4 | Shopify: produkty i kolekcje | Brak zdjęć, opisy, ceny, szkice, tagi, kolejność kolekcji. |
| 5 | Shopify: ustawienia | Płatności (BLIK), regulamin, polityka zwrotów, prawo odstąpienia dla treści cyfrowych, dostawa, dane firmy. |

## 3. Strona: decyzja na dziś
**Strona główna sklepu Shopify przebudowana na nowo** (motyw, sekcje, zdjęcia, teksty). Powód: tylko tak „wszystko kupisz w jednym miejscu” działa **dziś** (koszyk, płatność, PDF-y, zamówienia już są). Film przewijany scrollem na edenova.pl zostaje jako etap 2.

Domena na dziś: edenovagws.com działa. Podpięcie **edenova.pl** do Shopify to ok. 15 minut w ustawieniach DNS. Decyzja Piotra.

### Struktura strony głównej
1. Hero: prawdziwe zdjęcie lub najlepsze zdjęcie z ChatGPT. Hasło: „Ogród nie jest dekoracją posesji. Jest codziennym środowiskiem życia.” Przyciski: Sklep · Darmowe 7 sygnałów.
2. Na teraz (jesień/zima): Zestawy Zimowe S/M/L, Zimowanie nawadniania, Jesienna opieka.
3. Kategorie (kafle): Garden Wellbeing System · Nawadnianie · Oświetlenie in-lite · Biohort · PlantCARE · Serwis.
4. Ścieżka GWS: 0 zł → 297 → 790 → 1 490 → 3 900 zł.
5. O Piotrze: Kraków (prawdziwe zdjęcia), cytat, 16 lat PL/DE.
6. Zapis na e-mail („7 sygnałów”).
7. Stopka: kontakt, regulamin, zwroty, dostawa.

## 4. Blokery przed udostępnieniem publicznie (sprawdzić dziś)
- [ ] **Biohort i in-lite:** czy Edenova ma zgodę dystrybutora lub umowę dealerską? Ceny, dostępność, czas dostawy, kto wysyła? Sprzedaż bez zgody albo bez towaru = ryzyko reklamacji i sporu z marką.
- [ ] Regulamin, polityka prywatności, zwroty, **zgoda na utratę prawa odstąpienia** przy PDF-ach.
- [ ] BLIK włączony (Ustawienia → Płatności).
- [ ] Usługi (audyty, nawadnianie, serwis): obszar działania i tryb terminu po zakupie, inaczej klient z Gdańska zapłaci za wizytę w Krakowie.
- [ ] Zdjęcia AI na produktach fizycznych: nie mogą udawać prawdziwego produktu.
- [ ] Zdjęcia dla ok. 8 produktów bez obrazka.
