import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Tadanosuke Closerの事業とプロダクト。Web制作から自社プロダクト（All-in English、Next-Gen Affiliate）まで。',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
