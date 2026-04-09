import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '次世代型アフィリエイト',
  description: 'Tadanosuke Closerの自社プロダクト。掲載無料・審査なし・最大70%還元、親子還元モデルのアフィリエイト。',
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
