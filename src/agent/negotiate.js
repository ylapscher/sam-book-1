import { negotiate } from './accept.js';
import { markdownForPath, notFoundMarkdown, normalizePathname } from './pages.js';
import { SITE, VARY_ACCEPT, MARKDOWN_TYPE } from './site.js';

const SKIP_EXT = /\.(css|js|mjs|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|json)$/i;

export function shouldSkipNegotiation(pathname) {
  const path = normalizePathname(pathname);
  if (path.startsWith('/images/') || path.startsWith('/static/')) return true;
  if (path === '/favicon.ico' || path === '/manifest.json' || path === '/robots.txt') {
    return true;
  }
  return SKIP_EXT.test(path);
}

export function mergeVary(existing) {
  const seen = new Set();
  for (const raw of String(existing || '').split(',')) {
    const trimmed = raw.trim();
    if (trimmed) seen.add(trimmed.toLowerCase());
  }
  VARY_ACCEPT.split(',')
    .map((item) => item.trim().toLowerCase())
    .forEach((token) => seen.add(token));

  const ordered = [];
  for (const canonical of ['Accept', 'Accept-Encoding']) {
    if (seen.delete(canonical.toLowerCase())) {
      ordered.push(canonical);
    }
  }
  seen.forEach((token) => ordered.push(token));
  return ordered.join(', ');
}

function linkHeader(pathname) {
  const path = normalizePathname(pathname);
  const alternate =
    path === '/' ? `${SITE.origin}/index.md` : `${SITE.origin}${path}.md`;
  const canonical = path === '/' ? `${SITE.origin}/` : `${SITE.origin}${path}`;
  return [
    `<${SITE.origin}/llms.txt>; rel="describedby"`,
    `<${alternate}>; rel="alternate"; type="text/markdown"`,
    `<${canonical}>; rel="canonical"`,
  ].join(', ');
}

export function markdownHeaders(pathname, extra = {}) {
  return {
    'Content-Type': MARKDOWN_TYPE,
    Vary: VARY_ACCEPT,
    'Cache-Control': extra.cacheControl || 'public, max-age=300',
    Link: linkHeader(pathname),
    // Preserve the site-wide CORS policy from netlify.toml on generated responses.
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export function markdownResponse(body, status, pathname) {
  const headers = markdownHeaders(pathname, {
    cacheControl: status === 404 ? 'public, max-age=60' : 'public, max-age=300',
  });
  return new Response(body, { status, headers });
}

export function withNegotiationHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set('Vary', mergeVary(headers.get('Vary')));
  if (!headers.has('Link')) {
    headers.set('Link', linkHeader(pathname));
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function handleAgentRequest(request, context) {
  const url = new URL(request.url);
  const pathname = normalizePathname(url.pathname);

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return context.next();
  }

  if (shouldSkipNegotiation(pathname)) {
    return context.next();
  }

  const chosen = negotiate(request.headers.get('Accept'));

  if (chosen === 'none') {
    return new Response('Not Acceptable\n', {
      status: 406,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        Vary: VARY_ACCEPT,
      },
    });
  }

  if (chosen === 'text/markdown') {
    const body = markdownForPath(pathname);
    if (body == null) {
      const response = markdownResponse(notFoundMarkdown, 404, pathname);
      if (request.method === 'HEAD') {
        return new Response(null, { status: 404, headers: response.headers });
      }
      return response;
    }
    const response = markdownResponse(body, 200, pathname);
    if (request.method === 'HEAD') {
      return new Response(null, { status: 200, headers: response.headers });
    }
    return response;
  }

  const originResponse = await context.next();
  return withNegotiationHeaders(originResponse, pathname);
}
