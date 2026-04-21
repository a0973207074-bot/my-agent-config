# ============================================================
# Kyle 開發環境一鍵設定腳本（Windows）
# 執行方式：以系統管理員身份執行 PowerShell，然後：
#   Set-ExecutionPolicy Bypass -Scope Process
#   .\setup-new-machine.ps1
# ============================================================

$GITHUB_USER   = "a0973207074-bot"
$PROJECTS_DIR  = "$HOME\projects"
$LARGE_DIR     = "$HOME\large-files"
$GDRIVE        = "gdrive:kyle-dev-setup"
$MEMORY_REPO   = "https://github.com/$GITHUB_USER/claude-memory.git"

function log  { Write-Host "[OK] $args" -ForegroundColor Green }
function info { Write-Host " ->  $args" -ForegroundColor Yellow }

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Kyle 開發環境初始化（Windows）" -ForegroundColor Cyan
Write-Host "============================================================`n" -ForegroundColor Cyan

# ── 1. winget 安裝基本工具 ───────────────────────────────────
info "安裝基本工具..."
$tools = @(
    @{id="Git.Git"},
    @{id="GitHub.cli"},
    @{id="OpenJS.NodeJS.LTS"},
    @{id="Rclone.Rclone"},
    @{id="Docker.DockerDesktop"}
)
foreach ($t in $tools) {
    $check = winget list --id $t.id 2>$null | Select-String $t.id
    if ($check) {
        log "$($t.id) 已安裝"
    } else {
        info "安裝 $($t.id)..."
        winget install $t.id --silent --accept-package-agreements --accept-source-agreements
    }
}

# 重新載入 PATH
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" +
            [System.Environment]::GetEnvironmentVariable("PATH","User")
log "基本工具完成"

# ── 2. Claude Code ───────────────────────────────────────────
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    info "安裝 Claude Code..."
    npm install -g @anthropic-ai/claude-code
}
log "Claude Code 就緒"

# ── 3. GitHub 登入 ───────────────────────────────────────────
info "登入 GitHub..."
$authStatus = gh auth status 2>&1
if ($authStatus -match "not logged") {
    gh auth login
}
log "GitHub 登入完成"

# ── 4. rclone Google Drive 設定 ──────────────────────────────
$remotes = rclone listremotes 2>$null
if ($remotes -notmatch "gdrive:") {
    info "設定 Google Drive（將開啟瀏覽器授權）..."
    rclone config create gdrive drive scope drive
    rclone config reconnect gdrive:
}
log "rclone / Google Drive 就緒"

# ── 5. Clone 所有 GitHub Repo ────────────────────────────────
info "Clone 所有專案 repo..."
New-Item -ItemType Directory -Force -Path $PROJECTS_DIR | Out-Null

$REPOS = @(
    "kyle-workspace-backup",
    "ugo-webhook-server",
    "ugo-python-sdk",
    "kyle-claude-config",
    "kyle-projects",
    "robotics-workstation",
    "unitree-g1-gtc2026-dev",
    "ugo-line-webhook",
    "sam-3d-gui",
    "cascade",
    "auto-skill",
    "my-agent-config",
    "ugo-reception",
    "ugo-robot-integration",
    "unitree-g1-dev",
    "maira-fastumi"
)

foreach ($repo in $REPOS) {
    $target = "$PROJECTS_DIR\$repo"
    if (Test-Path "$target\.git") {
        info "$repo 已存在，pull..."
        git -C $target pull --quiet
    } else {
        info "Clone $repo..."
        gh repo clone "${GITHUB_USER}/${repo}" $target -- --quiet
    }
}
log "所有 repo clone 完成"

# ── 6. Claude Memory 同步 ────────────────────────────────────
info "同步 Claude Memory..."
$homePath = $HOME -replace "\\","-" -replace "^-",""
$memoryPath = "$HOME\.claude\projects\$homePath\memory"
New-Item -ItemType Directory -Force -Path $memoryPath | Out-Null

if (Test-Path "$memoryPath\.git") {
    git -C $memoryPath pull --quiet
} else {
    git clone $MEMORY_REPO $memoryPath --quiet
}
log "Claude Memory 同步完成"

# ── 7. 下載大型檔案（Google Drive）──────────────────────────
info "下載大型檔案（需要一段時間）..."
New-Item -ItemType Directory -Force -Path $LARGE_DIR | Out-Null
rclone copy "$GDRIVE/large-files" $LARGE_DIR --progress
log "大型檔案下載完成 → $LARGE_DIR"

# ── 8. 下載 .env 檔案 ────────────────────────────────────────
info "下載 .env 機密檔案..."
rclone copy "$GDRIVE/env/ugo-reception/.env"  "$PROJECTS_DIR\ugo-webhook-server\.env"
rclone copy "$GDRIVE/env/ugo-cloud-api/.env"  "$PROJECTS_DIR\kyle-projects\ugo-cloud-api\.env"
log ".env 設定完成"

# ── 9. 設定每日自動同步（Task Scheduler）────────────────────
info "設定每日自動同步..."
$syncScript = "$HOME\.kyle-sync.ps1"
rclone copy "$GDRIVE/sync.ps1" $syncScript 2>$null
if (-not (Test-Path $syncScript)) {
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/a0973207074-bot/my-agent-config/main/sync.ps1" -OutFile $syncScript
}

$action  = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NonInteractive -File `"$syncScript`""
$trigger = New-ScheduledTaskTrigger -Daily -At "09:00"
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 1)
Register-ScheduledTask -TaskName "KyleDailySync" -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
log "每日同步排程設定完成（每天 09:00）"

# ── 完成 ─────────────────────────────────────────────────────
Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "  完成！" -ForegroundColor Cyan
Write-Host ""
Write-Host "  專案資料夾：$PROJECTS_DIR"
Write-Host "  大型檔案：  $LARGE_DIR"
Write-Host "  Memory：    $memoryPath"
Write-Host "  Docker：    docker exec -it maira-fastumi bash"
Write-Host "  每日同步：  每天 09:00 自動執行"
Write-Host "  同步 Log：  $HOME\.kyle-sync.log"
Write-Host "============================================================" -ForegroundColor Cyan
