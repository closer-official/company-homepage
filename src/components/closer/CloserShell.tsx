"use client";

import type { ReactNode } from "react";
import "./closer.css";
import CloserNav from "./CloserNav";
import CloserFooter from "./CloserFooter";
import { useCloserAnimate } from "./useCloserAnimate";
import DivizeroLpMotion from "./divizero/DivizeroLpMotion";

export default function CloserShell({
  children,
  variant = "divizero",
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
      <div
        className={[
          "closer-main",
          variant === "divizero" ? "closer-main--divizero" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
      <CloserFooter />
      {variant === "divizero" ? <DivizeroLpMotion /> : null}
    </div>
  );
}
