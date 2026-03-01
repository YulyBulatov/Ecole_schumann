export function initFAQ() {
  document.querySelectorAll('.faq-list').forEach(faqList => {

    faqList.querySelectorAll('.faq-question').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });

    faqList.querySelectorAll('.faq-answer').forEach(ans => {
      ans.setAttribute('aria-hidden', 'true');
      ans.setAttribute('role', 'region');

      if (!ans.id) {
        ans.id = 'faq-answer-' + Math.random().toString(36).slice(2, 11);
      }

      const qBtn = ans.closest('.faq-item')?.querySelector('.faq-question');
      if (qBtn) qBtn.setAttribute('aria-controls', ans.id);
    });

    faqList.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {

        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        faqList.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');

          const ans = i.querySelector('.faq-answer');
          if (ans) ans.setAttribute('aria-hidden', 'true');

          const qBtn = i.querySelector('.faq-question');
          if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          answer.setAttribute('aria-hidden', 'false');
        }
      });
    });

  });
}