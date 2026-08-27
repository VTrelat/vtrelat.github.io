/* ============================================================================
   NEWS SPOTLIGHT
   Hovering the #news section shades the page and drops three staggered lamps
   onto it. All visuals live in assets/css/news-spotlight.css; this file only
   injects the layers, aims them at the section, and toggles two body classes:

     body.ns-on   lights up (ignition, then slow traverse)
     body.ns-off  brief fade-out pass for the illumination layer

   Load after the stylesheet, e.g. at the end of <body>:
     <link rel="stylesheet" href="assets/css/news-spotlight.css" />
     <script src="assets/js/news-spotlight.js"></script>
   ========================================================================= */
(() => {
  const news = document.getElementById('news');
  if (!news) return;

  const inner = news.querySelector('.container') || news;
  const root = document.documentElement;
  const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---- layers ---- */
  const lamp = i => `
    <div class="ns-lamp ns-lamp--${i}">
      <div class="ns-ray"></div>
      <div class="ns-ray ns-ray--core"></div>
      <div class="ns-ray ns-ray--streaks"></div>
      <div class="ns-ray ns-ray--dust"></div>
      <div class="ns-head"></div>
      <div class="ns-pool"></div>
    </div>`;

  const stage = document.createElement('div');
  stage.setAttribute('aria-hidden', 'true');
  stage.innerHTML = `
    <div class="ns-shade"></div>
    <div class="ns-glow">
      <div class="ns-spot ns-spot--1"></div>
      <div class="ns-spot ns-spot--2"></div>
      <div class="ns-spot ns-spot--3"></div>
    </div>
    <div class="ns-lights">${lamp(1)}${lamp(2)}${lamp(3)}</div>`;
  while (stage.firstElementChild) document.body.appendChild(stage.firstElementChild);

  /* ---- aiming ----
     The lamps converge on the lower part of the news block (on the items, not
     the heading). If the block runs past the viewport the landing point is
     clamped so the pools stay on screen while remaining centred on the
     section horizontally. */
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  const aim = () => {
    const r = inner.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    root.style.setProperty('--ns-spot-x', `${Math.round(clamp(r.left + r.width / 2, 140, vw - 140))}px`);
    root.style.setProperty('--ns-spot-y', `${Math.round(clamp(r.top + r.height * 0.8, vh * 0.28, vh * 0.84))}px`);
    root.style.setProperty('--ns-spread', `${Math.round(clamp(vw * 0.26, 160, 460))}px`);
    root.style.setProperty('--ns-pw', `${Math.round(clamp(r.width * 0.72, 320, 660))}px`);
    root.style.setProperty('--ns-ph', `${Math.round(clamp(r.height * 1.15, 170, 340))}px`);
  };

  /* ---- state ---- */
  let active = false;
  let offTimer;

  const show = () => {
    aim();
    if (active) return;
    active = true;
    clearTimeout(offTimer);
    document.body.classList.remove('ns-off');
    document.body.classList.add('ns-on');
  };

  const hide = () => {
    if (!active) return;
    active = false;
    document.body.classList.remove('ns-on');
    document.body.classList.add('ns-off');
    clearTimeout(offTimer);
    offTimer = setTimeout(() => document.body.classList.remove('ns-off'), 480);
  };

  const reaim = () => { if (active) aim(); };

  news.addEventListener('pointerenter', () => {
    if (!canHover || canHover.matches) show();
  });
  news.addEventListener('pointerleave', hide);
  window.addEventListener('resize', reaim);
  window.addEventListener('scroll', reaim, { passive: true });
})();
