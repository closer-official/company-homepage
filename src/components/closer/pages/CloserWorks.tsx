import { DIVIZERO_LINE_URL } from "@/lib/divizero";

const CASES = [
  {
    cat: "クリエイター — DM営業代行",
    title: "Webデザイナー（個人）様",
    desc: "100件DMで返信2件→divizero導入後、返信率38%を達成。制作時間を週15時間確保。",
    metric: "返信率 38%",
  },
  {
    cat: "フリーランス — 営業丸投げ",
    title: "動画クリエイター様",
    desc: "営業が心理的ハードルで止まっていたが、2段階ステルスアプローチで月8アポ獲得。",
    metric: "月8アポ",
  },
  {
    cat: "副業クリエイター — 成果報酬",
    title: "イラストレーター様",
    desc: "1アポ5,000円プランでリスクなく開始。商材単価に合わせたターゲット選定で成約率向上。",
    metric: "完全成果報酬",
  },
];

const VOICES = [
  {
    text: "営業に時間を取られていたのが一番の悩みでした。divizeroに任せてから、制作に集中できるようになり、案件の質も上がりました。",
    meta: "Webデザイナー（個人）様",
  },
  {
    text: "テンプレート営業とは違い、アカウントに合わせた文面設計が印象的でした。返信が来るようになって、ようやく事業が回り始めた感覚です。",
    meta: "フリーランス動画クリエイター様",
  },
];

export default function CloserWorks() {
  return (
    <>
      <div className="closer-works-hero">
        <span className="closer-section-label">Results</span>
        <h1 className="closer-page-hero-title">
          数字で見る<em>営業成果</em>。
        </h1>
        <p className="closer-page-hero-lead">
          返信率・獲得アポ数・コスト効率。divizeroが目指すのは、見た目ではなく成果です。
        </p>
      </div>
      <div className="closer-works-demo-banner" role="note">
        <strong>ご案内：</strong>
        以下は構成イメージ用の<strong>事例サンプル</strong>です。正式な実績数値は個別にご案内します。
      </div>
      <div className="closer-works-grid">
        {CASES.map((c) => (
          <article key={c.title} className="closer-work-card">
            <div className="closer-work-thumb">
              <div className="closer-work-thumb-inner dz-work-metric">
                <span className="dz-work-metric-value">{c.metric}</span>
              </div>
            </div>
            <div className="closer-work-info">
              <div className="closer-work-cat">{c.cat}</div>
              <div className="closer-work-title">{c.title}</div>
              <p className="closer-work-desc">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="closer-works-voice-section">
        <span className="closer-section-label">Voice</span>
        <h2 className="closer-section-title">
          クライアントの<em>声</em>
        </h2>
        <p className="closer-features-desc" style={{ marginBottom: "24px" }}>
          営業代行を利用したクリエイターからのフィードバック（イメージ）です。
        </p>
        <div className="closer-works-voice-grid">
          {VOICES.map((v) => (
            <div key={v.meta} className="closer-voice-card">
              <p className="closer-voice-text">&quot;{v.text}&quot;</p>
              <p className="closer-voice-meta">{v.meta}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Start</span>
        <h2 className="closer-cta-title">
          次は、あなたの<em>数字</em>を作りましょう。
        </h2>
        <p className="closer-cta-sub">公式LINEから、無料でご相談いただけます。</p>
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
