'use client';

import { useState } from 'react';

// 7万円のときに1万円になる率 = 1/7 ≒ 14.3%
const REFERRAL_RATE = 1 / 7;

export default function SimulationCalculator() {
  const [count, setCount] = useState(10);
  const [avgMonthly, setAvgMonthly] = useState(50000);

  const parentMonthly = Math.floor(count * avgMonthly * REFERRAL_RATE);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white">
        収益シミュレーション
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        連れてくる人数と、子が獲得する月額報酬の目安を入力すると、あなたの月額収益（紹介継続報酬・約14%）が算出されます。
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-baseline justify-between">
            <label className="text-sm font-medium text-zinc-300">
              連れてくる人数（子の人数）
            </label>
            <span className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={500}
                value={count}
                onChange={(e) =>
                  setCount(
                    Math.min(500, Math.max(1, Number(e.target.value) || 1))
                  )
                }
                className="w-20 rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-right text-lg font-semibold text-white tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-sm text-zinc-400">人</span>
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={200}
            value={Math.min(count, 200)}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-blue-500"
          />
          <div className="mt-1 flex justify-between text-xs text-zinc-500">
            <span>1人</span>
            <span>200人</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label className="text-sm font-medium text-zinc-300">
              1人あたりの平均月額案件報酬（子の報酬）
            </label>
            <span className="text-lg font-semibold text-white tabular-nums">
              ¥{avgMonthly.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={200000}
            step={5000}
            value={avgMonthly}
            onChange={(e) => setAvgMonthly(Number(e.target.value))}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-blue-500"
          />
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              min={0}
              max={500000}
              step={1000}
              value={avgMonthly}
              onChange={(e) =>
                setAvgMonthly(Math.min(500000, Math.max(0, Number(e.target.value) || 0)))
              }
              className="w-32 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="flex items-center text-sm text-zinc-400">円/月</span>
          </div>
          <div className="mt-1 flex justify-between text-xs text-zinc-500">
            <span>¥0</span>
            <span>¥20万</span>
          </div>
        </div>

        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
          <p className="text-sm text-zinc-300">あなたの想定月額収益（紹介継続報酬・約14%）</p>
          <p className="mt-2 text-3xl font-bold text-white tabular-nums">
            ¥{parentMonthly.toLocaleString()}
            <span className="ml-1 text-lg font-normal text-zinc-400">/月</span>
          </p>
        </div>
      </div>
    </div>
  );
}
