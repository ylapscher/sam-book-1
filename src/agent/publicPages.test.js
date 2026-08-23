/**
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';
import {
  aboutMarkdown,
  contactMarkdown,
  homeMarkdown,
  llmsFullTxt,
  llmsTxt,
  privacyMarkdown,
  sitemapMarkdown,
} from './pages.js';
import { structuredData } from './structuredData.js';

const publicDir = path.join(__dirname, '../../public');

function readPublic(name) {
  return fs.readFileSync(path.join(publicDir, name), 'utf8');
}

function readableText(html) {
  let text = '';
  let index = 0;
  while (index < html.length) {
    const open = html.indexOf('<', index);
    if (open === -1) {
      text += html.slice(index);
      break;
    }
    text += html.slice(index, open);
    const close = html.indexOf('>', open + 1);
    if (close === -1) {
      text += html.slice(open);
      break;
    }
    index = close + 1;
  }
  return text.replace(/\s+/g, ' ').trim();
}

function innerRoot(html) {
  const startMarker = '<div id="root">';
  const start = html.indexOf(startMarker);
  expect(start).toBeGreaterThan(-1);
  const after = start + startMarker.length;
  const bodyClose = html.lastIndexOf('</body>');
  const end = html.lastIndexOf('</div>', bodyClose);
  expect(end).toBeGreaterThan(after);
  return html.slice(after, end);
}

function jsonLdFromHomepage(html) {
  const startMarker = '<script type="application/ld+json">';
  const start = html.indexOf(startMarker);
  expect(start).toBeGreaterThan(-1);
  const after = start + startMarker.length;
  const end = html.indexOf('</script>', after);
  expect(end).toBeGreaterThan(after);
  return JSON.parse(html.slice(after, end));
}

describe('homepage HTML without JavaScript', () => {
  const html = readPublic('index.html');
  const root = innerRoot(html);
  const text = readableText(root);

  test('includes a brand H1 and 500+ characters of copy', () => {
    expect(root.includes('<h1>Sam Story Book</h1>')).toBe(true);
    expect(text.length).toBeGreaterThanOrEqual(500);
    expect(root.includes('<h2>')).toBe(true);
    expect(root.includes('<h3>')).toBe(true);
  });

  test('embeds Organization JSON-LD with contactPoint and address', () => {
    const data = jsonLdFromHomepage(html);
    expect(data).toEqual(structuredData);
    const org = data['@graph'].find((node) => node['@type'] === 'Organization');
    expect(org.name).toBe('Sam Story Book');
    expect(org.contactPoint.email).toBe('samlapscher@gmail.com');
    expect(org.contactPoint.telephone).toBe('+1-845-825-3180');
    expect(org.contactPoint.contactType).toBe('customer service');
    expect(org.address['@type']).toBe('PostalAddress');
    expect(org.address.addressLocality).toBe('New York');
  });
});

describe('trust pages', () => {
  test.each([
    ['about.html', 'About Sam Story Book'],
    ['contact.html', 'Contact Sam Story Book'],
    ['privacy.html', 'Privacy Policy'],
  ])('%s has an H1 and 500+ characters', (filename, heading) => {
    const html = readPublic(filename);
    const text = readableText(html);
    expect(html.includes(`<h1>${heading}</h1>`)).toBe(true);
    expect(text.length).toBeGreaterThanOrEqual(500);
  });
});

describe('agent-friendly 404 HTML', () => {
  test('points agents at llms.txt, sitemap, and contact', () => {
    const html = readPublic('404.html');
    expect(html.includes('llms.txt')).toBe(true);
    expect(html.includes('sitemap')).toBe(true);
    expect(html.includes('/contact')).toBe(true);
    expect(html.includes('/about')).toBe(true);
  });
});

describe('llms.txt', () => {
  test('follows llmstxt.org shape and includes when-to-use guidance', () => {
    expect(llmsTxt.startsWith('# Sam Story Book\n')).toBe(true);
    expect(llmsTxt.includes('> ')).toBe(true);
    expect(llmsTxt.includes('## When to use this')).toBe(true);
    expect(llmsTxt.includes('How an agent should call us')).toBe(true);
    expect(llmsTxt.includes('When not to use this')).toBe(true);
    expect(readPublic('llms.txt').trim()).toBe(llmsTxt.trim());
  });
});

describe('public markdown siblings stay in sync', () => {
  test.each([
    ['index.md', homeMarkdown],
    ['about.md', aboutMarkdown],
    ['contact.md', contactMarkdown],
    ['privacy.md', privacyMarkdown],
    ['sitemap.md', sitemapMarkdown],
    ['llms-full.txt', llmsFullTxt],
  ])('%s matches pages.js', (filename, expected) => {
    expect(readPublic(filename).trim()).toBe(expected.trim());
  });
});

describe('edge function packaging', () => {
  test('does not import application source from outside netlify/edge-functions', () => {
    const source = fs.readFileSync(
      path.join(__dirname, '../../netlify/edge-functions/negotiate.ts'),
      'utf8'
    );
    expect(source.includes('../../src/')).toBe(false);
    expect(source.includes('text/markdown')).toBe(true);
    expect(source.includes('Vary')).toBe(true);
  });
});
