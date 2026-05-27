"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const HEARING_EMAIL = "handtadanosuke@gmail.com";

const formatYen = (value: number) =>
  `¥${Math.round(value).toLocaleString("ja-JP")}`;

export default function CloserHearingSheetPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [unitPriceGuide, setUnitPriceGuide] = useState("");
  const [monthlyCapacity, setMonthlyCapacity] = useState("");
  const [idealClient, setIdealClient] = useState("");
  const [avoidClient, setAvoidClient] = useState("");

  const [appointmentUnitPrice, setAppointmentUnitPrice] = useState(2000);
  const [commissionRate, setCommissionRate] = useState(10);
  const [sampleProductionPrice, setSampleProductionPrice] = useState(100000);
  const [monthlyUpdateAgreed, setMonthlyUpdateAgreed] = useState(false);
  const [clientPayoutTiming, setClientPayoutTiming] = useState("制作開始時払い");
  const [divizeroChargeTrigger, setDivizeroChargeTrigger] = useState("アポ確定時");

  const [monthlyAppointments, setMonthlyAppointments] = useState(10);
  const [closeRate, setCloseRate] = useState(30);
  const [averageProductionPrice, setAverageProductionPrice] = useState(100000);

  const [penaltyAgreed, setPenaltyAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const minCommissionRate = useMemo(() => {
    if (appointmentUnitPrice === 0) return 15;
    if (appointmentUnitPrice <= 1500) return 12;
    return 8;
  }, [appointmentUnitPrice]);

  useEffect(() => {
    if (commissionRate < minCommissionRate) {
      setCommissionRate(minCommissionRate);
    }
  }, [commissionRate, minCommissionRate]);

  const guaranteeCommissionPart = Math.max(
    0,
    Math.round(sampleProductionPrice * (commissionRate / 100) - appointmentUnitPrice),
  );
  const guaranteeTotal = appointmentUnitPrice + guaranteeCommissionPart;
  const guaranteeMet = guaranteeTotal >= 5000;

  const closedDeals = Math.round(monthlyAppointments * (closeRate / 100));
  const appointmentIncome = monthlyAppointments * appointmentUnitPrice;
  const grossCommission = closedDeals * averageProductionPrice * (commissionRate / 100);
  const settlementCommission = Math.max(0, Math.round(grossCommission - appointmentIncome));
  const monthlyTotalIncome = appointmentIncome + settlementCommission;
  const clientTakeHome = closedDeals * averageProductionPrice - monthlyTotalIncome;

  const planSummary = `【Divizero 料金プラン】
アポ単価：${formatYen(appointmentUnitPrice)}
成約コミッション：${commissionRate}%
クライアントへの入金タイミング：${clientPayoutTiming}
Divizeroへの支払い発生タイミング：${divizeroChargeTrigger}
有効期間：毎月更新（合意済み）
罰則規定：成約不申告時は設定コミッション単価の10倍`;

  const buildMessage = () =>
    `【Divizero ヒアリングシート】
お名前: ${name}
メールアドレス: ${email}
インスタURL: ${instagramUrl}
得意ジャンル・制作スタイル: ${specialties}
制作単価の目安: ${unitPriceGuide}
対応可能な案件数/月: ${monthlyCapacity}
理想のクライアント像: ${idealClient}
避けたい案件・クライアント: ${avoidClient}

【料金プラン】
アポ確定時の単価: ${formatYen(appointmentUnitPrice)}
成約時のコミッション率: ${commissionRate}%
制作単価（最低保証チェック用）: ${formatYen(sampleProductionPrice)}
最低保証チェック: ${guaranteeMet ? "クリア" : "未達"}
クライアントへの入金タイミング: ${clientPayoutTiming}
Divizeroへの支払い発生タイミング: ${divizeroChargeTrigger}

【収支シミュレーター】
月間アポ件数: ${monthlyAppointments}件
成約率: ${closeRate}%
制作単価（平均）: ${formatYen(averageProductionPrice)}
成約件数（自動計算）: ${closedDeals}件
アポ収入: ${formatYen(appointmentIncome)}
成約コミッション: ${formatYen(settlementCommission)}
月間合計収入（Divizero受取分）: ${formatYen(monthlyTotalIncome)}
クライアント手残り: ${formatYen(clientTakeHome)}

月次更新合意: ${monthlyUpdateAgreed ? "同意済み" : "未同意"}
罰則規定同意: ${penaltyAgreed ? "同意済み" : "未同意"}`;

  const handleCopyPlan = async () => {
    try {
      await navigator.clipboard.writeText(planSummary);
      alert("プラン内容をコピーしました。");
    } catch {
      alert("コピーに失敗しました。");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!monthlyUpdateAgreed || !penaltyAgreed) {
      alert("月次更新の合意と罰則規定への同意が必要です。");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("_subject", "Divizero ヒアリングシート送信");
      fd.append("_captcha", "false");
      fd.append("name", name);
      fd.append("email", email);
      fd.append("message", buildMessage());

      await fetch(`https://formsubmit.co/${HEARING_EMAIL}`, {
        method: "POST",
        body: fd,
      });

      setDone(true);
    } catch (err) {
      console.error(err);
      alert("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-28 sm:px-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-10">
          <h1 className="font-heading text-3xl">送信が完了しました</h1>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
            ヒアリング内容を受け付けました。内容確認後、順次ご連絡いたします。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm tracking-[0.08em] text-[var(--text-muted)]">Hearing Sheet</p>
        <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
          Divizero ヒアリングシート
        </h1>
        <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
          基本情報・ターゲット・料金設計・シミュレーションを一度で共有できるシートです。入力内容は
          {` ${HEARING_EMAIL} `}
          へ送信されます。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
          <h2 className="font-heading text-2xl">基本情報</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-[var(--text-muted)]">お名前 *</span>
              <input className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-[var(--text-muted)]">メールアドレス *</span>
              <input type="email" className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
          </div>
          <div className="mt-5 space-y-5">
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">インスタURL *</span>
              <input className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} required />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">得意ジャンル・制作スタイル *</span>
              <textarea className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" rows={3} value={specialties} onChange={(e) => setSpecialties(e.target.value)} required />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm text-[var(--text-muted)]">制作単価の目安 *</span>
                <input className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" value={unitPriceGuide} onChange={(e) => setUnitPriceGuide(e.target.value)} placeholder="例: 80,000円〜150,000円" required />
              </label>
              <label className="space-y-2">
                <span className="text-sm text-[var(--text-muted)]">対応可能な案件数/月 *</span>
                <input className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" value={monthlyCapacity} onChange={(e) => setMonthlyCapacity(e.target.value)} placeholder="例: 3〜5件" required />
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
          <h2 className="font-heading text-2xl">ターゲット設定</h2>
          <div className="mt-6 space-y-5">
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">理想のクライアント像 *</span>
              <textarea className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" rows={3} value={idealClient} onChange={(e) => setIdealClient(e.target.value)} required />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">避けたい案件・クライアント *</span>
              <textarea className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2" rows={3} value={avoidClient} onChange={(e) => setAvoidClient(e.target.value)} required />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
          <h2 className="font-heading text-2xl">Section 1｜料金プラン設定</h2>
          <div className="mt-6 space-y-6">
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">アポ単価: {formatYen(appointmentUnitPrice)}</span>
              <input type="range" min={0} max={5000} step={100} value={appointmentUnitPrice} onChange={(e) => setAppointmentUnitPrice(Number(e.target.value))} className="w-full accent-[var(--terracotta)]" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">成約コミッション率: {commissionRate}%（下限 {minCommissionRate}%）</span>
              <input type="range" min={minCommissionRate} max={20} step={1} value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="w-full accent-[var(--terracotta)]" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">制作単価（最低保証チェック用）: {formatYen(sampleProductionPrice)}</span>
              <input type="range" min={10000} max={1000000} step={10000} value={sampleProductionPrice} onChange={(e) => setSampleProductionPrice(Number(e.target.value))} className="w-full accent-[var(--terracotta)]" />
            </label>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-base)] p-4 text-sm leading-relaxed">
              制作単価{sampleProductionPrice.toLocaleString("ja-JP")}円の場合：
              アポ{appointmentUnitPrice.toLocaleString("ja-JP")}円 + 成約時
              {guaranteeCommissionPart.toLocaleString("ja-JP")}円 = 合計
              {guaranteeTotal.toLocaleString("ja-JP")}円
              <span className={guaranteeMet ? "text-green-700" : "text-red-700"}>
                {" "}
                {guaranteeMet ? "✅ 最低5,000円クリア" : "⚠️ 最低5,000円未達"}
              </span>
            </div>

            <label className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
              <input type="checkbox" checked={monthlyUpdateAgreed} onChange={(e) => setMonthlyUpdateAgreed(e.target.checked)} className="mt-1 accent-[var(--terracotta)]" required />
              <span>このプランは毎月変更可能であることに同意します（必須）。</span>
            </label>

            <div className="space-y-2">
              <p className="text-sm text-[var(--text-muted)]">クライアントへの入金タイミング</p>
              <label className="block"><input type="radio" name="clientPayoutTiming" value="制作開始時払い" checked={clientPayoutTiming === "制作開始時払い"} onChange={(e) => setClientPayoutTiming(e.target.value)} className="mr-2 accent-[var(--terracotta)]" />制作開始時払い（制作開始時に全額振込）</label>
              <label className="block"><input type="radio" name="clientPayoutTiming" value="納品後払い" checked={clientPayoutTiming === "納品後払い"} onChange={(e) => setClientPayoutTiming(e.target.value)} className="mr-2 accent-[var(--terracotta)]" />納品後払い（納品完了後に全額振込）</label>
              <label className="block"><input type="radio" name="clientPayoutTiming" value="分割払い" checked={clientPayoutTiming === "分割払い"} onChange={(e) => setClientPayoutTiming(e.target.value)} className="mr-2 accent-[var(--terracotta)]" />分割払い（制作開始時50% + 納品後50%）</label>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-[var(--text-muted)]">Divizeroへの支払い発生タイミング</p>
              <label className="block"><input type="radio" name="divizeroChargeTrigger" value="アポ確定時" checked={divizeroChargeTrigger === "アポ確定時"} onChange={(e) => setDivizeroChargeTrigger(e.target.value)} className="mr-2 accent-[var(--terracotta)]" />アポ確定時に発生（判定基準を満たした翌営業日）</label>
              <label className="block"><input type="radio" name="divizeroChargeTrigger" value="成約時" checked={divizeroChargeTrigger === "成約時"} onChange={(e) => setDivizeroChargeTrigger(e.target.value)} className="mr-2 accent-[var(--terracotta)]" />成約時に発生（クライアント入金直後）</label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
          <h2 className="font-heading text-2xl">Section 2｜収支シミュレーター</h2>
          <div className="mt-6 space-y-6">
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">月間アポ件数: {monthlyAppointments}件</span>
              <input type="range" min={1} max={50} step={1} value={monthlyAppointments} onChange={(e) => setMonthlyAppointments(Number(e.target.value))} className="w-full accent-[var(--terracotta)]" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">成約率: {closeRate}%</span>
              <input type="range" min={0} max={100} step={1} value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} className="w-full accent-[var(--terracotta)]" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-[var(--text-muted)]">制作単価（平均）: {formatYen(averageProductionPrice)}</span>
              <input type="range" min={10000} max={1000000} step={10000} value={averageProductionPrice} onChange={(e) => setAverageProductionPrice(Number(e.target.value))} className="w-full accent-[var(--terracotta)]" />
            </label>
          </div>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] p-4 text-sm leading-relaxed">
            <p>月間アポ件数：{monthlyAppointments}件</p>
            <p>成約件数（自動計算）：{monthlyAppointments} × {closeRate}% = {closedDeals}件</p>
            <p>アポ収入：{formatYen(appointmentIncome)}</p>
            <p>成約コミッション：{formatYen(settlementCommission)}</p>
            <p>月間合計収入（Divizero受取分）：{formatYen(monthlyTotalIncome)}</p>
            <p>クライアント手残り：{formatYen(clientTakeHome)}</p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[var(--text-muted)]">
            ※ 成約率はクライアント（制作者）の対応・提案力によって決まるものであり、Divizeroが保証するものではありません。Divizeroの役割は見込み客をクライアントのDMへお連れするところまでです。
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8">
          <h2 className="font-heading text-2xl">Section 3｜不正成約の罰則規定</h2>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
            万が一、成約が発生したにもかかわらず成約していないと虚偽の申告をされた場合、発覚時点での設定成約コミッション単価の10倍をDivizeroへお支払いいただきます。本規定はプラン合意時点で効力が生じます。
          </p>
          <label className="mt-5 flex items-start gap-3 text-sm text-[var(--text-muted)]">
            <input type="checkbox" checked={penaltyAgreed} onChange={(e) => setPenaltyAgreed(e.target.checked)} className="mt-1 accent-[var(--terracotta)]" required />
            <span>上記罰則規定に同意します（必須）。</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleCopyPlan} className="rounded-full border border-[var(--border)] px-5 py-2 text-sm">
            プランをコピーする
          </button>
          <button type="submit" disabled={submitting} className="rounded-full bg-[var(--terracotta)] px-6 py-2 text-sm text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "送信中..." : "ヒアリングシートを送信する"}
          </button>
        </div>
      </form>
    </section>
  );
}
