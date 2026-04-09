import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserWorks from "@/components/closer/pages/CloserWorks";

export const metadata: Metadata = {
  title: "Works / Voice",
  description:
    "ディビゼロ（divizero）の制作事例・お客様の声ページ。掲載は参考用デモとサンプル。実案件は随時更新します。",
};

export default function WorksPage() {
  return (
    <CloserShell>
      <CloserWorks />
    </CloserShell>
  );
}
