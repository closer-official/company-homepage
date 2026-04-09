import Link from "next/link";

export default function CloserPricing() {
  return (
    <>
      <div className="closer-pricing-hero">
        <span className="closer-section-label">Pricing</span>
        <h1 className="closer-page-hero-title">
          ご予算や必要な範囲に応じた<em>プラン（目安）</em>。
        </h1>
        <p className="closer-page-hero-lead">
          ここに掲載している金額は<strong>税別の目安</strong>です。正式な内容・お見積りは、無料相談のうえで整理し、ご契約内容の確認段階で確定します。
        </p>
      </div>
      <div className="closer-pricing-soft-band">
        まだ「どのプランが合うか分からない」段階でも問題ありません。まずは状況をお聞きし、必要な範囲だけを一緒に決めていきます。
      </div>
      <div className="closer-pricing-cards">
        <div className="closer-pricing-card">
          <div className="closer-pricing-badge closer-pricing-badge--placeholder" aria-hidden>
            ‌
          </div>
          <div className="closer-pricing-plan">Light Plan</div>
          <div className="closer-pricing-price">¥30,000</div>
          <div className="closer-pricing-unit">一括払いのみ / 税別・目安</div>
          <ul className="closer-pricing-features">
            <li>既存テンプレートへの情報流し込み</li>
            <li>修正1回まで無料</li>
            <li>利用想定期間：1年</li>
            <li>独自ドメイン費用は別途</li>
            <li>更新代行なし</li>
          </ul>
          <Link href="/contact" className="closer-btn-secondary">
            相談する
          </Link>
        </div>
        <div className="closer-pricing-card featured">
          <div className="closer-pricing-badge">人気プラン</div>
          <div className="closer-pricing-plan">Standard Plan</div>
          <div className="closer-pricing-price">¥100,000</div>
          <div className="closer-pricing-unit">一括 or 分割対応 / 税別・目安</div>
          <ul className="closer-pricing-features">
            <li>テンプレートをベースにした本制作</li>
            <li>修正3回まで無料</li>
            <li>利用想定期間：5年</li>
            <li>導線整備込み</li>
            <li>公開作業込み</li>
            <li>独自ドメイン費用は別途</li>
            <li>更新代行なし</li>
          </ul>
          <Link href="/contact" className="closer-btn-gold">
            相談する
          </Link>
        </div>
        <div className="closer-pricing-card">
          <div className="closer-pricing-badge closer-pricing-badge--placeholder" aria-hidden>
            ‌
          </div>
          <div className="closer-pricing-plan">Full Support Plan</div>
          <div className="closer-pricing-price">¥200,000</div>
          <div className="closer-pricing-unit">一括 or 分割対応 / 税別・目安</div>
          <ul className="closer-pricing-features">
            <li>Standardプランの内容一式</li>
            <li>修正3回まで無料</li>
            <li>利用想定期間：5年</li>
            <li>更新代行付き</li>
            <li>SNS導線更新・お知らせ反映（週2回まで）</li>
            <li>独自ドメイン費用は別途</li>
          </ul>
          <Link href="/contact" className="closer-btn-secondary">
            相談する
          </Link>
        </div>
      </div>
      <div className="closer-pricing-note">
        分割払いの内容や総支払額はプランによって異なります。確定した条件は、ご契約内容の確認ページにてご案内します。
      </div>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Contact</span>
        <h2 className="closer-cta-title">
          まずは<em>無料相談</em>から。
        </h2>
        <p className="closer-cta-sub">
          「どのプランが合うか分からない」という段階でも問題ありません。
        </p>
        <Link href="/contact" className="closer-btn-gold">
          無料で相談する
        </Link>
      </section>
    </>
  );
}
