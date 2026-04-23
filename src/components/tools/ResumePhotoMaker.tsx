"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./resume-photo-maker.css";

type BgPreset = {
  id: string;
  label: string;
  color: string;
};

const BG_PRESETS: BgPreset[] = [
  { id: "blue", label: "ブルーバック", color: "#5f8fcf" },
  { id: "light-blue", label: "薄いブルー", color: "#a9c7ea" },
  { id: "white", label: "白背景", color: "#f7f7f7" },
  { id: "gray", label: "ライトグレー", color: "#dadde2" },
];

const SIZE_PRESETS = [
  { id: "standard", label: "履歴書向け 標準 (600x800)", w: 600, h: 800 },
  { id: "hq", label: "履歴書向け 高画質 (900x1200)", w: 900, h: 1200 },
  { id: "print", label: "印刷向け 高精細 (1200x1600)", w: 1200, h: 1600 },
];

type SegmentationResult = {
  segmentationMask: CanvasImageSource;
};

type SegmentationModel = {
  setOptions(opts: { modelSelection: 0 | 1 }): void;
  onResults(cb: (results: SegmentationResult) => void): void;
  send(input: { image: HTMLImageElement }): Promise<void>;
};

function centerCropRect(srcW: number, srcH: number, targetW: number, targetH: number) {
  const srcRatio = srcW / srcH;
  const targetRatio = targetW / targetH;
  if (srcRatio > targetRatio) {
    const cropW = srcH * targetRatio;
    return { sx: (srcW - cropW) / 2, sy: 0, sw: cropW, sh: srcH };
  }
  const cropH = srcW / targetRatio;
  return { sx: 0, sy: (srcH - cropH) / 2, sw: srcW, sh: cropH };
}

export default function ResumePhotoMaker() {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [bgId, setBgId] = useState(BG_PRESETS[0].id);
  const [sizeId, setSizeId] = useState(SIZE_PRESETS[1].id);
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [isModelReady, setIsModelReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceName, setSourceName] = useState("resume-photo");

  const modelRef = useRef<SegmentationModel | null>(null);
  const pendingResolveRef = useRef<((r: SegmentationResult) => void) | null>(null);

  const selectedBg = useMemo(
    () => BG_PRESETS.find((b) => b.id === bgId) ?? BG_PRESETS[0],
    [bgId],
  );
  const selectedSize = useMemo(
    () => SIZE_PRESETS.find((s) => s.id === sizeId) ?? SIZE_PRESETS[1],
    [sizeId],
  );

  useEffect(() => {
    let cancelled = false;
    async function bootModel() {
      try {
        const mp = await import("@mediapipe/selfie_segmentation");
        if (cancelled) return;
        const model = new mp.SelfieSegmentation({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
        }) as unknown as SegmentationModel;
        model.setOptions({ modelSelection: 1 });
        model.onResults((results) => {
          pendingResolveRef.current?.(results);
          pendingResolveRef.current = null;
        });
        modelRef.current = model;
        setIsModelReady(true);
      } catch {
        setError("背景処理モデルの読み込みに失敗しました。再読み込みしてもう一度お試しください。");
      }
    }
    void bootModel();
    return () => {
      cancelled = true;
      pendingResolveRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [objectUrl, resultUrl]);

  async function createResult() {
    if (!objectUrl) return;
    if (!modelRef.current) {
      setError("背景処理モデルの準備中です。数秒後にもう一度お試しください。");
      return;
    }
    setError(null);
    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = objectUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("読み込み失敗"));
      });

      const results = await new Promise<SegmentationResult>((resolve, reject) => {
        pendingResolveRef.current = resolve;
        modelRef.current
          ?.send({ image: img })
          .catch(() => reject(new Error("推論失敗")));
      });

      const out = document.createElement("canvas");
      out.width = selectedSize.w;
      out.height = selectedSize.h;
      const outCtx = out.getContext("2d");
      if (!outCtx) throw new Error("canvas unavailable");

      const fg = document.createElement("canvas");
      fg.width = selectedSize.w;
      fg.height = selectedSize.h;
      const fgCtx = fg.getContext("2d");
      if (!fgCtx) throw new Error("canvas unavailable");

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = img.naturalWidth;
      maskCanvas.height = img.naturalHeight;
      const maskCtx = maskCanvas.getContext("2d");
      if (!maskCtx) throw new Error("canvas unavailable");
      maskCtx.drawImage(results.segmentationMask, 0, 0, img.naturalWidth, img.naturalHeight);

      const crop = centerCropRect(
        img.naturalWidth,
        img.naturalHeight,
        selectedSize.w,
        selectedSize.h,
      );

      fgCtx.drawImage(
        img,
        crop.sx,
        crop.sy,
        crop.sw,
        crop.sh,
        0,
        0,
        selectedSize.w,
        selectedSize.h,
      );
      fgCtx.globalCompositeOperation = "destination-in";
      fgCtx.drawImage(
        maskCanvas,
        crop.sx,
        crop.sy,
        crop.sw,
        crop.sh,
        0,
        0,
        selectedSize.w,
        selectedSize.h,
      );
      fgCtx.globalCompositeOperation = "source-over";

      outCtx.fillStyle = selectedBg.color;
      outCtx.fillRect(0, 0, selectedSize.w, selectedSize.h);
      outCtx.drawImage(fg, 0, 0);

      const mime = format === "png" ? "image/png" : "image/jpeg";
      const quality = format === "png" ? 1 : 0.95;
      const dataUrl = out.toDataURL(mime, quality);

      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(dataUrl);
    } catch {
      setError("画像処理に失敗しました。別の写真で再度お試しください。");
    } finally {
      setIsProcessing(false);
    }
  }

  function onPickFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("画像ファイル（JPEG / PNG / WebP）を選択してください。");
      return;
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setError(null);
    const newUrl = URL.createObjectURL(file);
    setObjectUrl(newUrl);
    const dot = file.name.lastIndexOf(".");
    setSourceName(dot > 0 ? file.name.slice(0, dot) : file.name);
  }

  function downloadResult() {
    if (!resultUrl) return;
    const ext = format === "png" ? "png" : "jpg";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${sourceName}-resume-${selectedSize.w}x${selectedSize.h}.${ext}`;
    a.click();
  }

  return (
    <div className="rpm-shell">
      <header className="rpm-hero">
        <p className="rpm-label">Tool / 履歴書写真</p>
        <h1>履歴書写真メーカー（背景差し替え）</h1>
        <p className="rpm-lead">
          写真をアップロードすると、人物の背景をブルーバック・白背景へ差し替えて履歴書向け比率で書き出します。処理はブラウザ内で完結します。
        </p>
      </header>

      <section className="rpm-card">
        <label className="rpm-file">
          写真を選択
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="rpm-grid">
          <label>
            背景色
            <select value={bgId} onChange={(e) => setBgId(e.target.value)}>
              {BG_PRESETS.map((bg) => (
                <option key={bg.id} value={bg.id}>
                  {bg.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            出力サイズ
            <select value={sizeId} onChange={(e) => setSizeId(e.target.value)}>
              {SIZE_PRESETS.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            形式
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "jpeg" | "png")}
            >
              <option value="jpeg">JPEG（推奨）</option>
              <option value="png">PNG</option>
            </select>
          </label>
        </div>

        <div className="rpm-actions">
          <button
            type="button"
            className="rpm-primary"
            disabled={!objectUrl || !isModelReady || isProcessing}
            onClick={() => void createResult()}
          >
            {isProcessing ? "処理中..." : "背景を差し替えて作成"}
          </button>
          <button
            type="button"
            className="rpm-ghost"
            disabled={!resultUrl}
            onClick={downloadResult}
          >
            ダウンロード
          </button>
        </div>

        <p className="rpm-note">
          {!isModelReady
            ? "背景処理モデルを読み込み中です..."
            : "履歴書向けの比率（3:4）で書き出します。"}
        </p>
        {error ? <p className="rpm-error">{error}</p> : null}
      </section>

      <section className="rpm-preview-grid">
        <article className="rpm-preview-card">
          <h2>元画像</h2>
          <div className="rpm-preview-box">
            {objectUrl ? <img src={objectUrl} alt="元画像" /> : <span>未選択</span>}
          </div>
        </article>
        <article className="rpm-preview-card">
          <h2>処理後プレビュー</h2>
          <div className="rpm-preview-box">
            {resultUrl ? <img src={resultUrl} alt="処理後画像" /> : <span>未作成</span>}
          </div>
        </article>
      </section>
    </div>
  );
}

