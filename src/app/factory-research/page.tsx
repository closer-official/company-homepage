'use client';

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

const RESEARCHER_STORAGE_KEY = 'factory-research-researcher-name';
const STATUS_OPTIONS = [
  { value: '', label: '選択してください' },
  { value: '未完了', label: '未完了' },
  { value: '問い合わせ完了', label: '問い合わせ完了' },
];

function extractDomain(urlString: string): string | null {
  try {
    const trimmed = urlString.trim();
    if (!trimmed) return null;
    const u = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    return u.hostname;
  } catch {
    return null;
  }
}

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
  createdAt: unknown;
  duplicateCheckPassedAt: unknown;
}

const initialForm = {
  factoryName: '',
  url: '',
  contactPerson: '',
  contact: '',
  inquiryDate: '',
  inquiryResult: '',
  estimateSummary: '',
  notes: '',
  status: '',
};

export default function FactoryResearchPage() {
  const [researcherName, setResearcherName] = useState('');
  const [researcherInput, setResearcherInput] = useState('');
  const [form, setForm] = useState(initialForm);
  const [domainError, setDomainError] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [myList, setMyList] = useState<FactoryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const loadResearcher = () => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(RESEARCHER_STORAGE_KEY);
    if (saved) setResearcherName(saved);
  };

  useEffect(() => {
    loadResearcher();
  }, []);

  const setResearcher = (name: string) => {
    const trimmed = name.trim();
    setResearcherName(trimmed);
    if (typeof window !== 'undefined') {
      if (trimmed) localStorage.setItem(RESEARCHER_STORAGE_KEY, trimmed);
      else localStorage.removeItem(RESEARCHER_STORAGE_KEY);
    }
    setMyList([]);
    setSubmitMessage('');
  };

  const checkDomainDuplicate = useCallback(
    async (domain: string): Promise<boolean> => {
      if (!domain) return false;
      const q = query(
        collection(db, 'factoryResearch'),
        where('domain', '==', domain)
      );
      const snap = await getDocs(q);
      return !snap.empty;
    },
    []
  );

  useEffect(() => {
    const domain = extractDomain(form.url);
    if (!domain) {
      setDomainError(false);
      return;
    }
    let cancelled = false;
    checkDomainDuplicate(domain).then((isDup) => {
      if (!cancelled) setDomainError(isDup);
    });
    return () => {
      cancelled = true;
    };
  }, [form.url, checkDomainDuplicate]);

  const loadMyList = useCallback(async () => {
    if (!researcherName) {
      setMyList([]);
      return;
    }
    const q = query(
      collection(db, 'factoryResearch'),
      where('researcherName', '==', researcherName)
    );
    const snap = await getDocs(q);
    const list = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FactoryRecord[];
    list.sort((a, b) => {
      const ta = (a.createdAt as { seconds?: number })?.seconds ?? 0;
      const tb = (b.createdAt as { seconds?: number })?.seconds ?? 0;
      return tb - ta;
    });
    setMyList(list);
  }, [researcherName]);

  useEffect(() => {
    loadMyList();
  }, [loadMyList]);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const allFieldsFilled =
    form.factoryName.trim() !== '' &&
    form.url.trim() !== '' &&
    form.contactPerson.trim() !== '' &&
    form.contact.trim() !== '' &&
    form.inquiryDate.trim() !== '' &&
    form.inquiryResult.trim() !== '' &&
    form.estimateSummary.trim() !== '' &&
    form.notes.trim() !== '' &&
    form.status === '問い合わせ完了';

  const canSubmit =
    researcherName &&
    allFieldsFilled &&
    !domainError &&
    extractDomain(form.url) !== null;

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!researcherName) {
      setSubmitMessage('リサーチャー名を設定してください。');
      return;
    }
    Object.keys(form).forEach((k) => markTouched(k));
    if (!canSubmit) {
      setSubmitMessage('すべての項目を入力し、問い合わせ完了を選択してください。重複URLの場合は登録できません。');
      return;
    }
    const domain = extractDomain(form.url);
    if (!domain) {
      setSubmitMessage('有効なURLを入力してください。');
      return;
    }
    setLoading(true);
    setSubmitMessage('');
    try {
      await addDoc(collection(db, 'factoryResearch'), {
        researcherName,
        factoryName: form.factoryName.trim(),
        url: form.url.trim(),
        domain,
        contactPerson: form.contactPerson.trim(),
        contact: form.contact.trim(),
        inquiryDate: form.inquiryDate.trim(),
        inquiryResult: form.inquiryResult.trim(),
        estimateSummary: form.estimateSummary.trim(),
        notes: form.notes.trim(),
        status: form.status,
        createdAt: Timestamp.now(),
        duplicateCheckPassedAt: Timestamp.now(),
      });
      setForm(initialForm);
      setTouched({});
      setSubmitMessage('登録しました。');
      loadMyList();
    } catch (err) {
      console.error(err);
      setSubmitMessage('登録に失敗しました。');
    }
    setLoading(false);
  };

  const showError = (field: string) => {
    const value = form[field as keyof typeof form];
    const empty = typeof value === 'string' && value.trim() === '';
    return touched[field] && empty;
  };

  if (!researcherName) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <main className="mx-auto max-w-md px-6 py-16">
          <h1 className="text-xl font-semibold">工場リサーチ管理</h1>
          <p className="mt-2 text-sm text-zinc-400">
            リサーチャー名を入力して利用を開始してください。
          </p>
          <div className="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="リサーチャー名"
              value={researcherInput}
              onChange={(e) => setResearcherInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setResearcher(researcherInput)}
              className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500"
            />
            <button
              type="button"
              onClick={() => setResearcher(researcherInput)}
              className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black"
            >
              開始
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">工場リサーチ管理</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>{researcherName}</span>
            <button
              type="button"
              onClick={() => setResearcher('')}
              className="text-zinc-500 underline hover:text-white"
            >
              切り替え
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400">
              工場名 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.factoryName}
              onChange={(e) => updateForm('factoryName', e.target.value)}
              onBlur={() => markTouched('factoryName')}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('factoryName')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => updateForm('url', e.target.value)}
              onBlur={() => markTouched('url')}
              placeholder="https://..."
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-zinc-500 ${
                showError('url')
                  ? 'border-red-500 bg-red-500/10'
                  : domainError
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-white/20 bg-white/5'
              }`}
            />
            {domainError && (
              <p className="mt-2 text-sm font-medium text-red-400">
                登録済みのため報酬は発生しません
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              担当者名 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.contactPerson}
              onChange={(e) => updateForm('contactPerson', e.target.value)}
              onBlur={() => markTouched('contactPerson')}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('contactPerson')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              連絡先 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => updateForm('contact', e.target.value)}
              onBlur={() => markTouched('contact')}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('contact')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              問い合わせ日時 <span className="text-red-400">*</span>
            </label>
            <input
              type="datetime-local"
              value={form.inquiryDate}
              onChange={(e) => updateForm('inquiryDate', e.target.value)}
              onBlur={() => markTouched('inquiryDate')}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('inquiryDate')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              問い合わせ結果 <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.inquiryResult}
              onChange={(e) => updateForm('inquiryResult', e.target.value)}
              onBlur={() => markTouched('inquiryResult')}
              rows={3}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('inquiryResult')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              見積もり概算 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.estimateSummary}
              onChange={(e) => updateForm('estimateSummary', e.target.value)}
              onBlur={() => markTouched('estimateSummary')}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('estimateSummary')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              備考 <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => updateForm('notes', e.target.value)}
              onBlur={() => markTouched('notes')}
              rows={2}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('notes')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400">
              ステータス <span className="text-red-400">*</span>
            </label>
            <select
              value={form.status}
              onChange={(e) => updateForm('status', e.target.value)}
              onBlur={() => markTouched('status')}
              className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm text-white ${
                showError('status')
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/20 bg-white/5'
              }`}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value || 'empty'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {submitMessage && (
            <p
              className={
                submitMessage === '登録しました。'
                  ? 'text-sm text-green-400'
                  : 'text-sm text-amber-400'
              }
            >
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? '送信中...' : '報酬申請（Submit）'}
          </button>
        </form>

        <section className="mt-12">
          <h2 className="text-lg font-semibold">自分の登録一覧</h2>
          {myList.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">まだ登録がありません。</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {myList.map((r) => (
                <li
                  key={r.id}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm"
                >
                  <p className="font-medium text-white">{r.factoryName}</p>
                  <p className="mt-1 text-zinc-400">{r.url}</p>
                  <p className="mt-1 text-zinc-500">{r.status} · {String(r.duplicateCheckPassedAt ? new Date((r.duplicateCheckPassedAt as { seconds: number }).seconds * 1000).toLocaleString('ja-JP') : '-')}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
