import { DIVIZERO_LINE_URL } from "@/lib/divizero";

export default function CloserAbout() {
  return (
    <>
      <div className="closer-about-hero">
        <div className="closer-about-hero-left">
          <span className="closer-section-label">About</span>
          <h1 className="closer-page-hero-title">
            営業を仕組み化し、
            <br />
            クリエイターに<em>制作の時間</em>を返す。
          </h1>
        </div>
        <div className="closer-about-hero-right">
          <p className="closer-about-hero-quote">
            才能はあるのに、
            <span>営業だけが進まない。</span>
          </p>
        </div>
      </div>

      <div className="closer-about-body">
        <p>
          <em>divizero</em>（ディビゼロ）は、クリエイター・フリーランス専門の営業代行プラットフォームです。
        </p>
        <p>
          代表自身がWeb制作・コンサル・動画制作を経験してきました。準備に時間をかけても、ROIが合わない。プル型だけでは顧客が来ない。競合が増える中で差別化も難しい。使えそうな営業代行は初期費用が高すぎる——そんな問題を、自分自身が感じていました。
        </p>
        <p>
          その経験があるから分かります。いいサービスと信念を持っているのに、「営業の壁」で諦める人がどれだけいるか。divizeroは、その壁をデータとオペレーションで取り除くために生まれました。
        </p>
        <p>
          DMを送っても返信が来ない。モニター募集には反応があるのに、案件化しない。そんな状態は、才能の問題ではなく仕組みの問題です。
        </p>
        <p>
          <strong>
            一般的なDM営業の返信率は2〜4%。divizeroはターゲット選定とアカウント最適化により、返信率40%を実現しています。
          </strong>
          テンプレートの使い回しはせず、クライアントごとにアカウント特性を分析。送信文面・時間帯・2段階ステルスアプローチを組み合わせ、ブランドを傷つけずにアポイントを獲得します。
        </p>
        <p>
          成果報酬型（1アポ5,000円〜）で、営業に時間を奪われない環境をつくる。それが divizero の役割です。
        </p>
      </div>

      <div className="closer-about-brand">
        <span className="closer-section-label">Brand Story</span>
        <h2 className="closer-about-brand-title">Divizeroという名前の意味</h2>
        <p className="closer-about-brand-text">
          「割り切れない（Divide + Zero）」という数学の概念から来ています。本来ひとりでは越えられないお金・時間・スキルのハードルを、チームと仕組みの力でゼロに近づける。あなたのビジネスを「割り切れない壁」で終わらせないために、私たちはいます。
        </p>
      </div>

      <section className="closer-cta-section">
        <span className="closer-cta-label">Start</span>
        <h2 className="closer-cta-title">
          まずは<em>無料相談</em>から。
        </h2>
        <p className="closer-cta-sub">
          商材・ターゲット・現状の課題をお聞きし、最適なプランをご提案します。話を聞くだけでも大丈夫です。
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
