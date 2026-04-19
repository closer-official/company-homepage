"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import "./photo-resize.css";

type Preset = {
  id: string;
  label: string;
  desc: string;
  w: number;
  h: number;
};

const PRESETS: Preset[] = [
  {
    id: "1-1",
    label: "1 : 1（正方形）",
    desc: "1080 × 1080 px",
    w: 1080,
    h: 1080,
  },
  {
    id: "4-3",
    label: "4 : 3（横）",
    desc: "1200 × 900 px",
    w: 1200,
    h: 900,
  },
  {
    id: "3-4",
    label: "3 : 4（縦）",
    desc: "900 × 1200 px",
    w: 900,
    h: 1200,
  },
  {
    id: "16-9",
    label: "16 : 9",
    desc: "1280 × 720 px",
    w: 1280,
    h: 720,
  },
  {
    id: "4-5",
    label: "4 : 5（縦・SNS寄り）",
    desc: "960 × 1200 px",
    w: 960,
    h: 1200,
  },
  {
    id: "2-3",
    label: "2 : 3（縦・証明写真寄り）",
    desc: "800 × 1200 px",
    w: 800,
    h: 1200,
  },
];

const MIN_SIDE = 32;
const MAX_SIDE = 4096;
const PREVIEW_MAX = 400;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function clampPan(
  ox: number,
  oy: number,
  scaledW: number,
  scaledH: number,
  vw: number,
  vh: number,
) {
  const minX = Math.min(0, vw - scaledW);
  const maxX = Math.max(0, vw - scaledW);
  const minY = Math.min(0, vh - scaledH);
  const maxY = Math.max(0, vh - scaledH);
  return {
    x: clamp(ox, minX, maxX),
    y: clamp(oy, minY, maxY),
  };
}

export default function PhotoResizeTool() {
  const pathname = usePathname();
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);
  const [customW, setCustomW] = useState("800");
  const [customH, setCustomH] = useState("800");
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(
    null,
  );
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [exportFormat, setExportFormat] = useState<"jpeg" | "png">("jpeg");
  const dragRef = useRef<{
    pid: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
  } | null>(null);

  const output = useMemo(() => {
    if (presetId === "custom") {
      const w = clamp(parseInt(customW, 10) || 800, MIN_SIDE, MAX_SIDE);
      const h = clamp(parseInt(customH, 10) || 800, MIN_SIDE, MAX_SIDE);
      return { w, h };
    }
    const p = PRESETS.find((x) => x.id === presetId);
    if (!p) return { w: 1080, h: 1080 };
    return { w: p.w, h: p.h };
  }, [presetId, customW, customH]);

  const previewSize = useMemo(() => {
    const ar = output.w / output.h;
    let vw = PREVIEW_MAX;
    let vh = vw / ar;
    if (vh > PREVIEW_MAX) {
      vh = PREVIEW_MAX;
      vw = vh * ar;
    }
    return { vw: Math.round(vw), vh: Math.round(vh) };
  }, [output.w, output.h]);

  const minScale = useMemo(() => {
    if (!natural) return 1;
    return Math.max(
      previewSize.vw / natural.w,
      previewSize.vh / natural.h,
    );
  }, [natural, previewSize.vw, previewSize.vh]);

  const drawScale = minScale * zoom;

  const scaledSize = useMemo(() => {
    if (!natural) return { sw: 0, sh: 0 };
    return {
      sw: natural.w * drawScale,
      sh: natural.h * drawScale,
    };
  }, [natural, drawScale]);

  useEffect(() => {
    if (!objectUrl) {
      setNatural(null);
      return;
    }
    setNatural(null);
    const im = new Image();
    im.onload = () =>
      setNatural({ w: im.naturalWidth, h: im.naturalHeight });
    im.src = objectUrl;
  }, [objectUrl]);

  const prevLayoutRef = useRef("");

  useLayoutEffect(() => {
    if (!natural || !objectUrl) return;
    const lay = `${objectUrl}|${natural.w}x${natural.h}|${output.w}x${output.h}`;
    const layoutChanged = prevLayoutRef.current !== lay;
    if (layoutChanged) {
      prevLayoutRef.current = lay;
      setZoom(1);
      const sw = natural.w * minScale;
      const sh = natural.h * minScale;
      setOffset(
        clampPan(
          (previewSize.vw - sw) / 2,
          (previewSize.vh - sh) / 2,
          sw,
          sh,
          previewSize.vw,
          previewSize.vh,
        ),
      );
      return;
    }
    const sw = natural.w * minScale * zoom;
    const sh = natural.h * minScale * zoom;
    setOffset((o) => clampPan(o.x, o.y, sw, sh, previewSize.vw, previewSize.vh));
  }, [
    objectUrl,
    natural,
    output.w,
    output.h,
    zoom,
    minScale,
    previewSize.vw,
    previewSize.vh,
  ]);

  const onFile = useCallback((file: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    setObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!natural) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        pid: e.pointerId,
        sx: e.clientX,
        sy: e.clientY,
        ox: offset.x,
        oy: offset.y,
      };
    },
    [natural, offset.x, offset.y],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = dragRef.current;
      if (!d || d.pid !== e.pointerId || !natural) return;
      const dx = e.clientX - d.sx;
      const dy = e.clientY - d.sy;
      const sw = natural.w * drawScale;
      const sh = natural.h * drawScale;
      setOffset(
        clampPan(d.ox + dx, d.oy + dy, sw, sh, previewSize.vw, previewSize.vh),
      );
    },
    [natural, drawScale, previewSize.vw, previewSize.vh],
  );

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pid === e.pointerId) dragRef.current = null;
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!natural) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      setZoom((z) => clamp(Number((z + delta).toFixed(2)), ZOOM_MIN, ZOOM_MAX));
    },
    [natural],
  );

  const recenter = useCallback(() => {
    if (!natural) return;
    setZoom(1);
    const sw = natural.w * minScale;
    const sh = natural.h * minScale;
    setOffset(
      clampPan(
        (previewSize.vw - sw) / 2,
        (previewSize.vh - sh) / 2,
        sw,
        sh,
        previewSize.vw,
        previewSize.vh,
      ),
    );
  }, [natural, minScale, previewSize.vw, previewSize.vh]);

  const download = useCallback(() => {
    if (!objectUrl || !natural) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const k = output.w / previewSize.vw;
      const canvas = document.createElement("canvas");
      canvas.width = output.w;
      canvas.height = output.h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, output.w, output.h);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, output.w, output.h);
      ctx.clip();
      ctx.drawImage(
        img,
        0,
        0,
        natural.w,
        natural.h,
        offset.x * k,
        offset.y * k,
        natural.w * drawScale * k,
        natural.h * drawScale * k,
      );
      ctx.restore();

      const base = (fileName ?? "photo").replace(/\.[^/.]+$/, "") || "photo";
      if (exportFormat === "png") {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${base}_resized.png`;
        a.click();
      } else {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/jpeg", 0.92);
        a.download = `${base}_resized.jpg`;
        a.click();
      }
    };
    img.src = objectUrl;
  }, [
    objectUrl,
    natural,
    output.w,
    output.h,
    previewSize.vw,
    offset.x,
    offset.y,
    drawScale,
    exportFormat,
    fileName,
  ]);

  return (
    <div className="pr-shell">
      <header className="pr-hero">
        <p className="pr-hero-label">Tools / ツール</p>
        <h1>写真サイズ変更</h1>
        <p className="pr-hero-lead">
          写真をアップロードし、希望の出力サイズ（よく使う比率のプリセットまたは幅×高さの
          px）を選びます。プレビュー上でドラッグして位置を、スライダーまたはホイールで拡大・縮小して、枠内に収めてからダウンロードしてください。
        </p>
        <p className="pr-privacy">
          <strong>プライバシー：</strong>
          画像はすべてブラウザ内だけで処理され、サーバーへアップロードしません。
        </p>
        <nav className="pr-seo-links" aria-label="関連ツール">
          <Link
            href="/tools/photo-resize"
            aria-current={pathname === "/tools/photo-resize" ? "page" : undefined}
          >
            写真サイズ変更
          </Link>
          <span className="pr-sep" aria-hidden>
            ·
          </span>
          <Link href="/tools/pdf-converter">無料 PDF 変換</Link>
          <span className="pr-sep" aria-hidden>
            ·
          </span>
          <Link href="/tools/rireki">無料・履歴書をつくる</Link>
          <span className="pr-sep" aria-hidden>
            ·
          </span>
          <Link href="/tools/shokumu-keirekisho">無料・職務経歴書をつくる</Link>
          <span className="pr-sep" aria-hidden>
            ·
          </span>
          <Link href="/tools">すべてのツール</Link>
        </nav>
      </header>

      <section aria-labelledby="pr-input-title">
        <p className="pr-panel-title" id="pr-input-title">
          入力
        </p>
        <div className="pr-field">
          <label htmlFor="pr-file">写真を選択</label>
          <p className="pr-field-hint">
            JPEG / PNG / WebP / GIF など、ブラウザが読める形式。
          </p>
          <input
            id="pr-file"
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div className="pr-field">
          <span className="pr-field-hint" style={{ marginBottom: 10 }}>
            出力サイズ
          </span>
          <div className="pr-preset-grid" role="radiogroup" aria-label="出力サイズ">
            {PRESETS.map((p) => (
              <label key={p.id} className="pr-preset-opt">
                <input
                  type="radio"
                  name="pr-preset"
                  checked={presetId === p.id}
                  onChange={() => setPresetId(p.id)}
                />
                <div>
                  <strong>{p.label}</strong>
                  <span>{p.desc}</span>
                </div>
              </label>
            ))}
            <label className="pr-preset-opt">
              <input
                type="radio"
                name="pr-preset"
                checked={presetId === "custom"}
                onChange={() => setPresetId("custom")}
              />
              <div>
                <strong>幅 × 高さを指定（px）</strong>
                <span>{MIN_SIDE}〜{MAX_SIDE}px</span>
              </div>
            </label>
          </div>
          {presetId === "custom" ? (
            <div className="pr-custom-row">
              <div>
                <label htmlFor="pr-cw">幅（px）</label>
                <input
                  id="pr-cw"
                  type="number"
                  min={MIN_SIDE}
                  max={MAX_SIDE}
                  value={customW}
                  onChange={(e) => setCustomW(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pr-ch">高さ（px）</label>
                <input
                  id="pr-ch"
                  type="number"
                  min={MIN_SIDE}
                  max={MAX_SIDE}
                  value={customH}
                  onChange={(e) => setCustomH(e.target.value)}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="pr-field">
          <span id="pr-format-label">保存形式</span>
          <div
            className="pr-format-toggle"
            role="group"
            aria-labelledby="pr-format-label"
          >
            <label>
              <input
                type="radio"
                name="pr-fmt"
                checked={exportFormat === "jpeg"}
                onChange={() => setExportFormat("jpeg")}
              />
              JPEG（容量小さめ）
            </label>
            <label>
              <input
                type="radio"
                name="pr-fmt"
                checked={exportFormat === "png"}
                onChange={() => setExportFormat("png")}
              />
              PNG
            </label>
          </div>
        </div>
      </section>

      {objectUrl && natural ? (
        <section aria-labelledby="pr-preview-title">
          <p className="pr-panel-title" id="pr-preview-title">
            調整・プレビュー
          </p>
          <p className="pr-viewport-meta">
            出力：{output.w} × {output.h} px（プレビュー枠は比率だけ同じで、画面用に縮小表示しています）
          </p>
          <div className="pr-viewport-wrap">
            <div
              className="pr-viewport"
              style={{ width: previewSize.vw, height: previewSize.vh }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onWheel={onWheel}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- user file blob URL */}
              <img
                src={objectUrl}
                alt=""
                width={scaledSize.sw}
                height={scaledSize.sh}
                style={{
                  left: offset.x,
                  top: offset.y,
                  width: scaledSize.sw,
                  height: scaledSize.sh,
                }}
                draggable={false}
              />
            </div>
          </div>
          <div className="pr-zoom-row">
            <label htmlFor="pr-zoom">拡大・縮小</label>
            <input
              id="pr-zoom"
              type="range"
              min={ZOOM_MIN}
              max={ZOOM_MAX}
              step={0.02}
              value={zoom}
              onChange={(e) =>
                setZoom(clamp(parseFloat(e.target.value), ZOOM_MIN, ZOOM_MAX))
              }
            />
            <span className="pr-zoom-val">{Math.round(zoom * 100)}%</span>
          </div>
          <p className="pr-field-hint">
            枠内をドラッグして位置を変えられます。トラックパッド・マウスホイールでも拡大・縮小できます。
          </p>
          <div className="pr-actions">
            <button type="button" className="pr-btn-primary" onClick={download}>
              {exportFormat === "jpeg" ? "JPEG" : "PNG"}でダウンロード
            </button>
            <button type="button" className="pr-btn-ghost" onClick={recenter}>
              位置・倍率をリセット
            </button>
          </div>
        </section>
      ) : objectUrl ? (
        <p className="pr-field-hint">画像を読み込み中…</p>
      ) : (
        <p className="pr-field-hint">まず写真を選択してください。</p>
      )}
    </div>
  );
}
