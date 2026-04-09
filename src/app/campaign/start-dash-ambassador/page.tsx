import type { Metadata } from 'next';
import SimulationCalculator from './SimulationCalculator';

export const metadata: Metadata = {
  title: '【先着10名】CLOSERスタートダッシュ・アンバサダー募集 | Tadanosuke Closer',
  description:
    'SNSで動画をバズらせて、CLOSERの初期メンバーとして活躍。先着10名で3,000pt確定付与。紹介継続報酬で安定収益も。',
};

export default function StartDashAmbassadorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
            【先着10名】CLOSERスタートダッシュ・アンバサダー募集
          </h1>
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
            公式
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            高単価
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            SNS
          </span>
        </div>

        <p className="mt-6 text-base leading-relaxed text-zinc-300">
          SNSで動画をバズらせて、次世代の広告プラットフォーム「CLOSER」の初期メンバーとして活躍しませんか？
          今回はリリースを記念して、圧倒的な集客力を発揮してくれた方に特別なボーナスをご用意しました。
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white">■ 募集概要</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            あなたが普段使っているSNS（TikTok、Instagram、YouTube、Threads、Xなど）で、CLOSERの魅力を発信してください。
            条件を達成した先着10名の方に、即時報酬を付与します。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white">■ 報酬内容</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
            <li>
              <span className="font-semibold text-white">
                先着10名限定：3,000pt（3,000円相当）を確定付与
              </span>
            </li>
            <li className="text-zinc-400">
              ※お一人様最大2回（合計6,000pt）まで獲得可能です。
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white">
            ■ 報酬発生の条件
          </h2>

          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-blue-200">
                1. 【リアル紹介枠】SNSを使わない場合
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-zinc-300">
                <li>
                  招待コード経由で新規ユーザー10名がLINE連携を完了すること
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-blue-200">
                2. 【SNS発信枠】SNSを使う場合
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                以下の3条件を「1つの投稿内」で同時に達成すること
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-zinc-300">
                <li>1万再生以上</li>
                <li>300いいね以上</li>
                <li>
                  その動画経由での新規ユーザー獲得5名以上（LINE連携完了）
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
            <h3 className="text-sm font-semibold text-green-200">
              達成できるケース（報酬確定！）
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
              <li>
                <span className="font-medium text-zinc-200">例1：</span>
                TikTokで1本の動画を投稿し、1.2万再生、400いいね、紹介リンクから6名が登録した。
              </li>
              <li>
                <span className="font-medium text-zinc-200">例2：</span>
                SNSは使わず、大学の友人やバイト先の仲間に直接紹介し、合計10名が招待コードを入力してLINE連携した。
              </li>
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h3 className="text-sm font-semibold text-amber-200">
              報酬の対象外となるケース（残念！）
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
              <li>
                <span className="font-medium text-zinc-200">例：</span>
                3本の動画を投稿し、合計で1.5万再生に達したが、どの動画も1本単体では1万再生を超えていない。
              </li>
              <li>
                <span className="font-medium text-zinc-200">例：</span>
                SNSで2万再生されたが、いいねが100しかなく、登録者も3名だった。
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white">
            ■ アンバサダーだけが手にする「継続的な報酬」の仕組み
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            今回の3,000円はあくまでスタートダッシュのボーナスです。CLOSERの真の魅力は、あなたが紹介したユーザーが活動し続ける限り、あなたに報酬が発生し続ける「紹介継続報酬（親報酬）」にあります。
          </p>

          <div className="mt-6">
            <SimulationCalculator />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-zinc-300">
            「一度のバズ」を、あなたの将来を支える安定した収益源へと変えるチャンスです。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white">
            ■ よくあるご質問（Q&A）
          </h2>
          <dl className="mt-4 space-y-5 text-sm">
            <div>
              <dt className="font-medium text-zinc-200">
                Q. これってねずみ講とかの犯罪じゃないんですか？
              </dt>
              <dd className="mt-2 text-zinc-400">
                A. 全く違います。ねずみ講は参加費を取って下からお金を巻き上げる仕組みですが、CLOSERは企業（オーナー）が支払う広告費を紹介者に分配する健全なマーケティングモデルです。あなたが費用を支払うことは一切ありません。
              </dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-200">
                Q. なぜこんなに高い報酬がもらえるんですか？
              </dt>
              <dd className="mt-2 text-zinc-400">
                A. 企業がテレビCMなどに投じる「無駄な広告費」をカットし、実際に商品を広めてくれた紹介者に直接還元しているからです。
              </dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-200">
                Q. 本当に出金できるんですか？
              </dt>
              <dd className="mt-2 text-zinc-400">
                A. もちろんです。所定の審査を経て付与されたポイントは、ギフティ経由での交換や、ランクに応じた銀行振込が可能です。
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">
            ■ 注意事項・免責事項
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
            <li>
              <span className="font-medium text-zinc-200">
                透明性の確保：
              </span>
              投稿には必ず「#PR」等のハッシュタグ、または広告であることを明示してください。炎上商法や、ユーザーを騙す不適切な誘導は認められません。
            </li>
            <li>
              <span className="font-medium text-zinc-200">先着順の厳守：</span>
              本キャンペーンは予算上限に達し次第、終了いたします。終了後に条件を達成しても報酬は支払われません。
            </li>
            <li>
              <span className="font-medium text-zinc-200">
                審査の最終決定権：
              </span>
              最終的な判断は運営の目視審査に基づきます。数値の改ざん、Bot利用、その他不正と判断された場合は対象外です。
            </li>
            <li>
              <span className="font-medium text-zinc-200">投稿の維持：</span>
              報酬付与後3ヶ月以内の投稿削除・非公開化が確認された場合、付与ポイントを無効とする場合があります。
            </li>
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">
            ■ 不正および疑わしい行為への対応
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
            <li>
              <span className="font-medium text-zinc-200">決定権：</span>
              運営が本キャンペーンの趣旨に反すると判断した場合、理由を問わず付与を拒否できるものとします。
            </li>
            <li>
              <span className="font-medium text-zinc-200">後日発覚時：</span>
              ポイント付与後に不正（即削除、Bot利用等）が判明した場合、ポイント没収に加え、法的措置を含む厳正な対処を行います。
            </li>
            <li>
              <span className="font-medium text-zinc-200">変更・中止権：</span>
              運営は事前の告知なく本キャンペーンの内容変更、または中止を決定する権利を有します。
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
