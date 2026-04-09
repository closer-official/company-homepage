import { NextRequest, NextResponse } from 'next/server';
import { extractOgImage } from '@/lib/og-image-extract';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ image: null }, { status: 400 });
  }
  let href: string;
  try {
    href = url.startsWith('http') ? url : `https://${url}`;
    new URL(href);
  } catch {
    return NextResponse.json({ image: null }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(href, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; TadanosukeCloser/1.0; +https://divizero.jp)',
      },
      redirect: 'follow',
    });
    clearTimeout(timeout);
    if (!res.ok) return NextResponse.json({ image: null });
    const html = await res.text();
    const image = extractOgImage(html, res.url || href);
    return NextResponse.json({ image });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json({ image: null });
  }
}
