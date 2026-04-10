"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import "./pdf-converter.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type ConvertFile = {
  id: string;
  file: File;
  previewUrl: string | null;
  status: "idle" | "converting" | "done" | "error";
  errorMsg?: string;
};

type HistoryEntry = {
  id: string;
  filename: string;
  fileCount: number;
  createdAt: number; // epoch ms
  pdfDataUrl: string; // base64 data URL
};

const FREE_LIMIT = 1;
const PAID_LIMIT = 20;
const HISTORY_STORAGE_KEY = "divisero_pdf_history";
const PLAN_STORAGE_KEY = "divisero_pdf_plan"; // "free" | "paid"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function formatDate(epoch: number) {
  return new Date(epoch).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns true if the file is a supported image type */
function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

/** Load image file as HTMLImageElement */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Convert an array of image files → single PDF data URL using jsPDF */
async function imagesToPdfDataUrl(files: File[]): Promise<string> {
  const { jsPDF } = await import("jspdf");

  // Read all files as data URLs
  const dataUrls = await Promise.all(
    files.map(
      (f) =>
        new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(f);
        }),
    ),
  );

  let pdf: InstanceType<typeof jsPDF> | null = null;

  for (let i = 0; i < dataUrls.length; i++) {
    const img = await loadImage(dataUrls[i]);
    const landscape = img.naturalWidth > img.naturalHeight;
    const format = "a4";

    if (i === 0) {
      pdf = new jsPDF({
        orientation: landscape ? "landscape" : "portrait",
        unit: "mm",
        format,
      });
    } else {
      pdf!.addPage(format, landscape ? "landscape" : "portrait");
    }

    const pw = pdf!.internal.pageSize.getWidth();
    const ph = pdf!.internal.pageSize.getHeight();
    const ratio = Math.min(pw / img.naturalWidth, ph / img.naturalHeight);
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;
    const x = (pw - w) / 2;
    const y = (ph - h) / 2;

    const mimeType = files[i].type === "image/png" ? "PNG" : "JPEG";
    pdf!.addImage(dataUrls[i], mimeType, x, y, w, h);
  }

  return pdf!.output("datauristring");
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

// ─── Local storage helpers ────────────────────────────────────────────────────

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // QuotaExceededError — silently skip
  }
}

function loadPlan(): "free" | "paid" {
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    return raw === "paid" ? "paid" : "free";
  } catch {
    return "free";
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PdfConverterTool() {
  const [plan, setPlan] = useState<"free" | "paid">("free");
  const [files, setFiles] = useState<ConvertFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);
  const [resultFilename, setResultFilename] = useState("converted.pdf");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [tab, setTab] = useState<"convert" | "history">("convert");
  const [dragOver, setDragOver] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const limit = plan === "paid" ? PAID_LIMIT : FREE_LIMIT;

  useEffect(() => {
    setPlan(loadPlan());
    setHistory(loadHistory());
  }, []);

  // ── File management ──────────────────────────────────────────────────────

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming).filter(isImageFile);
      if (arr.length === 0) {
        window.alert(
          "対応形式: JPEG / PNG / WebP / GIF / BMP などの画像ファイルを追加してください。",
        );
        return;
      }
      setFiles((prev) => {
        const combined = [...prev, ...arr.map((f) => ({ id: uid(), file: f, previewUrl: null, status: "idle" as const }))];
        if (combined.length > limit) {
          const planLabel = plan === "free" ? "無料プラン" : "有料プラン";
          const limitNum = plan === "free" ? FREE_LIMIT : PAID_LIMIT;
          window.alert(
            `${planLabel}では一度に最大 ${limitNum} ファイルまでです。\n先頭 ${limitNum} ファイルのみ追加しました。`,
          );
          return combined.slice(0, limit);
        }
        return combined;
      });
      // Generate previews
      arr.forEach((f) => {
        const url = URL.createObjectURL(f);
        setFiles((prev) =>
          prev.map((item) =>
            item.file === f ? { ...item, previewUrl: url } : item,
          ),
        );
      });
    },
    [limit, plan],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); });
      return [];
    });
    setResultDataUrl(null);
  }, []);

  // ── Conversion ───────────────────────────────────────────────────────────

  const convert = useCallback(async () => {
    if (files.length === 0) return;
    setConverting(true);
    setResultDataUrl(null);

    try {
      const imageFiles = files.map((f) => f.file);
      const dataUrl = await imagesToPdfDataUrl(imageFiles);
      const fname =
        files.length === 1
          ? files[0].file.name.replace(/\.[^/.]+$/, "") + ".pdf"
          : "converted.pdf";
      setResultDataUrl(dataUrl);
      setResultFilename(fname);

      // Save to history (paid plan only)
      if (plan === "paid") {
        const entry: HistoryEntry = {
          id: uid(),
          filename: fname,
          fileCount: files.length,
          createdAt: Date.now(),
          pdfDataUrl: dataUrl,
        };
        setHistory((prev) => {
          const next = [entry, ...prev].slice(0, 50); // keep last 50
          saveHistory(next);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
      window.alert("変換に失敗しました。別ブラウザでお試しください。");
    } finally {
      setConverting(false);
    }
  }, [files, plan]);

  // ── Drag & drop ──────────────────────────────────────────────────────────

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => setDragOver(false), []);

  // ── Plan management ──────────────────────────────────────────────────────

  const upgradeFlow = useCallback(() => {
    setShowPlanModal(true);
  }, []);

  // Demo toggle (remove in production — real upgrade goes through Stripe)
  const activatePaidDemo = useCallback(() => {
    localStorage.setItem(PLAN_STORAGE_KEY, "paid");
    setPlan("paid");
    setShowPlanModal(false);
  }, []);

  const downgradeToFree = useCallback(() => {
    localStorage.setItem(PLAN_STORAGE_KEY, "free");
    setPlan("free");
  }, []);

  const deleteHistoryEntry = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((h) => h.id !== id);
      saveHistory(next);
      return next;
    });
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="pc-shell">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="pc-hero">
        <p className="pc-hero-label">Tools / ツール</p>
        <h1>無料 PDF 変換ツール</h1>
        <p className="pc-hero-lead">
          画像ファイル（JPEG・PNG・WebP など）をブラウザ上で PDF に変換してダウンロード。
          無料プランでは 1 ファイルずつ変換できます。有料プランでは最大 20
          ファイルを一括変換＆過去の PDF を見返せます。
        </p>
        <p className="pc-privacy">
          <strong>プライバシー：</strong>
          ファイルはすべてブラウザ内で処理されます。サーバーへの送信・保存は行いません。
        </p>

        {/* ── Nav links ──────────────────────────────────────────────── */}
        <nav className="pc-seo-links" aria-label="関連ツール">
          <Link href="/tools/pdf-converter" aria-current="page">
            無料 PDF 変換
          </Link>
          <span className="pc-sep" aria-hidden>·</span>
          <Link href="/tools/rireki">無料・履歴書をつくる</Link>
          <span className="pc-sep" aria-hidden>·</span>
          <Link href="/tools/shokumu-keirekisho">無料・職務経歴書をつくる</Link>
          <span className="pc-sep" aria-hidden>·</span>
          <Link href="/tools">すべてのツール</Link>
        </nav>

        {/* ── Plan badge ─────────────────────────────────────────────── */}
        <div className="pc-plan-row">
          <span className={`pc-plan-badge ${plan}`}>
            {plan === "paid" ? "有料プラン（月額 ¥300）" : "無料プラン"}
          </span>
          {plan === "free" ? (
            <button type="button" className="pc-btn-upgrade" onClick={upgradeFlow}>
              有料プランにアップグレード
            </button>
          ) : (
            <button type="button" className="pc-btn-ghost" onClick={downgradeToFree}>
              無料プランに戻す
            </button>
          )}
        </div>
      </header>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      {plan === "paid" && (
        <div className="pc-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "convert"}
            className={`pc-tab${tab === "convert" ? " active" : ""}`}
            onClick={() => setTab("convert")}
          >
            変換する
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "history"}
            className={`pc-tab${tab === "history" ? " active" : ""}`}
            onClick={() => setTab("history")}
          >
            変換履歴
            {history.length > 0 && (
              <span className="pc-tab-count">{history.length}</span>
            )}
          </button>
        </div>
      )}

      {/* ── Convert tab ──────────────────────────────────────────────── */}
      {tab === "convert" && (
        <div className="pc-workspace">
          {/* Drop zone */}
          <div
            className={`pc-dropzone${dragOver ? " drag-over" : ""}${files.length > 0 ? " has-files" : ""}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => files.length === 0 && fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="ファイルをドロップするかクリックして選択"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
          >
            {files.length === 0 ? (
              <div className="pc-dropzone-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="pc-dropzone-title">
                  ここにファイルをドロップ
                  <span>または クリックして選択</span>
                </p>
                <p className="pc-dropzone-hint">
                  対応形式：JPEG / PNG / WebP / GIF / BMP
                  {plan === "free"
                    ? "　｜　無料プランは 1 ファイルずつ"
                    : `　｜　有料プランは最大 ${PAID_LIMIT} ファイル一括`}
                </p>
              </div>
            ) : (
              <div className="pc-file-grid">
                {files.map((item) => (
                  <div key={item.id} className="pc-file-card">
                    {item.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className="pc-file-thumb"
                      />
                    ) : (
                      <div className="pc-file-thumb pc-file-thumb--placeholder" />
                    )}
                    <div className="pc-file-info">
                      <span className="pc-file-name" title={item.file.name}>
                        {item.file.name}
                      </span>
                      <span className="pc-file-size">{formatSize(item.file.size)}</span>
                    </div>
                    <button
                      type="button"
                      className="pc-file-remove"
                      aria-label={`${item.file.name} を削除`}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(item.id);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={plan === "paid"}
            className="pc-file-input-hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />

          {/* Actions */}
          <div className="pc-actions">
            {files.length === 0 ? (
              <button
                type="button"
                className="pc-btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                ファイルを選択
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="pc-btn-primary"
                  onClick={convert}
                  disabled={converting}
                >
                  {converting ? "変換中…" : `PDF に変換（${files.length} ファイル）`}
                </button>
                {plan === "paid" && files.length < PAID_LIMIT && (
                  <button
                    type="button"
                    className="pc-btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    ＋ ファイルを追加
                  </button>
                )}
                <button
                  type="button"
                  className="pc-btn-ghost"
                  onClick={clearAll}
                  disabled={converting}
                >
                  クリア
                </button>
              </>
            )}
          </div>

          {/* Result */}
          {resultDataUrl && (
            <div className="pc-result">
              <div className="pc-result-inner">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <p className="pc-result-title">変換完了</p>
                  <p className="pc-result-file">{resultFilename}</p>
                </div>
                <button
                  type="button"
                  className="pc-btn-download"
                  onClick={() => triggerDownload(resultDataUrl, resultFilename)}
                >
                  ダウンロード
                </button>
              </div>
            </div>
          )}

          {/* Upsell (free plan) */}
          {plan === "free" && (
            <div className="pc-upsell">
              <div className="pc-upsell-inner">
                <p className="pc-upsell-title">有料プランでできること</p>
                <ul className="pc-upsell-list">
                  <li>最大 20 ファイルを一括 PDF 変換</li>
                  <li>変換した PDF の履歴を保存・再ダウンロード</li>
                  <li>複数の画像を 1 つの PDF にまとめる</li>
                </ul>
                <p className="pc-upsell-price">月額 ¥300（税込）— Stripe で安全に決済</p>
                <button type="button" className="pc-btn-upgrade" onClick={upgradeFlow}>
                  アップグレードする
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── History tab (paid only) ───────────────────────────────────── */}
      {tab === "history" && plan === "paid" && (
        <div className="pc-history">
          {history.length === 0 ? (
            <p className="pc-history-empty">
              まだ変換履歴がありません。「変換する」タブからファイルをPDFに変換すると、ここに表示されます。
            </p>
          ) : (
            <ul className="pc-history-list">
              {history.map((h) => (
                <li key={h.id} className="pc-history-item">
                  <div className="pc-history-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="pc-history-info">
                    <p className="pc-history-name">{h.filename}</p>
                    <p className="pc-history-meta">
                      {formatDate(h.createdAt)} · {h.fileCount} ファイル
                    </p>
                  </div>
                  <div className="pc-history-actions">
                    <button
                      type="button"
                      className="pc-btn-secondary"
                      onClick={() => triggerDownload(h.pdfDataUrl, h.filename)}
                    >
                      再ダウンロード
                    </button>
                    <button
                      type="button"
                      className="pc-btn-ghost"
                      onClick={() => deleteHistoryEntry(h.id)}
                      aria-label="削除"
                    >
                      削除
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Plan upgrade modal ────────────────────────────────────────── */}
      {showPlanModal && (
        <div
          className="pc-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPlanModal(false);
          }}
        >
          <div className="pc-modal" role="dialog" aria-modal aria-label="有料プランへのアップグレード">
            <button
              type="button"
              className="pc-modal-close"
              onClick={() => setShowPlanModal(false)}
              aria-label="閉じる"
            >
              ✕
            </button>
            <p className="pc-modal-label">Upgrade</p>
            <h2 className="pc-modal-title">有料プラン — 月額 ¥300</h2>
            <ul className="pc-modal-features">
              <li>最大 20 ファイルを一括 PDF 変換</li>
              <li>変換履歴を保存・再ダウンロード</li>
              <li>複数画像を 1 つの PDF にまとめる</li>
              <li>優先サポート</li>
            </ul>
            <p className="pc-modal-note">
              Stripe（クレジットカード・Apple Pay・Google Pay）で安全に決済。いつでもキャンセル可能。
            </p>
            {/* Stripe checkout: replace href with your actual Stripe Payment Link */}
            <a
              href="/api/stripe/checkout"
              className="pc-btn-primary pc-btn-block"
              onClick={(e) => {
                // In demo mode, activate paid without Stripe
                e.preventDefault();
                activatePaidDemo();
              }}
            >
              月額 ¥300 でアップグレード（Stripe 決済）
            </a>
            <p className="pc-modal-demo-note">
              ※ 現在デモモードです。実際の決済は設定後に有効になります。
            </p>
          </div>
        </div>
      )}

      {/* ── SEO article ──────────────────────────────────────────────── */}
      <section className="pc-seo-article">
        <h2>無料 PDF 変換ツールについて</h2>
        <p>
          ディビゼロの PDF 変換ツールは、画像ファイルをブラウザ上で直接 PDF
          に変換できる無料サービスです。インストール不要で、スマホ・パソコンを問わず使えます。
        </p>
        <h3>大学生・就活生におすすめ</h3>
        <p>
          履歴書・証明書・レポートの PDF
          化に。スキャンした書類の画像をまとめて 1 つの PDF
          にできます。Gmailや就活サイトへの提出にも最適です。
        </p>
        <h3>対応ファイル形式</h3>
        <p>
          JPEG・PNG・WebP・GIF・BMP など主要な画像形式に対応。複数の画像を選択すると、1
          ページずつ並べた PDF を生成します。
        </p>
        <h3>プライバシーについて</h3>
        <p>
          ファイルはすべてお使いの端末（ブラウザ）内で処理されます。サーバーへのアップロードや外部への送信は一切行いません。
        </p>
      </section>
    </div>
  );
}
