"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CloserContactForm from "../CloserContactForm";
import { DIVIZERO_LINE_URL } from "@/lib/divizero";
import type { ContactFormVariant } from "../contactTypes";

export default function CloserContactPage() {
  const searchParams = useSearchParams();
  const variant: ContactFormVariant =
    searchParams.get("for") === "partner" ? "partner" : "client";

  const isPartner = variant === "partner";

  return (
    <div className="dz-subpage closer-contact-wrap dz-reveal is-visible">
      <div className="closer-contact-left">
        {isPartner ? (
          <>
            <h1 className="closer-contact-title">
              パートナー（オペレーター）について、
              <br />
              お気軽に<em>ご相談ください</em>。
            </h1>
            <p className="closer-contact-sub">
              DM運用・ターゲット管理・アポ獲得支援など、役割や条件の詳細はお問い合わせ後にご案内します。
            </p>
            <p className="closer-contact-note">
              営業代行のご依頼（クリエイター向け）は
              <Link href="/contact" className="closer-contact-switch">
                こちら
              </Link>
              または
              <a
                href={DIVIZERO_LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="closer-contact-switch"
              >
                公式LINE
              </a>
              から。
              <br />
              <br />
              ブランド：divizero（読み：ディビゼロ）
              <br />
              運営元：Closer事務局
            </p>
          </>
        ) : (
          <>
            <h1 className="closer-contact-title">
              営業代行のご相談、
              <br />
              まずは<em>状況</em>を聞かせてください。
            </h1>
            <p className="closer-contact-sub">
              商材・ターゲット・現状の課題をお聞きし、最適なプランをご提案します。公式LINEからのご相談も歓迎です。
            </p>
            <p className="closer-contact-note">
              <a
                href={DIVIZERO_LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="closer-contact-switch"
              >
                公式LINEで相談する
              </a>
              （推奨）
              <br />
              <br />
              パートナー（オペレーター）募集は
              <Link href="/contact?for=partner" className="closer-contact-switch">
                こちら
              </Link>
              。
              <br />
              <br />
              ブランド：divizero（読み：ディビゼロ）
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
