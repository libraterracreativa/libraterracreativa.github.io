/* =========================================================
   TEMA NATALIZIO · tutto il sito
   Riprende la copertina della Librazine di dicembre 2026: verde agrifoglio,
   bordeaux, rosa "zine", agrifoglio con le bacche e neve leggera.

   ▶ INTERRUTTORE (unico per tutto il sito):
       'natale-verde'  sfondo verde sfumato, sezioni scure bordeaux   ← attivo
       'natale'        sfondo crema normale, solo addobbi
       ''              tema spento (a gennaio)
   ========================================================= */
var TEMA_SITO='natale-verde';

(function(){
if(TEMA_SITO!=='natale'&&TEMA_SITO!=='natale-verde')return;
var VERDE=TEMA_SITO==='natale-verde';
var RID=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var H=document.documentElement;H.classList.add('tn');if(VERDE)H.classList.add('tn-verde');

/* ---------- agrifoglio (come nella copertina) ---------- */
var LEAF='M2 20 C10 14 14 6 22 9 C24 3 30 2 33 6 C38 1 46 2 48 7 C54 3 62 5 63 11 C70 9 78 12 80 18 C86 17 94 18 98 20 C94 22 86 23 80 22 C78 28 70 31 63 29 C62 35 54 37 48 33 C46 38 38 39 33 34 C30 38 24 37 22 31 C14 34 10 26 2 20 Z';
function leaf(x,y,rot,s){
  return '<g transform="translate('+x+' '+y+') rotate('+rot+') scale('+s+')"><path class="hl" d="'+LEAF+'" fill="#24401F"/><path d="M6 20 Q50 19 94 20" stroke="#F7E6DA" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/>'+
  '<path d="M33 20 L28 12 M33 20 L28 28 M50 20 L45 11 M50 20 L45 29 M66 20 L61 13 M66 20 L61 27" stroke="#F7E6DA" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/></g>';
}
function berry(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#9A1B17"/><circle cx="'+(x-r*.35)+'" cy="'+(y-r*.35)+'" r="'+(r*.28)+'" fill="#F0A3A0" opacity=".75"/>';}
function sprig(cls){
  return '<svg class="holly '+(cls||'')+'" viewBox="0 0 200 160" aria-hidden="true" focusable="false">'+
    leaf(96,74,-150,.95)+leaf(104,80,-30,.95)+leaf(98,88,85,.8)+berry(100,78,9)+berry(115,70,8)+berry(112,88,7.5)+'</svg>';
}
function mini(){return '<svg class="holly-mini" viewBox="8 14 184 104" aria-hidden="true" focusable="false">'+leaf(96,74,-150,.95)+leaf(104,80,-30,.95)+berry(100,78,11)+berry(116,70,9)+'</svg>';}

/* ---------- stile (entra subito, prima che la pagina si disegni) ---------- */
var cv='#18311A',cream='#FBEFE6',rosa='#F2A7A3',rosso='#B3221C';
/* sezioni "chiare" che con il verde diventano verdi con testi crema (foto e sezioni scure restano fuori) */
var L=['section:not(.dark):not(.h-hero):not(.pv-hero):not(.hero):not(.ask):not(.prenota):not(.arte):not(.libra):not(.panorama)','main.arch'];
function on(list,suffix){return list.map(function(s){return 'html.tn-verde '+s+(suffix||'');}).join(',');}
/* riquadri chiari: restano chiari con testo scuro */
var CARDS=['.nav','.mbar','.mmenu','.ecal-card','.ecal-panel','.ev','.reader','.next-pill','.cover .chip','.filters button',
  '.up','.step','.faq details','.marquee span','.month','.casa-img .tag','.room-main .count'];
var css=
'.holly{position:absolute;pointer-events:none;z-index:1;width:clamp(110px,14vw,210px);height:auto;filter:drop-shadow(0 10px 18px rgba(42,21,18,.12));transform-origin:50% 55%;}'+
(RID?'':'.holly.sway{animation:hollySway 7s ease-in-out infinite alternate;}.holly.sway.b{animation-duration:9s;animation-delay:-3s;}')+
'@keyframes hollySway{from{transform:rotate(var(--r,0deg)) translateY(0)}to{transform:rotate(calc(var(--r,0deg) + 6deg)) translateY(-6px)}}'+
'.holly.tr{right:-50px;top:84px;--r:200deg;transform:rotate(200deg);}'+
'.holly.br{right:1vw;bottom:-14px;--r:160deg;transform:rotate(160deg);}'+
'.holly.tr2{right:-30px;top:-20px;--r:200deg;transform:rotate(200deg);opacity:.92;}'+
'.holly.bl{left:-34px;bottom:-26px;--r:20deg;transform:rotate(20deg);opacity:.92;}'+
'.tn-deco{position:relative;overflow-x:clip;}'+
'.tn-deco>.wrap,.tn-deco>div:not(.holly){position:relative;z-index:2;}'+
'.snow{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;}'+
'.holly-mini{width:1.15em;height:auto;vertical-align:-.15em;}'+
'.garland{display:flex;align-items:center;gap:12px;margin:14px 0 0;color:#9A1B17;}'+
'.garland::before,.garland::after{content:"";height:1px;flex:1;max-width:120px;background:linear-gradient(90deg,transparent,rgba(154,27,23,.45));}'+
'.garland::after{background:linear-gradient(90deg,rgba(154,27,23,.45),transparent);}'+
'.garland .holly-mini{width:60px;}'+
'.ecal-cell.festa{background:linear-gradient(160deg,rgba(154,27,23,.10),rgba(36,64,31,.08));box-shadow:inset 0 0 0 1px rgba(154,27,23,.22);position:relative;}'+
'.ecal-cell.festa .ecal-num{color:#9A1B17;}'+
'.ecal-festa{display:flex;align-items:center;gap:3px;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#9A1B17;margin-top:auto;}'+
'.ecal-festa .holly-mini{width:32px;margin:0 2px 0 -2px;}'+
'.ev-date{box-shadow:inset 0 0 0 1.5px rgba(154,27,23,.35);}'+
'@media(max-width:760px){.ecal-festa span{display:none;}.ecal-festa{position:absolute;right:3px;bottom:3px;}.ecal-festa .holly-mini{width:24px;}'+
'.holly{width:110px;}.holly.tr{display:none;}.holly.br{width:96px;right:-10px;bottom:6px;}}'+
'.mbar b::before{content:"";display:inline-block;width:16px;height:13px;margin-right:6px;vertical-align:-1px;background:url("data:image/svg+xml,'+encodeURIComponent(mini().replace(' class="holly-mini"',' xmlns="http://www.w3.org/2000/svg"'))+'") center/contain no-repeat;}'+
'.dark .holly .hl,.libra .holly .hl{fill:#6E8F5E;}';

if(VERDE){
  var light='--clay:'+rosa+';--ink:'+cream+';--muted:#D6C6B8;--line:rgba(251,239,230,.18);color:var(--ink);';
  var dark='--clay:#9A1B17;--ink:#2A1512;--muted:#7A5550;--line:rgba(42,21,18,.13);color:var(--ink);';
  css+=
  'html.tn-verde{background:'+cv+';}'+
  'html.tn-verde body{background:radial-gradient(1200px 700px at 85% -5%,rgba(154,27,23,.28),transparent 60%),radial-gradient(900px 600px at -10% 40%,rgba(110,143,94,.18),transparent 60%),'+cv+' !important;background-attachment:fixed !important;}'+
  on(L)+'{'+light+'}'+
  on(L,' .eyebrow')+'{color:'+rosa+';}'+
  on(L,' .h2 em')+','+on(L,' h1 em')+',html.tn-verde .ecal-title span,'+on(L,' .stat-line')+','+on(L,' .corr-arrow')+'{color:'+rosa+';}'+
  'html.tn-verde .ecal-title{color:'+cream+';}'+
  on(L,' .btn-line:hover')+'{background:'+cream+';color:'+cv+';border-color:'+cream+';}'+
  on(L,' .btn-solid')+'{background:'+cream+';color:'+cv+';}'+
  'html.tn-verde .btn-clay{background:'+rosso+';}'+
  'html.tn-verde .ev-hero::before{background:radial-gradient(circle,rgba(154,27,23,.35),transparent 65%);}'+
  'html.tn-verde .ev-hero::after{background:radial-gradient(circle,rgba(110,143,94,.22),transparent 65%);}'+
  'html.tn-verde .garland{color:'+rosa+';}'+
  'html.tn-verde .garland::before{background:linear-gradient(90deg,transparent,rgba(242,167,163,.5));}html.tn-verde .garland::after{background:linear-gradient(90deg,rgba(242,167,163,.5),transparent);}'+
  CARDS.map(function(c){return 'html.tn-verde '+c;}).join(',')+'{'+dark+'}'+
  'html.tn-verde .ecal-card{background:linear-gradient(135deg,rgba(253,246,241,.96),rgba(247,230,218,.92))!important;}'+
  'html.tn-verde .reader{background:linear-gradient(135deg,rgba(253,246,241,.95),rgba(247,230,218,.9))!important;}'+
  'html.tn-verde .next-pill{background:rgba(253,246,241,.94);}'+
  'html.tn-verde .filters button{background:rgba(253,246,241,.92);border-color:transparent;}'+
  'html.tn-verde .filters button.on{background:'+rosso+';color:#fff;}'+
  'html.tn-verde .up{background:rgba(253,246,241,.94);}html.tn-verde .up:hover{background:#fff;}'+
  'html.tn-verde .step,html.tn-verde .faq details{background:rgba(253,246,241,.95);}'+
  'html.tn-verde .marquee span{background:rgba(253,246,241,.92);}'+
  'html.tn-verde .month{background:rgba(253,246,241,.94);}html.tn-verde .month:hover{background:#fff;}'+
  'html.tn-verde .month.now{background:'+rosso+';color:#fff;border-color:'+rosso+';}html.tn-verde .month.now span{color:#FFE3DC;}'+
  'html.tn-verde .year h2{color:'+cream+';}'+
  'html.tn-verde .door .go i{color:#2A1512;}'+
  /* le sezioni scure diventano bordeaux */
  'html.tn-verde .dark,html.tn-verde section.libra{background:linear-gradient(160deg,#7A1310,#540B09)!important;}'+
  'html.tn-verde .dark .btn-clay,html.tn-verde .libra .btn-clay{background:'+cream+';color:#7A1310;}'+
  'html.tn-verde .holly .hl{fill:#6E8F5E;}'+
  'html.tn-verde .holly{filter:drop-shadow(0 10px 22px rgba(0,0,0,.35));}';
}
var st=document.createElement('style');st.id='tema-natale';st.textContent=css;(document.head||H).appendChild(st);

/* ---------- addobbi, quando la pagina è pronta ---------- */
function deco(){
  /* intestazione della pagina eventi */
  var evh=document.querySelector('.ev-hero');
  if(evh){evh.classList.add('tn-deco');evh.insertAdjacentHTML('beforeend',sprig('tr sway')+sprig('br sway b'));if(VERDE&&!RID)snow(evh);}
  /* neve leggera sopra le foto delle intestazioni */
  if(!RID)document.querySelectorAll(".h-hero,.pv-hero,section.hero").forEach(function(s){snow(s);});
  /* sezioni scure (bordeaux): agrifoglio negli angoli e neve */
  document.querySelectorAll('section.dark,section.libra').forEach(function(s,i){
    s.classList.add('tn-deco');s.insertAdjacentHTML('afterbegin',sprig('tr2')+(i%2?'':sprig('bl')));
    if(!RID)snow(s);
  });
  /* sezioni chiare delle altre pagine: un rametto ogni tanto, alternando gli angoli */
  if(!evh){var n=0;document.querySelectorAll('section.worlds,section.types,section.faq,section.casa,section.info,main.arch').forEach(function(s,i){
    if(n>=3)return;n++;s.classList.add('tn-deco');s.insertAdjacentHTML('afterbegin',sprig(i%2?'bl':'tr2'));
  });}
  /* ghirlanda sotto alcuni titoli */
  var g=0;document.querySelectorAll('.ecal-title,#eventi h2,.worlds .h2,.upcoming .h2,.types .h2,.faq .h2,.arch h1').forEach(function(t){
    if(g>=3)return;g++;t.insertAdjacentHTML('afterend','<div class="garland" aria-hidden="true">'+mini()+'</div>');
  });
  /* giorni di festa nel calendario degli eventi (FESTE_MESE è in eventi/dati.js) */
  var F=(typeof FESTE_MESE!=='undefined'&&FESTE_MESE)||{};
  Object.keys(F).forEach(function(k){
    var c=document.querySelector('.ecal-cell[data-k="'+k+'"]');if(!c)return;
    c.classList.add('festa');
    c.insertAdjacentHTML('beforeend','<span class="ecal-festa">'+mini()+'<span>'+F[k]+'</span></span>');
    c.setAttribute('aria-label',c.getAttribute('aria-label')+' · '+F[k]);
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',deco);else deco();

/* ---------- neve leggera (si muove solo quando la sezione è visibile) ---------- */
function snow(sec){
  var c=document.createElement('canvas');c.className='snow';c.setAttribute('aria-hidden','true');sec.insertBefore(c,sec.firstChild);
  var x=c.getContext('2d'),W,Ht,dpr=Math.min(2,window.devicePixelRatio||1),F=[],run=false,raf;
  function size(){W=sec.clientWidth;Ht=sec.clientHeight;c.width=W*dpr;c.height=Ht*dpr;x.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.round(Math.min(90,W*Ht/14000));F=[];for(var i=0;i<n;i++)F.push(mk(true));}
  function mk(any){return {x:Math.random()*W,y:any?Math.random()*Ht:-6,r:.8+Math.random()*2.2,v:.25+Math.random()*.55,a:Math.random()*6.28,o:.25+Math.random()*.5};}
  function tick(){x.clearRect(0,0,W,Ht);
    for(var i=0;i<F.length;i++){var f=F[i];f.y+=f.v;f.a+=.01;f.x+=Math.sin(f.a)*.35;
      if(f.y>Ht+6){F[i]=mk(false);continue;}
      x.beginPath();x.arc(f.x,f.y,f.r,0,6.283);x.fillStyle='rgba(253,246,241,'+f.o+')';x.fill();}
    if(run)raf=requestAnimationFrame(tick);}
  size();addEventListener('resize',function(){clearTimeout(c._t);c._t=setTimeout(size,200);});
  new IntersectionObserver(function(es){var v=es[0].isIntersecting;if(v&&!run){run=true;tick();}else if(!v){run=false;cancelAnimationFrame(raf);}}).observe(sec);
}
})();
