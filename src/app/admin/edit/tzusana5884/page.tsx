'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface Project {
  title: string;
  subtitle: string;
  tagline: string;
  text: string;
  link: string;
  target: string;
}

interface CompanyData {
  name: string;
  representative: string;
  established: string;
  address: string;
  business: string;
}

interface VisionData {
  title: string;
  despair: string;
  anger: string;
  solution: string;
}

interface AboutData {
  title: string;
  description: string;
}

interface SiteData {
  projects: Project[];
  company: CompanyData;
  vision: VisionData;
  about: AboutData;
}

const initialData: SiteData = {
  projects: [
    {
      title: 'Brand OS',
      subtitle: '受注生産型アパレルOS',
      tagline: '1枚から発注可能。在庫リスクなく何度でも挑戦できる。',
      text: '従来40万円以上必要だったアパレルビジネスを、初期費用ゼロで。売れた金額の10〜15%だけをプラットフォーム料としていただきます。あなたの成功 = 運営の成功。',
      link: 'https://brandos.closer-official.com/',
      target: '学生 / インフルエンサー / アーティスト',
    },
    {
      title: 'Idea Store',
      subtitle: '市場調査型アプリ開発支援',
      tagline: 'アイデアと開発者をつなぐ、完全成功報酬型マーケット。',
      text: '「こんなアプリあったら使う？」視聴者の声を集めて、市場調査しながら開発。利益が出た場合のみ、収益の5〜10%を運営が手に入れる。それまで一切費用はかかりません。',
      link: 'https://ideastore.closer-official.com/',
      target: 'アプリ開発者 / アイデアを持つ学生',
    },
  ],
  company: {
    name: 'Closer事務局',
    representative: '小林 薫之介',
    established: '2026年1月1日',
    address: '〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD.6F',
    business: '成功報酬型プラットフォームの企画・開発・運営 / 受注生産型アパレル事業 / アプリ開発支援事業',
  },
  vision: {
    title: '同じ悔しさを、二度と味わってほしくない。',
    despair: 'アイデアはあった。でも金も人脈も技術もなかった。5社に見積もりを取ったら、最低でも600万円と言われた。大学生が諦めるのには十分すぎる金額だった。「金がないと何も叶えられない」——その絶望が、すべての始まりでした。',
    anger: '誇大広告。サブスク解約妨害。中抜き。情弱ビジネス。いいものを作った人が報われるんじゃない。「ズルく見せるのがうまい人」が勝つ構造。この仕組みを、変えたい。',
    solution: 'あなたが成功したら、その収益の一部だけをいただく。失敗しても、あなたは何も失わない。スマホ一つあれば、何度でも挑戦できる。才能ある若者が、お金の問題で諦めない世界を作ります。',
  },
  about: {
    title: '同じ悔しさを味わった、当事者として。',
    description: '大学1年の時、600万円と言われてアプリ開発を諦めた。その悔しさが、すべての原点です。才能はあるのに、お金の問題で諦めそうになっている人を1人でも減らしたい。同じ絶望を味わった当事者として、才能ある若者を支援する伴走者になりたい。',
  },
};

export default function EditPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'site', 'main');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data() as SiteData);
      } else {
        setData(initialData);
      }
    } catch (error) {
      setMessage('データの読み込みに失敗しました');
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (!data) return;

    setLoading(true);
    try {
      await setDoc(doc(db, 'site', 'main'), data);
      setMessage('保存しました');
    } catch (error) {
      setMessage('保存に失敗しました');
      console.error(error);
    }
    setLoading(false);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    if (!data) return;
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setData({ ...data, projects: newProjects });
  };

  const addProject = () => {
    if (!data) return;
    const newProject: Project = {
      title: '',
      subtitle: '',
      tagline: '',
      text: '',
      link: '',
      target: '',
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  };

  const removeProject = (index: number) => {
    if (!data) return;
    const newProjects = data.projects.filter((_, i) => i !== index);
    setData({ ...data, projects: newProjects });
  };

  const updateCompany = (field: keyof CompanyData, value: string) => {
    if (!data) return;
    setData({ ...data, company: { ...data.company, [field]: value } });
  };

  const updateVision = (field: keyof VisionData, value: string) => {
    if (!data) return;
    setData({ ...data, vision: { ...data.vision, [field]: value } });
  };

  const updateAbout = (field: keyof AboutData, value: string) => {
    if (!data) return;
    setData({ ...data, about: { ...data.about, [field]: value } });
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-red-400">{message || 'データがありません'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">コンテンツ編集</h1>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >
              保存
            </button>
            <a
              href="/admin/contacts"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/40"
            >
              問い合わせ一覧
            </a>
            <a
              href="/admin"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/40"
            >
              実績一覧
            </a>
            <a
              href="/"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/40"
            >
              プレビュー
            </a>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-xl bg-blue-500/20 p-4 text-sm text-blue-200">
            {message}
          </div>
        )}

        <div className="space-y-8">
          <section className="rounded-3xl bg-white/[0.02] p-8">
            <h2 className="mb-4 text-xl font-semibold">Vision（理念）</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-zinc-400">セクションタイトル</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={data.vision.title}
                  onChange={(e) => updateVision('title', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">大学1年の絶望（本文）</label>
                <textarea
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  rows={4}
                  value={data.vision.despair}
                  onChange={(e) => updateVision('despair', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">構造への怒り（本文）</label>
                <textarea
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  rows={4}
                  value={data.vision.anger}
                  onChange={(e) => updateVision('anger', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">解決策（本文）</label>
                <textarea
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  rows={4}
                  value={data.vision.solution}
                  onChange={(e) => updateVision('solution', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white/[0.02] p-8">
            <h2 className="mb-4 text-xl font-semibold">About（代表について）</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-zinc-400">セクションタイトル</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={data.about.title}
                  onChange={(e) => updateAbout('title', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">説明文</label>
                <textarea
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  rows={4}
                  value={data.about.description}
                  onChange={(e) => updateAbout('description', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white/[0.02] p-8">
            <h2 className="mb-4 text-xl font-semibold">プロジェクト</h2>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index} className="rounded-2xl border border-white/10 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold">プロジェクト {index + 1}</p>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      削除
                    </button>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm text-zinc-400">タイトル</label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">サブタイトル</label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                        value={project.subtitle}
                        onChange={(e) => updateProject(index, 'subtitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">キャッチコピー</label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                        value={project.tagline}
                        onChange={(e) => updateProject(index, 'tagline', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">説明文</label>
                      <textarea
                        className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                        rows={3}
                        value={project.text}
                        onChange={(e) => updateProject(index, 'text', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">リンクURL</label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                        value={project.link}
                        onChange={(e) => updateProject(index, 'link', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400">対象ユーザー</label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                        value={project.target}
                        onChange={(e) => updateProject(index, 'target', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addProject}
                className="w-full rounded-xl border border-dashed border-white/20 py-4 text-sm text-zinc-400 transition hover:border-white/40 hover:text-white"
              >
                + プロジェクトを追加
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-white/[0.02] p-8">
            <h2 className="mb-4 text-xl font-semibold">会社情報</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-zinc-400">会社名</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={data.company.name}
                  onChange={(e) => updateCompany('name', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">代表者</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={data.company.representative}
                  onChange={(e) => updateCompany('representative', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">設立日</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={data.company.established}
                  onChange={(e) => updateCompany('established', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">所在地</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  value={data.company.address}
                  onChange={(e) => updateCompany('address', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">事業内容</label>
                <textarea
                  className="mt-1 w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white"
                  rows={3}
                  value={data.company.business}
                  onChange={(e) => updateCompany('business', e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
