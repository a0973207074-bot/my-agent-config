#!/bin/bash
# Auto-Skill Daily Sync Script (Linux)
REPO_PATH="/home/kenmec/.gemini/antigravity/scratch/my-agent-config"
LOCAL_SKILL_PATH="/home/kenmec/.gemini/antigravity/global_skills/auto-skill"
LAST_SYNC_FILE="$REPO_PATH/.last_sync"

# 1. 檢查今日是否已同步過
TODAY=$(date +"%Y-%m-%d")
if [ -f "$LAST_SYNC_FILE" ]; then
    LAST_SYNC=$(cat "$LAST_SYNC_FILE")
    if [ "$LAST_SYNC" == "$TODAY" ]; then
        echo "今日已完成 Auto-Skill 同步，跳過系統更新。"
        exit 0
    fi
fi

echo "正在啟動 Auto-Skill 每日自動同步..."

# 2. 從 GitHub 拉取更新 (Pull)
cd "$REPO_PATH" || exit 1
git pull origin main --rebase

# 3. 載入 (Apply/Load to System)
if [ -d "$LOCAL_SKILL_PATH" ]; then
    cp -r "$REPO_PATH/global_skills/auto-skill/"* "$LOCAL_SKILL_PATH/"
fi

# 4. 匯出/備份 (Sync/Push to GitHub)
# 檢查本地 global_skills 是否有更新
cp -r "$LOCAL_SKILL_PATH/"* "$REPO_PATH/global_skills/auto-skill/"
git add .
STATUS=$(git status --porcelain)
if [ -n "$STATUS" ]; then
    git commit -m "auto: periodic sync of expertises and skills ($TODAY)"
    git push origin main
    echo "已將本地新經驗上傳至 GitHub。"
fi

# 5. 紀錄同步時間
echo "$TODAY" > "$LAST_SYNC_FILE"
echo "Auto-Skill 同步完成！"
