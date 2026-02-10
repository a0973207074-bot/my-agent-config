# Auto-Skill Daily Sync Script
$repoPath = "C:\Users\User\.gemini\antigravity\scratch\my-agent-config"
$localSkillPath = "C:\Users\User\.gemini\antigravity\global_skills\auto-skill"
$lastSyncFile = "$repoPath\.last_sync"

# 1. 檢查今日是否已同步過
$today = Get-Date -Format "yyyy-MM-dd"
if (Test-Path $lastSyncFile) {
    $lastSync = Get-Content $lastSyncFile
    if ($lastSync -eq $today) {
        Write-Host "今日已完成 Auto-Skill 同步，跳過系統更新。"
        exit 0
    }
}

Write-Host "正在啟動 Auto-Skill 每日自動同步..."

# 2. 從 GitHub 拉取更新 (Pull)
Set-Location $repoPath
git pull origin main --rebase

# 3. 載入 (Apply/Load to System)
if (Test-Path $localSkillPath) {
    Copy-Item -Path "$repoPath\global_skills\auto-skill\*" -Destination "$localSkillPath\" -Recurse -Force
}

# 4. 匯出/備份 (Sync/Push to GitHub)
# 檢查本地 global_skills 是否有更新
Copy-Item -Path "$localSkillPath\*" -Destination "$repoPath\global_skills\auto-skill\" -Recurse -Force
git add .
$status = git status --porcelain
if ($status) {
    git commit -m "auto: periodic sync of expertises and skills ($today)"
    git push origin main
    Write-Host "已將本地新經驗上傳至 GitHub。"
}

# 5. 紀錄同步時間
$today | Out-File $lastSyncFile
Write-Host "Auto-Skill 同步完成！"
