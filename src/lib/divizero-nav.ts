/** divizero 営業代行サイト共通ナビ（Tools は事業外のため含めない） */
export const DIVIZERO_SITE_LINKS = [
  { href: "/about", en: "About", ja: "概要" },
  { href: "/services", en: "Services", ja: "サービス" },
  { href: "/pricing", en: "Pricing", ja: "料金" },
  { href: "/works", en: "Results", ja: "実績" },
  { href: "/contact", en: "Contact", ja: "お問い合わせ" },
] as const;

export const DIVIZERO_HOME_ANCHORS = [
  { href: "#pain", en: "Problem", ja: "課題" },
  { href: "#reasons", en: "Why", ja: "強み" },
  { href: "#flow", en: "Flow", ja: "流れ" },
  { href: "#pricing", en: "Pricing", ja: "料金" },
  { href: "#simulator", en: "Simulator", ja: "試算" },
  { href: "#faq", en: "FAQ", ja: "質問" },
] as const;

export const DIVIZERO_FOOTER_COLUMN = [
  { href: "/essay", en: "Column", ja: "コラム一覧" },
] as const;

export const DIVIZERO_FOOTER_LEGAL = [
  { href: "/operator", en: "Operator", ja: "運営者情報" },
  { href: "/tokusho", en: "Legal Notice", ja: "特定商取引法" },
  { href: "/privacy-policy", en: "Privacy", ja: "プライバシー" },
] as const;

export const DIVIZERO_FOOTER_OTHER = [
  { href: "/partners", en: "Partners", ja: "パートナー募集" },
] as const;

export const DIVIZERO_FOOTER_TOP = {
  href: "/",
  en: "Top",
  ja: "トップ",
} as const;
