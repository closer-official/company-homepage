import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '料金・プラン',
  description: 'Tadanosuke CloserのWeb制作料金・プラン。基本プランとオプションの一覧。',
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
