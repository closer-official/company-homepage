import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web制作ヒアリング',
  description:
    'Webページ作成の事前ヒアリング項目。目的、ターゲット、デザイン、参考URLなどを整理できます。',
};

export default function HearingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
