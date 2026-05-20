type Mark = "best" | "good" | "note" | "bad";

type CompareCell = {
  mark: Mark;
  text: string;
};

type CompareRow = {
  label: string;
  other: CompareCell;
  ours: CompareCell;
};

const MARK_SYMBOL: Record<Mark, string> = {
  best: "◎",
  good: "○",
  note: "△",
  bad: "✕",
};

const COMPARE_ROWS: CompareRow[] = [
  {
    label: "初期費用",
    other: { mark: "bad", text: "あり（数万円〜）" },
    ours: { mark: "best", text: "ゼロ" },
  },
  {
    label: "月額費用",
    other: { mark: "bad", text: "あり（固定）" },
    ours: { mark: "best", text: "ゼロ" },
  },
  {
    label: "料金体系",
    other: { mark: "note", text: "成果に関わらず発生" },
    ours: { mark: "best", text: "完全成果報酬" },
  },
  {
    label: "アポ単価",
    other: { mark: "bad", text: "1.5万円〜" },
    ours: { mark: "best", text: "5,000円〜" },
  },
  {
    label: "成約時プラン",
    other: { mark: "bad", text: "なし" },
    ours: { mark: "good", text: "単価5万円超は10%プランも選択可" },
  },
  {
    label: "縛り・解約リスク",
    other: { mark: "note", text: "契約期間あり多い" },
    ours: { mark: "best", text: "縛りなし・いつでも終了可" },
  },
  {
    label: "DM返信率",
    other: { mark: "note", text: "2〜4%（業界平均）" },
    ours: { mark: "best", text: "40%（実績）" },
  },
  {
    label: "営業アプローチ",
    other: { mark: "note", text: "テンプレート使い回し多い" },
    ours: { mark: "best", text: "アカウント個別設計" },
  },
  {
    label: "URL誘導",
    other: { mark: "note", text: "あり（不信感につながる）" },
    ours: { mark: "best", text: "なし・テキストのみ" },
  },
  {
    label: "対象ジャンル",
    other: { mark: "note", text: "限定的なことが多い" },
    ours: { mark: "best", text: "SNS無形商材なら全対応" },
  },
  {
    label: "導入までの手間",
    other: { mark: "note", text: "契約・初期設定など多い" },
    ours: { mark: "best", text: "LINE登録のみ" },
  },
];

function CompareCellView({ cell }: { cell: CompareCell }) {
  return (
    <span className="dz-cmp-cell">
      <span className={`dz-cmp-mark dz-cmp-mark--${cell.mark}`}>
        {MARK_SYMBOL[cell.mark]}
      </span>
      <span className="dz-cmp-text">{cell.text}</span>
    </span>
  );
}

export default function DivizeroCompareTable() {
  return (
    <div className="dz-cmp">
      <div className="dz-cmp-table-wrap">
        <table className="dz-cmp-table">
          <thead>
            <tr>
              <th scope="col" className="dz-cmp-th-label">
                比較項目
              </th>
              <th scope="col" className="dz-cmp-th-other">
                他社（業界平均）
              </th>
              <th scope="col" className="dz-cmp-th-ours">
                divizero
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="dz-cmp-row-label">
                  {row.label}
                </th>
                <td>
                  <CompareCellView cell={row.other} />
                </td>
                <td className="dz-cmp-td-ours">
                  <CompareCellView cell={row.ours} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="dz-cmp-legend">
        記号の意味　
        <span className="dz-cmp-mark dz-cmp-mark--best">◎</span> 優れている　
        <span className="dz-cmp-mark dz-cmp-mark--good">○</span> 良い　
        <span className="dz-cmp-mark dz-cmp-mark--note">△</span> 普通・注意点あり　
        <span className="dz-cmp-mark dz-cmp-mark--bad">✕</span> 劣っている
      </p>
    </div>
  );
}
