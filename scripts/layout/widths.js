export function setElementWidth(element, columnsSpanned, incrementGutter = false) {
  const styles = getComputedStyle(document.documentElement);

  const designWidth = parseFloat(styles.getPropertyValue('--design-width'));
  const columns = parseInt(styles.getPropertyValue('--columns'));
  const gutter = parseFloat(styles.getPropertyValue('--gutter'));
  const margin = parseFloat(styles.getPropertyValue('--margin'));

  const availableWidth = designWidth - (2 * margin) - ((columns - 1) * gutter);
  const columnWidth = availableWidth / columns;

  let elementWidth =
    (columnWidth * columnsSpanned) + ((columnsSpanned - 1) * gutter);

  if (incrementGutter) {
    elementWidth += gutter;
  }

  const finalWidth = (elementWidth * window.innerWidth) / designWidth;

  element.style.width = finalWidth + 'px';
}

export function applyDesktopWidths() {
  if (window.innerWidth <= 900) return;

  const hero = document.querySelector('.hero');
  hero && setElementWidth(hero, 4);

  const message = document.querySelector('.message');
  message && setElementWidth(message, 5);

  const map = document.querySelector('.map');
  map && setElementWidth(map, 6, true);

  const contact = document.querySelector('.contact');
  contact && setElementWidth(contact, 3);

  const school = document.querySelector('.school-website');
  school && setElementWidth(school, 3);

  const links = document.querySelector('.links');
  links && setElementWidth(links, 1, true);
}