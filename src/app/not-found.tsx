import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center px-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">404</p>
      <h1 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">ページが見つかりません</h1>
      <p className="mt-4 max-w-md text-center text-stone-600">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
      >
        トップへ戻る
      </Link>
    </div>
  );
}
