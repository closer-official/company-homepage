"use client";

import { forwardRef, type ReactNode } from "react";
import type { CareerBlock, ResumeFormData } from "./resume-tool-types";

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

function cellOrSpace(s: string) {
  const t = s.trim();
  return t || "\u3000";
}

/** 基本欄（履歴書テンプレ共通） */
function ResumePersonalFields({ data }: { data: ResumeFormData }) {
  const b = data.base;
  return (
    <>
      <div className="rt-f-row">
        <span className="rt-f-label">ふりがな</span>
        <span className="rt-f-val">{cellOrSpace(b.furigana)}</span>
      </div>
      <div className="rt-f-row rt-f-row-name">
        <span className="rt-f-label">氏　名</span>
        <span className="rt-f-val rt-f-val-strong">{cellOrSpace(b.name)}</span>
      </div>
      <div className="rt-f-row">
        <span className="rt-f-label">生年月日</span>
        <span className="rt-f-val">{cellOrSpace(b.birthDate)}</span>
      </div>
      <div className="rt-f-row rt-f-row-split">
        <span className="rt-f-split-cell">
          <span className="rt-f-label">性別</span>
          <span className="rt-f-val">{cellOrSpace(b.gender)}</span>
        </span>
        <span className="rt-f-split-cell">
          <span className="rt-f-label">年齢</span>
          <span className="rt-f-val">
            {b.age.trim() ? `（満）${b.age}才` : "\u3000"}
          </span>
        </span>
      </div>
      <div className="rt-f-row">
        <span className="rt-f-label">住　所</span>
        <span className="rt-f-val">
          {b.address.trim() ? b.address : "\u3000"}
        </span>
      </div>
      <div className="rt-f-row rt-f-row-split">
        <span className="rt-f-split-cell">
          <span className="rt-f-label">電　話</span>
          <span className="rt-f-val">{cellOrSpace(b.phone)}</span>
        </span>
        <span className="rt-f-split-cell">
          <span className="rt-f-label">メール</span>
          <span className="rt-f-val rt-f-val-sm">{cellOrSpace(b.email)}</span>
        </span>
      </div>
    </>
  );
}

function ResumeEducationWorkTable({ data }: { data: ResumeFormData }) {
  return (
    <table className="rt-res-data-table" aria-label="学歴・職歴">
      <thead>
        <tr>
          <th colSpan={3} scope="colgroup" className="rt-res-sec-head">
            学歴・職歴
          </th>
        </tr>
        <tr>
          <th scope="col" className="rt-res-col-y">
            年
          </th>
          <th scope="col" className="rt-res-col-m">
            月
          </th>
          <th scope="col" className="rt-res-col-d">
            学歴・職歴
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="rt-res-subhead">
          <td colSpan={3}>学　歴</td>
        </tr>
        {data.resumeEducationRows.map((r, i) => (
          <tr key={`e-${i}`}>
            <td>{cellOrSpace(r.year)}</td>
            <td>{cellOrSpace(r.month)}</td>
            <td>{r.content.trim() ? r.content : "\u3000"}</td>
          </tr>
        ))}
        {data.resumeWorkRows.length > 0 ? (
          <>
            <tr className="rt-res-subhead">
              <td colSpan={3}>職　歴</td>
            </tr>
            {data.resumeWorkRows.map((r, i) => (
              <tr key={`w-${i}`}>
                <td>{cellOrSpace(r.year)}</td>
                <td>{cellOrSpace(r.month)}</td>
                <td>{r.content.trim() ? r.content : "\u3000"}</td>
              </tr>
            ))}
          </>
        ) : null}
      </tbody>
    </table>
  );
}

function ResumeLicenseTable({ data }: { data: ResumeFormData }) {
  return (
    <table
      className="rt-res-data-table rt-res-data-table--gap"
      aria-label="免許・資格"
    >
      <thead>
        <tr>
          <th colSpan={3} className="rt-res-sec-head">
            免許・資格
          </th>
        </tr>
        <tr>
          <th scope="col" className="rt-res-col-y">
            年
          </th>
          <th scope="col" className="rt-res-col-m">
            月
          </th>
          <th scope="col" className="rt-res-col-d">
            免許・資格
          </th>
        </tr>
      </thead>
      <tbody>
        {data.resumeLicenseRows.map((r, i) => (
          <tr key={`l-${i}`}>
            <td>{cellOrSpace(r.year)}</td>
            <td>{cellOrSpace(r.month)}</td>
            <td>{r.content.trim() ? r.content : "\u3000"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ResumeFreeTextTable({
  heading,
  text,
  minHeightEm,
}: {
  heading: string;
  text: string;
  minHeightEm: number;
}) {
  return (
    <table
      className="rt-res-data-table rt-res-data-table--gap"
      aria-label={heading}
    >
      <tbody>
        <tr>
          <th className="rt-res-sec-head rt-res-free-head">{heading}</th>
        </tr>
        <tr>
          <td
            className="rt-res-free-body"
            style={{ minHeight: `${minHeightEm}em` }}
          >
            {text.trim() ? text : "\u3000"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/** 学歴以下の帳票ブロック（テンプレ共通） */
function ResumeStandardLowerHalf({ data }: { data: ResumeFormData }) {
  return (
    <>
      <ResumeEducationWorkTable data={data} />
      <ResumeLicenseTable data={data} />
      <ResumeFreeTextTable
        heading="志望の動機・特技・アピールポイントなど"
        text={data.resumeMotivation}
        minHeightEm={7}
      />
      <ResumeFreeTextTable
        heading="本人希望記入欄（給料・職種・勤務時間・勤務地・その他）"
        text={data.resumeRequests}
        minHeightEm={5}
      />
    </>
  );
}

function splitLines(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function isCareerBlockEmpty(b: CareerBlock): boolean {
  const vals: string[] = [
    b.company,
    b.period,
    b.employmentType,
    b.businessDesc,
    b.duties,
    b.roleTitle,
    b.achievements,
    b.improvements,
    b.tools,
    b.selfPr,
    b.awards,
    b.numericResults,
    b.mgmtCount,
    b.customerCases,
    b.processImprovement,
    b.jobStrength,
  ];
  return vals.every((v) => !v.trim());
}

function getFilledCareerBlockEntries(
  blocks: CareerBlock[],
): { block: CareerBlock; index: number }[] {
  return blocks
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => !isCareerBlockEmpty(block));
}

function aggregateJobStrengthBullets(blocks: CareerBlock[]): string[] {
  const filled = blocks.filter((b) => !isCareerBlockEmpty(b));
  const withStrength = filled.filter((b) => splitLines(b.jobStrength).length > 0);
  const multi = withStrength.length > 1;
  const out: string[] = [];
  for (const b of withStrength) {
    const co = b.company.trim();
    const lines = splitLines(b.jobStrength);
    for (const line of lines) {
      out.push(multi && co ? `${co}：${line}` : line);
    }
  }
  return out;
}

/** 改行が1行のみなら段落、複数行なら箇条書き */
function ProseOrList({ text }: { text: string }) {
  const lines = splitLines(text);
  if (lines.length === 0) return null;
  if (lines.length === 1) {
    return <p className="rt-career-p rt-career-p--tight">{lines[0]}</p>;
  }
  return (
    <ul className="rt-career-ul">
      {lines.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

function CareerBridgeBeforePr({ data }: { data: ResumeFormData }) {
  const exp = data.careerPrePrExperience.trim();
  const str = data.careerPrePrStrength.trim();
  const jobFitManual = data.careerPrePrJobFit.trim();
  const agg = !jobFitManual ? aggregateJobStrengthBullets(data.careerBlocks) : [];

  if (!exp && !str && !jobFitManual && agg.length === 0) return null;

  return (
    <section className="rt-career-sec rt-career-bridge" aria-label="補足">
      {exp ? (
        <div className="rt-career-bridge-block">
          <h3 className="rt-career-h3">活かせる経験</h3>
          <ProseOrList text={data.careerPrePrExperience} />
        </div>
      ) : null}
      {str ? (
        <div className="rt-career-bridge-block">
          <h3 className="rt-career-h3">強み</h3>
          <ProseOrList text={data.careerPrePrStrength} />
        </div>
      ) : null}
      {jobFitManual || agg.length > 0 ? (
        <div className="rt-career-bridge-block">
          <h3 className="rt-career-h3">志望職種に活かせる点</h3>
          {jobFitManual ? (
            <ProseOrList text={data.careerPrePrJobFit} />
          ) : (
            <ul className="rt-career-ul">
              {agg.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}

function CareerBlockStructured({
  b,
  displayIndex,
  showBlockSelfPr,
  density,
  titleAs,
}: {
  b: CareerBlock;
  displayIndex: number;
  showBlockSelfPr: boolean;
  density: "normal" | "compact";
  titleAs: "h2" | "h3";
}) {
  const rootClass =
    density === "compact"
      ? "rt-career-block rt-career-block--compact"
      : "rt-career-block";

  const companyTitle = b.company.trim() || `勤務先 ${displayIndex}`;

  const dutyLines = splitLines(b.duties);
  const achLines = splitLines(b.achievements);
  const awardLines = splitLines(b.awards);
  const numLines = splitLines(b.numericResults);
  const impLines = [
    ...splitLines(b.improvements),
    ...splitLines(b.processImprovement),
  ];
  const skillLines = splitLines(b.tools);

  const hasAchievementSection =
    achLines.length +
      awardLines.length +
      numLines.length +
      (b.mgmtCount.trim() ? 1 : 0) +
      (b.customerCases.trim() ? 1 : 0) >
    0;

  const TitleTag = titleAs;

  return (
    <div className={rootClass}>
      <TitleTag className="rt-career-co-name">{companyTitle}</TitleTag>
      <div className="rt-career-meta">
        {b.period.trim() ? (
          <p className="rt-career-meta-line">在籍期間：{b.period}</p>
        ) : null}
        {b.employmentType.trim() ? (
          <p className="rt-career-meta-line">雇用形態：{b.employmentType}</p>
        ) : null}
        {b.roleTitle.trim() ? (
          <p className="rt-career-meta-line">役職・役割：{b.roleTitle}</p>
        ) : null}
      </div>
      {b.businessDesc.trim() ? (
        <div className="rt-career-subsec rt-career-subsec--prose">
          <h4 className="rt-career-h4">事業内容</h4>
          <ProseOrList text={b.businessDesc} />
        </div>
      ) : null}
      {dutyLines.length ? (
        <div className="rt-career-subsec">
          <h4 className="rt-career-h4">担当業務</h4>
          <ul className="rt-career-ul">
            {dutyLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {hasAchievementSection ? (
        <div className="rt-career-subsec">
          <h4 className="rt-career-h4">実績</h4>
          <ul className="rt-career-ul">
            {achLines.map((line, i) => (
              <li key={`a-${i}`}>{line}</li>
            ))}
            {awardLines.map((line, i) => (
              <li key={`w-${i}`}>{line}</li>
            ))}
            {numLines.map((line, i) => (
              <li key={`n-${i}`}>数字成果：{line}</li>
            ))}
            {b.mgmtCount.trim() ? (
              <li>マネジメント人数：{b.mgmtCount}</li>
            ) : null}
            {b.customerCases.trim() ? (
              <li>顧客対応件数：{b.customerCases}</li>
            ) : null}
          </ul>
        </div>
      ) : null}
      {impLines.length ? (
        <div className="rt-career-subsec">
          <h4 className="rt-career-h4">工夫・改善</h4>
          <ul className="rt-career-ul">
            {impLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {skillLines.length ? (
        <div className="rt-career-subsec">
          <h4 className="rt-career-h4">活かせるスキル</h4>
          <ul className="rt-career-ul">
            {skillLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {showBlockSelfPr && b.selfPr.trim() ? (
        <div className="rt-career-subsec">
          <h4 className="rt-career-h4">自己PR</h4>
          <p className="rt-career-p">{b.selfPr}</p>
        </div>
      ) : null}
    </div>
  );
}

function CareerGlobalSelfPr({ text }: { text: string }) {
  const t = text.trim();
  if (!t) return null;
  return (
    <section className="rt-career-sec rt-career-global-pr">
      <h2 className="rt-career-h2">自己PR</h2>
      <p className="rt-career-p">{text}</p>
    </section>
  );
}

function CareerSummary({ text, className }: { text: string; className?: string }) {
  const t = text.trim();
  if (!t) return null;
  return (
    <section className={`rt-career-sec${className ? ` ${className}` : ""}`}>
      <h2 className="rt-career-h2">職務要約</h2>
      <p className="rt-career-p">{text}</p>
    </section>
  );
}

function ResumeMhlw({ data }: { data: ResumeFormData }) {
  const issued =
    data.resumeIssuedDate.trim() ||
    "\u3000\u3000\u3000年\u3000\u3000月\u3000\u3000日現在";
  return (
    <div className="rt-doc rt-doc-resume rt-resume-mhlw">
      <div className="rt-mhlw-paper">
        <header className="rt-mhlw-paper-head">
          <p className="rt-mhlw-issued">{issued}</p>
          <h1 className="rt-doc-title">履　歴　書</h1>
        </header>
        <div className="rt-mhlw-top">
          <div className="rt-mhlw-main">
            <ResumePersonalFields data={data} />
          </div>
          <div className="rt-mhlw-photo">
            <PhotoOrPlaceholder
              src={data.base.photoDataUrl}
              className="rt-mhlw-photo-img"
            />
          </div>
        </div>
        <ResumeStandardLowerHalf data={data} />
      </div>
    </div>
  );
}

function ResumeSimple({ data }: { data: ResumeFormData }) {
  const issued =
    data.resumeIssuedDate.trim() ||
    "\u3000\u3000\u3000年\u3000\u3000月\u3000\u3000日現在";
  return (
    <div className="rt-doc rt-doc-resume rt-resume-simple">
      <div className="rt-mhlw-paper rt-mhlw-paper--simple">
        <header className="rt-mhlw-paper-head">
          <p className="rt-mhlw-issued">{issued}</p>
          <h1 className="rt-doc-title">履　歴　書</h1>
        </header>
        <div className="rt-simple-top">
          <div className="rt-simple-photo-wrap">
            <PhotoOrPlaceholder
              src={data.base.photoDataUrl}
              className="rt-simple-photo-img"
            />
          </div>
          <div className="rt-simple-body">
            <ResumePersonalFields data={data} />
          </div>
        </div>
        <ResumeStandardLowerHalf data={data} />
      </div>
    </div>
  );
}

function ResumePhotoLeft({ data }: { data: ResumeFormData }) {
  const issued =
    data.resumeIssuedDate.trim() ||
    "\u3000\u3000\u3000年\u3000\u3000月\u3000\u3000日現在";
  return (
    <div className="rt-doc rt-doc-resume rt-resume-pleft">
      <div className="rt-mhlw-paper rt-mhlw-paper--pleft">
        <header className="rt-mhlw-paper-head">
          <p className="rt-mhlw-issued">{issued}</p>
          <h1 className="rt-doc-title">履　歴　書</h1>
        </header>
        <div className="rt-pleft-grid">
          <PhotoOrPlaceholder
            src={data.base.photoDataUrl}
            className="rt-pleft-photo"
          />
          <div className="rt-pleft-fields">
            <ResumePersonalFields data={data} />
          </div>
        </div>
        <ResumeStandardLowerHalf data={data} />
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
  const globalPr = data.careerGlobalSelfPr.trim();
  const showBlockSelfPr = !globalPr;
  const entries = getFilledCareerBlockEntries(data.careerBlocks);

  return (
    <div className="rt-doc rt-doc-career rt-career-detailed">
      <CareerHeader data={data} />
      <CareerSummary text={data.careerSummary} />
      {entries.length > 0 ? (
        <section className="rt-career-sec rt-career-history-sec">
          <h2 className="rt-career-h2">職務経歴</h2>
          {entries.map(({ block, index }, vi) => (
            <div key={index} className="rt-career-company-wrap">
              <CareerBlockStructured
                b={block}
                displayIndex={vi + 1}
                showBlockSelfPr={showBlockSelfPr}
                density="normal"
                titleAs="h3"
              />
            </div>
          ))}
        </section>
      ) : null}
      <CareerBridgeBeforePr data={data} />
      <CareerGlobalSelfPr text={data.careerGlobalSelfPr} />
    </div>
  );
}

function CareerTimeline({ data }: { data: ResumeFormData }) {
  const globalPr = data.careerGlobalSelfPr.trim();
  const showBlockSelfPr = !globalPr;
  const entries = getFilledCareerBlockEntries(data.careerBlocks);

  return (
    <div className="rt-doc rt-doc-career rt-career-timeline">
      <CareerHeader data={data} />
      <CareerSummary text={data.careerSummary} className="rt-career-sum-wrap" />
      {entries.length > 0 ? (
        <>
          <h2 className="rt-career-h2 rt-career-h2--inline">職務経歴</h2>
          <div className="rt-tl-track">
            {entries.map(({ block, index }, vi) => (
              <div key={index} className="rt-tl-node">
                <div className="rt-tl-dot" />
                <div className="rt-tl-card">
                  <CareerBlockStructured
                    b={block}
                    displayIndex={vi + 1}
                    showBlockSelfPr={showBlockSelfPr}
                    density="normal"
                    titleAs="h3"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      <CareerBridgeBeforePr data={data} />
      <CareerGlobalSelfPr text={data.careerGlobalSelfPr} />
    </div>
  );
}

function CareerCompact({ data }: { data: ResumeFormData }) {
  const globalPr = data.careerGlobalSelfPr.trim();
  const showBlockSelfPr = !globalPr;
  const entries = getFilledCareerBlockEntries(data.careerBlocks);

  return (
    <div className="rt-doc rt-doc-career rt-career-compact">
      <CareerHeader data={data} />
      <CareerSummary text={data.careerSummary} className="rt-career-sec--cp" />
      {entries.length > 0 ? (
        <>
          <h2 className="rt-career-h2 rt-career-h2--inline">職務経歴</h2>
          <table className="rt-cp-table">
            <tbody>
              {entries.map(({ block, index }, vi) => (
                <tr key={index}>
                  <td className="rt-cp-td">
                    <CareerBlockStructured
                      b={block}
                      displayIndex={vi + 1}
                      showBlockSelfPr={showBlockSelfPr}
                      density="compact"
                      titleAs="h3"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
      <CareerBridgeBeforePr data={data} />
      <CareerGlobalSelfPr text={data.careerGlobalSelfPr} />
    </div>
  );
}

const ResumeDoc = forwardRef<HTMLDivElement, { data: ResumeFormData }>(
  function ResumeDoc({ data }, ref) {
    let inner: ReactNode;
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
