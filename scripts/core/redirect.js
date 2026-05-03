import { getBasePath } from './path.js';

const base = getBasePath();
const lang = (navigator.language || navigator.userLanguage || 'en' || 'fr').toLowerCase();

if (lang.startsWith('fr')) {
  window.location.replace(`${base}/fr/index.html`);
} else {
  // Default to English for all non‑French languages
  window.location.replace(`${base}/en/index.html`);
}

