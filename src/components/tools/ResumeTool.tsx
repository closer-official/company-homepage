"use client";

import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import ResumeDoc from "./ResumeDoc";
import "./resume-tool.css";
import {
  CAREER_TEMPLATE_OPTIONS,
  RESUME_TEMPLATE_OPTIONS,
  emptyCareerBlock,
  initialFormData,
  type CareerBlock,
  type ResumeFormData,
} from "./resume-tool-types";

const CAREER_FIELD_DEFS: {
  key: keyof CareerBlock;
  label: string;
  rows?: number;
}[] = [
  { key: "company", label: "勤務先名" },
  { key: "period", label: "在籍期間" },
  { key: "employmentType", label: "雇用形態" },
  { key: "businessDesc", label: "事業内容", rows: 2 },
  { key: "duties", label: "担当業務", rows: 3 },
  { key: "roleTitle", label: "役職・役割" },
  { key: "achievements", label: "実績", rows: 3 },
  { key: "improvements", label: "工夫したこと", rows: 2 },
  { key: "tools", label: "使用ツール・スキル", rows: 2 },
  { key: "selfPr", label: "自己PR", rows: 3 },
  { key: "awards", label: "表彰歴", rows: 2 },
  { key: "numericResults", label: "数字成果", rows: 2 },
  { key: "mgmtCount", label: "マネジメント人数" },
  { key: "customerCases", label: "顧客対応件数" },
  { key: "processImprovement", label: "改善した業務フロー", rows: 2 },
  { key: "jobStrength", label: "志望職種に合わせた強み", rows: 2 },
];

export default function ResumeTool() {
  const [data, setData] = useState<ResumeFormData>(initialFormData);
  const [exporting, setExporting] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const setBase = useCallback(
    (key: keyof ResumeFormData["base"], value: string) => {
      setData((d) => ({
        ...d,
        base: { ...d.base, [key]: value },
      }));
    },
    [],
  );

  const patchBlock = useCallback((index: number, patch: Partial<CareerBlock>) => {
    setData((d) => ({
      ...d,
      careerBlocks: d.careerBlocks.map((b, i) =>
        i === index ? { ...b, ...patch } : b,
      ),
    }));
  }, []);

  const addBlock = useCallback(() => {
    setData((d) => ({
      ...d,
      careerBlocks: [...d.careerBlocks, emptyCareerBlock()],
    }));
  }, []);

  const removeBlock = useCallback((index: number) => {
    setData((d) => ({
      ...d,
      careerBlocks:
        d.careerBlocks.length <= 1
          ? d.careerBlocks
          : d.careerBlocks.filter((_, i) => i !== index),
    }));
  }, []);

  const onPhotoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      if (!f.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const r = reader.result;
        if (typeof r === "string") setBase("photoDataUrl", r);
      };
      reader.readAsDataURL(f);
    },
    [setBase],
  );

  const clearPhoto = useCallback(() => setBase("photoDataUrl", ""), [setBase]);

  const resetAll = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("入力内容をすべて消去します。よろしいですか？")
    ) {
      return;
    }
    setData(initialFormData());
  }, []);

  const downloadPng = useCallback(async () => {
    const el = captureRef.current;
    if (!el) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download =
        data.docMode === "resume" ? "履歴書_preview.png" : "職務経歴書_preview.png";
      a.click();
    } catch (err) {
      console.error(err);
      window.alert(
        "画像の生成に失敗しました。別ブラウザでお試しください。",
      );
    } finally {
      setExporting(false);
    }
  }, [data.docMode]);

  return (
    <div className="rt-shell">
      <header className="rt-hero">
        <p className="rt-hero-label">Tools / ツール</p>
        <h1>履歴書・職務経歴書ビルダー</h1>
        <p className="rt-hero-lead">
          職務経歴書や履歴書のひな型を選び、入力した内容をその場でプレビュー。PNG
          としてダウンロードしたり、スクショ用にご利用いただけます。
        </p>
        <p className="rt-privacy">
          <strong>プライバシー：</strong>
          入力内容・写真はすべてお使いのブラウザ内だけで処理され、サーバーへの送信や保存は行いません。タブを閉じると消えます。
        </p>
      </header>

      <div className="rt-workspace">
        <div className="rt-form-panel">
          <p className="rt-panel-title">入力</p>

          <div className="rt-mode-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={data.docMode === "resume"}
              className={`rt-mode-tab${data.docMode === "resume" ? " active" : ""}`}
              onClick={() => setData((d) => ({ ...d, docMode: "resume" }))}
            >
              履歴書
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={data.docMode === "career"}
              className={`rt-mode-tab${data.docMode === "career" ? " active" : ""}`}
              onClick={() => setData((d) => ({ ...d, docMode: "career" }))}
            >
              職務経歴書
            </button>
          </div>

          <div className="rt-template-grid">
            {(data.docMode === "resume"
              ? RESUME_TEMPLATE_OPTIONS
              : CAREER_TEMPLATE_OPTIONS
            ).map((opt) => (
              <label key={opt.id} className="rt-template-opt">
                <input
                  type="radio"
                  name="tpl"
                  checked={
                    data.docMode === "resume"
                      ? data.resumeTemplate === opt.id
                      : data.careerTemplate === opt.id
                  }
                  onChange={() =>
                    setData((d) =>
                      d.docMode === "resume"
                        ? { ...d, resumeTemplate: opt.id as typeof d.resumeTemplate }
                        : { ...d, careerTemplate: opt.id as typeof d.careerTemplate },
                    )
                  }
                />
                <div>
                  <strong>{opt.label}</strong>
                  <span>{opt.desc}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="rt-field-group">
            <h3>基本情報</h3>
            <div className="rt-field">
              <label htmlFor="rt-name">氏名</label>
              <input
                id="rt-name"
                type="text"
                value={data.base.name}
                onChange={(e) => setBase("name", e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="rt-field">
              <label htmlFor="rt-addr">住所</label>
              <textarea
                id="rt-addr"
                value={data.base.address}
                onChange={(e) => setBase("address", e.target.value)}
                rows={2}
                autoComplete="street-address"
              />
            </div>
            <div className="rt-field">
              <label htmlFor="rt-tel">電話番号</label>
              <input
                id="rt-tel"
                type="tel"
                value={data.base.phone}
                onChange={(e) => setBase("phone", e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div className="rt-field">
              <label htmlFor="rt-mail">メールアドレス</label>
              <input
                id="rt-mail"
                type="email"
                value={data.base.email}
                onChange={(e) => setBase("email", e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="rt-field">
              <label htmlFor="rt-birth">生年月日</label>
              <input
                id="rt-birth"
                type="text"
                placeholder="例：1990年4月1日"
                value={data.base.birthDate}
                onChange={(e) => setBase("birthDate", e.target.value)}
              />
            </div>
            <div className="rt-field">
              <label htmlFor="rt-photo">写真（任意・履歴書テンプレでは枠に表示）</label>
              <input
                id="rt-photo"
                type="file"
                accept="image/*"
                onChange={onPhotoChange}
              />
              {data.base.photoDataUrl ? (
                <button
                  type="button"
                  className="rt-btn-ghost"
                  style={{ marginTop: 8 }}
                  onClick={clearPhoto}
                >
                  写真を削除
                </button>
              ) : null}
            </div>
          </div>

          {data.docMode === "career" ? (
            <>
              <div className="rt-field">
                <label className="rt-check">
                  <input
                    type="checkbox"
                    checked={data.careerShowPhoto}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        careerShowPhoto: e.target.checked,
                      }))
                    }
                  />
                  職務経歴書プレビューにも写真を表示する
                </label>
              </div>
              <div className="rt-field-group">
                <h3>職務要約</h3>
                <div className="rt-field">
                  <textarea
                    value={data.careerSummary}
                    onChange={(e) =>
                      setData((d) => ({ ...d, careerSummary: e.target.value }))
                    }
                    rows={5}
                    placeholder="キャリアの要約を記入"
                  />
                </div>
              </div>
              {data.careerBlocks.map((block, i) => (
                <div key={i} className="rt-block-card">
                  <div className="rt-block-head">
                    <span>勤務先ブロック {i + 1}</span>
                    <button
                      type="button"
                      className="rt-btn-danger"
                      onClick={() => removeBlock(i)}
                      disabled={data.careerBlocks.length <= 1}
                    >
                      削除
                    </button>
                  </div>
                  {CAREER_FIELD_DEFS.map(({ key, label, rows }) => (
                    <div key={key} className="rt-field">
                      <label htmlFor={`rt-${i}-${key}`}>{label}</label>
                      {rows ? (
                        <textarea
                          id={`rt-${i}-${key}`}
                          value={block[key]}
                          onChange={(e) => patchBlock(i, { [key]: e.target.value })}
                          rows={rows}
                        />
                      ) : (
                        <input
                          id={`rt-${i}-${key}`}
                          type="text"
                          value={block[key]}
                          onChange={(e) => patchBlock(i, { [key]: e.target.value })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <button type="button" className="rt-btn-secondary" onClick={addBlock}>
                ＋ 勤務先を追加
              </button>
            </>
          ) : null}

          <div style={{ marginTop: 28 }}>
            <button type="button" className="rt-btn-secondary" onClick={resetAll}>
              入力をすべてクリア
            </button>
          </div>
        </div>

        <div className="rt-preview-panel">
          <p className="rt-panel-title">プレビュー（この枠を画像化します）</p>
          <div className="rt-preview-toolbar">
            <button
              type="button"
              className="rt-btn-primary"
              onClick={downloadPng}
              disabled={exporting}
            >
              {exporting ? "生成中…" : "PNGでダウンロード（無料）"}
            </button>
          </div>
          <div className="rt-preview-scroll">
            <ResumeDoc ref={captureRef} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
