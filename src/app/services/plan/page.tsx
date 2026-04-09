'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

const BASE_PLANS = [
  { id: 'standard', name: '通常プラン', price: 39800, desc: '一般の個人店舗・事業者向け' },
  { id: 'student', name: '学割プラン', price: 19800, desc: '学生起業・フリーランス向け' },
  { id: 'student-ref', name: '学割＋紹介最強プラン', price: 14800, desc: '紹介経由の学生向け' },
] as const;

const DELETION_OPTIONS = [
  { id: 'no-inquiry', name: 'お問い合わせフォーム削除', discount: 3000 },
  { id: 'no-sns', name: 'SNSフィード連携削除', discount: 2000 },
  { id: 'no-map', name: '簡易地図表示削除', discount: 2000 },
] as const;

const ADDITIONAL_OPTIONS = [
  { id: 'no-branding', name: 'Presented by 削除', price: 5000 },
  { id: 'qr', name: 'カスタマイズQRコード作成', price: 2000 },
  { id: 'coupon', name: 'Webクーポン設置', price: 5000 },
] as const;

const OTHER_SERVICES = [
  { id: 'domain', name: 'ドメイン取得・設定代行', price: 15000, note: 'サーバー代永久無料設定込み' },
  { id: 'admin', name: '管理者画面（店専用CMS）追加', price: 20000, note: '契約後個別設定。閲覧数確認・文言・写真の差し替えが可能' },
  { id: 'payment', name: 'オンライン決済導入', price: 30000, note: 'Square / Stripe連携' },
  { id: 'custom', name: 'デザインフルカスタム', price: 50000, note: '50,000円～' },
  { id: 'seo', name: 'SEO・MEOセット', price: 20000, note: 'Google検索・マップ最適化' },
] as const;

const LANGUAGE_DISCOUNT_PER = 2000;
const CUSTOMER_INTAKE_URL = 'https://webpage.closer-official.com/api/customer-intake';

export default function PlanPage() {
  const [basePlanId, setBasePlanId] = useState<string>('standard');
  const [deletion, setDeletion] = useState<Record<string, boolean>>({});
  const [additional, setAdditional] = useState<Record<string, boolean>>({});
  const [other, setOther] = useState<Record<string, boolean>>({});
  const [langCount, setLangCount] = useState(0);

  const basePlan = BASE_PLANS.find((p) => p.id === basePlanId) ?? BASE_PLANS[0];
  const deletionTotal = DELETION_OPTIONS.reduce((s, o) => s + (deletion[o.id] ? o.discount : 0), 0)
    + langCount * LANGUAGE_DISCOUNT_PER;
  const additionalTotal = ADDITIONAL_OPTIONS.reduce((s, o) => s + (additional[o.id] ? o.price : 0), 0);
  const otherTotal = OTHER_SERVICES.reduce((s, o) => s + (other[o.id] ? o.price : 0), 0);
  const total = useMemo(
    () => Math.max(0, basePlan.price - deletionTotal + additionalTotal + otherTotal),
    [basePlan.price, deletionTotal, additionalTotal, otherTotal]
  );

  const selectedItems = useMemo(() => {
    const list: { label: string; value: number; sign: string }[] = [
      { label: basePlan.name, value: basePlan.price, sign: '' },
    ];
    DELETION_OPTIONS.forEach((o) => {
      if (deletion[o.id]) list.push({ label: `　${o.name}`, value: -o.discount, sign: '▲' });
    });
    if (langCount > 0)
      list.push({
        label: `　言語削除（${langCount}言語）`,
        value: -langCount * LANGUAGE_DISCOUNT_PER,
        sign: '▲',
      });
    ADDITIONAL_OPTIONS.forEach((o) => {
      if (additional[o.id]) list.push({ label: `　${o.name}`, value: o.price, sign: '+' });
    });
    OTHER_SERVICES.forEach((o) => {
      if (other[o.id]) list.push({ label: `　${o.name}`, value: o.price, sign: '+' });
    });
    return list;
  }, [basePlan.name, basePlan.price, deletion, additional, other, langCount]);

  const intakeHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set('source', 'plan-page');
    params.set('selectedPlanId', basePlan.id);
    params.set('selectedPlanName', basePlan.name);
    params.set('estimateTotal', String(total));
    params.set('estimateBreakdown', selectedItems.map((item) => `${item.sign}${item.label}:${item.value}`).join(' | '));
    return `${CUSTOMER_INTAKE_URL}?${params.toString()}`;
  }, [basePlan.id, basePlan.name, total, selectedItems]);

  const toggle = (set: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, id: string) => {
    set((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[72px] pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--terracotta)]">
          Creative Web Production
        </p>
        <h1 className="font-heading mt-4 text-2xl font-semibold text-[var(--text)] sm:text-3xl md:text-4xl">
          プラン
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
          基本プランとオプションをリストから選ぶと合計が自動で計算されます。
        </p>

        <section className="mt-12">
          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">基本プラン</h2>
          <ul className="mt-4 grid gap-3 lg:grid-cols-2">
            {BASE_PLANS.map((plan) => (
              <li key={plan.id}>
                <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg-card)]/50 px-4 py-4 transition hover:border-[var(--terracotta)]/40">
                  <input
                    type="radio"
                    name="base"
                    checked={basePlanId === plan.id}
                    onChange={() => setBasePlanId(plan.id)}
                    className="mt-1.5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-[var(--text)]">{plan.name}</span>
                    <span className="ml-2 tabular-nums text-[var(--terracotta)]">
                      {plan.price.toLocaleString()}円
                    </span>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{plan.desc}</p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">
            削除オプション（値引き）
          </h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">含めない場合、料金から差し引きます。</p>
          <ul className="mt-4 grid gap-3 lg:grid-cols-2">
            {DELETION_OPTIONS.map((o) => (
              <li key={o.id}>
                <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-[var(--border)] px-4 py-3 transition hover:border-[var(--terracotta)]/40">
                  <input
                    type="checkbox"
                    checked={!!deletion[o.id]}
                    onChange={() => toggle(setDeletion, o.id)}
                    className="shrink-0"
                  />
                  <span className="flex-1 text-[var(--text)]">{o.name}</span>
                  <span className="tabular-nums text-[var(--sage)]">▲{o.discount.toLocaleString()}円</span>
                </label>
              </li>
            ))}
            <li>
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-[var(--border)] px-4 py-3">
                <span className="text-[var(--text)]">言語（1言語あたり）</span>
                <span className="tabular-nums text-[var(--sage)]">▲{LANGUAGE_DISCOUNT_PER.toLocaleString()}円</span>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={langCount}
                  onChange={(e) => setLangCount(Math.max(0, Math.min(10, parseInt(e.target.value, 10) || 0)))}
                  className="w-16 rounded border border-[var(--border)] bg-[var(--bg-base)] px-2 py-1.5 text-center text-sm tabular-nums"
                />
                <span className="text-sm text-[var(--text-muted)]">言語分値引き</span>
              </div>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">追加オプション</h2>
          <ul className="mt-4 grid gap-3 lg:grid-cols-2">
            {ADDITIONAL_OPTIONS.map((o) => (
              <li key={o.id}>
                <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-[var(--border)] px-4 py-3 transition hover:border-[var(--terracotta)]/40">
                  <input
                    type="checkbox"
                    checked={!!additional[o.id]}
                    onChange={() => toggle(setAdditional, o.id)}
                    className="shrink-0"
                  />
                  <span className="flex-1 text-[var(--text)]">{o.name}</span>
                  <span className="tabular-nums text-[var(--terracotta)]">+{o.price.toLocaleString()}円</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-lg font-semibold text-[var(--text)]">その他サービス</h2>
          <ul className="mt-4 grid gap-3 lg:grid-cols-2">
            {OTHER_SERVICES.map((o) => (
              <li key={o.id}>
                <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-[var(--border)] px-4 py-3 transition hover:border-[var(--terracotta)]/40">
                  <input
                    type="checkbox"
                    checked={!!other[o.id]}
                    onChange={() => toggle(setOther, o.id)}
                    className="mt-1.5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[var(--text)]">{o.name}</span>
                    <span className="ml-2 tabular-nums text-[var(--terracotta)]">
                      +{o.price.toLocaleString()}円
                    </span>
                    {o.note && <p className="mt-1 text-xs text-[var(--text-muted)]">{o.note}</p>}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/60 p-6 lg:max-w-3xl">
          <h2 className="font-heading text-base font-semibold text-[var(--text)]">選択内容と合計</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {selectedItems.map((item, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="text-[var(--text-muted)]">{item.label}</span>
                <span className="shrink-0 tabular-nums text-[var(--text)]">
                  {item.sign}
                  {item.value >= 0 ? item.value.toLocaleString() : (-item.value).toLocaleString()}円
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-[var(--border)] pt-4 text-right">
            <span className="text-[var(--text-muted)]">合計 </span>
            <span className="font-heading text-2xl font-semibold tabular-nums text-[var(--terracotta)]">
              {total.toLocaleString()}円
            </span>
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={intakeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[#f5f4f1] hover:bg-[var(--terracotta-soft)]"
          >
            この内容でお問い合わせ
          </a>
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
