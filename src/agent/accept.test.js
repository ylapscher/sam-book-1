/**
 * @jest-environment node
 */
import { negotiate, parseAccept } from './accept.js';

const MD_HTML = ['text/markdown', 'text/html'];

describe('parseAccept', () => {
  test('returns null when the header is missing', () => {
    expect(parseAccept(null)).toBeNull();
    expect(parseAccept(undefined)).toBeNull();
  });

  test('parses q-values and list order', () => {
    const ranges = parseAccept('text/markdown, text/html;q=0.8, */*;q=0.1');
    expect(ranges.map((r) => [r.raw, r.q])).toEqual([
      ['text/markdown', 1],
      ['text/html', 0.8],
      ['*/*', 0.1],
    ]);
  });
});

describe('negotiate (acceptmarkdown.com vectors)', () => {
  test('text/markdown prefers markdown', () => {
    expect(negotiate('text/markdown', MD_HTML)).toBe('text/markdown');
  });

  test('markdown before html;q=0.8 prefers markdown', () => {
    expect(negotiate('text/markdown, text/html;q=0.8', MD_HTML)).toBe('text/markdown');
  });

  test('text/html prefers html', () => {
    expect(negotiate('text/html', MD_HTML)).toBe('text/html');
  });

  test('markdown q=0 with html listed prefers html', () => {
    expect(negotiate('text/markdown;q=0, text/html', MD_HTML)).toBe('text/html');
  });

  test('markdown q=0 with markdown only is 406', () => {
    expect(negotiate('text/markdown;q=0', ['text/markdown'])).toBe('none');
  });

  test('markdown q=0 with html available falls back to html', () => {
    expect(negotiate('text/markdown;q=0', MD_HTML)).toBe('text/html');
  });

  test('missing Accept uses html default', () => {
    expect(negotiate(null, MD_HTML)).toBe('text/html');
    expect(negotiate(undefined, MD_HTML)).toBe('text/html');
  });

  test('*/* uses html default', () => {
    expect(negotiate('*/*', MD_HTML)).toBe('text/html');
  });

  test('Chrome-like Accept stays on html', () => {
    const chrome =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';
    expect(negotiate(chrome, MD_HTML)).toBe('text/html');
  });

  test('unsupported positive type is 406', () => {
    expect(negotiate('image/png', MD_HTML)).toBe('none');
  });
});
