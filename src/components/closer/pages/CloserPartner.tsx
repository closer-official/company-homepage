import Link from "next/link";

export default function CloserPartner() {
  return (
    <>
      <div className="closer-partner-hero">
        <span className="closer-section-label">Partner Wanted</span>
        <h1 className="closer-partner-title">
          一緒に、<em>お店を支える</em>仕事を。
        </h1>
        <p className="closer-partner-sub">
          Closer by divizero では、店舗リサーチ・初回提案・コミュニケーションを担う認定パートナーを募集しています。
        </p>
        <Link href="/contact?for=partner" className="closer-btn-gold">
          詳細を問い合わせる
        </Link>
      </div>
      <div className="closer-partner-body">
        <p>
          Closer by divizero では、事業の立ち上げや拡大を一緒に進めていく認定パートナーを募集しています。
        </p>
        <p>
          現時点では、店舗リサーチ・初回アプローチ・返信対応・ヒアリングサポートなど、事業の入口を担う役割が中心です。
          ただし、それだけに限らず、SNS運用、Webページの更新対応、制作サポート、今後展開予定の他事業領域など、関わり方は今後さらに広がっていきます。
        </p>
        <p>
          詳細な条件・報酬体系などは、上のボタンからパートナー用お問い合わせフォームにてご連絡ください。
        </p>
        <p>※ 店舗向けWeb制作のご相談とは別フォームです。</p>
      </div>
    </>
  );
}
