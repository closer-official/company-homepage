import { DIVIZERO_LINE_URL } from "@/lib/divizero";

export default function CloserPartner() {
  return (
    <div className="dz-subpage">
      <div className="closer-partner-hero dz-reveal is-visible">
        <span className="closer-section-label">Partner</span>
        <h1 className="closer-partner-title closer-page-hero-title--ruled">
          営業オペレーションを<em>一緒に</em>回す。
        </h1>
        <p className="closer-partner-sub">
          divizeroでは、DM運用・ターゲット選定・アポ獲得を支えるパートナー（オペレーター）を随時募集しています。
        </p>
        <a
          href={DIVIZERO_LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="closer-btn-gold closer-btn-gold--shine"
        >
          パートナーについて相談する（公式LINE）
        </a>
      </div>

      <div className="closer-partner-body dz-reveal">
        <p>
          divizeroの営業代行は、データと仕組みで動くオペレーションが核心です。その現場を担うパートナーとして、以下のような方を歓迎します。
        </p>
        <p>
          DM送信・返信対応・ターゲットリスト管理・ヒアリングサポートなど。営業経験やSNS運用経験がある方、フリーランスとして柔軟に稼働できる方を想定しています。
        </p>
        <p>
          成果報酬型の仕組みで動くため、頑張った分だけ収入に直結します。報酬体系・稼働条件の詳細は、公式LINEよりお問い合わせください。
        </p>
        <p>
          ※ クリエイター向けの営業代行依頼は、トップページのLINE登録からお進みください。
        </p>
      </div>
    </div>
  );
}
