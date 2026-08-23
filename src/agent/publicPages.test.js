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
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function innerRoot(html) {
  const match = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<\/body>/);
  expect(match).not.toBeNull();
  return match[1];
}

describe('homepage HTML without JavaScript', () => {
  const html = readPublic('index.html');
  const root = innerRoot(html);
  const text = readableText(root);

  test('includes a brand H1 and 500+ characters of copy', () => {
    expect(root).toMatch(/<h1[^>]*>\s*Sam Story Book\s*<\/h1>/);
    expect(text.length).toBeGreaterThanOrEqual(500);
    expect(root).toMatch(/<h2[^>]*>/);
    expect(root).toMatch(/<h3[^>]*>/);
  });

  test('embeds Organization JSON-LD with contactPoint and address', () => {
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const data = JSON.parse(match[1]);
    expect(data).toEqual(structuredData);
    const org = data['@graph'].find((node) => node['@type'] === 'Organization');
    expect(org.name).toBe('Sam Story Book');
    expect(org.contactPoint.email).toBe('samlapscher@gmail.com');
    expect(org.contactPoint.telephone).toMatch(/\+1-845-825-3180/);
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
    expect(html).toMatch(new RegExp(`<h1[^>]*>\\s*${heading}\\s*</h1>`));
    expect(text.length).toBeGreaterThanOrEqual(500);
  });
});

describe('agent-friendly 404 HTML', () => {
  test('points agents at llms.txt, sitemap, and contact', () => {
    const html = readPublic('404.html');
    expect(html).toMatch(/llms\.txt/);
    expect(html).toMatch(/sitemap/);
    expect(html).toMatch(/\/contact/);
    expect(html).toMatch(/\/about/);
  });
});

describe('llms.txt', () => {
  test('follows llmstxt.org shape and includes when-to-use guidance', () => {
    expect(llmsTxt.startsWith('# Sam Story Book\n')).toBe(true);
    expect(llmsTxt).toMatch(/^> /m);
    expect(llmsTxt).toMatch(/## When to use this/);
    expect(llmsTxt).toMatch(/How an agent should call us/);
    expect(llmsTxt).toMatch(/When not to use this/);
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
