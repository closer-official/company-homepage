"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const NOTE_URL =
  "https://note.com/5884_divizero/n/n55f3caa8c8ba?sub_rt=share_sb";

const LINE_URL = "https://lin.ee/ZUxDrBQ";

export default function FulcommSalesInternEssayPage() {
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
          <span className={styles.tag}>Essay / 体験記</span>
          <h1 className={styles.heroTitle}>
            フルコミ営業インターン、<em>14ヶ月。</em>
            <br />
            100回の拒絶、金欠、劣等感。
            <br />
            それでも辞めなかった理由。
          </h1>
          <p className={styles.heroSub}>
            「成長できる環境」という言葉の正体を、
            <br />
            1年2ヶ月かけて解体した記録。
            <br />
            ただの武勇伝じゃない。
            <br />
            これはあなたの「環境の選び方」の話でもある。
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>14</span>
              <span className={styles.statLabel}>ヶ月</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>100+</span>
              <span className={styles.statLabel}>件 / 日の訪問</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>2</span>
              <span className={styles.statLabel}>つの変化</span>
            </div>
          </div>
          <a href="#content" className={styles.ctaBtn}>
            <span>記事を読む</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div className={styles.scrollHint}>
            <span className={styles.scrollLine} />
            <span>scroll</span>
          </div>
        </div>
        <div className={styles.heroRight} aria-hidden>
          <div className={styles.heroVerticalText}>
            Full Commission Sales Internship — 14 months
          </div>
          <div className={styles.bigNumber}>14</div>
        </div>
      </section>

      <section className={styles.sectionIntro}>
        <div className={styles.sectionLabel}>はじめに</div>
        <div className={styles.introText}>
          「成長できる環境で働きたい」——
          <br />
          この言葉を、ずっと疑っていた。
          <br />
          <br />
          裁量がある。優秀な人が多い。フィードバックが早い。
          <br />
          どれも「雰囲気のいい言葉」でしかない。
          <br />
          <br />
          じゃあ、その環境に入ったとして。
          <br />
          <strong>本当に自分は変わるのか？</strong>
          <br />
          <br />
          この問いに答えられるようになるまで、1年2ヶ月かかった。
        </div>
      </section>

      <div id="content" className={styles.contentArea}>
        <article className={styles.chapter}>
          <div className={styles.chapterNum}>02 — 結論</div>
          <h2 className={styles.chapterTitle}>
            14ヶ月で得たのは、営業スキルじゃない。
          </h2>
          <div className={styles.chapterBody}>
            <p>先に結論を言う。</p>
            <div className={styles.highlight}>
              感情と理屈を切り離す俯瞰力。
              <br />
              泥沼でも思考を止めない粘り強さ。
              <br />
              <br />
              この2つだけだった。
            </div>
            <p>
              たぶん、これを読んでいるあなたも、本当に欲しいのはスキルじゃないはずだ。どんな状況でも折れない思考。結果が出なくても動き続けられる状態。こういう「頭の構造」の方が、長期的には圧倒的に価値がある。
            </p>
            <p>
              ただし、これには条件がある。ある種類のストレスに、一定期間さらされること。ぬるい環境では、絶対に手に入らない。だからこそ、環境選びを間違えると、時間だけが溶ける。
            </p>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>03 — 飛び込み</div>
          <h2 className={styles.chapterTitle}>根拠なき自信で飛び込んだ20歳</h2>
          <div className={styles.chapterBody}>
            <p>
              大学2年の10月。インターン紹介サイトで、なんとなく応募した。面接は通った。問題はその後だった。
            </p>
            <div className={styles.highlight}>
              「週末は泊まり込みで、訪問販売をやってもらいます」
              <br />
              「完全歩合制です」
              <br />
              <br />
              正直、聞いてない。
            </div>
            <p>
              当時の僕は「まあ、なんとかなるでしょ」と本気で思っていた。話すのは得意だった。営業くらい、どうにかなる。今振り返ると、この「根拠のない自信」は最初の一歩を踏み出すには必要だった。ただし、これは長くは持たない。
            </p>
          </div>
        </article>

        <article className={styles.chapter}>
          <div className={styles.chapterNum}>04 — 現実</div>
          <h2 className={styles.chapterTitle}>100件の拒絶と現実</h2>
          <div className={styles.chapterBody}>
            <p>
              現実は、想像よりもシンプルだった。通用しない。1日100件以上、インターホンを押す。「いりません」で終わるほど優しくはない。怒鳴られる、警察を呼ばれる。当時はルフィ事件の影響で、住民の警戒心はかなり高かった。
            </p>
            <div className={styles.dataRow}>
              <div className={styles.dataCell}>
                <span className={styles.dataCellLabel}>商談数</span>
                <span className={styles.dataCellValue}>約20件</span>
              </div>
              <div className={styles.dataCell}>
                <span className={styles.dataCellLabel}>契約数</span>
                <span className={styles.dataCellValue}>約7件</span>
              </div>
              <div className={styles.dataCell}>
                <span className={styles.dataCellLabel}>最終完工</span>
                <span className={styles.dataCellValue}>2件</span>
              </div>
            </div>
            <p>
              商談まではいく。でも、決まらない。「いいですね」と言われても、最後で断られる。その状態が2ヶ月続いた。午前中で心が削れる。でも、まだ昼。午後も同じことをやる。
            </p>
            <div className={styles.highlight}>
              この経験で初めて分かった。
              <br />
              営業って、「話せるかどうか」じゃない。
            </div>
            <p>
              きつい環境なんて、探せばいくらでもある。ただきついだけで終わる環境も多い。じゃあ、何が違うのか——この14ヶ月で見えたのは、
              <strong>人が変わる環境には共通点がある</strong>
              ということだった。
            </p>
          </div>
        </article>
      </div>

      <div className={styles.paywallSection}>
        <div className={styles.blurPreview}>
          <div className={styles.blurInner}>
            <div
              className={styles.contentArea}
              style={{ padding: "0 0 8px", maxWidth: "100%" }}
            >
              <article
                className={`${styles.chapter} ${styles.visible} ${styles.blurTeaserChapter}`}
                style={{ borderTop: "1px solid rgba(26,24,20,0.12)" }}
              >
                <div className={styles.chapterNum}>05 — 構造</div>
                <h2 className={styles.chapterTitle}>なぜ人は変わるのか</h2>
                <div className={styles.chapterBody}>
                  <p>
                    一番きつかったのは、拒絶じゃなかった。比較だった。同期や後輩が契約を取るのを目の前で見て、自分だけ取れない——そのズレを、毎日処理し続けることになった。
                  </p>
                  <p>
                    人が変わるのは、正しい知識を得たときじゃない。感情の処理を、何百回も繰り返したとき。
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className={styles.blurFade} />
        </div>

        <div className={styles.paywallCard}>
          <div className={styles.paywallEyebrow}>続きを読む — note にて公開中</div>
          <h3 className={styles.paywallTitle}>
            「なぜ人は変わるのか」
            <br />
            <em>その構造と、環境の選び方の核心</em>
          </h3>
          <p className={styles.paywallDesc}>
            有料部分では、14ヶ月の経験から抽出した「人が変わるための構造」と「環境選びの判断軸」を、体験談ではなく思考ツールとして整理しています。
          </p>
          <div className={styles.paywallContents}>
            <div className={styles.paywallItem}>
              <span className={styles.paywallItemNum}>05</span>
              <span className={styles.paywallItemText}>
                なぜ人は変わるのか（感情処理の構造）
              </span>
            </div>
            <div className={styles.paywallItem}>
              <span className={styles.paywallItemNum}>06</span>
              <span className={styles.paywallItemText}>
                転換点——「頑張ってる自分」に酔っていた話
              </span>
            </div>
            <div className={styles.paywallItem}>
              <span className={styles.paywallItemNum}>07</span>
              <span className={styles.paywallItemText}>
                向いてる人・向いてない人の生存診断
              </span>
            </div>
            <div className={styles.paywallItem}>
              <span className={styles.paywallItemNum}>08</span>
              <span className={styles.paywallItemText}>
                環境の選び方——絶対に外せない2軸
              </span>
            </div>
            <div className={styles.paywallItem}>
              <span className={styles.paywallItemNum}>09</span>
              <span className={styles.paywallItemText}>
                明日からできる3つの具体アクション
              </span>
            </div>
            <div className={styles.paywallItem}>
              <span className={styles.paywallItemNum}>10</span>
              <span className={styles.paywallItemText}>
                まとめ——「その環境、怖いか？」
              </span>
            </div>
          </div>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.paywallCta}
          >
            <span>noteで続きを読む</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className={styles.paywallNote}>※ noteのアカウントが必要です</p>
        </div>

        <aside className={styles.partnerBridge} aria-label="パートナー募集への案内">
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
        </aside>
      </div>

    </div>
  );
}
