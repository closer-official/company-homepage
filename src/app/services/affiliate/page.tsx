import Link from 'next/link';
import ProductPreviewLink from '@/components/ProductPreviewLink';

const AFFILIATE_URL = 'https://sell.closer-official.com';

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[72px] pb-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--sage)]">
          Innovation Products
        </p>
        <h1 className="font-heading mt-4 text-2xl font-semibold text-[var(--text)] sm:text-3xl md:text-4xl">
          次世代型アフィリエイト
        </h1>
        <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">
          Next-Gen Affiliate
        </p>
        <div className="mt-10 max-w-3xl space-y-8 leading-relaxed text-[var(--text-muted)]">
          <p>
            掲載無料・審査なし・最大70%還元を実現した、新しいアフィリエイトプラットフォームです。紹介制度による親子還元モデルを搭載し、誰もが主役になれる収益の仕組みを提供しています。
          </p>
          <p>
            従来の審査や手続きの負担を減らし、コンテンツを持っている方・集客力がある方が、すぐに参加して報酬を得られる設計です。パートナー様との連携も歓迎しています。
          </p>
          <p>
            詳細・提携のご相談はお問い合わせまたは公式LINEからどうぞ。
          </p>
        </div>
        <ProductPreviewLink url={AFFILIATE_URL} title="次世代型アフィリエイト" />
        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--sage)] px-6 py-3 text-sm font-medium text-[#f5f4f1] hover:bg-[var(--sage-soft)]"
          >
            お問い合わせ
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-[var(--sage)] underline-offset-4 hover:underline"
          >
            ← サービス一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
