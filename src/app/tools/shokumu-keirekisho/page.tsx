import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import ResumeTool from "@/components/tools/ResumeTool";
import { TOOLS_SITE_BASE } from "../_site-base";

const url = `${TOOLS_SITE_BASE}/tools/shokumu-keirekisho`;

export const metadata: Metadata = {
  title: "無料で職務経歴書を作成｜提出向けレイアウト・PDF・PNG",
  description:
    "無料の職務経歴書ビルダー。提出向けの見出し・箇条書きレイアウト。飲食アルバイト向けの例文で未入力欄を補完（入力で差し替え）。PNG・PDFで保存。ブラウザ内完結でサーバーに送信しません。",
  keywords: [
    "無料 職務経歴書",
    "職務経歴書 無料",
    "職務経歴書 テンプレート 無料",
    "職務経歴書 作成 無料",
    "職務経歴書 PDF 無料",
    "アルバイト 職務経歴書",
    "飲食 バイト 職務経歴書",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "無料で職務経歴書を作成｜提出向けレイアウト・PDF・PNG",
    description:
      "提出向けレイアウト・例文つき。PNG／PDFで保存。個人情報は端末内のみ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "無料で職務経歴書を作成｜提出向けレイアウト・PDF・PNG",
    description:
      "提出向けレイアウト・例文つき。PNG／PDFで保存。個人情報は端末内のみ。",
  },
};

export default function ToolsShokumuKeirekishoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "無料・職務経歴書ビルダー",
    description:
      "職務経歴書をブラウザ内で作成。提出向けレイアウト・PNG・PDF出力。個人情報はサーバーに保存しません。",
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
        <ResumeTool initialDocMode="career" />
      </CloserShell>
    </>
  );
}
