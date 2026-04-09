import type { Metadata } from "next";
import EffortWithoutGrowthPage from "./EffortWithoutGrowthPage";

export const metadata: Metadata = {
  title:
    "頑張っているのに伸びない。ズレたまま努力しているだけかもしれない",
  description:
    "フルコミ営業14ヶ月で学んだ、人が変わる環境の条件。思考のズレと向き合うためのコラム。",
  openGraph: {
    title:
      "頑張っているのに伸びない。ズレたまま努力しているだけかもしれない | Closer by divizero",
    description:
      "能力の前に、頭の使い方と環境の見方を疑う。noteと採用情報への導線。",
  },
};

export default function Page() {
  return <EffortWithoutGrowthPage />;
}
