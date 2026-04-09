'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read';
}

const PASSWORDS = ['tzusana5884', 'tadanosuke5884', '305mya-ko'];

export default function ContactsPage() {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = () => {
    if (
      password1 === PASSWORDS[0] &&
      password2 === PASSWORDS[1] &&
      password3 === PASSWORDS[2]
    ) {
      setIsAuthenticated(true);
      loadContacts();
    } else {
      setMessage('パスワードが間違っています');
    }
  };

  const loadContacts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const contactsData: Contact[] = [];
      
      querySnapshot.forEach((doc) => {
        contactsData.push({
          id: doc.id,
          ...doc.data(),
        } as Contact);
      });
      
      setContacts(contactsData);
    } catch (error) {
      console.error('Failed to load contacts:', error);
      setMessage('問い合わせの読み込みに失敗しました');
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), {
        status: 'read',
      });
      setContacts(contacts.map(c => c.id === id ? { ...c, status: 'read' as const } : c));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6 rounded-3xl bg-white/[0.02] p-8">
            <h1 className="text-2xl font-semibold">管理画面ログイン</h1>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-300">パスワード1</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">パスワード2</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">パスワード3</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={password3}
                  onChange={(e) => setPassword3(e.target.value)}
                />
              </div>
              <button
                onClick={handleAuth}
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                ログイン
              </button>
              {message && <p className="text-sm text-red-400">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">お問い合わせ一覧</h1>
            <p className="mt-2 text-sm text-zinc-400">
              全 {contacts.length} 件
              （未読: {contacts.filter(c => c.status === 'unread').length} 件）
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={loadContacts}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/40"
            >
              更新
            </button>
            <a
              href="/admin/edit/tzusana5884"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/40"
            >
              コンテンツ編集
            </a>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="rounded-3xl bg-white/[0.02] p-12 text-center">
            <p className="text-zinc-400">まだお問い合わせはありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="rounded-3xl bg-white/[0.02] p-6 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{contact.name}</h3>
                      {contact.status === 'unread' && (
                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
                          未読
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{contact.email}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Date(contact.timestamp).toLocaleString('ja-JP')}
                    </p>
                  </div>
                  {contact.status === 'unread' && (
                    <button
                      onClick={() => markAsRead(contact.id)}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      既読にする
                    </button>
                  )}
                </div>
                <div className="mt-4 rounded-2xl bg-black/20 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                    {contact.message}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={`mailto:${contact.email}?subject=Re: お問い合わせありがとうございます`}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    メールで返信する →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
