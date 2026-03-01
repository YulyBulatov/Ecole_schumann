export function getBasePath() {
  const parts = window.location.pathname.split('/').filter(Boolean);

  const langs = ['en', 'fr'];

  if (parts.length === 0) {
    return '';
  }

  if (langs.includes(parts[0])) {
    return '';
  }

  return '/' + parts[0];
}