import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Tadanosuke Closer・ただのすけの想い。個人事業主だからこそのスピードと発想で、本当に価値のあるWebを提案します。',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
