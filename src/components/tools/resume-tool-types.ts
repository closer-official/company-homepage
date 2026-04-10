export type ResumeTemplateId = "mhlw" | "simple" | "photoLeft";
export type CareerTemplateId = "detailed" | "timeline" | "compact";

export type CareerBlock = {
  company: string;
  period: string;
  employmentType: string;
  businessDesc: string;
  duties: string;
  roleTitle: string;
  achievements: string;
  improvements: string;
  tools: string;
  selfPr: string;
  awards: string;
  numericResults: string;
  mgmtCount: string;
  customerCases: string;
  processImprovement: string;
  jobStrength: string;
};

export type BaseProfile = {
  name: string;
  address: string;
  phone: string;
  email: string;
  birthDate: string;
  photoDataUrl: string;
};

export type ResumeFormData = {
  docMode: "resume" | "career";
  resumeTemplate: ResumeTemplateId;
  careerTemplate: CareerTemplateId;
  careerSummary: string;
  /** 職務経歴書末尾の自己PR（推奨）。入力時は勤務先ごとの自己PRはプレビューに出しません */
  careerGlobalSelfPr: string;
  base: BaseProfile;
  careerShowPhoto: boolean;
  careerBlocks: CareerBlock[];
};

export const emptyCareerBlock = (): CareerBlock => ({
  company: "",
  period: "",
  employmentType: "",
  businessDesc: "",
  duties: "",
  roleTitle: "",
  achievements: "",
  improvements: "",
  tools: "",
  selfPr: "",
  awards: "",
  numericResults: "",
  mgmtCount: "",
  customerCases: "",
  processImprovement: "",
  jobStrength: "",
});

export const initialFormData = (): ResumeFormData => ({
  docMode: "resume",
  resumeTemplate: "mhlw",
  careerTemplate: "detailed",
  careerSummary: "",
  careerGlobalSelfPr: "",
  base: {
    name: "",
    address: "",
    phone: "",
    email: "",
    birthDate: "",
    photoDataUrl: "",
  },
  careerShowPhoto: false,
  careerBlocks: [emptyCareerBlock()],
});

export const RESUME_TEMPLATE_OPTIONS: {
  id: ResumeTemplateId;
  label: string;
  desc: string;
}[] = [
  {
    id: "mhlw",
    label: "一般履歴書（表形式）",
    desc: "氏名・住所・連絡先を枠で区切った定番レイアウト",
  },
  {
    id: "simple",
    label: "シンプル縦型",
    desc: "余白多めの読みやすい1カラム",
  },
  {
    id: "photoLeft",
    label: "写真左配置",
    desc: "左に写真・右に基本情報の2カラム",
  },
];

export const CAREER_TEMPLATE_OPTIONS: {
  id: CareerTemplateId;
  label: string;
  desc: string;
}[] = [
  {
    id: "detailed",
    label: "提出向け（推奨）",
    desc: "見出し・箇条書きで読み手が掴みやすい一般的な職務経歴の見た目",
  },
  {
    id: "timeline",
    label: "時系列ライン",
    desc: "同じ構成をタイムライン装飾で表示",
  },
  {
    id: "compact",
    label: "コンパクト",
    desc: "同じ構成で文字サイズを詰め、1枚に収めやすく",
  },
];
