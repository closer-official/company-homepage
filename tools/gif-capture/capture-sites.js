/**
 * capture-sites.js  v2
 * ・ページ全体の高さに合わせてスクロール速度を自動計算
 * ・最後に2秒静止してからループ
 * ・fps=10 / octree アルゴリズム → ちらつき低減
 * ・出力先: public/works/ （Next.js から /works/xxx.gif で参照可能）
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const GifEncoder = require('gif-encoder-2');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

// ─── 設定 ────────────────────────────────────────────────────────────────────
const VIEWPORT_W     = 1440;
const VIEWPORT_H     = 900;
const GIF_W          = 1200;
const GIF_H          = Math.round(VIEWPORT_H * (GIF_W / VIEWPORT_W)); // 750
const FPS            = 10;                        // 10fps: ちらつきを抑えつつ滑らか
const FRAME_MS       = Math.round(1000 / FPS);   // 100 ms/frame
const SCROLL_SECONDS = 20;                        // スクロール録画時間（秒）
const PAUSE_SECONDS  = 3;                         // 最後に静止する時間（秒）
const SCROLL_FRAMES  = SCROLL_SECONDS * FPS;      // 200 frames
const PAUSE_FRAMES   = PAUSE_SECONDS  * FPS;      // 30 frames
const WAIT_AFTER_LOAD = 2500;                     // ページ読込後の待機（ms）
const GIF_QUALITY    = 5;                         // 1=最高品質 / 20=最低品質

// 出力先: public/works/（Vercel の静的配信パス）
const OUTPUT_DIR = path.resolve(__dirname, '../../public/works');

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

function delay(ms) {
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
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/124.0.0.0 Safari/537.36'
    );
    await page.setViewport({ width: VIEWPORT_W, height: VIEWPORT_H });
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'ja,en;q=0.9' });

    console.log('  読み込み中...');
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 45000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(WAIT_AFTER_LOAD);

    // ページ全体の高さを取得してスクロール量を計算
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const scrollableH = Math.max(0, pageHeight - VIEWPORT_H);
    const scrollPerFrame = scrollableH > 0
      ? Math.ceil(scrollableH / SCROLL_FRAMES)
      : 0;

    console.log(`  ページ高さ: ${pageHeight}px / スクロール可能: ${scrollableH}px`);
    console.log(`  1フレームあたりスクロール: ${scrollPerFrame}px`);
    console.log(`  録画: ${SCROLL_SECONDS}秒スクロール + ${PAUSE_SECONDS}秒静止 (${FPS}fps)`);

    // GIF エンコーダ準備
    const outputPath = path.join(OUTPUT_DIR, site.output);
    const encoder = new GifEncoder(GIF_W, GIF_H, 'octree', true); // octree = 安定した色量子化
    encoder.setDelay(FRAME_MS);
    encoder.setRepeat(0);
    encoder.setQuality(GIF_QUALITY);

    const writeStream = fs.createWriteStream(outputPath);
    encoder.createReadStream().pipe(writeStream);
    encoder.start();

    let frameCount = 0;

    // ── スクロール録画フェーズ ──────────────────────────────────────
    for (let i = 0; i < SCROLL_FRAMES; i++) {
      const t0 = Date.now();

      const buf = await page.screenshot({ type: 'png' });
      const img = await Jimp.read(buf);
      img.resize(GIF_W, GIF_H, Jimp.RESIZE_BILINEAR);
      encoder.addFrame(img.bitmap.data);

      if (scrollPerFrame > 0) {
        await page.evaluate(px => window.scrollBy(0, px), scrollPerFrame);
      }

      frameCount++;
      if (frameCount % FPS === 0) {
        const sec = Math.round(frameCount / FPS);
        process.stdout.write(`\r  [スクロール] ${sec}/${SCROLL_SECONDS}秒 (${frameCount}フレーム)`);
      }

      const elapsed = Date.now() - t0;
      const rest = FRAME_MS - elapsed;
      if (rest > 0) await delay(rest);
    }

    // ── 静止フェーズ（最終画面を維持）────────────────────────────────
    console.log(`\n  [静止] ${PAUSE_SECONDS}秒...`);
    const lastBuf = await page.screenshot({ type: 'png' });
    const lastImg = await Jimp.read(lastBuf);
    lastImg.resize(GIF_W, GIF_H, Jimp.RESIZE_BILINEAR);
    const lastPixels = lastImg.bitmap.data;

    for (let i = 0; i < PAUSE_FRAMES; i++) {
      encoder.addFrame(lastPixels);
      frameCount++;
    }

    encoder.finish();

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    const bytes = fs.statSync(outputPath).size;
    const mb = (bytes / 1024 / 1024).toFixed(2);
    console.log(`  完了: ${outputPath}`);
    console.log(`  合計フレーム: ${frameCount} / ファイルサイズ: ${mb} MB`);

  } finally {
    await browser.close();
  }
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('='.repeat(60));
  console.log(' Divizero Works GIF Capture  v2');
  console.log('='.repeat(60));
  console.log(`出力先 : ${OUTPUT_DIR}`);
  console.log(`サイズ : ${GIF_W}x${GIF_H}px / ${FPS}fps`);
  console.log(`時間   : ${SCROLL_SECONDS}秒スクロール + ${PAUSE_SECONDS}秒静止`);

  for (const site of SITES) {
    await captureToGif(site);
  }

  console.log('\n' + '='.repeat(60));
  console.log(' 全GIFの生成が完了しました');
  console.log('='.repeat(60));
  console.log('\n次のステップ: git add & push でVercelに自動デプロイされます');
}

main().catch(err => {
  console.error('\n[エラー]', err.message);
  process.exit(1);
});
