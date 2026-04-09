import type { Metadata } from "next";
import Link from "next/link";
import CloserShell from "@/components/closer/CloserShell";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "ディビゼロ（divizero）・Closer by divizero の運営者情報（Closer事務局）。",
};

export default function OperatorPage() {
  return (
    <CloserShell>
      <div className="closer-legal-page">
        <h1 className="closer-legal-title">運営者情報</h1>
        <p className="closer-legal-date">Closer事務局</p>
        <div className="closer-legal-section">
          <table className="closer-legal-table">
            <tbody>
              <tr>
                <td>運営元</td>
                <td>Closer事務局</td>
              </tr>
              <tr>
                <td>代表者名</td>
                <td>小林薫之介</td>
              </tr>
              <tr>
                <td>ブランド名</td>
                <td>Closer by divizero（読み：ディビゼロ）</td>
              </tr>
              <tr>
                <td>サービス名の読み</td>
                <td>divizero は「ディビゼロ」と読みます。</td>
              </tr>
              <tr>
                <td>事業内容</td>
                <td>Web制作・更新サポート</td>
              </tr>
              <tr>
                <td>お問い合わせ先</td>
                <td>
                  <Link href="/contact">お問い合わせフォーム</Link>
                  よりご連絡ください
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="closer-legal-p">
          本サービスは個人による運営です。法人ではありません。
        </p>
      </div>
    </CloserShell>
  );
}
