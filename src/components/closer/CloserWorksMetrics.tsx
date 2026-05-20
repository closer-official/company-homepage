"use client";

import { ScrollMetric } from "./divizero/AnimatedNumber";

const METRICS = [
  {
    end: 40,
    suffix: "%",
    label: "DM返信率",
    note: "業界平均2〜4%に対して",
  },
  {
    end: 0,
    prefix: "¥",
    label: "初期費用",
    note: "完全成果報酬・固定費ゼロ",
  },
  {
    end: 100,
    suffix: "%",
    label: "ブランド保全",
    note: "URL誘導なし・テキストのみ",
  },
] as const;

export default function CloserWorksMetrics() {
  return (
    <div className="closer-works-metrics dz-reveal-stagger">
      {METRICS.map((m) => (
        <div key={m.label} className="closer-works-metric-card dz-glass-card">
          <div className="closer-works-metric-value dz-text-gold-gradient">
            <ScrollMetric
              end={m.end}
              prefix={"prefix" in m ? m.prefix : ""}
              suffix={"suffix" in m ? m.suffix : ""}
            />
          </div>
          <div className="closer-works-metric-label">{m.label}</div>
          <div className="closer-works-metric-note">{m.note}</div>
        </div>
      ))}
    </div>
  );
}
