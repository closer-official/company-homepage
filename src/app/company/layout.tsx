import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company',
  description: 'Tadanosuke Closer・会社概要。Closer事務局の情報です。',
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
