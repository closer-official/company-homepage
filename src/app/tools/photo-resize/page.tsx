import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import PhotoResizeTool from "@/components/tools/PhotoResizeTool";
import { TOOLS_SITE_BASE } from "../_site-base";

const url = `${TOOLS_SITE_BASE}/tools/photo-resize`;

export const metadata: Metadata = {
  title: "無料・写真サイズ変更｜比率・px指定・トリミングしてダウンロード",
  description:
    "写真をブラウザ上で無料リサイズ。よく使う比率のプリセットまたは幅×高さ（px）を選び、ドラッグとズームで枠内に合わせてJPEG・PNGで保存。サーバーへアップロードしません。",
  keywords: [
    "写真 リサイズ 無料",
    "画像 サイズ変更 無料",
    "写真 トリミング 無料",
    "画像 比率 変更",
    "SNS サイズ 画像",
    "ブラウザ 画像 リサイズ",
    "divizero ツール",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "無料・写真サイズ変更｜比率・px指定・トリミングしてダウンロード",
    description:
      "比率プリセットまたはpx指定。ドラッグ・ズームで位置調整し、JPEG・PNGで保存。端末内のみで処理。",
  },
  twitter: {
    card: "summary_large_image",
    title: "無料・写真サイズ変更｜比率・px指定・トリミングしてダウンロード",
    description:
      "比率プリセットまたはpx指定。ドラッグ・ズームで位置調整し、JPEG・PNGで保存。端末内のみで処理。",
  },
};

export default function ToolsPhotoResizePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "無料・写真サイズ変更ツール",
    description:
      "画像をブラウザ内でリサイズ・トリミング。比率プリセットまたは幅×高さ（px）を指定し、JPEG・PNGでダウンロード。サーバーへの送信は行いません。",
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
      "よく使う比率のプリセットとカスタムpx",
      "ドラッグ移動・ズームでトリミング位置を調整",
      "JPEG・PNGで書き出し",
      "ブラウザ内完結・画像のアップロードなし",
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
        <PhotoResizeTool />
      </CloserShell>
    </>
  );
}
