import { DIVIZERO_LINE_URL } from "@/lib/divizero";

export default function CloserServices() {
  return (
    <>
      <div className="closer-services-hero">
        <span className="closer-section-label">Services</span>
        <h1 className="closer-page-hero-title">
          クリエイターの<em>営業代行</em>を、データで設計する。
        </h1>
        <p className="closer-page-hero-lead">
          アカウント分析からDM運用・アポ獲得まで。制作に集中できる環境を、丸ごとお任せください。
        </p>
      </div>
      <div className="closer-services-grid">
        <div className="closer-service-card">
          <span className="closer-service-num">Service — 01</span>
          <h2 className="closer-service-name">アカウント最適化 & ターゲット選定</h2>
          <p className="closer-service-desc">
            テンプレートの使い回しは一切しません。あなたのアカウント特性を分析し、最も成約可能性の高いターゲットに絞り込みます。
          </p>
          <div className="closer-service-tags">
            <span className="closer-service-tag">個別分析</span>
            <span className="closer-service-tag">ターゲット精査</span>
            <span className="closer-service-tag">ブランド保全</span>
          </div>
        </div>
        <div className="closer-service-card">
          <span className="closer-service-num">Service — 02</span>
          <h2 className="closer-service-name">データハックDM運用</h2>
          <p className="closer-service-desc">
            蓄積データから「返信が来やすい文面」「アクティブな曜日・時間帯」をシステム化。ピンポイントアプローチでコスパ・タイパを最大化します。
          </p>
          <div className="closer-service-tags">
            <span className="closer-service-tag">文面最適化</span>
            <span className="closer-service-tag">送信時間設計</span>
            <span className="closer-service-tag">返信率40%</span>
          </div>
        </div>
        <div className="closer-service-card">
          <span className="closer-service-num">Service — 03</span>
          <h2 className="closer-service-name">2段階ステルスアプローチ</h2>
          <p className="closer-service-desc">
            怪しいURLを踏ませる営業はしません。DM内の丁寧なテキストチャットだけで会話を完結させ、カレンダーをアポで埋め尽くします。
          </p>
          <div className="closer-service-tags">
            <span className="closer-service-tag">会話型営業</span>
            <span className="closer-service-tag">URL不要</span>
            <span className="closer-service-tag">アポ獲得</span>
          </div>
        </div>
      </div>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Start</span>
        <h2 className="closer-cta-title">
          営業設計を<em>一緒に</em>始めましょう。
        </h2>
        <p className="closer-cta-sub">公式LINEから、最短ルートでご相談いただけます。</p>
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
