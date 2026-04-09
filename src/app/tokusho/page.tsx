import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "Closer事務局（ディビゼロ／divizero・Closer by divizero）の特定商取引法に基づく表記。",
};

export default function TokushoPage() {
  return (
    <CloserShell>
      <div className="closer-legal-page">
        <h1 className="closer-legal-title">特定商取引法に基づく表記</h1>
        <p className="closer-legal-date">販売業者：Closer事務局</p>
        <div className="closer-legal-section">
          <table className="closer-legal-table">
            <tbody>
              <tr>
                <td>販売業者</td>
                <td>Closer事務局</td>
              </tr>
              <tr>
                <td>運営責任者</td>
                <td>代表 小林 薫之介</td>
              </tr>
              <tr>
                <td>所在地</td>
                <td>
                  〒104-0061 東京都中央区銀座1丁目12番4号 N&amp;E BLD.6F
                </td>
              </tr>
              <tr>
                <td>電話番号</td>
                <td>050-1794-9630</td>
              </tr>
              <tr>
                <td>電話受付時間</td>
                <td>
                  お問い合わせは原則としてメールまたはフォームよりお願いいたします。
                </td>
              </tr>
              <tr>
                <td>メールアドレス</td>
                <td>info@closer-official.com</td>
              </tr>
              <tr>
                <td>販売価格</td>
                <td>
                  各プランは料金ページに記載の税別・目安をご参照ください。正式な金額はご契約内容の確認段階で確定します。
                </td>
              </tr>
              <tr>
                <td>支払い方法</td>
                <td>
                  銀行振込（一括または分割）、PayPay、Stripe（クレジットカード等）
                </td>
              </tr>
              <tr>
                <td>引き渡し時期</td>
                <td>ご契約後、制作完了次第公開・納品</td>
              </tr>
              <tr>
                <td>返金・キャンセル</td>
                <td>
                  制作着手後の返金には対応しておりません。詳細はご契約内容確認ページにてご案内します。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CloserShell>
  );
}
