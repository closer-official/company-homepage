import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserPricing from "@/components/closer/pages/CloserPricing";

export const metadata: Metadata = {
  title: "料金",
  description:
    "divizeroの料金プラン。完全成果報酬で1アポ5,000円〜。他社1.5万円〜に対する圧倒的なコストパフォーマンス。",
};

export default function PricingPage() {
  return (
    <CloserShell>
      <CloserPricing />
    </CloserShell>
  );
}
