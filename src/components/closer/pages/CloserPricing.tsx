import Link from "next/link";
import { DIVIZERO_LINE_URL } from "@/lib/divizero";

export default function CloserPricing() {
  return (
    <>
      <div className="closer-pricing-hero">
        <span className="closer-section-label">Pricing</span>
        <h1 className="closer-page-hero-title">
          完全成果報酬で、<em>リスクなく</em>始められる。
        </h1>
        <p className="closer-page-hero-lead">
          他社の1.5万円〜に対し、divizeroは<strong>1アポ5,000円〜</strong>。仕組み化によるコストカットで、この価格を実現しています。
        </p>
      </div>
      <div className="closer-pricing-soft-band">
        商材単価が5万円を超える場合は、成約時報酬10%プランも選択可能です。詳細はトップページの報酬シミュレーターでご確認ください。
      </div>
      <div className="closer-pricing-cards">
        <div className="closer-pricing-card">
          <div className="closer-pricing-badge closer-pricing-badge--placeholder" aria-hidden>
            ‌
          </div>
          <div className="closer-pricing-plan">他社（業界平均）</div>
          <div className="closer-pricing-price">1.5万円〜</div>
          <div className="closer-pricing-unit">アポ単価・初期費用込みの目安</div>
          <ul className="closer-pricing-features">
            <li>最低保証・初期費用が発生しやすい</li>
            <li>テンプレート営業が多い</li>
            <li>返信率2〜4%が一般的</li>
            <li>人件費・維持費が価格に上乗せ</li>
          </ul>
        </div>
        <div className="closer-pricing-card featured">
          <div className="closer-pricing-badge">divizero</div>
          <div className="closer-pricing-plan">成果報酬プラン</div>
          <div className="closer-pricing-price">¥5,000〜</div>
          <div className="closer-pricing-unit">1アポ・完全成果報酬</div>
          <ul className="closer-pricing-features">
            <li>返信率40%のDM運用</li>
            <li>アカウント個別最適化</li>
            <li>データドリブンな文面・時間設計</li>
            <li>2段階ステルスアプローチ</li>
            <li>商材単価5万円超は10%プラン選択可</li>
          </ul>
          <a
            href={DIVIZERO_LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="closer-btn-gold"
          >
            公式LINEで相談する
          </a>
        </div>
        <div className="closer-pricing-card">
          <div className="closer-pricing-badge closer-pricing-badge--placeholder" aria-hidden>
            ‌
          </div>
          <div className="closer-pricing-plan">安さの理由</div>
          <div className="closer-pricing-price" style={{ fontSize: "1.4rem" }}>
            仕組み化
          </div>
          <div className="closer-pricing-unit">オペレーションの無駄を排除</div>
          <ul className="closer-pricing-features">
            <li>無駄な人件費を削減</li>
            <li>システム維持費の最適化</li>
            <li>データに基づく効率運用</li>
            <li>フルコミ営業の設計</li>
          </ul>
          <Link href="/#simulator" className="closer-btn-secondary">
            報酬を試算する
          </Link>
        </div>
      </div>
      <div className="closer-pricing-note">
        正式な条件・適用プランは、ヒアリング後にご案内します。トップページのシミュレーターは目安です。
      </div>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Start</span>
        <h2 className="closer-cta-title">
          まずは<em>無料相談</em>から。
        </h2>
        <p className="closer-cta-sub">
          商材単価・ターゲット・現状の課題をお聞きし、最適なプランをご提案します。
        </p>
        <a
          href={DIVIZERO_LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="closer-btn-gold"
        >
          divizeroに営業を丸投げして制作に集中する（公式LINE登録）
        </a>
      </section>
    </>
  );
}
