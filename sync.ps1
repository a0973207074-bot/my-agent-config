# ============================================================
# Kyle 每日自動同步腳本（Windows）
# ============================================================

$GITHUB_USER  = "a0973207074-bot"
$PROJECTS_DIR = "$HOME\projects"
$GDRIVE       = "gdrive:kyle-dev-setup"
$LOG          = "$HOME\.kyle-sync.log"

function log { $msg = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $args"; Add-Content $LOG $msg; Write-Host $msg }

log "===== 每日同步開始 ====="

# ── 1. 所有 GitHub Repo ──────────────────────────────────────
$REPOS = @(
    "kyle-workspace-backup","ugo-webhook-server","ugo-python-sdk",
    "kyle-claude-config","kyle-projects","robotics-workstation",
    "unitree-g1-gtc2026-dev","ugo-line-webhook","sam-3d-gui",
    "cascade","auto-skill","my-agent-config",
    "ugo-reception","ugo-robot-integration","unitree-g1-dev","maira-fastumi"
)

foreach ($repo in $REPOS) {
    $dir = "$PROJECTS_DIR\$repo"
    if (Test-Path "$dir\.git") {
        git -C $dir pull --quiet 2>$null
        git -C $dir push --quiet 2>$null
        log "  $repo 同步完成"
    }
}

# ── 2. Claude Memory ─────────────────────────────────────────
$homePath = $HOME -replace "\\","-" -replace "^-",""
$memory = "$HOME\.claude\projects\$homePath\memory"
if (Test-Path "$memory\.git") {
    git -C $memory pull --quiet
    git -C $memory push --quiet 2>$null
    log "  Claude Memory 同步完成"
}

# ── 3. Google Drive .env 同步 ────────────────────────────────
rclone sync "$PROJECTS_DIR\ugo-webhook-server\.env" "$GDRIVE/env/ugo-reception/" 2>$null
rclone sync "$PROJECTS_DIR\kyle-projects\ugo-cloud-api\.env" "$GDRIVE/env/ugo-cloud-api/" 2>$null
log "  .env 同步完成"

log "===== 同步完成 ====="
