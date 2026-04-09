'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import SiteOgThumb from '@/components/SiteOgThumb';

/** このサイト（Tadanosuke Closer 公式）の説明 — 制作実績の1件目として表示 */
const THIS_SITE_DESCRIPTION = {
  title: 'このサイト（Tadanosuke Closer 公式）',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://divizero.jp',
  text: 'Tadanosuke Closer のコーポレートサイトです。Next.js（App Router）で構築し、Firebase Hosting にデプロイ。編集風のタイポグラフィと余白、テラコッタ・セージのアクセントカラーで「事務感のない、信頼感のあるWeb」を目指しています。ヘッダーから各ページへ遷移するマルチページ構成で、サービス一覧・料金プラン・制作実績・お問い合わせ（FAQ・フォーム・LINE）まで一貫して案内しています。',
};
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';

export type CaseReview = {
  id: string;
  productionUrl: string;
  rating: number;
  comment?: string;
  /** 依頼から公開までの実日数（任意） */
  leadTimeDays?: number;
  leadTimeNote?: string;
  communicationReview?: string;
  exceededExpectations?: string;
  recommendTo?: string;
  createdAt: string;
};

function StarsDisplay({ rating }: { rating: number }) {
  return (
    <span className="text-[var(--terracotta)] tracking-tight" aria-label={`${rating}点（5点満点）`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}>{n <= Math.round(rating) ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex gap-0.5" role="group" aria-label="評価（5段階）">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-2xl leading-none transition-colors ${
            n <= value ? 'text-[var(--terracotta)]' : 'text-[var(--text-muted)]/35'
          }`}
          aria-label={`${n}点`}
        >
          {n <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}

export default function WebProductionCaseStudies() {
  const [reviews, setReviews] = useState<CaseReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [leadTimeDays, setLeadTimeDays] = useState('');
  const [leadTimeNote, setLeadTimeNote] = useState('');
  const [communicationReview, setCommunicationReview] = useState('');
  const [exceededExpectations, setExceededExpectations] = useState('');
  const [recommendTo, setRecommendTo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'web_production_reviews'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: CaseReview[] = [];
        snap.forEach((doc) => {
          const d = doc.data();
          const r = Number(d.rating);
          if (!d.productionUrl || r < 1 || r > 5) return;
          const leadRaw = d.leadTimeDays;
          const leadNum =
            leadRaw === undefined || leadRaw === null || leadRaw === ''
              ? undefined
              : Number(leadRaw);
          list.push({
            id: doc.id,
            productionUrl: String(d.productionUrl).trim(),
            rating: r,
            comment: d.comment ? String(d.comment).trim() : undefined,
            leadTimeDays:
              leadNum !== undefined && Number.isFinite(leadNum) && leadNum >= 0
                ? Math.round(leadNum)
                : undefined,
            leadTimeNote: d.leadTimeNote ? String(d.leadTimeNote).trim() : undefined,
            communicationReview: d.communicationReview
              ? String(d.communicationReview).trim()
              : undefined,
            exceededExpectations: d.exceededExpectations
              ? String(d.exceededExpectations).trim()
              : undefined,
            recommendTo: d.recommendTo ? String(d.recommendTo).trim() : undefined,
            createdAt: String(d.createdAt ?? ''),
          });
        });
        setReviews(list);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : null;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const u = url.trim();
      if (!u) {
        alert('製作サイトのURLを入力してください。');
        return;
      }
      try {
        new URL(u.startsWith('http') ? u : `https://${u}`);
      } catch {
        alert('有効なURLを入力してください（https:// からでも可）。');
        return;
      }
      const normalized = u.startsWith('http') ? u : `https://${u}`;
      const daysParsed = leadTimeDays.trim() === '' ? NaN : Number(leadTimeDays);
      const leadDays =
        Number.isFinite(daysParsed) && daysParsed >= 0 ? Math.round(daysParsed) : null;
      setSubmitting(true);
      try {
        await addDoc(collection(db, 'web_production_reviews'), {
          productionUrl: normalized,
          rating,
          comment: comment.trim() || null,
          leadTimeDays: leadDays,
          leadTimeNote: leadTimeNote.trim() || null,
          communicationReview: communicationReview.trim() || null,
          exceededExpectations: exceededExpectations.trim() || null,
          recommendTo: recommendTo.trim() || null,
          createdAt: new Date().toISOString(),
        });
        setDone(true);
        setUrl('');
        setRating(5);
        setComment('');
        setLeadTimeDays('');
        setLeadTimeNote('');
        setCommunicationReview('');
        setExceededExpectations('');
        setRecommendTo('');
      } catch (err) {
        console.error(err);
        alert('送信に失敗しました。しばらくしてから再度お試しください。');
      }
      setSubmitting(false);
    },
    [
      url,
      rating,
      comment,
      leadTimeDays,
      leadTimeNote,
      communicationReview,
      exceededExpectations,
      recommendTo,
    ]
  );

  return (
    <div className="text-[var(--text)]">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--terracotta)]">
        Tadanosuke Closer · Creative Web Production
      </p>
      <h1 className="font-heading mt-4 text-2xl font-semibold sm:text-3xl md:text-4xl">
        制作実績・お客様の声
      </h1>
      <p className="mt-6 max-w-xl leading-loose text-[var(--text-muted)]">
        手がけたサイトのURLと評価です。参考になれば幸いです。
      </p>

      {avg != null && (
        <p className="mt-10 text-sm text-[var(--text-muted)]">
          平均{' '}
          <span className="font-heading text-xl tabular-nums text-[var(--text)]">
            {avg.toFixed(1)}
          </span>
          <span className="text-[var(--text)]"> / 5</span>
          <span className="ml-3 align-middle text-[var(--terracotta)]">
            <StarsDisplay rating={avg} />
          </span>
          <span className="ml-2 text-[var(--text-muted)]">· {reviews.length}件</span>
        </p>
      )}

      <div className="mt-14">
        <article>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sage)]">
            自社サイト
          </p>
          <h2 className="font-heading mt-2 text-lg font-semibold text-[var(--text)]">
            {THIS_SITE_DESCRIPTION.title}
          </h2>
          <p className="mt-4 max-w-xl leading-loose text-[var(--text-muted)]">
            {THIS_SITE_DESCRIPTION.text}
          </p>
          <a
            href={THIS_SITE_DESCRIPTION.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-[var(--terracotta)] underline-offset-4 hover:underline"
          >
            {THIS_SITE_DESCRIPTION.url}
          </a>
        </article>

        <div className="mt-16 border-t border-[var(--border)]/60 pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            お客様の声
          </p>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-[var(--text-muted)]">
            サムネイルは各サイトの OGP（og:image など）から自動取得しています。未設定のサイトや、サーバー側の制限があると表示されないことがあります。
          </p>
        </div>
        {loading && <p className="mt-6 text-sm text-[var(--text-muted)]">読み込み中</p>}
        {!loading && reviews.length === 0 && (
          <p className="mt-6 leading-loose text-[var(--text-muted)]">
            まだ掲載はありません。下のフォームから登録できます。
          </p>
        )}
        {reviews.map((r, i) => (
          <article key={r.id} className={i > 0 ? 'mt-16' : ''}>
            <p className="text-[var(--terracotta)]">
              <StarsDisplay rating={r.rating} />
              <span className="ml-2 text-sm tabular-nums text-[var(--text-muted)]">
                {r.rating} / 5
              </span>
            </p>
            <a
              href={r.productionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full max-w-md overflow-hidden rounded-lg bg-[var(--bg-card)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/30"
            >
              <SiteOgThumb key={r.id} pageUrl={r.productionUrl} />
            </a>
            <a
              href={r.productionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block break-all text-sm font-medium text-[var(--terracotta)] underline-offset-4 hover:underline"
            >
              {r.productionUrl}
            </a>
            {(r.leadTimeDays != null ||
              r.leadTimeNote ||
              r.communicationReview ||
              r.exceededExpectations ||
              r.recommendTo) && (
              <dl className="mt-6 space-y-4 border-l-2 border-[var(--terracotta-soft)]/60 pl-4 text-sm leading-loose">
                {(r.leadTimeDays != null || r.leadTimeNote) && (
                  <div>
                    <dt className="font-medium text-[var(--text)]">完成までのスピード感</dt>
                    <dd className="mt-1 text-[var(--text-muted)]">
                      {r.leadTimeDays != null && (
                        <span className="tabular-nums">
                          依頼から公開まで <strong className="text-[var(--text)]">{r.leadTimeDays}</strong> 日
                        </span>
                      )}
                      {r.leadTimeDays != null && r.leadTimeNote ? '　' : null}
                      {r.leadTimeNote ? <span>{r.leadTimeNote}</span> : null}
                      {r.leadTimeDays == null && !r.leadTimeNote ? '—' : null}
                    </dd>
                  </div>
                )}
                {r.communicationReview && (
                  <div>
                    <dt className="font-medium text-[var(--text)]">コミュニケーションの満足度</dt>
                    <dd className="mt-1 text-[var(--text-muted)]">{r.communicationReview}</dd>
                  </div>
                )}
                {r.exceededExpectations && (
                  <div>
                    <dt className="font-medium text-[var(--text)]">
                      依頼して驚いたこと・期待を超えたポイント
                    </dt>
                    <dd className="mt-1 text-[var(--text-muted)]">{r.exceededExpectations}</dd>
                  </div>
                )}
                {r.recommendTo && (
                  <div>
                    <dt className="font-medium text-[var(--text)]">
                      このサービスをどんな人に薦めたいか
                    </dt>
                    <dd className="mt-1 text-[var(--text-muted)]">{r.recommendTo}</dd>
                  </div>
                )}
              </dl>
            )}
            {r.comment ? (
              <p className="mt-4 text-sm leading-loose text-[var(--text-muted)]">
                <span className="font-medium text-[var(--text)]">その他</span>
                <br />
                {r.comment}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-24">
        <h2 className="font-heading text-lg font-semibold text-[var(--text)] sm:text-xl">
          登録する
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
          URLと評価は必須です。下記の項目は任意ですが、ご記入いただけると他の方の参考になり、私たちの改善にもつながります。
        </p>
        {done && (
          <p className="mt-6 text-sm text-[var(--sage)]">ありがとうございます。反映しました。</p>
        )}
        <form className="mt-10 grid gap-10" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]" htmlFor="case-url">
              製作サイトのURL <span className="text-[var(--terracotta)]">必須</span>
            </label>
            <input
              id="case-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-3 w-full border-0 border-b border-[var(--text-muted)]/25 bg-transparent py-2 text-[var(--text)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--terracotta)] focus:outline-none"
            />
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              評価 <span className="text-[var(--terracotta)]">必須</span>
            </span>
            <div className="mt-3">
              <StarPicker value={rating} onChange={setRating} />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)]/80 bg-[var(--bg-card)]/40 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sage)]">
              レビューで聞かせてください
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              第三者の声として掲載できる内容です。URLを公開する以上、サイトから推測できる範囲では実質的に社名・個人名が分かる場合があります。そのうえで、
              <strong className="font-medium text-[var(--text)]">
                Web上や対外でまだ公開していない内容
              </strong>
              （未公開の事業・契約の内訳、具体的な金額、個人的な連絡先、他社との取引内容など）の記載はお控えください。
            </p>
            <div className="mt-8 grid gap-10">
              <div>
                <label
                  className="text-sm font-medium text-[var(--text)]"
                  htmlFor="case-lead-days"
                >
                  1. 完成までのスピード感
                </label>
                <p
                  id="case-lead-days-desc"
                  className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]"
                >
                  依頼から公開まで、実際にかかった日数を数字で（営業日でなく実日数でも構いません）。最短3日で形にしたケースなど、具体的な数字があると信頼の証明になります。
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-4">
                  <div className="flex items-baseline gap-2">
                    <input
                      id="case-lead-days"
                      type="number"
                      min={0}
                      max={999}
                      inputMode="numeric"
                      value={leadTimeDays}
                      onChange={(e) => setLeadTimeDays(e.target.value)}
                      placeholder="例: 5"
                      aria-describedby="case-lead-days-desc"
                      className="w-28 border-0 border-b border-[var(--text-muted)]/25 bg-transparent py-2 text-[var(--text)] tabular-nums placeholder:text-[var(--text-muted)]/50 focus:border-[var(--terracotta)] focus:outline-none"
                    />
                    <span className="text-sm text-[var(--text-muted)]">日</span>
                  </div>
                </div>
                <label
                  className="mt-4 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]"
                  htmlFor="case-lead-note"
                >
                  スピードについて補足（任意）
                </label>
                <textarea
                  id="case-lead-note"
                  rows={2}
                  value={leadTimeNote}
                  onChange={(e) => setLeadTimeNote(e.target.value)}
                  placeholder="例: 初稿〜公開までの流れ、急ぎの対応など"
                  className="mt-2 w-full resize-y border-0 border-b border-[var(--text-muted)]/25 bg-transparent py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--terracotta)] focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium text-[var(--text)]"
                  htmlFor="case-comm"
                >
                  2. コミュニケーションの満足度
                </label>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                  相談のしやすさ、ヒアリングでの提案力、やり取りのスムーズさ、押し売り感がなかったかなど、率直にどうぞ。
                </p>
                <textarea
                  id="case-comm"
                  rows={3}
                  value={communicationReview}
                  onChange={(e) => setCommunicationReview(e.target.value)}
                  placeholder="ご記入ください（任意）"
                  className="mt-3 w-full resize-y border-0 border-b border-[var(--text-muted)]/25 bg-transparent py-2 text-[var(--text)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--terracotta)] focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium text-[var(--text)]"
                  htmlFor="case-surprise"
                >
                  3. 依頼して一番驚いたこと・期待を超えたポイント
                </label>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                  単なるWeb制作以外で、温度感やこだわりがどう伝わったかも含めて教えてください。
                </p>
                <textarea
                  id="case-surprise"
                  rows={3}
                  value={exceededExpectations}
                  onChange={(e) => setExceededExpectations(e.target.value)}
                  placeholder="ご記入ください（任意）"
                  className="mt-3 w-full resize-y border-0 border-b border-[var(--text-muted)]/25 bg-transparent py-2 text-[var(--text)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--terracotta)] focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium text-[var(--text)]"
                  htmlFor="case-recommend"
                >
                  4. このサービスをどんな人に薦めたいか
                </label>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                  これから起業する学生、副業でサイトが欲しい方など、イメージする層を具体的に書いてもらえると助かります。
                </p>
                <textarea
                  id="case-recommend"
                  rows={3}
                  value={recommendTo}
                  onChange={(e) => setRecommendTo(e.target.value)}
                  placeholder="例: 初めてサイトを作る個人事業主の方、学割を検討している学生の方 など（任意）"
                  className="mt-3 w-full resize-y border-0 border-b border-[var(--text-muted)]/25 bg-transparent py-2 text-[var(--text)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--terracotta)] focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]" htmlFor="case-comment">
              その他・自由記入 <span className="text-[var(--text-muted)]/70">任意</span>
            </label>
            <textarea
              id="case-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="上記以外に伝えたいことがあれば"
              className="mt-3 w-full resize-y border-0 border-b border-[var(--text-muted)]/25 bg-transparent py-2 text-[var(--text)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--terracotta)] focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="text-sm font-semibold text-[var(--terracotta)] transition-colors hover:text-[var(--text)] disabled:opacity-40"
            >
              {submitting ? '送信中…' : '登録する →'}
            </button>
          </div>
        </form>
      </div>

      <p className="mt-20 text-sm text-[var(--text-muted)]">
        <Link href="/services" className="text-[var(--terracotta)] hover:text-[var(--text)]">
          ← Services に戻る
        </Link>
      </p>
    </div>
  );
}
