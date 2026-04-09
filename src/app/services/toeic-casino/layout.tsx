import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TOEIC×カジノ',
  description: 'Tadanosuke Closerの自社プロダクト。TOEIC学習×カジノゲームの融合で、楽しく続く英語学習。',
};

export default function ToeicCasinoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
