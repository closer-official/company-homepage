import DivizeroCompareTable from "../DivizeroCompareTable";
import DivizeroRewardSimulator from "../DivizeroRewardSimulator";
import DivizeroHeroParticles from "../divizero/DivizeroHeroParticles";
import { ScrollMetric } from "../divizero/AnimatedNumber";
import { DIVIZERO_LINE_URL } from "@/lib/divizero";

const LINE_URL = DIVIZERO_LINE_URL;

const PAIN_ITEMS = [
  "プル型だけでは、いつまで待っても顧客は来ない。かといってプッシュ型をやろうとしたら、時間も初期費用もかかりすぎる。",
  "営業代行を探しても、月額数十万・成果保証なし。いいサービスを持っているのに、営業の壁で諦めそうになっている。",
  "制作には自信がある。でも競合が増えすぎて、「自分だけの差別化」がどうしても見えてこない。",
];

const REASONS = [
  {
    num: "01",
    title: "あなたに興味を持ちそうな人だけに、届ける",
    text: "テンプレートの使い回しを完全排除。あなたのアカウント特性を徹底分析し、最も可能性の高いターゲットを絞り込みます。ブランドを傷つけない、オーダーメイドのアプローチ設計。",
  },
  {
    num: "02",
    title: "返信が来やすい相手に、来やすい時間に送る",
    text: "蓄積データから「最も返信が来やすい文面」「最もアクティブな曜日・時間帯」をシステム化。ピンポイントアプローチで、一般的な返信率2〜4%を40%まで引き上げます。",
  },
  {
    num: "03",
    title: "テキストだけで、自然にアポを取る",
    text: "怪しいURLを踏ませるような営業は一切しません。DM内の丁寧なテキストチャットだけで会話を完結させ、クライアントのカレンダーにZoom面談を直接入れます。",
  },
];

const FLOW_STEPS = [
  { num: "01", title: "公式LINEに登録", text: "まず現状の課題・商材・ターゲットをヒアリングします。" },
  { num: "02", title: "プラン提案", text: "商材単価・目標アポ数をもとに最適なプランをご提案。" },
  { num: "03", title: "アカウント設計", text: "あなたのアカウントを分析し、ターゲット・文面を設計します。" },
  { num: "04", title: "DM運用開始", text: "チームが代わりにDMを送り、返信対応・日程調整を行います。" },
  { num: "05", title: "アポ確定", text: "前向きな相手だけを選び、あなたのカレンダーに商談を届けます。" },
  { num: "06", title: "あなたは商談だけ", text: "来た方の対応だけしていればOK。制作に戻れます。" },
];

const GENRES = [
  "Web制作・LP制作",
  "SNS運用代行",
  "動画制作・編集",
  "コンサルティング",
  "AIコンテンツ制作",
  "グラフィックデザイン",
];

const FAQ_ITEMS = [
  {
    q: "本当に初期費用・月額費用はゼロですか？",
    a: "はい。アポが確定した時点で初めて費用が発生します。成果が出るまで、一切お金はかかりません。",
  },
  {
    q: "今は案件が足りているので不要かもしれません",
    a: "むしろ今のうちに仕組みを整えておくことをおすすめしています。案件が切れてから動いても、営業には時間がかかります。余裕があるうちに「来月の商談が埋まっている状態」を作るのが、長期的に安定する唯一の方法です。",
  },
  {
    q: "どんなジャンルでも対応できますか？",
    a: "SNSを通じて届ける無形商材であれば対応できます。Web制作・LP・SNS運用・コンサル・AIコンテンツ・動画制作など、実績・経験を問わずご相談ください。",
  },
  {
    q: "完全成果報酬って、裏があるんじゃないですか？",
    a: "正直に言うと、私たちが本気を出す理由は「成果が出ないと報酬がゼロだから」です。クライアントにリスクがない分、チーム側にプレッシャーがあります。それがこの仕組みの本質です。",
  },
  {
    q: "いつでも辞められますか？",
    a: "はい。縛りはありません。アポが来なければ費用もかかりません。",
  },
  {
    q: "フォロワーが少なくても大丈夫ですか？",
    a: "はい。むしろフォロワー1万人以下の方を主なターゲットとして設計されたサービスです。フォロワー数より、商材の質とターゲット設計が重要です。",
  },
];

function LineCta({
  className = "dz-btn-primary dz-btn-primary--shine",
}: {
  className?: string;
}) {
  return (
    <a
      href={LINE_URL}
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
      <section className="dz-hero">
        <DivizeroHeroParticles />
        <div className="dz-hero-glow" aria-hidden />
        <div className="dz-hero-inner dz-reveal is-visible">
          <span className="dz-label">Sales Platform / divizero</span>
          <h1 className="dz-hero-title">
            営業を仕組み化し、
            <br />
            クリエイターに<em className="dz-text-gold-gradient">制作の時間</em>を返す。
          </h1>
          <p className="dz-hero-sub">
            初期費用ゼロ。あなたの代わりに商談を取り続ける、完全成果報酬の営業インフラ。
            一般的なDM営業の返信率はわずか2〜4%。divizeroはターゲット選定とアカウント最適化により、返信率40%を実現しています。
          </p>
          <div className="dz-hero-actions">
            <LineCta />
          </div>
          <div className="dz-hero-metrics dz-reveal-stagger">
            <div className="dz-metric dz-glass-card">
              <span className="dz-metric-value dz-text-gold-gradient">
                <ScrollMetric end={40} suffix="%" />
              </span>
              <span className="dz-metric-label">DM返信率（業界平均2〜4%）</span>
            </div>
            <div className="dz-metric dz-glass-card">
              <span className="dz-metric-value dz-text-gold-gradient">
                <ScrollMetric end={0} prefix="¥" />
              </span>
              <span className="dz-metric-label">初期費用・月額費用</span>
            </div>
            <div className="dz-metric dz-glass-card">
              <span className="dz-metric-value dz-text-gold-gradient">
                <ScrollMetric end={5000} prefix="¥" suffix="〜" />
              </span>
              <span className="dz-metric-label">1アポ確定・完全成果報酬</span>
            </div>
          </div>
        </div>
        <div className="dz-scroll-hint">
          <span>scroll</span>
          <div className="dz-scroll-line" />
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      <section className="dz-pain dz-section dz-section--major" id="pain">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Problem</span>
          <h2 className="dz-section-title dz-section-title--ruled">
            せっかくのサービスと信念を、<em className="dz-text-gold-gradient">営業の壁</em>で諦めていませんか？
          </h2>
          <p className="dz-section-lead">
            Web制作・SNS代行・AIコンテンツ——どのジャンルでも、同じ壁にぶつかっているクリエイターがいます。
          </p>
          <div className="dz-pain-grid dz-reveal-stagger">
            {PAIN_ITEMS.map((text, i) => (
              <article key={i} className="dz-pain-card dz-glass-card">
                <span className="dz-pain-num dz-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="dz-pain-closing">
            divizeroは、その壁をデータとオペレーションで取り除きます。
          </p>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-base" aria-hidden />

      <section className="dz-story dz-section dz-section--compact" id="story">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Our Story</span>
          <h2 className="dz-section-title dz-section-title--ruled">
            Divizeroが生まれた、<em className="dz-text-gold-gradient">理由</em>。
          </h2>
          <div className="dz-story-body">
            <p>
              代表自身がWeb制作・コンサル・動画制作を経験してきました。準備に時間をかけても、ROIが合わない。プル型だけでは顧客が来ない。競合が増える中で差別化も難しい。使えそうな営業代行は初期費用が高すぎる。
            </p>
            <p>
              その経験があるから分かります。いいサービスを持っているのに、営業の壁で諦める人がどれだけいるか。
            </p>
            <p>
              Divizeroという名前には「割り切れない」という数学の概念が込められています。本来ひとりでは越えられないお金・時間・スキルのハードルを、チームと仕組みの力でゼロに近づける。あなたのビジネスを「割り切れない壁」で終わらせないために、このサービスを作りました。
            </p>
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      <section className="dz-genres dz-section dz-section--compact" id="genres">
        <div className="dz-container dz-reveal">
          <span className="dz-label">対応ジャンル</span>
          <h2 className="dz-section-title dz-section-title--ruled">
            SNSで届ける<em className="dz-text-gold-gradient">無形商材</em>なら、すべて対応。
          </h2>
          <p className="dz-section-lead">
            共通するのは「SNSを通じて届ける無形商材」であること。ジャンルや経験年数を問わず、まずはご相談ください。
          </p>
          <div className="dz-genres-grid dz-reveal-stagger">
            {GENRES.map((g) => (
              <div key={g} className="dz-genre-tag dz-glass-card">
                {g}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-base" aria-hidden />

      <section className="dz-reasons dz-section dz-section--major" id="reasons">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Why divizero</span>
          <h2 className="dz-section-title dz-section-title--ruled">
            divizeroが選ばれる理由
          </h2>
          <p className="dz-section-lead">
            有象無象の営業代行とは一線を画す、クリエイター専門の営業インフラ。
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

      <section className="dz-flow dz-section dz-section--major" id="flow">
        <div className="dz-container dz-reveal">
          <span className="dz-label">How it works</span>
          <h2 className="dz-section-title dz-section-title--ruled">
            LINE登録から、<em className="dz-text-gold-gradient">商談が届くまで</em>。
          </h2>
          <p className="dz-section-lead">
            ヒアリングから稼働開始まで、最短1週間。あなたがやることは最初のLINE登録だけです。
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
            URLへの誘導は一切行いません。テキストチャットだけで自然にアポを獲得する仕組みを構築しているため、あなたのブランドに傷がつきません。
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      <section className="dz-pricing dz-section dz-section--major" id="pricing">
        <div className="dz-container dz-reveal">
          <span className="dz-label">Pricing</span>
          <h2 className="dz-section-title dz-section-title--ruled">
            売上が出るまで、<em className="dz-text-gold-gradient">一切費用はかかりません</em>。
          </h2>
          <p className="dz-section-lead">
            完全成果報酬だから、リスクはゼロ。チームが本気を出す理由は「成果が出ないと報酬がゼロだから」です。
          </p>
          <DivizeroCompareTable />
          <div className="dz-pricing-logic dz-glass-card">
            <h3>どちらのプランを選べばいい？</h3>
            <p>
              商材単価が5万円以下なら「1アポ5,000円プラン」が割安です。5万円を超える案件が中心であれば「成約時10%プラン」の方がROIが合うケースが多くなります。迷ったらLINEでご相談ください。
            </p>
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-base" aria-hidden />

      <section className="dz-simulator-section dz-section dz-section--major">
        <div className="dz-container">
          <DivizeroRewardSimulator />
        </div>
      </section>

      <div className="dz-slope dz-slope--to-elevated" aria-hidden />

      <section className="dz-faq dz-section dz-section--compact" id="faq">
        <div className="dz-container dz-reveal">
          <span className="dz-label">FAQ</span>
          <h2 className="dz-section-title dz-section-title--ruled">よくある質問</h2>
          <div className="dz-faq-list dz-reveal-stagger">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="dz-faq-item">
                <p className="dz-faq-q">{item.q}</p>
                <p className="dz-faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dz-slope dz-slope--to-deep" aria-hidden />

      <section className="dz-cta dz-section dz-section--major">
        <div className="dz-container dz-cta-inner dz-reveal">
          <span className="dz-label">Get Started</span>
          <h2 className="dz-section-title dz-section-title--ruled">
            営業はdivizeroに任せて、<em className="dz-text-gold-gradient">制作に戻る</em>。
          </h2>
          <p className="dz-section-lead">
            公式LINEでヒアリング後、最短ルートで営業設計を開始します。初期費用ゼロ・完全成果報酬。まず話を聞くだけでも大丈夫です。
          </p>
          <LineCta className="dz-btn-primary dz-btn-primary--shine dz-btn-primary--large" />
        </div>
      </section>

    </div>
  );
}
