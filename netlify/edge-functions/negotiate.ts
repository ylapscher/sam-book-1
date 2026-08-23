const VARY = "Accept, Accept-Encoding";
const MARKDOWN_TYPE = "text/markdown; charset=utf-8";
const ORIGIN = "https://www.samstorybook.com";

const PAGE_TO_MARKDOWN: Record<string, string> = {
  "/": "/index.md",
  "/index.html": "/index.md",
  "/about": "/about.md",
  "/about.html": "/about.md",
  "/contact": "/contact.md",
  "/contact.html": "/contact.md",
  "/privacy": "/privacy.md",
  "/privacy.html": "/privacy.md",
  "/sitemap.xml": "/sitemap.md",
  "/llms.txt": "/llms.txt",
  "/llms-full.txt": "/llms-full.txt",
  "/sitemap.md": "/sitemap.md",
};

const NOT_FOUND_MARKDOWN = `# Page not found

This path does not exist on Sam Story Book. Nothing is hidden behind it — the URL is not a product, article, or account page.

## Where to look next

- [llms.txt](${ORIGIN}/llms.txt): when to use this site, how to fetch markdown, and the page index
- [Markdown sitemap](${ORIGIN}/sitemap.md): every public URL
- [XML sitemap](${ORIGIN}/sitemap.xml): the same list for crawlers
- [Home](${ORIGIN}/): Our Family Story Book — order a personalized children's book
- [About](${ORIGIN}/about): who makes the books
- [Contact](${ORIGIN}/contact): email samlapscher@gmail.com or call +1-845-825-3180
- [Privacy](${ORIGIN}/privacy): how order data is handled

If you were sent here by a guessed docs or API path, stop: Sam Story Book does not publish a developer API. Use the homepage form or contact page instead.
`;

function normalizePathname(pathname: string) {
  const path = pathname.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path === "" ? "/" : path;
}

function shouldPassThrough(pathname: string) {
  if (pathname.startsWith("/images/") || pathname.startsWith("/static/") || pathname.startsWith("/css/")) {
    return true;
  }
  if (
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/robots.txt"
  ) {
    return true;
  }
  return /\.(?:css|js|mjs|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|json|md|txt|xml)$/i.test(
    pathname
  );
}

function parseAccept(header: string | null) {
  if (header == null) return null;
  const trimmed = header.trim();
  if (trimmed === "") return [];

  return trimmed
    .split(",")
    .map((part, index) => {
      const bits = part.trim().split(";").map((item) => item.trim()).filter(Boolean);
      if (!bits.length) return null;
      const media = bits[0].toLowerCase();
      const [type, subtype] = media.split("/");
      if (!type || !subtype) return null;
      let q = 1;
      for (const param of bits.slice(1)) {
        const eq = param.indexOf("=");
        if (eq === -1) continue;
        const key = param.slice(0, eq).trim().toLowerCase();
        let value = param.slice(eq + 1).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        if (key === "q") {
          const parsed = Number(value);
          q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
        }
      }
      return { type, subtype, q, index, raw: media };
    })
    .filter(Boolean) as Array<{ type: string; subtype: string; q: number; index: number; raw: string }>;
}

function rangeMatches(
  serverType: string,
  range: { type: string; subtype: string; raw: string }
) {
  if (range.raw === "*/*" || (range.type === "*" && range.subtype === "*")) {
    return { specificity: 1 };
  }
  const [sType, sSubtype] = serverType.split("/");
  if (range.type === sType && range.subtype === "*") {
    return { specificity: 2 };
  }
  if (range.type === sType && range.subtype === sSubtype) {
    return { specificity: 3 };
  }
  return null;
}

function negotiate(acceptHeader: string | null) {
  const produced = ["text/markdown", "text/html"];
  const defaultType = "text/html";
  const ranges = parseAccept(acceptHeader);
  if (ranges == null) return defaultType;

  const scores = produced.map((type) => {
    let best = { q: 0, specificity: 0, clientIndex: Number.MAX_SAFE_INTEGER };
    for (const range of ranges) {
      const match = rangeMatches(type, range);
      if (!match) continue;
      if (range.q === 0) continue;
      if (
        match.specificity > best.specificity ||
        (match.specificity === best.specificity && range.q > best.q) ||
        (match.specificity === best.specificity &&
          range.q === best.q &&
          range.index < best.clientIndex)
      ) {
        best = { q: range.q, specificity: match.specificity, clientIndex: range.index };
      }
    }
    return { type, ...best };
  });

  scores.sort((a, b) => {
    if (b.q !== a.q) return b.q - a.q;
    if (b.specificity !== a.specificity) return b.specificity - a.specificity;
    if (a.clientIndex !== b.clientIndex) return a.clientIndex - b.clientIndex;
    if (a.type === defaultType) return -1;
    if (b.type === defaultType) return 1;
    return 0;
  });

  const best = scores[0];
  if (best && best.q > 0) {
    const tiedWildcard =
      best.specificity === 1 &&
      scores.every((item) => item.q === best.q && item.specificity === 1);
    if (tiedWildcard) return defaultType;
    return best.type;
  }

  const anyPositive = ranges.some((range) => range.q > 0);
  if (!anyPositive) return defaultType;
  return "none";
}

function markdownHeaders(status: number) {
  return {
    "Content-Type": MARKDOWN_TYPE,
    Vary: VARY,
    "Cache-Control": status === 404 ? "public, max-age=60" : "public, max-age=300",
  };
}

function mergeVary(existing: string | null) {
  const seen = new Set<string>();
  for (const raw of `${existing || ""},${VARY}`.split(",")) {
    const token = raw.trim().toLowerCase();
    if (token) seen.add(token);
  }
  const ordered = [];
  for (const name of ["Accept", "Accept-Encoding"]) {
    if (seen.delete(name.toLowerCase())) ordered.push(name);
  }
  seen.forEach((token) => ordered.push(token));
  return ordered.join(", ");
}

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const url = new URL(request.url);
  const pathname = normalizePathname(url.pathname);

  if (request.method !== "GET" && request.method !== "HEAD") {
    return context.next();
  }

  if (shouldPassThrough(pathname)) {
    return context.next();
  }

  const chosen = negotiate(request.headers.get("Accept"));
  if (chosen === "none") {
    return new Response("Not Acceptable\n", {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: VARY,
      },
    });
  }

  if (chosen === "text/markdown") {
    const mdPath = PAGE_TO_MARKDOWN[pathname];
    if (!mdPath) {
      return new Response(request.method === "HEAD" ? null : NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: markdownHeaders(404),
      });
    }
    const origin = await fetch(new URL(mdPath, url.origin));
    if (!origin.ok) {
      return new Response(request.method === "HEAD" ? null : NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: markdownHeaders(404),
      });
    }
    const body = request.method === "HEAD" ? null : await origin.text();
    return new Response(body, {
      status: 200,
      headers: markdownHeaders(200),
    });
  }

  const originResponse = await context.next();
  const headers = new Headers(originResponse.headers);
  headers.set("Vary", mergeVary(headers.get("Vary")));
  return new Response(originResponse.body, {
    status: originResponse.status,
    statusText: originResponse.statusText,
    headers,
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/images/*", "/static/*", "/css/*"],
  method: ["GET", "HEAD"],
};
