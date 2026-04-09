'use client';

import { useMemo, useState } from 'react';

type Phase = 'loading' | 'ok' | 'fail';

type SiteOgThumbProps = {
  pageUrl: string;
  /** 失敗時の短い説明（任意） */
  failHint?: string;
  className?: string;
};

/**
 * ページURLの OGP 画像を `/api/site-thumb` 経由で表示。
 * 外部CDNのホットリンク拒否を避けるため、画像は自サイトAPIがプロキシします。
 */
export default function SiteOgThumb({
  pageUrl,
  failHint = 'プレビューなし（OGP画像なし、または取得不可）',
  className = '',
}: SiteOgThumbProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const src = useMemo(
    () => `/api/site-thumb?url=${encodeURIComponent(pageUrl)}`,
    [pageUrl]
  );

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-[var(--border)]/30 ${className}`}
    >
      {phase === 'loading' && (
        <div
          className="absolute inset-0 z-[1] animate-pulse bg-[var(--border)]"
          aria-hidden
        />
      )}
      {phase === 'fail' && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-[var(--border)]/50 px-4 text-center text-sm text-[var(--text-muted)]">
          {failHint}
        </div>
      )}
      <img
        src={src}
        alt=""
        width={640}
        height={360}
        loading="lazy"
        referrerPolicy="no-referrer"
        decoding="async"
        className={
          phase === 'fail'
            ? 'hidden'
            : `aspect-video h-full w-full object-cover ${phase === 'ok' ? 'opacity-100' : 'opacity-0'}`
        }
        onLoad={() => setPhase('ok')}
        onError={() => setPhase('fail')}
      />
    </div>
  );
}
