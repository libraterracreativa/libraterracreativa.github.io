// Sincronizza le date occupate di Casa Libra dai calendari Airbnb (iCal)
// e le scrive in data/availability.json, che il sito legge per il calendario.
//
// I link iCal contengono un token privato: NON scriverli mai in questo repository.
// Vanno impostati come secrets GitHub (ICAL_MARINE, ICAL_FORESTA, ICAL_RELAX)
// e arrivano qui come variabili d'ambiente.
//
// Uso locale (Node 18+):  ICAL_MARINE=... ICAL_FORESTA=... ICAL_RELAX=... node scripts/sync-ical.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises';

const ROOMS = {
  marine: process.env.ICAL_MARINE,
  foresta: process.env.ICAL_FORESTA,
  relax: process.env.ICAL_RELAX,
};
const OUT = new URL('../casa-libra/data/availability.json', import.meta.url);

/** Converte 20261024 (o 20261024T120000Z) in "2026-10-24". */
const toDay = (v) => `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;

/** Estrae gli intervalli [check-in, check-out) da un file iCal. Solo date: nessun dato degli ospiti. */
function parseIcal(text) {
  const unfolded = text.replace(/\r?\n[ \t]/g, '');
  const ranges = [];
  for (const [, ev] of unfolded.matchAll(/BEGIN:VEVENT([\s\S]*?)END:VEVENT/g)) {
    const start = ev.match(/DTSTART[^:\n]*:(\d{8})/);
    const end = ev.match(/DTEND[^:\n]*:(\d{8})/);
    if (start && end) ranges.push([toDay(start[1]), toDay(end[1])]);
  }
  const seen = new Set();
  return ranges
    .filter(([s, e]) => s < e && !seen.has(s + e) && seen.add(s + e))
    .sort((a, b) => a[0].localeCompare(b[0]));
}

async function fetchRoom(name, url) {
  if (!url) throw new Error(`Manca il secret ICAL_${name.toUpperCase()}`);
  const res = await fetch(url, { headers: { 'User-Agent': 'CasaLibra-sync/1.0' } });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const text = await res.text();
  if (!text.includes('BEGIN:VCALENDAR')) throw new Error(`${name}: risposta non iCal`);
  return parseIcal(text);
}

let previous = { rooms: {} };
try { previous = JSON.parse(await readFile(OUT, 'utf8')); } catch { /* primo avvio */ }

const rooms = {};
let failures = 0;
for (const [name, url] of Object.entries(ROOMS)) {
  try {
    rooms[name] = await fetchRoom(name, url);
    console.log(`${name}: ${rooms[name].length} intervalli occupati`);
  } catch (err) {
    // Se un calendario non risponde, teniamo le date precedenti invece di mostrare tutto libero.
    failures++;
    rooms[name] = previous.rooms?.[name] ?? [];
    console.error(`ATTENZIONE ${err.message} — mantengo i dati precedenti`);
  }
}
if (failures === Object.keys(ROOMS).length) {
  console.error('Nessun calendario raggiungibile: file non aggiornato.');
  process.exit(1);
}

// Aggiorna il file solo se le date sono cambiate (evita commit inutili ogni ora).
if (JSON.stringify(previous.rooms) === JSON.stringify(rooms)) {
  console.log('Nessuna variazione.');
} else {
  await mkdir(new URL('.', OUT), { recursive: true }); // se la cartella manca (es. dopo un ricaricamento) la ricrea
  await writeFile(OUT, JSON.stringify({ updated: new Date().toISOString(), rooms }, null, 2) + '\n');
  console.log('availability.json aggiornato.');
}
