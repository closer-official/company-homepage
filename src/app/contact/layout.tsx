import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "divizeroへのお問い合わせ。営業代行のご相談・パートナー募集はこちらから。",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
