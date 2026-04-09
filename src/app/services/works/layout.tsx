import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '制作実績',
  description: 'Tadanosuke Closerの制作実績・お客様の声。URL・評価・口コミの一覧と登録。',
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
