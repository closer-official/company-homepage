import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContractPayPage from "@/components/contract-pay/ContractPayPage";

export const dynamic = "force-dynamic";

/**
 * 契約・支払い案内（非公開URL）
 *
 * - サイト内にリンクしません。sitemap にも含めません。
 * - 本番では環境変数 CONTRACT_PAY_PAGE_SLUG に十分長いランダム文字列を設定し、
 *   https://divizero.jp/c/{CONTRACT_PAY_PAGE_SLUG} のみで表示されます。
 * - 開発時、CONTRACT_PAY_PAGE_SLUG 未設定の場合は /c/dev-local-only のみ有効です。
 */
function isAllowedSlug(slug: string): boolean {
  const expected = process.env.CONTRACT_PAY_PAGE_SLUG?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!expected) return false;
    return slug === expected;
  }
  if (expected) return slug === expected;
  return slug === "dev-local-only";
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ご契約内容・お支払い案内",
    description:
      "Closer by divizero のご契約内容およびお支払いに関する案内（限定URL）。",
    robots: "noindex, nofollow, noarchive, nosnippet",
  };
}

export default async function ContractPayRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isAllowedSlug(slug)) {
    notFound();
  }

  return <ContractPayPage />;
}
