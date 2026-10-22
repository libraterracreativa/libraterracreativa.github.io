# Sito di Libra Terra Creativa

Un unico sito per tutti i mondi di Libra: **https://librapietrasanta.com/**

Dominio comprato su Cloudflare (rinnovo automatico). DNS: 4 record A + 4 AAAA verso GitHub Pages e `www` → `libraterracreativa.github.io`, tutti "DNS only" (nuvola grigia). Il file `CNAME` nel repository contiene `librapietrasanta.com`: non cancellarlo. I vecchi indirizzi `libraterracreativa.github.io/...` portano da soli al dominio.

| Indirizzo | Pagina |
|---|---|
| `/` | Home di Libra: i tre mondi, i prossimi eventi, chi siamo, contatti |
| `/eventi/` | Eventi del mese (sempre lo stesso link) — ora Novembre 2026 |
| `/eventi/archivio/` | Tutti i mesi passati |
| `/eventi-privati/` | Matrimoni, cene, compleanni, ritiri, team building |
| `/casa-libra/` | Casa Libra · Guest House, con calendario delle prenotazioni |

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
- Link principale: `https://librapietrasanta.com/`
- Eventi: `https://librapietrasanta.com/eventi/`
- Eventi privati: `https://librapietrasanta.com/eventi-privati/`
- Casa Libra: `https://librapietrasanta.com/casa-libra/`

## Ogni mese
Mandami la nuova Librazine: aggiorno
- `eventi/dati.js` (eventi, appuntamenti fissi, prezzi) e la fascia `MESE_PRIMA` in cima allo stesso file: nome e link del mese che sta finendo e `fino` = il 1° del mese nuovo (la fascia "Ottobre non è finito · gli ultimi eventi" si nasconde da sola in quella data),
- i colori in cima a `eventi/index.html`,
- le pagine sfogliabili in `assets/img/librazine/`,
- l'archivio (`eventi/archivio/index.html`),
- le foto nuove alleggerite con `zsh scripts/ottimizza-foto.sh` (crea anche le versioni `-m` da 760 px che il sito usa dove le foto sono piccole),
- l'anteprima per WhatsApp/Instagram `assets/img/anteprime/eventi.jpg` (copertina sul colore del mese, con `scripts/anteprima-eventi.js`).

La home mostra da sola i prossimi eventi del mese. **I link non cambiano mai.**

## Dove si cambia cosa
- **Eventi del mese e prezzi**: `eventi/dati.js` (elenchi `EVENTI` e `FISSI`; per ogni evento `price`, `priceLabel`, `priceNote`; con `link` la prenotazione apre un sito esterno).
- **Colori del mese**: blocco `:root` in cima a `eventi/index.html`. `--clay` e i colori delle categorie colorano anche testi piccoli e pulsanti: vanno scelti abbastanza scuri da avere contrasto almeno 4,5:1 sul fondo (a novembre la ruggine della copertina è stata scurita da #C4622D a #A15025).
- **Stile e comportamenti comuni** (menu, vetro, cursore, grana, modulo di prenotazione): `assets/css/libra.css`, `assets/js/libra.js`.
- **Effetti** (passaggio tra le pagine, apertura con il logo alla prima visita, nastro di parole, card che si inclinano, timbro rotante): `assets/css/libra-fx.css`, `assets/js/libra-fx.js`, inclusi nel `<head>` di ogni pagina. Il nastro si mette con `<div class="ribbon-wrap"><div class="ribbon" data-ribbon="parola · parola"></div></div>`, il timbro con `<a class="stamp" href="…" data-stamp="testo · "></a>`.
- **Casa Libra**: `casa-libra/index.html` (prezzi camere in `ROOMS=`). Le date occupate arrivano in `casa-libra/data/availability.json` dalla sincronizzazione oraria.
