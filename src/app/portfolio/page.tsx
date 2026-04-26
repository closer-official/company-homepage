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

type PortfolioMetrics = {
  approachedCount: number;
  responseRate: number;
  updatedAt?: string;
};

function asNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function getManualMetricsFromEnv(): PortfolioMetrics | null {
  const approachedCount = asNumber(process.env.PORTFOLIO_APPROACHED_COUNT);
  const responseRate = asNumber(process.env.PORTFOLIO_RESPONSE_RATE);
  if (approachedCount === null || responseRate === null) return null;
  const updatedAt = process.env.PORTFOLIO_METRICS_UPDATED_AT;
  return { approachedCount, responseRate, updatedAt };
}

export const metadata: Metadata = {
  title: "Tadanosuke Kobayashi — Portfolio",
  description:
    "小林薫之介（Tadanosuke Kobayashi）のポートフォリオ。企画・PM志望。課題発見から仕組み化、実務経験と主要プロジェクトをまとめています。",
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

export default async function PortfolioPage() {
  const liveMetrics = getManualMetricsFromEnv();
  return (
    <PortfolioClient fontVariableClass={dmSans.variable} liveMetrics={liveMetrics} />
  );
}
