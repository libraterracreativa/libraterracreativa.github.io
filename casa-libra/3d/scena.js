/* =========================================================
   CASA LIBRA 3D · la scena
   Le foto vere della casa sono pannelli sospesi nello spazio; lo scroll
   fa avanzare la camera lungo un corridoio di capitoli (data-photos nei
   <section> di index.html). Le foto si piegano con la velocità dello
   scroll, seguono il mouse con ritardo e si aprono in grande al clic.
   Prestazioni: texture da 760 px (-m), densità di pixel limitata,
   caricamento a mano a mano che la camera si avvicina, scena ferma
   quando non si vede.
   ========================================================= */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const html = document.documentElement;
if (html.classList.contains('no-gl')) throw new Error('3D disattivato (movimento ridotto)');

const IMG = '../assets/img/';
const D = 9;                                   // profondità di ogni capitolo
const mobile = matchMedia('(max-width: 760px)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const SAND = new THREE.Color('#F4EEE5');

/* ---------- renderer, scena, camera ---------- */
const canvas = document.getElementById('gl');
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: 'high-performance' }); }
catch (e) { html.classList.add('no-gl'); throw e; }
let dpr = Math.min(devicePixelRatio, mobile ? 1.5 : 2);
renderer.setPixelRatio(dpr);
renderer.setClearColor(SAND, 1);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(mobile ? 62 : 52, 1, 0.1, 60);

/* ---------- materiale delle foto: piega, angoli arrotondati, nebbia color sabbia ---------- */
const vert = /* glsl */`
  uniform float uBend; uniform float uTime;
  varying vec2 vUv; varying float vDepth;
  void main(){
    vUv = uv;
    vec3 p = position;
    p.z += sin(uv.x * 3.14159) * uBend * 0.55;                 // si piega con la velocità dello scroll
    p.z += sin(uTime * 0.7 + position.y * 2.0 + position.x) * 0.025; // respiro leggero
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }`;
const frag = /* glsl */`
  uniform sampler2D uTex; uniform float uLoaded; uniform float uHover; uniform float uAspect; uniform vec3 uFog;
  varying vec2 vUv; varying float vDepth;
  void main(){
    vec2 uv = (vUv - 0.5) * (1.0 - uHover * 0.07) + 0.5;      // zoom leggero al passaggio del mouse
    vec4 tx = texture2D(uTex, uv);
    vec3 col = mix(vec3(0.82, 0.77, 0.70), tx.rgb, uLoaded);
    col = mix(col, uFog, smoothstep(6.0, 22.0, vDepth));       // si perde nella nebbia in lontananza
    vec2 q = (vUv - 0.5) * vec2(uAspect, 1.0);                 // angoli arrotondati
    vec2 b = vec2(uAspect, 1.0) * 0.5 - 0.035;
    float d = length(max(abs(q) - b, 0.0)) - 0.035;
    float a = 1.0 - smoothstep(-0.002, 0.002, d);
    a *= mix(1.0, tx.a, uLoaded);                              // le opere in PNG: fuori dalla cornice è trasparente
    a *= smoothstep(1.0, 2.6, vDepth);                        // svanisce quando ti passa accanto
    gl_FragColor = vec4(col, a);
    #include <colorspace_fragment>
  }`;

/* ---------- le foto, capitolo per capitolo ---------- */
const sections = [...document.querySelectorAll('[data-photos]')];
const N = sections.length;
const panels = [];
const geo = new THREE.PlaneGeometry(1, 1, 24, 8);
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; // casuale ma sempre uguale
const SIDES = [1, -1, 1, 1, -1, 1, -1, 1];

sections.forEach((sec, i) => {
  const list = sec.dataset.photos.split(',');
  list.forEach((name, k) => {
    const file = name.includes('.') ? name : name + '-m.jpg';
    const full = name.includes('.') ? name : name + '.jpg';
    const side = SIDES[(k + i) % SIDES.length];
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag, transparent: true, depthWrite: false,
      uniforms: { uTex: { value: null }, uLoaded: { value: 0 }, uHover: { value: 0 }, uAspect: { value: 0.75 },
                  uBend: { value: 0 }, uTime: { value: 0 }, uFog: { value: SAND } }
    });
    const m = new THREE.Mesh(geo, mat);
    const z = -(i * D) + 0.8 - (k + 0.5) * (D - 1.2) / list.length;
    const x = mobile ? side * (0.55 + rnd() * 0.35) : side * (1.25 + rnd() * 0.8) + (side > 0 ? 0.35 : 0);
    const y = mobile ? 0.45 + (rnd() - 0.5) * 0.8 : (rnd() - 0.5) * 1.5;
    m.position.set(x, y, z);
    m.rotation.y = -side * (0.18 + rnd() * 0.12);
    m.rotation.z = (rnd() - 0.5) * 0.06;
    m.userData = { file, full, h: (mobile ? 1.2 : 1.9) * (file.endsWith('.png') ? 1.4 : 1), state: 0, hover: 0, loaded: 0 };
    m.scale.set(m.userData.h * 0.75, m.userData.h, 1);
    scene.add(m); panels.push(m);
  });
});

/* ---------- caricamento progressivo delle foto ---------- */
const loader = new THREE.TextureLoader();
const bar = document.getElementById('loader');
let firstBatch = panels.filter(p => p.position.z > -2 * D).length, firstDone = 0, started = false;
function load(p) {
  if (p.userData.state) return;
  p.userData.state = 1;
  loader.load(IMG + p.userData.file, tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    const a = tex.image.width / tex.image.height;
    p.material.uniforms.uTex.value = tex;
    p.material.uniforms.uAspect.value = a;
    p.scale.set(p.userData.h * a, p.userData.h, 1);
    p.userData.state = 2;
    if (p.position.z > -2 * D) { firstDone++; bar.style.transform = `scaleX(${firstDone / firstBatch})`; if (firstDone >= firstBatch) start(); }
  }, undefined, () => { p.userData.state = 3; if (p.position.z > -2 * D) { firstDone++; if (firstDone >= firstBatch) start(); } });
}
function start() { if (started) return; started = true; html.classList.add('gl-on'); html.classList.remove('no-gl'); bar.style.opacity = 0; }
setTimeout(start, 3500);  // anche se qualche foto tarda, la scena compare comunque
panels.forEach(p => { if (p.position.z > -2 * D) load(p); });

/* ---------- scroll → posizione della camera (con smorzamento) ---------- */
const endSec = document.getElementById('prenota');
let target = 0, cz = 5.5, vel = 0, bend = 0, covered = false;
function readScroll() {
  const max = endSec.offsetTop - innerHeight;           // il viaggio finisce quando arriva la sezione "Prenota"
  const p = Math.min(1, Math.max(0, scrollY / Math.max(1, max)));
  target = 5.5 - p * (N * D - 1);
  covered = endSec.getBoundingClientRect().top <= 0;
}
addEventListener('scroll', readScroll, { passive: true });
addEventListener('libra-salta', () => { readScroll(); cz = target; panels.forEach(p => { if (p.userData.state === 2) p.material.uniforms.uLoaded.value = 1; }); });   // per i test: porta subito la camera alla posizione dello scroll

/* ---------- mouse: la camera segue con ritardo; foto cliccabili ---------- */
let mx = 0, my = 0, cx = 0, cy = 0;
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(-9, -9);
let hovered = null;
addEventListener('pointermove', e => {
  mx = (e.clientX / innerWidth) * 2 - 1; my = (e.clientY / innerHeight) * 2 - 1;
  ptr.set(mx, -my);
}, { passive: true });
function pick() {
  ray.setFromCamera(ptr, camera);
  const hit = ray.intersectObjects(panels, false).find(h => h.object.material.uniforms.uLoaded.value > 0.5 && h.distance > 1.4);
  return hit ? hit.object : null;
}
canvas.style.pointerEvents = 'none';  // il canvas sta sotto il testo: i clic li intercettiamo sul documento
addEventListener('click', e => {
  if (!started || covered || e.target.closest('a,button,.ch-card,.nav,.mmenu,.lb,.bk-overlay,.trip-bar')) return;
  ptr.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  const p = pick();
  if (p && window.lbOpen) window.lbOpen([IMG + p.userData.full], 0);
});

/* ---------- dimensioni ---------- */
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  readScroll();
}
addEventListener('resize', resize); resize();

/* ---------- ciclo di disegno ---------- */
const clock = new THREE.Clock();
let frames = 0, tCheck = 0, checked = false;
function tick() {
  requestAnimationFrame(tick);
  if (document.hidden || covered) return;               // niente lavoro quando la scena non si vede
  const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  const k = 1 - Math.pow(0.0008, dt);                    // smorzamento indipendente dai fotogrammi
  const prev = cz;
  cz += (target - cz) * k * 0.9;
  vel = (cz - prev) / Math.max(dt, 0.001);
  bend += (THREE.MathUtils.clamp(vel * 0.06, -0.7, 0.7) - bend) * k;
  cx += (mx * 0.35 - cx) * k * 0.5; cy += (-my * 0.22 - cy) * k * 0.5;
  camera.position.set(cx, cy, cz);
  camera.rotation.set(cy * 0.12, -cx * 0.18, 0);

  hovered = fine && started ? pick() : null;
  document.body.style.cursor = hovered ? 'zoom-in' : '';
  for (const p of panels) {
    const u = p.material.uniforms;
    if (!p.userData.state && p.position.z > cz - 22) load(p);   // carica le foto che si stanno avvicinando
    if (p.userData.state === 2) u.uLoaded.value += (1 - u.uLoaded.value) * k * 0.6;
    u.uHover.value += ((p === hovered ? 1 : 0) - u.uHover.value) * k * 0.8;
    u.uBend.value = bend; u.uTime.value = t;
    p.visible = p.position.z < cz + 0.5 && p.position.z > cz - 26;
  }
  renderer.render(scene, camera);

  // se nei primi 2 secondi la scena non regge i 45 fotogrammi, abbassa la definizione
  if (!checked && started) { frames++; tCheck += dt; if (tCheck > 2) { checked = true; if (frames / tCheck < 45 && dpr > 1) { dpr = 1; renderer.setPixelRatio(1); resize(); } } }
}
tick();
