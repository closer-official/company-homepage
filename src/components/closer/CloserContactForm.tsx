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

export default function CloserContactForm({ variant = "client" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [snsAccount, setSnsAccount] = useState("");
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
        inquiryTypeLabel = "divizero（パートナー・オペレーター募集）";
        emailSubject = "divizero パートナー募集のお問い合わせ";
        firestoreSubtype = "partner";
        body =
          `【divizero パートナー募集】\n` +
          `お名前: ${n}\nメール: ${em}\n活動エリア: ${area}\nご経験・活動内容: ${exp || "—"}\n\nお問い合わせ内容:\n${message || "（本文なし）"}`;
      } else {
        inquiryTypeLabel = "divizero（営業代行・クリエイター向け）";
        emailSubject = "divizero 営業代行のお問い合わせ";
        firestoreSubtype = "client";
        body =
          `【divizero 営業代行のご相談】\n` +
          `お名前: ${n}\nメール: ${em}\n活動内容: ${activity || "—"}\n想定商材単価: ${productPrice || "—"}\nSNSアカウント: ${snsAccount || "—"}\n\nご相談内容:\n${message || "（本文なし）"}`;
      }

      await addDoc(collection(db, "contacts"), {
        inquiryType: "divizero",
        inquirySubtype: firestoreSubtype,
        inquiryTypeLabel,
        name: n,
        email: em,
        activity: isPartner ? null : activity.trim() || null,
        productPrice: isPartner ? null : productPrice.trim() || null,
        snsAccount: isPartner ? null : snsAccount.trim() || null,
        partnerActivityArea: isPartner ? activityArea.trim() : null,
        partnerExperience: isPartner ? partnerExperience.trim() || null : null,
        partnerMessage: isPartner ? message.trim() || null : null,
        clientMessage: isPartner ? null : message.trim() || null,
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
            パートナー（オペレーター）募集に関するお問い合わせです。{" "}
            <Link href="/partners" className="closer-contact-switch">
              募集ページを見る
            </Link>
          </>
        ) : (
          <>
            営業代行（クリエイター向け）のご相談フォームです。{" "}
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
              placeholder="例：東京都、リモート可 など"
              value={activityArea}
              onChange={(e) => setActivityArea(e.target.value)}
              required
            />
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-exp">
              ご経験・活動内容（任意）
            </label>
            <input
              id="closer-f-exp"
              className="closer-form-input"
              placeholder="DM営業、SNS運用、テレアポ など"
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
              placeholder="パートナーに関するご質問、稼働可能時間、ご経験など"
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
            <label className="closer-form-label" htmlFor="closer-f-activity">
              活動内容・商材
            </label>
            <input
              id="closer-f-activity"
              className="closer-form-input"
              placeholder="Webデザイン、動画制作、コンサル など"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-price">
              想定商材単価（目安）
            </label>
            <input
              id="closer-f-price"
              className="closer-form-input"
              placeholder="例：50,000円、100,000円 など"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-sns">
              SNSアカウント（任意）
            </label>
            <input
              id="closer-f-sns"
              className="closer-form-input"
              placeholder="@username または URL"
              value={snsAccount}
              onChange={(e) => setSnsAccount(e.target.value)}
            />
          </div>
          <div className="closer-form-group">
            <label className="closer-form-label" htmlFor="closer-f-message">
              ご相談内容
            </label>
            <textarea
              id="closer-f-message"
              className="closer-form-textarea"
              placeholder="現状の課題、目標アポ数、これまでの営業状況など"
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
