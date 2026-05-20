import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserPartner from "@/components/closer/pages/CloserPartner";

export const metadata: Metadata = {
  title: "パートナー募集",
  description:
    "divizeroの営業オペレーションパートナー募集。DM運用・ターゲット管理・アポ獲得支援を一緒に担う方へ。",
};

export default function PartnersPage() {
  return (
    <CloserShell>
      <CloserPartner />
    </CloserShell>
  );
}
