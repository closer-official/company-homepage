"use client";
import React, { useState } from "react";
import DivizeroCompareTable from "../DivizeroCompareTable";

// ─────────────────────────────────────────────
//  サロンオーナー向け：導入店舗の実績（匿名化・共通アセット化）
// ─────────────────────────────────────────────
const ASSET_CASE_STUDIES = [
  {
    type: "プライベートサロン（美容系）",
    tags: "導線分析カルテ ➔ 動線一新パッケージ",
    result: "LINE予約数が導入翌月に前月比142%を達成",
    desc: "ヒアリングに基づく診断により、SNSから予約サイトへのリンク導線が寸断されているボトルネックを特定。提携パートナーA氏の持つノウハウを適用し、窓口一本で無駄のない予約ルートを構築しました。",
    avatarLetter: "S"
  },
  {
    type: "パーソナルジム（フィットネス系）",
    tags: "動画コンテンツ診断 ➔ 特化型LP制作",
    result: "新規Web問い合わせ数が月間5件から22件へ増加",
    desc: "大手広告媒体の掲載料に依存していた経営構造を分析。ターゲット層へ響くショート動画施策と、提携パートナーB氏による一気通貫の縦長Webページ（LP）を連携。広告費に頼らない集客の基盤を作りました。",
    avatarLetter: "G"
  }
];

const PAIN_ITEMS_SHOP = [
  "せっかく開業したものの、地域での集客ノウハウがなく新規顧客が思うように来ない。どう動けばいいか手がかりがない。",
  "大手広告媒体に頼ると、毎月高額な掲載料を請求され、利益がほとんど手残らず経営が圧迫されてしまう。",
  "かかってくる営業電話はどれも高額で強引な売り込みばかり。自社の規模や状況に本当に寄り添った、適正価格の提案をしてくれる相手が見つからない。"
];

const REASONS = [
  {
    num: "01",
    title: "無理に売り込まずボトルネックを見つける「ドクター型診断」",
    text: "私たちはまず、お店の集客がなぜ止まっているのかの原因を丁寧にヒアリングして特定します。不要なパッケージを無理に売り込むことは一切ありません。"
  },
  {
    num: "02",
    title: "厳選された提携パートナーによる、窓口一本の一気通貫提供",
    text: "Webサイト、SNS運用、動画制作など、診断によって判明した課題が何であっても、divizeroの窓口一つで、各分野のスペシャリストの知見を結集した高品質な施策を提供します。"
  },
  {
    num: "03",
    title: "過去のデータに基づく、センスに頼らない誠実なアプローチ",
    text: "感覚任せの強引な営業手法を完全に排除し、実証されたデータに準拠して動く仕組みを整えています。そのため、あなたのお店のブランドを傷つけるようなアプローチは絶対にいたしません。"
  }
];

const FLOW_STEPS = [
  { num: "01", title: "公式LINEまたは各SNSのDMから相談", text: "まずは使いやすい窓口からお気軽にご連絡ください。現在の状況について軽くお伺いします。" },
  { num: "02", title: "お店の集客状況の事前分析", text: "お聞きした内容と地域のデータベースを基に、運営チームがボトルネックの予備分析を行います。" },
  { num: "03", title: "丁寧な「診断カルテ」の作成", text: "担当者がお店に寄り添ったカウンセリングを行い、何が原因で集客が詰まっているかを可視化します。" },
  { num: "04", title: "最適な解決パッケージの提示", text: "診断結果に基づき、本当に必要な施策だけをまとめたプランを、ミスマッチのない適正価格でご提案します。" },
  { num: "05", title: "マッチング確定・施策スタート", text: "内容にご納得いただき、条件が合意に至った段階で初めて契約・稼働となります。初期固定費によるリスクはありません。" }
];

// ─────────────────────────────────────────────
//  スマートマルチチャネルCTAコンポーネント（解決策A）
// ─────────────────────────────────────────────
function SmartMultiCta() {
  return (
    <div className="dz-cta-wrapper">
      {/* メインの公式LINEリンク。スマホ環境ではこれが最優先 */}
      <a href="https://line.me/ti/p/7818mX2ZAe" target="_blank" rel="noopener noreferrer" className="dz-btn-primary">
        公式LINEで無料相談・診断カルテを依頼する
      </a>
      
      {/* PCユーザー離脱対策：PC表示時のみ現れるSNSのDM選択窓口 */}
      <div className="dz-pc-sns-channels">
        <p className="dz-sns-prompt">
          ※パソコンでご覧の方へ：スマホを取り出さず、今お使いのブラウザから直接DMで相談することも可能です。
        </p>
        <div className="dz-sns-buttons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="dz-btn-sns dz-btn-sns--instagram">
            Instagram DM
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="dz-btn-sns dz-btn-sns--x">
            X (Twitter) DM
          </a>
          <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="dz-btn-sns dz-btn-sns--threads">
            Threads DM
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  サロンオーナー向け：利益シミュレーターコンポーネント
// ─────────────────────────────────────────────
function SalonProfitSimulator() {
  const [avgSpent, setAvgSpent] = useState<number>(8000); // 平均客単価
  const [targetCustomers, setTargetCustomers] = useState<number>(5); // 目標新規来店数/月
  const [currentAdCost, setCurrentAdCost] = useState<number>(50000); // 現在の大手媒体広告費/月

  // 計算ロジック
  // 新規来店による見込み増加売上 = 客単価 * 目標数
  const estimatedRevenue = avgSpent * targetCustomers;
  // divizeroプランA想定費用 (1件につき5,000円)
  const divizeroCost = 5000 * targetCustomers;
  // 大手媒体を削減した場合の削減広告費 (現在の広告費 - divizero費用)
  const savedCost = Math.max(0, currentAdCost - divizeroCost);
  // お店に残る推定実質プラス利益 = 増加売上 + 削減広告費
  const totalProfit = estimatedRevenue + (currentAdCost > divizeroCost ? currentAdCost - divizeroCost : 0);

  return (
    <div className="dz-sim-box">
      <h3 className="dz-sim-title">サロン・店舗オーナー専用 利益シミュレーター</h3>
      <p className="dz-sim-sub">divizeroの完全成果報酬プランを導入した場合の、店舗への手残り利益（コスト削減含む）の目安を計算します。</p>
      
      <div className="dz-sim-form-grid">
        <div className="dz-sim-field">
          <label>お店の平均客単価（円）</label>
          <input 
            type="number" 
            value={avgSpent} 
            onChange={(e) => setAvgSpent(Number(e.target.value))} 
            placeholder="例: 8000"
          />
        </div>
        <div className="dz-sim-field">
          <label>目標とする月間の新規獲得数（人）</label>
          <input 
            type="number" 
            value={targetCustomers} 
            onChange={(e) => setTargetCustomers(Number(e.target.value))} 
            placeholder="例: 5"
          />
        </div>
        <div className="dz-sim-field">
          <label>現在支払っている月間の広告掲載料（円）</label>
          <input 
            type="number" 
            value={currentAdCost} 
            onChange={(e) => setCurrentAdCost(Number(e.target.value))} 
            placeholder="例: 50000"
          />
        </div>
        <div className="dz-sim-field">
          <label>適用検討プラン</label>
          <select disabled>
            <option>プランA（マッチング確定：5,000円/件）</option>
          </select>
        </div>
      </div>

      <div className="dz-sim-results">
        <div className="dz-sim-res-card">
          <div className="dz-sim-res-label">新規来店による増加売上（目安）</div>
          <div className="dz-sim-res-value">¥{estimatedRevenue.toLocaleString()} /月</div>
        </div>
        <div className="dz-sim-res-card">
          <div className="dz-sim-res-label">広告媒体の見直しによる固定費削減効果</div>
          <div className="dz-sim-res-value">¥{savedCost.toLocaleString()} /月</div>
        </div>
        <div className="dz-sim-res-card">
          <div className="dz-sim-res-label">発生する成果報酬（費用）</div>
          <div className="dz-sim-res-value">¥{divizeroCost.toLocaleString()} /月</div>
        </div>
        <div className="dz-sim-res-card dz-sim-res-card--highlight">
          <div className="dz-sim-res-label">お店への実質的な利益プラス効果</div>
          <div className="dz-sim-res-value">約 ¥{totalProfit.toLocaleString()} /月</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  手書き線画イラスト群（SVG）
// ─────────────────────────────────────────────
function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="dz-hero-illustration">
      <circle cx="240" cy="160" r="46" stroke="#00b4b8" strokeWidth="2" strokeDasharray="6 4" />
      <text x="240" y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="#179ca0" fontFamily="'Noto Sans JP', sans-serif">divi</text>
      <text x="240" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#179ca0" fontFamily="'Noto Sans JP', sans-serif">zero</text>
      <rect x="18" y="120" width="108" height="80" rx="12" stroke="#1e293b" strokeWidth="1.4" fill="white" />
      <text x="72" y="154" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">厳選された</text>
      <text x="72" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">提携パートナー</text>
      <path d="M128 160 C160 160 180 160 192 160" stroke="#00b4b8" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="354" y="120" width="108" height="80" rx="12" stroke="#1e293b" strokeWidth="1.4" fill="white" />
      <text x="408" y="154" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">集客に悩む</text>
      <text x="408" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">個人サロン・実店舗</text>
      <path d="M286 160 C306 160 330 160 352 160" stroke="#00b4b8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DoctorIllustration() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="dz-section-illustration">
      <rect x="80" y="20" width="160" height="160" rx="8" fill="white" stroke="#e1e8f0" strokeWidth="1.5" />
      {[60, 80, 100, 120, 140].map((y) => (
        <line key={y} x1="96" y1={y} x2="224" y2={y} stroke="#e1e8f0" strokeWidth="0.8" />
      ))}
      <text x="112" y="44" fontSize="11" fontWeight="700" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">診断カルテ</text>
      <path d="M98 130 L108 142 L128 118" stroke="#00b4b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 60 Q20 90 30 120 Q38 148 58 152 Q80 156 86 140" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="58" cy="152" r="8" stroke="#1e293b" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// ─────────────────────────────────────────────
//  メインコンポーネント（サロンオーナー向け最適化版）
// ─────────────────────────────────────────────
export default function CloserHome() {
  return (
    <div className="dz-lp">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-hero">
        <div className="dz-hero-inner">
          <div className="dz-hero-content">
            <div className="dz-hero-text">
              <span className="dz-label">Next-Generation Matching / divizero</span>
              <h1 className="dz-hero-title">
                「営業する時間がない」と悩む制作者と、<br />
                「強引な売込は嫌だ」という実店舗を、<br />
                <span>データと誠実な対話</span>でつなぐ。
              </h1>
              <p className="dz-hero-sub">
                初期費用ゼロ。センスや強引な売込に頼らない「科学的な集客状況の診断」によって、
                厳選された制作・コンサルタントの技術を、本当に集客を必要としているサロン・実店舗へ
                最もリスクのない形でお届けするプラットフォームです。
              </p>
              
              {/* マルチチャネル対応CTA */}
              <SmartMultiCta />
            </div>
            <div className="dz-hero-visual">
              <HeroIllustration />
            </div>
          </div>

          {/* 統計カード（ScrollMetricを廃止し、誠実な静的表現に変更） */}
          <div className="dz-hero-metrics">
            <div className="dz-metric-card">
              <span className="dz-metric-value">100%</span>
              <span className="dz-metric-label">商材・店舗ブランドの保全</span>
              <span className="dz-metric-note">強引な営業・押し売り行為の完全排除</span>
            </div>
            <div className="dz-metric-card">
              <span className="dz-metric-value">¥0</span>
              <span className="dz-metric-label">初期費用・月額固定費</span>
              <span className="dz-metric-note">契約成立までリスクは一切発生しません</span>
            </div>
            <div className="dz-metric-card">
              <span className="dz-metric-value">適正価格</span>
              <span className="dz-metric-label">ドクター型提案</span>
              <span className="dz-metric-note">お店のボトルネックに合わせた最適処方</span>
            </div>
          </div>
        </div>
        <div className="dz-scroll-hint">
          <span>scroll</span>
          <div className="dz-scroll-line" />
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PAIN SECTION
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--elevated" id="pain">
        <div className="dz-container">
          <span className="dz-label">The Bottleneck</span>
          <h2 className="dz-section-title">
            素晴らしい技術やお店の魅力が、<span>「集客の壁」</span>で埋もれていませんか？
          </h2>
          <p className="dz-section-lead">
            多くの個人サロンや実店舗のオーナー様が、日々の本業に追われながら、
            正体の分からない「集客の悩み」と戦っています。
          </p>

          <div className="dz-pain-list" style={{ maxWidth: "720px", margin: "0 auto 32px" }}>
            {PAIN_ITEMS_SHOP.map((text, i) => (
              <article key={i} className="dz-pain-item">
                <span className="dz-pain-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <p className="dz-pain-closing" style={{ maxWidth: "720px", margin: "0 auto" }}>
            divizeroは、この不透明な壁を「データに基づく客観的な診断」によって取り除きます。何が本当に必要なのか、お店の現状に寄り添った解決策だけを導き出します。
          </p>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PHILOSOPHY
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--base" id="philosophy">
        <div className="dz-container">
          <span className="dz-label">Our Philosophy</span>
          <h2 className="dz-section-title">
            センスや根性に頼らない、<span>「徹底した準備と対話」</span>。
          </h2>
          <div className="dz-story-layout">
            <div className="dz-story-body">
              <p>
                私たちのプラットフォームには、丁寧なヒアリングと用意された精密な「集客データベース」を活用し、
                誠実にお店をサポートしたいと願う営業チームが揃っています。
              </p>
              <p>
                「とにかく契約を取る」といった、従来の強引な営業を完全に排除。
                事前に用意されたデータと照らし合わせて動くことで、
                お互いにミスマッチのない、ロジカルで透明性の高い提案が可能になっています。
              </p>
              <p>
                このデータに裏打ちされた無駄のない診断体制があるからこそ、中間コストを徹底的に省き、
                実店舗の皆様にとって最も導入しやすい適正な価格設定を維持し続けることができるのです。
              </p>
            </div>
            <div className="dz-story-accent">
              <blockquote className="dz-philosophy-quote">
                「定型の文章をただ送るような営業はしない。あなたのお店に深く向き合う分析を。」
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ANONYMOUS ASSETS / CASES (中抜き防衛：名無し実績提示)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--elevated" id="cases">
        <div className="dz-container">
          <span className="dz-label">Proven Assets</span>
          <h2 className="dz-section-title">
            divizeroチームがこれまでに生み出した<span>導入店舗の実績</span>
          </h2>
          <p className="dz-section-lead">
            個人を特定する情報は伏せ、プラットフォームの共通資産として実証された具体的な解決事例をご紹介します。
          </p>

          <div className="dz-asset-grid">
            {ASSET_CASE_STUDIES.map((item, idx) => (
              <div key={idx} className="dz-asset-card">
                <div className="dz-asset-profile">
                  <div className="dz-asset-avatar">
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--dz-accent-dark)" }}>{item.avatarLetter}</span>
                  </div>
                  <div>
                    <h3 className="dz-asset-meta-title">{item.type}</h3>
                    <div className="dz-asset-meta-tags">{item.tags}</div>
                  </div>
                </div>
                <div className="dz-asset-results-box">
                  <p className="dz-asset-result-item">成果：<span>{item.result}</span></p>
                </div>
                <p className="dz-asset-description">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          REASONS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--base" id="features">
        <div className="dz-container">
          <span className="dz-label">Platform Core</span>
          <h2 className="dz-section-title">
            多くの店舗オーナー様に選ばれる理由
          </h2>
          <p className="dz-section-lead">
            ただの営業代行やテンプレートを使い回す制作会社とは一線を画す、アプローチの核心。
          </p>
          <div className="dz-reason-grid">
            {REASONS.map((r) => (
              <article key={r.num} className="dz-reason-card">
                <span className="dz-reason-num">{r.num}</span>
                <h3 className="dz-reason-title">{r.title}</h3>
                <p className="dz-reason-text">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DOCTOR PROCESS / FLOW
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--elevated" id="flow">
        <div className="dz-container">
          <div className="dz-section-header dz-section-header--with-illust">
            <div className="dz-section-header-text">
              <span className="dz-label">Doctor Process</span>
              <h2 className="dz-section-title">
                ご相談から、<br /><span>ミスマッチのない診断提案</span>までの流れ
              </h2>
              <p className="dz-section-lead">
                お店の現状をしっかりと「診察」し、最適な処方箋（プラン）をお届けする5ステップ。
              </p>
            </div>
            <div className="dz-section-header-illust">
              <DoctorIllustration />
            </div>
          </div>

          <div className="dz-flow-steps">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.num} className="dz-flow-step">
                <div className="dz-flow-step-num">{step.num}</div>
                <div className="dz-flow-step-body">
                  <h3 className="dz-flow-step-title">{step.title}</h3>
                  <p className="dz-flow-step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dz-flow-note">
            怪しげなURLへの無理な誘導行為は一切行いません。丁寧なテキストのやり取りや対話のみで関係性を構築するため、
            お店側の安心感を損なうリスクを完全に抑えています。
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRICING
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--base" id="pricing">
        <div className="dz-container">
          <span className="dz-label">Pricing Logic</span>
          <h2 className="dz-section-title">
            マッチングが成立するまで、<span>一切の費用は発生しません</span>。
          </h2>
          <p className="dz-section-lead">
            完全成果報酬型。初期リスクをゼロに抑えられるのは、私たちのデータと仕組みの精度に強い根拠があるからです。
          </p>

          <DivizeroCompareTable />

          <div className="dz-pricing-note">
            <h3>どちらのプランを選べばいいですか？</h3>
            <p>
              提供する商材・サービスの平均単価が5万円以下の場合は「プランA（マッチング確定ごとに5,000円）」のみが対象となります。
              高単価なサービスを運用されている店舗様では、プランB（成約時10%）をご選択いただくことで、より密着した継続的なサポートチームの構築が可能になります。
              最適なプランは、無料の診断カルテ作成時に現状をお聞きしながら一緒に決定しましょう。
            </p>
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SALON PROFIT SIMULATOR (リデザインされたシミュレーター)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--elevated">
        <div className="dz-container">
          <SalonProfitSimulator />
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--cta">
        <div className="dz-container">
          <span className="dz-label">Get Started</span>
          <h2 className="dz-section-title">
            集客の課題はデータに委ねて、<span>本業のクオリティ追及へ</span>。
          </h2>
          <p className="dz-section-lead">
            公式LINEまたは各SNSのDMからの簡単な相談から、あなたのお店に最適な診断を開始します。
            初期費用ゼロ・完全成果報酬。まずはお気軽にお話を聞かせてください。
          </p>
          
          <SmartMultiCta />
        </div>
      </section>
    </div>
  );
}