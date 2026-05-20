"use client";

import { useEffect, useMemo, useState } from "react";

const MIN_PRICE = 10_000;
const MAX_PRICE = 300_000;
const PRICE_STEP = 5_000;
const MIN_APO = 1;
const MAX_APO = 50;
const THRESHOLD = 50_000;
const FIXED_APO_FEE = 5_000;
const CLOSE_RATE = 0.3;
const HOURS_PER_APO = 1;

type PlanId = "fixed" | "percent";

function formatYen(n: number) {
  return `${n.toLocaleString("ja-JP")}円`;
}

export default function DivizeroRewardSimulator() {
  const [unitPrice, setUnitPrice] = useState(50_000);
  const [apoCount, setApoCount] = useState(10);
  const [plan, setPlan] = useState<PlanId>("fixed");

  const canChoosePercent = unitPrice > THRESHOLD;

  useEffect(() => {
    if (!canChoosePercent && plan === "percent") {
      setPlan("fixed");
    }
  }, [canChoosePercent, plan]);

  const activePlan: PlanId = canChoosePercent ? plan : "fixed";

  const calc = useMemo(() => {
    const expectedCloses = apoCount * CLOSE_RATE;
    const totalSales = Math.round(expectedCloses * unitPrice);
    const fee =
      activePlan === "fixed"
        ? apoCount * FIXED_APO_FEE
        : Math.round(expectedCloses * unitPrice * 0.1);
    const netProfit = totalSales - fee;
    const timeSavedHours = apoCount * HOURS_PER_APO;

    return { totalSales, fee, netProfit, timeSavedHours };
  }, [apoCount, unitPrice, activePlan]);

  return (
    <div className="dz-sim" id="simulator">
      <div className="dz-sim-header">
        <span className="dz-label">Simulator</span>
        <h2 className="dz-section-title">報酬シミュレーター</h2>
        <p className="dz-section-lead">
          平均単価と月間アポ目標を動かすと、手残りと営業時間の削減イメージがその場で試算できます。
        </p>
      </div>

      <div className="dz-sim-body">
        {/* 1. パラメータ */}
        <section className="dz-sim-block">
          <h3 className="dz-sim-block-title">1. パラメータを設定</h3>

          <div className="dz-sim-control">
            <div className="dz-sim-control-top">
              <label htmlFor="dz-unit-price">あなたのサービスの平均単価（税抜）</label>
              <span className="dz-sim-value">{formatYen(unitPrice)}</span>
            </div>
            <input
              id="dz-unit-price"
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={PRICE_STEP}
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="dz-sim-range dz-sim-range--price"
            />
            <div className="dz-sim-range-labels">
              <span>1万円</span>
              <span>15万円</span>
              <span>30万円</span>
            </div>
          </div>

          <div className="dz-sim-control">
            <div className="dz-sim-control-top">
              <label htmlFor="dz-apo-count">月間獲得アポ件数（目標）</label>
              <span className="dz-sim-value dz-sim-value--apo">{apoCount}件</span>
            </div>
            <input
              id="dz-apo-count"
              type="range"
              min={MIN_APO}
              max={MAX_APO}
              step={1}
              value={apoCount}
              onChange={(e) => setApoCount(Number(e.target.value))}
              className="dz-sim-range dz-sim-range--apo"
            />
            <div className="dz-sim-range-labels">
              <span>1件</span>
              <span>25件</span>
              <span>50件</span>
            </div>
          </div>

          <div className="dz-sim-plan-row">
            <span className="dz-sim-plan-row-label">コミッションプランの選択</span>
            {!canChoosePercent ? (
              <span className="dz-sim-plan-row-note">
                ※単価5万円以下のためプランA固定となります
              </span>
            ) : (
              <span className="dz-sim-plan-row-note dz-sim-plan-row-note--muted">
                単価5万円超のためプランBも選択できます
              </span>
            )}
          </div>
        </section>

        {/* プラン選択 */}
        <div className="dz-sim-plans">
          <button
            type="button"
            className={`dz-sim-plan ${activePlan === "fixed" ? "is-active" : ""}`}
            onClick={() => setPlan("fixed")}
            aria-pressed={activePlan === "fixed"}
          >
            <div className="dz-sim-plan-text">
              <span className="dz-sim-plan-name">プランA：単価型</span>
              <span className="dz-sim-plan-desc">最低保証一律 5,000円／アポ</span>
            </div>
            <span className="dz-sim-plan-radio" aria-hidden />
          </button>
          <button
            type="button"
            className={`dz-sim-plan ${activePlan === "percent" ? "is-active" : ""}`}
            onClick={() => canChoosePercent && setPlan("percent")}
            disabled={!canChoosePercent}
            aria-pressed={activePlan === "percent"}
          >
            <div className="dz-sim-plan-text">
              <span className="dz-sim-plan-name">プランB：成約型</span>
              <span className="dz-sim-plan-desc">制作単価の 10% ／ 成約</span>
            </div>
            <span className="dz-sim-plan-radio" aria-hidden />
          </button>
        </div>

        {/* 2. 試算結果 */}
        <section className="dz-sim-block dz-sim-result-block">
          <h3 className="dz-sim-block-title">2. 試算結果（推定・期待値）</h3>

          <div className="dz-sim-result">
            <div className="dz-sim-result-main">
              <p className="dz-sim-result-label">
                想定される総売上（成約率 30%換算）
              </p>
              <p className="dz-sim-result-total">{formatYen(calc.totalSales)}</p>
            </div>

            <div className="dz-sim-result-row">
              <span>divizeroへの支払手数料</span>
              <span className="dz-sim-result-fee">−{formatYen(calc.fee)}</span>
            </div>

            <div className="dz-sim-result-row dz-sim-result-row--net">
              <span>あなたの実質手残り</span>
              <span className="dz-sim-result-net">{formatYen(calc.netProfit)}</span>
            </div>
          </div>

          <div className="dz-sim-time">
            <span className="dz-sim-time-icon" aria-hidden>
              ◷
            </span>
            <span className="dz-sim-time-label">削減される営業アプローチ時間</span>
            <span className="dz-sim-time-value">約 {calc.timeSavedHours} 時間／月</span>
          </div>
        </section>

        {canChoosePercent && activePlan === "percent" && (
          <p className="dz-sim-incentive">
            なぜ10%を選ぶと優秀なスタッフがつくのか：稼働ワーカーへのインセンティブを高めることで、社内のエーススタッフが最優先で稼働し、圧倒的な速度でアポを獲得するロジックです。
          </p>
        )}
      </div>
    </div>
  );
}
