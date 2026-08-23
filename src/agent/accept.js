const DEFAULT_TYPE = 'text/html';
const PRODUCED = ['text/markdown', 'text/html'];

/**
 * Parse an HTTP Accept header into media ranges with q-values.
 * Follows acceptmarkdown.com / RFC 9110 ranking: q descending, then
 * specificity (exact, then type wildcard, then catch-all), then client list order.
 */
export function parseAccept(header) {
  if (header == null) return null;
  const trimmed = String(header).trim();
  if (trimmed === '') return [];

  return trimmed
    .split(',')
    .map((part, index) => {
      const bits = part.trim().split(';').map((s) => s.trim()).filter(Boolean);
      if (!bits.length) return null;
      const media = bits[0].toLowerCase();
      const [type, subtype] = media.split('/');
      if (!type || !subtype) return null;

      let q = 1;
      for (const param of bits.slice(1)) {
        const eq = param.indexOf('=');
        if (eq === -1) continue;
        const key = param.slice(0, eq).trim().toLowerCase();
        let value = param.slice(eq + 1).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        if (key === 'q') {
          const parsed = Number(value);
          q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
        }
      }

      return { type, subtype, q, index, raw: media };
    })
    .filter(Boolean);
}

function rangeMatches(serverType, range) {
  if (range.raw === '*/*' || (range.type === '*' && range.subtype === '*')) {
    return { specificity: 1 };
  }
  const [sType, sSubtype] = serverType.split('/');
  if (range.type === sType && range.subtype === '*') {
    return { specificity: 2 };
  }
  if (range.type === sType && range.subtype === sSubtype) {
    return { specificity: 3 };
  }
  return null;
}

function scoreType(serverType, ranges) {
  let best = { q: 0, specificity: 0, clientIndex: Number.MAX_SAFE_INTEGER };
  for (const range of ranges) {
    const match = rangeMatches(serverType, range);
    if (!match) continue;
    if (range.q === 0) {
      if (match.specificity >= 3 && best.specificity < 3) {
        best = { q: 0, specificity: 0, clientIndex: range.index, forbidden: true };
      }
      continue;
    }
    if (
      match.specificity > best.specificity ||
      (match.specificity === best.specificity && range.q > best.q) ||
      (match.specificity === best.specificity && range.q === best.q && range.index < best.clientIndex)
    ) {
      best = { q: range.q, specificity: match.specificity, clientIndex: range.index };
    }
  }
  return best;
}

/**
 * Choose a representation for Accept negotiation.
 * Returns 'text/markdown', 'text/html', or 'none' (caller should 406).
 */
export function negotiate(acceptHeader, produced = PRODUCED, defaultType = DEFAULT_TYPE) {
  const ranges = parseAccept(acceptHeader);
  if (ranges == null) {
    return defaultType;
  }

  const scores = produced.map((type) => ({
    type,
    ...scoreType(type, ranges),
  }));

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
    if (tiedWildcard) {
      return produced.includes(defaultType) ? defaultType : best.type;
    }
    return best.type;
  }

  const anyPositive = ranges.some((range) => range.q > 0);
  const defaultForbidden = ranges.some((range) => {
    if (range.q !== 0) return false;
    return Boolean(rangeMatches(defaultType, range));
  });

  if (!anyPositive && !defaultForbidden && produced.includes(defaultType)) {
    return defaultType;
  }

  return 'none';
}
