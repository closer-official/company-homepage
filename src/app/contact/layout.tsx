import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tadanosuke Closerへのお問い合わせ。Web制作・プロダクト・パートナーシップはこちらから。',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
