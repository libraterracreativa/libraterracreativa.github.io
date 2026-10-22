/* Dati del mese: li legge la pagina /eventi/ e la home (prossimi eventi). */
/* =========================================================
   EVENTI DI NOVEMBRE 2026 · unica fonte dei dati della pagina
   Per aggiornare il mese: cambiare MESE, EVENTI e FISSI (e la palette in alto).
   when: [['inizio','fine'], …]   price: '25€' · priceLabel: 'a persona' · priceNote: '+ …'
   link: indirizzo esterno di prenotazione (se vuoto si apre il modulo) · orario: testo dell'orario se diverso da 'inizio – fine'
   ========================================================= */
var MESE={anno:2026,mese:10 /* 0 = gennaio */,nome:'novembre',pagine:12,cartellaPagine:'/assets/img/librazine/2026-11/'};
var IMG='/assets/img/eventi/2026-11/';
var CATEGORIE={
  benessere:{nome:'Benessere',colore:'var(--c-benessere)'},
  interiorita:{nome:'Interiorità',colore:'var(--c-interiorita)'},
  famiglia:{nome:'Famiglia',colore:'var(--c-famiglia)'},
  cucina:{nome:'Cucina',colore:'var(--c-cucina)'},
  arte:{nome:'Arte',colore:'var(--c-arte)'}
};
var EVENTI=[
 {id:'tarocchi',titolo:'Tarocchi & Astrologia',chi:'con FraSonica',cat:'interiorita',img:'tarocchi.jpg',pos:'center 30%',tag:'Sessioni individuali',
  when:[['2026-11-01T14:00','2026-11-01T20:00']],
  testo:"Una giornata dedicata all'ascolto e alla scoperta di sé attraverso due strumenti di introspezione. Si può prenotare una lettura privata dei Tarocchi di Marsiglia, per esplorare domande e situazioni personali con il linguaggio degli archetipi, oppure una lettura astrologica del proprio tema natale.",
  extra:'<p>Due percorsi distinti, da scegliere in base alla propria curiosità. Sessioni individuali in presenza da Libra, su prenotazione: indica nelle note se preferisci tarocchi o astrologia.</p>',
  price:'55€',priceLabel:'a sessione',book:'Tarocchi & Astrologia con FraSonica (Domenica 1 Novembre, sessione individuale 14:00–20:00)'},
 {id:'costellazioni-familiari',titolo:'Costellazioni Familiari',chi:'con Viviana Usai',cat:'interiorita',img:'costellazioni-familiari.jpg',tag:'Sistema familiare',
  when:[['2026-11-04T18:30','2026-11-04T22:00']],
  testo:"Un lavoro esperienziale per esplorare ciò che agisce in modo invisibile dentro di noi e nella nostra storia familiare. Attraverso il corpo, le Costellazioni Familiari e Sistemiche invitano a incontrare ciò che è rimasto irrisolto e ad accompagnarlo verso una trasformazione.",
  extra:"<p>Viviana Usai è psicologa, psicoterapeuta e formatrice. Da oltre vent'anni accompagna le persone in percorsi di crescita, integrando approcci psicocorporei, Costellazioni Familiari e Bioenergetica.</p>",
  price:'25€',priceLabel:'a persona',priceNote:'+ 30€ se porti la tua richiesta (la tua costellazione)',book:'Costellazioni Familiari con Viviana Usai (Mercoledì 4 Novembre, 18:30)'},
 {id:'brunch',titolo:'Sunday Brunch',chi:'i sapori di novembre · by Libra',cat:'cucina',img:'brunch.jpg',contain:true,tag:'2 domeniche',
  when:[['2026-11-08T12:00','2026-11-08T16:00'],['2026-11-29T12:00','2026-11-29T16:00']],
  testo:"Il brunch vegetale della domenica, con il menu dei sapori di novembre.",
  extra:'<ul><li><b>Pancakes</b> con ricotta di mandorle, confettura calda di pere e sciroppo d\'uva</li><li><b>Croissants</b></li><li><b>Avo toast</b> con feta veg e semi di zucca</li><li><b>Hummus</b> di barbabietola e focaccina cotta a legna</li></ul>',
  price:'35€',priceLabel:'a persona',book:'Sunday Brunch (Domenica 8 o 29 Novembre, 12:00–16:00 – specifica la data)'},
 {id:'educare',titolo:'Educare alla libertà attraverso i limiti',chi:'con la dott.ssa Serena Luisi · Centro Eidos',cat:'famiglia',img:'educare.jpg',tag:'Per genitori',
  when:[['2026-11-11T18:00','2026-11-11T20:00'],['2026-12-02T18:00','2026-12-02T20:00']],
  testo:"«Se pongo dei limiti o dico dei no, non starò forse bloccando l'autonomia di mio figlio?» Un incontro introduttivo sul valore dei limiti e sul ruolo di madre e padre nello sviluppo di autoregolazione, autonomia e fiducia nei bambini.",
  extra:'<p>Con la dott.ssa Serena Luisi, direttrice di Eidos aps, psicologa e psicoterapeuta, secondo la visione del Progetto Campo Armonico: Pedagogia Montessori, Psicoterapia della Gestalt e Neuroscienze dello sviluppo.</p><p><b>Secondo incontro · mercoledì 2 dicembre, 18:00–20:00:</b> laboratorio esperienziale in piccolo gruppo, dalla teoria alla pratica educativa.</p>',
  price:'25€',priceLabel:'a famiglia',priceNote:'stesso prezzo per il secondo incontro del 2 dicembre',book:'Educare alla libertà attraverso i limiti · dott.ssa Serena Luisi (Mercoledì 11 Novembre e/o Mercoledì 2 Dicembre, 18:00 – specifica nelle note)'},
 {id:'elements',titolo:'Elements of Life · inaugurazione',chi:'mostra di Serena Rossi a Casa Libra',cat:'arte',img:'elements-1.png',contain:true,tag:'A Casa Libra',
  when:[['2026-11-13T15:30','2026-11-13T19:30']],orario:'dalle 15.30',
  testo:"L'inaugurazione della mostra fotografica di Serena Rossi a Casa Libra, Valdicastello Carducci. Dalle 15:30 si può visitare la mostra e scoprire le stanze della nuova guest house.",
  extra:'<p>La mostra resta aperta fino al 13 maggio 2027. <a href="#mostra" style="color:var(--clay);text-decoration:underline">Leggi di più</a></p>',
  price:'Gratis',priceLabel:'ingresso libero',book:'Inaugurazione mostra Elements of Life · Serena Rossi a Casa Libra (Venerdì 13 Novembre, dalle 15:30)'},
 {id:'essenza',titolo:"Dall'essenza al suono",chi:"con Andrea Parigi · Cantore dell'Anima",cat:'benessere',img:'essenza-suono.jpg',tag:'Giornata intera',
  when:[['2026-11-14T10:00','2026-11-14T18:00']],
  testo:"Un'esperienza di presenza, silenzio interiore, meditazione e suono, per andare oltre le identificazioni della personalità e riscoprire il proprio vero Sé. Non si tratta di imparare a cantare, ma di imparare ad ascoltarsi.",
  extra:"<p>Da oltre 25 anni Andrea Parigi accompagna le persone in percorsi di ascolto, consapevolezza e risveglio della Coscienza: un canto intuitivo che nasce dall'ascolto profondo dell'Essere.</p>",
  price:'130€',priceLabel:'a persona',priceNote:'pranzo incluso',book:"Dall'essenza al suono con Andrea Parigi (Sabato 14 Novembre, 10:00–18:00)"},
 {id:'respiro',titolo:"L'arte del respiro",chi:'con Mathieu · Yoga Versilia',cat:'benessere',img:'arte-respiro.jpg',pos:'center 25%',tag:'Retreat',
  when:[['2026-11-15T09:30','2026-11-15T15:30']],
  testo:"Un workshop esperienziale sulla respirazione e sul suo legame con corpo, sistema nervoso e mente: le neuroscienze incontrano la tradizione millenaria dello yoga. Aperto a tutti, anche a chi non ha mai praticato.",
  extra:'<ul><li><b>9:30</b> Accoglienza e introduzione al respiro</li><li><b>10:00</b> La scienza del respiro: anatomia, sistema nervoso, neuroscienze</li><li><b>11:00</b> Il respiro nel movimento: pratica di yoga</li><li><b>12:00</b> Brunch vegano e condivisione</li><li><b>13:00</b> L\'arte del pranayama: tecniche e pratica guidata</li><li><b>14:00</b> Il respiro nella vita quotidiana</li><li><b>15:00</b> Conclusione</li></ul>',
  price:'',book:"L'arte del respiro con Mathieu (Domenica 15 Novembre, 9:30–15:30)"},
 {id:'merenda',titolo:'La merenda che vorrei',chi:'Libra × Sementis Bakery',cat:'cucina',img:'merenda.jpg',tag:'Merenda',
  when:[['2026-11-15T16:00','2026-11-15T18:00']],
  testo:"Una merenda lenta, da Libra, con i dolci artigianali di Sementis Bakery.",
  extra:'<ul><li><b>4 dolci artigianali</b> by Sementis Bakery</li><li><b>Focaccina</b> Amasia</li><li><b>2 infusi</b> naturali</li></ul>',
  price:'35€',priceLabel:'a coppia',book:'La merenda che vorrei · Libra × Sementis (Domenica 15 Novembre, 16:00–18:00)'},
 {id:'costellazioni-spirituali',titolo:'Costellazioni spirituali',chi:'con Maddalena Angeli',cat:'interiorita',img:'costellazioni-spirituali.jpg',tag:'Serata',
  when:[['2026-11-26T20:30','2026-11-26T22:30']],
  testo:"Uno strumento per guardare oltre ciò che appare ed esplorare, da una prospettiva più consapevole, le dinamiche che muovono eventi ed emozioni che non sempre riusciamo a comprendere.",
  extra:"<p>Ogni partecipante potrà vivere la propria costellazione, in un'esperienza collettiva dove chi pone la domanda, chi osserva e chi rappresenta condividono lo stesso spazio di ascolto.</p>",
  price:'35€',priceLabel:'a persona',book:'Costellazioni spirituali con Maddalena Angeli (Giovedì 26 Novembre, 20:30)'},
 {id:'riparo',titolo:'Il tempo del riparo',chi:'Habitat Counseling® con Cristina Giuntoli',cat:'interiorita',img:'riparo.jpg',tag:'Laboratorio',
  when:[['2026-11-28T15:00','2026-11-28T18:00']],
  testo:"Quando arriva il freddo cerchiamo il nostro angolo preferito. Tra natura, immagini, materiali e piccole esperienze creative esploriamo le metafore dell'abitare: il corpo come primo rifugio, la casa che ci contiene, le relazioni come spazi.",
  extra:'<p>Cristina Giuntoli è counselor a indirizzo pluralistico integrato, laureata in architettura e ideatrice di Habitat Counseling® e delle carte "Case Selvatiche: Tane, Gusci e Nidi™".</p>',
  price:'40€',priceLabel:'a persona',priceNote:'merenda inclusa',book:'Il tempo del riparo · Habitat Counseling con Cristina Giuntoli (Sabato 28 Novembre, 15:00)'},
 {id:'bagno-sonoro',titolo:'Bagno sonoro',chi:'con Benedetta Pisani',cat:'benessere',img:'bagno-sonoro.jpg',pos:'center 30%',tag:'Campane di cristallo',
  when:[['2026-11-29T10:00','2026-11-29T11:00']],
  testo:"Un'esperienza immersiva di ascolto e rilassamento: le vibrazioni delle campane di cristallo si diffondono nello spazio creando un paesaggio sonoro avvolgente. Una pausa dalla quotidianità, vissuta attraverso il suono.",
  extra:'',price:'25€',priceLabel:'a persona',book:'Bagno sonoro con Benedetta Pisani (Domenica 29 Novembre, 10:00)'}
];
/* giorni: 1 = lunedì … 7 = domenica */
var FISSI=[
 {titolo:'Yoga Posturale',chi:'con Mathieu',giorni:'Lunedì e Venerdì · 9:30–10:30',regole:[[1,'09:30','10:30'],[5,'09:30','10:30']],
  testo:"Movimento, mobilità, allungamento, stabilità e respiro per riconoscere le tensioni accumulate e migliorare la qualità del movimento. Non occorre essere flessibili né avere esperienza.",price:'20€',priceLabel:'a lezione',book:'Yoga Posturale con Mathieu (Lunedì o Venerdì 9:30 – specifica la data)'},
 {titolo:'Semi di Armonia',chi:'Progetto Campo Armonico · Centro Eidos · 3–6 anni',giorni:'Lunedì e Giovedì · 17:00–19:00',regole:[[1,'17:00','19:00'],[4,'17:00','19:00']],
  testo:"Laboratori serali per decomprimere dopo la scuola. Novembre: <b>Co-Regolazione, la Tana e la Magia della Luce</b> — tane con scatoloni e rami, risonanze sonore, il ritmo del respiro e giochi di luce.",price:'20€',priceLabel:'a lezione',book:'Semi di Armonia · Centro Eidos (Lunedì o Giovedì 17:00 – specifica la data)'},
 {titolo:'Yoga Terapia',chi:'con Silvia Callarelli',giorni:'Martedì · 18:15–19:15',regole:[[2,'18:15','19:15']],
  testo:"Lezioni private, di coppia o di gruppo: respiro, grounding, meditazione in movimento e regolazione del sistema nervoso, in modo dolce e consapevole.",price:'20€',priceLabel:'a lezione',book:'Yoga Terapia con Silvia Callarelli (Martedì 18:15)'},
 {titolo:'QHR Lab',chi:'Qigong Human Resonance · Matteo Martorana',giorni:'Martedì 19:30 · Venerdì 10:45',regole:[[2,'19:30','20:30'],[5,'10:45','11:45']],
  testo:"Qigong e resonance frequency breathing, aperto a tutti i livelli, con sensori HRV per osservare la risposta del corpo alla pratica.",price:'20€',priceLabel:'a lezione',book:'QHR Lab con Matteo Martorana (Martedì 19:30 o Venerdì 10:45 – specifica la data)'},
 {titolo:'Allenamento funzionale',chi:'personalizzato · con Simone Gatti',giorni:'Lunedì–Sabato · su appuntamento',regole:[],
  testo:"Un percorso di movimento personalizzato con approccio chinesiologico, per riequilibrare, riabilitare e potenziare.",price:'da 35€',priceLabel:'a sessione',book:'Allenamento funzionale personalizzato con Simone Gatti'}
];

