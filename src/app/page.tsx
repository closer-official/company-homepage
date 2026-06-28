import fs from "fs";
import path from "path";
import Script from "next/script";

export default function Home() {
  const styleContent = fs.readFileSync(
    path.join(process.cwd(), "public", "home-style.css"),
    "utf-8"
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `body{font-family:'Zen Kaku Gothic New',sans-serif!important;background:#FFFFFF!important;}\n${styleContent}`,
        }}
      />

      {/* ── Intro Splash ── */}
      <div className="intro" id="intro">
        <img src="/favicon.png" alt="divizero" />
      </div>

      {/* ── Header ── */}
      <header className="head" id="head">
        <img src="/favicon.png" alt="divizero" />
        <a href="#cta" className="cta-mini">無料でデモを見る</a>
      </header>

      {/* ================================================================
          01. HERO
      ================================================================ */}
      <section className="hero" id="cta">
        <div className="wrap">
          <div className="hero-inner">
            {/* Left: copy */}
            <div className="hero-text reveal">
              <h1>せっかくSNSで集客しても、<br />ザルになっていませんか？</h1>
              <p className="hero-sub">
                フォロワーが増えても「問い合わせゼロ」「見積もり一回切り」——<br />
                その原因は<strong>LP・導線・クロージングの設計</strong>にあります。<br />
                DIVIZEROは、集客→受注までの穴を一気に埋めます。
              </p>
              <div className="hero-cta">
                <p className="hero-limit">＼毎月先着5名様限定！／</p>
                <a href="https://line.me/R/ti/p/@divizero" className="btn-cta" target="_blank" rel="noopener noreferrer">
                  無料でデモ・ヒアリングを受ける
                </a>
                <p className="hero-disclaimer">※無理な営業は一切しません</p>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="hero-img reveal">
              <img src="/hero-pain.png" alt="SNS集客の悩みを抱えるクリエイター" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          02. PROBLEM
      ================================================================ */}
      <section className="problem">
        <div className="wrap">
          <h2 className="reveal">こんなお悩み、ありませんか？</h2>
          <ul className="problem-list reveal">
            <li>SNSのフォロワーは増えているのに、仕事の問い合わせが来ない</li>
            <li>問い合わせはあっても「価格が高い」と言われ、成約しない</li>
            <li>見積もりを出した後、音信不通になることが多い</li>
            <li>営業のやり方がわからず、受注を人脈頼みにしている</li>
            <li>LP（ランディングページ）を作ったが、効果が出ていない</li>
            <li>自分の実績や強みをどうアピールすればいいか迷っている</li>
          </ul>
        </div>
      </section>

      {/* ================================================================
          03. SOLUTION
      ================================================================ */}
      <section className="solution">
        <div className="wrap">
          <h2 className="reveal">その悩み、DIVIZEROが解決します</h2>
          <p className="solution-copy reveal">
            DIVIZEROは「集客→受注」の全工程を設計・実行します。<br />
            LP改善・クロージングスクリプト・SNS導線設計まで、<br />
            まるごとサポートするから、あなたは<strong>制作だけに集中</strong>できます。
          </p>
          <div className="solution-prices reveal">
            <p>
              業界平均のLP制作費{" "}
              <span className="hl">30〜80万円</span>
            </p>
            <p>
              DIVIZEROなら月額{" "}
              <span className="hl">5万円〜</span>
            </p>
          </div>
          <h3 className="reveal">なぜここまで安くできるのか？</h3>
          <div className="solution-reason reveal">
            クリエイター特化のテンプレートと実績データを活用しているため、
            ゼロからの設計コストがかかりません。また、代表が自ら実行するため、
            代理店マージンも一切なし。その分をすべてお客様の価格に還元しています。
          </div>
        </div>
      </section>

      {/* ================================================================
          04. WORKS
      ================================================================ */}
      <section className="work-sec">
        <div className="wrap">
          <span className="sec-eyebrow reveal">Works</span>
          <h2 className="sec-heading reveal">支援実績</h2>
          <div className="gallery">
            {/* Work 1 */}
            <article className="frame reveal">
              <div className="frame-bar">
                <i /><i /><i />
                <span>cafe-lp.divizero.jp</span>
              </div>
              <div className="frame-img">
                <img src="/works/work-cafe.gif" alt="カフェ・飲食店LP改善事例" loading="lazy" />
              </div>
              <div className="frame-info">
                <p className="frame-title">カフェ / 飲食店</p>
                <p className="frame-type">LP改善 + SNS導線設計</p>
                <p className="frame-result">CVR 2.5%改善！ 予約数が2倍に</p>
              </div>
            </article>

            {/* Work 2 */}
            <article className="frame reveal">
              <div className="frame-bar">
                <i /><i /><i />
                <span>music-lp.divizero.jp</span>
              </div>
              <div className="frame-img">
                <img src="/works/work-music.gif" alt="音楽・レッスン事業LP改善事例" loading="lazy" />
              </div>
              <div className="frame-info">
                <p className="frame-title">音楽スクール / レッスン</p>
                <p className="frame-type">LP全面リニューアル + クロージング設計</p>
                <p className="frame-result">問い合わせ数が3倍に！ 成約率60%超</p>
              </div>
            </article>

            {/* Work 3 */}
            <article className="frame reveal">
              <div className="frame-bar">
                <i /><i /><i />
                <span>futsal-lp.divizero.jp</span>
              </div>
              <div className="frame-img">
                <img src="/works/work-futsal.gif" alt="フットサル・スポーツ教室LP改善事例" loading="lazy" />
              </div>
              <div className="frame-info">
                <p className="frame-title">フットサルスクール</p>
                <p className="frame-type">導線設計 + LINEクロージング</p>
                <p className="frame-result">体験申込が月40件→120件！ 3倍達成</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================================================================
          05. SOCIAL PROOF
      ================================================================ */}
      <section className="social-proof">
        <div className="wrap">
          <h2 className="reveal">ご利用いただいた方の声</h2>
          <div className="review-cards">
            <div className="review-card reveal">
              <img src="/avatar-review.png" alt="レビュアー" />
              <div>
                <p className="review-text">
                  SNSでフォロワーが増えても全然仕事に繋がらなかったのに、
                  DIVIZEROにLP改善を依頼してから問い合わせが止まらなくなりました。
                  投資対効果が段違いです。
                </p>
                <p className="review-meta">フリーランスWebデザイナー・30代女性</p>
              </div>
            </div>
            <div className="review-card reveal">
              <img src="/avatar-review.png" alt="レビュアー" />
              <div>
                <p className="review-text">
                  「値段が高い」と断られ続けていたのに、
                  クロージングスクリプトを変えただけで成約率が劇的に上がりました。
                  もっと早く相談すればよかったと後悔しています。
                </p>
                <p className="review-meta">映像クリエイター・20代男性</p>
              </div>
            </div>
            <div className="review-card reveal">
              <img src="/avatar-review.png" alt="レビュアー" />
              <div>
                <p className="review-text">
                  営業が苦手で人脈頼みだった私でも、
                  仕組みをつくってもらったことで安定して案件が取れるようになりました。
                  制作に集中できる環境になって本当に助かっています。
                </p>
                <p className="review-meta">イラストレーター・30代女性</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          06. OFFER（作れるもの）
      ================================================================ */}
      <section className="offer-sec">
        <div className="wrap">
          <span className="sec-eyebrow reveal">What we do</span>
          <h2 className="sec-heading reveal">DIVIZEROができること</h2>
          <ul className="olist reveal">
            <li className="row">
              <b>LP設計・改善</b>
              <p>集客→問い合わせ→成約の導線を丸ごと設計。既存LPの改善も対応します。</p>
            </li>
            <li className="row">
              <b>SNS導線設計</b>
              <p>InstagramやX（旧Twitter）のプロフィール・投稿導線を最適化し、LPへの流入を最大化。</p>
            </li>
            <li className="row">
              <b>クロージング支援</b>
              <p>見積もり後に音信不通にならないためのスクリプト・フォローアップ設計を提供。</p>
            </li>
            <li className="row">
              <b>LINEステップ設計</b>
              <p>問い合わせから商談・成約までLINEで自動化。離脱を防いで受注率を高めます。</p>
            </li>
          </ul>
        </div>
      </section>

      {/* ================================================================
          07. PRICE
      ================================================================ */}
      <section className="price-sec">
        <div className="wrap">
          <span className="sec-eyebrow reveal">Price</span>
          <h2 className="sec-heading reveal">料金プラン</h2>
          <div className="ptable reveal">
            <div className="pr">
              <div className="name">
                スターター<small>LP1ページ + SNS導線レビュー</small>
              </div>
              <div className="amt">¥50,000<small>/月</small></div>
            </div>
            <div className="pr">
              <div className="name">
                スタンダード<small>LP + SNS + LINEステップ設計</small>
              </div>
              <div className="amt">¥80,000<small>/月</small></div>
            </div>
            <div className="pr">
              <div className="name">
                フルサポート<small>全工程 + クロージング同席サポート</small>
              </div>
              <div className="amt">¥120,000<small>/月</small></div>
            </div>
          </div>
          <p className="price-note reveal">
            ※ 最低契約期間は<em>3ヶ月</em>から。<br />
            ※ 別途、広告運用費・ツール利用料は含みません。<br />
            ※ 毎月先着<em>5名様</em>限定のため、定員に達し次第募集を締め切ります。
          </p>
        </div>
      </section>

      {/* ================================================================
          08. STEPS
      ================================================================ */}
      <section className="steps-sec">
        <div className="wrap">
          <span className="sec-eyebrow reveal">Flow</span>
          <h2 className="sec-heading reveal">ご利用の流れ</h2>
          <div className="stlist reveal">
            <div className="st">
              <div className="n">01</div>
              <div className="tx">
                無料ヒアリング（30分）<small>現状の課題・目標・ご予算をお伺いします。</small>
              </div>
            </div>
            <div className="st">
              <div className="n">02</div>
              <div className="tx">
                改善プラン提案<small>ヒアリング内容をもとに、具体的な施策と見積もりをご提示。</small>
              </div>
            </div>
            <div className="st">
              <div className="n">03</div>
              <div className="tx">
                契約・キックオフ<small>ご納得いただいた上で契約。即日〜最短1週間で着手します。</small>
              </div>
            </div>
            <div className="st">
              <div className="n">04</div>
              <div className="tx">
                実装・運用・改善<small>月次レポートをもとにPDCAを回し、成果を最大化します。</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          09. FOUNDER
      ================================================================ */}
      <section className="founder-sec">
        <div className="wrap">
          <div className="founder-inner">
            <div className="founder-photo reveal">
              <img src="/images/about-founder.png" alt="代表 小林薫之介" />
            </div>
            <div className="founder-bio reveal">
              <span className="eyebrow">Founder</span>
              <p className="name">小林 薫之介</p>
              <span className="role">Kanosuke Kobayashi — Founder &amp; CEO, divizero</span>
              <p>
                新卒でフリーランスのWebデザイナーとして独立。「良いものを作れば売れる」と信じていたが、
                仕事は人脈だけで頭打ちに。悩んだ末にマーケティングと営業設計を独学で学び、
                SNS経由で月20件以上の安定受注を実現。
              </p>
              <p>
                その経験から「クリエイターが制作に集中できる環境をつくりたい」と
                <strong>divizero</strong>を創業。現在は同じ課題を抱えるフリーランス・小規模事業者の
                「集客→受注」設計をまるごと支援している。
              </p>
              <blockquote className="founder-story">
                「SNSで頑張っているのに、なぜ仕事に繋がらないんだろう——
                そう悩んでいた過去の自分に、このサービスを届けたかった。
                一人のクリエイターが安心して生き続けられる社会を、仕組みから変えていきます。」
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          10. FAQ
      ================================================================ */}
      <section className="faq-sec">
        <div className="wrap">
          <span className="sec-eyebrow reveal">FAQ</span>
          <h2 className="sec-heading reveal">よくあるご質問</h2>
          <div className="qa reveal">
            <details>
              <summary>制作物（LP等）の著作権はどうなりますか？</summary>
              <p className="a">成果物の著作権は、ご契約完了後にお客様へ完全に移譲いたします。追加費用は一切ありません。</p>
            </details>
            <details>
              <summary>フリーランスではなく法人でも利用できますか？</summary>
              <p className="a">はい。法人・個人事業主・フリーランスを問わず対応しています。業種・規模もご相談ください。</p>
            </details>
            <details>
              <summary>効果が出なかった場合はどうなりますか？</summary>
              <p className="a">月次レポートをもとに施策を改善し続けます。一定期間内に合意した目標に届かない場合は、契約継続の判断を一緒に見直す機会をご提供します。</p>
            </details>
            <details>
              <summary>すでにLPがある場合、改善だけ依頼できますか？</summary>
              <p className="a">もちろんです。既存のLPを診断し、改善箇所を洗い出した上でご提案します。スクラッチ制作よりもコストを抑えられる場合があります。</p>
            </details>
            <details>
              <summary>対応エリアはどこですか？</summary>
              <p className="a">全国対応しています。打ち合わせはZoom等のオンラインで行いますので、場所を問わずご利用いただけます。</p>
            </details>
          </div>
        </div>
      </section>

      {/* ================================================================
          11. FINAL CTA
      ================================================================ */}
      <section className="final-cta" id="contact">
        <div className="wrap">
          <h2 className="reveal">まず、30分だけ話を聞かせてください。</h2>
          <p className="tagline reveal">
            無理な営業は一切しません。現状をお伺いして、<br />
            改善できるポイントがあればお伝えするだけです。
          </p>
          <p className="limit reveal">＼毎月先着5名様限定！／</p>
          <a
            href="https://line.me/R/ti/p/@divizero"
            className="btn-cta reveal"
            target="_blank"
            rel="noopener noreferrer"
          >
            無料でデモ・ヒアリングを受ける
          </a>
          <p className="disclaimer reveal">※無理な営業は一切しません</p>
        </div>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="foot-l">
        <div className="wrap">
          <img src="/favicon.png" alt="divizero" />
          <span className="copy">© divizero / Closer事務局</span>
        </div>
      </footer>

      {/* ================================================================
          STICKY CTA（スクロール後に固定表示）
      ================================================================ */}
      <div className="sticky-cta" id="sticky-cta">
        <p className="sticky-label">毎月先着5名様限定 — 無料ヒアリング受付中</p>
        <a
          href="https://line.me/R/ti/p/@divizero"
          className="btn-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          無料でデモ・ヒアリングを受ける
        </a>
      </div>

      <Script src="/home-script.js" strategy="afterInteractive" />
    </>
  );
}
