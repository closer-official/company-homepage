"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatedNumber } from "./divizero/AnimatedNumber";

const MIN_PRICE = 10_000;
const MAX_PRICE = 300_000;
const PRICE_STEP = 5_000;
const MIN_APO = 1;
const MAX_APO = 50;
const MIN_CLOSE_RATE = 10;
const MAX_CLOSE_RATE = 80;
const THRESHOLD = 50_000;
const FIXED_APO_FEE = 5_000;
const HOURS_PER_APO = 1;

type PlanId = "fixed" | "percent";

export default function DivizeroRewardSimulator() {
  const [unitPrice, setUnitPrice] = useState(50_000);
  const [apoCount, setApoCount] = useState(10);
  const [closeRate, setCloseRate] = useState(30);
  const [plan, setPlan] = useState<PlanId>("fixed");

  const canChoosePercent = unitPrice > THRESHOLD;

  useEffect(() => {
    if (!canChoosePercent && plan === "percent") {
      setPlan("fixed");
    }
  }, [canChoosePercent, plan]);

  const activePlan: PlanId = canChoosePercent ? plan : "fixed";

  const calc = useMemo(() => {
    const rate = closeRate / 100;
    const expectedCloses = apoCount * rate;
    const totalSales = Math.round(expectedCloses * unitPrice);
    const apoFee = apoCount * FIXED_APO_FEE;
    const closeBonus =
      activePlan === "percent"
        ? Math.round(expectedCloses * unitPrice * 0.1)
        : 0;
    const totalFee = apoFee + closeBonus;
    const netProfit = totalSales - totalFee;
    const timeSavedHours = apoCount * HOURS_PER_APO;

    return {
      expectedCloses,
      totalSales,
      apoFee,
      closeBonus,
      totalFee,
      netProfit,
      timeSavedHours,
    };
  }, [apoCount, unitPrice, activePlan, closeRate]);

  return (
    <div className="dz-sim dz-glass-card dz-reveal" id="simulator">
      <div className="dz-sim-header">
        <span className="dz-label">Simulator</span>
        <h2 className="dz-section-title dz-section-title--ruled">
          報酬シミュレーター
        </h2>
        <p className="dz-section-lead">
          平均単価・アポ件数・成約率を動かすと、手残りと営業時間の削減イメージがその場で試算できます。
        </p>
      </div>

      <div className="dz-sim-body">
        <section className="dz-sim-block">
          <h3 className="dz-sim-block-title">1. パラメータを設定</h3>

          <div className="dz-sim-control">
            <div className="dz-sim-control-top">
              <label htmlFor="dz-unit-price">あなたのサービスの平均単価（税抜）</label>
              <span className="dz-sim-value dz-num">
                <AnimatedNumber value={unitPrice} format="yen" />
              </span>
            </div>
            <input
              id="dz-unit-price"
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={PRICE_STEP}
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="dz-sim-range"
              style={
                {
                  "--dz-range-pct": `${((unitPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                } as CSSProperties
              }
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
              <span className="dz-sim-value dz-num">
                <AnimatedNumber value={apoCount} format="count" />
                <span className="dz-sim-value-unit">件</span>
              </span>
            </div>
            <input
              id="dz-apo-count"
              type="range"
              min={MIN_APO}
              max={MAX_APO}
              step={1}
              value={apoCount}
              onChange={(e) => setApoCount(Number(e.target.value))}
              className="dz-sim-range"
              style={
                {
                  "--dz-range-pct": `${((apoCount - MIN_APO) / (MAX_APO - MIN_APO)) * 100}%`,
                } as CSSProperties
              }
            />
            <div className="dz-sim-range-labels">
              <span>1件</span>
              <span>25件</span>
              <span>50件</span>
            </div>
          </div>

          <div className="dz-sim-control">
            <div className="dz-sim-control-top">
              <label htmlFor="dz-close-rate">想定成約率</label>
              <span className="dz-sim-value dz-num">
                <AnimatedNumber value={closeRate} format="percent" />
              </span>
            </div>
            <input
              id="dz-close-rate"
              type="range"
              min={MIN_CLOSE_RATE}
              max={MAX_CLOSE_RATE}
              step={5}
              value={closeRate}
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="dz-sim-range"
              style={
                {
                  "--dz-range-pct": `${((closeRate - MIN_CLOSE_RATE) / (MAX_CLOSE_RATE - MIN_CLOSE_RATE)) * 100}%`,
                } as CSSProperties
              }
            />
            <div className="dz-sim-range-labels">
              <span>10%</span>
              <span>45%</span>
              <span>80%</span>
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

        <div className="dz-sim-plans">
          <button
            type="button"
            className={`dz-sim-plan ${activePlan === "fixed" ? "is-active" : ""}`}
            onClick={() => setPlan("fixed")}
            aria-pressed={activePlan === "fixed"}
          >
            <div className="dz-sim-plan-text">
              <span className="dz-sim-plan-name">プランA：単価型</span>
              <span className="dz-sim-plan-desc">アポ確定ごと 5,000円</span>
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
              <span className="dz-sim-plan-desc">アポ5,000円 ＋ 成約時10%</span>
            </div>
            <span className="dz-sim-plan-radio" aria-hidden />
          </button>
        </div>

        <section className="dz-sim-block dz-sim-result-block">
          <h3 className="dz-sim-block-title">2. 試算結果（推定・期待値）</h3>

          <div className="dz-sim-result dz-glass-card">
            <div className="dz-sim-result-main">
              <p className="dz-sim-result-label">
                想定される総売上（成約率 {closeRate}%・約
                {calc.expectedCloses.toFixed(1)}件成約）
              </p>
              <p className="dz-sim-result-total dz-num">
                <AnimatedNumber value={calc.totalSales} format="yen" />
              </p>
            </div>

            <div className="dz-sim-result-row dz-sim-result-row--highlight">
              <span>アポ確定時の報酬（5,000円×{apoCount}件）</span>
              <span className="dz-sim-result-fee dz-num">
                −<AnimatedNumber value={calc.apoFee} format="yen" />
              </span>
            </div>

            {activePlan === "percent" && (
              <div className="dz-sim-result-row">
                <span>成約時の追加報酬（単価の10%）</span>
                <span className="dz-sim-result-fee dz-num">
                  −<AnimatedNumber value={calc.closeBonus} format="yen" />
                </span>
              </div>
            )}

            <div className="dz-sim-result-row">
              <span>divizeroへの支払手数料（合計）</span>
              <span className="dz-sim-result-fee dz-num">
                −<AnimatedNumber value={calc.totalFee} format="yen" />
              </span>
            </div>

            <div className="dz-sim-result-row dz-sim-result-row--net">
              <span>あなたの実質手残り</span>
              <span className="dz-sim-result-net dz-num dz-text-gold-gradient">
                <AnimatedNumber value={calc.netProfit} format="yen" />
              </span>
            </div>
          </div>

          <div className="dz-sim-time dz-glass-card">
            <span className="dz-sim-time-mark" aria-hidden>
              ◆
            </span>
            <span className="dz-sim-time-label">削減される営業アプローチ時間</span>
            <span className="dz-sim-time-value dz-num">
              約 <AnimatedNumber value={calc.timeSavedHours} format="hours" />{" "}
              時間／月
            </span>
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
