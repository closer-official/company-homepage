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
    label: "詳細（見出し＋箇条書き風）",
    desc: "項目ごとに区切り、面接用に読みやすい",
  },
  {
    id: "timeline",
    label: "時系列ライン",
    desc: "勤務先を縦のラインでつなぐレイアウト",
  },
  {
    id: "compact",
    label: "コンパクト表形式",
    desc: "1ページにまとめやすい高密度",
  },
];
