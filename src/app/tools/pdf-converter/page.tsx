import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import PdfConverterTool from "@/components/tools/PdfConverterTool";
import { TOOLS_SITE_BASE } from "../_site-base";

const url = `${TOOLS_SITE_BASE}/tools/pdf-converter`;

export const metadata: Metadata = {
  title: "無料 PDF 変換｜画像をPDFに変換してダウンロード",
  description:
    "画像（JPEG・PNG・WebP）をブラウザ上で無料でPDF変換。インストール不要・個人情報の送信なし。ディビゼロの無料PDFツール。大学生・就活生の書類PDF化にも。有料プラン（月額¥300）で20ファイル一括変換＆履歴保存。",
  keywords: [
    "無料 PDF変換",
    "PDF変換 無料",
    "ディビゼロ PDF",
    "divizero PDF",
    "大学生 PDF変換",
    "画像 PDF 変換 無料",
    "JPEG PDF 変換",
    "PNG PDF 変換",
    "PDF 無料 ダウンロード",
    "PDF 変換 ブラウザ",
    "スマホ PDF 変換 無料",
    "複数画像 PDF まとめる",
    "履歴書 PDF 変換",
    "就活 PDF",
    "インストール不要 PDF",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "無料 PDF 変換｜画像をPDFに変換してダウンロード",
    description:
      "JPEG・PNG・WebPなどの画像をブラウザ上で無料PDF変換。ディビゼロのツール。個人情報の送信なし。",
  },
  twitter: {
    card: "summary_large_image",
    title: "無料 PDF 変換｜画像をPDFに変換してダウンロード",
    description:
      "JPEG・PNG・WebPなどの画像をブラウザ上で無料PDF変換。ディビゼロのツール。個人情報の送信なし。",
  },
};

export default function PdfConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "無料PDF変換ツール by ディビゼロ",
    description:
      "画像ファイル（JPEG・PNG・WebPなど）をブラウザ上でPDFに変換。インストール不要・完全無料。有料プラン（月額¥300）で最大20ファイル一括変換＆変換履歴の保存・再ダウンロードが可能。",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url,
    inLanguage: "ja",
    offers: [
      {
        "@type": "Offer",
        name: "無料プラン",
        price: "0",
        priceCurrency: "JPY",
        description: "1ファイルずつ無料でPDF変換",
      },
      {
        "@type": "Offer",
        name: "有料プラン",
        price: "300",
        priceCurrency: "JPY",
        billingDuration: "P1M",
        description: "最大20ファイル一括変換・変換履歴保存",
      },
    ],
    featureList: [
      "JPEG・PNG・WebP・GIF・BMPなどの画像をPDFに変換",
      "ブラウザ内処理・個人情報の送信なし",
      "複数画像を1つのPDFにまとめる（有料プラン）",
      "変換履歴の保存・再ダウンロード（有料プラン）",
      "スマホ・PCどちらでも利用可能",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "24",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "PDF変換は本当に無料ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、1ファイルずつの変換は完全無料です。有料プラン（月額¥300）では最大20ファイルの一括変換と変換履歴の保存・再ダウンロードが利用できます。",
        },
      },
      {
        "@type": "Question",
        name: "アップロードしたファイルはサーバーに保存されますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "いいえ。ファイルはすべてお使いのブラウザ（端末）内で処理されます。サーバーへの送信・保存は一切行いません。",
        },
      },
      {
        "@type": "Question",
        name: "どの画像形式に対応していますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JPEG・PNG・WebP・GIF・BMPなど、ブラウザが対応する主要な画像形式に対応しています。",
        },
      },
      {
        "@type": "Question",
        name: "複数の画像を1つのPDFにまとめられますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "有料プラン（月額¥300）では最大20ファイルを選択し、1つのPDFにまとめて変換できます。",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CloserShell>
        <PdfConverterTool />
      </CloserShell>
    </>
  );
}
