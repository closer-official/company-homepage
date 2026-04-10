import {
  emptyCareerBlock,
  type CareerBlock,
  type ResumeFormData,
} from "./resume-tool-types";

/** プレビュー用（未入力欄のみ）。飲食アルバイト・大学生向けの薄い例文 */
export const FOOD_SERVICE_DEMO_NAME = "山田 太郎";

export const FOOD_SERVICE_DEMO_CAREER_SUMMARY =
  "飲食店のホールスタッフとして約2年間勤務し、接客、注文対応、配膳、レジ対応を担当しました。忙しい時間帯でも周囲と連携しながら、丁寧でスムーズな接客を心がけてきました。";

export const FOOD_SERVICE_DEMO_GLOBAL_SELF_PR =
  "私の強みは、状況を見ながら周囲と連携して行動できる点です。飲食店のアルバイトでは、忙しい時間帯でも落ち着いて接客や配膳を行い、店舗全体が円滑に回るよう努めてきました。今後も相手に合わせた丁寧な対応を心がけ、周囲と協力しながら業務に取り組みたいと考えています。";

export const FOOD_SERVICE_DEMO_PRE_EXPERIENCE =
  "接客、レジ対応、ピーク時のホール業務など";

export const FOOD_SERVICE_DEMO_PRE_STRENGTH =
  "忙しい場面でも落ち着いて対応し、周囲と声を掛け合いながら動けること";

/** 志望職種に活かせる点（全体）は空にしておき、ブロックの jobStrength 集約を使えるようにする */

export function foodServiceDemoCareerBlock(): CareerBlock {
  return {
    ...emptyCareerBlock(),
    company: "〇〇カフェ 渋谷店",
    period: "2023年4月 ～ 2025年3月",
    employmentType: "アルバイト",
    roleTitle: "ホールスタッフ",
    businessDesc:
      "カフェ業態の飲食店として、店内飲食とテイクアウトを提供。学生や会社員を中心に来店する店舗。",
    duties: [
      "お客様のご案内",
      "注文受付",
      "料理・ドリンクの提供",
      "レジ対応",
      "テーブル片付け",
      "店内清掃",
      "開店準備",
      "閉店作業",
    ].join("\n"),
    achievements:
      "繁忙時間帯のホール対応を任されることが多く、新人スタッフへの業務説明も担当しました。",
    improvements:
      "混雑時でもお客様をお待たせしすぎないよう、周囲と声を掛け合いながら優先順位を意識して行動しました。",
    tools: [
      "接客対応",
      "丁寧な言葉遣い",
      "周囲との連携",
      "レジ対応",
      "忙しい時間帯での優先順位判断",
    ].join("\n"),
    awards: "新人教育を任されました。",
    numericResults: "週3〜4日勤務を継続",
    mgmtCount: "2名",
    customerCases: "1日あたり30〜50組程度",
    processImprovement:
      "注文受付後の確認を徹底し、提供ミスを防ぐよう努めました。",
    jobStrength:
      "相手に合わせた丁寧な対応力と、忙しい場面でも周囲と連携しながら動ける点を活かせます。",
    selfPr: "",
  };
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

function pick(user: string, demo: string): string {
  return user.trim() ? user : demo;
}

function mergeBlockWithDemo(b: CareerBlock, demo: CareerBlock): CareerBlock {
  return {
    company: pick(b.company, demo.company),
    period: pick(b.period, demo.period),
    employmentType: pick(b.employmentType, demo.employmentType),
    businessDesc: pick(b.businessDesc, demo.businessDesc),
    duties: pick(b.duties, demo.duties),
    roleTitle: pick(b.roleTitle, demo.roleTitle),
    achievements: pick(b.achievements, demo.achievements),
    improvements: pick(b.improvements, demo.improvements),
    tools: pick(b.tools, demo.tools),
    selfPr: pick(b.selfPr, demo.selfPr),
    awards: pick(b.awards, demo.awards),
    numericResults: pick(b.numericResults, demo.numericResults),
    mgmtCount: pick(b.mgmtCount, demo.mgmtCount),
    customerCases: pick(b.customerCases, demo.customerCases),
    processImprovement: pick(b.processImprovement, demo.processImprovement),
    jobStrength: pick(b.jobStrength, demo.jobStrength),
  };
}

/**
 * 職務経歴プレビュー用：未入力の文字列だけ例文で埋める。
 * 先頭ブロックが完全空欄で、2件目以降に入力がある場合は先頭に例を出さない（勤務先の取り違え防止）。
 */
export function mergeCareerPreviewData(data: ResumeFormData): ResumeFormData {
  if (data.docMode !== "career") {
    return data;
  }

  const demo = foodServiceDemoCareerBlock();
  const first = data.careerBlocks[0] ?? emptyCareerBlock();
  const hasLaterNonEmpty = data.careerBlocks
    .slice(1)
    .some((b) => !isCareerBlockEmpty(b));
  const skipFirstDemo =
    isCareerBlockEmpty(first) && hasLaterNonEmpty;

  const mergedBlocks = data.careerBlocks.map((b, i) => {
    if (i === 0 && skipFirstDemo) {
      return b;
    }
    if (i === 0) {
      return mergeBlockWithDemo(b, demo);
    }
    return b;
  });

  return {
    ...data,
    base: {
      ...data.base,
      name: pick(data.base.name, FOOD_SERVICE_DEMO_NAME),
    },
    careerSummary: pick(data.careerSummary, FOOD_SERVICE_DEMO_CAREER_SUMMARY),
    careerGlobalSelfPr: pick(
      data.careerGlobalSelfPr,
      FOOD_SERVICE_DEMO_GLOBAL_SELF_PR,
    ),
    careerPrePrExperience: pick(
      data.careerPrePrExperience,
      FOOD_SERVICE_DEMO_PRE_EXPERIENCE,
    ),
    careerPrePrStrength: pick(
      data.careerPrePrStrength,
      FOOD_SERVICE_DEMO_PRE_STRENGTH,
    ),
    careerPrePrJobFit: data.careerPrePrJobFit.trim()
      ? data.careerPrePrJobFit
      : "",
    careerBlocks: mergedBlocks,
  };
}

export const EMPLOYMENT_TYPE_CHIPS = [
  "アルバイト",
  "パート",
  "長期インターン",
  "短期アルバイト",
] as const;

export const ROLE_TITLE_CHIPS = [
  "ホールスタッフ",
  "キッチンスタッフ",
  "ホール・キッチン兼任",
  "レジ担当",
  "ドリンク担当",
  "開店準備担当",
  "閉店作業担当",
  "新人教育担当",
  "シフトリーダー",
  "時間帯責任者",
] as const;

export const SKILL_CHIPS = [
  "接客対応",
  "コミュニケーション力",
  "周囲との連携",
  "丁寧な言葉遣い",
  "レジ対応",
  "クレーム一次対応",
  "新人教育",
  "臨機応変な対応",
  "優先順位判断",
  "継続力",
  "責任感",
  "衛生管理意識",
] as const;
