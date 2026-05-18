"use client";

import type { ReactNode } from "react";
import "./closer.css";
import CloserNav from "./CloserNav";
import CloserFooter from "./CloserFooter";
import { useCloserAnimate } from "./useCloserAnimate";

export default function CloserShell({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "divizero";
}) {
  useCloserAnimate();
  return (
    <div
      className={[
        "closer-site",
        variant === "divizero" ? "closer-site--divizero" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CloserNav />
      <div className="closer-main">{children}</div>
      <CloserFooter />
    </div>
  );
}
