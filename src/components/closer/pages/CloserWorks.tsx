import Link from "next/link";

function ThumbRestaurant() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="300" fill="#e8e0d4" />
      <rect x="40" y="40" width="200" height="130" rx="2" fill="#1a1714" opacity="0.8" />
      <rect x="48" y="48" width="184" height="114" fill="#242018" />
      <rect x="60" y="62" width="80" height="5" rx="1" fill="#b8965a" opacity="0.7" />
      <rect x="280" y="60" width="80" height="140" rx="4" fill="#1a1714" opacity="0.75" />
      <text x="40" y="220" fontFamily="Cormorant Garamond, serif" fontSize="18" fill="#1a1714" opacity="0.6">
        Sample（デモ）
      </text>
      <text x="40" y="240" fontFamily="DM Mono, monospace" fontSize="9" fill="#b8965a" opacity="0.5" letterSpacing="2">
        RESTAURANT — WEB
      </text>
    </svg>
  );
}

function ThumbCafe() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="300" fill="#d4c8b8" />
      <circle cx="200" cy="120" r="80" fill="none" stroke="#b8965a" strokeWidth="0.8" opacity="0.4" />
      <circle cx="200" cy="120" r="50" fill="#e8e0d4" opacity="0.8" />
      <text x="100" y="230" fontFamily="Cormorant Garamond, serif" fontSize="18" fill="#1a1714" opacity="0.6">
        Sample（デモ）
      </text>
      <text x="100" y="250" fontFamily="DM Mono, monospace" fontSize="9" fill="#b8965a" opacity="0.5" letterSpacing="2">
        CAFE — WEB
      </text>
    </svg>
  );
}

function ThumbBar() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="300" fill="#c8bfb2" />
      <rect x="20" y="50" width="360" height="200" rx="2" fill="#1a1714" opacity="0.8" />
      <rect x="28" y="58" width="344" height="184" fill="#242018" />
      <text x="40" y="265" fontFamily="DM Mono, monospace" fontSize="9" fill="#b8965a" opacity="0.4" letterSpacing="2">
        BAR — WEB + UPDATE（デモ）
      </text>
    </svg>
  );
}

export default function CloserWorks() {
  return (
    <>
      <div className="closer-works-hero">
        <span className="closer-section-label">Works / Voice</span>
        <h1 className="closer-page-hero-title">
          制作事例と<em>お客様の声</em>。
        </h1>
        <p className="closer-page-hero-lead">
          見た目だけでなく、分かりやすさや相談しやすさも重視しています。
        </p>
      </div>
      <div className="closer-works-demo-banner" role="note">
        <strong>デモ掲載のご案内：</strong>
        以下のサムネイル・店名・説明は、構成イメージ用の<strong>サンプル（架空の例）</strong>です。実案件の掲載に差し替える予定ですので、現在は「デザイン・情報設計のたたき」としてご覧ください。
      </div>
      <div className="closer-works-grid">
        <div className="closer-work-card">
          <div className="closer-work-thumb">
            <div className="closer-work-thumb-inner">
              <ThumbRestaurant />
            </div>
          </div>
          <div className="closer-work-info">
            <div className="closer-work-cat">飲食店 — Web制作（サンプル）</div>
            <div className="closer-work-title">イタリアン料理店 様（デモ）</div>
            <p className="closer-work-desc">
              Instagram連携・メニューページ・予約導線を整備。来店前の不安を解消する構成で制作、という想定の例です。
            </p>
          </div>
        </div>
        <div className="closer-work-card">
          <div className="closer-work-thumb">
            <div className="closer-work-thumb-inner">
              <ThumbCafe />
            </div>
          </div>
          <div className="closer-work-info">
            <div className="closer-work-cat">カフェ — Web制作（サンプル）</div>
            <div className="closer-work-title">自家焙煎カフェ 様（デモ）</div>
            <p className="closer-work-desc">
              世界観を活かしたページ構成でブランドイメージを強化、という想定の例です。
            </p>
          </div>
        </div>
        <div className="closer-work-card">
          <div className="closer-work-thumb">
            <div className="closer-work-thumb-inner">
              <ThumbBar />
            </div>
          </div>
          <div className="closer-work-info">
            <div className="closer-work-cat">バー — Web制作 + 更新サポート（サンプル）</div>
            <div className="closer-work-title">クラフトバー 様（デモ）</div>
            <p className="closer-work-desc">
              イベント情報を定期更新する仕組みを込みで制作、という想定の例です。
            </p>
          </div>
        </div>
      </div>
      <section className="closer-works-voice-section">
        <span className="closer-section-label">Voice</span>
        <h2 className="closer-section-title">
          お客様からの<em>お声</em>（イメージ）
        </h2>
        <p className="closer-features-desc" style={{ marginBottom: "24px" }}>
          以下は、トーンの参考用の<strong>サンプル文</strong>です（実在のお客様の声ではありません）。
        </p>
        <div className="closer-works-voice-grid">
          <div className="closer-voice-card">
            <p className="closer-voice-text">
              &quot;相談しやすく、何が必要かを丁寧に整理してくれました。完成したページを見て、お店の情報がちゃんとまとまっているのが嬉しかったです。&quot;
            </p>
            <p className="closer-voice-meta">飲食店オーナー 様（サンプル）</p>
          </div>
          <div className="closer-voice-card">
            <p className="closer-voice-text">
              &quot;Instagramとホームページがつながって、お客様が予約しやすくなりました。料金も分かりやすく、安心してお願いできました。&quot;
            </p>
            <p className="closer-voice-meta">カフェ経営者 様（サンプル）</p>
          </div>
        </div>
      </section>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Contact</span>
        <h2 className="closer-cta-title">
          あなたのお店の<em>事例</em>を作りましょう。
        </h2>
        <p className="closer-cta-sub">まずはお気軽にご相談ください。</p>
        <Link href="/contact" className="closer-btn-gold">
          無料で相談する
        </Link>
      </section>
    </>
  );
}
