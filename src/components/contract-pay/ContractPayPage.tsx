"use client";

import { useCallback, useState } from "react";
import "./contract-pay.css";

type PlanId = "plan30" | "plan100" | "plan200";

const AGREEMENT_ITEMS = [
  "ご契約プランの内容および料金（税込）を確認しました。",
  "一括払いと分割払いでは総支払額が異なる場合があることを確認しました。",
  "分割払いを選択する場合、初回50,000円は制作着手金として扱われることを理解しました。",
  "修正の無料回数と、それを超えた場合に別途費用が発生することを理解しました。",
  "デモページは仮情報を用いたサンプルであり、完成品とは異なることを理解しました。",
  "独自ドメイン費用は別途実費が必要であることを確認しました。",
  "制作着手後の返金に対応していないことを確認しました。",
  "分割払いを選択した場合、お支払いが停止するとページの公開・更新対応が停止されることを理解しました。",
  "お支払い方法を確認のうえ、申し込む意思があります。",
] as const;

export default function ContractPayPage() {
  const [activePlan, setActivePlan] = useState<PlanId>("plan30");
  const [payment, setPayment] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const selectPayment = useCallback((value: string) => {
    setPayment(value);
  }, []);

  const handleCta = useCallback(() => {
    if (!payment) {
      window.alert("お支払い方法をお選びください。");
      return;
    }
    window.alert(
      "ご確認ありがとうございます。\n担当者よりお支払い先のご案内をお送りします。",
    );
  }, [payment]);

  return (
    <div className="contract-pay-page">
      <div className="page-wrap">
        <header className="site-header">
          <div className="header-brand">Closer by divizero</div>
          <div className="header-operator">運営元：Closer事務局</div>
          <h1 className="header-title">ご契約内容・お支払い案内</h1>
          <p className="header-subtitle">
            お申し込みの前に、内容をご確認ください
          </p>
        </header>

        <section className="section">
          <div className="section-label">01 — ご契約内容</div>
          <div className="plan-tabs">
            <button
              type="button"
              className={`plan-tab ${activePlan === "plan30" ? "active" : ""}`}
              onClick={() => setActivePlan("plan30")}
            >
              30,000円プラン
            </button>
            <button
              type="button"
              className={`plan-tab ${activePlan === "plan100" ? "active" : ""}`}
              onClick={() => setActivePlan("plan100")}
            >
              100,000円プラン
            </button>
            <button
              type="button"
              className={`plan-tab ${activePlan === "plan200" ? "active" : ""}`}
              onClick={() => setActivePlan("plan200")}
            >
              200,000円プラン
            </button>
          </div>

          <div
            className={`plan-card ${activePlan === "plan30" ? "active" : ""}`}
            id="plan30"
          >
            <div className="card">
              <div className="plan-name">スタンダードプラン</div>
              <div className="plan-price-block">
                <span className="plan-price-label">ご契約金額（税込）</span>
                <span className="plan-price-amount">¥30,000</span>
                <span className="plan-price-tax">税込 / 一括のみ</span>
              </div>
              <div className="plan-detail-grid">
                <div className="plan-detail-item">
                  <span className="plan-detail-key">お支払い方法</span>
                  <span className="plan-detail-val">一括払いのみ</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">利用想定期間</span>
                  <span className="plan-detail-val">約1年</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">制作内容</span>
                  <span className="plan-detail-val">
                    既存テンプレートへの情報流し込み
                  </span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">無料修正回数</span>
                  <span className="plan-detail-val">1回まで無料</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">独自ドメイン費用</span>
                  <span className="plan-detail-val">別途実費</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">更新代行</span>
                  <span className="plan-detail-val">含まない</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`plan-card ${activePlan === "plan100" ? "active" : ""}`}
            id="plan100"
          >
            <div className="card">
              <div className="plan-name">スタンダード制作プラン</div>
              <div className="plan-price-block">
                <span className="plan-price-label">一括払い</span>
                <span className="plan-price-amount">¥100,000</span>
                <span className="plan-price-tax">税込</span>
              </div>
              <div className="installment-block">
                <div className="installment-label">分割払いの場合</div>
                <div className="installment-row">
                  <span className="installment-item">
                    初回 <strong>¥50,000</strong>
                    <span className="inst-tax">（税込）</span>
                  </span>
                  <span className="installment-sep">＋</span>
                  <span className="installment-item">
                    月々 <strong>¥5,000</strong>
                    <span className="inst-tax">（税込）</span> × 12か月
                  </span>
                </div>
                <div className="installment-total">
                  分割払い総額：<strong>¥110,000（税込）</strong>
                  <span className="installment-diff">
                    ※ 一括より10,000円多くなります
                  </span>
                </div>
              </div>
              <div className="plan-detail-grid plan-detail-grid-spaced">
                <div className="plan-detail-item">
                  <span className="plan-detail-key">利用想定期間</span>
                  <span className="plan-detail-val">約5年</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">制作内容</span>
                  <span className="plan-detail-val">
                    テンプレートをベースにした本制作・導線整備・公開作業込み
                  </span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">無料修正回数</span>
                  <span className="plan-detail-val">3回まで無料</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">独自ドメイン費用</span>
                  <span className="plan-detail-val">別途実費</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">更新代行</span>
                  <span className="plan-detail-val">含まない</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`plan-card ${activePlan === "plan200" ? "active" : ""}`}
            id="plan200"
          >
            <div className="card">
              <div className="plan-name">フルサポートプラン</div>
              <div className="plan-price-block">
                <span className="plan-price-label">一括払い</span>
                <span className="plan-price-amount">¥200,000</span>
                <span className="plan-price-tax">税込</span>
              </div>
              <div className="installment-block">
                <div className="installment-label">分割払いの場合</div>
                <div className="installment-row">
                  <span className="installment-item">
                    初回 <strong>¥50,000</strong>
                    <span className="inst-tax">（税込）</span>
                  </span>
                  <span className="installment-sep">＋</span>
                  <span className="installment-item">
                    月々 <strong>¥15,000</strong>
                    <span className="inst-tax">（税込）</span> × 12か月
                  </span>
                </div>
                <div className="installment-total">
                  分割払い総額：<strong>¥230,000（税込）</strong>
                  <span className="installment-diff">
                    ※ 一括より30,000円多くなります
                  </span>
                </div>
                <div className="installment-note">
                  ※
                  月額には制作物の利用継続費用および更新代行費用が含まれます
                </div>
              </div>
              <div className="plan-detail-grid plan-detail-grid-spaced">
                <div className="plan-detail-item">
                  <span className="plan-detail-key">利用想定期間</span>
                  <span className="plan-detail-val">約5年</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">制作内容</span>
                  <span className="plan-detail-val">
                    本制作・導線整備・公開作業込み（スタンダード制作プランの内容一式）
                  </span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">無料修正回数</span>
                  <span className="plan-detail-val">3回まで無料</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">独自ドメイン費用</span>
                  <span className="plan-detail-val">別途実費</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">更新代行</span>
                  <span className="plan-detail-val">
                    含む <span className="badge">週2回まで</span>
                  </span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-key">更新内容</span>
                  <span className="plan-detail-val">
                    SNS導線の更新・お知らせの反映など
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-label">02 — 修正・更新について</div>
          <div className="card">
            <div className="info-box notice-box-mb">
              <div className="info-box-title">修正について</div>
              <p>
                修正は、コードの変更を伴う対応を指します（レイアウトの変更・デザインの変更・構造の組み替えなど）。
                <br />
                プランに含まれる無料修正回数を超えた場合、または大幅な変更の場合は別途お見積りとなります。
                <br />
                ※ スタンダードプランは1回まで、その他のプランは3回まで無料です。
              </p>
            </div>
            <div className="info-box info-box-last">
              <div className="info-box-title">
                更新について（フルサポートプランのみ）
              </div>
              <p>
                更新とは、専用の編集ページから対応できる範囲の作業です（SNS導線の変更・お知らせの反映など）。
                <br />
                フルサポートプランには、週2回までの更新代行が含まれます。
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-label">03 — デモページについて</div>
          <div className="notice-box">
            <div className="notice-box-title">ご確認ください</div>
            <p>
              事前にご覧いただいたデモページは、仮情報およびフリー素材を使用したサンプルです。完成品そのものではございません。
              <br />
              正式なご制作の際には、実際の店舗情報・写真・ご要望をもとに内容を整え、お客様のお店に合わせた形に仕上げてまいります。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">04 — ご注意事項</div>
          <div className="notice-box notice-box-mb">
            <div className="notice-box-title">制作着手金・返金について</div>
            <p>
              分割払いをご選択の場合、初回のお支払い（50,000円）は制作着手金として扱われます。
              <br />
              制作に着手した後の返金には対応しておりません。ご契約内容・料金・修正範囲をよくご確認のうえ、お申し込みください。
            </p>
          </div>
          <div className="notice-box">
            <div className="notice-box-title">分割払いをご選択の場合</div>
            <p>
              分割払いは、一括払いとは総支払額が異なります（プランにより1万〜3万円の差があります）。
              <br />
              また、分割払いはサービスの利用継続を含むお支払い方法です。12か月間の継続払いを前提としており、お支払い期間中にご入金が停止した場合、ページの公開および更新対応は停止されます。
              <br />
              未払い分の取り扱いについては、契約条件に従います。あらかじめご了承ください。
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">05 — お支払い方法</div>
          <p className="text-small" style={{ marginBottom: 18 }}>
            ご希望のお支払い方法をお選びください。選択後、担当者よりお支払い先の詳細をご案内いたします。
          </p>
          <div className="payment-options">
            <label
              className={`payment-option ${payment === "bank" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={payment === "bank"}
                onChange={() => selectPayment("bank")}
              />
              <div className="payment-option-icon" aria-hidden>
                🏦
              </div>
              <div className="payment-option-body">
                <div className="payment-option-name">銀行振込</div>
                <div className="payment-option-desc">
                  振込先口座は別途ご案内いたします
                </div>
              </div>
            </label>
            <label
              className={`payment-option ${payment === "paypay" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                value="paypay"
                checked={payment === "paypay"}
                onChange={() => selectPayment("paypay")}
              />
              <div className="payment-option-icon" aria-hidden>
                💳
              </div>
              <div className="payment-option-body">
                <div className="payment-option-name">PayPay</div>
                <div className="payment-option-desc">
                  QRコードまたは送金リンクをご案内いたします
                </div>
              </div>
            </label>
            <label
              className={`payment-option ${payment === "card" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={payment === "card"}
                onChange={() => selectPayment("card")}
              />
              <div className="payment-option-icon" aria-hidden>
                💳
              </div>
              <div className="payment-option-body">
                <div className="payment-option-name">カード決済</div>
                <div className="payment-option-desc">
                  決済ページのURLを別途ご送付いたします
                </div>
              </div>
            </label>
          </div>
        </section>

        <section className="section">
          <div className="section-label">06 — 内容確認・同意</div>
          <div className="agreement-card">
            <p className="text-small" style={{ marginBottom: 20 }}>
              お申し込みの前に、以下の内容をご確認ください。すべての項目をご確認いただけましたら、下のチェックボックスにチェックを入れてください。
            </p>
            <ul className="agreement-list">
              {AGREEMENT_ITEMS.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <div className="agreement-checkbox-row">
              <input
                type="checkbox"
                id="agree-check"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label className="agreement-checkbox-label" htmlFor="agree-check">
                上記の
                <strong>
                  ご契約内容・料金・修正範囲・利用条件・お支払い条件
                </strong>
                を確認しました。内容に同意のうえ、お申し込みに進みます。
              </label>
            </div>
          </div>
        </section>

        <div className="cta-section">
          <button
            type="button"
            className={`cta-btn ${agreed ? "enabled" : ""}`}
            disabled={!agreed}
            onClick={handleCta}
          >
            お支払い手続きへ進む
          </button>
          <p className="cta-note">
            ※ 同意チェックを入れるとボタンが有効になります
            <br />※
            ボタン押下後、ご選択のお支払い方法に応じた案内をお送りします
          </p>
        </div>

        <footer className="site-footer">
          <div className="footer-brand">Closer by divizero</div>
          <p className="footer-meta">運営元：Closer事務局</p>
        </footer>
      </div>
    </div>
  );
}
