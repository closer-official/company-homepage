import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import ResumePhotoMaker from "@/components/tools/ResumePhotoMaker";
import { TOOLS_SITE_BASE } from "../_site-base";

const url = `${TOOLS_SITE_BASE}/tools/resume-photo-maker`;

export const metadata: Metadata = {
  title: "履歴書写真メーカー｜背景をブルーバックに差し替えて高画質出力",
  description:
    "写真の背景を履歴書向けのブルーバック・白背景へ差し替える無料ツール。人物を抽出し、3:4比率で高画質出力できます。処理はブラウザ内で完結。",
  keywords: [
    "履歴書 写真 背景 変更",
    "証明写真 背景 青",
    "履歴書 写真 作成 ツール",
    "写真 背景 差し替え 無料",
    "divizero ツール",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    title: "履歴書写真メーカー｜背景をブルーバックに差し替えて高画質出力",
    description:
      "アップロード写真の背景を履歴書向けに差し替え。ブルーバック・白背景対応、3:4比率、高画質出力。",
  },
  twitter: {
    card: "summary_large_image",
    title: "履歴書写真メーカー｜背景をブルーバックに差し替えて高画質出力",
    description:
      "背景差し替えと3:4高画質出力ができる履歴書写真メーカー。ブラウザ内処理で安心。",
  },
};

export default function ResumePhotoMakerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "履歴書写真メーカー",
    description:
      "写真の背景を履歴書向けのブルーバック・白背景へ差し替え、3:4比率で高画質出力できる無料ツール。",
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
      "背景をブルーバック・白背景へ差し替え",
      "履歴書向け3:4比率で出力",
      "高画質サイズのプリセット",
      "ブラウザ内完結でアップロード不要",
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
        <ResumePhotoMaker />
      </CloserShell>
    </>
  );
}

