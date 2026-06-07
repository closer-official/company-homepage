import DivizeroCompareTable from "../DivizeroCompareTable";
import DivizeroRewardSimulator from "../DivizeroRewardSimulator";
import { ScrollMetric } from "../divizero/AnimatedNumber";

// ─────────────────────────────────────────────
//  コンテンツデータ（誠実・科学的表現に統一）
// ─────────────────────────────────────────────
const PAIN_ITEMS_CREATOR = [
  "制作・コンサルティングのクオリティには自信がある。しかし自分で顧客開拓や営業をする時間がなく、案件が途切れてしまう。",
  "営業代行を探しても高額な固定費がかかり、成果保証がない。強引な売り込みで自分のブランドが傷つくのが怖い。",
  "競合が増え続ける中で、独自の強みや一気通貫の提案導線が作れず、安価な価格競争に巻き込まれそうになっている。",
];

const PAIN_ITEMS_SHOP = [
  "開業したものの集客のノウハウがなく新規顧客が来ない。大手広告媒体に頼ると高額な掲載料で経営が圧迫される。",
  "ホームページ・SNS・動画のどこが本当のボトルネックなのか、自分では判断がつかない。",
  "かかってくる営業電話はどれも高額で強引。自社の状況に寄り添った、適正価格の提案をしてくれる相手が見つからない。",
];

const REASONS = [
  {
    num: "01",
    title: "売り込まず「診察」するドクター型提案",
    text: "まずは実店舗の集客状況をヒアリングし、何が原因かを特定。本当に必要な解決策だけを導き出すため、ミスマッチが起こりません。",
  },
  {
    num: "02",
    title: "えりすぐりのフリーランスによる一気通貫",
    text: "Web・SNS・動画と、診断で特定した課題の種類がどれであっても、窓口一本で高品質な施策を一気通貫で提供します。",
  },
  {
    num: "03",
    title: "「営業は科学」データベース駆動のアプローチ",
    text: "意欲ある駆け出しスタッフでも、運営が提供する科学的営業データを使うことで、業界トップクラスの誠実な提案が可能になります。",
  },
];

const THREE_WAY_BENEFITS = [
  {
    letter: "A",
    title: "えりすぐりのフリーランス",
    label: "制作者・コンサルタント",
    text: "泥臭い営業に時間を奪われず、制作・価値提供に100%集中できます。事前診断に基づいたアプローチのため、ブランドイメージが崩れるリスクも極めて低いです。",
  },
  {
    letter: "B",
    title: "集客に悩む個人サロン・実店舗",
    label: "美容室・パーソナルジム等",
    text: "中間コストを省くため、ハイレベルな集客パッケージを業界最安値クラスで導入できます。ドクター型診断により、本当に必要な解決策だけが手に入ります。",
  },
  {
    letter: "C",
    title: "意欲ある営業パートナー",
    label: "これから頑張るスタッフ",
    text: "センスや根性に頼らず、運営が提供する豊富なデータを活用して実践。再現性のある科学的プロセスで、一生モノのロジカルな営業スキルを身につけます。",
  },
];

const FLOW_STEPS = [
  { num: "01", title: "公式LINEへ登録", text: "まずは公式LINEからプラットフォームへご参加ください。現状の課題感を軽くお聞きします。" },
  { num: "02", title: "事前分析とアサイン", text: "運営チームがデータベースを基にターゲットや課題を分析。営業スタッフが配置されます。" },
  { num: "03", title: "丁寧な「診断」の開始", text: "お店のボトルネックを特定するドクター型のカウンセリングを行います。" },
  { num: "04", title: "一気通貫のプラン提案", text: "診断カルテに基づき、最適な集客パッケージをミスマッチなくご提案します。" },
  { num: "05", title: "マッチング確定・稼働", text: "条件が合意に至った段階で、初めて完全成果報酬の手数料が発生します。" },
];

// ─────────────────────────────────────────────
//  手書き線画イラスト群（SVG）
// ─────────────────────────────────────────────

/** ヒーロー：3者が繋がる手書き風ダイアグラム */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="dz-hero-illustration"
    >
      {/* 中央ハブ：divisero */}
      <circle cx="240" cy="160" r="46" stroke="#00b4b8" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="240" cy="160" r="38" stroke="#00b4b8" strokeWidth="1.2" opacity="0.3" />
      <text x="240" y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="#179ca0" fontFamily="'Noto Sans JP', sans-serif">divi</text>
      <text x="240" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#179ca0" fontFamily="'Noto Sans JP', sans-serif">zero</text>

      {/* 左：フリーランス */}
      <rect x="18" y="120" width="108" height="80" rx="12" stroke="#1e293b" strokeWidth="1.4" fill="white" />
      <text x="72" y="148" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">えりすぐりの</text>
      <text x="72" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">フリーランス</text>
      <text x="72" y="180" textAnchor="middle" fontSize="9" fill="#00b4b8" fontFamily="'Noto Sans JP', sans-serif">制作 / コンサル</text>
      {/* 矢印：左→中央 */}
      <path d="M128 160 C160 160 180 160 192 160" stroke="#00b4b8" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arr)" />

      {/* 右：実店舗 */}
      <rect x="354" y="120" width="108" height="80" rx="12" stroke="#1e293b" strokeWidth="1.4" fill="white" />
      <text x="408" y="148" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">集客に悩む</text>
      <text x="408" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">個人サロン・実店舗</text>
      <text x="408" y="180" textAnchor="middle" fontSize="9" fill="#00b4b8" fontFamily="'Noto Sans JP', sans-serif">美容室 / ジム等</text>
      {/* 矢印：中央→右 */}
      <path d="M286 160 C306 160 330 160 352 160" stroke="#00b4b8" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arr)" />

      {/* 下：営業スタッフ */}
      <rect x="166" y="254" width="108" height="52" rx="12" stroke="#1e293b" strokeWidth="1.4" fill="white" />
      <text x="220" y="278" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">意欲ある</text>
      <text x="220" y="294" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">営業パートナー</text>
      {/* 矢印：中央→下 */}
      <path d="M240 207 C240 225 240 240 240 252" stroke="#00b4b8" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arr)" />

      {/* 上：データベース */}
      <rect x="166" y="14" width="108" height="52" rx="12" stroke="#64748b" strokeWidth="1.2" strokeDasharray="5 3" fill="#f0f4f8" />
      <text x="220" y="38" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">科学的</text>
      <text x="220" y="54" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">営業データベース</text>
      {/* 矢印：上→中央 */}
      <path d="M220 68 C220 90 230 110 240 114" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" strokeLinecap="round" markerEnd="url(#arrGray)" />

      {/* 矢印マーカー定義 */}
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#00b4b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id="arrGray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
    </svg>
  );
}

/** 課題：「届かない壁」を表す手書き風イラスト */
function PainIllustration() {
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="dz-section-illustration">
      {/* 左：クリエイター */}
      <circle cx="58" cy="100" r="30" stroke="#1e293b" strokeWidth="1.4" />
      <text x="58" y="96" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">フリーランス</text>
      <text x="58" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">A</text>
      {/* 左の矢印（壁に当たって止まる） */}
      <line x1="90" y1="100" x2="156" y2="100" stroke="#1e293b" strokeWidth="1.2" strokeDasharray="4 3" />
      <polygon points="156,95 166,100 156,105" fill="#1e293b" opacity="0.4" />

      {/* 中央の壁 */}
      <rect x="168" y="50" width="24" height="100" rx="4" fill="#e1e8f0" stroke="#b0bec8" strokeWidth="1" />
      <text x="180" y="104" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif" transform="rotate(-90, 180, 104)">営業・集客の壁</text>

      {/* 右：実店舗 */}
      <circle cx="302" cy="100" r="30" stroke="#1e293b" strokeWidth="1.4" />
      <text x="302" y="96" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">実店舗</text>
      <text x="302" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">B</text>
      {/* 右から来る矢印も壁で止まる */}
      <line x1="270" y1="100" x2="204" y2="100" stroke="#1e293b" strokeWidth="1.2" strokeDasharray="4 3" />
      <polygon points="204,95 194,100 204,105" fill="#1e293b" opacity="0.4" />

      {/* 解決の光（ターコイズ） */}
      <path d="M140 60 Q180 40 220 60" stroke="#00b4b8" strokeWidth="1.4" strokeDasharray="5 4" strokeLinecap="round" />
      <text x="180" y="38" textAnchor="middle" fontSize="9" fill="#00b4b8" fontFamily="'Noto Sans JP', sans-serif">diviseroが橋渡し</text>
    </svg>
  );
}

/** ドクタープロセス：聴診器＋カルテの手書き風 */
function DoctorIllustration() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="dz-section-illustration">
      {/* カルテ用紙 */}
      <rect x="80" y="20" width="160" height="160" rx="8" fill="white" stroke="#e1e8f0" strokeWidth="1.5" />
      {/* カルテ線 */}
      {[60, 80, 100, 120, 140].map((y) => (
        <line key={y} x1="96" y1={y} x2="224" y2={y} stroke="#e1e8f0" strokeWidth="0.8" />
      ))}
      <text x="112" y="44" fontSize="11" fontWeight="700" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">診断カルテ</text>
      <text x="96" y="72" fontSize="9" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">ボトルネック：___________</text>
      <text x="96" y="92" fontSize="9" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">集客状況：___________</text>
      <text x="96" y="112" fontSize="9" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">処方箋：___________</text>
      {/* チェックマーク */}
      <path d="M98 130 L108 142 L128 118" stroke="#00b4b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* 聴診器 */}
      <path d="M30 60 Q20 90 30 120 Q38 148 58 152 Q80 156 86 140" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="58" cy="152" r="8" stroke="#1e293b" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="60" r="4" fill="#1e293b" opacity="0.6" />
      {/* 耳あて */}
      <line x1="20" y1="54" x2="40" y2="54" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** 三方よし：3つの円が重なるベン図っぽいイラスト */
function TriangleBenefitIllustration() {
  return (
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="dz-section-illustration">
      {/* 3つの円 */}
      <circle cx="160" cy="90" r="62" stroke="#00b4b8" strokeWidth="1.6" strokeDasharray="7 4" opacity="0.4" />
      <circle cx="110" cy="150" r="50" stroke="#1e293b" strokeWidth="1.4" strokeDasharray="6 3" opacity="0.4" />
      <circle cx="210" cy="150" r="50" stroke="#1e293b" strokeWidth="1.4" strokeDasharray="6 3" opacity="0.4" />

      {/* ラベル */}
      <text x="160" y="56" textAnchor="middle" fontSize="10" fontWeight="600" fill="#179ca0" fontFamily="'Noto Sans JP', sans-serif">営業スタッフ C</text>
      <text x="68" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">フリーランス A</text>
      <text x="252" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b" fontFamily="'Noto Sans JP', sans-serif">実店舗 B</text>

      {/* 中心：三方よし */}
      <text x="160" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#00b4b8" fontFamily="'Noto Sans JP', sans-serif">三方よし</text>
      <text x="160" y="140" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="'Noto Sans JP', sans-serif">Win-Win-Win</text>
    </svg>
  );
}

// ─────────────────────────────────────────────
//  CTA ボタン
// ─────────────────────────────────────────────
function LineCta({ className = "dz-btn-primary dz-btn-primary--shine" }: { className?: string }) {
  return (
    <a href="https://line.me/ti/p/7818mX2ZAe" target="_blank" rel="noopener noreferrer" className={className}>
      まずは無料相談（公式LINE）
    </a>
  );
}

// ─────────────────────────────────────────────
//  メインコンポーネント
// ─────────────────────────────────────────────
export default function CloserHome() {
  return (
    <div className="dz-lp">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-hero">
        <div className="dz-hero-inner dz-reveal is-visible">
          <div className="dz-hero-content">
            <div className="dz-hero-text">
              <span className="dz-label">Next-Generation Sales Platform / divizero</span>
              <h1 className="dz-hero-title">
                営業力を仕組み化し、<br />
                クリエイターに<span>制作の時間</span>を、<br />
                実店舗に<span>集客の安心</span>を。
              </h1>
              <p className="dz-hero-sub">
                初期費用ゼロ。センスや強引な売込に頼らない「科学的な診断」によって、
                厳選されたフリーランスと、集客に困っているサロン・実店舗をダイレクトに繋ぐ
                三方よしのプラットフォーム。
              </p>
              <div className="dz-hero-actions">
                <LineCta />
              </div>
            </div>
            <div className="dz-hero-visual">
              <HeroIllustration />
            </div>
          </div>

          {/* 統計カード */}
          <div className="dz-hero-metrics dz-reveal-stagger">
            <div className="dz-metric dz-metric-card">
              <span className="dz-metric-value">
                <ScrollMetric end={100} suffix="%" />
              </span>
              <span className="dz-metric-label">商材ブランド保全</span>
              <span className="dz-metric-note">URL誘導・無理な売込なし</span>
            </div>
            <div className="dz-metric dz-metric-card">
              <span className="dz-metric-value">
                <ScrollMetric end={0} prefix="¥" />
              </span>
              <span className="dz-metric-label">初期・月額固定費</span>
              <span className="dz-metric-note">完全成果報酬モデル</span>
            </div>
            <div className="dz-metric dz-metric-card">
              <span className="dz-metric-value">
                <ScrollMetric end={5000} prefix="¥" suffix="〜" />
              </span>
              <span className="dz-metric-label">マッチング確定単価</span>
              <span className="dz-metric-note">1診断あたりの成果報酬</span>
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
      <section className="dz-section dz-section--elevated dz-pain" id="pain">
        <div className="dz-container dz-reveal">
          <div className="dz-section-header dz-section-header--with-illust">
            <div className="dz-section-header-text">
              <span className="dz-label">The Bottleneck</span>
              <h2 className="dz-section-title">
                素晴らしい技術とお店が、<span>「届かない壁」</span>で埋もれていませんか？
              </h2>
              <p className="dz-section-lead">
                営業リソースの不足に悩む優秀なクリエイターと、
                集客の根本原因が分からず疲弊する実店舗オーナー。
                従来の強引な営業代行では、この双方の溝を埋めることはできませんでした。
              </p>
            </div>
            <div className="dz-section-header-illust">
              <PainIllustration />
            </div>
          </div>

          <div className="dz-pain-two-col">
            <div className="dz-pain-col">
              <h3 className="dz-pain-col-title">
                <span className="dz-pain-col-badge">A</span>
                制作・コンサルティング側の課題
              </h3>
              <div className="dz-pain-list">
                {PAIN_ITEMS_CREATOR.map((text, i) => (
                  <article key={i} className="dz-pain-item">
                    <span className="dz-pain-num">{String(i + 1).padStart(2, "0")}</span>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="dz-pain-col">
              <h3 className="dz-pain-col-title">
                <span className="dz-pain-col-badge dz-pain-col-badge--b">B</span>
                個人サロン・実店舗側の課題
              </h3>
              <div className="dz-pain-list">
                {PAIN_ITEMS_SHOP.map((text, i) => (
                  <article key={i} className="dz-pain-item">
                    <span className="dz-pain-num">{String(i + 1).padStart(2, "0")}</span>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <p className="dz-pain-closing">
            divizeroは、この割り切れない壁を「科学的データ」と「ドクター型の対話」によって、最も無理のない形で解決します。
          </p>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PHILOSOPHY
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--base" id="philosophy">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Our Philosophy</span>
          <h2 className="dz-section-title">
            営業は根性ではなく、<span>「科学」</span>である。
          </h2>
          <div className="dz-story-layout">
            <div className="dz-story-body">
              <p>
                ここに集まるのは、これから頑張りたいという強い意欲を持った、駆け出しの若い営業スタッフたちです。
                彼らを支えるのが、運営側から支給される精密な「営業データベース」です。
              </p>
              <p>
                センスや感覚に頼る営業を完全に排除し、再現性のあるデータを基に動くことで、
                未経験からでも業界トップクラスの誠実でロジカルな提案が可能になっています。
              </p>
              <p>
                このデータ駆動型の育成体制があるからこそ、無駄なコストを省き、
                プラットフォーム全体として極めて低価格な営業リソースを市場に提供し続けることができるのです。
              </p>
            </div>
            <div className="dz-story-accent">
              <blockquote className="dz-philosophy-quote">
                「同じ文章を使い回さない、<br />
                あなたのお店に寄り添った分析。」
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THREE-WAY BENEFITS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--elevated" id="benefits">
        <div className="dz-container dz-reveal">
          <div className="dz-section-header dz-section-header--with-illust">
            <div className="dz-section-header-text">
              <span className="dz-label">Three-Way Ecosystem</span>
              <h2 className="dz-section-title">
                関わるすべての人が、<br />最も自然に豊かになる循環
              </h2>
              <p className="dz-section-lead">
                誰かが無理をしたり、搾取される構造を仕組みから徹底的に排除しました。
              </p>
            </div>
            <div className="dz-section-header-illust">
              <TriangleBenefitIllustration />
            </div>
          </div>

          <div className="dz-three-grid">
            {THREE_WAY_BENEFITS.map((b) => (
              <article key={b.letter} className="dz-three-card">
                <div className="dz-three-card-letter">{b.letter}</div>
                <span className="dz-three-card-badge">{b.label}</span>
                <h3 className="dz-three-card-title">{b.title}</h3>
                <p className="dz-three-card-text">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          REASONS / FEATURES
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--base" id="features">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Platform Core</span>
          <h2 className="dz-section-title">
            divizeroプラットフォームが選ばれる理由
          </h2>
          <p className="dz-section-lead">
            テンプレート使い回しの営業会社とは一線を画す、科学的アプローチの核心。
          </p>
          <div className="dz-reason-grid dz-reveal-stagger">
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
        <div className="dz-container dz-reveal">
          <div className="dz-section-header dz-section-header--with-illust">
            <div className="dz-section-header-text">
              <span className="dz-label">Doctor Process</span>
              <h2 className="dz-section-title">
                LINE登録から、<br /><span>ミスマッチのない診断提案</span>までの流れ
              </h2>
              <p className="dz-section-lead">
                営業スタッフがお店のカルテを作成し、最適な処方箋を届けるまでの5ステップ。
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
                {i < FLOW_STEPS.length - 1 && <div className="dz-flow-step-arrow" aria-hidden />}
              </div>
            ))}
          </div>

          <div className="dz-flow-note">
            怪しげなURLへの誘導行為は一切行いません。丁寧な対話のテキストのみで関係性を構築するため、
            フリーランス側の商材ブランドも、実店舗側の安心感も損なうリスクをゼロに抑えています。
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRICING / COMPARE
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--base" id="pricing">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Pricing Logic</span>
          <h2 className="dz-section-title">
            マッチングが成立するまで、<span>一切の費用は発生しません</span>。
          </h2>
          <p className="dz-section-lead">
            完全成果報酬型。初期リスクを完全にゼロにできるのは、私たちのデータと仕組みの精度に根拠があるからです。
          </p>

          <DivizeroCompareTable />

          <div className="dz-pricing-note">
            <h3>どちらのプランを選べばいいですか？</h3>
            <p>
              提供する商材の平均単価が5万円以下の場合は「プランA（マッチング確定ごとに5,000円）」のみが対象となります。
              5万円を超える高単価商材では、多くの制作者様がプランB（成約時10%）を選ぶ理由は、
              実績を積んだ優秀な営業スタッフが優先的に手を挙げやすく、商談の質と成約率で大きなメリットが返ってくるためです。
              最適なプランは、無料の診断カルテ作成時に一緒に決定しましょう。
            </p>
          </div>
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SIMULATOR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--elevated">
        <div className="dz-container">
          <DivizeroRewardSimulator />
        </div>
      </section>

      <div className="dz-divider" aria-hidden />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="dz-section dz-section--cta">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Get Started</span>
          <h2 className="dz-section-title">
            営業の課題はデータに委ねて、<span>本来進むべき場所へ</span>。
          </h2>
          <p className="dz-section-lead">
            公式LINEでの簡単なヒアリングから、あなたに最適な診断チームの構築を開始します。
            初期費用ゼロ・完全成果報酬。まずはお気軽にお話を聞かせてください。
          </p>
          <LineCta className="dz-btn-primary dz-btn-primary--shine dz-btn-primary--large" />
        </div>
      </section>
    </div>
  );
}