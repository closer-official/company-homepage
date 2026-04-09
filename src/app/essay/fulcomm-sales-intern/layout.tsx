import type { Metadata } from "next";

const title =
  "フルコミ営業インターン、14ヶ月。100回の拒絶、金欠、劣等感。それでも辞めなかった理由";
const description =
  "「成長できる環境」という言葉の正体を、1年2ヶ月かけて解体した記録。環境の選び方の判断材料として。";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    locale: "ja_JP",
  },
};

export default function FulcommEssayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
