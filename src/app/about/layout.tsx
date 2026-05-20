import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "営業代行プラットフォーム divizero の考え方。クリエイターの営業をデータと仕組みで自動化します。",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
