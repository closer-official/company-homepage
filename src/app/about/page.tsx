import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserAbout from "@/components/closer/pages/CloserAbout";

export const metadata: Metadata = {
  title: "About",
  description:
    "ディビゼロ（divizero）の飲食店・実店舗向けWeb制作「Closer by divizero」の考え方と背景。",
};

export default function AboutPage() {
  return (
    <CloserShell>
      <CloserAbout />
    </CloserShell>
  );
}
