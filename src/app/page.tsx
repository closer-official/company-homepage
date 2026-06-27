import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Divizero | LP・HP制作の相談窓口",
  description:
    "XやInstagramで発信している個人事業主・コンサル・アフィリエイターのLP/HP制作相談窓口。買い切り4.98万〜、最短1週間、無料デモあり。まずLINEで気軽に話しかけてください。",
  openGraph: {
    title: "Divizero | LP・HP制作の相談窓口",
    description:
      "フォロワーを確実に「顧客」に変える、成約率特化型のLP制作。買い切り4.98万円〜、最短1週間納品。",
  },
};

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

      {/* イントロアニメーション */}
      <div className="intro" id="intro" aria-hidden="true">
        <img src="/favicon.png" alt="divizero" />
      </div>

      {/* ナビゲーションヘッダー */}
      <header className="head" id="head">
        <img src="/favicon.png" alt="divizero" />
        <a href="#cta" className="cta-mini">無料でデモを見る</a>
      </header>

      {/* ===== S1: ヒーロー ===== */}
      <section className="hero" id="top">
        <div className="wrap">
          <h1 className="hjp hero-headline-new">
            せっかくSNSで集客しても、<br />ザルになっていませんか？
          </h1>
          <p className="sub">
            フォロワーを確実に「顧客」に変える、成約率特化型のLP制作。
          </p>
          <div className="cta-row">
            <p className="micro-copy-top">＼毎月先着5名様限定！／</p>
            <a href="#cta" className="btn btn-orange">
              今すぐ無料で構成案のデモを見る <span className="arr">→</span>
            </a>
            <p className="micro-copy-bottom">※無理な営業は一切しません</p>
          </div>
        </div>
      </section>

      {/* ===== S2: 共感（Problem） ===== */}
      <section className="sec problem-sec">
        <div className="wrap">
          <h2 className="problem-heading reveal">こんなお悩みありませんか？</h2>
          <ul className="problem-list">
            <li className="reveal">SNSのフォロワーは増えたのに、売上に繋がらない…</li>
            <li className="reveal">案内するページがダサくて、離脱されている気がする…</li>
            <li className="reveal">制作会社に見積もりを出したら、高すぎて手が出なかった…</li>
          </ul>
        </div>
      </section>

      {/* ===== S3: 解決策（Solution） ===== */}
      <section className="sec solution-sec">
        <div className="wrap">
          <h2 className="solution-heading reveal">その悩み、DIVIZEROが解決します。</h2>
          <p className="solution-copy reveal">
            24時間、文句も言わずに営業し続ける「優秀な営業マン（LP）」を手に入れませんか？
          </p>
          <div className="solution-highlight reveal">
            <span className="hl-item">
              買い切り <span className="hl">4.98万円〜</span>
            </span>
            <span className="hl-item">
              <span className="hl">最短1週間</span>で納品
            </span>
          </div>
          <div className="solution-reason reveal">
            <h3>なぜ4.98万円で提供できるのか？</h3>
            <p>
              テンプレートの活用と、無駄なディレクション費用を徹底的にカットしているため、高品質でありながら低価格を実現しています。
            </p>
          </div>
        </div>
      </section>

      {/* ===== S4: 実績（Works） ===== */}
      <section className="sec">
        <div className="wrap">
          <div className="shead reveal">
            <div className="no">01</div>
            <div className="tt">
              <span className="eyebrow">work</span>
              <h2 className="hjp">言葉より、<br />見てもらうほうが早い。</h2>
            </div>
          </div>
          <div className="body-col">
            <p className="work-lead reveal hjp">
              カフェ、音楽レーベル、<wbr />スポーツクラブ。<br />
              さまざまな業種に<wbr />対応できます。
            </p>
            <div className="gallery">
              <div className="frame reveal">
                <div className="bar">
                  <i></i><i></i><i></i>
                  <span className="u">cafe</span>
                </div>
                <div className="shot cafe">
                  <img src="/works/work-cafe.gif" alt="カフェ ブランドサイト" />
                </div>
                <div className="cap">
                  <b>カフェ</b><span>販売・予約ページ</span>
                </div>
                <p className="work-highlight">▶ CVR 〇%改善！</p>
              </div>
              <div className="frame reveal">
                <div className="bar">
                  <i></i><i></i><i></i>
                  <span className="u">music label</span>
                </div>
                <div className="shot label">
                  <img src="/works/work-music.gif" alt="音楽レーベル コーポレートサイト" />
                </div>
                <div className="cap">
                  <b>音楽レーベル</b><span>登録ページ</span>
                </div>
                <p className="work-highlight">▶ 売上が〇倍に！</p>
              </div>
              <div className="frame reveal">
                <div className="bar">
                  <i></i><i></i><i></i>
                  <span className="u">futsal club</span>
                </div>
                <div className="shot club">
                  <img src="/works/work-futsal.gif" alt="フットサルクラブ 公式サイト" />
                </div>
                <div className="cap">
                  <b>スポーツクラブ</b><span>受け取りページ</span>
                </div>
                <p className="work-highlight">▶ 新規会員 〇%増！</p>
              </div>
            </div>
            <p className="swipe-hint reveal">swipe →</p>
            <p className="work-foot reveal">
              業種が違っても、共通しているのは「ちゃんと伝わること」です。
            </p>
          </div>
        </div>
      </section>

      {/* ===== S5: お客様の声（Social Proof） ===== */}
      <section className="sec social-proof-sec">
        <div className="wrap">
          <h2 className="social-proof-heading reveal">ご利用いただいたお客様の声</h2>
          <div className="review-list">
            <div className="review-card reveal">
              <div className="review-avatar">☕</div>
              <div className="review-body">
                <p className="review-text">
                  制作費が高くて諦めていましたが、4.98万円でこのクオリティは驚きです。導入後、問い合わせが3倍になりました。
                </p>
                <p className="review-meta">30代 / カフェオーナー</p>
              </div>
            </div>
            <div className="review-card reveal">
              <div className="review-avatar">💼</div>
              <div className="review-body">
                <p className="review-text">
                  洗練されたデザインのおかげで、サービスのブランド価値が上がり、成約率が大幅に向上しました。
                </p>
                <p className="review-meta">40代 / ITコンサル</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== S6: 作れるもの（Offer） ===== */}
      <section className="sec sec-alt-bg">
        <div className="wrap">
          <div className="shead reveal">
            <div className="no">02</div>
            <div className="tt">
              <span className="eyebrow">what we make</span>
              <h2 className="hjp">作っているのは、<br />主にこの3つです。</h2>
            </div>
          </div>
          <div className="body-col">
            <div className="olist reveal">
              <div className="row">
                <b>販売ページ</b>
                <p>商品やサービスを「申し込む」まで運ぶ1枚。</p>
              </div>
              <div className="row">
                <b>登録ページ</b>
                <p>LINEやメルマガへの入口になるページ。</p>
              </div>
              <div className="row">
                <b>受け取りページ</b>
                <p>特典やプレゼントを届けるページ。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== S7: 料金（Price） ===== */}
      <section className="sec">
        <div className="wrap">
          <div className="shead reveal">
            <div className="no">03</div>
            <div className="tt">
              <span className="eyebrow">pricing</span>
              <h2 className="hjp">買い切り。<br />月額は、ありません。</h2>
            </div>
          </div>
          <div className="body-col">
            <div className="ptable reveal">
              <div className="pr">
                <div className="name">
                  販売ページ<small>1枚</small>
                </div>
                <div className="amt">
                  49,800<small>円〜</small>
                </div>
              </div>
              <div className="pr">
                <div className="name">
                  ホームページ<small>5ページ</small>
                </div>
                <div className="amt">
                  98,000<small>円〜</small>
                </div>
              </div>
            </div>
            <p className="price-note reveal">
              制作会社に頼めば数十万、サブスク型なら毎月の支払いが続きます。<br />
              <em>これは一度きりの支払い。</em>作ったページは、ずっとあなたのものです。
            </p>
          </div>
        </div>
      </section>

      {/* ===== S8: 始め方（Steps） ===== */}
      <section className="sec sec-alt-bg">
        <div className="wrap">
          <div className="shead reveal">
            <div className="no">04</div>
            <div className="tt">
              <span className="eyebrow">how it starts</span>
              <h2 className="hjp">始め方は、<br />シンプルです。</h2>
            </div>
          </div>
          <div className="body-col">
            <div className="stlist">
              <div className="st reveal">
                <div className="n">01</div>
                <div className="tx">LINEかDMで、ひとこと話しかける</div>
              </div>
              <div className="st reveal">
                <div className="n">02</div>
                <div className="tx">あなた向けのデモを、無料で受け取る</div>
              </div>
              <div className="st reveal">
                <div className="n">03</div>
                <div className="tx">
                  気に入ったら、進める
                  <small>気に入らなければ、それで終わりです。</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== S9: 代表者（Founder） ===== */}
      <section className="sec">
        <div className="wrap">
          <div className="shead reveal">
            <div className="no">05</div>
            <div className="tt">
              <span className="eyebrow">who you&#39;ll talk to</span>
              <h2 className="hjp">話を聞くのは、<br />こういう人間です。</h2>
            </div>
          </div>
          <div className="body-col">
            <div className="founder-card reveal">
              <div className="founder-photo">
                <img src="/images/about-founder.png" alt="小林 薫之介" />
              </div>
              <div className="founder-bio">
                <div className="name">小林 薫之介</div>
                <div className="role">divizero</div>
                <p>
                  Web制作やSNS運用に関わるなかで、「中身はいいのに、見せ方で損をしている人」をたくさん見てきました。
                </p>
                <p className="soft">
                  制作会社にいきなり連絡するのは、誰でも気が重いものです。だから私は、その手前で気軽に話せる相手でいたいと思っています。
                </p>
                <p>
                  うまく言葉にできなくて大丈夫です。「こんなことがしたい」だけ、聞かせてください。
                </p>
                <div className="founder-story">
                  「なぜこのサービスを始めたのか？それは、素晴らしいサービスを持っているのに『見せ方』で損をしている企業を一つでも減らしたいからです。私たちは、あなたのビジネスの魅力を最大限に引き出すお手伝いをします。」
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== S10: FAQ ===== */}
      <section className="sec sec-alt-bg">
        <div className="wrap">
          <div className="shead reveal">
            <div className="no">06</div>
            <div className="tt">
              <span className="eyebrow">faq</span>
              <h2 className="hjp">よくある質問。</h2>
            </div>
          </div>
          <div className="body-col">
            <div className="qa reveal">
              <details>
                <summary>実際に作るのは誰ですか。</summary>
                <div className="a">
                  私が窓口になり、経験豊富な制作チームと連携して進めます。相談から完成まで、私が間に入って伴走します。
                </div>
              </details>
              <details>
                <summary>無料のデモって、本当に無料ですか。</summary>
                <div className="a">
                  はい。あなたのサービスに合わせたサンプルを作ってから見てもらえます。気に入らなければ、費用は一切かかりません。
                </div>
              </details>
              <details>
                <summary>ホームページの「5ページ」には何が含まれますか。</summary>
                <div className="a">
                  トップ・サービス紹介・お客様の声・会社情報・問い合わせ、が基本です。内容はご相談に応じて調整できます。
                </div>
              </details>
              <details>
                <summary>追加料金はかかりませんか。</summary>
                <div className="a">
                  事前にお見積もりした以外の費用はかかりません。修正回数にも制限はありません。
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ===== S11: 最終CTA ===== */}
      <section className="sec final" id="cta">
        <div className="wrap">
          <div className="dots reveal">
            <span></span><span></span><span></span>
          </div>
          <span className="eyebrow reveal">demo, on us</span>
          <h2 className="reveal hjp">「気になる」で、<br />止めなくていい。</h2>
          <p className="small reveal">
            見るだけ、聞くだけで大丈夫です。デモは無料なので、損はしません。
          </p>
          <div className="reveal">
            <p className="micro-copy-top" style={{ marginBottom: "12px" }}>
              ＼毎月先着5名様限定！／
            </p>
            <a href="https://lin.ee/example" className="btn btn-orange">
              今すぐ無料で構成案のデモを見る <span className="arr">→</span>
            </a>
            <p className="micro-copy-bottom">※無理な営業は一切しません</p>
          </div>
        </div>
      </section>

      {/* 追従型スティッキーCTA */}
      <div className="sticky-cta" id="sticky-cta" aria-label="固定CTAバー">
        <div className="sticky-text">
          <strong>毎月先着5名様限定</strong>
          無理な営業は一切しません
        </div>
        <a href="#cta" className="btn-orange-sm">今すぐ無料でデモを見る →</a>
      </div>

      {/* フッター */}
      <footer className="foot-l">
        <div className="wrap">
          <img src="/favicon.png" alt="divizero" />
          <div className="c">© divizero</div>
        </div>
      </footer>

      <Script src="/home-script.js" strategy="afterInteractive" />
    </>
  );
}
