import { DIVIZERO_LINE_URL } from "@/lib/divizero";

const SERVICES = [
  {
    num: "Service — 01",
    name: "あなたに興味を持ちそうな人だけに、届ける",
    subname: "アカウント最適化 & ターゲット選定",
    desc: "テンプレートの使い回しは一切しません。あなたのアカウント特性を徹底分析し、最も成約可能性の高いターゲットに絞り込みます。「誰に送るか」を間違えると、どれだけ良い文面でも響きません。ブランドを傷つけないオーダーメイドのアプローチ設計が、divizeroの出発点です。",
    tags: ["個別分析", "ターゲット精査", "ブランド保全"],
  },
  {
    num: "Service — 02",
    name: "返信が来やすい相手に、来やすい時間に送る",
    subname: "データハックDM運用",
    desc: "蓄積データから「最も返信が来やすい文面」「最もアクティブな曜日・時間帯」をシステム化。感覚や経験則に頼らず、データに基づいてピンポイントでアプローチするため、一般的な返信率2〜4%を40%まで引き上げることができます。",
    tags: ["文面最適化", "送信時間設計", "返信率40%"],
  },
  {
    num: "Service — 03",
    name: "テキストだけで、自然にアポを取る",
    subname: "2段階ステルスアプローチ",
    desc: "怪しいURLを踏ませるような営業は一切しません。DM内の丁寧なテキストチャットだけで会話を完結させ、クライアントのカレンダーにZoom面談を直接入れます。不信感を生まず、あなたのブランドを守りながら商談を量産します。",
    tags: ["会話型営業", "URL不要", "アポ獲得"],
  },
];

const GENRES = [
  "Web制作・LP制作",
  "SNS運用代行",
  "動画制作・編集",
  "コンサルティング",
  "AIコンテンツ制作",
  "グラフィックデザイン",
  "その他・無形商材全般",
];

export default function CloserServices() {
  return (
    <div className="dz-subpage">
      <div className="closer-services-hero dz-reveal is-visible">
        <div className="closer-services-hero-grid">
          <div className="closer-services-hero-main">
            <span className="closer-section-label">Services</span>
            <h1 className="closer-page-hero-title closer-page-hero-title--ruled">
              クリエイターの<em>営業代行</em>を、データで設計する。
            </h1>
          </div>
          <p className="closer-page-hero-lead">
            アカウント分析からDM運用・アポ獲得まで。あなたがやることは、届いた商談の対応だけです。
          </p>
        </div>
      </div>

      <div className="closer-services-grid dz-reveal-stagger">
        {SERVICES.map((s) => (
          <div key={s.num} className="closer-service-card dz-glass-card">
            <span className="closer-service-num dz-num">{s.num}</span>
            <h2 className="closer-service-name">{s.name}</h2>
            <p className="closer-service-subname">{s.subname}</p>
            <p className="closer-service-desc">{s.desc}</p>
            <div className="closer-service-tags">
              {s.tags.map((tag) => (
                <span key={tag} className="closer-service-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="closer-services-genres dz-reveal">
        <span className="closer-section-label">対応ジャンル</span>
        <h2 className="closer-section-title closer-section-title--ruled">
          SNSで届ける無形商材なら、<em>すべて対応</em>。
        </h2>
        <p className="closer-service-desc" style={{ marginBottom: "32px", maxWidth: "600px" }}>
          共通するのは「SNSを通じて届ける無形商材」であること。ジャンルや経験年数を問わず、まずはご相談ください。
        </p>
        <div className="closer-services-genre-grid dz-reveal-stagger">
          {GENRES.map((g) => (
            <div key={g} className="closer-genre-tag dz-glass-card">
              {g}
            </div>
          ))}
        </div>
      </div>

      <div className="closer-services-flow dz-reveal">
        <span className="closer-section-label">How it works</span>
        <h2 className="closer-section-title closer-section-title--ruled">
          LINE登録から、<em>商談が届くまで</em>。
        </h2>
        <div className="closer-services-flow-steps dz-reveal-stagger">
          <div className="closer-services-flow-step dz-glass-card">
            <span className="closer-services-flow-num dz-num">01</span>
            <p>公式LINEに登録し、商材・ターゲット・課題をヒアリング</p>
          </div>
          <div className="closer-services-flow-step dz-glass-card">
            <span className="closer-services-flow-num dz-num">02</span>
            <p>アカウント分析・ターゲット設計・文面設計</p>
          </div>
          <div className="closer-services-flow-step dz-glass-card">
            <span className="closer-services-flow-num dz-num">03</span>
            <p>チームがDM運用・返信対応・日程調整を代行</p>
          </div>
          <div className="closer-services-flow-step dz-glass-card">
            <span className="closer-services-flow-num dz-num">04</span>
            <p>前向きな方だけあなたのカレンダーに商談を届ける</p>
          </div>
        </div>
        <p className="closer-flow-note dz-glass-card">
          URLへの誘導は一切行いません。テキストチャットだけで自然にアポを獲得する仕組みを構築しているため、あなたのブランドに傷がつきません。
        </p>
      </div>

      <section className="closer-cta-section dz-reveal">
        <span className="closer-cta-label">Start</span>
        <h2 className="closer-cta-title">
          営業設計を<em>一緒に</em>始めましょう。
        </h2>
        <p className="closer-cta-sub">
          公式LINEから、最短ルートでご相談いただけます。初期費用ゼロ・完全成果報酬なので、まず話を聞くだけでも大丈夫です。
        </p>
        <a
          href={DIVIZERO_LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="closer-btn-gold closer-btn-gold--shine"
        >
          まずは無料相談（公式LINE）
        </a>
      </section>
    </div>
  );
}
