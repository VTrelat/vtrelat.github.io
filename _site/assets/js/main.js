/* ==================== MOBILE NAV ==================== */
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if (navClose)  navClose.addEventListener('click',  () => navMenu.classList.remove('show-menu'));

document.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
);

/* ==================== SCROLL: ACTIVE LINK & HEADER SHADOW ==================== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Header shadow
  document.getElementById('header')
    .classList.toggle('scroll-header', scrollY >= 60);

  // Scroll-up button
  document.getElementById('scroll-up')
    .classList.toggle('show-scroll', scrollY >= 500);

  // Active nav link
  document.querySelectorAll('section[id]').forEach(section => {
    const top    = section.offsetTop - 80;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) link.classList.toggle('active-link', scrollY >= top && scrollY < top + height);
  });
});

/* ==================== DARK / LIGHT THEME ==================== */
const themeButton     = document.getElementById('theme-button');
const themeButtonIcon = themeButton?.querySelector('i');
const DARK_CLASS      = 'dark-theme';

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)');
let savedTheme = null;
try { savedTheme = localStorage.getItem('selected-theme'); } catch (_) {}

const applyTheme = theme => document.body.classList.toggle(DARK_CLASS, theme === 'dark');

const updateIcon = () => {
  if (!themeButtonIcon) return;
  const isDark = document.body.classList.contains(DARK_CLASS);
  themeButtonIcon.className = isDark ? 'uil uil-sun' : 'uil uil-moon';
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
};

applyTheme(savedTheme ?? (prefersDark?.matches ? 'dark' : 'light'));
updateIcon();

prefersDark?.addEventListener('change', e => {
  if (savedTheme) return;
  applyTheme(e.matches ? 'dark' : 'light');
  updateIcon();
});

themeButton?.addEventListener('click', () => {
  const newTheme = document.body.classList.toggle(DARK_CLASS) ? 'dark' : 'light';
  updateIcon();
  try { localStorage.setItem('selected-theme', newTheme); savedTheme = newTheme; } catch (_) {}
});

/* ==================== TAG FILTER (shared by publications & talks) ==================== */
const setupTagFilters = (filterSelector, itemSelector) => {
  const buttons = document.querySelectorAll(filterSelector);
  const items   = document.querySelectorAll(itemSelector);
  if (!buttons.length) return;

  const applyFilters = () => {
    const active = Array.from(buttons)
      .filter(b => b.classList.contains('is-active'))
      .map(b => b.dataset.tag);

    items.forEach(item => {
      const tags = (item.dataset.tags ?? '').split(/\s+/).filter(Boolean);
      const show = !active.length || tags.some(t => active.includes(t));
      item.classList.toggle('is-hidden', !show);
    });
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-active');
      btn.setAttribute('aria-pressed', btn.classList.contains('is-active'));
      applyFilters();
    });
  });

  applyFilters();
};

setupTagFilters('.pub-filter',    '.pub');
setupTagFilters('.talks__filter', '.talk');

/* ==================== PUBLICATIONS: VIEW TOGGLE (cards / list) ==================== */
const pubView        = document.getElementById('pub-view');
const pubScrollNav   = document.getElementById('pub-scroll-nav');
const viewToggleBtns = document.querySelectorAll('#pub-view-toggle .view-toggle__btn');

const setView = view => {
  if (!pubView) return;
  pubView.classList.toggle('pub-view--cards', view === 'cards');
  pubView.classList.toggle('pub-view--list',  view === 'list');
  if (pubScrollNav) pubScrollNav.style.display = view === 'cards' ? '' : 'none';

  viewToggleBtns.forEach(btn => {
    const isActive = btn.dataset.view === view;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  try { localStorage.setItem('pub-view', view); } catch (_) {}
};

viewToggleBtns.forEach(btn =>
  btn.addEventListener('click', () => setView(btn.dataset.view))
);

// Restore saved view preference
let savedView = null;
try { savedView = localStorage.getItem('pub-view'); } catch (_) {}
setView(savedView === 'list' ? 'list' : 'cards');

/* ==================== PUBLICATIONS: SCROLL NAV ARROWS ==================== */
const pubPrev = document.getElementById('pub-prev');
const pubNext = document.getElementById('pub-next');

const scrollByCard = dir => {
  if (!pubView) return;
  const card = pubView.querySelector('.pub:not(.is-hidden)');
  if (!card) return;
  const cardW = card.offsetWidth + parseInt(getComputedStyle(pubView).gap || 16);
  pubView.scrollBy({ left: dir * cardW, behavior: 'smooth' });
};

pubPrev?.addEventListener('click', () => scrollByCard(-1));
pubNext?.addEventListener('click', () => scrollByCard(1));

/* ==================== TALKS: VIEW TOGGLE (cards / list) ==================== */
const talkView       = document.getElementById('talk-view');
const talkScrollNav  = document.getElementById('talk-scroll-nav');
const talkToggleBtns = document.querySelectorAll('#talk-view-toggle .view-toggle__btn');

const setTalkView = view => {
  if (!talkView) return;
  talkView.classList.toggle('talk-view--cards', view === 'cards');
  talkView.classList.toggle('talk-view--list',  view === 'list');
  if (talkScrollNav) talkScrollNav.style.display = view === 'cards' ? '' : 'none';

  talkToggleBtns.forEach(btn => {
    const isActive = btn.dataset.view === view;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  try { localStorage.setItem('talk-view', view); } catch (_) {}
};

talkToggleBtns.forEach(btn =>
  btn.addEventListener('click', () => setTalkView(btn.dataset.view))
);

let savedTalkView = null;
try { savedTalkView = localStorage.getItem('talk-view'); } catch (_) {}
setTalkView(savedTalkView === 'list' ? 'list' : 'cards');

/* ==================== TALKS: SCROLL NAV ARROWS ==================== */
const talkPrev = document.getElementById('talk-prev');
const talkNext = document.getElementById('talk-next');

const scrollTalkByCard = dir => {
  if (!talkView) return;
  const card = talkView.querySelector('.talk:not(.is-hidden)');
  if (!card) return;
  const cardW = card.offsetWidth + parseInt(getComputedStyle(talkView).gap || 16);
  talkView.scrollBy({ left: dir * cardW, behavior: 'smooth' });
};

talkPrev?.addEventListener('click', () => scrollTalkByCard(-1));
talkNext?.addEventListener('click', () => scrollTalkByCard(1));

/* ==================== QUALIFICATION TABS ==================== */
document.querySelectorAll('.qual__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.target;

    document.querySelectorAll('.qual__tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.qual__content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(targetId)?.classList.add('active');
  });
});

/* ==================== DEV / OFFLINE DETECTION ==================== */
const urlParams = new URLSearchParams(location.search);
const IS_DEV =
  !urlParams.has('preview-prod') && (
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.protocol === 'file:' ||
    urlParams.has('offline')
  );

/* ==================== PINNED GITHUB PROJECTS ==================== */
(() => {
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  const slugs = (grid.dataset.repos ?? '').split(',').map(s => s.trim()).filter(Boolean);
  if (!slugs.length) { grid.innerHTML = '<p>No repositories configured.</p>'; return; }

  // Covers are injected by Jekyll from _data/projects.yml via data-covers attribute
  let covers = {};
  try { covers = JSON.parse(grid.dataset.covers || '{}'); } catch (_) {}

  const makePlaceholderSvg = name => 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
      <rect width="100%" height="100%" fill="#ede3ce"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
            font-family="Georgia,serif" font-size="52" fill="#005661">${name}</text>
    </svg>`
  );

  const makeCard = repo => {
    const card = document.createElement('article');
    card.className = 'project-card';

    // Cover image
    const ogUrl     = `https://opengraph.githubassets.com/1/${repo.full_name}`;
    const coverSrc  = covers[repo.full_name] ?? (IS_DEV ? makePlaceholderSvg(repo.name) : ogUrl);
    const coverLink = document.createElement('a');
    coverLink.href = repo.html_url; coverLink.target = '_blank'; coverLink.rel = 'noopener';
    coverLink.className = 'project-card__cover';
    const img = document.createElement('img');
    img.src = coverSrc; img.alt = `Preview for ${repo.full_name}`;
    img.loading = 'lazy'; img.decoding = 'async'; img.width = 1200; img.height = 630;
    img.addEventListener('error', () => coverLink.remove());
    coverLink.appendChild(img);
    card.appendChild(coverLink);

    // Title
    const h3 = document.createElement('h3');
    h3.className = 'project-card__title';
    const titleLink = document.createElement('a');
    titleLink.href = repo.html_url; titleLink.target = '_blank'; titleLink.rel = 'noopener';
    titleLink.textContent = repo.name;
    h3.appendChild(titleLink);
    card.appendChild(h3);

    // Description
    const desc = document.createElement('p');
    desc.className = 'project-card__desc';
    desc.textContent = repo.description || 'No description provided.';
    card.appendChild(desc);

    // Meta (stars + language)
    const meta  = document.createElement('div'); meta.className = 'project-card__meta';
    const stars = document.createElement('span');
    stars.innerHTML = `<i class="uil uil-star" aria-hidden="true"></i> ${repo.stargazers_count ?? 0}`;
    const lang = document.createElement('span');
    lang.textContent = repo.language ?? '';
    meta.appendChild(stars); meta.appendChild(lang);
    card.appendChild(meta);

    return card;
  };

  const makeFallback = (slug, msg) => {
    const card = document.createElement('article'); card.className = 'project-card';
    const h3 = document.createElement('h3'); h3.className = 'project-card__title'; h3.textContent = slug;
    const p  = document.createElement('p');  p.className  = 'project-card__desc';  p.textContent  = msg;
    card.appendChild(h3); card.appendChild(p);
    return card;
  };

  if (IS_DEV) {
    slugs.forEach(slug => {
      const name = slug.split('/')[1] ?? slug;
      grid.appendChild(makeCard({ html_url: `https://github.com/${slug}`, full_name: slug, name,
        description: 'Dev mode — mocked metadata.', stargazers_count: 0, language: '' }));
    });
    return;
  }

  slugs.forEach(async slug => {
    try {
      const res = await fetch(`https://api.github.com/repos/${slug}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      grid.appendChild(makeCard(await res.json()));
    } catch (err) {
      console.error('[projects] Failed to load', slug, err);
      grid.appendChild(makeFallback(slug, 'Could not fetch repository metadata.'));
    }
  });
})();

/* ==================== STRAVA EMBED BOOTSTRAP ==================== */
!function () {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, t = (new Error).stack;
    t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "a4227419-e663-45be-bdf2-458d4fb13dc3", e._sentryDebugIdIdentifier = "sentry-dbid-a4227419-e663-45be-bdf2-458d4fb13dc3")
  } catch (e) { }
  if (window.__STRAVA_EMBED_BOOTSTRAP__) window.__STRAVA_EMBED_BOOTSTRAP__();
}();
