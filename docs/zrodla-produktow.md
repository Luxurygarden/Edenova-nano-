# Źródła produktów

## Modele pozyskania
| Model | Kiedy | Plus | Minus |
|-------|-------|------|-------|
| **Stock** (własny magazyn) | Małe, sezonowe, rotujące (kaptury, maty, ocieplacze) | Kontrola jakości, szybka wysyłka, zestawy | Zamrożona gotówka, ryzyko końca sezonu |
| **Dropship** | Elektronika grzewcza, donice XL | Zero stanu | Niższa marża, brak kontroli wysyłki |
| **Marka własna** | Po 1 sezonie na bestsellerach | Najwyższa marża, marka | Minimalne ilości, wymaga produkcji |

## Gdzie szukać (do weryfikacji – nie sprawdzałem konkretnych firm)
- **Niemcy**: hurtownie GaLaBau i dystrybutorzy włóknin/mat grzewczych – Twoje kontakty z DE to przewaga.
- **Polska**: producenci włóknin i wyrobów z juty/filcu (ocieplacze pod marką własną), producenci donic fiberglass/corten.
- **Targi**: spoga+gafa (Kolonia), GaLaBau (Norymberga) – bezpośrednio producenci.
- **Platformy dropship B2B w UE** – tylko z magazynem w UE (czas dostawy, brak cła).
- Unikać: bezpośredni import z Azji na start (MOQ, cło, certyfikacja CE urządzeń grzewczych na Ciebie).

## Kryteria dostawcy (checklista)
- [ ] Cena netto EUR + koszt transportu do PL
- [ ] Dostępność w sezonie (IX–XII) – czy nie zabraknie w listopadzie
- [ ] Deklaracja CE / instrukcja PL dla produktów elektrycznych
- [ ] Zdjęcia w wysokiej jakości + prawo do użycia
- [ ] Dropship: czas wysyłki, neutralna paczka, API/plik stanów
- [ ] Zwroty i reklamacje – kto ponosi koszt
- [ ] MOQ i warunki płatności

Każdy dostawca → wiersze w `data/products.csv` (kolumna `supplier`, `sourcing_model`).
