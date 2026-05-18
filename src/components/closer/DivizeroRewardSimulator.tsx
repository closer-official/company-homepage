"use client";

import { useEffect, useMemo, useState } from "react";

const MIN_PRICE = 10_000;
const MAX_PRICE = 500_000;
const THRESHOLD = 50_000;
const FIXED_APO_FEE = 5_000;

type PlanId = "fixed" | "percent";

export default function DivizeroRewardSimulator() {
  const [unitPrice, setUnitPrice] = useState(80_000);
  const [plan, setPlan] = useState<PlanId>("percent");

  const canChoosePercent = unitPrice > THRESHOLD;

  useEffect(() => {
    if (!canChoosePercent && plan === "percent") {
      setPlan("fixed");
    }
  }, [canChoosePercent, plan]);

  const activePlan: PlanId = canChoosePercent ? plan : "fixed";

  const result = useMemo(() => {
    if (activePlan === "fixed") {
      return {
        planLabel: "最低保証 5,000円プラン",
        perApo: FIXED_APO_FEE,
        perClose: null as number | null,
        note: "商材単価が5万円以下の場合、このプランが自動適用されます。",
      };
    }
    const perClose = Math.round(unitPrice * 0.1);
    return {
      planLabel: "成約時報酬 10%プラン",
      perApo: null,
      perClose,
      note: "成約が発生したタイミングで、商材単価の10%が報酬として発生します。",
    };
  }, [activePlan, unitPrice]);

  return (
    <div className="dz-sim" id="simulator">
      <div className="dz-sim-header">
        <span className="dz-label">Simulator</span>
        <h2 className="dz-section-title">報酬シミュレーター</h2>
        <p className="dz-section-lead">
          想定商材単価を入力すると、適用プランと費用感をその場で確認できます。
        </p>
      </div>

      <div className="dz-sim-body">
        <div className="dz-sim-control">
          <div className="dz-sim-control-top">
            <label htmlFor="dz-unit-price">想定商材単価</label>
            <span className="dz-sim-value">¥{unitPrice.toLocaleString()}</span>
          </div>
          <input
            id="dz-unit-price"
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={5_000}
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="dz-sim-range"
          />
          <div className="dz-sim-range-labels">
            <span>¥{MIN_PRICE.toLocaleString()}</span>
            <span>¥{MAX_PRICE.toLocaleString()}</span>
          </div>
        </div>

        <div className="dz-sim-plans">
          <button
            type="button"
            className={`dz-sim-plan ${activePlan === "fixed" ? "is-active" : ""}`}
            onClick={() => setPlan("fixed")}
          >
            <span className="dz-sim-plan-name">最低保証 5,000円プラン</span>
            <span className="dz-sim-plan-desc">1アポ ¥5,000（固定）</span>
            {!canChoosePercent && <span className="dz-sim-plan-badge">自動適用</span>}
          </button>
          <button
            type="button"
            className={`dz-sim-plan ${activePlan === "percent" ? "is-active" : ""}`}
            onClick={() => canChoosePercent && setPlan("percent")}
            disabled={!canChoosePercent}
          >
            <span className="dz-sim-plan-name">成約時報酬 10%プラン</span>
            <span className="dz-sim-plan-desc">成約1件あたり 商材単価の10%</span>
            {!canChoosePercent && <span className="dz-sim-plan-badge is-muted">5万円超で選択可</span>}
          </button>
        </div>

        <div className="dz-sim-result">
          <p className="dz-sim-result-label">適用プラン</p>
          <p className="dz-sim-result-plan">{result.planLabel}</p>
          {result.perApo !== null ? (
            <p className="dz-sim-result-amount">
              1アポあたり <strong>¥{result.perApo.toLocaleString()}</strong>
            </p>
          ) : (
            <p className="dz-sim-result-amount">
              成約1件あたり <strong>¥{result.perClose?.toLocaleString()}</strong>
              <span className="dz-sim-result-sub">（商材単価 ¥{unitPrice.toLocaleString()} × 10%）</span>
            </p>
          )}
          <p className="dz-sim-result-note">{result.note}</p>
        </div>

        {canChoosePercent && activePlan === "percent" && (
          <p className="dz-sim-incentive">
            なぜ10%を選ぶと優秀なスタッフがつくのか：稼働ワーカーへのインセンティブを高めることで、社内のエーススタッフが最優先で稼働し、圧倒的な速度でアポを獲得するロジックです。
          </p>
        )}
      </div>
    </div>
  );
}
