import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '工場リサーチ管理 | Tadanosuke Closer',
  description: '工場リサーチ・問い合わせ結果報告の管理ツール（内部専用）',
};

export default function FactoryResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
