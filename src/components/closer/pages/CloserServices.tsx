import Link from "next/link";

export default function CloserServices() {
  return (
    <>
      <div className="closer-services-hero">
        <span className="closer-section-label">Services</span>
        <h1 className="closer-page-hero-title">
          実店舗の魅力を伝えるための<em>Web制作</em>。
        </h1>
        <p className="closer-page-hero-lead">
          まずは受け皿となるページを整え、必要に応じて更新や運用まで対応します。
        </p>
      </div>
      <div className="closer-services-grid">
        <div className="closer-service-card">
          <span className="closer-service-num">Service — 01</span>
          <h2 className="closer-service-name">Closer Web Production</h2>
          <p className="closer-service-desc">
            テンプレートをベースにしながら、お店の魅力や必要な情報を整理し、問い合わせや来店につながるWebページを制作します。初めてのお客様にも伝わりやすい構成で、スマホで見やすい設計を基本としています。
          </p>
          <div className="closer-service-tags">
            <span className="closer-service-tag">初客向け構成設計</span>
            <span className="closer-service-tag">SNS・マップ導線整理</span>
            <span className="closer-service-tag">スマホ最適化</span>
            <span className="closer-service-tag">お知らせ更新対応</span>
          </div>
        </div>
        <div className="closer-service-card">
          <span className="closer-service-num">Service — 02</span>
          <h2 className="closer-service-name">Update Support</h2>
          <p className="closer-service-desc">
            必要に応じて、SNS導線の更新やお知らせ反映など、専用編集ページで対応できる範囲の更新代行も行っています。常に最新の状態をお客様にお届けできます。
          </p>
          <div className="closer-service-tags">
            <span className="closer-service-tag">SNS導線更新</span>
            <span className="closer-service-tag">お知らせ反映</span>
            <span className="closer-service-tag">週2回まで対応</span>
          </div>
        </div>
        <div className="closer-service-card full-width closer-service-card--dark">
          <span className="closer-service-num">Other Projects</span>
          <h2 className="closer-service-name" style={{ color: "var(--cream)" }}>
            divizero の今後の展開
          </h2>
          <p className="closer-service-desc">
            divizero では、今後も複数のプロジェクトを展開予定です。ただし、現時点の主軸はWeb制作事業（Closer）です。詳細は随時お知らせします。
          </p>
        </div>
      </div>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Contact</span>
        <h2 className="closer-cta-title">
          どのサービスが合うか、<em>一緒に考えます</em>。
        </h2>
        <p className="closer-cta-sub">まずはお気軽にご相談ください。</p>
        <Link href="/contact" className="closer-btn-gold">
          無料で相談する
        </Link>
      </section>
    </>
  );
}
