import Link from "next/link";
import { BilingualInline, BilingualLink } from "./BilingualText";
import {
  DIVIZERO_FOOTER_COLUMN,
  DIVIZERO_FOOTER_LEGAL,
  DIVIZERO_FOOTER_OTHER,
  DIVIZERO_FOOTER_TOP,
  DIVIZERO_SITE_LINKS,
} from "@/lib/divizero-nav";

export default function CloserFooter() {
  return (
    <footer className="closer-footer">
      <div className="closer-footer-grid">
        <div>
          <div className="closer-footer-brand">divizero</div>
          <p className="closer-footer-tagline">
            LP・HP制作の相談窓口。発信で集めた人を取りこぼさない"受け皿のページ"を、一緒に作ります。
          </p>
          <div className="closer-footer-social-wrap">
            <div className="closer-footer-col-title">
              <BilingualInline en="Follow" ja="公式" />
            </div>
            <div className="closer-footer-social">
              <a
                href="https://www.instagram.com/tadanosuke.divizero"
                className="closer-footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BilingualInline en="Instagram" ja="インスタ" />
              </a>
              <a
                href="https://x.com/21closer_ai"
                className="closer-footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BilingualInline en="X" ja="Twitter" />
              </a>
              <a
                href="https://lin.ee/q4V81Ks"
                className="closer-footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BilingualInline en="LINE" ja="ライン" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="closer-footer-col-title">
            <BilingualInline en="Pages" ja="ページ" />
          </div>
          <ul className="closer-footer-links">
            <li>
              <BilingualLink
                href={DIVIZERO_FOOTER_TOP.href}
                en={DIVIZERO_FOOTER_TOP.en}
                ja={DIVIZERO_FOOTER_TOP.ja}
              />
            </li>
            {DIVIZERO_SITE_LINKS.map((link) => (
              <li key={link.href}>
                <BilingualLink href={link.href} en={link.en} ja={link.ja} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="closer-footer-col-title">
            <BilingualInline en="Column" ja="コラム" />
          </div>
          <ul className="closer-footer-links">
            {DIVIZERO_FOOTER_COLUMN.map((link) => (
              <li key={link.href}>
                <BilingualLink href={link.href} en={link.en} ja={link.ja} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="closer-footer-col-title">
            <BilingualInline en="Legal" ja="法務" />
          </div>
          <ul className="closer-footer-links">
            {DIVIZERO_FOOTER_LEGAL.map((link) => (
              <li key={link.href}>
                <BilingualLink href={link.href} en={link.en} ja={link.ja} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="closer-footer-col-title">
            <BilingualInline en="Other" ja="その他" />
          </div>
          <ul className="closer-footer-links">
            {DIVIZERO_FOOTER_OTHER.map((link) => (
              <li key={link.href}>
                <BilingualLink href={link.href} en={link.en} ja={link.ja} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="closer-footer-bottom">
        <span>
          © {new Date().getFullYear()} Closer事務局 / divizero（ディビゼロ）
        </span>
        <span>運営元：Closer事務局</span>
      </div>
    </footer>
  );
}
