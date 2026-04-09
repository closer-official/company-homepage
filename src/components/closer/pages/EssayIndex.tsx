import Link from "next/link";
import { ESSAY_ENTRIES } from "@/lib/essays";

export default function EssayIndex() {
  return (
    <>
      <div className="closer-essay-index-hero">
        <span className="closer-section-label">Column</span>
        <h1 className="closer-page-hero-title">
          コラム
          <em> / 記事一覧</em>
        </h1>
        <p className="closer-page-hero-lead">
          体験や考えを、長めの文章でまとめています。記事は随時追加予定です。
        </p>
      </div>
      <div className="closer-essay-index">
        <ul className="closer-essay-index-list">
          {ESSAY_ENTRIES.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/essay/${item.slug}`}
                className="closer-essay-card"
              >
                <div className="closer-essay-card-tag">{item.categoryLabel}</div>
                <h2 className="closer-essay-card-title">{item.title}</h2>
                <p className="closer-essay-card-desc">{item.description}</p>
                <span className="closer-essay-card-arrow" aria-hidden>
                  記事を読む →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
