import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "divizeroの営業代行サービス一覧。アカウント最適化、データハックDM運用、2段階ステルスアプローチ。",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
