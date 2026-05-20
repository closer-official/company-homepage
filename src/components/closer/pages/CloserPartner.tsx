import { DIVIZERO_LINE_URL } from "@/lib/divizero";

export default function CloserPartner() {
  return (
    <>
      <div className="closer-partner-hero">
        <span className="closer-section-label">Partner</span>
        <h1 className="closer-partner-title">
          営業オペレーションを<em>一緒に</em>回す。
        </h1>
        <p className="closer-partner-sub">
          divizeroでは、DM運用・ターゲット選定・アポ獲得を支えるパートナー（オペレーター）を募集しています。
        </p>
        <a
          href={DIVIZERO_LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="closer-btn-gold"
        >
          パートナーについて相談する（公式LINE）
        </a>
      </div>
      <div className="closer-partner-body">
        <p>
          divizeroの営業代行は、データと仕組みで回るオペレーションが核です。その現場を担うパートナーとして、以下のような方を歓迎します。
        </p>
        <p>
          DM送信・返信対応・ターゲットリスト管理・ヒアリングサポートなど。営業経験やSNS運用経験がある方、フリーランスで柔軟に稼働できる方を想定しています。
        </p>
        <p>
          報酬体系・稼働条件の詳細は、公式LINEよりお問い合わせください。エーススタッフにはインセンティブ設計があり、高単価案件を優先配分する仕組みもあります。
        </p>
        <p>※ クリエイター向けの営業代行依頼は、トップページのLINE登録からお進みください。</p>
      </div>
    </>
  );
}
