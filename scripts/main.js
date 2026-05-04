import { initNavigationUI } from './ui/nav.js';
import { initLanguageSwitch } from './ui/lang-switch.js';
import { initFAQ } from './ui/faq.js';
import { initCards } from './ui/cards.js';
import { initScrollTop } from './ui/scroll.js';
import { applyDesktopWidths } from './layout/widths.js';
import { initVisitPopup } from './ui/popup.js';


function init() {

  // Navigation / header
  initNavigationUI();

  // Visit popup
  initVisitPopup();

  // Language switch buttons
  initLanguageSwitch();

  // Page components
  initFAQ();
  initCards();
  initScrollTop();

  // Layout calculations
  applyDesktopWidths();
  window.addEventListener('resize', applyDesktopWidths);

}

document.addEventListener('DOMContentLoaded', init);