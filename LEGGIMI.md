# Sito di Libra Terra Creativa

Un unico sito per tutti i mondi di Libra: **https://libraterracreativa.github.io/**

| Indirizzo | Pagina |
|---|---|
| `/` | Home di Libra: i tre mondi, i prossimi eventi, chi siamo, contatti |
| `/eventi/` | Eventi del mese (sempre lo stesso link) — ora Novembre 2026 |
| `/eventi/archivio/` | Tutti i mesi passati |
| `/eventi-privati/` | Matrimoni, cene, compleanni, ritiri, team building |
| `/casa-libra/` | Casa Libra · B&B, con calendario delle prenotazioni |

## Pubblicare la Fase 2 (una volta)

### 1. Caricare i file nuovi
Nel repository `libraterracreativa.github.io` → **Add file → Upload files** e trascina, dalla cartella `Libra siti/libraterracreativa.github.io`:
- `index.html` (la home, sostituisce quella provvisoria)
- le cartelle `eventi-privati`, `casa-libra`, `scripts`
- la cartella `eventi` (contiene il nuovo `dati.js` e l'`archivio`)
- la cartella `assets` (foto nuove + stile aggiornato)

Commit.

La cartella nascosta **`.github`** non si trascina bene: creala a mano con **Add file → Create new file**, nome `.github/workflows/sync-calendar.yml`, e incolla il contenuto del file che trovi nella cartella sul computer (premi ⇧⌘. nel Finder per vedere le cartelle nascoste).

### 2. I 3 secrets del calendario (vanno rimessi nel nuovo repository)
**Settings → Secrets and variables → Actions → New repository secret**, come fatto per `casalibra`:
`ICAL_MARINE`, `ICAL_FORESTA`, `ICAL_RELAX` con i link `.ics` di Airbnb.
Poi **Actions → Sincronizza calendario Airbnb → Run workflow**: deve diventare verde.

### 3. I vecchi indirizzi portano a quelli nuovi
Nella cartella `Libra siti/vecchi siti - reindirizzamenti`:
- repository **`casalibra`**: sostituisci `index.html` con quello di `reindirizzamenti/casalibra/`. Poi **Actions → Sincronizza calendario Airbnb → ⋯ → Disable workflow** (ora la sincronizzazione la fa il nuovo sito).
- repository **`EVENTI`**: sostituisci `index.html` con quello di `reindirizzamenti/EVENTI/`.

Chi apre un vecchio link arriva automaticamente alla pagina nuova.

### 4. Linktree e Instagram
- Link principale: `https://libraterracreativa.github.io/`
- Eventi: `https://libraterracreativa.github.io/eventi/`
- Eventi privati: `https://libraterracreativa.github.io/eventi-privati/`
- Casa Libra: `https://libraterracreativa.github.io/casa-libra/`

## Ogni mese
Mandami la nuova Librazine: aggiorno
- `eventi/dati.js` (eventi, appuntamenti fissi, prezzi),
- i colori in cima a `eventi/index.html`,
- le pagine sfogliabili in `assets/img/librazine/`,
- l'archivio (`eventi/archivio/index.html`).

La home mostra da sola i prossimi eventi del mese. **I link non cambiano mai.**

## Dove si cambia cosa
- **Eventi del mese e prezzi**: `eventi/dati.js` (elenchi `EVENTI` e `FISSI`; per ogni evento `price`, `priceLabel`, `priceNote`; con `link` la prenotazione apre un sito esterno).
- **Colori del mese**: blocco `:root` in cima a `eventi/index.html`.
- **Stile e comportamenti comuni** (menu, vetro, cursore, grana, modulo di prenotazione): `assets/css/libra.css`, `assets/js/libra.js`.
- **Casa Libra**: `casa-libra/index.html` (prezzi camere in `ROOMS=`). Le date occupate arrivano in `casa-libra/data/availability.json` dalla sincronizzazione oraria.
