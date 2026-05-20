import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせへ",
  description: "divizeroのお問い合わせページへ移動します。",
};

export default function HearingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
