"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const LEGACY_PREFIXES = [
  "/admin",
  "/campaign",
  "/factory-research",
  "/hearing",
  "/services/plan",
  "/services/toeic-casino",
  "/services/affiliate",
  "/services/works",
  "/company",
] as const;

export default function ConditionalHeader() {
  const pathname = usePathname() ?? "";
  const show = LEGACY_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!show) return null;
  return <Header />;
}
