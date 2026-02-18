import { getBasePath } from './path.js';

const base = getBasePath();

const enBtn = document.getElementById('en');
const frBtn = document.getElementById('fr');

if (enBtn) {
  enBtn.addEventListener('click', () => {
    window.location.replace(`${base}/en/index.html`);
  });
}

if (frBtn) {
  frBtn.addEventListener('click', () => {
    window.location.replace(`${base}/fr/index.html`);
  });
}
