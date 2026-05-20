import Link from "next/link";
import { DIVIZERO_LINE_URL } from "@/lib/divizero";

const FAQ_ITEMS = [
  {
    q: "本当に初期費用・月額費用はゼロですか？",
    a: "はい。アポが確定した時点で初めて費用が発生します。成果が出るまで、一切お金はかかりません。",
  },
  {
    q: "どちらのプランを選べばいいですか？",
    a: "商材単価が5万円以下なら「1アポ5,000円プラン」が割安です。5万円を超える案件が中心であれば「成約時10%プラン」の方がROIが合うケースが多くなります。迷ったらLINEでご相談ください。",
  },
  {
    q: "いつでも辞められますか？",
    a: "はい。縛りはありません。アポが来なければ費用もかかりません。",
  },
];

export default function CloserPricing() {
  return (
    <>
      <div className="closer-pricing-hero">
        <span className="closer-section-label">Pricing</span>
        <h1 className="closer-page-hero-title">
          売上が出るまで、<em>一切費用はかかりません</em>。
        </h1>
        <p className="closer-page-hero-lead">
          完全成果報酬だから、リスクはゼロ。チームが本気を出す理由は「成果が出ないと報酬がゼロだから」です。
        </p>
      </div>

      <div className="closer-pricing-soft-band">
        商材単価が5万円を超える場合は、成約時報酬10%プランも選択可能です。詳細はトップページの報酬シミュレーターでご確認ください。
      </div>

      <div className="closer-pricing-cards">
        <div className="closer-pricing-card">
          <div
            className="closer-pricing-badge closer-pricing-badge--placeholder"
            aria-hidden
          >
            ‌
          </div>
          <div className="closer-pricing-plan">他社（業界平均）</div>
          <div className="closer-pricing-price">1.5万円〜</div>
          <div className="closer-pricing-unit">アポ単価・初期費用込みの目安</div>
          <ul className="closer-pricing-features">
            <li>最低保証・初期費用が発生しやすい</li>
            <li>成果が出なくても費用がかかるケースあり</li>
            <li>テンプレート営業が多い</li>
            <li>返信率2〜4%が一般的</li>
          </ul>
        </div>

        <div className="closer-pricing-card featured">
          <div className="closer-pricing-badge">divizero（推奨）</div>
          <div className="closer-pricing-plan">完全成果報酬プラン</div>
          <div className="closer-pricing-price">¥5,000〜</div>
          <div className="closer-pricing-unit">1アポ確定・完全成果報酬</div>
          <ul className="closer-pricing-features">
            <li>初期費用・月額費用ゼロ</li>
            <li>返信率40%のDM運用</li>
            <li>アカウント個別最適化</li>
            <li>データドリブンな文面・時間設計</li>
            <li>商材単価5万円超は成約10%プラン選択可</li>
          </ul>
          <a
            href={DIVIZERO_LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="closer-btn-gold"
          >
            まずは無料相談（公式LINE）
          </a>
        </div>

        <div className="closer-pricing-card">
          <div
            className="closer-pricing-badge closer-pricing-badge--placeholder"
            aria-hidden
          >
            ‌
          </div>
          <div className="closer-pricing-plan">この価格が実現できる理由</div>
          <div className="closer-pricing-price" style={{ fontSize: "1.4rem" }}>
            仕組み化
          </div>
          <div className="closer-pricing-unit">無駄なコストを徹底排除</div>
          <ul className="closer-pricing-features">
            <li>無駄な人件費を削減</li>
            <li>システム維持費の最適化</li>
            <li>データに基づく効率運用</li>
            <li>完全成果報酬だから固定費ゼロ</li>
          </ul>
          <Link href="/#simulator" className="closer-btn-secondary">
            報酬を試算する
          </Link>
        </div>
      </div>

      <div className="closer-pricing-guide">
        <span className="closer-section-label">Plan Guide</span>
        <h2 className="closer-section-title">どちらのプランを選べばいい？</h2>
        <div className="closer-pricing-guide-grid">
          <div className="closer-pricing-guide-card">
            <p className="closer-pricing-guide-label">1アポ5,000円プランが向いている方</p>
            <p className="closer-pricing-guide-text">
              商材単価が5万円以下の方。まず少ないリスクでお試ししたい方。アポ数を優先したい方。
            </p>
          </div>
          <div className="closer-pricing-guide-card">
            <p className="closer-pricing-guide-label">成約時10%プランが向いている方</p>
            <p className="closer-pricing-guide-text">
              商材単価が5万円を超える方。成約数より受注単価を重視したい方。高単価案件を量産したい方。
            </p>
          </div>
        </div>
      </div>

      <div className="closer-pricing-faq">
        <span className="closer-section-label">FAQ</span>
        <h2 className="closer-section-title">よくある質問</h2>
        <div className="dz-faq-list">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="dz-faq-item">
              <p className="dz-faq-q">{item.q}</p>
              <p className="dz-faq-a">{item.a}</p>
            </div>
          ))}
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
          商材単価・ターゲット・現状の課題をお聞きし、最適なプランをご提案します。話を聞くだけでも大丈夫です。
        </p>
        <a
          href={DIVIZERO_LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="closer-btn-gold"
        >
          まずは無料相談（公式LINE）
        </a>
      </section>
    </>
  );
}
