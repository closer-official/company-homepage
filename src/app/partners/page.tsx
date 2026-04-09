import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserPartner from "@/components/closer/pages/CloserPartner";

export const metadata: Metadata = {
  title: "パートナー募集",
  description:
    "ディビゼロ（divizero）の認定パートナー募集。店舗リサーチ・初回提案・コミュニケーションを担う方へ。",
};

export default function PartnersPage() {
  return (
    <CloserShell>
      <CloserPartner />
    </CloserShell>
  );
}
