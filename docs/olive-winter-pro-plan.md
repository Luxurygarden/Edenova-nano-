# EDENOVA Olive Winter PRO — plan od prototypu do pierwszej sprzedaży

Priorytet #1 (sekcja 21 master systemu). Status: **START — krok 1 nie rozpoczęty**.
Wszystkie parametry techniczne poniżej to wymagania funkcjonalne, nie konkretne komponenty — zgodnie z zasadą "nie zgaduj parametrów", dobór realnego komponentu wymaga karty katalogowej producenta.

## Architektura produktu
- **ROOT**: ochrona bryły korzeniowej + izolacja donicy + kontrolowane ogrzewanie
- **CROWN**: ochrona pnia i korony + ogrzewanie + oddychający pokrowiec premium
- Zasada UX: plug → protect → forget. Zero cięcia przewodów, zero instalacji elektrycznej przez klienta — tylko gotowe, certyfikowane komponenty zgodne z instrukcją producenta.

## 15 kroków (kolejność wiążąca)

| # | Krok | Status | Wynik / plik |
|---|---|---|---|
| 1 | Zamknąć BOM (moduły ROOT/CROWN, wymagania) | **Szkielet gotowy** | `bom-olive-winter-pro.csv` — wymagania funkcjonalne wpisane, komponenty `DO USTALENIA` |
| 2 | Wybrać kabel grzewczy | Nie rozpoczęte | Wymaga: karta katalogowa, moc/m, certyfikat CE, IP dla gruntu/donicy |
| 3 | Wybrać termostat / system sterowania | Nie rozpoczęte | Zintegrowany z kablem czy osobny — do ustalenia z dostawcą |
| 4 | Znaleźć materiał pokrowca | Nie rozpoczęte | Wloknina techniczna, gramatura do potwierdzenia testem (nie zgadywać 120–180 g/m² jako pewnik) |
| 5 | Znaleźć wykonawcę pokrowca (szwalnia) | Nie rozpoczęte | PL lub DACH — patrz `zrodla-produktow.md` |
| 6 | Wybrać izolację donicy | Nie rozpoczęte | Zweryfikować deklarowane zastosowanie (mata przeciwerozyjna ≠ izolacja termiczna) |
| 7 | Dobrać pasy i mocowania | Nie rozpoczęte | |
| 8 | Zbudować prototyp M | Nie rozpoczęte | Wariant M jako pierwszy — środek rozstawu S–XL |
| 9 | Przeprowadzić test | Nie rozpoczęte | Realna zima / komora klimatyczna — potwierdzić metodę testu |
| 10 | Policzyć unit economics | Narzędzie gotowe | `unit-economics.mjs` — podstawić realny landed cost po kroku 9 |
| 11 | Ustalić S/M/L/XL na bazie prototypu M | Nie rozpoczęte | Skalowanie mocy/materiału per rozmiar donicy |
| 12 | Przygotować branding i opakowanie | Nie rozpoczęte | Anthracite / Warm Beige, subtelny branding EDENOVA |
| 13 | Zdjęcia / video | Nie rozpoczęte | Wymaga gotowego prototypu |
| 14 | Karta Shopify | Szablon gotowy | Struktura karty w `../docs/strategia.md` sekcja Shopify (do rozbudowy wg pkt 14 master systemu) |
| 15 | Uruchomić pierwszą serię testową | Nie rozpoczęte | Etap 1 stage-gate (`product-lab.md`) — retail test |

## Blokery do odblokowania przez Ciebie (decyzje/kontakty, nie research z pamięci AI)
- Kontakt do producenta/dystrybutora kabli grzewczych ogrodniczych (DE/PL) z kartą katalogową i certyfikatem CE.
- Kontakt do szwalni technicznej zdolnej uszyć wzór z zamkiem pełnym + ściągaczami w małej serii (5–20 szt na start).
- Próbki materiału na izolację donicy — zamówić 2–3 warianty gramatur i porównać fizycznie, zanim wybierzesz jeden.

## FAKT / ZAŁOŻENIE / HIPOTEZA w tym dokumencie
- **FAKT**: architektura ROOT+CROWN i zasada plug→protect→forget pochodzą wprost z Twojego briefu.
- **ZAŁOŻENIE**: rozstaw wariantów S(≤60cm)/M(60–90cm)/L(90–130cm)/XL(>130cm) — przyjąłem roboczo, do potwierdzenia z realnymi wymiarami donic premium na rynku PL/DE.
- **HIPOTEZA**: wariant M jako pierwszy prototyp będzie najtańszy do przetestowania i najszerzej zbywalny — do zweryfikowania popytem.
