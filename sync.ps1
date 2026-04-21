# ============================================================
# Kyle 每日自動同步腳本（Windows）
# 規則：雙向同步，自動 commit 未提交變更，rebase 合併
# ============================================================

$GITHUB_USER  = "a0973207074-bot"
$PROJECTS_DIR = "$HOME\projects"
$GDRIVE       = "gdrive:kyle-dev-setup"
$LOG          = "$HOME\.kyle-sync.log"
$HOSTNAME     = $env:COMPUTERNAME

function log  { $m = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $args"; Add-Content $LOG $m; Write-Host $m }
function warn { $m = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] ⚠ $args"; Add-Content $LOG $m; Write-Host $m -ForegroundColor Yellow }

function Sync-Repo {
    param($dir, $name)
    if (-not (Test-Path "$dir\.git")) { return }

    Push-Location $dir

    # 1. 未提交的變更 → 自動 commit
    $status = git status --porcelain 2>$null
    if ($status) {
        git add -A 2>$null
        git commit -m "auto-sync: $HOSTNAME $(Get-Date -Format 'yyyy-MM-dd HH:mm')" --quiet 2>$null
        log "  $name`: 自動 commit 本地變更"
    }

    # 2. pull --rebase
    $pull = git pull --rebase --quiet 2>&1
    if ($LASTEXITCODE -ne 0) {
        warn "$name`: rebase 衝突，請手動解決 → $dir"
        git rebase --abort 2>$null
        Pop-Location
        return
    }

    # 3. push
    git push --quiet 2>$null
    if ($LASTEXITCODE -eq 0) { log "  $name`: 同步完成" } else { warn "  $name`: push 失敗" }

    Pop-Location
}

log "===== 每日同步開始（$HOSTNAME）====="

# ── 1. 所有 GitHub Repo（自動讀取帳號下所有 repo）────────────
log "  讀取 GitHub repo 清單..."
$REPOS = gh repo list $GITHUB_USER --limit 100 --json name --jq '.[].name' 2>$null

foreach ($repo in $REPOS) {
    $target = "$PROJECTS_DIR\$repo"
    # 若本地不存在則自動 clone
    if (-not (Test-Path "$target\.git")) {
        log "  $repo`: 新 repo，clone 中..."
        gh repo clone "${GITHUB_USER}/${repo}" $target -- --quiet 2>$null
    }
    Sync-Repo $target $repo
}

# ── 2. Claude Memory ─────────────────────────────────────────
$homePath = $HOME -replace "\\","-" -replace "^-",""
Sync-Repo "$HOME\.claude\projects\$homePath\memory" "claude-memory"

# ── 3. Google Drive .env 同步 ────────────────────────────────
rclone sync "$PROJECTS_DIR\ugo-webhook-server\.env"          "$GDRIVE/env/ugo-reception/" 2>$null
rclone sync "$PROJECTS_DIR\kyle-projects\ugo-cloud-api\.env" "$GDRIVE/env/ugo-cloud-api/" 2>$null
log "  .env 同步完成"

log "===== 同步完成 ====="
