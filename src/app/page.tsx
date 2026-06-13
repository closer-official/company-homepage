import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserHome from "@/components/closer/pages/CloserHome";

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
  return (
    <CloserShell variant="divizero">
      <CloserHome />
    </CloserShell>
  );
}
