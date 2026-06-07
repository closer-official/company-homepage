import DivizeroCompareTable from "../DivizeroCompareTable";
import DivizeroRewardSimulator from "../DivizeroRewardSimulator";
import { ScrollMetric } from "../divizero/AnimatedNumber";

// 禁止表現（ハック・量産・自動最適など）を完全排除した、誠実で温度のあるテキストデータ
const PAIN_ITEMS_CREATOR = [
  "制作やコンサルティングのクオリティには絶対の自信がある。しかし、自分自身で泥臭い顧客開拓や営業活動をする時間がなく、案件が途切れてしまう。",
  "売上を立てるために営業代行を探しても、月額数十万の固定費がかかる上に成果保証がない。大切な自分のブランドや商材のイメージが、強引な売り込みで傷つくのが怖い。",
  "市場の競合が増え続ける中で、自分だけの独自の強みや一気通貫した提案導線が作れず、他社との安価な価格競争に巻き込まれそうになっている。",
];

const PAIN_ITEMS_SHOP = [
  "個人サロンや美容室、パーソナルジムを開業したものの、集客のノウハウがなく新規顧客が来ない。大手広告媒体に頼ると高額な掲載料で経営が圧迫される。",
  "集客の課題を解決したいが、ホームページ、SNS運用、動画、どこが本当のボトルネック（原因）なのか自分自身では判断がつかない。",
  "営業会社からかかってくる電話はどれも高額で強引な売り込みばかり。自社のお店の状況に本当に寄り添った、適正価格の提案をしてくれる相手が見つからない。",
];

const REASONS = [
  {
    num: "01",
    title: "売り込むのではなく、まず「診察」するドクター型提案",
    text: "私たちは、最初から特定の商材を売りつけるような営業は一切しません。まずは実店舗の集客状況を丁寧にヒアリングし、何が原因で集客が滞っているのかを特定。本当に必要な解決策だけを導き出すため、ミスマッチが起こりません。",
  },
  {
    num: "02",
    title: "厳選されたフリーランスによる一気通貫の解決力",
    text: "プラットフォームが目を付けた、えりすぐりの優秀なフリーランスが集結。診断の結果、お店のボトルネックがWebサイトであっても、SNS運用であっても、あるいは動画であっても、窓口を一本化して一気通貫で高品質な施策を提供します。",
  },
  {
    num: "03",
    title: "「営業は科学だ」感覚に頼らないデータベース営業",
    text: "在籍する営業スタッフには、運営側から再現性のある科学的な営業データを提供しています。経験の浅い駆け出しのメンバーであっても、仕組みの力で業界トップクラスの誠実な提案を行えるため、全体の営業リソースコストを大幅に抑えています。",
  },
];

const THREE_WAY_BENEFITS = [
  {
    title: "A：えりすぐりのフリーランス",
    label: "制作者・コンサルタント",
    text: "自分自身で泥臭い営業に時間を奪われることなく、一番の強みである「制作・価値提供」に100%集中できます。事前診断に基づいたアプローチのため、自身のブランドイメージが崩れるリスクも極めて低いです。",
  },
  {
    title: "B：集客に悩む個人サロン・実店舗",
    label: "美容室・パーソナルジム等",
    text: "高コストなゴリゴリの営業会社を通さないため、ハイレベルな集客パッケージをダイレクトかつ業界最安値クラスの適正価格で導入できます。ドクター型の診断により、本当に必要なおすすめの解決策だけが手に入ります。",
  },
  {
    title: "C：意欲ある営業パートナー",
    label: "これから頑張る営業スタッフ",
    text: "センスや感覚、根性に頼ることなく、運営側から支給される豊富なデータを活用して営業を実践。再現性のある科学的なプロセスを繰り返すことで、働きながら一生モノのロジカルな営業スキルをいつの間にか身につけることができます。",
  },
];

const FLOW_STEPS = [
  { num: "01", title: "公式LINEへ登録", text: "まずは公式LINEからプラットフォームへご参加ください。現状の商材や店舗の課題感を軽くお聞きします。" },
  { num: "02", title: "事前分析とアサイン", text: "運営チームがデータベースを基にターゲットや課題を分析。意欲ある営業スタッフがチームとして配置されます。" },
  { num: "03", title: "丁寧な「診断」の開始", text: "営業スタッフがお店のボトルネック（Web、SNS、動画等）を特定するドクター型の対話カウンセリングを行います。" },
  { num: "04", title: "一気通貫のプラン提案", text: "診断カルテに基づき、えりすぐりのフリーランスが持つ最適な集客パッケージをミスマッチなくご提案します。" },
  { num: "05", title: "マッチング確定・稼働", text: "条件が合意に至った段階で、初めて完全成果報酬の手数料が発生。フリーランス側は制作へ、実店舗側は集客改善へと進みます。" },
];

function LineCta({
  className = "dz-btn-primary dz-btn-primary--shine",
}: {
  className?: string;
}) {
  return (
    <a
      href="https://line.me/ti/p/7818mX2ZAe"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      まずは無料相談（公式LINE）
    </a>
  );
}

export default function CloserHome() {
  return (
    <div className="dz-lp">
      {/* ヒーローセクション：白ベースにターコイズが映えるクリーンな空間 */}
      <section className="dz-hero">
        <div className="dz-hero-glow" aria-hidden />
        <div className="dz-hero-inner dz-reveal is-visible">
          <span className="dz-label">Next-Generation Sales Platform / divizero</span>
          <h1 className="dz-hero-title">
            営業力を仕組み化し、
            <br />
            クリエイターに<span>制作の時間</span>を、
            <br />
            実店舗に<span>集客の安心</span>を。
          </h1>
          <p className="dz-hero-sub">
            初期費用ゼロ。センスや強引な売込に頼らない「科学的な診断」によって、厳選されたフリーランスの確かな解決力と、集客に困っているサロン・実店舗をダイレクトに適正価格で繋ぐ、次世代型の三方よしインフラ。
          </p>
          <div className="dz-hero-actions">
            <LineCta />
          </div>
          
          {/* 統計・パラメーター表示 */}
          <div className="dz-hero-metrics dz-reveal-stagger">
            <div className="dz-metric dz-glass-card">
              <span className="dz-metric-value">
                <ScrollMetric end={100} suffix="%法務" />
              </span>
              <span className="dz-metric-label">商材ブランド保全（URL誘導・無理な売込なし）</span>
            </div>
            <div className="dz-metric dz-glass-card">
              <span className="dz-metric-value">
                <ScrollMetric end={0} prefix="¥" />
              </span>
              <span className="dz-metric-label">初期導入・月額固定費用</span>
            </div>
            <div className="dz-metric dz-glass-card">
              <span className="dz-metric-value">
                <ScrollMetric end={5000} prefix="¥" suffix="〜" />
              </span>
              <span className="dz-metric-label">1診断マッチング確定・完全成果報酬</span>
            </div>
          </div>
        </div>
        <div className="dz-scroll-hint">
          <span>scroll</span>
          <div className="dz-scroll-line" />
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      {/* 課題セクション：AさんとBさん、双方が直面している現状の限界を可視化 */}
      <section className="dz-pain dz-section dz-section--major" id="pain">
        <div className="dz-container dz-reveal">
          <span className="dz-label">The Bottleneck</span>
          <h2 className="dz-section-title">
            せっかくの素晴らしい技術やお店が、<span>「届かない壁」</span>で埋もれていませんか？
          </h2>
          <p className="dz-section-lead">
            営業リソースの不足に悩む優秀なクリエイターと、集客の根本原因が分からず疲弊する実店舗オーナー。従来の強引な営業代行では、この双方の溝を埋めることはできませんでした。
          </p>
          
          <h3 style={{ marginTop: "40px", fontSize: "1.1rem", fontWeight: 600 }}>制作・コンサルティング側（Aさん）の課題</h3>
          <div className="dz-pain-grid dz-reveal-stagger">
            {PAIN_ITEMS_CREATOR.map((text, i) => (
              <article key={i} className="dz-pain-card dz-glass-card">
                <span className="dz-pain-num dz-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <h3 style={{ marginTop: "40px", fontSize: "1.1rem", fontWeight: 600 }}>個人サロン・実店舗側（Bさん）の課題</h3>
          <div className="dz-pain-grid dz-reveal-stagger">
            {PAIN_ITEMS_SHOP.map((text, i) => (
              <article key={i} className="dz-pain-card dz-glass-card">
                <span className="dz-pain-num dz-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <p className="dz-pain-closing">
            divizeroは、この割り切れない壁を「科学的データ」と「ドクター型の対話」によって、最も無理のない形で解決します。
          </p>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-base" aria-hidden />

      {/* 理念セクション：「営業は科学だ」 */}
      <section className="dz-story dz-section dz-section--compact" id="philosophy">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Our Philosophy</span>
          <h2 className="dz-section-title">
            営業は根性ではなく、<span>「科学」</span>である。
          </h2>
          <div className="dz-story-body">
            <p>
              私たちは、最初からスキルの高い高コストなトップ営業マンを囲い込んでいるわけではありません。ここに集まるのは、これから頑張りたいという強い意欲を持った、駆け出しの若い営業スタッフたちです。
            </p>
            <p>
              彼らを支えるのが、運営側から支給される精密な「営業データベース」です。センスや感覚に頼る営業を完全に排除し、再現性のあるデータを基に動くことで、未経験からでも業界トップクラスの誠実でロジカルな提案を可能にしています。
            </p>
            <p>
              このデータ駆動型の育成体制があるからこそ、無駄なコストを極限まで省き、プラットフォーム全体として極めて低価格な営業リソースを市場に提供し続けることができるのです。
            </p>
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      {/* 三方よしセクション：三者それぞれの提供価値を分かりやすく明記 */}
      <section className="dz-reasons dz-section dz-section--major" id="benefits">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Three-Way Ecosystem</span>
          <h2 className="dz-section-title">
            関わるすべての人が、最も自然に、最も豊かになる循環
          </h2>
          <p className="dz-section-lead">
            誰かが無理をしたり、誰かが搾取される構造を仕組みから徹底的に排除しました。
          </p>
          <div className="dz-reason-grid dz-reveal-stagger" style={{ gridTemplateColumns: "repeat(3, 1fr)", display: "grid", gap: "20px", marginTop: "40px" }}>
            {THREE_WAY_BENEFITS.map((b, i) => (
              <article key={i} className="dz-reason-card dz-glass-card">
                <span className="dz-reason-num" style={{ fontSize: "0.75rem", color: "var(--dz-accent-dark)", fontWeight: 600 }}>{b.label}</span>
                <h3 style={{ margin: "8px 0 12px", fontSize: "1.1rem", fontWeight: 600 }}>{b.title}</h3>
                <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.7, color: "var(--dz-muted)" }}>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-base" aria-hidden />

      {/* 特徴セクション：なぜこの数字と価値が出るのかの技術的・運用的裏付け */}
      <section className="dz-reasons dz-section dz-section--major" id="features">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Platform Core</span>
          <h2 className="dz-section-title">
            divizeroプラットフォームが選ばれる理由
          </h2>
          <p className="dz-section-lead">
            有象無象のテンプレート使い回し営業会社とは一線を画す、科学的アプローチの核心。
          </p>
          <div className="dz-reason-grid dz-reveal-stagger">
            {REASONS.map((r) => (
              <article key={r.num} className="dz-reason-card dz-glass-card">
                <span className="dz-reason-num dz-num">{r.num}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-deep" aria-hidden />

      {/* 手順セクション：ドクタープロセス */}
      <section className="dz-flow dz-section dz-section--major" id="flow">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Doctor Process</span>
          <h2 className="dz-section-title">
            LINE登録から、<span>ミスマッチのない診断提案</span>までの流れ。
          </h2>
          <p className="dz-section-lead">
            営業スタッフがお店のカルテを作成し、最適な処方箋（フリーランスの集客パッケージ）を届けるまでの5つのステップ。
          </p>
          <div className="dz-flow-grid dz-reveal-stagger">
            {FLOW_STEPS.map((step) => (
              <div key={step.num} className="dz-flow-step dz-glass-card">
                <div className="dz-flow-dot dz-num">{step.num}</div>
                <h3 className="dz-flow-title">{step.title}</h3>
                <p className="dz-flow-text">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="dz-flow-note dz-glass-card">
            怪しげなURLへの誘導行為は一切行いません。丁寧な対話のチャットテキストのみで関係性を構築するため、フリーランス側の商材ブランドや、実店舗側の安心感を損なうリスクをゼロに抑えています。
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      {/* 料金・プラン比較セクション */}
      <section className="dz-pricing dz-section dz-section--major" id="pricing">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Pricing Logic</span>
          <h2 className="dz-section-title">
            マッチングが成立するまで、<span>一切の費用は発生しません</span>。
          </h2>
          <p className="dz-section-lead">
            完全成果報酬型（単価制、または成約コミッション制）。初期リスクを完全にゼロにできるのは、私たちのデータと仕組みの精度に確かな根拠があるからです。
          </p>
          
          <DivizeroCompareTable />
          
          <div className="dz-pricing-logic dz-glass-card">
            <h3>どちらのプランを選べばいいですか？</h3>
            <p>
              提供する商材・パッケージの平均単価が5万円以下の場合は、「プランA（アポ・マッチング確定ごとに5,000円）」のみが対象となります。5万円を超える高単価商材の場合、実質的なコスト効率だけを考慮すればプランAの方が安く抑えられるケースもあります。それでも多くの制作者様が「プランB（成約時10%）」を選ぶ理由は、成果報酬が最終成約に直結するため、プラットフォーム内で実績を積んだエース級の優秀な営業スタッフが優先的に手を挙げやすく、商談の質と最終的な成約率で大きなメリットが返ってきやすいロジックになっているためです。どちらが最適かは、無料の診断カルテを作成する際に一緒に決定しましょう。
            </p>
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-base" aria-hidden />

      {/* 試算シミュレーターセクション */}
      <section className="dz-simulator-section dz-section dz-section--major">
        <div className="dz-container">
          <DivizeroRewardSimulator />
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      {/* 最終CTAセクション：丁寧で押し付けがましくないお誘い */}
      <section className="dz-cta dz-section dz-section--major">
        <div className="dz-container dz-cta-inner dz-reveal">
          <span className="dz-label">Get Started</span>
          <h2 className="dz-section-title">
            営業の課題はデータに委ねて、<span>本来進むべき場所へ</span>。
          </h2>
          <p className="dz-section-lead">
            公式LINEでの簡単なヒアリングから、あなたに最適な診断チームの構築を開始します。初期費用ゼロ・完全成果報酬。まずはお気軽にお話を聞かせてください。
          </p>
          <LineCta className="dz-btn-primary dz-btn-primary--shine dz-btn-primary--large" />
        </div>
      </section>
    </div>
  );
}