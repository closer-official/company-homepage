'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Project {
  title: string;
  subtitle: string;
  tagline: string;
  text: string;
  link: string;
  target: string;
}

const defaultProjects: Project[] = [
  {
    title: 'Brand OS',
    subtitle: '受注生産型アパレルOS',
    tagline: '',
    text: '',
    link: 'https://brandos.closer-official.com/',
    target: '',
  },
  {
    title: 'Idea Store',
    subtitle: '市場調査型アプリ開発支援',
    tagline: '',
    text: '',
    link: 'https://ideastore.closer-official.com/',
    target: '',
  },
];

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const docRef = doc(db, 'site', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().projects?.length) {
          setProjects(docSnap.data().projects as Project[]);
        }
      } catch (error) {
        console.error('Failed to load projects', error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-white">稼働中のプロジェクト / 実績</h1>
          <p className="text-sm text-zinc-300">
            各プロジェクトのサービスサイトへ遷移します。実績の追加・編集は下のリンクから。
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
            href="/admin/edit/tzusana5884"
          >
            実績を追加・編集
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
            href="/admin/reviews"
          >
            制作実績・口コミを管理
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 text-sm text-zinc-500">読み込み中...</div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30"
                href={project.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-300">
                    {project.subtitle}
                  </p>
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
                    稼働中
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-300">
                  詳細を見る →
                </p>
              </a>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-4">
          <a className="text-sm text-zinc-300 hover:text-white" href="/">
            ← トップへ戻る
          </a>
        </div>
      </main>
    </div>
  );
}
