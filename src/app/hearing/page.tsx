import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserHearingSheetPage from "@/components/closer/pages/CloserHearingSheetPage";

export const metadata: Metadata = {
  title: "ヒアリングシート",
  description:
    "Divizeroのヒアリングシート。基本情報、料金プラン設計、収支シミュレーターを入力して送信できます。",
};

export default function HearingPage() {
  return (
    <CloserShell>
      <CloserHearingSheetPage />
    </CloserShell>
  );
}
