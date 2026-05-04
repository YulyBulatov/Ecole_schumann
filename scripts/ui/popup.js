// Visit Popup functionality

export function initVisitPopup() {
  const visitPopup = document.getElementById('visitPopup');
  const popupClose = document.getElementById('popupClose');
  const mobileNav = document.querySelector('.mobile-nav');

  let lastTrigger = null;
  let trapHandler = null;
  let escHandler = null;

  // Find all triggers using a data attribute
  const visitTriggers = document.querySelectorAll('[data-visit-trigger]');

  // -------------------------------------------------------------------------
  // Guard clauses – ensure required elements exist before proceeding
  // -------------------------------------------------------------------------
  if (!visitPopup || !popupClose) return;
  if (!visitTriggers.length) return;

  // -------------------------------------------------------------------------
  // Open popup
  // -------------------------------------------------------------------------
  const openPopup = (e) => {
    e.preventDefault();
    lastTrigger = e.currentTarget;

    // Close mobile nav if it is open.
    // The navigation component now toggles an "open" class instead of inline styles.
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    visitPopup.classList.add('active');
    visitPopup.setAttribute('aria-hidden', 'false');
    // Prevent background scrolling while the dialog is open
    document.body.style.overflow = 'hidden';

    // --------------------------------------------------------------
    // Focus management – move focus to the first focusable element
    // --------------------------------------------------------------
    const focusable = visitPopup.querySelectorAll(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    (first || visitPopup).focus();

    // Store the trap handler so it can be removed when the dialog closes
    trapHandler = (e) => {
      if (e.key !== 'Tab') return;

      // If Shift+Tab on the first element, wrap to the last
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      // If Tab on the last element, wrap to the first
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    visitPopup.addEventListener('keydown', trapHandler);
  };

  // -------------------------------------------------------------------------
  // Close popup
  // -------------------------------------------------------------------------
  const closePopup = () => {
    visitPopup.classList.remove('active');
    visitPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (trapHandler) {
      visitPopup.removeEventListener('keydown', trapHandler);
      trapHandler = null;
    }
    if (escHandler) {
      document.removeEventListener('keydown', escHandler);
      escHandler = null;
    }
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  // -------------------------------------------------------------------------
  // Attach handlers to every trigger element
  // -------------------------------------------------------------------------
  visitTriggers.forEach((el) => {
    const handler = (e) => openPopup(e);
    el.addEventListener('click', handler);
    // Store reference for potential cleanup
    el._popupHandler = handler;
  });

  // Close button inside the popup
  popupClose.addEventListener('click', closePopup);

  // Click‑outside to close (only when clicking the backdrop)
  visitPopup.addEventListener('click', (e) => {
    if (e.target === visitPopup) closePopup();
  });

  // Escape key – global listener because the dialog is a modal
  escHandler = (e) => {
    if (e.key === 'Escape' && visitPopup.classList.contains('active')) {
      closePopup();
    }
  };
  document.addEventListener('keydown', escHandler);
}
