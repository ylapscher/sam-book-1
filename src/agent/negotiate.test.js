/**
 * @jest-environment node
 */
import { handleAgentRequest, mergeVary, shouldSkipNegotiation } from './negotiate.js';
import { homeMarkdown, notFoundMarkdown } from './pages.js';
import { VARY_ACCEPT } from './site.js';

function mockContext(origin = { status: 200, body: '<html></html>', headers: { 'content-type': 'text/html' } }) {
  return {
    next: jest.fn(async () => {
      return new Response(origin.body, {
        status: origin.status,
        headers: origin.headers,
      });
    }),
  };
}

describe('handleAgentRequest', () => {
  test('serves markdown for Accept: text/markdown on the homepage', async () => {
    const request = new Request('https://www.samstorybook.com/', {
      headers: { Accept: 'text/markdown' },
    });
    const context = mockContext();
    const response = await handleAgentRequest(request, context);
    expect(context.next).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toMatch(/text\/markdown/);
    expect(response.headers.get('Vary')).toMatch(/Accept/i);
    expect(response.headers.get('Vary')).toBe(VARY_ACCEPT);
    await expect(response.text()).resolves.toBe(homeMarkdown);
  });

  test('unknown paths return HTTP 404 markdown with recovery links', async () => {
    const request = new Request('https://www.samstorybook.com/some-path-that-does-not-exist', {
      headers: { Accept: 'text/markdown' },
    });
    const response = await handleAgentRequest(request, mockContext());
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toMatch(/text\/markdown/);
    expect(response.headers.get('Vary')).toMatch(/Accept/);
    const body = await response.text();
    expect(body).toBe(notFoundMarkdown);
    expect(body).toMatch(/llms\.txt/);
    expect(body).toMatch(/sitemap/);
  });

  test('HTML Accept passes through and adds Vary: Accept', async () => {
    const request = new Request('https://www.samstorybook.com/', {
      headers: { Accept: 'text/html' },
    });
    const context = mockContext({
      status: 200,
      body: '<h1>Sam Story Book</h1>',
      headers: { 'content-type': 'text/html', vary: 'Accept-Encoding' },
    });
    const response = await handleAgentRequest(request, context);
    expect(context.next).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.headers.get('Vary')).toMatch(/Accept/);
    expect(response.headers.get('Vary')).toMatch(/Accept-Encoding/);
    await expect(response.text()).resolves.toContain('Sam Story Book');
  });

  test('returns 406 when no produced type is acceptable', async () => {
    const request = new Request('https://www.samstorybook.com/', {
      headers: { Accept: 'image/png' },
    });
    const context = mockContext();
    const response = await handleAgentRequest(request, context);
    expect(response.status).toBe(406);
    expect(response.headers.get('Vary')).toMatch(/Accept/);
  });

  test('skips static assets', () => {
    expect(shouldSkipNegotiation('/images/1.png')).toBe(true);
    expect(shouldSkipNegotiation('/favicon.ico')).toBe(true);
    expect(shouldSkipNegotiation('/')).toBe(false);
    expect(shouldSkipNegotiation('/about')).toBe(false);
  });

  test('mergeVary keeps Accept and Accept-Encoding', () => {
    expect(mergeVary('accept-encoding')).toBe(VARY_ACCEPT);
  });
});
