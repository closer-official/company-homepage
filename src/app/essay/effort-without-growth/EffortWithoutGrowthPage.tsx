"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "../fulcomm-sales-intern/page.module.css";

const NOTE_URL =
  "https://note.com/5884_divizero/n/n5cd8730d7aa4?sub_rt=share_sb";

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
            僕は大学2年から14ヶ月、
            <br />
            フルコミ営業の現場にいました。
            <br />
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
            逃げ場がなくて、フィードバックが早い環境だということです。
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
            僕が見てきた、本質的なズレ
          </h2>
          <div className={styles.chapterBody}>
            <p>
              頑張っているのに伸びない人は、
              <br />
              だいたい同じところでつまずきます。
            </p>
            <p>
              感情と事実を混ぜる。
              <br />
              結果より「頑張ってる自分」を守る。
              <br />
              結果が出る前から我流を握る。
            </p>
            <p>
              実際、僕自身も最初はそうでした。
            </p>
            <p>
              断られた。
              <br />
              うまくいかない。
              <br />
              そのたびに、
              <br />
              「向いていないのかもしれない」と処理していました。
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
              ここに気づけるかどうかで、
              <br />
              努力はかなり変わります。
            </p>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>03</div>
          <h2 className={styles.chapterTitle}>
            このページで一番伝えたいこと
          </h2>
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
            <p>これでは、頑張っていても変わりにくいです。</p>
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
              この判断軸は、あなたの発信の核とも一致しています。
            </p>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>04</div>
          <h2 className={styles.chapterTitle}>
            だから、環境選びは軽く見ない方がいい
          </h2>
          <div className={styles.chapterBody}>
            <p>「成長できる環境で働きたい」</p>
            <p>この言葉はよく見ます。</p>
            <p>
              でも実際には、
              <br />
              綺麗な言葉だけで環境を選ぶと、かなり外します。
            </p>
            <p>
              裁量がある。
              <br />
              優秀な人が多い。
              <br />
              雰囲気がいい。
              <br />
              自由度が高い。
            </p>
            <p>それも悪くないです。</p>
            <p>
              でも、人が本当に変わるかどうかは別です。
            </p>
            <p>
              大事なのは、
              <br />
              自分のズレが早く見えること。
              <br />
              逃げ道をごまかせないこと。
            </p>
            <p>
              環境選びを間違えると、
              <br />
              頑張っているつもりのまま、
              <br />
              時間だけが溶けます。
            </p>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>05</div>
          <h2 className={styles.chapterTitle}>もっと詳しく知りたい人へ</h2>
          <div className={styles.chapterBody}>
            <p>ここではかなり絞って書いています。</p>
            <p>
              なぜ頑張っているのに伸びないのか
              <br />
              どんな人がこの環境で変わりやすいのか
              <br />
              どうやって自分のズレを見つけるのか
              <br />
              僕自身が14ヶ月の営業で何を学んだのか
            </p>
            <p>
              こういう話を、noteではもっと詳しく書いています。
            </p>
            <p>
              このページを読んで、
              <br />
              「なんとなく分かる」ではなく、
              <br />
              もっと深く整理したいと思った人は、そちらを見てください。
            </p>
            <div className={styles.chapterCtas}>
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                <span>noteを読む</span>
                <ArrowIcon />
              </a>
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
              人は自分を責めるか、
              <br />
              環境のせいにするかのどちらかに寄りがちです。
            </p>
            <p>
              でも、本当に見るべきなのはそこではありません。
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
            <p>
              もしあなたが、
              <br />
              この考え方をもう少し深く知りたいなら、noteを読んでください。
            </p>
            <p>
              それを読んだうえで、
              <br />
              もしさらに何か関わってみたいと思うことがあれば、
              <br />
              そのとき初めて、次の導線を見てもらえれば十分です。
            </p>
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
            noteやこのサイトを読んだうえで、
            <br />
            何かしらの形で関わってみたいと思った方へ。
          </h2>
          <div className={styles.partnerBridgeTexts}>
            <p className={styles.partnerBridgeText}>
              Closer by divizero では、
              <br />
              事業の拡大に伴い、認定パートナーを募集しています。
            </p>
            <p className={styles.partnerBridgeText}>
              現時点では、
              <br />
              店舗リサーチ・初回案内・返信対応・ヒアリングサポートなど、
              <br />
              事業の入口を担う役割が中心です。
            </p>
            <p className={styles.partnerBridgeText}>
              ただし、それに限らず、
              <br />
              SNS運用、更新対応、制作サポート、
              <br />
              今後の新規事業領域など、
              <br />
              関わり方は今後さらに広がっていく予定です。
            </p>
            <p className={styles.partnerBridgeText}>
              興味がある方だけ、
              <br />
              募集ページを見てもらえれば大丈夫です。
            </p>
          </div>
          <div className={styles.partnerBridgeActions}>
            <Link href="/partners" className={styles.partnerBridgeCta}>
              パートナー募集を見る
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
