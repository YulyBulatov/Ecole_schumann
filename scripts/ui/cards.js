function isMobile() {
  return window.matchMedia("(max-width: 900px)").matches;
}

export function initCards() {

  document.querySelectorAll('.card').forEach(card => {

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') return;

      const btn = card.querySelector('button');
      btn && btn.click();
    });

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const btn = card.querySelector('button');
        btn && btn.click();
      }
    });
  });

  document.querySelectorAll('.card button').forEach(btn => {

    btn.addEventListener('click', () => {

      const card = btn.closest('.card');
      const targetId = card.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (isMobile() && targetSection) {
        card.insertAdjacentElement('afterend', targetSection);
      }

      const backgroundColor =
        window.getComputedStyle(card).backgroundColor;

      document.querySelectorAll('.expandable-section').forEach(section => {
        if (section !== targetSection) {
          section.classList.remove('open');
          section.style.maxHeight = null;
          section.style.padding = '0';
          section.style.backgroundColor = '';
        }
      });

      document.querySelectorAll('.card').forEach(c => {
        c.style.boxShadow = 'none';
      });

      if (targetSection.classList.contains('open')) {

        targetSection.classList.remove('open');
        card.classList.remove('hide-button', 'expanded');

      } else {

        targetSection.classList.add('open');
        targetSection.style.backgroundColor = backgroundColor;

        document.querySelectorAll('.card').forEach(c => {
          c.classList.remove('hide-button', 'expanded');
        });

        card.classList.add('hide-button', 'expanded');

        document.querySelectorAll('.card').forEach(c => {
          if (c !== card) {
            c.style.boxShadow = '0px 8px 8px rgba(0,0,0,0.4)';
          }
        });
      }

    });

  });

  const firstReadMore = document.querySelector('.card button');
  if (firstReadMore) firstReadMore.click();
}