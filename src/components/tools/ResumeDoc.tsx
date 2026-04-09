"use client";

import { forwardRef } from "react";
import type { ResumeFormData } from "./resume-tool-types";

function PhotoOrPlaceholder({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL only, ephemeral
      <img src={src} alt="" className={className} />
    );
  }
  return <div className={`rt-photo-ph ${className ?? ""}`}>写真</div>;
}

function BaseFields({ data }: { data: ResumeFormData }) {
  const { base } = data;
  return (
    <>
      <div className="rt-f-row">
        <span className="rt-f-label">氏名</span>
        <span className="rt-f-val">{base.name || "—"}</span>
      </div>
      <div className="rt-f-row">
        <span className="rt-f-label">住所</span>
        <span className="rt-f-val">{base.address || "—"}</span>
      </div>
      <div className="rt-f-row rt-f-row-split">
        <span>
          <span className="rt-f-label">電話</span>
          <span className="rt-f-val">{base.phone || "—"}</span>
        </span>
        <span>
          <span className="rt-f-label">メール</span>
          <span className="rt-f-val rt-f-val-sm">{base.email || "—"}</span>
        </span>
      </div>
      <div className="rt-f-row">
        <span className="rt-f-label">生年月日</span>
        <span className="rt-f-val">{base.birthDate || "—"}</span>
      </div>
    </>
  );
}

function CareerBlockFields({
  b,
  omitKeys,
}: {
  b: ResumeFormData["careerBlocks"][0];
  omitKeys?: (keyof ResumeFormData["careerBlocks"][0])[];
}) {
  const omit = new Set(omitKeys ?? []);
  const rows: [string, keyof ResumeFormData["careerBlocks"][0], string][] = [
    ["勤務先名", "company", b.company],
    ["在籍期間", "period", b.period],
    ["雇用形態", "employmentType", b.employmentType],
    ["事業内容", "businessDesc", b.businessDesc],
    ["担当業務", "duties", b.duties],
    ["役職・役割", "roleTitle", b.roleTitle],
    ["実績", "achievements", b.achievements],
    ["工夫したこと", "improvements", b.improvements],
    ["使用ツール・スキル", "tools", b.tools],
    ["自己PR", "selfPr", b.selfPr],
    ["表彰歴", "awards", b.awards],
    ["数字成果", "numericResults", b.numericResults],
    ["マネジメント人数", "mgmtCount", b.mgmtCount],
    ["顧客対応件数", "customerCases", b.customerCases],
    ["改善した業務フロー", "processImprovement", b.processImprovement],
    ["志望職種に合わせた強み", "jobStrength", b.jobStrength],
  ];
  return (
    <>
      {rows.map(([label, key, val]) =>
        !omit.has(key) && val ? (
          <div key={label} className="rt-cf-item">
            <div className="rt-cf-label">{label}</div>
            <div className="rt-cf-val">{val}</div>
          </div>
        ) : null,
      )}
    </>
  );
}

function ResumeMhlw({ data }: { data: ResumeFormData }) {
  return (
    <div className="rt-doc rt-doc-resume rt-resume-mhlw">
      <div className="rt-doc-head">
        <h1 className="rt-doc-title">履　歴　書</h1>
        <p className="rt-doc-sub">（※本ツールはブラウザ内のみで表示。保存しません）</p>
      </div>
      <div className="rt-mhlw-top">
        <div className="rt-mhlw-main">
          <BaseFields data={data} />
        </div>
        <div className="rt-mhlw-photo">
          <PhotoOrPlaceholder
            src={data.base.photoDataUrl}
            className="rt-mhlw-photo-img"
          />
        </div>
      </div>
    </div>
  );
}

function ResumeSimple({ data }: { data: ResumeFormData }) {
  return (
    <div className="rt-doc rt-doc-resume rt-resume-simple">
      <h1 className="rt-doc-title">履歴書</h1>
      <div className="rt-simple-photo-wrap">
        <PhotoOrPlaceholder
          src={data.base.photoDataUrl}
          className="rt-simple-photo-img"
        />
      </div>
      <div className="rt-simple-body">
        <BaseFields data={data} />
      </div>
    </div>
  );
}

function ResumePhotoLeft({ data }: { data: ResumeFormData }) {
  return (
    <div className="rt-doc rt-doc-resume rt-resume-pleft">
      <h1 className="rt-doc-title">履歴書</h1>
      <div className="rt-pleft-grid">
        <PhotoOrPlaceholder
          src={data.base.photoDataUrl}
          className="rt-pleft-photo"
        />
        <div className="rt-pleft-fields">
          <BaseFields data={data} />
        </div>
      </div>
    </div>
  );
}

function CareerHeader({ data }: { data: ResumeFormData }) {
  return (
    <header className="rt-career-hd">
      <h1 className="rt-doc-title">職務経歴書</h1>
      <div className="rt-career-hd-meta">
        <span>{data.base.name || "氏名未入力"}</span>
        {data.careerShowPhoto && data.base.photoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- user data URL, ephemeral
          <img
            src={data.base.photoDataUrl}
            alt=""
            className="rt-career-hd-photo"
          />
        ) : null}
      </div>
    </header>
  );
}

function CareerDetailed({ data }: { data: ResumeFormData }) {
  return (
    <div className="rt-doc rt-doc-career rt-career-detailed">
      <CareerHeader data={data} />
      {data.careerSummary ? (
        <section className="rt-career-sec">
          <h2 className="rt-career-h2">職務要約</h2>
          <p className="rt-career-p">{data.careerSummary}</p>
        </section>
      ) : null}
      {data.careerBlocks.map((b, i) => (
        <section key={i} className="rt-career-sec rt-career-company">
          <h2 className="rt-career-h2">
            {b.company || `勤務先 ${i + 1}`}
            {b.period ? (
              <span className="rt-career-period">　{b.period}</span>
            ) : null}
          </h2>
          <CareerBlockFields b={b} omitKeys={["company", "period"]} />
        </section>
      ))}
    </div>
  );
}

function CareerTimeline({ data }: { data: ResumeFormData }) {
  return (
    <div className="rt-doc rt-doc-career rt-career-timeline">
      <CareerHeader data={data} />
      {data.careerSummary ? (
        <p className="rt-career-p rt-career-sum">{data.careerSummary}</p>
      ) : null}
      <div className="rt-tl-track">
        {data.careerBlocks.map((b, i) => (
          <div key={i} className="rt-tl-node">
            <div className="rt-tl-dot" />
            <div className="rt-tl-card">
              <div className="rt-tl-co">{b.company || "勤務先"}</div>
              <div className="rt-tl-period">{b.period}</div>
              <CareerBlockFields b={b} omitKeys={["company", "period"]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerCompact({ data }: { data: ResumeFormData }) {
  return (
    <div className="rt-doc rt-doc-career rt-career-compact">
      <CareerHeader data={data} />
      {data.careerSummary ? (
        <p className="rt-cp-sum">{data.careerSummary}</p>
      ) : null}
      <table className="rt-cp-table">
        <tbody>
          {data.careerBlocks.map((b, i) => (
            <tr key={i}>
              <td className="rt-cp-td">
                <strong>{b.company || "—"}</strong>
                <br />
                <span className="rt-cp-muted">{b.period}</span>
                <CareerBlockFields b={b} omitKeys={["company", "period"]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ResumeDoc = forwardRef<HTMLDivElement, { data: ResumeFormData }>(
  function ResumeDoc({ data }, ref) {
    let inner: React.ReactNode;
    if (data.docMode === "resume") {
      if (data.resumeTemplate === "simple") {
        inner = <ResumeSimple data={data} />;
      } else if (data.resumeTemplate === "photoLeft") {
        inner = <ResumePhotoLeft data={data} />;
      } else {
        inner = <ResumeMhlw data={data} />;
      }
    } else if (data.careerTemplate === "timeline") {
      inner = <CareerTimeline data={data} />;
    } else if (data.careerTemplate === "compact") {
      inner = <CareerCompact data={data} />;
    } else {
      inner = <CareerDetailed data={data} />;
    }

    return (
      <div ref={ref} className="rt-doc-outer">
        {inner}
      </div>
    );
  },
);

export default ResumeDoc;
