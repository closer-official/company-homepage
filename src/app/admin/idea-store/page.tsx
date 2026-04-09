export default function IdeaStorePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold">Idea Store</h1>
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-200">
            稼働中
          </span>
        </div>
        <p className="mt-4 text-sm text-zinc-300">
          市場調査型アプリ開発支援
        </p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-200">
          <p>
            アプリ開発者にとって、最大のリスクは「作ったのに誰も使わない」こと。
            開発に時間とお金を投資したのに、市場に刺さらなければすべてが水の泡です。
          </p>
          <p className="font-semibold text-white">
            Idea Storeは、その市場リスクを最小化します。
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>「こんなアプリあったら使う？」視聴者の声を集めて市場調査</li>
            <li>需要が見えてから開発するので、失敗リスクが激減</li>
            <li>開発費用：¥0（成功報酬型）</li>
            <li>収益モデル：利益が出た場合のみ、収益の5〜10%</li>
          </ul>
          <p>
            アイデアを持つ人と、開発者をつなぐマーケット。利益が出るまで、一切費用はかかりません。
            金はないが才能はある開発者のための、完全リスクゼロの登竜門です。
          </p>
        </div>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            対象ユーザー
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            アプリ開発者（個人・学生含む） / アイデアを持つが技術がない人 / 
            市場調査せずに作って失敗した経験がある人
          </p>
        </div>
        <div className="mt-10 space-y-4">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            href="https://ideastore.closer-official.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Idea Storeを開く →
          </a>
          <div>
            <a className="text-sm text-zinc-300 hover:text-white" href="/admin">
              ← 実績一覧へ戻る
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
