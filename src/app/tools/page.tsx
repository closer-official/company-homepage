import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import ResumeTool from "@/components/tools/ResumeTool";
import { TOOLS_SITE_BASE } from "./_site-base";

const url = `${TOOLS_SITE_BASE}/tools`;

export const metadata: Metadata = {
  title: "無料｜履歴書・職務経歴書ビルダー（PNG・PDF）",
  description:
    "履歴書と職務経歴書をブラウザ上で無料作成。テンプレ選択・プレビュー・PNG／PDFダウンロード。飲食アルバイト向けの職務経歴の例文あり。入力・写真は端末内のみで、サーバーに保存しません。",
  keywords: [
    "無料 履歴書",
    "無料 職務経歴書",
    "履歴書 職務経歴書 無料",
    "履歴書 テンプレート 無料",
    "職務経歴書 テンプレート 無料",
    "履歴書 PDF 無料",
    "職務経歴書 PDF 無料",
    "履歴書 作成 無料",
    "職務経歴書 作成 無料",
    "アルバイト 履歴書",
    "アルバイト 職務経歴書",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "無料｜履歴書・職務経歴書ビルダー（PNG・PDF）",
    description:
      "ブラウザ内で無料作成。履歴書・職務経歴書のテンプレ・PNG／PDF保存。個人情報は端末内のみ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "無料｜履歴書・職務経歴書ビルダー（PNG・PDF）",
    description:
      "ブラウザ内で無料作成。履歴書・職務経歴書のテンプレ・PNG／PDF保存。個人情報は端末内のみ。",
  },
};

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "履歴書・職務経歴書ビルダー（無料）",
    description:
      "履歴書と職務経歴書をブラウザ内で無料作成。テンプレ選択、PNG・PDFで保存。個人情報はサーバーに送信しません。",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CloserShell>
        <ResumeTool />
      </CloserShell>
    </>
  );
}
