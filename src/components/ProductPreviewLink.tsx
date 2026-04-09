'use client';

import SiteOgThumb from '@/components/SiteOgThumb';

export default function ProductPreviewLink({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <div className="mt-10">
      <p className="text-sm font-medium text-[var(--text-muted)]">サイトを開く</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block w-full max-w-md overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/30"
      >
        <SiteOgThumb pageUrl={url} failHint="プレビューを読み込めません" />
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block break-all text-sm font-medium text-[var(--terracotta)] underline-offset-4 hover:underline"
      >
        {url}
      </a>
      <p className="mt-2 text-xs text-[var(--text-muted)]">
        画像またはURLをクリックで「{title}」のサイトへ移動します。
      </p>
    </div>
  );
}
