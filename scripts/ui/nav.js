// scripts/nav.js

function handleBurgerMenuDisplay() {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('nav');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!burger || !nav) return;

  if (window.innerWidth <= 900) {
    burger.style.display = 'flex';
    nav.style.display = 'none';
  } else {
    burger.style.display = 'none';
    nav.style.display = '';

    if (mobileNav) mobileNav.style.display = 'none';
  }
}
const lang = document.documentElement.lang;

function handleLanguageToggle() {
  const enBtn = document.getElementById('en');
  const frBtn = document.getElementById('fr');

  if (window.innerWidth <= 900) {

    if (lang === 'fr') {
      if (frBtn) frBtn.style.display = 'none';
      if (enBtn) enBtn.style.display = '';
    }

    if (lang === 'en') {
      if (enBtn) enBtn.style.display = 'none';
      if (frBtn) frBtn.style.display = '';
    }

  } else {

    if (frBtn) frBtn.style.display = '';
    if (enBtn) enBtn.style.display = '';

  }
}

function restoreSectionsOnDesktop() {
  if (window.innerWidth <= 900) return;

  const container = document.querySelector('.expandable-content');
  if (!container) return;

  document.querySelectorAll('.card').forEach(card => {
    const targetId = card.getAttribute('data-target');
    const section = targetId && document.getElementById(targetId);

    if (section && section.parentElement !== container) {
      container.appendChild(section);
    }
  });
}

function initBurgerMenu() {
  const burger = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (!burger || !mobileNav) return;

  burger.setAttribute('aria-controls', 'mobile-nav');
  burger.setAttribute('aria-expanded', 'false');

  burger.addEventListener('click', () => {
    const willOpen = mobileNav.style.display !== 'flex';

    mobileNav.style.display = willOpen ? 'flex' : 'none';
    burger.setAttribute('aria-expanded', String(willOpen));
    document.body.classList.toggle('menu-open', willOpen);
  });

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      mobileNav.style.display = 'none';
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.style.display === 'flex') {
      mobileNav.style.display = 'none';
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.style.display = 'none';
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

export function initNavigationUI() {
  handleBurgerMenuDisplay();
  handleLanguageToggle();
  restoreSectionsOnDesktop();
  initBurgerMenu();

  window.addEventListener('resize', handleBurgerMenuDisplay);
  window.addEventListener('resize', handleLanguageToggle);
  window.addEventListener('resize', restoreSectionsOnDesktop);
}
