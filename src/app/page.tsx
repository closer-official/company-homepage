import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserHome from "@/components/closer/pages/CloserHome";

export const metadata: Metadata = {
  title: "営業代行プラットフォーム divizero",
  description:
    "返信率40%の営業代行。ターゲット選定とデータドリブンなDM運用で、クリエイターの営業を完全自動化。1アポ5,000円〜の成果報酬型。",
  openGraph: {
    title: "divizero | 営業代行プラットフォーム",
    description:
      "返信率40%の衝撃。あなたの営業を、データと仕組みで完全自動化する。クリエイターは制作だけに集中。",
  },
};

export default function Home() {
  return (
    <CloserShell variant="divizero">
      <CloserHome />
    </CloserShell>
  );
}
