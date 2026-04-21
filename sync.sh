#!/bin/bash
# ============================================================
# Kyle 每日自動同步腳本（Ubuntu）
# 規則：雙向同步，自動 commit 未提交變更，rebase 合併
# ============================================================

GITHUB_USER="a0973207074-bot"
PROJECTS_DIR="$HOME/projects"
GDRIVE="gdrive:kyle-dev-setup"
LOG="$HOME/.kyle-sync.log"
HOSTNAME=$(hostname)

log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG"; }
warn() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠ $1" | tee -a "$LOG"; }

sync_repo() {
    local dir="$1"
    local name="$2"

    [ -d "$dir/.git" ] || return

    cd "$dir"

    # 1. 未提交的變更 → 自動 commit
    if ! git diff --quiet || ! git diff --staged --quiet; then
        git add -A
        git commit -m "auto-sync: $HOSTNAME $(date '+%Y-%m-%d %H:%M')" --quiet
        log "  $name: 自動 commit 本地變更"
    fi

    # 2. pull --rebase（合併遠端變更）
    if ! git pull --rebase --quiet 2>/dev/null; then
        warn "$name: rebase 衝突，請手動解決 → $dir"
        git rebase --abort 2>/dev/null
        return
    fi

    # 3. push
    git push --quiet 2>/dev/null && log "  $name: 同步完成" || warn "  $name: push 失敗"
}

log "===== 每日同步開始（$HOSTNAME）====="

# ── 1. 所有 GitHub Repo（自動讀取帳號下所有 repo）────────────
log "  讀取 GitHub repo 清單..."
REPOS=$(gh repo list "$GITHUB_USER" --limit 100 --json name --jq '.[].name')

for repo in $REPOS; do
    TARGET="$PROJECTS_DIR/$repo"
    # 若本地不存在則自動 clone
    if [ ! -d "$TARGET/.git" ]; then
        log "  $repo: 新 repo，clone 中..."
        gh repo clone "${GITHUB_USER}/${repo}" "$TARGET" -- --quiet 2>/dev/null
    fi
    sync_repo "$TARGET" "$repo"
done

# ── 2. Claude Memory ─────────────────────────────────────────
HOME_PATH=$(echo $HOME | sed 's|/|-|g' | sed 's|^-||')
sync_repo "$HOME/.claude/projects/$HOME_PATH/memory" "claude-memory"

# ── 3. Google Drive .env 同步（雙向）────────────────────────
rclone sync "$PROJECTS_DIR/ugo-webhook-server/.env"       "$GDRIVE/env/ugo-reception/" 2>/dev/null
rclone sync "$PROJECTS_DIR/kyle-projects/ugo-cloud-api/.env" "$GDRIVE/env/ugo-cloud-api/" 2>/dev/null
log "  .env 同步完成"

log "===== 同步完成 ====="
