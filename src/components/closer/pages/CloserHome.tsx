import Link from "next/link";
import HomeHeroArt from "../HomeHeroArt";

const PAIN_ITEMS = [
  "Instagramの投稿は頑張っている",
  "写真や雰囲気には自信がある",
  "でも、初めてのお客様に必要な情報がまとまっていない",
  "GoogleマップやSNSだけでは伝えきれない",
  "営業時間、メニュー、予約導線、お知らせを整理したい",
  "ホームページ費用が高すぎてどこに頼めばいいか分からない",
];

export default function CloserHome() {
  return (
    <>
      <section className="closer-hero">
        <div className="closer-hero-left">
          <span className="closer-hero-eyebrow">
            Closer by divizero（ブランド読み：ディビゼロ）— Web Production
          </span>
          <h1 className="closer-hero-title">
            SNSだけでは
            <br />
            伝わりきらない<em>魅力</em>を、
            <br />
            Webで伝わる形に整える。
          </h1>
          <p className="closer-hero-sub">
            ディビゼロ（divizero）が、飲食店や実店舗の魅力を来店前のお客様にきちんと伝えるためのWebページを制作しています。写真や世界観の良さを活かしながら、初めての人でも安心して問い合わせ・来店できる導線を整えます。
          </p>
          <div className="closer-hero-actions">
            <Link href="/contact" className="closer-btn-primary">
              無料で相談する
            </Link>
            <Link href="/services" className="closer-btn-secondary">
              制作内容を見る
            </Link>
          </div>
        </div>
        <div className="closer-hero-right">
          <div className="closer-hero-visual">
            <div className="closer-hero-grid-art">
              <HomeHeroArt />
            </div>
          </div>
        </div>
        <div className="closer-hero-brand-note">運営元：Closer事務局</div>
        <div className="closer-scroll-hint">
          <span>scroll</span>
          <div className="closer-scroll-line" />
        </div>
      </section>

      <section className="closer-pain-section">
        <span className="closer-section-label">For</span>
        <h2 className="closer-section-title" style={{ color: "var(--cream)", maxWidth: "none" }}>
          こんなお店に
          <em style={{ color: "var(--gold-light)" }}>向いています</em>。
        </h2>
        <div className="closer-pain-grid">
          {PAIN_ITEMS.map((text, i) => (
            <div key={text} className="closer-pain-item">
              <span className="closer-pain-num">{String(i + 1).padStart(2, "0")}</span>
              <p className="closer-pain-text">{text}</p>
            </div>
          ))}
        </div>
        <p className="closer-pain-closing">
          そんなお店のために、必要な情報を見やすく整えた
          <br />
          Webページを制作しています。
        </p>
      </section>

      <section className="closer-what-section">
        <div className="closer-what-cols">
          <div>
            <span className="closer-section-label">What We Do</span>
            <h2 className="closer-section-title">
              見た目を作るだけではなく、<em>伝わる導線</em>を整えます。
            </h2>
            <div className="closer-what-cards">
              <div className="closer-what-card">
                <div className="closer-what-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <div>
                  <div className="closer-what-card-title">魅力が伝わる</div>
                  <p className="closer-what-card-text">
                    写真・雰囲気・お店の強みが、初めての人にも伝わる形で整理されます。
                  </p>
                </div>
              </div>
              <div className="closer-what-card">
                <div className="closer-what-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                  </svg>
                </div>
                <div>
                  <div className="closer-what-card-title">情報がまとまる</div>
                  <p className="closer-what-card-text">
                    営業時間、アクセス、メニュー、予約方法、お知らせなどが一か所に集まります。
                  </p>
                </div>
              </div>
              <div className="closer-what-card">
                <div className="closer-what-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div>
                  <div className="closer-what-card-title">導線が整う</div>
                  <p className="closer-what-card-text">
                    Instagram・Googleマップ・予約導線・問い合わせ導線を分かりやすく接続します。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="closer-what-right">
            <p className="closer-what-quote">
              来店前のお客様が不安なく<em>お店を知り</em>、安心して<em>行動できる</em>状態をつくること。
            </p>
            <p className="closer-what-desc">
              ディビゼロ（divizero）の飲食・実店舗向けブランドとして、Closer by divizero
              が大切にしているのは、ただページを作ることではありません。SNSやGoogleマップで十分に伝わりきれていない部分を補い、お客様がスムーズにお店へたどり着ける仕組みを整えます。
            </p>
          </div>
        </div>
      </section>

      <section className="closer-features-section">
        <span className="closer-section-label">Features</span>
        <h2 className="closer-section-title">
          小さく始めて、必要に応じて<em>整えていけます</em>。
        </h2>
        <p className="closer-features-desc">
          最初から大がかりなホームページを作るのではなく、今ある情報を活かしながら、必要十分な受け皿を作ることを基本にしています。
        </p>
        <div className="closer-features-cols">
          <div className="closer-feature-card">
            <div className="closer-feature-num">01</div>
            <div className="closer-feature-title">低負担で始めやすい</div>
            <p className="closer-feature-text">
              まずは必要最低限の情報を整理した受け皿を作成。大がかりな作業なく、スモールスタートが可能です。
            </p>
          </div>
          <div className="closer-feature-card">
            <div className="closer-feature-num">02</div>
            <div className="closer-feature-title">段階的に整えられる</div>
            <p className="closer-feature-text">
              状況に応じて更新サポートや追加ページの制作も対応。お店の成長に合わせて変えていけます。
            </p>
          </div>
          <div className="closer-feature-card">
            <div className="closer-feature-num">03</div>
            <div className="closer-feature-title">スマホ対応・導線設計</div>
            <p className="closer-feature-text">
              スマートフォンで読みやすく設計し、問い合わせや来店につながる自然な導線を構築します。
            </p>
          </div>
        </div>
      </section>

      <section className="closer-flow-section">
        <span className="closer-section-label">Process</span>
        <h2 className="closer-section-title">ご相談から公開までの流れ</h2>
        <div className="closer-flow-steps">
          {[
            { n: "01", t: "ご相談", d: "現在の状況やご要望をお聞きします" },
            { n: "02", t: "内容確認", d: "必要なページ・情報を整理します" },
            { n: "03", t: "プラン提案", d: "ご予算・目的に応じたプランをご提案" },
            { n: "04", t: "制作・確認", d: "制作後、内容を確認いただきます" },
            { n: "05", t: "公開", d: "ご確認後、Webページを公開します" },
            { n: "06", t: "更新対応", d: "必要に応じて更新・改善に対応します" },
          ].map((s) => (
            <div key={s.n} className="closer-flow-step">
              <div className="closer-flow-dot">{s.n}</div>
              <div className="closer-flow-step-title">{s.t}</div>
              <p className="closer-flow-step-text">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="closer-flow-note">
          事前にご案内するデモは、仮情報やフリー素材を用いたサンプルです。正式制作時には、実際の店舗情報やご要望に合わせて内容を整えます。
        </p>
      </section>

      <section className="closer-price-teaser">
        <span className="closer-section-label">Pricing</span>
        <h2 className="closer-section-title">ご予算や運用体制に合わせて選べます。</h2>
        <p className="closer-price-teaser-sub">
          まずは必要最低限で始めたい方向けのプランから、更新対応を含むプランまでご用意しています。
        </p>
        <div className="closer-price-btns">
          <Link href="/pricing" className="closer-btn-primary">
            料金の目安を見る
          </Link>
          <Link href="/contact" className="closer-btn-secondary">
            無料で相談する
          </Link>
        </div>
      </section>

      <section className="closer-cta-section">
        <span className="closer-cta-label">Contact</span>
        <h2 className="closer-cta-title">
          まずは、お店の状況を<em>聞かせてください</em>。
        </h2>
        <p className="closer-cta-sub">
          「こういうものが必要か分からない」という段階でも問題ありません。今の発信状況やお悩みに合わせて、必要な形をご提案します。
        </p>
        <Link href="/contact" className="closer-btn-gold">
          無料で相談する
        </Link>
      </section>
    </>
  );
}
