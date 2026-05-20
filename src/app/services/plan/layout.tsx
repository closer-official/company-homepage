import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "料金へ",
    description: "divizeroの料金ページへ移動します。",
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
