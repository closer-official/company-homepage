import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserPricing from "@/components/closer/pages/CloserPricing";

export const metadata: Metadata = {
  title: "Pricing（目安）",
  description:
    "ディビゼロ（divizero）の飲食・実店舗向けWeb制作プラン（税別・目安）。正式なお見積りは無料相談後に確定します。",
};

export default function PricingPage() {
  return (
    <CloserShell>
      <CloserPricing />
    </CloserShell>
  );
}
