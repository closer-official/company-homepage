"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import "./portfolio.css";

type ProjectId = "p1" | "p2" | "p3" | "p4";

export default function PortfolioClient({
  fontVariableClass,
}: {
  fontVariableClass: string;
}) {
  const [openProject, setOpenProject] = useState<ProjectId | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const toggleProject = useCallback((id: ProjectId) => {
    setOpenProject((prev) => (prev === id ? null : id));
  }, []);

  const onToggleClick = useCallback(
    (e: MouseEvent, id: ProjectId) => {
      e.stopPropagation();
      toggleProject(id);
    },
    [toggleProject],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      revealRefs.current.forEach((el) => el?.classList.add("pf-visible"));
      return;
    }

    const els = revealRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            window.setTimeout(() => target.classList.add("pf-visible"), i * 80);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRevealRef = useCallback((el: HTMLElement | null, index: number) => {
    revealRefs.current[index] = el;
  }, []);

  return (
    <div className={`portfolio-root ${fontVariableClass}`.trim()}>
      <nav>
        <div className="nav-logo">Tadanosuke Kobayashi</div>
        <ul className="nav-links">
          <li>
            <a href="#strengths">強み</a>
          </li>
          <li>
            <a href="#projects">プロジェクト</a>
          </li>
          <li>
            <a href="#experience">経験</a>
          </li>
          <li>
            <a href="#about">自己紹介</a>
          </li>
          <li>
            <a href="#contact">連絡先</a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">企画 / PM 志望 — Portfolio 2025</div>
          <h1 className="hero-name">
            小林
            <br />
            <span>忠之介</span>
          </h1>
          <p className="hero-sub">Kobayashi Tadanosuke</p>
          <p className="hero-tagline">
            課題を見つけ、仕組みにし、
            <br />
            現場で動かせる人。
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              プロジェクトを見る
            </a>
            <a href="#contact" className="btn">
              連絡する
            </a>
          </div>
          <div className="hero-scroll">
            <div className="scroll-line" />
            Scroll
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-bg-text">T</div>
          <div className="photo-wrapper">
            <div className="photo-frame" />
            <Image
              src="/portfolio-hero.jpg"
              alt="小林忠之介"
              width={340}
              height={420}
              className="hero-photo"
              priority
              sizes="340px"
            />
          </div>
        </div>
      </section>

      <section className="section" id="strengths">
        <div className="section-label">強みの要約</div>
        <h2
          className="section-title pf-reveal"
          ref={(el) => setRevealRef(el, 0)}
        >
          三つの視点で、<em>課題を仕組みに</em>変える
        </h2>
        <div
          className="strengths-grid pf-reveal"
          ref={(el) => setRevealRef(el, 1)}
        >
          <div className="strength-card">
            <div className="strength-num">01</div>
            <div className="strength-title">課題発見・仮説設計力</div>
            <div className="strength-body">
              現場や業界構造の違和感から「誰のどんな問題か」を言語化し、解くべき仮説に落とし込む。アフィリエイト市場の中抜き構造、アパレルの在庫リスク、Web営業の歩留まりなど、複数の領域で課題を先に見つけてきた。
            </div>
          </div>
          <div className="strength-card">
            <div className="strength-num">02</div>
            <div className="strength-title">事業視点・採算判断力</div>
            <div className="strength-body">
              「作れる」だけで終わらず、APIコストと成約率から採算性を計算し用途を判断するなど、実運用・収益性まで見据えて意思決定できる。開発前に「継続可能か」を問う習慣がある。
            </div>
          </div>
          <div className="strength-card">
            <div className="strength-num">03</div>
            <div className="strength-title">仕組み化・運用設計力</div>
            <div className="strength-body">
              個人の頑張りではなく「誰でも再現できる形」を先に設計する。Web制作の2分デモ生成、受注生産と自動分配の仕組みなど、属人的な工程を構造ごと変えてきた。
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="section-label">主要プロジェクト</div>
        <h2
          className="section-title pf-reveal"
          ref={(el) => setRevealRef(el, 2)}
        >
          課題を起点に、<em>動く仕組みを作った</em>4件
        </h2>

        <div className="project-list pf-reveal" ref={(el) => setRevealRef(el, 3)}>
          <div
            role="button"
            tabIndex={0}
            className={`project-item${openProject === "p1" ? " open" : ""}`}
            onClick={() => toggleProject("p1")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleProject("p1");
              }
            }}
          >
            <div className="project-main">
              <div className="project-header">
                <div className="project-name">
                  店舗向け Web 事業
                  <br />
                  <small>Closer by divizero</small>
                </div>
                <button
                  type="button"
                  className="project-toggle"
                  aria-expanded={openProject === "p1"}
                  onClick={(e) => onToggleClick(e, "p1")}
                >
                  {openProject === "p1" ? "×" : "+"}
                </button>
              </div>
              <p className="project-desc">
                DM営業はほぼ断られる前提で、1件ごとに時間をかけると成立しない。店舗情報を入力するだけで2分でデモサイトを生成できる仕組みを構築し、提案速度と再現性を改善しようとした。
              </p>
            </div>
            <div className="project-meta">
              <span className="project-badge highlight">現在進行中</span>
              <div className="project-skills">
                <span className="skill-tag">要件設計</span>
                <span className="skill-tag">オペレーション設計</span>
                <span className="skill-tag">提案導線</span>
                <span className="skill-tag">Instagram / X DM営業</span>
              </div>
            </div>
            <div className="project-detail">
              <div>
                <div className="detail-label">背景・課題</div>
                <div className="detail-text">
                  DM営業は99%近く断られる前提。1件ごとに高工数をかける方法は再現性がなく、実績が少ない段階では相手が完成形を自分事として想像しにくいという課題もあった。
                </div>
              </div>
              <div>
                <div className="detail-label">仕組みの概要</div>
                <div className="detail-text">
                  テンプレートサイトを事前に用意し、Google等で調べた店舗情報を入力するだけで反映。コードが分からない人でも約2分でデモを作成できる運用設計。
                </div>
              </div>
              <div>
                <div className="detail-label">結果・現状</div>
                <div className="detail-text">
                  10店舗にデモ作成・送付を実施（現在検証フェーズ）。未読が続く中、提案1件への過剰工数は自己満足になりやすいと判断し、反応率に見合う工数設計に切り替える方針。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  提案品質より、低反応率のチャネルに合った工数設計が不可欠。誰でも再現できる仕組みを先に作ることで、事業としての継続性が生まれると実感した。
                </div>
              </div>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            className={`project-item${openProject === "p2" ? " open" : ""}`}
            onClick={() => toggleProject("p2")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleProject("p2");
              }
            }}
          >
            <div className="project-main">
              <div className="project-header">
                <div className="project-name">AI 営業文面生成ツール</div>
                <button
                  type="button"
                  className="project-toggle"
                  aria-expanded={openProject === "p2"}
                  onClick={(e) => onToggleClick(e, "p2")}
                >
                  {openProject === "p2" ? "×" : "+"}
                </button>
              </div>
              <p className="project-desc">
                DM・メール営業の低反応率は、定型文が相手に刺さらないことが一因。企業情報をAIでリサーチし、個別最適化した文面を自動生成するツールを制作。その後、APIコスト試算から用途を限定した。
              </p>
            </div>
            <div className="project-meta">
              <span className="project-badge">補助事例</span>
              <div className="project-skills">
                <span className="skill-tag">Anthropic API</span>
                <span className="skill-tag">業務効率化</span>
                <span className="skill-tag">採算分析</span>
              </div>
            </div>
            <div className="project-detail">
              <div>
                <div className="detail-label">背景・課題</div>
                <div className="detail-text">
                  定型文の営業では相手に合わせた提案ができず、返信率が低い。企業ごとにカスタマイズした文面を自動生成する仕組みを構築した。
                </div>
              </div>
              <div>
                <div className="detail-label">採算判断のプロセス</div>
                <div className="detail-text">
                  一般的な成約率0.5〜2%とAPIコストを計算した結果、商材単価が2桁万円以上でないと赤字になることが判明。個人利用では成立しないと判断し、企業への提供用途に絞った。
                </div>
              </div>
              <div>
                <div className="detail-label">評価ポイント</div>
                <div className="detail-text">
                  「作った」で終わらず、採算性を計算して用途を限定した判断プロセスが強み。開発物の価値を市場文脈で評価できる事業視点の証拠として位置づける。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  技術を実装することと、ビジネスとして成立させることは別。固定費コスト構造の企業向けであれば有効性が高く、対象ユーザーの設計が先決だと学んだ。
                </div>
              </div>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            className={`project-item${openProject === "p3" ? " open" : ""}`}
            onClick={() => toggleProject("p3")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleProject("p3");
              }
            }}
          >
            <div className="project-main">
              <div className="project-header">
                <div className="project-name">
                  BrandOS
                  <br />
                  <small>Printful 連携アパレル運営効率化アプリ</small>
                </div>
                <button
                  type="button"
                  className="project-toggle"
                  aria-expanded={openProject === "p3"}
                  onClick={(e) => onToggleClick(e, "p3")}
                >
                  {openProject === "p3" ? "×" : "+"}
                </button>
              </div>
              <p className="project-desc">
                小規模アパレルの在庫リスク・初期費用・発注業務の重さを解消するため、Printfulの受注生産とStripe決済を組み合わせた自動運用アプリを企画・開発した。
              </p>
            </div>
            <div className="project-meta">
              <span className="project-badge">開発済み</span>
              <div className="project-skills">
                <span className="skill-tag">Printful API</span>
                <span className="skill-tag">Stripe</span>
                <span className="skill-tag">受注生産モデル</span>
                <span className="skill-tag">収益分配設計</span>
              </div>
            </div>
            <div className="project-detail">
              <div>
                <div className="detail-label">仕組みの概要</div>
                <div className="detail-text">
                  アパレル主がPrintfulで商品を作成→BrandOSに連携→購入者がStripe決済→Printfulに自動発注→収益を運営:アパレル主＝3:7で自動分配。仲介作業を不要にする設計。
                </div>
              </div>
              <div>
                <div className="detail-label">技術的な挑戦</div>
                <div className="detail-text">
                  LINEへの通知連携など、外部サービスとの接続部分で詰まる箇所があり、外部API連携における実装の複雑さと運用設計の重要性を学んだ。
                </div>
              </div>
              <div>
                <div className="detail-label">失敗要因の分析</div>
                <div className="detail-text">
                  出店者獲得と集客が詰まりお蔵入りに。仕組みの有用性だけでは立ち上がらず、供給側の獲得戦略が先決だったと判断。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  ユーザー向けの見た目だけでなく、業務フローや収益分配まで含めて設計できたが、ビジネス立ち上げには需要側と供給側の同時獲得が課題だと実感した。
                </div>
              </div>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            className={`project-item${openProject === "p4" ? " open" : ""}`}
            onClick={() => toggleProject("p4")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleProject("p4");
              }
            }}
          >
            <div className="project-main">
              <div className="project-header">
                <div className="project-name">
                  closer
                  <br />
                  <small>自社型アフィリエイト・マッチングアプリ</small>
                </div>
                <button
                  type="button"
                  className="project-toggle"
                  aria-expanded={openProject === "p4"}
                  onClick={(e) => onToggleClick(e, "p4")}
                >
                  {openProject === "p4" ? "×" : "+"}
                </button>
              </div>
              <p className="project-desc">
                アフィリエイターと商品提供者をつなぐプラットフォーム。既存の低単価・中間コスト問題に対し、高報酬設計と既存決済基盤の維持で参入障壁を下げる構造を設計した。
              </p>
            </div>
            <div className="project-meta">
              <span className="project-badge">開発済み</span>
              <div className="project-skills">
                <span className="skill-tag">マーケットプレイス設計</span>
                <span className="skill-tag">報酬設計</span>
                <span className="skill-tag">市場構造分析</span>
              </div>
            </div>
            <div className="project-detail">
              <div>
                <div className="detail-label">業界構造への問題意識</div>
                <div className="detail-text">
                  既存アフィリエイトはSNS影響力がある一部の人に有利な構造。商品提供者は既存のShopify・Stripe等をそのまま使え、プラットフォーム登録で追加収益を得られる設計を目指した。
                </div>
              </div>
              <div>
                <div className="detail-label">失敗要因の分析</div>
                <div className="detail-text">
                  アフィリエイターは約10人にとどまり、出品者のジャンルも不統一でマッチングが成立しなかった。アフィリエイトは「信頼」を前提とする市場であり、実績なき初期段階では支払い不安が大きな障壁になった。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  報酬条件の良さだけでなく、初期市場における信頼設計と供給側の質の統一が最重要。実績がない段階で参入すべき構造ではなかったと、事後的に判断できた。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="section-label">実務経験</div>
        <h2
          className="section-title pf-reveal"
          ref={(el) => setRevealRef(el, 4)}
        >
          数字と現場が、<em>強みの土台</em>になった
        </h2>

        <div className="exp-grid pf-reveal" ref={(el) => setRevealRef(el, 5)}>
          <div className="exp-card">
            <div className="exp-header">
              <div className="exp-title">
                ホテルフロント
                <br />
                <small>JAL・オークラ・日航系列</small>
              </div>
              <div className="exp-period">アルバイト / 3年</div>
            </div>
            <div className="exp-result">顧客評価 全国1位 / 会員取得 全国上位5位 × 複数回</div>
            <div className="exp-body">
              服装・表情・声色・歩くスピード・視線など、非言語情報から相手が「何を求めているか」を推測し、個別に対応を変えていた。全員に同じ接客をするのではなく、仮説と観察による個別最適化が高評価につながった。
            </div>
            <div className="exp-stat">
              <div className="stat-row">
                <span className="stat-num">全国 1 位</span>
                <span className="stat-label">チェックイン顧客アンケート（単月）</span>
              </div>
              <div className="stat-row">
                <span className="stat-num">5 回以上</span>
                <span className="stat-label">会員獲得 全国上位 5 位（3 年間で）</span>
              </div>
            </div>
          </div>

          <div className="exp-card">
            <div className="exp-header">
              <div className="exp-title">
                太陽光蓄電池 営業
                <br />
                <small>催事・フルコミッション</small>
              </div>
              <div className="exp-period">アルバイト / 約10ヶ月</div>
            </div>
            <div className="exp-result">社内売上 3 位 / 後輩育成 3 名全員契約</div>
            <div className="exp-body">
              アポインターからスタートし、10ヶ月目に催事店舗リーダーへ。動線設計・場所取り・店舗との連携・在庫管理まで担当。「商談を聞く意味を残す期待設計」を意識し、売りにいく前に相手の次の行動を設計していた。
            </div>
            <div className="exp-stat">
              <div className="stat-row">
                <span className="stat-num">7 件</span>
                <span className="stat-label">個人契約獲得（フルコミッション）</span>
              </div>
              <div className="stat-row">
                <span className="stat-num">3 名</span>
                <span className="stat-label">後輩全員に契約をつけさせた</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-label">自己紹介</div>
        <div className="about-grid pf-reveal" ref={(el) => setRevealRef(el, 6)}>
          <div>
            <p className="about-text">
              私は、現場で感じた<em>非効率や課題</em>を、単なるアイデアで終わらせず、
              <em>仕組みとして形にすること</em>を強みとしています。
              <br />
              <br />
              作って終わりではなく、実運用・採算性まで含めて検証し、継続可能かどうかを判断してきました。
              <br />
              <br />
              開発、営業、接客の経験を通じて、ユーザー視点・現場視点・事業視点を行き来しながら改善できる点が自分の特徴だと考えています。
            </p>
          </div>
          <div className="about-facts">
            <div className="fact-item">
              <div className="fact-label">志望職種</div>
              <div className="fact-value">
                企画 / プロダクトマネージャー
                <br />
                事業開発 / UXデザイン
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-label">関心領域</div>
              <div className="fact-value">
                業務効率化ツール / 飲食・小売業のDX
                <br />
                消費者向けアプリ / EC
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-label">スキル</div>
              <div className="fact-value">
                要件定義 / 業務設計 / UI設計
                <br />
                HTML / CSS / JS / API連携
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-label">連絡先</div>
        <div className="contact-inner">
          <div>
            <h2
              className="section-title pf-reveal"
              ref={(el) => setRevealRef(el, 7)}
            >
              ご連絡お待ち<em>しています</em>
            </h2>
            <p className="contact-note pf-reveal" ref={(el) => setRevealRef(el, 8)}>
              企画・PM・事業開発職への就職活動中です。お気軽にご連絡ください。
            </p>
            <div className="contact-info pf-reveal" ref={(el) => setRevealRef(el, 9)}>
              <div className="contact-row">
                <div className="contact-icon">✉</div>
                <a href="mailto:handtadanosuke@gmail.com">handtadanosuke@gmail.com</a>
              </div>
            </div>
          </div>
          <div
            className="pf-reveal"
            ref={(el) => setRevealRef(el, 10)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <a
              href="mailto:handtadanosuke@gmail.com"
              className="btn btn-primary"
              style={{ justifyContent: "center" }}
            >
              メールを送る
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left">Kobayashi Tadanosuke — Portfolio 2025</div>
        <div className="footer-right">企画 / PM 志望</div>
      </footer>
    </div>
  );
}
