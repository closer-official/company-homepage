import { DIVIZERO_LINE_URL } from "@/lib/divizero";

const METRICS = [
  {
    value: "40%",
    label: "DM返信率",
    note: "業界平均2〜4%に対して",
  },
  {
    value: "¥0",
    label: "初期費用",
    note: "完全成果報酬・固定費ゼロ",
  },
  {
    value: "100%",
    label: "ブランド保全",
    note: "URL誘導なし・テキストのみ",
  },
];

const STRENGTHS = [
  {
    title: "テンプレートを使わない",
    text: "クライアントのアカウント特性を毎回ゼロから分析。同じ文面を使い回さないから、受け取る側に「この人に向けたメッセージだ」と感じてもらえます。",
  },
  {
    title: "データで動く",
    text: "返信が来やすい文面・時間帯・ターゲットをデータで設計します。感覚ではなく、蓄積された数字に基づいてアプローチするから、返信率40%という数字が出ます。",
  },
  {
    title: "ブランドを傷つけない",
    text: "URLへの誘導は一切行いません。テキストチャットだけで自然にアポを獲得する仕組みを構築。あなたのアカウントの信頼を守りながら商談を量産します。",
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
          返信率・コスト効率・ブランド保全。divizeroが目指すのは、見た目ではなく数字で出る成果です。
        </p>
      </div>

      <div className="closer-works-metrics">
        {METRICS.map((m) => (
          <div key={m.label} className="closer-works-metric-card">
            <div className="closer-works-metric-value">{m.value}</div>
            <div className="closer-works-metric-label">{m.label}</div>
            <div className="closer-works-metric-note">{m.note}</div>
          </div>
        ))}
      </div>

      <div className="closer-works-context">
        <span className="closer-section-label">What the numbers mean</span>
        <h2 className="closer-section-title">
          返信率40%とは、<em>どういう意味か</em>。
        </h2>
        <p className="closer-works-context-text">
          一般的なDM営業では、100件送って返信が来るのは2〜4件です。divizeroでは同じ100件で38〜40件から返信が来ます。これはターゲット選定・文面設計・送信時間の最適化を組み合わせた結果であり、テンプレートの使い回しでは絶対に出ない数字です。
        </p>
        <p className="closer-works-context-text">
          返信が来ること自体がゴールではありません。返信してきた相手の中から「本当に前向きな人だけ」を選別し、あなたのカレンダーに商談として届けます。
        </p>
      </div>

      <div className="closer-works-strengths">
        <span className="closer-section-label">How we achieve this</span>
        <h2 className="closer-section-title">
          この数字が出る<em>3つの理由</em>。
        </h2>
        <div className="closer-works-strengths-grid">
          {STRENGTHS.map((s) => (
            <div key={s.title} className="closer-works-strength-card">
              <h3 className="closer-works-strength-title">{s.title}</h3>
              <p className="closer-works-strength-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="closer-cta-section">
        <span className="closer-cta-label">Start</span>
        <h2 className="closer-cta-title">
          次は、あなたの<em>数字</em>を作りましょう。
        </h2>
        <p className="closer-cta-sub">
          公式LINEから、無料でご相談いただけます。初期費用ゼロなので、まず話を聞くだけでも大丈夫です。
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
