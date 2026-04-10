import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import ResumeTool from "@/components/tools/ResumeTool";
import { TOOLS_SITE_BASE } from "../_site-base";

const url = `${TOOLS_SITE_BASE}/tools/rireki`;

export const metadata: Metadata = {
  title: "無料で履歴書を作成｜テンプレート・PDF・PNG",
  description:
    "無料の履歴書ビルダー。一般履歴書・シンプル縦型・写真左などテンプレを選び、ブラウザ内だけで編集。PNG・PDFでダウンロード。氏名・住所・連絡先を入力するだけ。個人情報はサーバーに送信しません。",
  keywords: [
    "無料 履歴書",
    "履歴書 無料",
    "履歴書 テンプレート 無料",
    "履歴書 作成 無料",
    "履歴書 PDF 無料",
    "履歴書 ダウンロード 無料",
    "アルバイト 履歴書",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "無料で履歴書を作成｜テンプレート・PDF・PNG",
    description:
      "ブラウザ内で無料作成。テンプレ選択・PNG／PDF保存。個人情報は端末内のみ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "無料で履歴書を作成｜テンプレート・PDF・PNG",
    description:
      "ブラウザ内で無料作成。テンプレ選択・PNG／PDF保存。個人情報は端末内のみ。",
  },
};

export default function ToolsRirekiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "無料・履歴書ビルダー",
    description:
      "履歴書テンプレートを選び、ブラウザ内で編集。PNG・PDFで保存。個人情報はサーバーに保存しません。",
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
        <ResumeTool initialDocMode="resume" />
      </CloserShell>
    </>
  );
}
