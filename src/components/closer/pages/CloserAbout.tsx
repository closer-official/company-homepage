import Link from "next/link";

export default function CloserAbout() {
  return (
    <>
      <div className="closer-about-hero">
        <div className="closer-about-hero-left">
          <span className="closer-section-label">About</span>
          <h1 className="closer-page-hero-title">
            なぜ、Closer by divizero が
            <br />
            この形でWeb制作をしているのか。
          </h1>
        </div>
        <div className="closer-about-hero-right">
          <p className="closer-about-hero-quote">
            SNSだけでは伝わりきらない。
            <span>でも、整えれば伝わる。</span>
          </p>
        </div>
      </div>
      <div className="closer-about-body">
        <p>
          表記は <em>divizero</em>、ブランド読みは<strong>ディビゼロ</strong>です。
        </p>
        <p>
          SNSやGoogleマップだけでも、お店の魅力はある程度伝わります。ただ、それだけでは初めてのお客様に必要な情報が散らばってしまい、来店前の不安や迷いが残ることがあります。
        </p>
        <p>
          <strong>
            Closer by divizero
            は、そうした状態を少しでも減らすために、魅力と情報を整理したWebページを制作しています。
          </strong>
        </p>
        <p>
          私たちが重視しているのは、見た目だけを整えることではありません。写真や世界観の良さを活かしながら、初めてのお客様が安心してお店を知れる状態を作ることです。
        </p>
        <p>
          大きな制作会社のような過剰な提案ではなく、今のお店にとって必要な範囲から始められることも大切にしています。まずは今ある情報を活かし、必要に応じて少しずつ整えていく。その考え方で、無理のないWeb制作を行っています。
        </p>
      </div>
      <section className="closer-cta-section">
        <span className="closer-cta-label">Contact</span>
        <h2 className="closer-cta-title">
          <em>まずは</em>、お気軽にご相談ください。
        </h2>
        <p className="closer-cta-sub">
          どんな段階でも構いません。現在の状況をお聞かせいただくところから始まります。
        </p>
        <Link href="/contact" className="closer-btn-gold">
          無料で相談する
        </Link>
      </section>
    </>
  );
}
