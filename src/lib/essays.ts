/** コラム（/essay）一覧。記事追加時はここに1件追加してください。 */
export type EssayEntry = {
  slug: string;
  title: string;
  description: string;
  /** 一覧で表示するラベル（例: Essay / 体験記） */
  categoryLabel: string;
};

export const ESSAY_ENTRIES: EssayEntry[] = [
  {
    slug: "fulcomm-sales-intern",
    title:
      "フルコミ営業インターン、14ヶ月。100回の拒絶、金欠、劣等感。それでも辞めなかった理由",
    description:
      "「成長できる環境」という言葉の正体を、1年2ヶ月かけて解体した記録。環境の選び方の判断材料として。",
    categoryLabel: "Essay / 体験記",
  },
  {
    slug: "effort-without-growth",
    title:
      "頑張っているのに伸びない。それは能力が低いからではなく、ズレたまま努力しているだけかもしれない",
    description:
      "本質的なズレ、環境選びの見方、noteでの深掘りとパートナー募集への導線。",
    categoryLabel: "Essay / コラム",
  },
];
