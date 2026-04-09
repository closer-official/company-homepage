'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

interface Review {
  id: string;
  productionUrl: string;
  rating: number;
  comment?: string;
  leadTimeDays?: number;
  leadTimeNote?: string;
  communicationReview?: string;
  exceededExpectations?: string;
  recommendTo?: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'web_production_reviews'),
        orderBy('createdAt', 'desc'),
        limit(100)
      );
      const snap = await getDocs(q);
      const list: Review[] = [];
      snap.forEach((d) => {
        const data = d.data();
        const rating = Number(data.rating);
        if (!data.productionUrl || rating < 1 || rating > 5) return;
        const leadRaw = data.leadTimeDays;
        const leadNum =
          leadRaw === undefined || leadRaw === null || leadRaw === ''
            ? undefined
            : Number(leadRaw);
        list.push({
          id: d.id,
          productionUrl: String(data.productionUrl).trim(),
          rating,
          comment: data.comment ? String(data.comment).trim() : undefined,
          leadTimeDays:
            leadNum !== undefined && Number.isFinite(leadNum) && leadNum >= 0
              ? Math.round(leadNum)
              : undefined,
          leadTimeNote: data.leadTimeNote ? String(data.leadTimeNote).trim() : undefined,
          communicationReview: data.communicationReview
            ? String(data.communicationReview).trim()
            : undefined,
          exceededExpectations: data.exceededExpectations
            ? String(data.exceededExpectations).trim()
            : undefined,
          recommendTo: data.recommendTo ? String(data.recommendTo).trim() : undefined,
          createdAt: String(data.createdAt ?? ''),
        });
      });
      setReviews(list);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('この口コミを削除しますか？')) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'web_production_reviews', id));
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert('削除に失敗しました');
    }
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-white">制作実績・口コミの管理</h1>
          <p className="text-sm text-zinc-300">
            一覧表示されている口コミを運営のみ削除できます。削除すると公開ページ（/services/works）からも非表示になります。
          </p>
        </div>

        <div className="mt-6">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
            href="/admin"
          >
            ← 管理トップへ
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 text-sm text-zinc-500">読み込み中...</div>
        ) : reviews.length === 0 ? (
          <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-8 text-center text-sm text-zinc-400">
            まだ口コミはありません。
          </div>
        ) : (
          <ul className="mt-10 space-y-6">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-amber-300">
                    {'★'.repeat(Math.round(r.rating))}
                    {'☆'.repeat(5 - Math.round(r.rating))}
                    <span className="text-sm text-zinc-400">{r.rating} / 5</span>
                  </p>
                  <a
                    href={r.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block break-all text-sm font-medium text-blue-300 hover:underline"
                  >
                    {r.productionUrl}
                  </a>
                  {(r.leadTimeDays != null || r.leadTimeNote) && (
                    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-300">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        完成までのスピード感
                      </p>
                      <p className="mt-1">
                        {r.leadTimeDays != null && (
                          <span>依頼〜公開まで {r.leadTimeDays} 日</span>
                        )}
                        {r.leadTimeNote && (
                          <span className="mt-1 block whitespace-pre-wrap">{r.leadTimeNote}</span>
                        )}
                      </p>
                    </div>
                  )}
                  {r.communicationReview && (
                    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-300">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        コミュニケーションの満足度
                      </p>
                      <p className="mt-1 whitespace-pre-wrap">{r.communicationReview}</p>
                    </div>
                  )}
                  {r.exceededExpectations && (
                    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-300">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        驚いたこと・期待超え
                      </p>
                      <p className="mt-1 whitespace-pre-wrap">{r.exceededExpectations}</p>
                    </div>
                  )}
                  {r.recommendTo && (
                    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-zinc-300">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        薦めたい人
                      </p>
                      <p className="mt-1 whitespace-pre-wrap">{r.recommendTo}</p>
                    </div>
                  )}
                  {r.comment && (
                    <p className="mt-2 text-sm text-zinc-300">
                      <span className="text-zinc-500">その他：</span>
                      <span className="whitespace-pre-wrap">「{r.comment}」</span>
                    </p>
                  )}
                  <p className="mt-1 text-xs text-zinc-500">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString('ja-JP') : ''}
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    disabled={deletingId === r.id}
                    className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {deletingId === r.id ? '削除中...' : '削除'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
