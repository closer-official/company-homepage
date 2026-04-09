"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "../fulcomm-sales-intern/page.module.css";

const NOTE_URL =
  "https://note.com/5884_divizero/n/n5cd8730d7aa4?sub_rt=share_sb";

const LINE_URL = "https://lin.ee/ZUxDrBQ";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EffortWithoutGrowthPage() {
  useEffect(() => {
    const chapters = document.querySelectorAll<HTMLElement>(
      `.${styles.chapter}`,
    );
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      chapters.forEach((c) => c.classList.add(styles.visible));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    chapters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.pageWrap}>
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.tag}>Essay / コラム</span>
          <h1 className={styles.heroTitle}>
            頑張っているのに伸びない。
            <br />
            それは、能力が低いからではなく、
            <br />
            <em>ズレたまま努力しているだけ</em>かもしれません。
          </h1>
          <p className={`${styles.heroSub} ${styles.heroSubWide}`}>
            僕は大学2年から14ヶ月、フルコミ営業の現場にいました。
            <br />
            怒鳴られる。
            <br />
            警察を呼ばれる。
            <br />
            水をかけられる。
            <br />
            <br />
            その中で分かったのは、
            <br />
            人が変わるのは、綺麗な言葉のある環境ではなく、
            <br />
            逃げ場がなくて、フィードバックが早い環境だということです
          </p>
          <div className={styles.heroBtnRow}>
            <a
              href={NOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              <span>noteで続きを読む</span>
              <ArrowIcon />
            </a>
            <Link href="/partners" className={styles.ctaSecondary}>
              <span>採用ページを見る</span>
            </Link>
          </div>
          <div className={styles.scrollHint}>
            <span className={styles.scrollLine} />
            <span>scroll</span>
          </div>
        </div>
        <div className={styles.heroRight} aria-hidden>
          <div className={styles.heroVerticalText}>
            Effort, mismatch, environment
          </div>
          <div className={styles.bigNumber}>?</div>
        </div>
      </section>

      <div id="content" className={styles.contentArea}>
        <article className={styles.chapter}>
          <div className={styles.chapterNum}>01</div>
          <h2 className={styles.chapterTitle}>こんな感覚がある人へ</h2>
          <div className={styles.chapterBody}>
            <p>
              頑張っているのに結果が出ない。
              <br />
              周りは伸びているのに、自分だけ停滞している。
              <br />
              向いていないのか、やり方がズレているだけなのか分からない。
            </p>
            <p>
              この感覚があるなら、
              <br />
              一度「能力がない」と決めつける前に、
              <br />
              頭の使い方と環境の見方を疑った方がいいです。
            </p>
            <p>
              現場で見てきた限り、
              <br />
              伸びない人にはかなり共通点があります。
            </p>
            <p>
              逆に言えば、
              <br />
              そこが直ると、人はかなり変わります。
            </p>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>02</div>
          <h2 className={styles.chapterTitle}>
            僕が見てきた、伸びない人の共通点
          </h2>
          <div className={styles.chapterBody}>
            <p>
              頑張っているのに伸びない人には、
              <br />
              だいたい共通するズレがあります。
            </p>
            <p>たとえば、</p>
            <ul className={styles.chapterList}>
              <li>感情と事実を混ぜる</li>
              <li>結果より「頑張ってる自分」を守る</li>
              <li>結果が出る前から我流を握る</li>
            </ul>
            <p>このあたりです。</p>
            <p>
              実際、僕自身も最初はそうでした。
              <br />
              断られた。
              <br />
              うまくいかない。
              <br />
              そのたびに、「向いていないのかもしれない」と処理していました。
            </p>
            <p>
              でも本当は、
              <br />
              断られたのは事実で、
              <br />
              悔しいのは感情で、
              <br />
              向いていないは解釈です。
            </p>
            <p>この3つを混ぜると、改善が止まります。</p>
            <p>
              ここをどう分けるのか。
              <br />
              なぜ「頑張ってる自分」を守ると伸びなくなるのか。
              <br />
              なぜ我流が遠回りになるのか。
            </p>
            <p>その話は、noteで詳しく書いています。</p>
            <div className={styles.chapterCtas}>
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                <span>noteで続きを読む</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>03</div>
          <h2 className={styles.chapterTitle}>このページで伝えたいこと</h2>
          <div className={styles.chapterBody}>
            <p>
              僕が言いたいのは、
              <br />
              「気合いがあれば何とかなる」という話ではありません。
            </p>
            <p>
              そうではなくて、
              <br />
              人が変わるには構造があるということです。
            </p>
            <p>
              ぬるい環境では、
              <br />
              思考のズレが見えにくいです。
            </p>
            <p>
              逃げ場がある。
              <br />
              結果が出なくても何となく過ごせる。
              <br />
              指摘も弱い。
              <br />
              修正も遅い。
            </p>
            <p>これでは、頑張っていても変わりにくい。</p>
            <p>
              逆に、
              <br />
              <br />
              逃げ場がない
              <br />
              フィードバックが早い
            </p>
            <p>
              この2つがある環境では、
              <br />
              自分のズレをごまかしにくくなります。
            </p>
            <p>だから、人が変わりやすいです。</p>
            <p>
              この考え方の背景や、
              <br />
              僕が14ヶ月の営業で何を学んだかは、
              <br />
              noteにまとめています
            </p>
            <div className={styles.chapterCtas}>
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                <span>noteで続きを読む</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>04</div>
          <h2 className={styles.chapterTitle}>こういう人と一緒にやりたい</h2>
          <div className={styles.chapterBody}>
            <p>
              僕が一緒にやりたいのは、
              <br />
              楽に稼ぎたい人ではありません。
            </p>
            <p>
              優しく褒めてもらいたい人でもありません。
            </p>
            <p>そうではなくて、</p>
            <ul className={`${styles.chapterList} ${styles.chapterListTight}`}>
              <li>ちゃんと成長したい人</li>
              <li>ぬるい環境では変われないと思っている人</li>
              <li>指摘を受けても改善して前に進みたい人</li>
              <li>恥をかいても、試行回数を落としたくない人</li>
              <li>
                大学生のうちに、厳しくても意味のある経験をしたい人
              </li>
            </ul>
            <p>そういう人です。</p>
            <p>全員に合うとは思っていません。</p>
            <p>
              でも、
              <br />
              この考え方に少しでも共感するなら、
              <br />
              たぶん話はかなり合います。
            </p>
            <div className={styles.chapterCtas}>
              <Link href="/partners" className={styles.ctaSecondary}>
                <span>採用ページを見る</span>
              </Link>
            </div>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>05</div>
          <h2 className={styles.chapterTitle}>
            先にnoteを読んでほしい理由
          </h2>
          <div className={styles.chapterBody}>
            <p>
              採用ページを見る前に、
              <br />
              できれば先にnoteを読んでほしいと思っています。
            </p>
            <p>理由は単純です。</p>
            <p>
              表面的な条件だけ見て応募しても、
              <br />
              考え方が合わなければ、結局どこかでズレるからです。
            </p>
            <p>
              僕たちは、
              <br />
              「楽そうか」ではなく、
              <br />
              「ちゃんと変われるか」を重視しています。
            </p>
            <p>
              その前提に共感できるかどうかは、
              <br />
              募集要項より先に、noteの方が伝わると思っています。
            </p>
            <div className={styles.chapterCtas}>
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                <span>noteで続きを読む</span>
                <ArrowIcon />
              </a>
              <Link href="/partners" className={styles.ctaSecondary}>
                <span>その上で採用ページを見る</span>
              </Link>
            </div>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>06</div>
          <h2 className={styles.chapterTitle}>最後に</h2>
          <div className={styles.chapterBody}>
            <p>
              頑張っているのに伸びないとき、
              <br />
              人は自分を責めるか、環境のせいにするかのどちらかに寄りがちです。
            </p>
            <p>
              でも、本当に見るべきなのはそこではないです。
            </p>
            <p>
              見るべきなのは、
              <br />
              今の自分が、どんなズレを持ったまま努力しているかです。
            </p>
            <p>
              そこに気づけると、
              <br />
              努力はやっと前に進み始めます。
            </p>
            <p>もしあなたが、</p>
            <ul className={`${styles.chapterList} ${styles.chapterListTight}`}>
              <li>このままぬるいままで終わりたくない。</li>
              <li>ちゃんと厳しい環境で、自分を変えたい。</li>
              <li>読むだけで終わらせず、実際に挑戦したい。</li>
            </ul>
            <p>
              そう思うなら、
              <br />
              まずはnoteを読んでください。
            </p>
            <p>
              その上で、
              <br />
              「こういう考え方の環境でやってみたい」と思ったなら、
              <br />
              採用ページを見てほしいです。
            </p>
            <div className={styles.chapterCtas}>
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                <span>noteで続きを読む</span>
                <ArrowIcon />
              </a>
              <Link href="/partners" className={styles.ctaSecondary}>
                <span>採用ページを見る</span>
              </Link>
            </div>
          </div>
        </article>
      </div>

      <aside
        className={styles.paywallSection}
        style={{ paddingTop: "24px", maxWidth: "860px" }}
        aria-label="パートナー募集への案内"
      >
        <p className={styles.noteAccountDisclaimer}>
          ※ noteのアカウントが必要です
        </p>
        <div className={styles.partnerBridge}>
          <p className={styles.partnerBridgeLabel}>Next step</p>
          <h2 className={styles.partnerBridgeTitle}>
            noteやこのサイトに共感し、何かしらの形で関わってみたい方へ
          </h2>
          <div className={styles.partnerBridgeTexts}>
            <p className={styles.partnerBridgeText}>
              Closer by divizero では、事業の拡大に伴い、認定パートナーを募集しています。
            </p>
            <p className={styles.partnerBridgeText}>
              現時点では、店舗リサーチ・初回案内・返信対応・ヒアリングサポートなど、事業の入口を担う役割が中心です。
            </p>
            <p className={styles.partnerBridgeText}>
              ただし、それに限らず、SNS運用、更新対応、制作サポート、今後の新規事業領域など、関わり方は今後さらに広がっていく予定です。
            </p>
            <p className={styles.partnerBridgeText}>
              詳細はパートナー募集ページをご覧のうえ、お問い合わせください。
            </p>
          </div>
          <div className={styles.partnerBridgeActions}>
            <Link href="/partners" className={styles.partnerBridgeCta}>
              パートナー募集を見る
            </Link>
            <Link
              href="/contact?for=partner"
              className={styles.partnerBridgeSub}
            >
              詳細を問い合わせる
            </Link>
            <a
              href={LINE_URL}
              className={styles.partnerBridgeSub}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINE / ライン
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
