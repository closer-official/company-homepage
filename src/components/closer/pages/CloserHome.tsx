"use client";
import React, { useState } from "react";

const LINE_URL = "https://line.me/ti/p/7818mX2ZAe";
const X_DM_URL = "https://x.com/messages/compose?recipient_id=21closer_ai";

/* ---------- Why アコーディオン ---------- */
const WHY_POINTS = [
  {
    num: '01',
    title: '似た人は、他にもいる',
    body: '発信を見て興味を持った人は必ず「いいな、でも似た人も他にいるな」と考えます。その瞬間にあなたにする理由を渡せる場所がありますか。プロフィールとLINE登録の間に、説得の1ページがあるかどうか。差はそこで開きます。',
  },
  {
    num: '02',
    title: '熱は、すぐ冷める',
    body: '人がいちばん前のめりなのは行動した直後です。でも多くの場合、その熱が冷める前に返信はできない。ページは、あなたが眠っている間もその熱を受け止め続けます。24時間働く、いちばん辛抱強い営業です。',
  },
  {
    num: '03',
    title: '競合は、あとから流れてくる',
    body: '一度あなたの商品に反応した人のTLには、そのあと似たサービスの発信が流れ込みます。仕組み上そうなります。比較が始まる前に納得まで運べているか。スピードで負けないために、ページがあります。',
  },
  {
    num: '04',
    title: '人に勧めることを、自分でも',
    body: '「成功する人はまず自分に投資する」——そう発信している人ほど、自分の販売ページは後回しにしがちです。人に勧めていることを自分のページで体現する。それが結局、いちばんの説得力になります。',
  },
];

const FAQ_ITEMS = [
  {
    q: "制作はどんな体制ですか？",
    a: "私が窓口となり、信頼できる制作チームと連携して進めます。累計1,000サイト以上の制作体制で、相談から完成まで伴走します。",
  },
  {
    q: "無料デモって本当に無料ですか？",
    a: "はい、完全無料です。あなたのサービスに合わせたサンプルページを実際に作ってから確認できます。気に入らなければキャンセルも可能です。",
  },
  {
    q: "何を準備して相談すればいいですか？",
    a: "何も準備しなくて大丈夫です。「こういうサービスをやっています」の一言から始まります。ヒアリングしながら一緒に整理します。",
  },
  {
    q: "価格を教えてください。",
    a: "LP（1ページ）49,800円〜／HP（5ページ構成）98,000円〜。買い切りで月額費用は一切かかりません。分割払いも可能です（3回まで）。",
  },
];

function WhyAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <div className="dz2-why-inner">
      {WHY_POINTS.map((p, i) => (
        <div key={p.num} className={`dz2-why-point${openIdx === i ? " open" : ""}`}>
          <div
            className="dz2-why-head"
            role="button"
            tabIndex={0}
            aria-expanded={openIdx === i}
            onClick={() => toggle(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i)}
          >
            <span className="dz2-why-number">{p.num}</span>
            <span className="dz2-why-title">{p.title}</span>
            <svg
              className="dz2-why-chevron"
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              aria-hidden="true"
            >
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dz2-why-body">
            <p>{p.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <div className="dz2-faq-list">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className={`dz2-faq-item${openIdx === i ? " open" : ""}`}>
          <div
            className="dz2-faq-question"
            role="button"
            tabIndex={0}
            aria-expanded={openIdx === i}
            onClick={() => toggle(i)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(i)}
          >
            <span>{item.q}</span>
            <svg className="dz2-faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="dz2-faq-answer">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CloserHome() {
  return (
    <div className="dz2-lp">

      {/* ── HERO ── */}
      <section className="dz2-hero" id="top">
        <div className="dz2-hero-inner">
          <div className="dz2-hero-content">
            <p className="dz2-eyebrow">LP・HP制作の相談窓口</p>
            <h1 className="dz2-hero-headline">
              「興味を持たれた、<br />次の一手はありますか。」
            </h1>
            <p className="dz2-hero-sub">
              発信で人は集まる。問題は、そのあと。<br />
              集めた人を取りこぼさない"受け皿のページ"を、一緒に作ります。
            </p>
            <div className="dz2-hero-ctas">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="dz2-btn-primary">
                まずLINEで話しかける
              </a>
              <a href="#why" className="dz2-btn-secondary">
                LPって必要？と思ったら ↓
              </a>
            </div>
            <p className="dz2-hero-note">買い切り4.98万〜 ／ 最短1週間 ／ 無料デモあり</p>
          </div>

          {/* 装飾SVG（デスクトップのみ）*/}
          <div className="dz2-hero-deco" aria-hidden="true">
            <svg width="260" height="460" viewBox="0 0 260 460" fill="none">
              <rect x="20" y="10" width="220" height="440" rx="28" stroke="#D0D0C8" strokeWidth="1.5" />
              <rect x="95" y="10" width="70" height="20" rx="10" fill="#FAFAF8" stroke="#D0D0C8" strokeWidth="1.5" />
              <rect x="36" y="46" width="188" height="92" rx="8" stroke="#D0D0C8" strokeWidth="1.5" />
              <rect x="36" y="150" width="148" height="8" rx="4" fill="#D0D0C8" />
              <rect x="36" y="164" width="120" height="8" rx="4" fill="#D0D0C8" />
              <rect x="36" y="184" width="188" height="5" rx="2.5" fill="#E8E8E4" />
              <rect x="36" y="194" width="160" height="5" rx="2.5" fill="#E8E8E4" />
              <rect x="36" y="204" width="176" height="5" rx="2.5" fill="#E8E8E4" />
              <rect x="36" y="222" width="188" height="36" rx="18" stroke="#D0D0C8" strokeWidth="1.5" />
              <line x1="36" y1="274" x2="224" y2="274" stroke="#E8E8E4" strokeWidth="1" strokeDasharray="4 4" />
              <rect x="36" y="286" width="10" height="10" rx="2" fill="#D0D0C8" />
              <rect x="52" y="288" width="100" height="6" rx="3" fill="#D0D0C8" />
              <rect x="36" y="306" width="10" height="10" rx="2" fill="#D0D0C8" />
              <rect x="52" y="308" width="130" height="6" rx="3" fill="#D0D0C8" />
              <rect x="36" y="326" width="10" height="10" rx="2" fill="#D0D0C8" />
              <rect x="52" y="328" width="88" height="6" rx="3" fill="#D0D0C8" />
              <rect x="36" y="354" width="80" height="14" rx="4" fill="#D0D0C8" opacity="0.7" />
              <rect x="36" y="382" width="188" height="36" rx="18" stroke="#D0D0C8" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── HOOK ── */}
      <section className="dz2-hook" id="hook">
        <div className="dz2-container">
          <p className="dz2-hook-line">
            興味を持たれた次の瞬間、<br />
            ライバルの発信が、相手のTLに流れ込みます。
          </p>
          <p className="dz2-hook-sub">比較が始まる前に、納得まで届けられているか。</p>
          <a href="#why" className="dz2-link-arrow">その仕組みを見る →</a>
        </div>
      </section>

      {/* ── CONCERN ── */}
      <section className="dz2-section dz2-section--surface2" id="concern">
        <div className="dz2-container-wide">
          <span className="dz2-label">こんな方へ</span>
          <div className="dz2-concern-grid">

            <article className="dz2-concern-card">
              <div className="dz2-concern-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="12" cy="16" r="5" stroke="#3D6B4F" strokeWidth="1.5" />
                  <path d="M12 21v6M9 23h6" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 16h6" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M26 13l3 3-3 3" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="37" cy="16" r="2.5" stroke="#3D6B4F" strokeWidth="1.5" />
                  <path d="M36 32c0-3 2-5 2-5" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="37" cy="40" r="2" stroke="#3D6B4F" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="dz2-concern-text">
                XやInstagramで集客できてるのに<br />受け皿のページがDM任せになっている
              </p>
            </article>

            <article className="dz2-concern-card">
              <div className="dz2-concern-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="6" width="24" height="32" rx="3" stroke="#3D6B4F" strokeWidth="1.5" />
                  <path d="M14 14h12M14 20h12M14 26h8" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M34 22l4 4-4 4" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="36" cy="34" r="6" stroke="#3D6B4F" strokeWidth="1.5" />
                  <path d="M34 34h4M36 32v4" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="dz2-concern-text">
                制作会社は高すぎる<br />フリーランスは不安で頼めない
              </p>
            </article>

            <article className="dz2-concern-card">
              <div className="dz2-concern-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="20" cy="14" r="6" stroke="#3D6B4F" strokeWidth="1.5" />
                  <path d="M8 38c0-7 5.4-12 12-12s12 5 12 12" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="33" y="8" width="12" height="14" rx="3" stroke="#3D6B4F" strokeWidth="1.5" />
                  <path d="M36 13h6M36 17h4" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M37 22l-2 3 2-3" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="dz2-concern-text">
                何をどう頼めばいいか<br />そもそも分からない
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="dz2-section dz2-section--white" id="why">
        <div className="dz2-container">
          <span className="dz2-label">なぜ、ページが要るのか</span>
          <h2 className="dz2-section-heading">
            集客の入口より、<br />受け止める場所の話を。
          </h2>
          <p className="dz2-why-lead">
            発信で人は集められる。問題はそのあと。<br />
            興味を持った人が"次に見る場所"が、ありますか。
          </p>
          <WhyAccordion />
          <div className="dz2-why-close">
            <p className="dz2-why-close-text">まずは無料のデモから。</p>
            <p className="dz2-why-close-sub">言葉で説明するより、見てもらうほうが早いので。</p>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="dz2-link-arrow">
              デモを見てみる →
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="dz2-section dz2-section--bg" id="services">
        <div className="dz2-container">
          <span className="dz2-label">できること</span>
          <h2 className="dz2-section-heading">販売ページを、一緒に整えます。</h2>

          <div className="dz2-service-list">
            <div className="dz2-service-item">
              <div className="dz2-service-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="5" y="2" width="14" height="22" rx="3" stroke="#3D6B4F" strokeWidth="1.5" />
                  <circle cx="12" cy="21" r="1" fill="#3D6B4F" />
                  <path d="M20 10h5M22 8l3 2-3 2" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="dz2-service-name">LINE登録ページ</h3>
                <p className="dz2-service-desc">無料プレゼント受取・メルマガ登録など。LINEへ流す前の"最初の1ページ"を整える。</p>
              </div>
            </div>
            <div className="dz2-service-item">
              <div className="dz2-service-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M3 4h3l2.5 12h12L23 8H8" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11.5" cy="21.5" r="1.5" fill="#3D6B4F" />
                  <circle cx="19.5" cy="21.5" r="1.5" fill="#3D6B4F" />
                </svg>
              </div>
              <div>
                <h3 className="dz2-service-name">販売LP</h3>
                <p className="dz2-service-desc">講座・コンサル・デジタル商品の販売ページ。「なぜ必要か」から「今すぐ申込む」まで1枚で完結。</p>
              </div>
            </div>
            <div className="dz2-service-item">
              <div className="dz2-service-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="10" width="22" height="4" rx="2" stroke="#3D6B4F" strokeWidth="1.5" />
                  <rect x="5" y="14" width="18" height="10" rx="2" stroke="#3D6B4F" strokeWidth="1.5" />
                  <path d="M14 10V24" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 10c0 0-3-1-3-4s3-3 3 0M14 10c0 0 3-1 3-4s-3-3-3 0" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="dz2-service-name">特典・プレゼント受取ページ</h3>
                <p className="dz2-service-desc">購読者・購入者向けの特典案内。信頼の積み上げを、ページでも支える。</p>
              </div>
            </div>
          </div>

          <div className="dz2-tag-group">
            {["買い切り", "4.98万円〜", "最短1週間", "無料デモあり", "修正無制限"].map((t) => (
              <span key={t} className="dz2-tag">{t}</span>
            ))}
          </div>

          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="dz2-btn-primary">
            無料でデモを見る
          </a>
        </div>
      </section>

      {/* ── FLOW ── */}
      <section className="dz2-section dz2-section--accent-lt" id="flow">
        <div className="dz2-container-wide">
          <div style={{ textAlign: "center" }}>
            <span className="dz2-label">相談の流れ</span>
            <h2 className="dz2-section-heading">まず雑談からで、大丈夫です。</h2>
          </div>

          <div className="dz2-flow-steps">
            {[
              {
                n: 1, title: "LINEかDMで話しかける",
                desc: "専門用語も準備も不要。「こういうことがしたい」で十分です。",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M6 6h28a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H14l-8 6v-6H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16h16M12 22h10" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                n: 2, title: "無料でデモを見る",
                desc: "あなたのサービスに合わせたサンプルページを無料で作ります。",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="4" y="4" width="14" height="22" rx="2" stroke="#3D6B4F" strokeWidth="1.5" />
                    <circle cx="11" cy="23" r="1" fill="#3D6B4F" />
                    <rect x="22" y="10" width="14" height="22" rx="2" stroke="#3D6B4F" strokeWidth="1.5" />
                    <path d="M26 16h6M26 20h6M26 24h4" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                n: 3, title: "気に入ったら制作スタート",
                desc: "気に入らなければキャンセルOK。納得してから進められます。",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="14" stroke="#3D6B4F" strokeWidth="1.5" />
                    <path d="M12 20l6 6 10-12" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((step, idx, arr) => (
              <React.Fragment key={step.n}>
                <div className="dz2-flow-step">
                  <div className="dz2-flow-num">{step.n}</div>
                  <div className="dz2-flow-icon" aria-hidden="true">{step.icon}</div>
                  <h3 className="dz2-flow-title">{step.title}</h3>
                  <p className="dz2-flow-desc">{step.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div className="dz2-flow-arrow" aria-hidden="true">
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                      <path d="M0 12h34M28 6l6 6-6 6" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="dz2-btn-primary">
              まず話しかけてみる →
            </a>
          </div>
        </div>
      </section>

      {/* ── WORKS / STATS ── */}
      <section className="dz2-section dz2-section--bg" id="works">
        <div className="dz2-container">
          <span className="dz2-label">制作実績</span>
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <div className="dz2-stat-badge">
              <span className="dz2-stat-number">1,000+</span>
              <span className="dz2-stat-label">これまでの制作実績</span>
            </div>
            <p className="dz2-stat-note">累計1,000サイト以上の制作体制で対応します</p>
          </div>

          <h2 className="dz2-section-heading">こんなページを作ってきました。</h2>

          <div className="dz2-works-grid">
            <figure className="dz2-work-item">
              <img src="/works/work-cafe.gif" alt="カフェ / ブランドサイト" width={1200} height={750} />
              <figcaption>カフェ / ブランドサイト</figcaption>
            </figure>
            <figure className="dz2-work-item">
              <img src="/works/work-music.gif" alt="音楽レーベル / コーポレートサイト" width={1200} height={750} />
              <figcaption>音楽レーベル / コーポレートサイト</figcaption>
            </figure>
            <figure className="dz2-work-item">
              <img src="/works/work-futsal.gif" alt="フットサルクラブ / 公式サイト" width={1200} height={750} />
              <figcaption>フットサルクラブ / 公式サイト</figcaption>
            </figure>
            <div className="dz2-work-placeholder">制作実績<br />近日公開</div>
            <div className="dz2-work-placeholder">制作実績<br />近日公開</div>
            <div className="dz2-work-placeholder">制作実績<br />近日公開</div>
          </div>

          <p className="dz2-works-note">掲載許可をいただいた案件のみ表示しています</p>

          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="dz2-btn-primary">
            自分のページを相談する →
          </a>
        </div>
      </section>

      {/* ── PROFILE ── */}
      <section className="dz2-section dz2-section--surface2" id="profile">
        <div className="dz2-container">
          <div className="dz2-profile-inner">
            <div className="dz2-profile-photo-wrap">
              <img
                src="/images/profile.png"
                alt="小林薫之介"
                className="dz2-profile-photo"
                width={160}
                height={160}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <p className="dz2-profile-eyebrow">窓口担当</p>
              <h2 className="dz2-profile-name">小林 薫之介</h2>
              <p className="dz2-profile-role">Tadanosuke Kobayashi ／ Divizero 代表</p>
              <p className="dz2-profile-bio">
                Web制作・SNS発信・マーケティングに携わる中で、<br />
                「良いサービスを持っているのに、見せ方で損している人が多い」<br />
                と感じてこの窓口を始めました。<br /><br />
                私が窓口となり、信頼できる制作体制と連携して、<br />
                相談から完成まで伴走します。<br />
                専門用語なしで、気軽に話しかけてもらえれば嬉しいです。
              </p>
              <div className="dz2-profile-sns">
                <a href="https://x.com/21closer_ai" target="_blank" rel="noopener noreferrer" className="dz2-sns-link">
                  X：@21closer_ai
                </a>
                <a href="https://www.instagram.com/tadanosuke.divizero" target="_blank" rel="noopener noreferrer" className="dz2-sns-link">
                  Instagram：@tadanosuke.divizero
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="dz2-section dz2-section--bg" id="faq">
        <div className="dz2-container">
          <span className="dz2-label">よくある質問</span>
          <h2 className="dz2-section-heading">FAQ</h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="dz2-cta-final" id="contact">
        <div className="dz2-container" style={{ textAlign: "center" }}>
          <h2 className="dz2-cta-final-heading">まず、話しかけてみてください。</h2>
          <p className="dz2-cta-final-sub">
            専門知識も準備も要りません。<br />「こういうことがしたい」の一言から始まります。
          </p>
          <div className="dz2-cta-final-btns">
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="dz2-btn-white">
              LINEで話しかける
            </a>
            <a href={X_DM_URL} target="_blank" rel="noopener noreferrer" className="dz2-btn-outline-white">
              XでDMする
            </a>
          </div>
          <p className="dz2-cta-final-note">返信は基本的に当日〜翌日以内</p>
        </div>
      </section>

    </div>
  );
}
