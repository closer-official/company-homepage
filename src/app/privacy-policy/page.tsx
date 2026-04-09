import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Closer事務局（ディビゼロ／divizero）のプライバシーポリシー。",
};

export default function PrivacyPolicyPage() {
  return (
    <CloserShell>
      <div className="closer-legal-page">
        <h1 className="closer-legal-title">プライバシーポリシー</h1>
        <p className="closer-legal-date">Closer事務局</p>
        <div className="closer-legal-section">
          <p className="closer-legal-p">
            Closer事務局（以下、「当方」）は、本ウェブサイト上で提供するサービスにおける、
            ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第1条（個人情報）</h2>
          <p className="closer-legal-p">
            個人情報とは、個人情報保護法にいう「個人情報」を指し、氏名、生年月日、住所、電話番号、
            連絡先その他の記述等により特定の個人を識別できる情報をいいます。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第2条（個人情報の収集方法）</h2>
          <p className="closer-legal-p">
            当方は、ユーザーからのお問い合わせ等により、氏名、メールアドレス、その他の情報を取得することがあります。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第3条（個人情報を収集・利用する目的）</h2>
          <p className="closer-legal-p">
            当方が個人情報を収集・利用する目的は以下のとおりです。
          </p>
          <ul className="closer-legal-p" style={{ paddingLeft: "1.25rem" }}>
            <li>お問い合わせへの対応（本人確認を含む）</li>
            <li>サービスの提供・運営上必要なご連絡</li>
            <li>上記の利用目的に付随する目的</li>
          </ul>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第4条（個人情報の第三者提供）</h2>
          <p className="closer-legal-p">
            当方は、法令に基づく場合を除き、あらかじめユーザーの同意を得ることなく第三者に個人情報を提供しません。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第5条（個人情報の開示）</h2>
          <p className="closer-legal-p">
            当方は、本人から個人情報の開示を求められたときは、本人に対し遅滞なくこれを開示します。
            ただし、開示することにより第三者の生命、身体、財産その他の権利利益を害するおそれがある場合、
            または当方の業務の適正な実施に著しい支障を及ぼすおそれがある場合は、この限りではありません。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第6条（個人情報の訂正および削除）</h2>
          <p className="closer-legal-p">
            ユーザーは、当方の保有する自己の個人情報が誤った情報である場合には、当方が定める手続により、
            個人情報の訂正、追加または削除を請求することができます。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第7条（個人情報の利用停止等）</h2>
          <p className="closer-legal-p">
            当方は、本人から個人情報が利用目的の範囲を超えて取り扱われているという理由、
            または不正の手段により取得されたものであるという理由により、
            その利用の停止または消去を求められた場合には、遅滞なく必要な調査を行います。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第8条（プライバシーポリシーの変更）</h2>
          <p className="closer-legal-p">
            本ポリシーの内容は、ユーザーに通知することなく変更することができるものとします。
            変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </p>
        </div>
        <div className="closer-legal-section">
          <h2 className="closer-legal-h2">第9条（お問い合わせ窓口）</h2>
          <p className="closer-legal-p">
            本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
          </p>
          <p className="closer-legal-p">
            メールアドレス：info@closer-official.com
          </p>
        </div>
      </div>
    </CloserShell>
  );
}
