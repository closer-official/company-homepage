import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import EntrySheetTool from "@/components/tools/EntrySheetTool";
import { TOOLS_SITE_BASE } from "../_site-base";

const url = `${TOOLS_SITE_BASE}/tools/entry-sheet`;

export const metadata: Metadata = {
  title: "エントリーシート作成ツール｜一括入力対応でPDF保存",
  description:
    "画像に近い帳票レイアウトでエントリーシートを作成。AI出力のプレーンテキストを一括反映し、微調整してPNG/PDFで保存できます。",
  keywords: [
    "エントリーシート 作成",
    "ES 作成 ツール",
    "就活 エントリーシート",
    "一括入力 エントリーシート",
    "divizero ツール",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "エントリーシート作成ツール｜一括入力対応でPDF保存",
    description:
      "プレーンテキスト一括反映に対応したエントリーシート作成ツール。ブラウザ内で編集してPNG/PDF保存。",
  },
  twitter: {
    card: "summary_large_image",
    title: "エントリーシート作成ツール｜一括入力対応でPDF保存",
    description:
      "就活用エントリーシートを作成。AIへ渡す指示文つきで一括流し込みにも対応。",
  },
};

export default function EntrySheetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "エントリーシート作成ツール",
    description:
      "プレーンテキストの一括入力と個別微調整に対応したエントリーシート作成ツール。",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url,
    inLanguage: "ja",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    featureList: [
      "帳票レイアウトのエントリーシート作成",
      "AI出力テキストの一括反映",
      "写真アップロード",
      "PNG/PDF保存",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CloserShell>
        <EntrySheetTool />
      </CloserShell>
    </>
  );
}

