# divizero.jp 完全仕様書 v2.0
## Claude Code 実装指示書

> v1からの変更点：①ヒーローコピー刷新 ②OEM秘匿（提携先固有名を全削除・数字のみ借用）③ローディング/オープニング演出を追加 ④離脱対策の構成変更（フック先出し・CTA分散・2層分岐・説得セクションの軽量化）

---

## 0. このサイトの唯一の仕事

「気軽に相談できる人がここにいる」と伝え、LINE/DMへ誘導すること。
販売・決済・契約は行わない。

**ターゲット：** X・インスタで発信している個人事業主・コンサル・アフィリエイター・無形商材セラー
**ターゲットは2層に分かれる（重要）：**
- **A層**：LPが必要と分かっていて、頼み先を探している → 最短で実績・価格・CTAへ
- **B層**：LPの必要性に気づいていない → 説得セクションでじっくり納得させる
→ ヒーローで両層を受け、それぞれ別の動線に流す設計にする

**ゴール：** LINE または X DM への誘導

---

## ★ OEM秘匿ルール（最重要・全セクション共通）★

このサイトは制作主体を秘匿するOEM形式で運用する。以下を厳守：

- **「HomuPa!」「大井」など提携先の固有名を一切書かない**
- 制作体制に触れる時は固有名を出さず体制だけ示す：
  「制作パートナーと連携して」「信頼できる制作チームと」「私が窓口となり〜」
- **数字的権威だけは借りる**（主語を消して事実として置く）：
  ○ OK：「累計1,000サイト以上の制作体制」「1,000を超える実績をもとに」
  × NG：「制作チームHomuPa!が」「〜が担当します」
- 「1人で全部やるの?」という不審を避けるため、制作は伏せても"体制がある"ことは示す

---

## 1. 技術スタック

```
HTML5 / CSS3 / Vanilla JavaScript（フレームワーク不使用）
フォント：Google Fonts（Noto Sans JP + 英字 Plus Jakarta Sans）
イラスト・アイコン：SVG インライン（全てコード生成）
レスポンシブ：モバイルファースト（375px〜）
アニメーション：IntersectionObserver によるスクロール演出 + ローディング/オープニング
外部依存：Google Fonts のみ
```

---

## 2. デザイントークン

```css
:root {
  --color-bg:         #FAFAF8;
  --color-surface:    #FFFFFF;
  --color-surface-2:  #F4F4F0;
  --color-ink:        #1A1A1A;
  --color-ink-sub:    #6B6B6B;
  --color-accent:     #3D6B4F;   /* 深い緑 */
  --color-accent-lt:  #EBF2EE;
  --color-border:     #E8E8E4;
  --color-cta:        #1A1A1A;
  --color-cta-text:   #FFFFFF;

  --font-display:     'Plus Jakarta Sans', sans-serif;
  --font-body:        'Noto Sans JP', sans-serif;

  --text-xs:0.75rem; --text-sm:0.875rem; --text-base:1rem;
  --text-lg:1.125rem; --text-xl:1.375rem; --text-2xl:1.75rem;
  --text-3xl:2.25rem; --text-4xl:3rem;

  --space-section: 96px;
  --space-section-mobile: 64px;
  --max-width: 760px;
  --max-width-wide: 1040px;

  --radius-sm:8px; --radius-md:16px; --radius-lg:24px; --radius-pill:999px;
}
```

**署名要素：** テキスト中の緑の下線アクセント。線画スタイル（stroke only）のSVGで統一。余白多め。

---

## 3. ローディング & オープニング演出（v2新規）

### 3-1. ローディング（読み込み中）

```
真っ白回避。オフホワイト（--color-bg）の全画面オーバーレイ。
中央に「Divizero」ロゴ（テキスト・--color-accent）。
ロゴ下に細い下線が左→右へ伸びるアニメーション（読み込みプログレス風）。
※実際の読み込み完了 or 最低1.2秒経過のどちらか遅い方で次へ。
```

### 3-2. オープニング（ロゴ → ページ）

```
読み込み完了後：
1. ロゴが中央でふわっと定位（scale 0.96→1.0, opacity 0→1）0.4秒
2. 0.3秒キープ
3. ロゴが上へスッと退場しながらフェードアウト（translateY -20px, opacity→0）0.5秒
4. 同時にオーバーレイが上方向にワイプして消える
5. ヒーローのコンテンツが順次フェードイン（後述）
```

### 3-3. 初回のみ再生（必須）

```javascript
// 2回目以降の訪問では演出をスキップ（鬱陶しさ回避）
// ※Claude.ai内アーティファクトでは sessionStorage 不可。本番Claude Code実装でのみ有効
if (sessionStorage.getItem('divizero_visited')) {
  // オーバーレイを即時非表示、ヒーローを即表示
  document.getElementById('loader').style.display = 'none';
} else {
  // 演出を再生
  runIntro();
  sessionStorage.setItem('divizero_visited', '1');
}
```

```css
#loader {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--color-bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.loader-logo {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-accent);
  letter-spacing: 0.04em;
}
.loader-bar {
  margin-top: 14px; height: 2px; width: 0;
  background: var(--color-accent);
  animation: loaderBar 1.2s ease forwards;
}
@keyframes loaderBar { to { width: 120px; } }

@media (prefers-reduced-motion: reduce) {
  #loader { display: none !important; }
}
```

---

## 4. ページ構成（全11ブロック）

```
0  ナビ
1  Hero（2層分岐の入口）
2  フック1行（最強論点を先出し）＋CTA①
3  共感（こんな方へ・3カード）
4  なぜページなのか（説得・見出し先行・軽量化）＋CTA②
5  できること ＋CTA③
6  相談の流れ ＋CTA④
7  実績（数字借用）＋CTA⑤
8  運営者（固有名なし）
9  FAQ（固有名なし・数字借用）
10 CTA（最終・ダーク反転）
   フッター
```

**CTAを5箇所＋ヒーロー＋最終に分散**：人は「刺さった瞬間」に動く。最後まで読ませてから決めさせない。刺さりどころの隣に必ずボタンを置く。

---

### SECTION 0：ナビゲーション

```html
<!-- ロゴSVG：÷記号の横棒がゼロを貫通するデザイン。ChatGPT生成PNGを元に再現 -->
<!-- カラー：ネイビー #2D3A4A（÷の点・横棒・テキスト）、スレートブルー #6B8CAE（0の文字） -->
<nav class="site-nav">
  <a href="#" class="nav-logo" aria-label="Divizero トップへ">
    <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- ÷ 記号：上の点 -->
      <circle cx="8" cy="10" r="3" fill="#2D3A4A"/>
      <!-- ÷ 記号：下の点 -->
      <circle cx="8" cy="22" r="3" fill="#2D3A4A"/>
      <!-- ÷ 記号：横棒（ゼロを貫通） -->
      <line x1="4" y1="16" x2="36" y2="16" stroke="#2D3A4A" stroke-width="2.5" stroke-linecap="round"/>
      <!-- 0 の文字（スレートブルー・横棒が貫通している） -->
      <ellipse cx="28" cy="16" rx="10" ry="13" stroke="#6B8CAE" stroke-width="2.5" fill="none"/>
      <!-- テキスト "divizero" -->
      <text x="44" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="14"
            font-weight="500" fill="#2D3A4A" letter-spacing="0.5">divizero</text>
    </svg>
  </a>
  <a href="https://line.me/ti/p/7818mX2ZAe" target="_blank" class="nav-cta">LINEで相談する</a>
</nav>
```
スクロールで背景 blur + shadow 追加。モバイルもこの2要素のみ（ハンバーガー不要）。

---

### SECTION 1：ファーストビュー（Hero）

**レイアウト：中央揃え、テキスト主体。2層分岐の入口を持つ。**

```
[eyebrow]
LP・HP制作の相談窓口

[メインコピー（確定）]
「興味を持たれた、
 次の一手はありますか。」

[サブコピー]
発信で人は集まる。問題は、そのあと。
集めた人を取りこぼさない"受け皿のページ"を、一緒に作ります。

[CTA ボタン 2つ＝2層分岐の入口]
「まずLINEで話しかける」（プライマリ・黒背景・白文字）→ https://line.me/ti/p/7818mX2ZAe
　└ A層（すぐ頼みたい人）向け
「LPって必要？と思ったら」（セカンダリ・テキストリンク・↓矢印）→ #why
　└ B層（必要性を感じてない人）を説得セクションへ誘導

[補足テキスト（小）]
買い切り4.98万〜 ／ 最短1週間 ／ 無料デモあり

[背景装飾]
右側にSVG線画（スマホのワイヤーフレーム・LP構成が見える）
stroke:#D0D0C8 / stroke-width:1.5 / fill:none / 幅280px / モバイル非表示
```

```css
.hero-headline {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700; line-height: 1.18; letter-spacing: -0.02em;
}
@media (max-width: 640px){ .hero-headline{ font-size: var(--text-3xl);} }
```

**ヒーロー内フェードイン順序：** eyebrow(0.2s) → 見出し(0.4s) → サブ(0.6s) → CTA(0.8s) → 補足(1.0s)
（※オープニング演出の後に続けて再生）

---

### SECTION 2：フック1行（v2新規・離脱対策）

**背景：--color-accent-lt（薄緑）／ 高さ低め・1スクリーン未満**
**役割：** ヒーロー直下で最強論点（競合の追走）を1行だけ先出し。「この人分かってる」と思わせて下へ読ませる動力にする。

```
[大きめ1行コピー・中央]
興味を持たれた次の瞬間、
ライバルの発信が、相手のTLに流れ込みます。

[サブ1行・小]
比較が始まる前に、納得まで届けられているか。

[CTA① テキストリンク]
「その仕組みを見る →」 → #why
```

```css
.hook {
  background: var(--color-accent-lt);
  text-align: center;
  padding: 64px 24px;
}
.hook-line {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700; line-height: 1.5;
  color: var(--color-ink);
}
@media (max-width:640px){ .hook-line{ font-size: var(--text-xl);} }
```

---

### SECTION 3：共感ブロック（こんな方へ）

**背景：--color-surface-2**

```
[ラベル]「こんな方へ」

[3カード・横並び/モバイル縦積み]

カード1 [SVG:SNS→矢印→疑問符]
「XやInstagramで集客できてるのに
 受け皿のページがDM任せになっている」

カード2 [SVG:ページ+価格タグ]
「制作会社は高すぎる
 フリーランスは不安で頼めない」

カード3 [SVG:吹き出し+人物]
「何をどう頼めばいいか
 そもそも分からない」
```

```css
.concern-card{
  background:var(--color-surface); border:1px solid var(--color-border);
  border-radius:var(--radius-md); padding:32px 24px;
  transition:transform .2s ease, box-shadow .2s ease;
}
.concern-card:hover{ transform:translateY(-4px); box-shadow:0 8px 32px rgba(0,0,0,.08);}
```
SVGアイコン3点共通：48×48 / stroke only / stroke:var(--color-accent) / width:1.5 / round cap

---

### SECTION 4：なぜ、ページなのか（説得・v2で軽量化）

**背景：--color-surface（白）＋左に縦アクセントライン**
**id="why"（ヒーロー・フックのリンク先）**
**論調ルール：相手を名指しで責めない。「あなたは間違っている」ではなく「多くの人が見落としている／私もそうだった」。刃は内側へ。**

**v2の最重要変更：全文ベタ組みをやめ「見出し先行＋詳細はタップで開閉」にする。**
スクロールしながら4つの"刺さる一言"が連続で目に入る。全部読まなくても刺さりが伝わる。読みたい人だけ詳細を開く。

```
[ラベル]「なぜ、ページが要るのか」

[大見出し]
集客の入口より、
受け止める場所の話を。

[リード（小）]
発信で人は集められる。問題はそのあと。
興味を持った人が"次に見る場所"が、ありますか。

[4論点：見出しは常時表示・本文はタップで開閉（アコーディオン）]

01　似た人は、他にもいる
　└（開）発信を見て興味を持った人は必ず「いいな、でも似た人も他にいるな」と考えます。
　　　その瞬間に"あなたにする理由"を渡せる場所がありますか。
　　　プロフィールとLINE登録の間に、説得の1ページがあるかどうか。差はそこで開きます。

02　熱は、すぐ冷める
　└（開）人がいちばん前のめりなのは行動した直後です。でも多くの場合、その熱が冷める前に返信はできない。
　　　ページは、あなたが眠っている間もその熱を受け止め続けます。24時間働く、いちばん辛抱強い営業です。

03　競合は、あとから流れてくる
　└（開）一度あなたの商品に反応した人のTLには、そのあと似たサービスの発信が流れ込みます。仕組み上そうなります。
　　　比較が始まる前に納得まで運べているか。スピードで負けないために、ページがあります。

04　人に勧めることを、自分でも
　└（開）「成功する人はまず自分に投資する」——そう発信している人ほど、自分の販売ページは後回しにしがちです。
　　　人に勧めていることを自分のページで体現する。それが結局、いちばんの説得力になります。

[締め（中央・やや大）]
まずは無料のデモから。
言葉で説明するより、見てもらうほうが早いので。

[CTA②]
「デモを見てみる →」 → https://line.me/ti/p/7818mX2ZAe
```

```css
.why-inner{ border-left:2px solid var(--color-accent); padding-left:32px; }
.why-point{ padding:24px 0; border-bottom:1px solid var(--color-border); }
.why-point:last-of-type{ border-bottom:none; }
.why-head{ display:flex; align-items:baseline; gap:14px; cursor:pointer; }
.why-number{
  font-family:var(--font-display); font-size:var(--text-sm);
  color:var(--color-accent); letter-spacing:.1em;
}
.why-title{ font-weight:700; font-size:var(--text-lg); }
.why-body{
  max-height:0; overflow:hidden; transition:max-height .35s ease;
  color:var(--color-ink-sub); line-height:1.9; padding-left:38px;
}
.why-point.open .why-body{ max-height:240px; padding-top:12px; }
@media (max-width:640px){ .why-inner{ padding-left:20px; } }
```
※番号01〜04は「順序」でなく「4つの独立した理由」を示す並列ラベル。

---

### SECTION 5：できること

**背景：--color-bg**

```
[ラベル]「できること」
[大見出し]販売ページを、一緒に整えます。

[3アイテム・縦積み・左SVG+右テキスト]

[SVG:スマホ+矢印] LINE登録ページ
無料プレゼント受取・メルマガ登録など。LINEへ流す前の"最初の1ページ"を整える。

[SVG:カート+ページ] 販売LP
講座・コンサル・デジタル商品の販売ページ。「なぜ必要か」から「今すぐ申込む」まで1枚で完結。

[SVG:ギフト] 特典・プレゼント受取ページ
購読者・購入者向けの特典案内。信頼の積み上げを、ページでも支える。

[タグ・ピル横並び]
買い切り / 4.98万円〜 / 最短1週間 / 無料デモあり / 修正無制限

[CTA③]
「無料でデモを見る」（プライマリ）→ https://line.me/ti/p/7818mX2ZAe
```

---

### SECTION 6：相談の流れ

**背景：--color-accent-lt**

```
[ラベル]「相談の流れ」
[大見出し]まず雑談からで、大丈夫です。

[3ステップ・横並び・矢印接続/モバイル縦]

STEP1 [SVG:吹き出し] LINEかDMで話しかける
専門用語も準備も不要。「こういうことがしたい」で十分です。
↓
STEP2 [SVG:スマホ+ページ] 無料でデモを見る
あなたのサービスに合わせたサンプルページを無料で作ります。
↓
STEP3 [SVG:チェック] 気に入ったら制作スタート
気に入らなければキャンセルOK。納得してから進められます。

[CTA④]
「まず話しかけてみる →」 → https://line.me/ti/p/7818mX2ZAe
```
※v1にあった「※デモ〜契約はHomuPa!が担当」の注記は削除（OEM秘匿）。

---

### SECTION 7：実績（数字借用）

**背景：--color-bg**

```
[ラベル]「制作実績」

[数字バッジ（権威借用・主語なし）]
　1,000+  これまでの制作実績
　※「累計1,000サイト以上の制作体制で対応します」と添える（誰が、は書かない）

[大見出し]こんなページを作ってきました。

[グリッド3列/モバイル1列]
実績画像 × 6（許可が下りた画像と差し替え。暫定はプレースホルダー）

[注記]掲載許可をいただいた案件のみ表示しています

[CTA⑤]
「自分のページを相談する →」 → https://line.me/ti/p/7818mX2ZAe
```

```css
.stat-badge{
  display:inline-flex; flex-direction:column; align-items:center;
  margin-bottom:24px;
}
.stat-number{
  font-family:var(--font-display); font-size:var(--text-4xl);
  font-weight:700; color:var(--color-accent); line-height:1;
}
.stat-label{ font-size:var(--text-sm); color:var(--color-ink-sub); margin-top:6px; }
.work-placeholder{
  background:var(--color-surface-2); border:1px dashed var(--color-border);
  border-radius:var(--radius-md); aspect-ratio:9/16;
  display:flex; align-items:center; justify-content:center;
  color:var(--color-ink-sub); font-size:var(--text-sm);
}
```

---

### SECTION 8：運営者紹介（固有名なし）

**背景：--color-surface-2**

```
[左:円形写真160px src="./assets/profile.jpg" alt="小林薫之介"]
[右テキスト]
[eyebrow]窓口担当
[名前]小林 薫之介（Tadanosuke Kobayashi）
[役職]Divizero 代表

[本文]
Web制作・SNS発信・マーケティングに携わる中で、
「良いサービスを持っているのに、見せ方で損している人が多い」
と感じてこの窓口を始めました。

私が窓口となり、信頼できる制作体制と連携して、
相談から完成まで伴走します。
専門用語なしで、気軽に話しかけてもらえれば嬉しいです。

[SNS]
X：@21closer_ai
Instagram：@tadanosuke.divizero
```
※「信頼できる制作体制と連携して」で、固有名を出さず"1人ではない"ことを示す。

---

### SECTION 9：FAQ（固有名なし・数字借用）

**背景：--color-bg**　アコーディオン（デフォルト閉）

```
Q1. 制作はどんな体制ですか？
A. 私が窓口となり、信頼できる制作チームと連携して進めます。
   累計1,000サイト以上の制作体制で、相談から完成まで伴走します。
   （※固有名は出さない。"体制がある"ことと"数字"だけ示す）

Q2. 無料デモって本当に無料ですか？
A. はい、完全無料です。あなたのサービスに合わせたサンプルページを
   実際に作ってから確認できます。気に入らなければキャンセルも可能です。

Q3. 何を準備して相談すればいいですか？
A. 何も準備しなくて大丈夫です。「こういうサービスをやっています」の一言から始まります。
   ヒアリングしながら一緒に整理します。

Q4. 価格を教えてください。
A. LP（1ページ）49,800円〜／HP（5ページ構成）98,000円〜。
   買い切りで月額費用は一切かかりません。分割払いも可能です（3回まで）。
```

```css
.faq-item{ border-bottom:1px solid var(--color-border); }
.faq-question{ display:flex; justify-content:space-between; align-items:center;
  padding:20px 0; cursor:pointer; font-weight:500; }
.faq-answer{ max-height:0; overflow:hidden; transition:max-height .3s ease;
  color:var(--color-ink-sub); line-height:1.8; }
.faq-item.open .faq-answer{ max-height:320px; }
.faq-icon{ transition:transform .3s ease; }
.faq-item.open .faq-icon{ transform:rotate(45deg); }
```

---

### SECTION 10：CTA（最終・ダーク反転）

**背景：--color-ink（唯一のダークセクション）**

```
[大見出し・白]まず、話しかけてみてください。
[サブ・グレー]専門知識も準備も要りません。「こういうことがしたい」の一言から始まります。

[CTA 2つ]
「LINEで話しかける」（白背景・黒文字）href="https://line.me/ti/p/7818mX2ZAe" target="_blank"
「XでDMする」（アウトライン・白文字）href="https://x.com/messages/compose?recipient_id=21closer_ai" target="_blank"

[補足]返信は基本的に当日〜翌日以内
```

---

### FOOTER

```
左:ロゴ Divizero
中:Top / なぜページなのか / できること / 実績 / よくある質問 / お問い合わせ
右:SNS（X・Instagram・LINE）
下:© 2026 Divizero. All rights reserved. ／ 運営者情報 ／ 特定商取引法に基づく表記
```
※フッターにも採用ページは載せない。

---

## 5. アニメーション仕様

```javascript
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('is-visible'); });
},{ threshold:0.1 });
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
```
```css
.fade-in{ opacity:0; transform:translateY(24px); }
.fade-in.is-visible{ opacity:1; transform:translateY(0); transition:.6s ease; }
@media (prefers-reduced-motion:reduce){ *{ animation:none!important; transition:none!important; } }
```

---

## 6. ファイル構成

```
divizero.jp/
├── index.html
├── recruit.html      ← 採用（メインナビ非掲載）
├── operator.html     ← 運営者情報
├── legal.html        ← 特商法表記
├── assets/
│   ├── profile.jpg   ← 小林さんのAI写真（後から配置）
│   └── works/        ← 実績画像（許可後）
├── style.css
└── main.js           ← loader/intro + アコーディオン(why,faq) + observer
```

---

## 7. Claude Code 実装順序

```
1.  style.css（トークン全体）
2.  loader/オープニング演出（#loader + runIntro + sessionStorage分岐）
3.  index.html 骨格（ナビ + 全ブロック空枠）
4.  SECTION1 Hero（2層分岐CTA + 背景SVG + フェードイン順序）
5.  SECTION2 フック1行
6.  SECTION3 共感（SVGアイコン3点）
7.  SECTION4 なぜページなのか（見出し先行アコーディオン・id=why）
8.  SECTION5 できること（SVGアイコン3点）
9.  SECTION6 流れ（矢印SVG）
10. SECTION7 実績（数字バッジ + プレースホルダー）
11. SECTION8 運営者（img枠のみ）
12. SECTION9 FAQ（アコーディオン）
13. SECTION10 CTA + フッター
14. main.js（loader分岐・why/faqアコーディオン・observer）
15. レスポンシブ調整（375/768/1040）
16. recruit.html 骨格（非リンク）
```

---

## 8. 暫定運用ルール（写真・実績が揃うまで）

| 項目 | 暫定 | 本番 |
|---|---|---|
| 実績画像 | dashed プレースホルダー | 許可済み画像に差し替え |
| 運営者写真 | 空のimg枠 | AI写真を配置 |
| LINE URL | **確定** `https://line.me/ti/p/7818mX2ZAe` | 全CTAに適用済み |
| X DM URL | **確定** `https://x.com/messages/compose?recipient_id=21closer_ai` | 全Xボタンのhrefに適用 |

---

## 9. 非掲載・禁止事項（v2強化）

- **提携先固有名（HomuPa! / 大井 等）— 全面禁止**
- SNS運用・コンサル等の未確定サービス
- 申込フォーム・決済ボタン（契約は別主体）
- 「ご相談急増につき」等の誇張
- 採用リンク（recruit.html は存在するがどこからもリンクしない）
- 海外/$300 記述（/en は別フェーズ）
- 「商品は、ある。ページが、ない。」← v1の旧コピー。使用禁止（Bコピーに置換済み）

---

## 10. 確定アセット一覧

| アセット | 状態 | 備考 |
|---|---|---|
| ロゴ（PNG） | ✅ 確定 | ÷+0のマーク＋「divizero」テキスト。閃き線なし版。SVGへの書き出しを推奨（Claude Codeで再現可） |
| プロフィール写真 | ✅ 確定 | スーツ+グレー背景。`assets/profile.jpg` に配置 |
| LINE URL | ✅ 確定 | https://line.me/ti/p/7818mX2ZAe |
| X DM URL | ✅ 確定 | https://x.com/messages/compose?recipient_id=21closer_ai |
| 実績画像 | ⏳ 待機中 | 大井さんの使用許可確認後に `assets/works/` へ配置。暫定はプレースホルダー |
| divizero.jp ドメイン | ✅ 取得済み | Xサーバー等での公開設定が必要 |

---

## 11. Claude Code への渡し方（コピペ手順）

1. この仕様書を**まるごとコピー**してClaude Codeに貼る
2. 冒頭に以下を追加して貼る：

```
以下の仕様書に従って、divizero.jpのWebサイトを実装してください。
実装は「7. Claude Code 実装順序」のステップ1から順番に進めてください。
まず style.css から始めてください。
```

3. 各ステップ完了後「次のステップに進んでください」で継続
4. 全完成後に `assets/profile.jpg`（プロフィール写真）を配置して差し替え
5. 実績画像が揃い次第 `assets/works/` に追加してプレースホルダーと差し替え
