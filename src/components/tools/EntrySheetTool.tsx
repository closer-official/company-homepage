"use client";

import { useMemo, useRef, useState } from "react";
import {
  capturePreviewToCanvas,
  downloadCanvasAsPdf,
  downloadDataUrlPng,
} from "./resume-export";
import "./entry-sheet-tool.css";

type EntrySheetData = {
  furigana: string;
  name: string;
  birthDate: string;
  email: string;
  address: string;
  tel: string;
  mobile: string;
  restAddress: string;
  restTel: string;
  restMobile: string;
  educationRows: { period: string; school: string }[];
  seminarName: string;
  professorName: string;
  seminarTheme: string;
  hobby: string;
  circle: string;
  certificates: string;
  partTime: string;
  studyAbroad: string;
  toeic: string;
  toefl: string;
  gakuchika: string;
  strength: string;
  weakness: string;
  whyCompany: string;
  photoDataUrl: string;
};

type EntrySheetScalarKey = Exclude<keyof EntrySheetData, "educationRows">;

const INITIAL_DATA: EntrySheetData = {
  furigana: "",
  name: "",
  birthDate: "",
  email: "",
  address: "",
  tel: "",
  mobile: "",
  restAddress: "",
  restTel: "",
  restMobile: "",
  educationRows: Array.from({ length: 4 }, () => ({ period: "", school: "" })),
  seminarName: "",
  professorName: "",
  seminarTheme: "",
  hobby: "",
  circle: "",
  certificates: "",
  partTime: "",
  studyAbroad: "",
  toeic: "",
  toefl: "",
  gakuchika: "",
  strength: "",
  weakness: "",
  whyCompany: "",
  photoDataUrl: "",
};

const AI_PROMPT_TEMPLATE = `以下の「入力フォーマット」に沿って、エントリーシート記入用テキストを作ってください。
JSONではなく、必ずプレーンテキストで出力してください。
見出し名・キー名は変更しないでください。
未記入項目は空欄のままで構いません。

【入力フォーマット】
フリガナ：
氏名：
生年月日：
E-mail：
現住所：
TEL：
携帯電話：
休暇中連絡先：
休暇中TEL：
休暇中携帯電話：

学歴1期間：
学歴1学校名：
学歴2期間：
学歴2学校名：
学歴3期間：
学歴3学校名：
学歴4期間：
学歴4学校名：

ゼミ・研究室名：
担当教授名：
ゼミ・研究テーマ：
趣味・特技：
クラブ・サークル：
保有資格：
アルバイト：
留学・海外在住経験：
TOEIC：
TOEFL：

学生時代に頑張ったこと：
長所：
短所：
この会社を選んだ理由：`;

function clean(s: string): string {
  return s.replace(/\r/g, "").trim();
}

function parseBulkText(raw: string): Partial<EntrySheetData> {
  const text = clean(raw);
  if (!text) return {};

  const out: Partial<EntrySheetData> = {};
  const lines = text.split("\n");
  const singleMap: Record<string, EntrySheetScalarKey> = {
    フリガナ: "furigana",
    氏名: "name",
    生年月日: "birthDate",
    "E-mail": "email",
    現住所: "address",
    TEL: "tel",
    携帯電話: "mobile",
    休暇中連絡先: "restAddress",
    休暇中TEL: "restTel",
    休暇中携帯電話: "restMobile",
    "ゼミ・研究室名": "seminarName",
    担当教授名: "professorName",
    "ゼミ・研究テーマ": "seminarTheme",
    "趣味・特技": "hobby",
    "クラブ・サークル": "circle",
    保有資格: "certificates",
    アルバイト: "partTime",
    "留学・海外在住経験": "studyAbroad",
    TOEIC: "toeic",
    TOEFL: "toefl",
  };

  const multiHeadings = new Set([
    "学生時代に頑張ったこと",
    "長所",
    "短所",
    "この会社を選んだ理由",
  ]);

  function getMultiSection(label: string): string {
    const idx = lines.findIndex((l) => l.trim().startsWith(`${label}：`));
    if (idx < 0) return "";
    const first = lines[idx].split("：").slice(1).join("：").trim();
    const chunks = first ? [first] : [];
    for (let i = idx + 1; i < lines.length; i += 1) {
      const line = lines[i];
      const key = line.split("：")[0]?.trim();
      if (multiHeadings.has(key) || key in singleMap || /^学歴[1-4](期間|学校名)$/.test(key)) {
        break;
      }
      chunks.push(line);
    }
    return clean(chunks.join("\n"));
  }

  const nextData: EntrySheetData = { ...INITIAL_DATA };
  for (const line of lines) {
    const idx = line.indexOf("：");
    if (idx < 0) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim();
    if (k in singleMap) {
      const key = singleMap[k] as EntrySheetScalarKey;
      (nextData[key] as string) = v;
      continue;
    }
    const m = k.match(/^学歴([1-4])(期間|学校名)$/);
    if (m) {
      const rowIndex = Number(m[1]) - 1;
      const row = { ...nextData.educationRows[rowIndex] };
      if (m[2] === "期間") row.period = v;
      else row.school = v;
      nextData.educationRows[rowIndex] = row;
    }
  }

  nextData.gakuchika = getMultiSection("学生時代に頑張ったこと");
  nextData.strength = getMultiSection("長所");
  nextData.weakness = getMultiSection("短所");
  nextData.whyCompany = getMultiSection("この会社を選んだ理由");

  Object.assign(out, nextData);
  return out;
}

export default function EntrySheetTool() {
  const [data, setData] = useState<EntrySheetData>(INITIAL_DATA);
  const [bulkText, setBulkText] = useState("");
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const aiPrompt = useMemo(() => AI_PROMPT_TEMPLATE, []);

  function setField<K extends keyof EntrySheetData>(key: K, value: EntrySheetData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function setEducation(index: number, key: "period" | "school", value: string) {
    setData((d) => ({
      ...d,
      educationRows: d.educationRows.map((r, i) =>
        i === index ? { ...r, [key]: value } : r,
      ),
    }));
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(aiPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function onPhotoChange(file: File | null) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (typeof r === "string") setField("photoDataUrl", r);
    };
    reader.readAsDataURL(file);
  }

  function applyBulk() {
    const parsed = parseBulkText(bulkText);
    if (!Object.keys(parsed).length) {
      window.alert("解析できる項目が見つかりませんでした。入力フォーマットに沿って貼り付けてください。");
      return;
    }
    setData((d) => ({ ...d, ...parsed }));
  }

  async function downloadPng() {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const canvas = await capturePreviewToCanvas(captureRef.current);
      downloadDataUrlPng(canvas.toDataURL("image/png"), "entry-sheet.png");
    } finally {
      setExporting(false);
    }
  }

  async function downloadPdf() {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const canvas = await capturePreviewToCanvas(captureRef.current, { scale: 1.5 });
      await downloadCanvasAsPdf(canvas, "entry-sheet.pdf");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="es-shell">
      <header className="es-hero">
        <p className="es-label">Tool / エントリーシート</p>
        <h1>エントリーシート作成ツール</h1>
        <p className="es-lead">
          画像のような枠組みをベースに、入力内容をその場でプレビュー。通常入力と一括流し込みの両方に対応しています。
        </p>
      </header>

      <div className="es-workspace">
        <div className="es-form">
          <section className="es-card">
            <h2>AIに渡す入力指示文</h2>
            <p className="es-hint">下の文章をAIに渡すと、プレーンテキスト形式で入力用データを作れます。</p>
            <textarea value={aiPrompt} readOnly rows={14} />
            <button type="button" className="es-btn-secondary" onClick={copyPrompt}>
              {copied ? "コピーしました" : "指示文をコピー"}
            </button>
          </section>

          <section className="es-card">
            <h2>一括流し込み（プレーンテキスト）</h2>
            <textarea
              rows={14}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="AIが生成したプレーンテキストを貼り付け"
            />
            <button type="button" className="es-btn-primary" onClick={applyBulk}>
              一括反映
            </button>
          </section>

          <section className="es-card">
            <h2>微調整入力</h2>
            <div className="es-grid2">
              <label>フリガナ<input value={data.furigana} onChange={(e) => setField("furigana", e.target.value)} /></label>
              <label>氏名<input value={data.name} onChange={(e) => setField("name", e.target.value)} /></label>
              <label>生年月日<input value={data.birthDate} onChange={(e) => setField("birthDate", e.target.value)} /></label>
              <label>E-mail<input value={data.email} onChange={(e) => setField("email", e.target.value)} /></label>
              <label>TEL<input value={data.tel} onChange={(e) => setField("tel", e.target.value)} /></label>
              <label>携帯電話<input value={data.mobile} onChange={(e) => setField("mobile", e.target.value)} /></label>
            </div>
            <label>現住所<textarea rows={2} value={data.address} onChange={(e) => setField("address", e.target.value)} /></label>
            <label>休暇中連絡先<textarea rows={2} value={data.restAddress} onChange={(e) => setField("restAddress", e.target.value)} /></label>
            <div className="es-grid2">
              <label>休暇中TEL<input value={data.restTel} onChange={(e) => setField("restTel", e.target.value)} /></label>
              <label>休暇中携帯電話<input value={data.restMobile} onChange={(e) => setField("restMobile", e.target.value)} /></label>
            </div>
            <label>写真<input type="file" accept="image/*" onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)} /></label>
            <h3>学歴</h3>
            {data.educationRows.map((row, i) => (
              <div key={`edu-${i}`} className="es-grid2">
                <label>学歴{i + 1}期間<input value={row.period} onChange={(e) => setEducation(i, "period", e.target.value)} /></label>
                <label>学歴{i + 1}学校名<input value={row.school} onChange={(e) => setEducation(i, "school", e.target.value)} /></label>
              </div>
            ))}
            <div className="es-grid3">
              <label>ゼミ・研究室名<input value={data.seminarName} onChange={(e) => setField("seminarName", e.target.value)} /></label>
              <label>担当教授名<input value={data.professorName} onChange={(e) => setField("professorName", e.target.value)} /></label>
              <label>ゼミ・研究テーマ<input value={data.seminarTheme} onChange={(e) => setField("seminarTheme", e.target.value)} /></label>
            </div>
            <div className="es-grid3">
              <label>趣味・特技<input value={data.hobby} onChange={(e) => setField("hobby", e.target.value)} /></label>
              <label>クラブ・サークル<input value={data.circle} onChange={(e) => setField("circle", e.target.value)} /></label>
              <label>保有資格<input value={data.certificates} onChange={(e) => setField("certificates", e.target.value)} /></label>
            </div>
            <div className="es-grid4">
              <label>アルバイト<input value={data.partTime} onChange={(e) => setField("partTime", e.target.value)} /></label>
              <label>留学・海外在住経験<input value={data.studyAbroad} onChange={(e) => setField("studyAbroad", e.target.value)} /></label>
              <label>TOEIC<input value={data.toeic} onChange={(e) => setField("toeic", e.target.value)} /></label>
              <label>TOEFL<input value={data.toefl} onChange={(e) => setField("toefl", e.target.value)} /></label>
            </div>
            <label>学生時代に頑張ったこと<textarea rows={5} value={data.gakuchika} onChange={(e) => setField("gakuchika", e.target.value)} /></label>
            <label>長所<textarea rows={3} value={data.strength} onChange={(e) => setField("strength", e.target.value)} /></label>
            <label>短所<textarea rows={3} value={data.weakness} onChange={(e) => setField("weakness", e.target.value)} /></label>
            <label>この会社を選んだ理由<textarea rows={6} value={data.whyCompany} onChange={(e) => setField("whyCompany", e.target.value)} /></label>
          </section>
        </div>

        <div className="es-preview-wrap">
          <p className="es-hint">プレビュー（画像/PDF出力対象）</p>
          <div className="es-actions">
            <button type="button" className="es-btn-primary" onClick={downloadPng} disabled={exporting}>
              {exporting ? "生成中..." : "PNGで保存"}
            </button>
            <button type="button" className="es-btn-secondary" onClick={downloadPdf} disabled={exporting}>
              {exporting ? "生成中..." : "PDFで保存"}
            </button>
          </div>

          <div className="es-preview-scroll">
            <div ref={captureRef} className="es-pages">
              <section className="es-page">
                <table className="es-table">
                  <tbody>
                    <tr>
                      <td className="es-photo-head">写真</td>
                      <td className="es-header-empty" colSpan={5} />
                    </tr>
                    <tr>
                      <td className="es-photo-cell">
                        {data.photoDataUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={data.photoDataUrl} alt="" />
                        ) : (
                          <span />
                        )}
                      </td>
                      <td colSpan={5} />
                    </tr>
                    <tr>
                      <th>フリガナ</th>
                      <td colSpan={3}>{data.furigana || "　"}</td>
                      <th>生年月日</th>
                      <td>{data.birthDate || "　"}</td>
                    </tr>
                    <tr>
                      <th>氏名</th>
                      <td colSpan={5}>{data.name || "　"}</td>
                    </tr>
                    <tr>
                      <th>E-mail</th>
                      <td colSpan={5}>{data.email || "　"}</td>
                    </tr>
                    <tr>
                      <th>現住所</th>
                      <td colSpan={5} className="es-multi">
                        <div>{data.address || "　"}</div>
                        <div className="es-subline">TEL {data.tel || "　"}　携帯電話 {data.mobile || "　"}</div>
                      </td>
                    </tr>
                    <tr>
                      <th>休暇中連絡先</th>
                      <td colSpan={5} className="es-multi">
                        <div>{data.restAddress || "　"}</div>
                        <div className="es-subline">TEL {data.restTel || "　"}　携帯電話 {data.restMobile || "　"}</div>
                      </td>
                    </tr>
                    {data.educationRows.map((r, i) => (
                      <tr key={`p-edu-${i}`}>
                        {i === 0 ? <th rowSpan={4}>学歴</th> : null}
                        <td>{r.period || "期間"}</td>
                        <td colSpan={4}>{r.school || "学校名"}</td>
                      </tr>
                    ))}
                    <tr>
                      <th>ゼミ・研究室名</th>
                      <td>{data.seminarName || "　"}</td>
                      <th>担当教授名</th>
                      <td>{data.professorName || "　"}</td>
                      <th colSpan={2} className="es-labelled-cell">
                        <span className="es-cell-label">ゼミ・研究テーマ</span>
                        <span className="es-cell-value">{data.seminarTheme || "　"}</span>
                      </th>
                    </tr>
                    <tr>
                      <th>趣味・特技</th>
                      <td>{data.hobby || "　"}</td>
                      <th>クラブ・サークル</th>
                      <td>{data.circle || "　"}</td>
                      <th colSpan={2} className="es-labelled-cell">
                        <span className="es-cell-label">保有資格</span>
                        <span className="es-cell-value">{data.certificates || "　"}</span>
                      </th>
                    </tr>
                    <tr>
                      <th>アルバイト</th>
                      <td>{data.partTime || "　"}</td>
                      <th>留学・海外在住経験</th>
                      <td>{data.studyAbroad || "　"}</td>
                      <th className="es-labelled-cell">
                        <span className="es-cell-label">TOEIC</span>
                        <span className="es-cell-value">{data.toeic || "　"}</span>
                      </th>
                      <th className="es-labelled-cell">
                        <span className="es-cell-label">TOEFL</span>
                        <span className="es-cell-value">{data.toefl || "　"}</span>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="es-page">
                <div className="es-question">
                  <h3>◆ あなたが学生時代に頑張ったことはなんですか？</h3>
                  <div className="es-box es-box-lg">{data.gakuchika || "　"}</div>
                </div>
                <div className="es-question">
                  <h3>◆ あなたの長所と短所について教えてください</h3>
                  <table className="es-mini-table">
                    <tbody>
                      <tr><th>長所</th><td>{data.strength || "　"}</td></tr>
                      <tr><th>短所</th><td>{data.weakness || "　"}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="es-question">
                  <h3>◆ なぜこの会社を選んだのか、理由を教えてください</h3>
                  <div className="es-box es-box-xl">{data.whyCompany || "　"}</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

