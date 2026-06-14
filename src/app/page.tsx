import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Divizero | LP・HP制作の相談窓口",
  description:
    "XやInstagramで発信している個人事業主・コンサル・アフィリエイターのLP/HP制作相談窓口。買い切り4.98万〜、最短1週間、無料デモあり。まずLINEで気軽に話しかけてください。",
  openGraph: {
    title: "Divizero | LP・HP制作の相談窓口",
    description:
      "発信で人は集まる。問題は、そのあと。集めた人を取りこぼさない受け皿のページを、一緒に作ります。",
  },
};

export default function Home() {
  const styleContent = fs.readFileSync(
    path.join(process.cwd(), "public", "home-style.css"),
    "utf-8"
  );
  const bodyHtml = fs.readFileSync(
    path.join(process.cwd(), "public", "home-body.html"),
    "utf-8"
  );

  return (
    <>
      {/* divisero.html のスタイル — Tailwind の font-sans より優先 */}
      <style dangerouslySetInnerHTML={{ __html: `body{font-family:'Zen Kaku Gothic New',sans-serif!important;background:#FFFFFF!important;}\n${styleContent}` }} />
      {/* divisero.html の body コンテンツ（script タグ除去済み）*/}
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      {/* スクロールアニメーション・ヘッダー挙動 JS */}
      <Script src="/home-script.js" strategy="afterInteractive" />
    </>
  );
}
