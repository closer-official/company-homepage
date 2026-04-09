'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const defaultCompany = {
  name: 'Closer事務局',
  representative: '小林 薫之介',
  established: '2026年1月1日',
  address: '〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD.6F',
};

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="col-span-1 pt-12 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] first:pt-0 sm:pt-14 sm:first:pt-0">
        {label}
      </dt>
      <dd className="pt-2 font-heading text-lg leading-relaxed text-[var(--text)] sm:pt-3 sm:text-xl">
        {children}
      </dd>
    </>
  );
}

export default function CompanyPage() {
  const [company, setCompany] = useState(defaultCompany);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'site', 'main'));
        if (snap.exists() && snap.data()?.company) {
          setCompany({ ...defaultCompany, ...snap.data().company });
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-[72px]">
      <section className="relative py-16 sm:py-24">
        <div className="texture-noise absolute inset-0 z-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--terracotta)]">Company</p>
          <h1 className="font-heading mt-4 text-2xl font-semibold text-[var(--text)] sm:text-3xl md:text-4xl">
            会社概要
          </h1>
          <p className="mt-6 max-w-xl leading-loose text-[var(--text-muted)]">
            Tadanosuke Closer の法人情報です。ご契約・請求書などでご利用ください。
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-y-0 sm:grid-cols-[10rem_1fr] sm:gap-x-12">
            <InfoRow label="会社名">
              {company.name}
            </InfoRow>
            <InfoRow label="代表者">{company.representative}</InfoRow>
            <InfoRow label="設立">{company.established}</InfoRow>
            <InfoRow label="所在地">{company.address}</InfoRow>
          </dl>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-3">
            <Link
              href="/about"
              className="text-sm font-medium text-[var(--terracotta)] underline-offset-4 hover:underline"
            >
              想い（About）を見る
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-[var(--terracotta)] underline-offset-4 hover:underline"
            >
              お問い合わせ
            </Link>
            <span className="hidden text-[var(--text-muted)] sm:inline" aria-hidden>
              ·
            </span>
            <Link
              href="/tokusho"
              className="text-sm text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
            >
              特定商取引法に基づく表記
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
