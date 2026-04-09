import type { Metadata } from "next";
import CloserShell from "@/components/closer/CloserShell";
import CloserServices from "@/components/closer/pages/CloserServices";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ディビゼロ（divizero）のCloser Web Productionと更新サポート。実店舗の魅力を伝えるWeb制作。",
};

export default function ServicesPage() {
  return (
    <CloserShell>
      <CloserServices />
    </CloserShell>
  );
}
