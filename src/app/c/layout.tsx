import type { Metadata } from "next";

/** /c/* はサイト内非掲載。正しいシークレット slug のみ page で描画される。 */
export const metadata: Metadata = {
  robots: "noindex, nofollow, noarchive, nosnippet",
};

export default function ContractSegmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
