# Automatyzacja – docelowy pipeline

```
Cennik dostawcy (CSV/API)
   → products.csv  (aktualizacja kosztów)
   → pricing.mjs   (cena, marża, status)          ← JEST
   → Shopify       (draft przez import CSV / Admin API)
   → Opis produktu AI (wg szablonu eksperckiego) + kontrola człowieka
   → Google Shopping / Meta (feed z Shopify)
   → Raport tygodniowy: sprzedaż, marża, stany, produkty REVIEW
```

## Kolejność wdrożenia
1. **Jest**: silnik cen + import CSV. Ręczne uruchomienie, zero kosztów.
2. **Następnie**: synchronizacja przez Shopify Admin API (aktualizacja cen i stanów istniejących SKU zamiast ponownego importu) – dopiero gdy katalog > ~50 SKU.
3. **Opisy AI**: szablon opisu = problem klienta → jak działa → błąd wykonawczy, którego unika → co w zestawie → dobór rozmiaru. Generowane jako draft.
4. **Feed cen dostawcy dropship** – dzienny import stanów, automatyczne ukrywanie produktów bez stanu.
5. **Raport tygodniowy** (zaplanowane zadanie) – marża rzeczywista vs. założona.

## Zasada
Automat liczy i przygotowuje. **Publikuje człowiek.** Błędna cena w sklepie premium kosztuje więcej niż 5 minut kontroli.
