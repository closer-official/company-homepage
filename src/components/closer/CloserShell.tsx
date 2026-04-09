"use client";

import type { ReactNode } from "react";
import "./closer.css";
import CloserNav from "./CloserNav";
import CloserFooter from "./CloserFooter";
import { useCloserAnimate } from "./useCloserAnimate";

export default function CloserShell({ children }: { children: ReactNode }) {
  useCloserAnimate();
  return (
    <div className="closer-site">
      <CloserNav />
      <div className="closer-main">{children}</div>
      <CloserFooter />
    </div>
  );
}
