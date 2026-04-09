import type { Metadata } from "next";
import EffortWithoutGrowthPage from "./EffortWithoutGrowthPage";

export const metadata: Metadata = {
  title:
    "頑張っているのに伸びない。ズレたまま努力しているだけかもしれない",
  description:
    "感情と事実の分け方、環境選びの軸、人が変わる構造について。深掘りはnoteへ。",
  openGraph: {
    title:
      "頑張っているのに伸びない。ズレたまま努力しているだけかもしれない | Closer by divizero",
    description:
      "本質的なズレと環境選び。noteで詳しく、関心があればパートナー募集へ。",
  },
};

export default function Page() {
  return <EffortWithoutGrowthPage />;
}
