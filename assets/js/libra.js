/* =========================================================
   LIBRA · comportamenti comuni a tutte le pagine
   (menu, vetro liquido, cursore, grana, sipari, lightbox, modulo di prenotazione)
   Ogni pagina può definire window.LIBRA prima di includere questo file.
   ========================================================= */
(function(){
var CFG=Object.assign({
  w3f:'918c6a5b-9a01-4fe4-a0e5-948f123f94e9',     /* Web3Forms: le richieste arrivano a librapietrasanta@gmail.com */
  whatsapp:'393491408666',
  waText:'Ciao Libra! Vorrei qualche informazione.'
},window.LIBRA||{});
window.LIBRA=CFG;
var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
CFG.reduceMotion=reduceMotion;
var $=function(s,r){return (r||document).querySelector(s);},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
function el(html){var t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild;}

/* ---------- elementi comuni iniettati se mancano ---------- */
if(!$('#liquid'))document.body.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><filter id="liquid" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise"/><feGaussianBlur in="noise" stdDeviation="2" result="soft"/><feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G"/></filter></svg>');
if(!$('.grain'))document.body.appendChild(el('<div class="grain" aria-hidden="true"></div>'));
if(!$('.cur-ring')){document.body.appendChild(el('<div class="cur-ring" aria-hidden="true"><span>Guarda</span></div>'));document.body.appendChild(el('<div class="cur-dot" aria-hidden="true"></div>'));}
if(!$('#lb'))document.body.appendChild(el('<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Foto ingrandita"><img id="lbImg" alt=""><button class="x glass" id="lbX" aria-label="Chiudi">×</button><button class="pv glass" id="lbPv" aria-label="Precedente">‹</button><button class="nx glass" id="lbNx" aria-label="Successiva">›</button><div class="cap" id="lbCap"></div></div>'));

/* ---------- NAV ---------- */
var nav=$('#nav'),mbar=$('#mbar');
function onScroll(){
  var y=window.scrollY;
  if(nav)nav.classList.toggle('solid',y>(nav.dataset.solidAt?+nav.dataset.solidAt:window.innerHeight*0.6));
  if(mbar){var hide=$$('[data-hide-mbar]').some(function(s){var r=s.getBoundingClientRect();return r.top<window.innerHeight&&r.bottom>0;});mbar.classList.toggle('show',y>window.innerHeight*0.8&&!hide);}
}
var navTick=false;window.addEventListener('scroll',function(){if(!navTick){navTick=true;requestAnimationFrame(function(){navTick=false;onScroll();});}},{passive:true});onScroll();
var burger=$('#burger'),mmenu=$('#mmenu');
if(burger&&mmenu){
  burger.addEventListener('click',function(){var o=mmenu.classList.toggle('open');burger.setAttribute('aria-expanded',o);if(nav)nav.classList.add('solid');});
  $$('a',mmenu).forEach(function(a){a.addEventListener('click',function(){mmenu.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
}
$$('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear();});
$$('a[data-wa]').forEach(function(a){a.href='https://wa.me/'+CFG.whatsapp+'?text='+encodeURIComponent(a.dataset.wa||CFG.waText);a.target='_blank';a.rel='noopener';});

/* ---------- LIGHTBOX: lbOpen(['url1','url2'], indice) ---------- */
var lb=$('#lb'),lbImg=$('#lbImg'),lbCap=$('#lbCap'),lbList=[],lbI=0;
function lbShow(){lbImg.src=lbList[lbI];lbCap.textContent=(lbI+1)+' / '+lbList.length;}
function lbOpen(list,i){lbList=list;lbI=i||0;lbShow();lb.classList.add('open');document.body.style.overflow='hidden';}
function lbClose(){lb.classList.remove('open');document.body.style.overflow='';}
function lbStep(d){lbI=(lbI+d+lbList.length)%lbList.length;lbShow();}
$('#lbX').onclick=lbClose;$('#lbPv').onclick=function(){lbStep(-1);};$('#lbNx').onclick=function(){lbStep(1);};
lb.addEventListener('click',function(e){if(e.target===lb)lbClose();});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')lbClose();if(e.key==='ArrowLeft')lbStep(-1);if(e.key==='ArrowRight')lbStep(1);});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.changedTouches[0].clientX;},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)lbStep(dx<0?1:-1);},{passive:true});
window.lbOpen=lbOpen;

/* ---------- MODULO DI PRENOTAZIONE (Web3Forms) ---------- */
document.body.appendChild(el(
'<div class="bk-overlay" id="bk" role="dialog" aria-modal="true" aria-labelledby="bkTitle">'+
 '<div class="bk-box glass">'+
  '<button class="bk-x" id="bkX" aria-label="Chiudi">×</button>'+
  '<form id="bkForm" novalidate>'+
   '<span class="bk-label">Richiesta di prenotazione</span><h3 id="bkTitle">—</h3>'+
   '<div class="row2"><div class="field"><label for="bkNome">Nome e cognome *</label><input id="bkNome" required autocomplete="name"></div>'+
   '<div class="field"><label for="bkPers">Persone *</label><select id="bkPers"><option>1</option><option selected>2</option><option>3</option><option>4</option><option value="5+">5 o più</option></select></div></div>'+
   '<div class="field"><label for="bkEmail">Email *</label><input id="bkEmail" type="email" required autocomplete="email"></div>'+
   '<div class="field"><label for="bkTel">Telefono</label><input id="bkTel" type="tel" autocomplete="tel"></div>'+
   '<div class="field"><label for="bkNote">Note · allergie · domande</label><textarea id="bkNote"></textarea></div>'+
   '<button type="submit" class="btn btn-clay submit" id="bkSend">Invia la richiesta</button>'+
   '<p class="form-err" id="bkErr"></p><p class="form-msg">Ti rispondiamo via email con la conferma e il link di pagamento.</p>'+
  '</form>'+
  '<div class="done" id="bkDone"><div class="tick">✓</div><h4>Richiesta inviata</h4><p class="muted">Grazie! Ti rispondiamo al più presto.</p></div>'+
 '</div></div>'));
var bk=$('#bk'),bkForm=$('#bkForm'),bkErr=$('#bkErr'),bkName='';
function openBooking(name){
  bkName=name;$('#bkTitle').textContent=name;bkForm.style.display='';$('#bkDone').style.display='none';bkErr.style.display='none';
  bk.classList.add('open');document.body.style.overflow='hidden';setTimeout(function(){$('#bkNome').focus();},100);
}
function closeBooking(){bk.classList.remove('open');document.body.style.overflow='';}
$('#bkX').onclick=closeBooking;bk.addEventListener('click',function(e){if(e.target===bk)closeBooking();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&bk.classList.contains('open'))closeBooking();});
bkForm.addEventListener('submit',async function(e){
  e.preventDefault();bkErr.style.display='none';
  var v=function(id){return $('#'+id).value.trim();};
  if(!v('bkNome')||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('bkEmail'))){bkErr.textContent='Inserisci nome ed email validi.';bkErr.style.display='block';return;}
  var btn=$('#bkSend');btn.disabled=true;btn.textContent='Invio in corso…';
  try{
    var ctrl=new AbortController(),t=setTimeout(function(){ctrl.abort();},12000);
    var res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},signal:ctrl.signal,body:JSON.stringify({
      access_key:CFG.w3f,subject:'Prenotazione: '+bkName,from_name:'Sito Libra',name:v('bkNome'),email:v('bkEmail'),
      message:['EVENTO: '+bkName,'NOME: '+v('bkNome'),'EMAIL: '+v('bkEmail'),'TELEFONO: '+(v('bkTel')||'—'),'PERSONE: '+v('bkPers'),'NOTE: '+(v('bkNote')||'—'),'','Rispondi a questa email per inviare conferma e link di pagamento.'].join('\n')})});
    clearTimeout(t);var out=await res.json();if(!out.success)throw new Error(out.message);
    bkForm.reset();bkForm.style.display='none';$('#bkDone').style.display='block';
  }catch(ex){bkErr.innerHTML='Invio non riuscito. Scrivici su <a href="https://wa.me/'+CFG.whatsapp+'" target="_blank" rel="noopener" style="text-decoration:underline">WhatsApp</a>.';bkErr.style.display='block';}
  finally{btn.disabled=false;btn.textContent='Invia la richiesta';}
});
/* qualsiasi elemento con data-book="Nome evento" apre il modulo (o il link esterno in data-link) */
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-book]');if(!b||b.disabled||b.closest('.is-past'))return;
  e.preventDefault();
  if(b.dataset.link){window.open(b.dataset.link,'_blank','noopener');return;}
  openBooking(b.dataset.book);
});
window.openBooking=openBooking;

/* ---------- REVEAL: testi (.rv) e foto con sipario (.reveal-img) ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
function observeReveal(root){$$('.rv,.reveal-img',root).forEach(function(n){if(!n.classList.contains('in'))io.observe(n);});}
observeReveal(document);window.libraReveal=observeReveal;

/* ---------- TITOLO LETTERA PER LETTERA (.split) ---------- */
$$('.split').forEach(function(h){
  var n=0;h.setAttribute('aria-label',h.textContent.trim().replace(/\s+/g,' '));
  (function split(node){[].slice.call(node.childNodes).forEach(function(c){
    if(c.nodeType===3){var frag=document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(function(word){if(!word)return;
        if(/^\s+$/.test(word)){frag.appendChild(document.createTextNode(' '));return;}
        var w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
        word.split('').forEach(function(ch){var sp=document.createElement('span');sp.className='ch';sp.style.setProperty('--i',n++);sp.textContent=ch;w.appendChild(sp);});
        frag.appendChild(w);});
      c.replaceWith(frag);}
    else if(c.nodeType===1&&c.tagName!=='BR')split(c);});})(h);
});

/* ---------- VETRO LIQUIDO ---------- */
var ua=navigator.userAgent;
if(!reduceMotion&&/Chrome\//.test(ua)&&!/Mobile|Android/.test(ua))document.documentElement.classList.add('liquid');
document.addEventListener('pointermove',function(e){
  var g=e.target.closest&&e.target.closest('.glass');if(!g)return;
  var r=g.getBoundingClientRect();g.style.setProperty('--mx',(e.clientX-r.left)+'px');g.style.setProperty('--my',(e.clientY-r.top)+'px');
},{passive:true});

/* ---------- CURSORE (solo mouse) ---------- */
(function(){
  if(!window.matchMedia('(pointer:fine)').matches)return;
  var dot=$('.cur-dot'),ring=$('.cur-ring');document.documentElement.classList.add('has-cursor');
  var x=-100,y=-100,rx=-100,ry=-100,shown=false;
  document.addEventListener('pointermove',function(e){
    x=e.clientX;y=e.clientY;if(!shown){rx=x;ry=y;shown=true;}
    dot.style.transform='translate('+x+'px,'+y+'px)';
    var t=e.target,c=function(s){return t.closest&&t.closest(s);};
    var onImg=c('[data-zoom],.room-main,.corr-item button');
    var onDay=!onImg&&c('.day:not(:disabled),.cal-cell:not(.empty)');
    var onLink=!onImg&&!onDay&&c('a,button,label.check');
    var onField=c('input,textarea,select');
    var onDark=c('.dark,.hero,.libra,.foot,.lb,.prenota');
    ring.classList.toggle('on-img',!!onImg);ring.classList.toggle('on-day',!!onDay);ring.classList.toggle('on-link',!!onLink);
    ring.classList.toggle('on-dark',!!onDark&&!onImg);
    ring.classList.toggle('cur-hide',!!onField);dot.classList.toggle('cur-hide',!!onField||!!onImg);
  },{passive:true});
  document.addEventListener('pointerleave',function(){ring.classList.add('cur-hide');dot.classList.add('cur-hide');});
  document.addEventListener('pointerenter',function(){ring.classList.remove('cur-hide');dot.classList.remove('cur-hide');});
  (function loop(){rx+=(x-rx)*0.18;ry+=(y-ry)*0.18;ring.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(loop);})();
})();
})();
