#!/bin/bash
# ============================================================
# Kyle 每日自動同步腳本（Ubuntu）
# ============================================================

GITHUB_USER="a0973207074-bot"
PROJECTS_DIR="$HOME/projects"
LARGE_DIR="$HOME/large-files"
GDRIVE="gdrive:kyle-dev-setup"
LOG="$HOME/.kyle-sync.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG"; }

log "===== 每日同步開始 ====="

# ── 1. 所有 GitHub Repo ──────────────────────────────────────
REPOS=(
    "kyle-workspace-backup" "ugo-webhook-server" "ugo-python-sdk"
    "kyle-claude-config" "kyle-projects" "robotics-workstation"
    "unitree-g1-gtc2026-dev" "ugo-line-webhook" "sam-3d-gui"
    "cascade" "auto-skill" "my-agent-config"
    "ugo-reception" "ugo-robot-integration" "unitree-g1-dev" "maira-fastumi"
)

for repo in "${REPOS[@]}"; do
    DIR="$PROJECTS_DIR/$repo"
    if [ -d "$DIR/.git" ]; then
        cd "$DIR"
        git pull --quiet 2>/dev/null && git push --quiet 2>/dev/null
        log "  $repo 同步完成"
    fi
done

# ── 2. Claude Memory ─────────────────────────────────────────
HOME_PATH=$(echo $HOME | sed 's|/|-|g' | sed 's|^-||')
MEMORY="$HOME/.claude/projects/$HOME_PATH/memory"
if [ -d "$MEMORY/.git" ]; then
    cd "$MEMORY"
    git pull --quiet && git push --quiet 2>/dev/null
    log "  Claude Memory 同步完成"
fi

# ── 3. Google Drive .env 同步 ────────────────────────────────
rclone sync "$PROJECTS_DIR/ugo-webhook-server/.env" "$GDRIVE/env/ugo-reception/" 2>/dev/null
rclone sync "$PROJECTS_DIR/kyle-projects/ugo-cloud-api/.env" "$GDRIVE/env/ugo-cloud-api/" 2>/dev/null
log "  .env 同步完成"

log "===== 同步完成 ====="
