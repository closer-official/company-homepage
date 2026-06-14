import type { Metadata } from "next";
import "./globals.css";
import ConditionalAdsense from "@/components/ConditionalAdsense";
import ConditionalHeader from "@/components/ConditionalHeader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "divizero | 営業代行プラットフォーム",
    template: "%s | divizero",
  },
  description:
    "返信率40%の営業代行プラットフォーム divizero。ターゲット選定とデータドリブンなDM運用で、クリエイターの営業を完全自動化。",
  keywords: [
    "ディビゼロ",
    "divizero",
    "営業代行",
    "DM営業",
    "クリエイター",
    "成果報酬",
    "アポ獲得",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "divizero",
    title: "divizero | 営業代行プラットフォーム",
    description:
      "返信率40%の衝撃。あなたの営業を、データと仕組みで完全自動化する。クリエイターは制作だけに集中。",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "divizero | 営業代行プラットフォーム",
    description:
      "返信率40%の衝撃。あなたの営業を、データと仕組みで完全自動化する。クリエイターは制作だけに集中。",
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Closer事務局",
        alternateName: ["ディビゼロ", "divizero"],
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+81-50-1794-9630",
          contactType: "customer service",
          email: "info@closer-official.com",
          areaServed: "JP",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Closer事務局",
        description:
          "営業代行プラットフォーム divizero。クリエイターの営業をデータと仕組みで自動化し、制作に集中できる環境を提供します。",
        url: SITE_URL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "東京都中央区銀座",
          addressRegion: "東京都",
          addressCountry: "JP",
        },
        telephone: "+81-50-1794-9630",
        priceRange: "ご相談",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "divizero",
        description:
          "返信率40%の営業代行プラットフォーム。クリエイターの営業をデータと仕組みで完全自動化します。",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#tadanosuke`,
        name: "小林薫之介",
        alternateName: ["Tadanosuke", "ただのすけ"],
        url: SITE_URL,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        jobTitle: "代表",
      },
    ],
  };

  return (
    <html lang="ja" className="js">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&family=Noto+Sans+JP:wght@300;400;500&family=Noto+Serif+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ConditionalAdsense />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConditionalHeader />
        <main className="min-h-0">{children}</main>
      </body>
    </html>
  );
}
