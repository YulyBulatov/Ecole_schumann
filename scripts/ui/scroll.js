export function initScrollTop() {

  const btn = document.getElementById('to-top-btn');

  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    btn.blur();
  });

}