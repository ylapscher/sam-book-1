export const SITE = {
  origin: 'https://www.samstorybook.com',
  name: 'Sam Story Book',
  productName: 'Our Family Story Book',
  email: 'samlapscher@gmail.com',
  telephone: '+1-845-825-3180',
  founder: 'Sam Lapscher',
  address: {
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
};

export const VARY_ACCEPT = 'Accept, Accept-Encoding';

export const MARKDOWN_TYPE = 'text/markdown; charset=utf-8';
export const HTML_TYPE = 'text/html; charset=utf-8';

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.origin}${normalized === '/index.html' ? '/' : normalized}`;
}
