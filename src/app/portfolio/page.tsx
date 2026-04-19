import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import PortfolioClient from "./PortfolioClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";
const canonical = `${SITE_URL}/portfolio`;

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-portfolio-dm",
});

export const metadata: Metadata = {
  title: "Tadanosuke Kobayashi — Portfolio",
  description:
    "小林忠之介（Tadanosuke Kobayashi）のポートフォリオ。企画・PM志望。課題発見から仕組み化、実務経験と主要プロジェクトをまとめています。",
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: canonical,
    title: "Tadanosuke Kobayashi — Portfolio",
    description:
      "企画・PM志望。課題を仕組みにし、現場で動かせる設計を重視したポートフォリオ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tadanosuke Kobayashi — Portfolio",
    description:
      "企画・PM志望。課題を仕組みにし、現場で動かせる設計を重視したポートフォリオ。",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient fontVariableClass={dmSans.variable} />;
}
