import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import ResumeTool from "@/components/tools/ResumeTool";

export const metadata: Metadata = {
  title: "ツール｜履歴書・職務経歴書ビルダー",
  description:
    "履歴書・職務経歴書のひな型を選び、ブラウザ内だけで編集。PNGダウンロード可能。個人情報は保存しません。",
};

export default function ToolsPage() {
  return (
    <CloserShell>
      <ResumeTool />
    </CloserShell>
  );
}
