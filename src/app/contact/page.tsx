import type { Metadata } from "next";
import { Suspense } from "react";
import CloserShell from "@/components/closer/CloserShell";
import CloserContactPage from "@/components/closer/pages/CloserContactPage";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "divizero営業代行のご相談・パートナー（オペレーター）募集のお問い合わせ。公式LINEからもご連絡いただけます。",
};

export default function ContactPage() {
  return (
    <CloserShell>
      <Suspense fallback={null}>
        <CloserContactPage />
      </Suspense>
    </CloserShell>
  );
}
