/**
 * 本番デプロイ用ワンショット
 *
 * 使い方（プロジェクトのルートで）:
 *   npm run deploy
 *   npm run deploy -- コミットメッセージをここに
 *   set DEPLOY_MESSAGE=メッセージ&& npm run deploy   (CMD)
 *   $env:DEPLOY_MESSAGE="メッセージ"; npm run deploy  (PowerShell)
 *
 * 環境変数:
 *   DEPLOY_SKIP_BUILD=1  … ビルドを飛ばす（非推奨）
 *   DEPLOY_VERCEL_CLI=1  … push のあと npx vercel deploy --prod も実行（Git 連携なしのとき用）
 */

const { execSync } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");
process.chdir(root);

function run(cmd, label) {
  if (label) console.log(`\n━━ ${label} ━━`);
  console.log(`▶ ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

function runOut(cmd) {
  return execSync(cmd, { encoding: "utf-8", cwd: root, shell: true }).trim();
}

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

console.log(`
╔══════════════════════════════════════════════════════════╗
║  company-homepage  デプロイ（npm run deploy）            ║
╠══════════════════════════════════════════════════════════╣
║  1. 本番ビルド（npm run build）                          ║
║  2. 変更があれば git add → commit                        ║
║  3. git push（→ Vercel が Git 連携なら本番ビルド開始）    ║
╚══════════════════════════════════════════════════════════╝
`);

// --- ビルド ---
if (process.env.DEPLOY_SKIP_BUILD === "1") {
  console.log("（DEPLOY_SKIP_BUILD=1 のためビルドをスキップ）\n");
} else {
  run("npm run build", "ステップ 1/3: 本番ビルド");
}

// --- Git ---
let branch;
try {
  branch = runOut("git rev-parse --abbrev-ref HEAD");
} catch {
  fail(
    "このフォルダは Git 管理されていないか、git コマンドが使えません。\n" +
      "   先に: git init および git remote add origin <URL>",
  );
}

console.log(`\n現在のブランチ: ${branch}`);

try {
  runOut("git rev-parse --abbrev-ref --symbolic-full-name @{u}");
} catch {
  let remote = "origin";
  try {
    const remotes = runOut("git remote");
    const first = remotes.split(/\s+/).filter(Boolean)[0];
    if (first) remote = first;
  } catch {
    /* リモートなし */
  }
  fail(
    `push 先（upstream）がまだありません。いまのブランチは「${branch}」です。\n\n` +
      `   ▼ 初回だけ、次を 1 回コピーして実行してください:\n\n` +
      `      git push -u ${remote} ${branch}\n\n` +
      `   リモートが無い場合は先に（GitHub の URL に合わせて）:\n` +
      `      git remote add origin https://github.com/あなた/company-homepage.git\n` +
      `   そのあと再度: npm run deploy\n\n` +
      `   ※ いまの実行ではビルドまで終わっています。同じ内容を push だけ先に済ませるなら:\n` +
      `      set DEPLOY_SKIP_BUILD=1  （CMD） / $env:DEPLOY_SKIP_BUILD=\"1\"  （PowerShell）\n` +
      `      npm run deploy`,
  );
}

const status = runOut("git status --porcelain");
if (status) {
  const msg =
    process.env.DEPLOY_MESSAGE ||
    process.argv.slice(2).join(" ").trim() ||
    `deploy: ${new Date().toISOString().slice(0, 19).replace("T", " ")}`;

  const safe = msg.replace(/"/g, '\\"');
  run("git add -A", "ステップ 2/3: 変更をコミット");
  run(`git commit -m "${safe}"`, null);
} else {
  console.log(
    "\n（コミットする変更はありません。リモートへ送るコミットだけの可能性があります）\n",
  );
}

run("git push", "ステップ 3/3: git push");

if (process.env.DEPLOY_VERCEL_CLI === "1") {
  console.log(
    "\n（DEPLOY_VERCEL_CLI=1）Vercel CLI で本番デプロイを実行します…\n",
  );
  run("npx --yes vercel deploy --prod", "Vercel CLI 本番");
}

console.log(`
✅ 完了しました。

   ・GitHub 等と Vercel を「接続済み」なら: この push で本番デプロイが始まります。
   ・ダッシュボード: https://vercel.com/dashboard

   コミットメッセージを付けたいとき:
   npm run deploy -- ここにメッセージ

   PowerShell の例:
   npm run deploy -- "fix: 文言修正"
`);
