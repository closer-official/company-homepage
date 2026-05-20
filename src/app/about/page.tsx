import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserAbout from "@/components/closer/pages/CloserAbout";

export const metadata: Metadata = {
  title: "概要",
  description:
    "営業代行プラットフォーム divizero の考え方。クリエイターの営業をデータと仕組みで自動化し、制作に集中できる環境をつくります。",
};

export default function AboutPage() {
  return (
    <CloserShell>
      <CloserAbout />
    </CloserShell>
  );
}
