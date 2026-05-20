import DivizeroCompareTable from "@/components/closer/DivizeroCompareTable";
import { DIVIZERO_LINE_URL } from "@/lib/divizero";

const FAQ_ITEMS = [
  {
    q: "本当に初期費用・月額費用はゼロですか？",
    a: "はい。アポが確定した時点で初めて費用が発生します。成果が出るまで、一切お金はかかりません。",
  },
  {
    q: "どちらのプランを選べばいいですか？",
    a: "商材単価5万円以下は「1アポ5,000円プラン」のみです。5万円超は単価だけ見ると5,000円プランの方が安く見えることもありますが、成約時10%プランは報酬が成約に直結するため、実績のある営業パートナーが手を挙げやすく、商談の質と成約率で見返りが出やすいケースが多いです。ベース＋成約時インセンティブでのお支払いも準備しています。最適な形はヒアリングのうえ一緒に決めましょう。",
  },
  {
    q: "いつでも辞められますか？",
    a: "はい。縛りはありません。アポが来なければ費用もかかりません。",
  },
];

export default function CloserPricing() {
  return (
    <div className="dz-subpage">
      <div className="closer-pricing-hero dz-reveal is-visible">
        <span className="closer-section-label">Pricing</span>
        <h1 className="closer-page-hero-title closer-page-hero-title--ruled">
          売上が出るまで、<em>一切費用はかかりません</em>。
        </h1>
        <p className="closer-page-hero-lead">
          完全成果報酬だから、リスクはゼロ。チームが本気を出す理由は「成果が出ないと報酬がゼロだから」です。
        </p>
      </div>

      <div className="closer-pricing-soft-band dz-reveal dz-glass-card">
        商材単価が5万円を超える場合は、成約時報酬10%プランも選択可能です。詳細はトップページの報酬シミュレーターでご確認ください。
      </div>

      <div className="closer-pricing-compare-wrap dz-reveal">
        <DivizeroCompareTable />
      </div>

      <div className="closer-pricing-guide dz-reveal">
        <span className="closer-section-label">Plan Guide</span>
        <h2 className="closer-section-title closer-section-title--ruled">
          どちらのプランを選べばいい？
        </h2>
        <p className="closer-pricing-guide-lead">
          5万円以下は5,000円プランのみ。5万円超は費用だけ見ると5,000円の方が安く見えることもありますが、10%プランは成約報酬が直結するため、実績のある営業パートナーが集まりやすく、質で見返りが出るケースが多いです。
        </p>
        <div className="closer-pricing-guide-grid dz-reveal-stagger">
          <div className="closer-pricing-guide-card dz-glass-card">
            <p className="closer-pricing-guide-label">1アポ5,000円プランが向いている方</p>
            <p className="closer-pricing-guide-text">
              商材単価5万円以下（このプランのみ対象）。まず低リスクで始めたい方。アポ数を優先したい方。
            </p>
          </div>
          <div className="closer-pricing-guide-card dz-glass-card">
            <p className="closer-pricing-guide-label">成約時10%プランが向いている方</p>
            <p className="closer-pricing-guide-text">
              商材単価5万円超で選択可能。単価より、実績者のアサインと商談の質を重視したい方。成約報酬が動機づけになる商材向け。
            </p>
          </div>
        </div>
        <p className="closer-pricing-guide-foot">
          ベース＋成約時インセンティブでのお支払いも準備しています。何がいちばん合うかは、商材・体制・目標を伺ったうえで一緒に決めましょう。
        </p>
      </div>

      <div className="closer-pricing-faq dz-reveal">
        <span className="closer-section-label">FAQ</span>
        <h2 className="closer-section-title closer-section-title--ruled">よくある質問</h2>
        <div className="dz-faq-list">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="dz-faq-item">
              <p className="dz-faq-q">{item.q}</p>
              <p className="dz-faq-a">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="closer-pricing-note dz-reveal">
        正式な条件・適用プランは、ヒアリング後にご案内します。トップページのシミュレーターは目安です。
      </div>

      <section className="closer-cta-section dz-reveal">
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
          className="closer-btn-gold closer-btn-gold--shine"
        >
          まずは無料相談（公式LINE）
        </a>
      </section>
    </div>
  );
}
