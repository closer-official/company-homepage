'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const ADMIN_NAME = '薫之介';
const ADMIN_PASS = 'factory-admin-kaoru';

interface FactoryRecord {
  id: string;
  researcherName: string;
  factoryName: string;
  url: string;
  domain: string;
  contactPerson: string;
  contact: string;
  inquiryDate: string;
  inquiryResult: string;
  estimateSummary: string;
  notes: string;
  status: string;
  createdAt: { seconds: number } | null;
  duplicateCheckPassedAt: { seconds: number } | null;
}

function formatTs(ts: { seconds: number } | null | undefined): string {
  if (!ts?.seconds) return '-';
  return new Date(ts.seconds * 1000).toLocaleString('ja-JP');
}

function escapeCsv(s: string): string {
  if (s.includes('"') || s.includes(',') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export default function FactoryResearchAdminPage() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [list, setList] = useState<FactoryRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    const load = async () => {
      setLoading(true);
      const snap = await getDocs(collection(db, 'factoryResearch'));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FactoryRecord[];
      data.sort((a, b) => {
        const ta = a.createdAt?.seconds ?? 0;
        const tb = b.createdAt?.seconds ?? 0;
        return tb - ta;
      });
      setList(data);
      setLoading(false);
    };
    load();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === ADMIN_NAME && pass === ADMIN_PASS) {
      setAuthenticated(true);
    }
  };

  const exportCsv = () => {
    const header = [
      'リサーチャー名',
      '工場名',
      'URL',
      'ドメイン',
      '担当者名',
      '連絡先',
      '問い合わせ日時',
      '問い合わせ結果',
      '見積もり概算',
      '備考',
      'ステータス',
      '重複チェック通過日時',
      '登録日時',
    ];
    const rows = list.map((r) => [
      escapeCsv(r.researcherName ?? ''),
      escapeCsv(r.factoryName ?? ''),
      escapeCsv(r.url ?? ''),
      escapeCsv(r.domain ?? ''),
      escapeCsv(r.contactPerson ?? ''),
      escapeCsv(r.contact ?? ''),
      escapeCsv(r.inquiryDate ?? ''),
      escapeCsv(r.inquiryResult ?? ''),
      escapeCsv(r.estimateSummary ?? ''),
      escapeCsv(r.notes ?? ''),
      escapeCsv(r.status ?? ''),
      formatTs(r.duplicateCheckPassedAt ?? null),
      formatTs(r.createdAt ?? null),
    ]);
    const csvContent =
      '\uFEFF' +
      [header.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `工場リサーチ_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <main className="mx-auto max-w-md px-6 py-16">
          <h1 className="text-xl font-semibold">工場リサーチ 管理者</h1>
          <p className="mt-2 text-sm text-zinc-400">
            管理者（{ADMIN_NAME}）のみアクセスできます。
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-zinc-400">名前</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400">パスワード</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black"
            >
              ログイン
            </button>
          </form>
        </main>
      </div>
    );
  }

  const byResearcher = list.reduce<Record<string, FactoryRecord[]>>((acc, r) => {
    const n = r.researcherName ?? '（未設定）';
    if (!acc[n]) acc[n] = [];
    acc[n].push(r);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">工場リサーチ 管理者一覧</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              CSV出力
            </button>
            <a
              href="/factory-research"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
            >
              リサーチ画面へ
            </a>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-sm font-semibold text-zinc-400">
            リサーチャーごとの集計
          </h2>
          <ul className="mt-2 space-y-2 text-sm">
            {Object.entries(byResearcher).map(([researcher, records]) => (
              <li key={researcher} className="text-zinc-300">
                {researcher}：{records.length}件
              </li>
            ))}
          </ul>
        </section>

        {loading ? (
          <p className="mt-8 text-sm text-zinc-500">読み込み中...</p>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  <th className="py-3 pr-4">リサーチャー名</th>
                  <th className="py-3 pr-4">工場名</th>
                  <th className="py-3 pr-4">URL</th>
                  <th className="py-3 pr-4">担当者</th>
                  <th className="py-3 pr-4">問い合わせ日時</th>
                  <th className="py-3 pr-4">ステータス</th>
                  <th className="py-3 pr-4">重複チェック通過日</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-zinc-200">
                      {r.researcherName}
                    </td>
                    <td className="py-3 pr-4 text-zinc-200">
                      {r.factoryName}
                    </td>
                    <td className="max-w-[200px] truncate py-3 pr-4 text-zinc-400">
                      {r.url}
                    </td>
                    <td className="py-3 pr-4 text-zinc-400">
                      {r.contactPerson}
                    </td>
                    <td className="py-3 pr-4 text-zinc-400">
                      {r.inquiryDate}
                    </td>
                    <td className="py-3 pr-4 text-zinc-400">{r.status}</td>
                    <td className="py-3 pr-4 text-zinc-500">
                      {formatTs(r.duplicateCheckPassedAt ?? null)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && list.length === 0 && (
          <p className="mt-8 text-sm text-zinc-500">データがありません。</p>
        )}
      </main>
    </div>
  );
}
