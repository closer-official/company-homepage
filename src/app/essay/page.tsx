import type { Metadata } from "next";
import EssayIndex from "@/components/closer/pages/EssayIndex";

export const metadata: Metadata = {
  title: "Column / コラム",
  description:
    "ディビゼロ（Closer by divizero）のコラム・体験記一覧。Web制作やキャリア、環境の選び方に関する文章を掲載します。",
  openGraph: {
    title: "Column / コラム | Closer by divizero（ディビゼロ）",
    description:
      "コラム・体験記の一覧。記事は順次追加予定です。",
  },
};

export default function EssayIndexPage() {
  return <EssayIndex />;
}
