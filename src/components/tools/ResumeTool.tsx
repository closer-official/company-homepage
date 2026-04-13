"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import ResumeDoc from "./ResumeDoc";
import "./resume-tool.css";
import {
  EMPLOYMENT_TYPE_CHIPS,
  mergeCareerPreviewData,
  ROLE_TITLE_CHIPS,
  SKILL_CHIPS,
} from "./career-demo-sample";
import {
  capturePreviewToCanvas,
  downloadCanvasAsPdf,
  downloadDataUrlPng,
} from "./resume-export";
import {
  CAREER_TEMPLATE_OPTIONS,
  RESUME_TEMPLATE_OPTIONS,
  emptyCareerBlock,
  initialFormData,
  type CareerBlock,
  type ResumeFormData,
  type ResumeTimelineRow,
} from "./resume-tool-types";

type CareerFieldDef = {
  key: keyof CareerBlock;
  label: string;
  rows?: number;
  placeholder: string;
  hint: string;
  chips?: "employment" | "role" | "skills";
};

const CAREER_FIELD_DEFS: CareerFieldDef[] = [
  {
    key: "company",
    label: "勤務先名",
    placeholder: "〇〇カフェ 渋谷店",
    hint: "働いていた店名や会社名を書きます。",
  },
  {
    key: "period",
    label: "在籍期間",
    placeholder: "2023年4月 ～ 2025年3月",
    hint: "年と月まで分かれば十分です。在籍中なら「現在に至る」でもよいです。",
  },
  {
    key: "employmentType",
    label: "雇用形態",
    placeholder: "アルバイト",
    hint: "アルバイト・パートなど、実際の契約に近い形で書きます。",
    chips: "employment",
  },
  {
    key: "businessDesc",
    label: "事業内容",
    rows: 2,
    placeholder:
      "カフェ業態の飲食店として、店内飲食とテイクアウトを提供。学生や会社員を中心に来店する店舗。",
    hint: "どんなお店かを1文で簡単に書いてください。",
  },
  {
    key: "duties",
    label: "担当業務",
    rows: 3,
    placeholder:
      "来店されたお客様の案内、注文受付、料理・ドリンクの提供、レジ対応、店内清掃、開店準備・閉店作業を担当。",
    hint: "普段やっていた仕事を具体的に書いてください。複数ある場合は改行で分けても大丈夫です。",
  },
  {
    key: "roleTitle",
    label: "役職・役割",
    placeholder: "ホールスタッフ",
    hint: "肩書きがなければ、実際に担当していた立場を書いてください。",
    chips: "role",
  },
  {
    key: "achievements",
    label: "実績",
    rows: 3,
    placeholder:
      "繁忙時間帯のホール対応を任されることが多く、新人スタッフへの業務説明も担当しました。",
    hint: "評価されたこと、任されたこと、周囲よりできていたことを書いてください。大きな実績でなくても大丈夫です。",
  },
  {
    key: "improvements",
    label: "工夫したこと",
    rows: 2,
    placeholder:
      "混雑時でもお客様をお待たせしすぎないよう、周囲と声を掛け合いながら優先順位を意識して行動しました。",
    hint: "忙しいときに意識していたこと、ミスを防ぐために工夫したことを書いてください。",
  },
  {
    key: "tools",
    label: "使用ツール・スキル",
    rows: 2,
    placeholder:
      "接客対応、丁寧な言葉遣い、周囲との連携、レジ対応、忙しい時間帯での優先順位判断",
    hint: "仕事を通じて身についた力や、応募先で活かせそうな経験を書いてください。飲食バイトなら対人スキル中心で大丈夫です。",
    chips: "skills",
  },
  {
    key: "awards",
    label: "表彰歴",
    rows: 2,
    placeholder: "新人教育を任されました。",
    hint: "表彰がなくても、評価された経験があれば書いて大丈夫です。なければ空欄で問題ありません。",
  },
  {
    key: "numericResults",
    label: "数字成果",
    rows: 2,
    placeholder:
      "週3〜4日勤務を継続／1日平均50〜80名程度のお客様対応　など",
    hint: "件数・人数・日数・期間など、数字で表せる内容があれば書いてください。なければ空欄でもよいです。",
  },
  {
    key: "mgmtCount",
    label: "マネジメント人数",
    placeholder: "2名",
    hint: "新人教育やまとめ役の経験があれば人数を書いてください。なければ空欄でも大丈夫です。",
  },
  {
    key: "customerCases",
    label: "顧客対応件数",
    placeholder: "1日あたり30〜50組程度",
    hint: "正確でなくても、おおよその目安で大丈夫です。",
  },
  {
    key: "processImprovement",
    label: "改善した業務フロー",
    rows: 2,
    placeholder:
      "混雑時の配膳や片付けが重ならないよう、周囲と役割を確認しながら動くようにしました。",
    hint: "仕事を進めやすくするために、自分なりに工夫した流れや改善を書いてください。",
  },
  {
    key: "jobStrength",
    label: "志望職種に合わせた強み（勤務先ごと）",
    rows: 2,
    placeholder:
      "相手に合わせた丁寧な対応力と、忙しい場面でも周囲と連携しながら動ける点を活かせます。",
    hint: "応募先で活かせそうな強みを簡潔にまとめます。全体欄が空のときは書類後半に自動でまとまります。",
  },
  {
    key: "selfPr",
    label: "自己PR（ブロック別・任意）",
    rows: 3,
    placeholder:
      "私の強みは、丁寧な接客を継続できる点です。飲食店では…（全体の自己PR欄を使う場合は空欄でも可）",
    hint: "自分の強み → アルバイトでの具体例 → 今後どう活かしたいか、の順で書くと自然です。",
  },
];

function QuickChips({
  ariaLabel,
  labels,
  onPick,
}: {
  ariaLabel: string;
  labels: readonly string[];
  onPick: (value: string) => void;
}) {
  return (
    <div className="rt-chips" role="group" aria-label={ariaLabel}>
      {labels.map((label) => (
        <button
          key={label}
          type="button"
          className="rt-chip"
          onClick={() => onPick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export type ResumeToolProps = {
  /** URL から開いたときの初期タブ（未指定は履歴書） */
  initialDocMode?: "resume" | "career";
};

export default function ResumeTool({
  initialDocMode,
}: ResumeToolProps = {}) {
  const pathname = usePathname();
  const [data, setData] = useState<ResumeFormData>(() => {
    const d = initialFormData();
    if (initialDocMode) {
      d.docMode = initialDocMode;
    }
    return d;
  });
  const [exporting, setExporting] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const previewData = useMemo(() => mergeCareerPreviewData(data), [data]);

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

  const patchResumeTimeline = useCallback(
    (
      key:
        | "resumeEducationRows"
        | "resumeWorkRows"
        | "resumeLicenseRows",
      index: number,
      field: keyof ResumeTimelineRow,
      value: string,
    ) => {
      setData((d) => ({
        ...d,
        [key]: d[key].map((row, i) =>
          i === index ? { ...row, [field]: value } : row,
        ),
      }));
    },
    [],
  );

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
      const canvas = await capturePreviewToCanvas(el);
      downloadDataUrlPng(
        canvas.toDataURL("image/png"),
        data.docMode === "resume"
          ? "履歴書_preview.png"
          : "職務経歴書_preview.png",
      );
    } catch (err) {
      console.error(err);
      window.alert(
        "画像の生成に失敗しました。別ブラウザでお試しください。",
      );
    } finally {
      setExporting(false);
    }
  }, [data.docMode]);

  const downloadPdf = useCallback(async () => {
    const el = captureRef.current;
    if (!el) return;
    setExporting(true);
    try {
      const canvas = await capturePreviewToCanvas(el, { scale: 1.5 });
      await downloadCanvasAsPdf(
        canvas,
        data.docMode === "resume"
          ? "履歴書_preview.pdf"
          : "職務経歴書_preview.pdf",
      );
    } catch (err) {
      console.error(err);
      window.alert(
        "PDFの生成に失敗しました。別ブラウザでお試しください。",
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
          または PDF としてダウンロードしたり、スクショ用にご利用いただけます。
        </p>
        <p className="rt-privacy">
          <strong>プライバシー：</strong>
          入力内容・写真はすべてお使いのブラウザ内だけで処理され、サーバーへの送信や保存は行いません。タブを閉じると消えます。
        </p>
        <nav className="rt-seo-links" aria-label="無料ツールの関連ページ">
          <Link
            href="/tools/rireki"
            className={pathname === "/tools/rireki" ? "active" : undefined}
            aria-current={pathname === "/tools/rireki" ? "page" : undefined}
          >
            無料・履歴書をつくる
          </Link>
          <span className="rt-seo-links-sep" aria-hidden>
            ・
          </span>
          <Link
            href="/tools/shokumu-keirekisho"
            className={
              pathname === "/tools/shokumu-keirekisho" ? "active" : undefined
            }
            aria-current={
              pathname === "/tools/shokumu-keirekisho" ? "page" : undefined
            }
          >
            無料・職務経歴書をつくる
          </Link>
          <span className="rt-seo-links-sep" aria-hidden>
            ・
          </span>
          <Link
            href="/tools"
            className={pathname === "/tools" ? "active" : undefined}
            aria-current={pathname === "/tools" ? "page" : undefined}
          >
            両方まとめて
          </Link>
          <span className="rt-seo-links-sep" aria-hidden>
            ・
          </span>
          <Link
            href="/tools/pdf-converter"
            className={pathname === "/tools/pdf-converter" ? "active" : undefined}
            aria-current={pathname === "/tools/pdf-converter" ? "page" : undefined}
          >
            無料 PDF 変換
          </Link>
        </nav>
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
              <label htmlFor="rt-furi">ふりがな（氏名）</label>
              <p className="rt-field-hint rt-field-hint--field">
                氏名の読みをひらがなで書きます。
              </p>
              <input
                id="rt-furi"
                type="text"
                placeholder="やまだ たろう"
                value={data.base.furigana}
                onChange={(e) => setBase("furigana", e.target.value)}
              />
            </div>
            <div className="rt-field">
              <label htmlFor="rt-name">氏名</label>
              <p className="rt-field-hint rt-field-hint--field">
                本人の氏名を書きます。
                {data.docMode === "career"
                  ? "職務経歴書の冒頭にも使われます。"
                  : null}
              </p>
              <input
                id="rt-name"
                type="text"
                placeholder="山田 太郎"
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
            {data.docMode === "resume" ? (
              <>
                <div className="rt-field rt-field-inline-2">
                  <div>
                    <label htmlFor="rt-gender">性別（任意）</label>
                    <input
                      id="rt-gender"
                      type="text"
                      placeholder="例：男"
                      value={data.base.gender}
                      onChange={(e) => setBase("gender", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="rt-age">満年齢（任意）</label>
                    <input
                      id="rt-age"
                      type="text"
                      inputMode="numeric"
                      placeholder="例：22"
                      value={data.base.age}
                      onChange={(e) => setBase("age", e.target.value)}
                    />
                  </div>
                </div>
                <div className="rt-field">
                  <label htmlFor="rt-issued">作成日（履歴書右上）</label>
                  <p className="rt-field-hint rt-field-hint--field">
                    例：令和8年4月1日現在。提出直前に合わせて書きます。
                  </p>
                  <input
                    id="rt-issued"
                    type="text"
                    placeholder="令和　年　月　日現在"
                    value={data.resumeIssuedDate}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        resumeIssuedDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            ) : null}
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
            {data.docMode === "resume" ? (
              <>
                <div className="rt-field-group rt-field-group--nested">
                  <h3>学歴・職歴</h3>
                  <p className="rt-field-hint">
                    上から年次順に。空欄行はプレビューでも罫線として残ります。
                  </p>
                  <p className="rt-timeline-editor-label">学歴</p>
                  <div className="rt-timeline-editor" role="group" aria-label="学歴">
                    {data.resumeEducationRows.map((row, i) => (
                      <div key={`edu-${i}`} className="rt-timeline-row">
                        <input
                          aria-label={`学歴${i + 1} 年`}
                          placeholder="年"
                          value={row.year}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeEducationRows",
                              i,
                              "year",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          aria-label={`学歴${i + 1} 月`}
                          placeholder="月"
                          value={row.month}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeEducationRows",
                              i,
                              "month",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          aria-label={`学歴${i + 1} 内容`}
                          placeholder="内容（例：〇〇高等学校卒業）"
                          className="rt-timeline-row-wide"
                          value={row.content}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeEducationRows",
                              i,
                              "content",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <p className="rt-timeline-editor-label">職歴</p>
                  <div className="rt-timeline-editor" role="group" aria-label="職歴">
                    {data.resumeWorkRows.map((row, i) => (
                      <div key={`job-${i}`} className="rt-timeline-row">
                        <input
                          aria-label={`職歴${i + 1} 年`}
                          placeholder="年"
                          value={row.year}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeWorkRows",
                              i,
                              "year",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          aria-label={`職歴${i + 1} 月`}
                          placeholder="月"
                          value={row.month}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeWorkRows",
                              i,
                              "month",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          aria-label={`職歴${i + 1} 内容`}
                          placeholder="内容（例：〇〇株式会社　入社）"
                          className="rt-timeline-row-wide"
                          value={row.content}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeWorkRows",
                              i,
                              "content",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rt-field-group rt-field-group--nested">
                  <h3>免許・資格</h3>
                  <div className="rt-timeline-editor" role="group" aria-label="免許・資格">
                    {data.resumeLicenseRows.map((row, i) => (
                      <div key={`lic-${i}`} className="rt-timeline-row">
                        <input
                          aria-label={`資格${i + 1} 年`}
                          placeholder="年"
                          value={row.year}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeLicenseRows",
                              i,
                              "year",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          aria-label={`資格${i + 1} 月`}
                          placeholder="月"
                          value={row.month}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeLicenseRows",
                              i,
                              "month",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          aria-label={`資格${i + 1} 名称`}
                          placeholder="名称（例：普通自動車第一種）"
                          className="rt-timeline-row-wide"
                          value={row.content}
                          onChange={(e) =>
                            patchResumeTimeline(
                              "resumeLicenseRows",
                              i,
                              "content",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rt-field-group rt-field-group--nested">
                  <h3>志望の動機・特技など</h3>
                  <div className="rt-field">
                    <label className="rt-sr-only" htmlFor="rt-motivation">
                      志望の動機
                    </label>
                    <textarea
                      id="rt-motivation"
                      rows={5}
                      value={data.resumeMotivation}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          resumeMotivation: e.target.value,
                        }))
                      }
                      placeholder="志望理由や特技、アピールしたい点を書きます。"
                    />
                  </div>
                </div>
                <div className="rt-field-group rt-field-group--nested">
                  <h3>本人希望記入欄</h3>
                  <p className="rt-field-hint">
                    給与・職種・勤務時間・勤務地など、希望があれば記入します。
                  </p>
                  <div className="rt-field">
                    <label className="rt-sr-only" htmlFor="rt-requests">
                      本人希望記入欄
                    </label>
                    <textarea
                      id="rt-requests"
                      rows={4}
                      value={data.resumeRequests}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          resumeRequests: e.target.value,
                        }))
                      }
                      placeholder="特になければ「貴社の規定に従います」などでも構いません。"
                    />
                  </div>
                </div>
              </>
            ) : null}
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
                <p className="rt-field-hint">
                  アルバイトでどんな仕事をしていたかを2〜4文でまとめます。勤務期間・担当業務・強みが入ると自然です。
                </p>
                <div className="rt-field">
                  <label className="rt-sr-only" htmlFor="rt-career-summary">
                    職務要約
                  </label>
                  <textarea
                    id="rt-career-summary"
                    value={data.careerSummary}
                    onChange={(e) =>
                      setData((d) => ({ ...d, careerSummary: e.target.value }))
                    }
                    rows={5}
                    placeholder="飲食店のホールスタッフとして約2年間勤務し、接客、注文対応、配膳、レジ対応を担当しました。忙しい時間帯でも周囲と連携しながら、丁寧でスムーズな接客を心がけてきました。"
                  />
                </div>
                <p className="rt-field-hint rt-field-hint--after">
                  勤務期間・担当業務・強みを2〜4文で書いてください。
                </p>
              </div>
              <div className="rt-field-group">
                <h3>自己PRの手前（任意）</h3>
                <p className="rt-field-hint">
                  書類後半で「自己PR」につながる補足として表示されます。改行で複数行にすると、プレビューでは箇条書きになります。「志望職種に活かせる点（全体）」が空のときは、勤務先ごとの「志望職種に合わせた強み」を自動でまとめて表示します。
                </p>
                <div className="rt-field">
                  <label htmlFor="rt-career-pre-exp">活かせる経験</label>
                  <p className="rt-field-hint rt-field-hint--field">
                    応募先に伝えたい経験を短く。改行するとプレビューで箇条書きになります。
                  </p>
                  <textarea
                    id="rt-career-pre-exp"
                    value={data.careerPrePrExperience}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        careerPrePrExperience: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="接客、レジ対応、ピーク時のホール業務など"
                  />
                </div>
                <div className="rt-field">
                  <label htmlFor="rt-career-pre-str">強み</label>
                  <p className="rt-field-hint rt-field-hint--field">
                    自分の強みを1〜2文で。改行するとプレビューで箇条書きになります。
                  </p>
                  <textarea
                    id="rt-career-pre-str"
                    value={data.careerPrePrStrength}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        careerPrePrStrength: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="忙しい場面でも落ち着いて対応し、周囲と声を掛け合いながら動けること"
                  />
                </div>
                <div className="rt-field">
                  <label htmlFor="rt-career-pre-job">
                    志望職種に活かせる点（全体）
                  </label>
                  <p className="rt-field-hint rt-field-hint--field">
                    空欄のときは、勤務先ごとの「志望職種に合わせた強み」を書類後半にまとめて表示します。
                  </p>
                  <textarea
                    id="rt-career-pre-job"
                    value={data.careerPrePrJobFit}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        careerPrePrJobFit: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="接客で培った対人対応力を活かせます。　など（空欄なら勤務先欄から自動）"
                  />
                </div>
              </div>
              <div className="rt-field-group">
                <h3>自己PR（書類の末尾）</h3>
                <p className="rt-field-hint">
                  提出用ではここにまとめると読み手が強みを掴みやすくなります。入力がある場合、勤務先ブロックの「自己PR」はプレビューでは表示されません（入力内容はフォームに残ります）。
                </p>
                <div className="rt-field">
                  <label htmlFor="rt-career-global-pr">全体の自己PR</label>
                  <p className="rt-field-hint rt-field-hint--field">
                    強み → アルバイトでの具体例 → 今後どう活かしたいか、の順で書くと自然です。
                  </p>
                  <textarea
                    id="rt-career-global-pr"
                    value={data.careerGlobalSelfPr}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        careerGlobalSelfPr: e.target.value,
                      }))
                    }
                    rows={5}
                    placeholder="私の強みは、状況を見ながら周囲と連携して行動できる点です。飲食店のアルバイトでは、忙しい時間帯でも落ち着いて接客や配膳を行い、店舗全体が円滑に回るよう努めてきました。今後も相手に合わせた丁寧な対応を心がけ、周囲と協力しながら業務に取り組みたいと考えています。"
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
                  {CAREER_FIELD_DEFS.map((def) => {
                    const { key, label, rows, placeholder, hint, chips } = def;
                    return (
                      <div key={key} className="rt-field">
                        <label htmlFor={`rt-${i}-${key}`}>{label}</label>
                        <p className="rt-field-hint rt-field-hint--field">
                          {hint}
                        </p>
                        {rows ? (
                          <textarea
                            id={`rt-${i}-${key}`}
                            value={block[key]}
                            placeholder={placeholder}
                            onChange={(e) =>
                              patchBlock(i, { [key]: e.target.value })
                            }
                            rows={rows}
                          />
                        ) : (
                          <input
                            id={`rt-${i}-${key}`}
                            type="text"
                            value={block[key]}
                            placeholder={placeholder}
                            onChange={(e) =>
                              patchBlock(i, { [key]: e.target.value })
                            }
                          />
                        )}
                        {chips === "employment" ? (
                          <QuickChips
                            ariaLabel="雇用形態の候補"
                            labels={EMPLOYMENT_TYPE_CHIPS}
                            onPick={(v) =>
                              patchBlock(i, { employmentType: v })
                            }
                          />
                        ) : null}
                        {chips === "role" ? (
                          <QuickChips
                            ariaLabel="役職・役割の候補"
                            labels={ROLE_TITLE_CHIPS}
                            onPick={(v) => patchBlock(i, { roleTitle: v })}
                          />
                        ) : null}
                        {chips === "skills" ? (
                          <QuickChips
                            ariaLabel="スキル・経験の候補"
                            labels={SKILL_CHIPS}
                            onPick={(v) => {
                              const cur = block.tools.trim();
                              patchBlock(i, {
                                tools: cur ? `${cur}\n${v}` : v,
                              });
                            }}
                          />
                        ) : null}
                      </div>
                    );
                  })}
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
          {data.docMode === "resume" ? (
            <p className="rt-preview-doc-note">
              履歴書の帳票レイアウトに近い形で表示しています。印刷・保存は下の PNG / PDF
              から。入力内容はブラウザ内のみで処理され、サーバーには送信されません。
            </p>
          ) : null}
          {data.docMode === "career" ? (
            <p className="rt-preview-demo-note">
              職務経歴書では、未入力の欄に飲食店アルバイト向けの例が表示されます。入力した内容がその部分を置き換えます。
            </p>
          ) : null}
          <div className="rt-preview-toolbar">
            <button
              type="button"
              className="rt-btn-primary"
              onClick={downloadPng}
              disabled={exporting}
            >
              {exporting ? "生成中…" : "PNGでダウンロード（無料）"}
            </button>
            <button
              type="button"
              className="rt-btn-secondary"
              onClick={downloadPdf}
              disabled={exporting}
            >
              {exporting ? "生成中…" : "PDFでダウンロード（無料）"}
            </button>
          </div>
          <p className="rt-pdf-size-hint">
            PDF はプレビューを JPEG 圧縮して埋め込みます。PNG
            よりファイルが小さくなり、コンビニのネットプリント（例：10MB
            上限）でも通りやすくなります。
          </p>
          <div className="rt-preview-scroll">
            <ResumeDoc ref={captureRef} data={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}
