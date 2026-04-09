import type { NextConfig } from "next";

/** 旧ドメインが同じアプリに向いているとき、検索エンジン向けに「正式URLは divizero.jp」と伝える恒久的転送（HTTP 301） */
const LEGACY_HOSTS = ["closer-official.com", "www.closer-official.com"];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon.png",
        permanent: true,
      },
      ...LEGACY_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://divizero.jp/:path*",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
