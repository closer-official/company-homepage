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
type PortfolioMetrics = {
  approachedCount: number;
  responseRate: number;
  updatedAt?: string;
};

export default function PortfolioClient({
  fontVariableClass,
  liveMetrics,
}: {
  fontVariableClass: string;
  liveMetrics: PortfolioMetrics | null;
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

  const liveStatusText = liveMetrics
    ? `ツール開発済み・運用中。店舗情報を入力するだけで5分以内にデモサイトを生成し、そのままDM営業に使用。現在${liveMetrics.approachedCount}件にアプローチ中、反応率${liveMetrics.responseRate.toFixed(2)}%`
    : "ツール開発済み・運用中。店舗情報を入力するだけで5分以内にデモサイトを生成し、そのままDM営業に使用。現在のアプローチ件数と反応率を計測中。";

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
            <a href="#why-pm">志望理由</a>
          </li>
          <li>
            <a href="#contact">連絡先</a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">企画 / PM / 事業開発 志望</div>
          <h1 className="hero-name">
            小林
            <br />
            <span>薫之介</span>
          </h1>
          <p className="hero-sub">Kobayashi Tadanosuke</p>
          <p className="hero-tagline">
            事業を構想し、検証し、形にする。
            <br />
            営業現場と自作プロダクトの両方を持つ、
            <br />
            企画・PM志望です。
          </p>
          <p className="hero-proof">
            大学在学中に、営業現場での顧客理解と自作Webプロダクトの企画・構築を並行。課題整理、要件設計、仮説検証、改善までを一気通貫で回してきました。
          </p>
          <ul className="hero-points">
            <li>自作プロダクト / 事業案: 4件以上</li>
            <li>営業インターン14か月: 契約獲得 / 店舗リーダー経験</li>
            <li>顧客接点: ホテル接客・営業の一次情報を保有</li>
            <li>志望職種: 企画職 / プロダクトマネージャー</li>
          </ul>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              代表プロジェクトを見る
            </a>
            <a href="#about" className="btn">
              企画・PMとしての強み
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
              src="/portfolio-hero.png"
              alt="小林薫之介"
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
        <div className="section-label">私ができること</div>
        <h2
          className="section-title pf-reveal"
          ref={(el) => setRevealRef(el, 0)}
        >
          企画・検証で重視している<em>3つの基準</em>
        </h2>
        <div
          className="strengths-grid pf-reveal"
          ref={(el) => setRevealRef(el, 1)}
        >
          <div className="strength-card">
            <div className="strength-num">01</div>
              <div className="strength-title">課題が本当に痛いか</div>
            <div className="strength-body">
                思いつきではなく、ユーザーがすでに不便や損失を感じているかを最初に見る。課題の強さを誤ると、作っても使われないと考えている。
            </div>
          </div>
          <div className="strength-card">
            <div className="strength-num">02</div>
              <div className="strength-title">小さく検証できるか</div>
            <div className="strength-body">
                大きな構想でも、最初の検証単位に分解できなければ進めない。まずは最小コストで仮説を確かめられる形に落とし込む。
            </div>
          </div>
          <div className="strength-card">
            <div className="strength-num">03</div>
              <div className="strength-title">運用と採算が回るか</div>
            <div className="strength-body">
                作って終わりにせず、更新負荷、提案工数、獲得コスト、継続性まで含めて成立するかを判断する。
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="section-label">代表プロジェクト</div>
        <h2
          className="section-title pf-reveal"
          ref={(el) => setRevealRef(el, 2)}
        >
          代表3件を中心に、<em>仮説・設計・実装</em>まで示す
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
                店舗向けDM営業は反応率が低く、1件ずつ個別提案を作り込む方法では継続しづらい。そこで、店舗情報入力だけで短時間にデモ作成できる導線を設計し、提案速度と再現性を検証した。
              </p>
              <div className="project-summary-line">
                店舗営業の低反応率に対し、提案工数を下げるデモ生成導線を設計
              </div>
            </div>
            <div className="project-meta">
              <p className="project-live-status">{liveStatusText}</p>
              {liveMetrics?.updatedAt ? (
                <p className="project-live-updated">
                  最終更新: {new Date(liveMetrics.updatedAt).toLocaleString("ja-JP")}
                </p>
              ) : null}
              <div className="project-skills">
                <span className="skill-tag">要件設計</span>
                <span className="skill-tag">オペレーション設計</span>
                <span className="skill-tag">提案導線</span>
                <span className="skill-tag">Instagram / X DM営業</span>
              </div>
            </div>
            <div className="project-detail">
              <div>
                <div className="detail-label">課題</div>
                <div className="detail-text">
                  低反応率のDM営業では、1件ずつ提案を作り込むほど提案原価が上がり、継続しにくい構造になっていた。
                </div>
              </div>
              <div>
                <div className="detail-label">仮説</div>
                <div className="detail-text">
                  提案品質を上げる前に、店舗情報入力だけで短時間にデモを作れる導線を作れば、再現性と採算性を改善できると考えた。
                </div>
              </div>
              <div>
                <div className="detail-label">役割</div>
                <div className="detail-text">
                  課題設定、提案導線設計、テンプレート設計、情報入力フロー整理、実装、送付検証、改善判断までを担当。
                </div>
              </div>
              <div>
                <div className="detail-label">成果</div>
                <div className="detail-text">
                  10店舗にデモ送付して反応を観察。反応率は検証継続中だが、提案工数の圧縮には手応えがあり、運用設計の見直し軸が明確になった。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  低反応率チャネルでは、提案精度より先に提案原価を下げる設計が重要。属人努力ではなく再現可能な仕組み化が継続性に直結すると学んだ。
                </div>
              </div>
              <div>
                <div className="detail-label">参考</div>
                <div className="detail-text">
                  <a
                    className="project-link"
                    href="https://www.divizero.jp/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Web制作トップページを開く ↗
                  </a>
                  <div className="project-link-url">https://www.divizero.jp/</div>
                </div>
                <iframe
                  className="project-preview-frame"
                  src="https://www.divizero.jp/"
                  title="Web制作トップページのプレビュー"
                  loading="lazy"
                />
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
                <div className="project-name">AI営業文面生成の採算検証</div>
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
                営業文面の個別最適化は反応率改善に有効だが、人力運用では工数が重い。企業情報をもとに自動生成する仕組みを試作し、実装可能性だけでなく採算性まで含めて展開範囲を検証した。
              </p>
              <div className="project-summary-line">
                営業文面の個別最適化を自動化し、採算試算まで行って展開範囲を判断
              </div>
            </div>
            <div className="project-meta">
              <span className="project-badge">補助事例</span>
              <div className="project-skills">
                <span className="skill-tag">AI活用</span>
                <span className="skill-tag">業務効率化</span>
                <span className="skill-tag">採算分析</span>
                <span className="skill-tag">検証設計</span>
              </div>
            </div>
            <div className="project-detail">
              <div>
                <div className="detail-label">課題</div>
                <div className="detail-text">
                  営業文面は定型化すると反応率が下がり、個別調整に寄せると工数が重くなるというトレードオフがあった。
                </div>
              </div>
              <div>
                <div className="detail-label">仮説</div>
                <div className="detail-text">
                  企業情報をもとに文面生成を自動化すれば、個別最適化の初速を上げつつ営業担当者の工数を下げられると考えた。
                </div>
              </div>
              <div>
                <div className="detail-label">役割</div>
                <div className="detail-text">
                  課題設定、AI活用要件整理、画面構成、導線設計、試作実装、採算試算、用途限定の判断までを担当。
                </div>
              </div>
              <div>
                <div className="detail-label">成果</div>
                <div className="detail-text">
                  返信率・成約率の想定値とAPIコストを試算し、低単価用途では採算が合いにくいと判断。高単価・高LTV用途へ限定する方針を確立した。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  実装可否だけでなく、収益構造に照らして「広げない判断」をすることも企画業務の重要な責務だと学んだ。
                </div>
              </div>
              <div>
                <div className="detail-label">参考</div>
                <div className="detail-text">検証画面 / 設計メモは面談時に共有可能。</div>
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
                小規模アパレルでは在庫・初期費用・発注業務が立ち上がり障壁になりやすい。受注生産と決済・分配を一体化し、在庫を持たずに始めやすい運用モデルを企画・開発した。
              </p>
              <div className="project-summary-line">
                在庫リスクの高い小規模EC向けに、受注生産と収益分配を自動化する運用を設計
              </div>
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
                <div className="detail-label">課題</div>
                <div className="detail-text">
                  小規模アパレルでは、在庫リスク・初期費用・発注業務の重さが立ち上がり障壁になっていた。
                </div>
              </div>
              <div>
                <div className="detail-label">仮説</div>
                <div className="detail-text">
                  受注生産・決済・収益分配を一体化できれば、在庫を持たずに始めやすい運用モデルを作れると考えた。
                </div>
              </div>
              <div>
                <div className="detail-label">役割</div>
                <div className="detail-text">
                  事業課題の設定、受注生産フロー設計、API連携の要件整理、画面構成、収益分配設計、実装、検証、改善判断までを担当。
                </div>
              </div>
              <div>
                <div className="detail-label">成果</div>
                <div className="detail-text">
                  運用フローと自動分配設計を実装し、機能検証は完了。立ち上げ段階では供給側獲得と集客導線がボトルネックだと特定した。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  機能の有用性だけでは立ち上がらず、両面市場では供給側の初期獲得と信頼形成を先に設計する必要があると学んだ。
                </div>
              </div>
              <div>
                <div className="detail-label">参考</div>
                <div className="detail-text">
                  <a
                    className="project-link"
                    href="https://brandos.closer-official.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    BrandOSトップページを開く ↗
                  </a>
                  <div className="project-link-url">
                    https://brandos.closer-official.com/
                  </div>
                </div>
                <iframe
                  className="project-preview-frame"
                  src="https://brandos.closer-official.com/"
                  title="BrandOSトップページのプレビュー"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="project-subhead">補助案件（詳細は必要時に提示）</div>
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
                  <small>自社型アフィリエイト・マッチング構想</small>
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
                既存アフィリエイトの不利構造と中間コスト課題に対して、既存決済基盤を活かし参入障壁を下げる構造を設計。初期市場では信頼設計が最優先だと学んだ検証案件。
              </p>
              <div className="project-summary-line">
                信頼形成が難しい初期市場で、報酬設計と供給側の統一条件を検証した事例
              </div>
            </div>
            <div className="project-meta">
              <span className="project-badge">補助案件</span>
              <div className="project-skills">
                <span className="skill-tag">マーケットプレイス設計</span>
                <span className="skill-tag">報酬設計</span>
                <span className="skill-tag">市場構造分析</span>
              </div>
            </div>
            <div className="project-detail">
              <div>
                <div className="detail-label">課題</div>
                <div className="detail-text">
                  初期アフィリエイト市場では、報酬条件より「支払い不安」や「案件品質の不統一」が参入障壁になっていた。
                </div>
              </div>
              <div>
                <div className="detail-label">仮説</div>
                <div className="detail-text">
                  報酬設計と参入条件を整えれば初期流動性を作れると考え、供給条件整理と導線設計を実施した。
                </div>
              </div>
              <div>
                <div className="detail-label">役割</div>
                <div className="detail-text">
                  市場課題の整理、報酬設計、供給条件整理、画面構成、導線設計、実装、初期検証、改善判断までを担当。
                </div>
              </div>
              <div>
                <div className="detail-label">成果</div>
                <div className="detail-text">
                  初期参加者を得たものの、供給ジャンルの統一と支払い不安の解消が不十分で、マッチング成立率は限定的だった。
                </div>
              </div>
              <div>
                <div className="detail-label">学び</div>
                <div className="detail-text">
                  初期市場では報酬条件より信頼設計が優先。参入順序と供給側品質の設計を先に固める必要があると判断した。
                </div>
              </div>
              <div>
                <div className="detail-label">参考</div>
                <div className="detail-text">
                  <a
                    className="project-link"
                    href="https://sell.closer-official.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Closerトップページを開く ↗
                  </a>
                  <div className="project-link-url">https://sell.closer-official.com/</div>
                </div>
                <iframe
                  className="project-preview-frame"
                  src="https://sell.closer-official.com/"
                  title="Closerトップページのプレビュー"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="section-label">実務経験と実績</div>
        <h2
          className="section-title pf-reveal"
          ref={(el) => setRevealRef(el, 4)}
        >
          営業・接客の現場で得た<em>顧客理解</em>が土台
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
              <br />
              <br />
              この経験から、表面的な要望ではなく、ユーザーの文脈を観察して対応を変える重要性を学んだ。
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
              <div className="exp-period">営業インターン / 14か月</div>
            </div>
            <div className="exp-result">社内売上 3 位 / 後輩育成 3 名全員契約</div>
            <div className="exp-body">
              大学在学中、訪問販売と催事営業のインターンに14か月従事。顧客の不安や断る理由を観察しながら提案内容を調整し、後半は催事店舗リーダーとして新人フォローと現場運営も担当した。
              <br />
              <br />
              この経験から、目の前の会話だけでなく、顧客の次の行動まで含めて設計する視点を身につけた。
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
        <div className="section-label">強み</div>
        <div className="about-grid pf-reveal" ref={(el) => setRevealRef(el, 6)}>
          <div>
            <p className="about-text">
              私は、現場の違和感や業務上の非効率を起点に、<em>課題の言語化</em>、
              <em>仮説設計</em>、<em>仕組み化</em>、<em>初期検証</em>
              までを一気通貫で進めることができます。
              <br />
              <br />
              特に、営業・接客・自社開発の経験を通じて、ユーザーの行動や現場負荷を踏まえた設計ができる点が強みです。
              <br />
              <br />
              企画だけで終わらず、実装や運用まで見据えて前に進める役割で価値を出したいと考えています。
            </p>
          </div>
          <div className="about-facts">
            <div className="fact-item">
              <div className="fact-label">任せてほしい領域</div>
              <div className="fact-value">
                課題整理 / 仮説設計 / 要件定義
                <br />
                導線改善 / 初期検証 / 運用設計
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-label">得意なテーマ</div>
              <div className="fact-value">
                業務効率化 / 店舗DX / 顧客導線設計
                <br />
                小規模事業の仕組み化 / 初期プロダクト検証
              </div>
            </div>
            <div className="fact-item">
              <div className="fact-label">扱えること</div>
              <div className="fact-value">
                要件整理 / UI設計 / HTML / CSS / JS
                <br />
                Firebase / Stripe / API連携 / 検証設計
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="why-pm">
        <div className="section-label">なぜ企画 / PMなのか</div>
        <h2
          className="section-title pf-reveal"
          ref={(el) => setRevealRef(el, 7)}
        >
          売る前に、<em>何を作るべきか</em>を設計したい
        </h2>
        <p className="project-desc pf-reveal" ref={(el) => setRevealRef(el, 8)}>
          営業現場では、顧客が本当に困っていることと、実際に提案されている解決策がずれている場面を多く見てきました。その経験から、単に売るだけではなく「何を作るべきか」「どう届けるべきか」を設計する側に関わりたいと考えるようになりました。現在は、課題を見つけて仮説を立て、小さく実装しながら改善する形で適性を磨いています。
        </p>
        <div className="strengths-grid pf-reveal" ref={(el) => setRevealRef(el, 9)}>
          <div className="strength-card">
            <div className="strength-title">入社後に活かせること</div>
            <div className="strength-body">
              ユーザー課題の言語化、仮説ベースの要件整理、MVPの素早い立ち上げ、営業/現場視点を含めた改善提案、小規模チームでの自走を実務で再現できます。
            </div>
          </div>
          <div className="strength-card">
            <div className="strength-title">仕事で重視していること</div>
            <div className="strength-body">
              課題の強さを見誤らないこと、作る前に運用まで考えること、大きい構想でも最小単位へ分解すること、失敗の構造まで言語化して次の判断に活かすことを重視しています。
            </div>
          </div>
          <div className="strength-card">
            <div className="strength-title">追加資料について</div>
            <div className="strength-body">
              履歴書・職務経歴書、案件ごとの設計メモ、検証画面、改善ログは選考や面談時に共有可能です。
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
              ref={(el) => setRevealRef(el, 10)}
            >
              選考・面談のご連絡を<em>歓迎しています</em>
            </h2>
            <p className="contact-note pf-reveal" ref={(el) => setRevealRef(el, 11)}>
              企画職・プロダクトマネージャー職での選考や面談のご相談を歓迎しています。
              <br />
              必要に応じて、各案件の詳細、設計メモ、検証画面、履歴書・職務経歴書も共有可能です。
            </p>
            <div className="contact-info pf-reveal" ref={(el) => setRevealRef(el, 12)}>
              <div className="contact-row">
                <div className="contact-icon">✉</div>
                <a href="mailto:handtadanosuke@gmail.com">handtadanosuke@gmail.com</a>
              </div>
            </div>
          </div>
          <div
            className="pf-reveal"
            ref={(el) => setRevealRef(el, 13)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <a
              href="mailto:handtadanosuke@gmail.com"
              className="btn btn-primary"
              style={{ justifyContent: "center" }}
            >
              選考・面談について連絡する
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left">Kobayashi Tadanosuke — Portfolio 2026</div>
        <div className="footer-right">企画 / PM 志望</div>
      </footer>
    </div>
  );
}
