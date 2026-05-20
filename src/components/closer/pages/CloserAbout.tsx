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
          <em>divizero</em>（ディビゼロ）は、クリエイター・フリーランスの営業代行プラットフォームです。
        </p>
        <p>
          DMを送っても返信が来ない。モニター募集には反応があるのに、案件化しない。制作に集中したいのに、営業の心理的ハードルで止まってしまう——そんな状態を、データとオペレーションで解消します。
        </p>
        <p>
          <strong>
            一般的なDM営業の返信率は2〜4%。divizeroはターゲット選定とアカウント最適化により、返信率40%を実現しています。
          </strong>
        </p>
        <p>
          テンプレートの使い回しはせず、クライアントごとにアカウント特性を分析。送信文面・時間帯・2段階ステルスアプローチを組み合わせ、ブランドを傷つけずにアポイントを獲得します。
        </p>
        <p>
          成果報酬型（1アポ5,000円〜）で、営業に時間を奪われない環境をつくる。それが divizero の役割です。
        </p>
      </div>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Start</span>
        <h2 className="closer-cta-title">
          まずは<em>公式LINE</em>から。
        </h2>
        <p className="closer-cta-sub">
          商材・ターゲット・現状の課題をお聞きし、最適なプランをご提案します。
        </p>
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
