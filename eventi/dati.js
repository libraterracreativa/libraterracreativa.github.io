/* Dati del mese: li legge la pagina /eventi/ e la home (prossimi eventi). */
/* =========================================================
   EVENTI DI DICEMBRE 2026 · unica fonte dei dati della pagina
   Per aggiornare il mese: cambiare MESE, EVENTI e FISSI (e la palette in alto).
   when: [['inizio','fine'], …]   price: '25€' · priceLabel: 'a persona' · priceNote: '+ …'
   link: indirizzo esterno di prenotazione (se vuoto si apre il modulo) · orario: testo dell'orario se diverso da 'inizio – fine'
   FISSI · salta: ['AAAA-MM-GG', …] giorni in cui l'appuntamento fisso non c'è (es. Natale)
   ========================================================= */
var MESE={anno:2026,mese:11 /* 0 = gennaio */,nome:'dicembre',pagine:12,cartellaPagine:'/assets/img/librazine/2026-12/'};
var IMG='/assets/img/eventi/2026-12/';
/* Fascia "il mese prima non è finito": finché non arriva la data 'fino', in cima alla pagina compare un link agli eventi del mese precedente.
   Si nasconde da sola. OGNI MESE: aggiornare nome, link (la pagina del mese che sta finendo) e fino (il 1° del mese nuovo). Per toglierla: var MESE_PRIMA=null; */
/* Giorni di festa evidenziati nel calendario (con il tema natalizio, che si accende in assets/js/tema-natale.js). */
var FESTE_MESE={'2026-12-24':'Vigilia','2026-12-25':'Natale','2026-12-26':'S. Stefano','2026-12-31':'S. Silvestro'};
var MESE_PRIMA=null; /* es. {nome:'novembre',link:'/eventi/2026-11/',fino:'2026-12-01'} */
var CATEGORIE={
  benessere:{nome:'Benessere',colore:'var(--c-benessere)'},
  interiorita:{nome:'Interiorità',colore:'var(--c-interiorita)'},
  famiglia:{nome:'Famiglia',colore:'var(--c-famiglia)'},
  cucina:{nome:'Cucina',colore:'var(--c-cucina)'},
  arte:{nome:'Arte',colore:'var(--c-arte)'}
};
var EVENTI=[
 {id:'educare',titolo:'Come educare alla libertà in famiglia',chi:'con la dott.ssa Serena Luisi · Progetto Campo Armonico (Centro Eidos)',cat:'famiglia',img:'educare.jpg',tag:'Incontro 2 di 2',
  when:[['2026-12-02T18:00','2026-12-02T20:00']],
  testo:"Dalla teoria alla pratica educativa: un laboratorio esperienziale in piccolo gruppo per esplorare come educare alla libertà nella famiglia e nei contesti educativi.",
  extra:"<p>Con gli strumenti della Psicoterapia della Gestalt si parte da esperienze e situazioni quotidiane portate dai partecipanti, per comprendere le dinamiche relazionali e trovare insieme risposte educative più consapevoli, capaci di favorire la crescita e l'autonomia dei bambini.</p>",
  price:'25€',priceLabel:'a famiglia',book:'Come educare alla libertà in famiglia · dott.ssa Serena Luisi (Mercoledì 2 Dicembre, 18:00–20:00)'},
 {id:'sound-duelune',titolo:'Sound Bath',chi:'con Greta e Maurizio · duelune, sound & movement',cat:'benessere',img:'sound-duelune.jpg',contain:true,tag:'Sound healing',
  when:[['2026-12-04T19:00','2026-12-04T20:30']],
  testo:"Un viaggio di profondo rilassamento, dove la parola diventa un dolce invito a lasciar andare i pensieri e ad abbandonarsi alle emozioni che il suono risveglia nel corpo.",
  extra:"<p>Le vibrazioni delle campane ci riportano alle nostre radici: un percorso sonoro di rilascio emotivo attraverso le frequenze di diversi strumenti e gli elementi che ci abitano, Terra, Fuoco, Acqua, Aria ed Etere. Un vortice di suoni che scioglie le tensioni e ricongiunge anima e corpo.</p>",
  price:'25€',priceLabel:'a persona',book:'Sound Bath con Greta e Maurizio · duelune (Venerdì 4 Dicembre, 19:00–20:30)'},
 {id:'casette',titolo:'Casette di luce',chi:'workshop di ceramica con Linda Bianchi Cervini',cat:'arte',img:'casette.jpg',contain:true,tag:'Workshop',
  when:[['2026-12-05T15:30','2026-12-05T18:00']],
  testo:"Due ore e mezza per creare casette o alberi di Natale porta lumini, tutti personalizzati: il regalo fatto a mano che illuminerà le tue feste, o quelle di qualcun altro.",
  extra:"<p>Lavoreremo la terraglia bianca con la tecnica della lastra, perfetta per le forme strutturate. Cottura e materiali compresi.</p>",
  price:'45€',priceLabel:'a persona',book:'Casette di luce · workshop di ceramica con Linda Bianchi Cervini (Sabato 5 Dicembre, 15:30–18:00)'},
 {id:'brunch',titolo:'Sunday Brunch',chi:'la domenica, senza fretta e tutta vegetale · by Libra',cat:'cucina',img:'brunch.jpg',contain:true,tag:'2 domeniche',
  when:[['2026-12-06T12:00','2026-12-06T16:00'],['2026-12-20T12:00','2026-12-20T16:00']],
  testo:"Il brunch vegetale della domenica, con il menu di dicembre.",
  extra:"<ul><li><b>Pancakes</b> alle pere caramellate con scaglie di cioccolato fondente e sciroppo d'acero</li><li><b>Croissants</b> e marmellata</li><li><b>Avocado toast</b> con feta di mandorle, semi di zucca e polvere di radicchio</li><li><b>Hummus</b> di barbabietola con verdura fresca e focaccia cotta a legna</li></ul>",
  price:'35€',priceLabel:'a persona',book:'Sunday Brunch (Domenica 6 o 20 Dicembre, 12:00–16:00 – specifica la data)'},
 {id:'piatti',titolo:"Piatti d'Autore",chi:'workshop di ceramica con Linda Bianchi Cervini',cat:'arte',img:'piatti.jpg',contain:true,tag:'Workshop',
  when:[['2026-12-06T15:00','2026-12-06T17:00']],
  testo:"Ognuno decora il proprio piatto biscottato scegliendo liberamente il tema: fiori, frutta, scritte, motivi geometrici, un ricordo, un regalo per qualcuno di speciale. Non serve saper disegnare: ogni piatto sarà un pezzo unico.",
  extra:"<p>Compresi un piatto da decorare, tutti i materiali e le cotture. Si possono acquistare altri pezzi da decorare oltre a quello incluso.</p>",
  price:'40€',priceLabel:'a persona',book:"Piatti d'Autore · workshop di ceramica con Linda Bianchi Cervini (Domenica 6 Dicembre, 15:00–17:00)"},
 {id:'ceramica',titolo:'Ceramica base',chi:'con Linda Bianchi Cervini',cat:'arte',img:'ceramica.jpg',tag:'Laboratorio',
  when:[['2026-12-10T18:00','2026-12-10T20:00']],
  testo:"Un laboratorio aperto a tutti per modellare un piccolo oggetto con la tecnica del pizzicato, decorarlo e seguirne il processo fino alla cottura. Un'esperienza lenta e creativa per entrare in contatto con la materia.",
  extra:"<p>Si può partecipare anche a un solo incontro: ogni lezione è completa e indipendente.</p>",
  price:'40€',priceLabel:'a persona',book:'Ceramica base con Linda Bianchi Cervini (Giovedì 10 Dicembre, 18:00–20:00)'},
 {id:'sound-pisani',titolo:'Sound Bath · campane di cristallo',chi:'con Benedetta Pisani',cat:'benessere',img:'sound-pisani.jpg',contain:true,tag:'Crystal bowls',
  when:[['2026-12-11T18:30','2026-12-11T19:30']],
  testo:"Un'esperienza immersiva di ascolto e rilassamento: le vibrazioni delle campane di cristallo si diffondono nello spazio creando un paesaggio sonoro avvolgente. Una pausa dalla quotidianità, vissuta attraverso il suono.",
  extra:'',price:'25€',priceLabel:'a persona',book:'Sound Bath con Benedetta Pisani (Venerdì 11 Dicembre, 18:30–19:30)'},
 {id:'cnv',titolo:'Introduzione alla Comunicazione Nonviolenta',chi:'con Giacomo Poleschi',cat:'interiorita',img:'cnv.jpg',contain:true,tag:'Seminario di 2 giorni',
  when:[['2026-12-12T09:30','2026-12-12T18:00'],['2026-12-13T09:30','2026-12-13T17:00']],
  testo:"«Parlare onestamente senza criticare, ascoltare con curiosità senza sentire giudizio.» Imparare ad ascoltare, a esprimere con chiarezza ciò di cui hai bisogno, a gestire i conflitti della vita quotidiana.",
  extra:"<p>Esploreremo i modi di comunicare che ci allontanano da noi stessi e dagli altri, e riscopriremo il potere di scegliere un modo di relazionarci più in armonia con i nostri valori. Sabato 9:30–18:00, domenica 9:30–17:00. Posti limitati: massimo 25 partecipanti.</p><p><b>Prossimi incontri 2027:</b></p><ul><li><b>9–10 gennaio</b> · Dare parole vive a ciò che conta</li><li><b>30–31 gennaio</b> · Vivere pienamente la rabbia, liberarsi dal senso di colpa</li><li><b>6–7 marzo</b> · Parlare e ascoltare: la CNV con bambini e adolescenti</li></ul>",
  price:'130€',priceLabel:'a persona',book:'Introduzione alla Comunicazione Nonviolenta con Giacomo Poleschi (Sabato 12 e Domenica 13 Dicembre)'}
];
/* giorni: 1 = lunedì … 7 = domenica */
var NATALE=['2026-12-25'];
var FISSI=[
 {titolo:'Yoga Posturale',chi:'con Mathieu',giorni:'Lunedì e Venerdì · 9:30–10:30',regole:[[1,'09:30','10:30'],[5,'09:30','10:30']],salta:NATALE,
  testo:"Movimento, mobilità, allungamento, stabilità e respiro per riconoscere le tensioni accumulate e migliorare la qualità del movimento. Accessibile a tutti, anche senza esperienza.",price:'20€',priceLabel:'a lezione',book:'Yoga Posturale con Mathieu (Lunedì o Venerdì 9:30 – specifica la data)'},
 {titolo:'Yoga Terapia',chi:'con Silvia Callarelli',giorni:'Martedì · 18:15–19:15',regole:[[2,'18:15','19:15']],
  testo:"Respiro, grounding, meditazione in movimento e regolazione del sistema nervoso per integrare corpo e mente. Lezioni private, di coppia o di gruppo.",price:'20€',priceLabel:'a lezione',book:'Yoga Terapia con Silvia Callarelli (Martedì 18:15)'},
 {titolo:'QHR Lab',chi:'Qigong Human Resonance · Matteo Martorana',giorni:'Martedì 19:30 · Venerdì 10:45',regole:[[2,'19:30','20:30'],[5,'10:45','11:45']],salta:NATALE,
  testo:"Qigong e resonance frequency breathing, aperto a tutti i livelli: postura, respiro e intenzione, con sensori HRV per osservare la risposta del corpo alla pratica.",price:'20€',priceLabel:'a lezione',book:'QHR Lab con Matteo Martorana (Martedì 19:30 o Venerdì 10:45 – specifica la data)'},
 {titolo:'Allenamento funzionale',chi:'personalizzato · con Simone Gatti',giorni:'Lunedì–Sabato · su appuntamento',regole:[],
  testo:"Un percorso personalizzato che parte da una valutazione di abitudini, forza, equilibrio, mobilità e resistenza. Sessioni individuali o di coppia, per ogni fase della vita.",price:'da 35€',priceLabel:'a sessione',book:'Allenamento funzionale personalizzato con Simone Gatti'}
];
