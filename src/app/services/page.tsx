import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserServices from "@/components/closer/pages/CloserServices";

export const metadata: Metadata = {
  title: "サービス",
  description:
    "divizeroの営業代行サービス。アカウント最適化、データハックDM運用、2段階ステルスアプローチでアポ獲得を支援します。",
};

export default function ServicesPage() {
  return (
    <CloserShell>
      <CloserServices />
    </CloserShell>
  );
}
