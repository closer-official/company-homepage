import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import ToolsIndex from "@/components/closer/pages/ToolsIndex";
import { TOOLS_SITE_BASE } from "./_site-base";

const url = `${TOOLS_SITE_BASE}/tools`;

export const metadata: Metadata = {
  title: "無料ツール一覧｜PDF変換・履歴書・職務経歴書",
  description:
    "ディビゼロの無料ツール一覧。画像をPDFに変換するPDF変換ツール、ブラウザで作れる履歴書・職務経歴書ビルダー。インストール不要・個人情報の送信なし。",
  keywords: [
    "無料 PDF変換",
    "無料 履歴書",
    "無料 職務経歴書",
    "ディビゼロ ツール",
    "divizero ツール",
    "ブラウザ 無料ツール",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "無料ツール一覧｜PDF変換・履歴書・職務経歴書",
    description:
      "ディビゼロの無料ツール一覧。PDF変換・履歴書・職務経歴書ビルダー。ブラウザ内処理で個人情報の送信なし。",
  },
  twitter: {
    card: "summary_large_image",
    title: "無料ツール一覧｜PDF変換・履歴書・職務経歴書",
    description:
      "ディビゼロの無料ツール一覧。PDF変換・履歴書・職務経歴書ビルダー。ブラウザ内処理で個人情報の送信なし。",
  },
};

export default function ToolsPage() {
  return (
    <CloserShell>
      <ToolsIndex />
    </CloserShell>
  );
}
