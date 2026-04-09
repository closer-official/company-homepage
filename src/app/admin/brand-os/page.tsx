export default function BrandOsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold">Brand OS</h1>
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-200">
            稼働中
          </span>
        </div>
        <p className="mt-4 text-sm text-zinc-300">
          受注生産型アパレルOS
        </p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-200">
          <p>
            従来、アパレルブランドを立ち上げるには40万円以上の初期投資が必要でした。
            在庫を抱え、売れなければ赤字。多くの才能ある若者が、この金銭的リスクで挑戦を諦めてきました。
          </p>
          <p className="font-semibold text-white">
            Brand OSは、その構造を根本から覆します。
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>登録料：¥0</li>
            <li>在庫リスク：ゼロ（受注生産型）</li>
            <li>最小ロット：1枚から発注可能</li>
            <li>収益モデル：売上の10〜15%のみ</li>
          </ul>
          <p>
            あなたが成功した時だけ、収益の一部をいただきます。失敗しても、あなたは何も失いません。
            スマホ一つあれば、何度でもアパレルブランドに挑戦できます。
          </p>
        </div>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            対象ユーザー
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            アパレルを始めたい学生 / 自分のブランドを持ちたいインフルエンサー / 
            在庫リスクと隣り合わせの売れないアイドル・アーティスト
          </p>
        </div>
        <div className="mt-10 space-y-4">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            href="https://brandos.closer-official.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brand OSを開く →
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
