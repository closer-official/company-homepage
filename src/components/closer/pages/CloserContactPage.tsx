"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CloserContactForm from "../CloserContactForm";
import type { ContactFormVariant } from "../contactTypes";

export default function CloserContactPage() {
  const searchParams = useSearchParams();
  const variant: ContactFormVariant =
    searchParams.get("for") === "partner" ? "partner" : "store";

  const isPartner = variant === "partner";

  return (
    <div className="closer-contact-wrap">
      <div className="closer-contact-left">
        {isPartner ? (
          <>
            <h1 className="closer-contact-title">
              認定パートナーについて、
              <br />
              お気軽に<em>ご相談ください</em>。
            </h1>
            <p className="closer-contact-sub">
              店舗リサーチ・初回アプローチ・ヒアリング支援など、役割や条件の詳細はお問い合わせ後にご案内します。まずはご質問やご経験をお聞かせください。
            </p>
            <p className="closer-contact-note">
              お店のWeb制作をご検討の方は
              <Link href="/contact" className="closer-contact-switch">
                店舗向けお問い合わせ
              </Link>
              からお進みください。
              <br />
              <br />
              ブランド：Closer by divizero（読み：ディビゼロ）
              <br />
              運営元：Closer事務局
            </p>
          </>
        ) : (
          <>
            <h1 className="closer-contact-title">
              まずは、お店の
              <br />
              状況を<em>聞かせてください</em>。
            </h1>
            <p className="closer-contact-sub">
              「こういうものが必要か分からない」という段階でも問題ありません。今の発信状況やお悩みに合わせて、必要な形をご提案します。
            </p>
            <p className="closer-contact-note">
              Instagram経由でご案内した場合も、正式なご相談・お申し込みは所定フォームから進行いたします。
              <br />
              <br />
              認定パートナー募集のお問い合わせは
              <Link
                href="/contact?for=partner"
                className="closer-contact-switch"
              >
                こちら
              </Link>
              。
              <br />
              <br />
              ブランド：Closer by divizero（読み：ディビゼロ）
              <br />
              運営元：Closer事務局
            </p>
          </>
        )}
      </div>
      <div className="closer-contact-right">
        <CloserContactForm variant={variant} />
      </div>
    </div>
  );
}
