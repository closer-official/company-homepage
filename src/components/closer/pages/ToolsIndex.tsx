import Link from "next/link";

type ToolEntry = {
  href: string;
  tag: string;
  title: string;
  description: string;
  badge?: string;
};

const TOOL_ENTRIES: ToolEntry[] = [
  {
    href: "/tools/entry-sheet",
    tag: "Tool / ES",
    title: "エントリーシート作成ツール",
    description:
      "画像の帳票に近いレイアウトでESを作成。AI向け入力指示文と一括流し込み欄を用意し、通常入力で微調整してPNG/PDF保存できます。",
    badge: "無料",
  },
  {
    href: "/tools/pdf-converter",
    tag: "Tool / PDF変換",
    title: "無料 PDF 変換",
    description:
      "画像（JPEG・PNG・WebP など）をブラウザ上でそのままPDFに変換してダウンロード。インストール不要・個人情報の送信なし。有料プラン（月額¥300）で最大20ファイル一括変換＆変換履歴の保存も。",
    badge: "無料",
  },
  {
    href: "/tools/photo-resize",
    tag: "Tool / 画像",
    title: "無料・写真サイズ変更",
    description:
      "写真をアップロードし、比率プリセットまたは幅×高さ（px）で出力サイズを指定。ドラッグとズームで枠内に合わせ、JPEG・PNGでダウンロード。ブラウザ内のみで処理。",
    badge: "無料",
  },
  {
    href: "/tools/resume-photo-maker",
    tag: "Tool / 履歴書写真",
    title: "履歴書写真メーカー",
    description:
      "写真の背景を履歴書向けに差し替え（ブルーバック・白背景）。人物を抽出して3:4比率で高画質出力。ブラウザ内処理で個人情報の送信なし。",
    badge: "無料",
  },
  {
    href: "/tools/rireki",
    tag: "Tool / 履歴書",
    title: "無料 履歴書ビルダー",
    description:
      "履歴書テンプレートを選んでブラウザ上で編集、PNG・PDFでダウンロード。一般履歴書・写真左・シンプル縦型など複数テンプレ対応。個人情報はサーバーに保存しません。",
    badge: "無料",
  },
  {
    href: "/tools/shokumu-keirekisho",
    tag: "Tool / 職務経歴書",
    title: "無料 職務経歴書ビルダー",
    description:
      "職務経歴書をブラウザ上で無料作成。勤務先・担当業務・実績・自己PRを入力して、PNG・PDFでダウンロード。飲食アルバイト向け例文つき。",
    badge: "無料",
  },
];

export default function ToolsIndex() {
  return (
    <>
      <div className="closer-essay-index-hero">
        <span className="closer-section-label">Tools</span>
        <h1 className="closer-page-hero-title">
          ツール
          <em> / 一覧</em>
        </h1>
        <p className="closer-page-hero-lead">
          ブラウザ上で使える無料ツールです。PDF変換・履歴書・職務経歴書の作成など、個人情報をサーバーに送らずに利用できます。
        </p>
      </div>
      <div className="closer-essay-index">
        <ul className="closer-essay-index-list">
          {TOOL_ENTRIES.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="closer-essay-card">
                <div className="closer-essay-card-tag">
                  {item.tag}
                  {item.badge ? (
                    <span className="closer-tool-badge">{item.badge}</span>
                  ) : null}
                </div>
                <h2 className="closer-essay-card-title">{item.title}</h2>
                <p className="closer-essay-card-desc">{item.description}</p>
                <span className="closer-essay-card-arrow" aria-hidden>
                  ツールを使う →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
