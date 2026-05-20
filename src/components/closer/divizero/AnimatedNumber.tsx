"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "./useCountUp";

type AnimatedNumberProps = {
  value: number;
  format?: "yen" | "percent" | "count" | "hours";
  className?: string;
  duration?: number;
};

export function AnimatedNumber({
  value,
  format = "yen",
  className = "",
  duration,
}: AnimatedNumberProps) {
  const n = useCountUp(value, { duration });

  let text = "";
  switch (format) {
    case "yen":
      text = `${n.toLocaleString("ja-JP")}円`;
      break;
    case "percent":
      text = `${n}%`;
      break;
    case "hours":
      text = `${n}`;
      break;
    case "count":
    default:
      text = `${n.toLocaleString("ja-JP")}`;
      break;
  }

  return <span className={`dz-num ${className}`.trim()}>{text}</span>;
}

type ScrollMetricProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function ScrollMetric({
  end,
  suffix = "",
  prefix = "",
  className = "",
}: ScrollMetricProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const n = useCountUp(end, { enabled: active, duration: 1200 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`dz-num ${className}`.trim()}>
      {prefix}
      {n.toLocaleString("ja-JP")}
      {suffix}
    </span>
  );
}
