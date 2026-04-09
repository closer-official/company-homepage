import { NextRequest, NextResponse } from 'next/server';
import { extractOgImage } from '@/lib/og-image-extract';

const MAX_IMAGE_BYTES = 3_500_000;
const FETCH_TIMEOUT_MS = 12_000;

const UA =
  'Mozilla/5.0 (compatible; TadanosukeCloser/1.0; +https://divizero.jp)';

/**
 * 任意URLのページを取得し、OGP画像をサーバー側で取り込んで返す。
 * ブラウザ直読み込みでのホットリンク拒否を避ける用途。
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url || typeof url !== 'string') {
    return new NextResponse(null, { status: 400 });
  }
  let pageHref: string;
  try {
    pageHref = url.startsWith('http') ? url : `https://${url}`;
    new URL(pageHref);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const pageRes = await fetch(pageHref, {
      signal: controller.signal,
      headers: { 'User-Agent': UA },
      redirect: 'follow',
    });
    clearTimeout(timeout);
    if (!pageRes.ok) return new NextResponse(null, { status: 404 });
    const html = await pageRes.text();
    const baseUrl = pageRes.url || pageHref;
    const imageHref = extractOgImage(html, baseUrl);
    if (!imageHref) return new NextResponse(null, { status: 404 });

    const imgController = new AbortController();
    const imgTimeout = setTimeout(() => imgController.abort(), FETCH_TIMEOUT_MS);
    const imgRes = await fetch(imageHref, {
      signal: imgController.signal,
      headers: { 'User-Agent': UA, Accept: 'image/*,*/*;q=0.8' },
      redirect: 'follow',
    });
    clearTimeout(imgTimeout);
    if (!imgRes.ok) return new NextResponse(null, { status: 404 });

    const ct = imgRes.headers.get('content-type') || '';
    if (!ct.startsWith('image/')) return new NextResponse(null, { status: 404 });

    const buf = await imgRes.arrayBuffer();
    if (buf.byteLength > MAX_IMAGE_BYTES) {
      return new NextResponse(null, { status: 413 });
    }

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': ct.split(';')[0].trim(),
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch {
    clearTimeout(timeout);
    return new NextResponse(null, { status: 404 });
  }
}
