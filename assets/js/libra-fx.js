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

/* ---------- APERTURA: il velo compare subito (CSS su html.libra-intro), il logo arriva al DOM pronto ---------- */
var intro=!reduce&&!ss('libra-intro');
if(intro){html.classList.add('libra-intro','intro-run');ss('libra-intro','1');setTimeout(endIntro,2600);}
function endIntro(){
  var o=document.querySelector('.intro');
  if(o&&!o.classList.contains('out')){o.classList.add('out');setTimeout(function(){o.remove();},1000);}
  html.classList.remove('libra-intro','intro-run');
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

/* ---------- APERTURA ---------- */
if(intro){
  var o=document.createElement('div');o.className='intro';o.setAttribute('aria-hidden','true');
  o.innerHTML='<div class="intro-in"><img src="/assets/img/pittogramma.png" alt=""><b>'+'Libra'.split('').map(function(c,i){return '<span style="--i:'+i+'">'+c+'</span>';}).join('')+'</b><small>Terra Creativa</small></div>';
  document.body.appendChild(o);
  void o.offsetWidth;o.classList.add('go');html.classList.remove('libra-intro');
  setTimeout(endIntro,1700);
}

/* ---------- NASTRO DI PAROLE ---------- */
$$('[data-ribbon]').forEach(function(r){
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
  window.addEventListener('scroll',function(){var y=window.scrollY,d=y-lastY;lastY=y;if(d)dir=d>0?-1:1;boost=Math.min(14,boost+Math.abs(d)*.12);},{passive:true});
  (function loop(){
    if(vis){
      boost*=.92;x+=dir*(.45+boost);
      w=track.firstChild.offsetWidth||w;
      if(x<=-w)x+=w;if(x>0)x-=w;
      track.style.transform='translate3d('+x+'px,0,0)';
    }
    requestAnimationFrame(loop);
  })();
});

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
});
})();
