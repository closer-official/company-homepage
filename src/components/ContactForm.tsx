'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { CONTACT_EMAIL_FORM_NOTIFY, CONTACT_EMAIL_OFFICIAL } from '@/lib/contactEmails';
import { collection, addDoc } from 'firebase/firestore';

const INQUIRY_TYPES = [
  { value: 'web', label: 'Web制作の依頼' },
  { value: 'product', label: 'プロダクトについて' },
  { value: 'partner', label: 'パートナーシップへの応募' },
  { value: 'other', label: 'その他' },
] as const;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    inquiryType: 'web' as string,
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const typeLabel = INQUIRY_TYPES.find((t) => t.value === formData.inquiryType)?.label ?? formData.inquiryType;
      await addDoc(collection(db, 'contacts'), {
        inquiryType: formData.inquiryType,
        inquiryTypeLabel: typeLabel,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: 'unread',
      });

      const form = e.target as HTMLFormElement;
      const formSubmitData = new FormData(form);
      await fetch(`https://formsubmit.co/${CONTACT_EMAIL_FORM_NOTIFY}`, {
        method: 'POST',
        body: formSubmitData,
      });

      setSubmitted(true);
      setFormData({ inquiryType: 'web', name: '', email: '', message: '' });
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-base)] p-8 text-center">
        <p className="text-lg font-semibold text-[var(--text)]">送信完了</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          お問い合わせありがとうございます。原則2～3日以内に返信いたします。
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-[var(--terracotta)] hover:text-[var(--terracotta-soft)]"
        >
          もう一度送信する
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-lg border border-[var(--border)] bg-[var(--bg-base)] p-6 sm:p-8"
      onSubmit={handleSubmit}
    >
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
        フォームからの送信は、運営が随時確認している受付用メール{' '}
        <span className="break-all font-medium text-[var(--text)]">{CONTACT_EMAIL_FORM_NOTIFY}</span>{' '}
        に届きます（見落とし防止のため）。直接メールでのお問い合わせやご返信のやり取りは{' '}
        <span className="font-medium text-[var(--text)]">{CONTACT_EMAIL_OFFICIAL}</span>{' '}
        をご利用ください。
      </p>
      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-[var(--text)]" htmlFor="inquiryType">
            お問い合わせ種別
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text)] transition focus:border-[var(--terracotta)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/20"
            required
          >
            {INQUIRY_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-[var(--text)]" htmlFor="name">
            お名前
          </label>
          <input
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition focus:border-[var(--terracotta)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/20"
            id="name"
            name="name"
            placeholder="山田 太郎"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-[var(--text)]" htmlFor="email">
            メールアドレス
          </label>
          <input
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition focus:border-[var(--terracotta)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/20"
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-[var(--text)]" htmlFor="message">
            お問い合わせ内容
          </label>
          <textarea
            className="min-h-[140px] rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition focus:border-[var(--terracotta)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/20"
            id="message"
            name="message"
            placeholder="ご相談内容を記入してください。"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
      </div>
      <button
        className="mt-6 w-full rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[#f5f4f1] transition hover:bg-[var(--terracotta-soft)] disabled:opacity-50 sm:w-auto"
        type="submit"
        disabled={submitting}
      >
        {submitting ? '送信中...' : '送信する'}
      </button>
      <p className="mt-4 text-xs text-[var(--text-muted)]">
        送信ボタンを押すと、内容がデータベースに保存されるほか、通知が {CONTACT_EMAIL_FORM_NOTIFY} 宛に届きます。
      </p>
    </form>
  );
}
