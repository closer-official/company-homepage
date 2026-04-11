"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const ADSENSE_CLIENT = "ca-pub-4502709909190086";

/** 契約・支払い案内など、非公開URLでは広告タグを出さない */
export default function ConditionalAdsense() {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/c/")) return null;
  return (
    <Script
      id="adsense-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
