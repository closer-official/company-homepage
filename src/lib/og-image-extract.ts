/** 相対URLをページ基準の絶対URLに解決 */
export function absoluteUrl(base: string, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  try {
    const u = new URL(base);
    if (path.startsWith('//')) return u.protocol + path;
    if (path.startsWith('/')) return u.origin + path;
    return new URL(path, base).href;
  } catch {
    return path;
  }
}

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

/**
 * HTML から OGP / Twitter カードの代表画像URLを抽出（最初に見つかったもの）
 */
export function extractOgImage(html: string, pageUrl: string): string | null {
  const patterns: RegExp[] = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image:secure_url["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    /<meta[^>]+name=["']twitter:image:src["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image:src["']/i,
    /<meta[^>]+property=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) {
      const raw = decodeBasicEntities(m[1].trim());
      const href = absoluteUrl(pageUrl, raw);
      if (href.startsWith('http://') || href.startsWith('https://')) return href;
    }
  }
  return null;
}
