import type { Metadata } from "next";
import "./globals.css";
import ConditionalAdsense from "@/components/ConditionalAdsense";
import ConditionalHeader from "@/components/ConditionalHeader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://divizero.jp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Closer by divizero（ディビゼロ）| 飲食店・実店舗のWeb制作",
    template: "%s | Closer by divizero（ディビゼロ）",
  },
  description:
    "ディビゼロ（divizero）の飲食店・実店舗向けWeb制作。来店前のお客様に魅力と必要な情報を届けます。Closer by divizero（Closer事務局）。",
  keywords: [
    "ディビゼロ",
    "divizero",
    "Closer by divizero",
    "Closer",
    "飲食店",
    "Web制作",
    "ホームページ制作",
    "実店舗",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Closer by divizero（ディビゼロ）",
    title: "Closer by divizero（ディビゼロ）| 飲食店・実店舗のWeb制作",
    description:
      "ディビゼロ（divizero）の飲食店・実店舗向けWeb制作。来店前のお客様に魅力と情報を届けます。",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Closer by divizero（ディビゼロ）| 飲食店・実店舗のWeb制作",
    description:
      "ディビゼロ（divizero）の飲食店・実店舗向けWeb制作。来店前のお客様に魅力と情報を届けます。",
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
        alternateName: [
          "ディビゼロ",
          "Closer by divizero",
          "divizero",
          "Closer",
        ],
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
          "飲食店・実店舗向けWeb制作。ブランド読みはディビゼロ（divizero）。Closer by divizero。来店前のお客様へ魅力と情報を届けます。",
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
        name: "Closer by divizero（ディビゼロ）",
        description:
          "ディビゼロ（divizero）の飲食店・実店舗向けWeb制作。来店前のお客様に魅力と必要な情報を届けます。",
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
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&family=Noto+Sans+JP:wght@300;400;500&family=Noto+Serif+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
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
