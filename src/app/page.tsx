import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserHome from "@/components/closer/pages/CloserHome";

export const metadata: Metadata = {
  title: "飲食店・実店舗のWeb制作",
  description:
    "ディビゼロ（divizero）の飲食店・実店舗向けWeb制作ブランド「Closer by divizero」。SNSだけでは伝わりきらない魅力を、Webで伝わる形に整えます。",
  openGraph: {
    title: "Closer by divizero（ディビゼロ）| 飲食店・実店舗のWeb制作",
    description:
      "ディビゼロ（divizero）の飲食店・実店舗向けWeb制作。SNSだけでは伝わりきらない魅力を、Webで伝わる形に整えます。",
  },
};

export default function Home() {
  return (
    <CloserShell>
      <CloserHome />
    </CloserShell>
  );
}
