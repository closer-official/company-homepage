import Link from "next/link";

export default function CloserFooter() {
  return (
    <footer className="closer-footer">
      <div className="closer-footer-grid">
        <div>
          <div className="closer-footer-brand">
            Closer <span>by</span> divizero
          </div>
          <p className="closer-footer-tagline">
            ブランド読みは「ディビゼロ」。飲食店・実店舗の魅力を、来店前のお客様に伝えるWeb制作サービスです。
          </p>
          <div className="closer-footer-social-wrap">
            <div className="closer-footer-col-title">Follow / 公式</div>
            <div className="closer-footer-social">
              <a
                href="https://www.instagram.com/tadanosuke.divizero"
                className="closer-footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
                <span className="closer-footer-social-sep"> / </span>
                <span className="closer-footer-social-ja">インスタ</span>
              </a>
              <a
                href="https://x.com/21closer_ai"
                className="closer-footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
                <span className="closer-footer-social-sep"> / </span>
                <span className="closer-footer-social-ja">Twitter</span>
              </a>
              <a
                href="https://lin.ee/ZUxDrBQ"
                className="closer-footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINE
                <span className="closer-footer-social-sep"> / </span>
                <span className="closer-footer-social-ja">ライン</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="closer-footer-col-title">Pages</div>
          <ul className="closer-footer-links">
            <li>
              <Link href="/">Top</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/tools">Tools / ツール</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/works">Works / Voice</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="closer-footer-col-title">Column</div>
          <ul className="closer-footer-links">
            <li>
              <Link href="/essay">コラム一覧</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="closer-footer-col-title">Legal</div>
          <ul className="closer-footer-links">
            <li>
              <Link href="/operator">運営者情報</Link>
            </li>
            <li>
              <Link href="/tokusho">特定商取引法に基づく表記</Link>
            </li>
            <li>
              <Link href="/privacy-policy">プライバシーポリシー</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="closer-footer-col-title">Other</div>
          <ul className="closer-footer-links">
            <li>
              <Link href="/partners">パートナー募集</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="closer-footer-bottom">
        <span>
          © {new Date().getFullYear()} Closer事務局 / Closer by divizero（ディビゼロ）
        </span>
        <span>運営元：Closer事務局</span>
      </div>
    </footer>
  );
}
