import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description: "divizero・Closer事務局の会社概要。",
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
