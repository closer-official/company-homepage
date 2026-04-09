"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CONTACT_EMAIL_FORM_NOTIFY } from "@/lib/contactEmails";
import type { ContactFormVariant } from "./contactTypes";

type Props = {
  variant?: ContactFormVariant;
};

export default function CloserContactForm({ variant = "store" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shop, setShop] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [activityArea, setActivityArea] = useState("");
  const [partnerExperience, setPartnerExperience] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isPartner = variant === "partner";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    if (!n || !em) {
      alert("お名前とメールアドレスは必須です。");
      return;
    }
    if (isPartner) {
      const area = activityArea.trim();
      if (!area) {
        alert("活動エリア（市区町村など）をご記入ください。");
        return;
      }
    }
    setSubmitting(true);
    try {
      let body: string;
      let inquiryTypeLabel: string;
      let emailSubject: string;
      let firestoreSubtype: string;

      if (isPartner) {
        const area = activityArea.trim();
        const exp = partnerExperience.trim();
        inquiryTypeLabel = "Closer by divizero（認定パートナー募集）";
        emailSubject = "Closer by divizero 認定パートナー募集のお問い合わせ";
        firestoreSubtype = "partner";
        body =
          `【Closer by divizero 認定パートナー募集】\n` +
          `お名前: ${n}\nメール: ${em}\n活動エリア: ${area}\nご経験・活動内容: ${exp || "—"}\n\nご相談内容:\n${message || "（本文なし）"}`;
      } else {
        inquiryTypeLabel = "Closer by divizero（飲食・実店舗・Web制作）";
        emailSubject = "Closer by divizero お問い合わせ（店舗・Web制作）";
        firestoreSubtype = "store";
        body =
          `【Closer by divizero 店舗・Web制作のご相談】\n` +
          `お名前: ${n}\nメール: ${em}\n店舗・屋号: ${shop || "—"}\n業種: ${businessType || "—"}\n\nご相談内容:\n${message || "（本文なし）"}`;
      }

      await addDoc(collection(db, "contacts"), {
        inquiryType: "closer-divizero",
        inquirySubtype: firestoreSubtype,
        inquiryTypeLabel,
        name: n,
        email: em,
        shopName: isPartner ? null : shop.trim() || null,
        businessType: isPartner ? null : businessType || null,
        partnerActivityArea: isPartner ? activityArea.trim() : null,
        partnerExperience: isPartner ? partnerExperience.trim() || null : null,
        partnerMessage: isPartner ? message.trim() || null : null,
        storeMessage: isPartner ? null : message.trim() || null,
        message: body,
        timestamp: new Date().toISOString(),
        status: "unread",
      });

      const fd = new FormData();
      fd.append("_subject", emailSubject);
      fd.append("_captcha", "false");
      fd.append("name", n);
      fd.append("email", em);
      fd.append("message", body);

      await fetch(`https://formsubmit.co/${CONTACT_EMAIL_FORM_NOTIFY}`, {
        method: "POST",
        body: fd,
      });

      setDone(true);
    } catch (err) {
      console.error(err);
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="closer-form-success">
        <div className="closer-form-success-icon" aria-hidden>
          ✓
        </div>
        <div className="closer-form-success-title">送信が完了しました</div>
        <p className="closer-form-success-text">
          内容を確認のうえ、折り返しご連絡いたします。
          <br />
          しばらくお待ちください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="closer-form-variant-hint">
        {isPartner ? (
          <>
            認定パートナー募集に関するお問い合わせです。条件の詳細は返信にてご案内します。{" "}
            <Link href="/partners" className="closer-contact-switch">
              募集ページを見る
            </Link>
          </>
        ) : (
          <>
            飲食店・実店舗向けWeb制作のご相談フォームです。{" "}
            <Link href="/contact?for=partner" className="closer-contact-switch">
              パートナー募集のお問い合わせ
            </Link>
          </>
        )}
      </p>

      <div className="closer-form-group">
        <label className="closer-form-label" htmlFor="closer-f-name">
          お名前 *
        </label>
        <input
          id="closer-f-name"
          className="closer-form-input"
          placeholder="山田 太郎"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>
      <div className="closer-form-group">
        <label className="closer-form-label" htmlFor="closer-f-email">
          メールアドレス *
        </label>
        <input
          id="closer-f-email"
          type="email"
          className="closer-form-input"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      {isPartner ? (
        <>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-area">
              活動エリア（市区町村など） *
            </label>
            <input
              id="closer-f-area"
              className="closer-form-input"
              placeholder="例：東京都世田谷区、福岡市博多区 など"
              value={activityArea}
              onChange={(e) => setActivityArea(e.target.value)}
              required
              autoComplete="address-level2"
            />
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-exp">
              ご経験・活動内容（任意）
            </label>
            <input
              id="closer-f-exp"
              className="closer-form-input"
              placeholder="営業・接客、地域活動、SNS運用 など"
              value={partnerExperience}
              onChange={(e) => setPartnerExperience(e.target.value)}
            />
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-message">
              お問い合わせ内容 *
            </label>
            <textarea
              id="closer-f-message"
              className="closer-form-textarea"
              placeholder="パートナーに関するご質問、ご参加の意向、ご自身の活動内容などをお書きください。"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
        </>
      ) : (
        <>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-shop">
              店舗・屋号名
            </label>
            <input
              id="closer-f-shop"
              className="closer-form-input"
              placeholder="〇〇食堂"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            />
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-type">
              業種
            </label>
            <select
              id="closer-f-type"
              className="closer-form-select"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="飲食店（レストラン・カフェ等）">
                飲食店（レストラン・カフェ等）
              </option>
              <option value="バー・居酒屋">バー・居酒屋</option>
              <option value="美容・ネイル・サロン">美容・ネイル・サロン</option>
              <option value="小売・雑貨店">小売・雑貨店</option>
              <option value="その他の実店舗">その他の実店舗</option>
            </select>
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-message">
              ご相談内容
            </label>
            <textarea
              id="closer-f-message"
              className="closer-form-textarea"
              placeholder="現在の状況やお悩みをお気軽にご記入ください。"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>
        </>
      )}

      <button type="submit" className="closer-form-submit" disabled={submitting}>
        {submitting ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
