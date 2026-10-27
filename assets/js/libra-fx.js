/* =========================================================
   LIBRA · effetti (va incluso nel <head>, senza defer)
   - passaggio tra le pagine (porte che si allargano, velo cotto)
   - apertura con il logo alla prima visita
   - nastro di parole  <div class="ribbon" data-ribbon="yoga · arte · …"></div>
   - card che si inclinano (.door .ev .month .room-main [data-tilt])
   - timbro rotante     <a class="stamp" href="…" data-stamp="testo ·"></a>
   ========================================================= */
(function(){
var html=document.documentElement;
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v);}catch(e){return null;}}
var HERO='.cover img,.pv-hero>picture img,.hero>picture img';
/* la libellula del logo (LIBELLULA SVG.svg): serve all'apertura e al puntatore */
var FLY='M993.65,139.65c-.31,1.71-.57,3.43-.92,5.12a66.14,66.14,0,0,1-14.43,29.95c-7.51,8.81-15.42,17.29-23.36,25.72A66.07,66.07,0,0,1,940,212.09c-4.28,2.51-8.33,5.41-12.36,8.3a135.54,135.54,0,0,1-18.88,11c-20,9.92-40.89,17.64-61.9,25.12-15.68,5.58-31.46,10.85-47.65,14.72a178.38,178.38,0,0,1-20.74,3.32c-14.4,1.66-28.83,3.12-43.27,4.51-10.46,1-21,1.7-31.43,2.6-4.75.41-9.48,1-14.22,1.44-.78.08-1.56.11-2.33.16-11,.69-22,1.34-32.93,2.09-9.43.64-18.84,1.4-28.25,2.11-4.28.32-8.55.59-12.81,1a21.93,21.93,0,0,0-4.1,1.27c.52,2.7,2.36,3.44,4.25,3.87,3.31.76,6.65,1.49,10,1.92a107.41,107.41,0,0,0,11.05.8c18.78.43,37.58.53,56.36,1.19,20.62.73,41.21,2.33,61.73,4.62q24.23,2.71,48.13,7.6c3.9.8,7.74,1.91,11.6,2.94,5.63,1.49,11.28,3,16.89,4.56,6.93,2,13.36,4.87,18.37,10.26,2.75,3,5.05,6.23,6,10.24a14.79,14.79,0,0,1-4.15,14.46c-3.86,3.88-8.64,6.28-13.61,8.32-12.43,5.1-25.46,7.72-38.75,9.31-9.33,1.12-18.67.56-28,.37-7.1-.14-14.21-.4-21.29-.88A343.44,343.44,0,0,1,681.93,358c-7.61-2-15.34-3.67-22.89-5.88-6.25-1.83-12.34-4.18-18.46-6.42-3.83-1.4-7.59-3-11.39-4.53-.69-.27-1.43-.41-2.55-.73,0,3.72.06,7.11,0,10.5-.1,4.86-.3,9.72-.44,14.59a26.18,26.18,0,0,1-2.1,9.35c-1.74,4.22-3.48,8.46-5.31,12.64a5.77,5.77,0,0,0-.51,3.62q10.05,54.38,20,108.79,10.51,57.27,21,114.55,9.5,51.83,19,103.65,9.18,50.08,18.41,100.18c3.5,19,7.08,38.07,10.39,57.15,1.21,7,1.84,14.08,2.62,21.14,1.16,10.45,2.33,20.9,3.3,31.36,1.58,17.07,3.13,34.14,2.94,51.3a114.58,114.58,0,0,1-2.18,22.93,36.3,36.3,0,0,1-2.51,7.12,4.27,4.27,0,0,1-4.67,2.73,41.52,41.52,0,0,0-6.69,0,4.51,4.51,0,0,1-4.87-2.91c-.79-1.77-1.64-3.53-2.26-5.37a356.12,356.12,0,0,1-11-40.85c-3.16-15-6.22-30.1-9.07-45.21-2-10.51-3.52-21.11-5.27-31.67Q663.72,864,660,841.79q-4.26-25.77-8.51-51.55l-9-54.72c-2.67-16.12-5.43-32.24-8-48.38-5-31.44-12-62.47-18.17-93.68-5.05-25.68-10.07-51.36-15.5-77-3.19-15.06-5.06-30.31-7.57-45.47-.78-4.69-2.09-9.31-2.8-14-.79-5.18-1.05-10.44-1.79-15.64-.58-4-1.71-8-2.3-12-.92-6.16-1.51-12.37-2.37-18.53-.93-6.65-1.94-13.29-3.07-19.91a8.9,8.9,0,0,0-1.76-3.91,70.43,70.43,0,0,1-12-23.54c-1.53-5-2-10.28-2.95-15.44-.41-2.3-.74-4.61-1.18-6.91a10.93,10.93,0,0,0-.79-2.49,1.87,1.87,0,0,0-2.81-1.11c-5.58,2.5-11.34,4.52-16.65,7.71-25.36,15.26-50.71,30.52-76.28,45.41-9.91,5.77-20.4,10.56-30.62,15.78-11.1,5.66-22.14,11.43-33.33,16.9a140.51,140.51,0,0,1-14.6,5.83,23,23,0,0,1-6.32.93c-3.21.17-6.43.1-9.64.16a45.38,45.38,0,0,1-16.87-2.86c-5.38-2-10.83-3.73-15.4-7.49a29.16,29.16,0,0,1-8.56-11.58c-3-7.2-2.17-14.29,0-21.39,2-6.54,6.46-11.48,11.21-16.13a102.19,102.19,0,0,1,23.35-16.86c17.71-9.52,36.32-16.9,54.93-24.36,11.89-4.77,24.29-7.64,36.54-11.11,4.48-1.27,9-2.45,13.5-4.08a4.51,4.51,0,0,0-1.38-.22c-5.09.83-10.15,1.82-15.25,2.54-8.67,1.23-17.37,2.3-26.05,3.44-6,.79-11.94,1.81-17.95,2.31-7.85.66-15.73.89-23.6,1.35-10.7.62-21.41.34-32.11-.05-11.57-.42-23.16-1-34.7-1.89-4.51-.36-9-1.78-13.36-3-14.83-4-29.63-8.19-44.43-12.33a28.75,28.75,0,0,1-3.82-1.43q-37.86-16.87-75.71-33.78a26.76,26.76,0,0,1-3.32-1.82c-11.89-7.42-24-14.51-35.61-22.36-15.75-10.64-31.07-21.89-41.84-38.09-6.33-9.52-11.22-19.62-12.73-31.06-2.39-18,3.18-32.86,17.68-44,8.61-6.63,18.59-10.08,29.2-11.84,14.33-2.38,28.52-1.27,42.61,1.9,17.08,3.84,34.15,7.75,51.27,11.45a134.24,134.24,0,0,1,20.7,6q8.57,3.34,17.25,6.36A232.57,232.57,0,0,1,304,163.59c15.14,8.33,31.29,14.33,47.37,20.49,5.45,2.09,10.85,4.33,16.32,6.37,3.73,1.39,7.52,2.62,11.32,3.8,9.39,2.91,18.77,5.83,28.19,8.6,10.27,3,20.6,5.8,30.88,8.77,14.79,4.28,30.07,6.29,45,9.77q19.18,4.46,38.49,8.39c5,1,10.21,1.44,15.33,2,5.41.64,10.83,1.18,16.25,1.75.56.06,1.13,0,2.09,0-.52-1.17-.87-2.05-1.3-2.89-1.68-3.29-3.48-6.52-5.08-9.85a95.94,95.94,0,0,1-8.43-26c-1.65-9.94-1-19.63,3.3-28.85a30.56,30.56,0,0,1,13.49-14.49c7.25-3.87,14.63-3.4,21.85.29,6.06,3.11,10.48,8,14.35,13.44,4.93,7,6.94,14.92,8.12,23.18.86,6,.24,12-.3,18-.57,6.47-.1,13,0,19.55,0,1.55.14,3.11.3,4.66.38,3.44,2.17,4.41,5.17,2.7q17.26-9.81,34.49-19.69,66.71-38.07,133.46-76c9.73-5.5,20-10,30-15C831.82,109.25,859,96,886.1,82.46a172.25,172.25,0,0,1,22.18-9.67c3.49-1.17,7.15-1.82,10.73-2.72.54-.14,1.07-.36,1.6-.54h8.76c3.68.81,7.34,1.72,11,2.39a70.38,70.38,0,0,1,23.46,8.36C979,89.16,988.73,102,992.66,119.14c.37,1.57.66,3.16,1,4.74Z';
/* la stessa forma in tre pezzi (ali di sinistra, ali di destra, corpo) per far battere le ali; p = prefisso degli id */
function flySvg(p,cls){
  return '<svg class="'+cls+'" viewBox="0 0 905.31 942.61" aria-hidden="true"><defs><path id="'+p+'P" transform="translate(-88.34 -69.53)" d="'+FLY+'"/>'+
    '<clipPath id="'+p+'L"><rect width="466" height="420"/></clipPath>'+
    '<clipPath id="'+p+'R"><rect x="528" width="380" height="350"/></clipPath>'+
    '<clipPath id="'+p+'B"><rect x="458" width="80" height="345"/><rect x="466" y="330" width="240" height="615"/></clipPath></defs>'+
    '<g class="if-w if-l" clip-path="url(#'+p+'L)"><use href="#'+p+'P"/></g>'+
    '<g class="if-w if-r" clip-path="url(#'+p+'R)"><use href="#'+p+'P"/></g>'+
    '<g clip-path="url(#'+p+'B)"><use href="#'+p+'P"/></g></svg>';
}

/* ---------- APERTURA: il velo compare subito (CSS su html.libra-intro), il logo arriva al DOM pronto ---------- */
var intro=!reduce&&!ss('libra-intro');
if(intro){html.classList.add('libra-intro','intro-run');ss('libra-intro','1');setTimeout(function(){endIntro(true);},6000);}
/* fine dell'apertura: normale (a volo finito) o veloce (tocco, tasto o sicurezza) */
function endIntro(fast){
  var o=document.querySelector('.intro');
  html.classList.remove('libra-intro','intro-run');
  if(!o||o.dataset.end)return;
  o.dataset.end='1';
  if(fast){o.classList.add('skip');setTimeout(function(){o.remove();},400);}else o.remove();
}

/* ---------- PASSAGGIO TRA LE PAGINE (View Transitions tra documenti) ---------- */
/* pagina di partenza: se si è cliccata una porta, la sua foto prende il nome "hero" */
window.addEventListener('pageswap',function(e){
  if(!e.viewTransition)return;
  var nop=function(){};e.viewTransition.ready.catch(nop);e.viewTransition.finished.catch(nop);e.viewTransition.updateCallbackDone&&e.viewTransition.updateCallbackDone.catch(nop);
  var door=document.querySelector('.door.vt-go');
  if(door){door.querySelector(':scope>img').style.viewTransitionName='hero';e.viewTransition.types.add('door');ss('libra-vt','door');}
  else{e.viewTransition.types.add('veil');ss('libra-vt','veil');}
});
/* pagina di arrivo: la foto d'apertura riceve lo stesso nome, oppure scorre il velo */
window.addEventListener('pagereveal',function(e){
  var t=ss('libra-vt');ss('libra-vt',null);
  if(!e.viewTransition)return;
  var nop=function(){};e.viewTransition.ready.catch(nop);e.viewTransition.finished.catch(nop);e.viewTransition.updateCallbackDone&&e.viewTransition.updateCallbackDone.catch(nop);
  if(reduce){e.viewTransition.skipTransition();return;}
  if(t==='door'){
    var h=document.querySelector(HERO);
    if(h){h.style.viewTransitionName='hero';html.classList.add('vt-door');e.viewTransition.types.add('door');
      e.viewTransition.finished.then(function(){h.style.viewTransitionName='';},function(){h.style.viewTransitionName='';});return;}
  }
  e.viewTransition.types.add('veil');
});
/* se si torna indietro con la cronologia, la porta non resta "cliccata" */
window.addEventListener('pageshow',function(){[].forEach.call(document.querySelectorAll('.vt-go'),function(d){d.classList.remove('vt-go');var i=d.querySelector(':scope>img');if(i)i.style.viewTransitionName='';});});

document.addEventListener('DOMContentLoaded',function(){
var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};

/* porte della home */
document.addEventListener('click',function(e){
  var d=e.target.closest&&e.target.closest('a.door');
  if(d&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey)d.classList.add('vt-go');
});

/* ---------- APERTURA: la scritta "Libra" si disegna, la libellula batte le ali, decolla e vola
   verso chi guarda; dietro di lei si apre un cerchio che scopre la pagina. Un tocco la salta. ---------- */
if(intro){
  var o=document.createElement('div');o.className='intro';o.setAttribute('aria-hidden','true');
  o.innerHTML='<div class="intro-bg"></div><div class="intro-logo">'+
    '<img class="intro-word" src="/assets/img/logo/libra-scritta.png" alt=""><span class="intro-spark"></span>'+
    flySvg('if','intro-fly')+'</div>';
  document.body.appendChild(o);html.classList.remove('libra-intro');
  var skipIntro=function(){endIntro(true);};
  o.addEventListener('pointerdown',skipIntro);addEventListener('keydown',skipIntro,{once:true});
  void o.offsetWidth;o.classList.add('go');
  var fly=o.querySelector('.intro-fly'),bg=o.querySelector('.intro-bg');
  setTimeout(function(){if(o.dataset.end)return;o.classList.add('fast');takeOff();},1100);
  /* il volo: piccolo salto all'indietro, curva verso il centro e poi dritta verso lo schermo */
  function takeOff(){
    var r=fly.getBoundingClientRect(),ox=r.left+r.width*.55,oy=r.top+r.height*.25;
    var dx=innerWidth/2-ox,dy=innerHeight*.48-oy,big=Math.max(innerWidth,innerHeight)/r.width*9;
    var a=fly.animate([
      {transform:'translate(0,0) scale(1) rotate(0deg)',opacity:1},
      {transform:'translate('+(-r.width*.1)+'px,'+(-r.height*.32)+'px) scale(1.12) rotate(-14deg)',offset:.22},
      {transform:'translate('+(dx*.55)+'px,'+(dy*.45-r.height*.28)+'px) scale(2.4) rotate(9deg)',offset:.55},
      {transform:'translate('+dx+'px,'+dy+'px) scale('+(big*.3)+') rotate(0deg)',opacity:1,offset:.82},
      {transform:'translate('+dx+'px,'+dy+'px) scale('+big+') rotate(0deg)',opacity:0}
    ],{duration:1450,easing:'cubic-bezier(.45,0,.4,1)',fill:'forwards'});
    setTimeout(reveal,700);
    a.onfinish=function(){endIntro();};
  }
  /* il cerchio che scopre la pagina: da qui partono anche le animazioni della home */
  function reveal(){
    if(o.dataset.end)return;
    html.classList.remove('intro-run');
    var t0=performance.now(),R=Math.hypot(innerWidth,innerHeight)*.6;
    (function step(t){var k=Math.min(1,(t-t0)/750),e=k*k*(3-2*k);bg.style.setProperty('--r',(e*R)+'px');if(k<1&&!o.dataset.end)requestAnimationFrame(step);})(t0);
  }
}

/* ---------- NASTRO DI PAROLE ---------- */
/* si prepara a pagina caricata, così le misure non rallentano il primo disegno */
function ribbons(){$$('[data-ribbon]').forEach(function(r){
  var words=r.dataset.ribbon.split('·').map(function(w){return w.trim();}).filter(Boolean);
  r.setAttribute('role','img');r.setAttribute('aria-label',words.join(', '));
  var chunk='<span class="rb-chunk" aria-hidden="true">'+words.map(function(w){return '<span>'+w+'</span><i>✦</i>';}).join('')+'</span>';
  var track=document.createElement('div');track.className='rb-track';r.appendChild(track);
  track.innerHTML=chunk;
  var w=track.firstChild.offsetWidth||1,n=Math.max(2,Math.ceil(window.innerWidth*2/w)+1);
  track.innerHTML=new Array(n+1).join(chunk);
  if(reduce)return;
  var x=0,vis=false,lastY=window.scrollY,boost=0,dir=-1;
  new IntersectionObserver(function(es){vis=es[0].isIntersecting;},{rootMargin:'80px'}).observe(r);
  window.addEventListener('resize',function(){w=track.firstChild.offsetWidth||w;},{passive:true});
  if(document.fonts)document.fonts.ready.then(function(){w=track.firstChild.offsetWidth||w;});
  window.addEventListener('scroll',function(){var y=window.scrollY,d=y-lastY;lastY=y;if(d)dir=d>0?-1:1;boost=Math.min(14,boost+Math.abs(d)*.12);},{passive:true});
  (function loop(){
    if(vis){
      boost*=.92;x+=dir*(.45+boost);
      if(x<=-w)x+=w;if(x>0)x-=w;
      track.style.transform='translate3d('+x+'px,0,0)';
    }
    requestAnimationFrame(loop);
  })();
});}
if(document.readyState==='complete')ribbons();else window.addEventListener('load',ribbons);

/* ---------- TIMBRO ROTANTE ---------- */
$$('[data-stamp]').forEach(function(s,k){
  var t=s.dataset.stamp,id='stp'+k;
  s.setAttribute('aria-label',t.replace(/·/g,' ').trim());
  s.insertAdjacentHTML('afterbegin','<svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="'+id+'" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs>'+
    '<text><textPath href="#'+id+'" textLength="282" lengthAdjust="spacing">'+t.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</textPath></text></svg>'+
    '<img src="/assets/img/pittogramma.png" alt="">');
});

/* ---------- CARD CHE SI INCLINANO (solo mouse) ---------- */
if(!reduce&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  var TILT='.door,.ev,.month,.room-main,[data-tilt]',cur=null,raf=0,px=0,py=0;
  function reset(c){c.classList.remove('tilting');c.style.transform='';}
  document.addEventListener('pointermove',function(e){
    var c=e.target.closest&&e.target.closest(TILT);
    if(cur&&cur!==c)reset(cur);
    cur=c;if(!c)return;
    px=e.clientX;py=e.clientY;
    if(raf)return;
    raf=requestAnimationFrame(function(){
      raf=0;if(!cur)return;
      var r=cur.getBoundingClientRect(),mx=(px-r.left)/r.width,my=(py-r.top)/r.height;
      if(!cur.querySelector(':scope>.glare'))cur.insertAdjacentHTML('beforeend','<span class="glare" aria-hidden="true"></span>');
      cur.classList.add('tilting');
      cur.style.setProperty('--tx',(mx*100)+'%');cur.style.setProperty('--ty',(my*100)+'%');
      cur.style.transform='perspective(1000px) rotateX('+((.5-my)*7).toFixed(2)+'deg) rotateY('+((mx-.5)*9).toFixed(2)+'deg) translateY(-4px)';
    });
  },{passive:true});
  document.addEventListener('pointerleave',function(){if(cur){reset(cur);cur=null;}});
}
/* ---------- PUNTATORE: la libellula (solo mouse) ----------
   La testa è la punta del puntatore; segue con un piccolo ritardo, si gira nella direzione
   del movimento, batte le ali veloci quando si muove e piano quando è ferma.
   Sopra link e pulsanti si ingrandisce color cotto, sulle zone scure diventa chiara;
   sopra le foto lascia il posto alla lente "Guarda" (cursore di libra.js). */
if(!reduce&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  var cf=document.createElement('div');cf.className='cur-fly cur-hide';cf.innerHTML=flySvg('cf','');document.body.appendChild(cf);
  html.classList.add('has-fly');
  var FW=30,FH=FW*942.61/905.31,HX=FW*.55,HY=FH*.11;
  cf.style.transformOrigin=HX+'px '+HY+'px';
  var DARK='.dark,.hero,.h-hero,.pv-hero,.libra,.foot,.lb,.prenota,.ch-end,.ribbon';
  var tx=-100,ty=-100,fx=-100,fy=-100,ang=0,still=0,shown=false;
  var norm=function(a){a=(a+180)%360;if(a<0)a+=360;return a-180;};
  document.addEventListener('pointermove',function(e){
    if(e.pointerType&&e.pointerType!=='mouse')return;
    tx=e.clientX;ty=e.clientY;if(!shown){fx=tx;fy=ty;shown=true;}
    var t=e.target,c=function(s){return t.closest&&t.closest(s);};
    cf.classList.toggle('on-link',!!c('a,button,label.check,[data-book]'));
    cf.classList.toggle('on-dark',!!c(DARK));
    cf.classList.toggle('cur-hide',!!c('input,textarea,select,[data-zoom],.room-main,.corr-item button'));
  },{passive:true});
  document.addEventListener('pointerleave',function(){cf.classList.add('cur-hide');});
  document.addEventListener('pointerenter',function(){cf.classList.remove('cur-hide');});
  (function loop(){
    var dx=tx-fx,dy=ty-fy,d=Math.hypot(dx,dy);
    fx+=dx*.28;fy+=dy*.28;
    if(d>1.5){ang=norm(ang+norm(Math.atan2(dy,dx)*180/Math.PI+90-ang)*.18);still=0;}
    else if(++still>40){ang*=.95;}                       // ferma da un attimo: torna dritta piano piano
    cf.classList.toggle('moving',d>1.5);
    cf.style.transform='translate('+(fx-HX).toFixed(1)+'px,'+(fy-HY).toFixed(1)+'px) rotate('+ang.toFixed(1)+'deg)';
    requestAnimationFrame(loop);
  })();
}
});
})();
