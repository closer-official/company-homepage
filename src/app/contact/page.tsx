import type { Metadata } from "next";
import { Suspense } from "react";
import CloserShell from "@/components/closer/CloserShell";
import CloserContactPage from "@/components/closer/pages/CloserContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "ディビゼロ（divizero）の飲食・実店舗向けWeb制作への無料相談・お問い合わせ。認定パートナー募集のお問い合わせにも対応しています。",
};

function ContactFallback() {
  return (
    <div className="closer-contact-wrap">
      <div className="closer-contact-left" aria-hidden>
        <p className="closer-contact-sub">読み込み中…</p>
      </div>
      <div className="closer-contact-right" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <CloserShell>
      <Suspense fallback={<ContactFallback />}>
        <CloserContactPage />
      </Suspense>
    </CloserShell>
  );
}
