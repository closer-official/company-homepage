import Link from 'next/link';
import ProductPreviewLink from '@/components/ProductPreviewLink';

const TOEIC_CASINO_URL = 'https://shun.closer-official.com';

export default function ToeicCasinoPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[72px] pb-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--terracotta)]">
          Innovation Products
        </p>
        <h1 className="font-heading mt-4 text-2xl font-semibold text-[var(--text)] sm:text-3xl md:text-4xl">
          TOEIC × カジノ
        </h1>
        <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">
          All-in English
        </p>
        <div className="mt-10 max-w-3xl space-y-8 leading-relaxed text-[var(--text-muted)]">
          <p>
            TOEIC学習とカジノゲームを融合した、まったく新しい学習体験です。娯楽の興奮をそのまま学習のモチベーションに変え、英語に触れるハードルを下げます。
          </p>
          <p>
            ゲーム性を持たせた問題形式や、達成感のある進行設計で、続けやすい仕組みを実装。個人の学習ツールとしても、法人向けの研修コンテンツとしてもご利用いただけます。
          </p>
          <p>
            詳細・導入のご相談はお問い合わせまたは公式LINEからどうぞ。
          </p>
        </div>
        <ProductPreviewLink url={TOEIC_CASINO_URL} title="TOEIC×カジノ" />
        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[#f5f4f1] hover:bg-[var(--terracotta-soft)]"
          >
            お問い合わせ
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-[var(--terracotta)] underline-offset-4 hover:underline"
          >
            ← サービス一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
