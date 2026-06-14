/**
 * capture-sites.js
 * Puppeteer で3サイトをスクロール録画し、GIF として出力する
 *
 * 出力先: ../../divizero/assets/works/
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const GifEncoder = require('gif-encoder-2');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

// ─── 設定 ────────────────────────────────────────────────────────────────────
const VIEWPORT_W = 1440;
const VIEWPORT_H = 900;
const GIF_W      = 1200;
const GIF_H      = Math.round(VIEWPORT_H * (GIF_W / VIEWPORT_W)); // 750
const FPS        = 15;
const FRAME_MS   = Math.round(1000 / FPS);   // 67 ms/frame
const DURATION   = 8000;                      // 8 秒
const SCROLL_PX  = 28;                        // 1 フレームあたりのスクロール量 (px)
const WAIT_AFTER_LOAD = 2000;                 // ページ読み込み後の待機 (ms)

const OUTPUT_DIR = path.resolve(__dirname, '../../divizero/assets/works');

const SITES = [
  {
    url:    'https://callcoffee.netlify.app',
    output: 'work-cafe.gif',
    label:  'カフェ / ブランドサイト',
  },
  {
    url:    'https://babel-create.vercel.app/',
    output: 'work-music.gif',
    label:  '音楽レーベル / コーポレートサイト',
  },
  {
    url:    'https://stellular-starship-efc3fb.netlify.app',
    output: 'work-futsal.gif',
    label:  'フットサルクラブ / 公式サイト',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureToGif(site) {
  console.log(`\n▶ ${site.label}`);
  console.log(`  URL : ${site.url}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      `--window-size=${VIEWPORT_W},${VIEWPORT_H}`,
    ],
  });

  try {
    const page = await browser.newPage();

    // ユーザーエージェント偽装
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/124.0.0.0 Safari/537.36'
    );
    await page.setViewport({ width: VIEWPORT_W, height: VIEWPORT_H });
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'ja,en;q=0.9' });

    // ページ読み込み
    console.log('  読み込み中...');
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 45000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(WAIT_AFTER_LOAD);

    // GIF エンコーダ準備
    const outputPath = path.join(OUTPUT_DIR, site.output);
    const encoder = new GifEncoder(GIF_W, GIF_H, 'neuquant', true);
    encoder.setDelay(FRAME_MS);
    encoder.setRepeat(0);   // 無限ループ
    encoder.setQuality(12); // 1(高品質)〜20(低品質)

    const writeStream = fs.createWriteStream(outputPath);
    encoder.createReadStream().pipe(writeStream);
    encoder.start();

    // フレームキャプチャループ
    const deadline = Date.now() + DURATION;
    let frameCount = 0;

    console.log(`  録画中 (${DURATION / 1000}秒 / 目標 ${FPS}fps)...`);

    while (Date.now() < deadline) {
      const t0 = Date.now();

      // スクリーンショット取得
      const buf = await page.screenshot({ type: 'png' });

      // リサイズ & ピクセルデータ取得
      const img = await Jimp.read(buf);
      img.resize(GIF_W, GIF_H, Jimp.RESIZE_BILINEAR);
      encoder.addFrame(img.bitmap.data);

      // スクロール
      await page.evaluate(px => window.scrollBy(0, px), SCROLL_PX);

      frameCount++;
      if (frameCount % FPS === 0) {
        const sec = Math.round((DURATION - (deadline - Date.now())) / 1000);
        process.stdout.write(`\r  フレーム: ${frameCount} (${sec}/${DURATION / 1000}秒)`);
      }

      // フレームレート調整
      const elapsed = Date.now() - t0;
      const rest = FRAME_MS - elapsed;
      if (rest > 0) await delay(rest);
    }

    encoder.finish();

    // ファイル書き込み完了を待機
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    const bytes = fs.statSync(outputPath).size;
    const mb = (bytes / 1024 / 1024).toFixed(2);
    console.log(`\n  完了: ${outputPath}`);
    console.log(`  実フレーム数: ${frameCount} | ファイルサイズ: ${mb} MB`);

  } finally {
    await browser.close();
  }
}

async function main() {
  // 出力ディレクトリ作成
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('='.repeat(60));
  console.log(' Divizero Works GIF Capture');
  console.log('='.repeat(60));
  console.log(`出力先: ${OUTPUT_DIR}`);
  console.log(`GIF サイズ: ${GIF_W} x ${GIF_H} px  /  ${FPS} fps  /  ${DURATION / 1000}秒`);

  for (const site of SITES) {
    await captureToGif(site);
  }

  console.log('\n' + '='.repeat(60));
  console.log(' 全 GIF の生成が完了しました！');
  console.log('='.repeat(60));
  console.log('\n次のステップ:');
  console.log('  divizero/assets/works/ にGIFが保存されました。');
  console.log('  デプロイして動作を確認してください。');
}

main().catch(err => {
  console.error('\n[エラー]', err.message);
  process.exit(1);
});
