# ============================================================
#  Divizero Works GIF Capture - セットアップ & 実行スクリプト
#  PowerShell 5.1+ / Windows 11
# ============================================================

$ErrorActionPreference = 'Stop'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Divizero Works GIF Capture - セットアップ & 実行" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# ─── Step 1: Node.js の確認 ─────────────────────────────────────────────────
Write-Host "[Step 1] Node.js の確認..." -ForegroundColor Yellow

$nodeInstalled = $false
try {
    $nodeVersion = (node --version 2>$null)
    if ($nodeVersion) {
        Write-Host "  Node.js が検出されました: $nodeVersion" -ForegroundColor Green
        $nodeInstalled = $true
    }
} catch {}

if (-not $nodeInstalled) {
    Write-Host "  Node.js が見つかりません。インストールを試みます..." -ForegroundColor Yellow
    Write-Host ""

    # winget でインストール試行
    $wingetInstalled = $false
    try {
        $null = winget --version 2>$null
        $wingetInstalled = $true
    } catch {}

    if ($wingetInstalled) {
        Write-Host "  winget でインストール中 (LTS 版)..." -ForegroundColor Cyan
        winget install --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
        Write-Host ""
        Write-Host "  インストール完了。PATH を再読み込みします..." -ForegroundColor Green

        # PATH を再読み込み
        $env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
                    [System.Environment]::GetEnvironmentVariable('Path', 'User')

        $nodeVersion = (node --version 2>$null)
        if ($nodeVersion) {
            Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "[!] インストール後もNodeが認識されません。" -ForegroundColor Red
            Write-Host "    PowerShellを一度閉じて再度このスクリプトを実行してください。" -ForegroundColor Red
            Write-Host "    または https://nodejs.org/ からLTS版を手動インストールしてください。" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host ""
        Write-Host "[!] wingetが利用できないため自動インストールできません。" -ForegroundColor Red
        Write-Host "    以下のURLからNode.js LTS版を手動インストールしてください:" -ForegroundColor Red
        Write-Host "    https://nodejs.org/en/download" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "    インストール後、PowerShellを再起動してこのスクリプトを再実行してください。" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""

# ─── Step 2: npm パッケージのインストール ────────────────────────────────────
Write-Host "[Step 2] npm パッケージのインストール..." -ForegroundColor Yellow
Set-Location $ScriptDir

if (-not (Test-Path "$ScriptDir\node_modules")) {
    Write-Host "  npm install を実行します (初回は数分かかります)..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[エラー] npm install に失敗しました。" -ForegroundColor Red
        exit 1
    }
    Write-Host "  パッケージのインストール完了。" -ForegroundColor Green
} else {
    Write-Host "  node_modules が存在します。スキップします。" -ForegroundColor Green
    Write-Host "  (再インストールしたい場合は node_modules フォルダを削除してください)" -ForegroundColor Gray
}

Write-Host ""

# ─── Step 3: GIF キャプチャ実行 ─────────────────────────────────────────────
Write-Host "[Step 3] GIF キャプチャを開始します..." -ForegroundColor Yellow
Write-Host "  3サイト × 8秒 = 合計約4〜8分かかります。しばらくお待ちください。" -ForegroundColor Gray
Write-Host ""

node "$ScriptDir\capture-sites.js"

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[エラー] キャプチャスクリプトが失敗しました。" -ForegroundColor Red
    Write-Host "上記のエラーメッセージを確認してください。" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  完了！GIFファイルの確認:" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green

$worksDir = Resolve-Path "$ScriptDir\..\..\divizero\assets\works"
Get-ChildItem -Path $worksDir -Filter "*.gif" | ForEach-Object {
    $mb = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  $($_.Name)  ($mb MB)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "次のステップ: git add & commit & push でデプロイしてください。" -ForegroundColor Yellow
Write-Host ""
