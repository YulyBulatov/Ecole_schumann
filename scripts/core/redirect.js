import { getBasePath } from './path.js';

const base = getBasePath();

const userLang = navigator.language || navigator.userLanguage;

if (userLang.startsWith("fr")) {
  window.location.replace(`${base}/fr/index.html`);
} else {
  window.location.replace(`${base}/en/index.html`);
}
