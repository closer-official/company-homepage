import DivizeroRewardSimulator from "../DivizeroRewardSimulator";
import { DIVIZERO_LINE_URL } from "@/lib/divizero";

const LINE_URL = DIVIZERO_LINE_URL;

const PAIN_ITEMS = [
  "100件DMを送っても返信が来ない…というか、そもそも営業が心理的ハードルでストップしている。",
  "モニター募集を打てば「いいね」はつくのに、実際の案件（マネタイズ）に繋がらない。",
  "制作に集中したいのに、待てど暮らせど案件の相談が来ない。",
];

const REASONS = [
  {
    num: "01",
    title: "アカウント個別最適化とターゲット選定",
    text: "テンプレートの使い回しを完全排除。あなたのアカウント特性を徹底分析し、最も可能性の高いターゲットを絞り込みます。",
  },
  {
    num: "02",
    title: "データハック（送信文面・時間帯）",
    text: "これまでに蓄積された膨大なデータから、「最も返信が来やすい文面」「最もアクティブな曜日・時間帯」をシステム化。ピンポイントでアプローチするため、コスパ・タイパが他社と桁違いです。",
  },
  {
    num: "03",
    title: "2段階ステルスアプローチ（完全会話型）",
    text: "怪しいURLを踏ませるような営業は一切しません。DM内の丁寧なテキストチャットだけで会話を完結させ、クライアントのブランドを傷つけずにカレンダーをアポで埋め尽くします。",
  },
];

function LineCta({ className = "dz-btn-primary" }: { className?: string }) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      divizeroに営業を丸投げして制作に集中する（公式LINE登録）
    </a>
  );
}

export default function CloserHome() {
  return (
    <div className="dz-lp">
      <section className="dz-hero">
        <div className="dz-hero-glow" aria-hidden />
        <div className="dz-hero-inner">
          <span className="dz-label">Sales Platform / divizero</span>
          <h1 className="dz-hero-title">
            返信率40%の衝撃。
            <br />
            あなたの営業を、<em>データと仕組み</em>で完全自動化する。
          </h1>
          <p className="dz-hero-sub">
            一般的なDM営業の返信率はわずか2〜4%。divizeroはターゲットの徹底選定とアカウント最適化により、異常とも言える「返信率40%」を叩き出す。クリエイターは、制作だけに集中。
          </p>
          <div className="dz-hero-actions">
            <LineCta />
          </div>
          <div className="dz-hero-metrics">
            <div className="dz-metric">
              <span className="dz-metric-value">40%</span>
              <span className="dz-metric-label">返信率（実績ベース）</span>
            </div>
            <div className="dz-metric">
              <span className="dz-metric-value">2〜4%</span>
              <span className="dz-metric-label">一般的なDM営業</span>
            </div>
            <div className="dz-metric">
              <span className="dz-metric-value">¥5,000〜</span>
              <span className="dz-metric-label">1アポ・完全成果報酬</span>
            </div>
          </div>
        </div>
        <div className="dz-scroll-hint">
          <span>scroll</span>
          <div className="dz-scroll-line" />
        </div>
      </section>

      <section className="dz-pain" id="pain">
        <div className="dz-container">
          <span className="dz-label">Problem</span>
          <h2 className="dz-section-title">こんな悩みを抱えていませんか？</h2>
          <div className="dz-pain-grid">
            {PAIN_ITEMS.map((text, i) => (
              <article key={text} className="dz-pain-card">
                <span className="dz-pain-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dz-reasons" id="reasons">
        <div className="dz-container">
          <span className="dz-label">Why divizero</span>
          <h2 className="dz-section-title">divizeroが選ばれる理由</h2>
          <p className="dz-section-lead">
            有象無象の営業代行とは一線を画す、洗練されたプロの営業事務局としての設計。
          </p>
          <div className="dz-reason-grid">
            {REASONS.map((r) => (
              <article key={r.num} className="dz-reason-card">
                <span className="dz-reason-num">{r.num}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dz-pricing" id="pricing">
        <div className="dz-container">
          <span className="dz-label">Pricing</span>
          <h2 className="dz-section-title">料金プランと、安さの理由</h2>
          <div className="dz-pricing-compare">
            <div className="dz-pricing-card dz-pricing-card--other">
              <p className="dz-pricing-tag">他社（業界平均）</p>
              <p className="dz-pricing-price">1.5万円〜</p>
              <p className="dz-pricing-desc">
                最低保証や初期費用、アポ単価として安くてもこの水準が一般的。
              </p>
            </div>
            <div className="dz-pricing-card dz-pricing-card--ours">
              <p className="dz-pricing-tag">divizero</p>
              <p className="dz-pricing-price">¥5,000〜</p>
              <p className="dz-pricing-desc">
                完全成果報酬（フルコミ営業）の安心設計。1アポ一律5,000円から対応。
              </p>
            </div>
          </div>
          <div className="dz-pricing-logic">
            <h3>なぜ、この価格が実現できるのか</h3>
            <p>
              営業オペレーションの無駄（無駄な人件費やシステム維持費）を徹底的に排除し、仕組み化による究極のコストカットに成功しているため、この価格が実現できています。
            </p>
          </div>
        </div>
      </section>

      <section className="dz-simulator-section">
        <div className="dz-container">
          <DivizeroRewardSimulator />
        </div>
      </section>

      <section className="dz-cta">
        <div className="dz-container dz-cta-inner">
          <span className="dz-label">Get Started</span>
          <h2 className="dz-section-title">
            営業はdivizeroに任せて、<em>制作に戻る</em>。
          </h2>
          <p className="dz-section-lead">
            公式LINEでヒアリング後、最短ルートで営業設計を開始します。
          </p>
          <LineCta className="dz-btn-primary dz-btn-primary--large" />
        </div>
      </section>
    </div>
  );
}
