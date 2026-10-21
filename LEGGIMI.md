# Sito di Libra Terra Creativa

Un unico sito per tutti i mondi di Libra, pubblicato su **https://libraterracreativa.github.io/**

| Indirizzo | Pagina | Stato |
|---|---|---|
| `/eventi/` | Eventi del mese (sempre lo stesso link) | ✅ Novembre 2026 |
| `/` | Home di Libra | provvisoria → porta a /eventi/ |
| `/eventi-privati/` | Eventi privati | in arrivo (fase 2) |
| `/casa-libra/` | Casa Libra · B&B | in arrivo (fase 2) |

## Pubblicare (la prima volta)
1. Su GitHub, account **libraterracreativa** → **New repository**.
2. Nome del repository, **esattamente**: `libraterracreativa.github.io` · Public · Create.
3. **Add file → Upload files** e trascina **tutto il contenuto** di questa cartella (le cartelle `assets` ed `eventi`, `index.html`, questo file). Commit.
4. **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
5. Dopo un paio di minuti: **https://libraterracreativa.github.io/eventi/**

## Ogni mese
Mandami la nuova Librazine: aggiorno `eventi/index.html` (eventi, appuntamenti fissi e i colori della copertina) e aggiungo le pagine sfogliabili in `assets/img/librazine/`. Tu ricarichi i file cambiati: **il link non cambia mai**, quindi Linktree e Instagram restano uguali.

## Dove si cambia cosa (eventi/index.html)
- **Colori del mese**: blocco `:root` in alto ("PALETTE DEL MESE").
- **Eventi**: elenco `EVENTI` nello script in fondo. Per ogni evento: titolo, chi, categoria, foto, date (`when`), descrizione, **prezzo** (`price`, `priceLabel`, `priceNote`) e testo della prenotazione (`book`). Con `link` la prenotazione apre un sito esterno.
- **Appuntamenti fissi**: elenco `FISSI`.
- **Stile comune** a tutte le pagine: `assets/css/libra.css` e `assets/js/libra.js` (non serve toccarli ogni mese).
