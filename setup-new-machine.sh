#!/bin/bash
# ============================================================
# Kyle 開發環境一鍵設定腳本（Ubuntu）
# 執行方式：bash setup-new-machine.sh
# ============================================================

set -e

RCLONE_GDRIVE="gdrive:kyle-dev-setup"
GITHUB_USER="a0973207074-bot"
PROJECTS_DIR="$HOME/projects"
CLAUDE_MEMORY_REPO="https://github.com/${GITHUB_USER}/claude-memory.git"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${YELLOW}[→]${NC} $1"; }

echo "============================================================"
echo "  Kyle 開發環境初始化（Ubuntu）"
echo "============================================================"
echo ""

# ── 1. 基本工具 ──────────────────────────────────────────────
info "安裝基本工具..."
sudo apt-get update -qq
sudo apt-get install -y git curl unzip jq -qq
log "基本工具完成"

# ── 2. Docker ────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
    info "安裝 Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    log "Docker 安裝完成（請重新登入後繼續）"
else
    log "Docker 已安裝"
fi

# ── 3. Node.js + Claude Code ─────────────────────────────────
if ! command -v node &>/dev/null; then
    info "安裝 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs -qq
fi

if ! command -v claude &>/dev/null; then
    info "安裝 Claude Code..."
    npm install -g @anthropic-ai/claude-code
    log "Claude Code 安裝完成"
else
    log "Claude Code 已安裝"
fi

# ── 4. GitHub CLI ────────────────────────────────────────────
if ! command -v gh &>/dev/null; then
    info "安裝 GitHub CLI..."
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list
    sudo apt-get update -qq && sudo apt-get install -y gh -qq
fi

info "登入 GitHub..."
gh auth status 2>/dev/null || gh auth login
log "GitHub 登入完成"

# ── 5. rclone ────────────────────────────────────────────────
if ! command -v rclone &>/dev/null; then
    info "安裝 rclone..."
    curl https://rclone.org/install.sh | sudo bash
fi

if ! rclone listremotes | grep -q "gdrive:"; then
    info "設定 Google Drive（將開啟瀏覽器授權）..."
    rclone config create gdrive drive scope drive
    rclone config reconnect gdrive:
fi
log "rclone / Google Drive 就緒"

# ── 6. Clone 所有 GitHub Repo ────────────────────────────────
info "Clone 所有專案 repo..."
mkdir -p "$PROJECTS_DIR"

REPOS=(
    "kyle-workspace-backup"
    "ugo-webhook-server"
    "ugo-python-sdk"
    "kyle-claude-config"
    "kyle-projects"
    "robotics-workstation"
    "unitree-g1-gtc2026-dev"
    "ugo-line-webhook"
    "sam-3d-gui"
    "cascade"
    "auto-skill"
    "my-agent-config"
)

for repo in "${REPOS[@]}"; do
    TARGET="$PROJECTS_DIR/$repo"
    if [ -d "$TARGET/.git" ]; then
        info "$repo 已存在，pull..."
        git -C "$TARGET" pull --quiet
    else
        info "Clone $repo..."
        gh repo clone "${GITHUB_USER}/${repo}" "$TARGET" -- --quiet
    fi
done
log "所有 repo clone 完成"

# ── 7. Claude Memory 同步 ────────────────────────────────────
info "同步 Claude Memory..."
HOME_PATH=$(echo $HOME | sed 's|/|-|g' | sed 's|^-||')
MEMORY_PATH="$HOME/.claude/projects/$HOME_PATH/memory"
mkdir -p "$MEMORY_PATH"

if [ -d "$MEMORY_PATH/.git" ]; then
    git -C "$MEMORY_PATH" pull --quiet
else
    git clone "$CLAUDE_MEMORY_REPO" "$MEMORY_PATH" --quiet
fi
log "Claude Memory 同步完成"

# ── 8. 下載大型檔案（Google Drive）──────────────────────────
info "下載大型檔案（Docker image 等，需要一段時間）..."
LARGE_FILES_DIR="$HOME/large-files"
mkdir -p "$LARGE_FILES_DIR"
rclone copy "${RCLONE_GDRIVE}/large-files" "$LARGE_FILES_DIR" --progress
log "大型檔案下載完成 → $LARGE_FILES_DIR"

# ── 9. 載入 Docker Image ─────────────────────────────────────
if [ -f "$LARGE_FILES_DIR/maira-fastumi.tar" ]; then
    info "載入 MAiRA Docker image..."
    docker load -i "$LARGE_FILES_DIR/maira-fastumi.tar"
    docker run -dit --name maira-fastumi --network host maira-fastumi:latest bash 2>/dev/null || true
    log "MAiRA Docker 容器啟動完成"
fi

# ── 10. 下載 .env 檔案 ───────────────────────────────────────
info "下載 .env 機密檔案..."
rclone copy "${RCLONE_GDRIVE}/env/ugo-reception/.env"  "$PROJECTS_DIR/ugo-webhook-server/.env" 2>/dev/null || true
rclone copy "${RCLONE_GDRIVE}/env/ugo-cloud-api/.env"  "$PROJECTS_DIR/kyle-projects/ugo-cloud-api/.env" 2>/dev/null || true
log ".env 設定完成"

# ── 完成 ─────────────────────────────────────────────────────
echo ""
echo "============================================================"
echo "  完成！"
echo ""
echo "  專案資料夾：$PROJECTS_DIR"
echo "  大型檔案：  $LARGE_FILES_DIR"
echo "  Memory：    $MEMORY_PATH"
echo "  Docker：    docker exec -it maira-fastumi bash"
echo "============================================================"
