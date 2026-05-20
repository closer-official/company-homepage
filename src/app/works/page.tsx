import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserWorks from "@/components/closer/pages/CloserWorks";

export const metadata: Metadata = {
  title: "実績",
  description:
    "divizeroの営業代行実績・成果イメージ。返信率・アポ獲得数・コスト効率を重視した運用事例。",
};

export default function WorksPage() {
  return (
    <CloserShell>
      <CloserWorks />
    </CloserShell>
  );
}
