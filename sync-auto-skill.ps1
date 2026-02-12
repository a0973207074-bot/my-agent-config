# Auto-Skill Daily Sync Script (Fixed)
$repoPath = 'C:\Users\User\.gemini\antigravity\scratch\my-agent-config'
$localSkillPath = 'C:\Users\User\.gemini\antigravity\scratch\auto-skill' # 修正為實際觀察到的路徑
$lastSyncFile = "$repoPath\.last_sync"

# 1. 檢查今日是否已同步過
$today = Get-Date -Format 'yyyy-MM-dd'
if (Test-Path $lastSyncFile) {
    $lastSync = Get-Content $lastSyncFile
    if ($lastSync -eq $today) {
        Write-Host '今日已完成 Auto-Skill 同步，跳過系統更新。'
        exit 0
    }
}

Write-Host '正在啟動 Auto-Skill 每日自動同步...'

# 2. 從 GitHub 拉取更新 (Pull)
Set-Location $repoPath
git pull origin main --rebase

# 3. 載入 (Apply/Load to System)
if (Test-Path $localSkillPath) {
    # 確保目的地目錄存在
    $dest = "$repoPath\global_skills\auto-skill"
    if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force }
    
    # 這裡的邏輯是從本地 sync 到 repo，或者反過來？
    # 根據原腳本第24行：從 repo 到本地
    Copy-Item -Path "$repoPath\global_skills\auto-skill\*" -Destination "$localSkillPath\" -Recurse -Force
}

# 4. 匯出/備份 (Sync/Push to GitHub)
# 檢查本地 auto-skill 是否有更新並同步回 repo
if (Test-Path $localSkillPath) {
    Copy-Item -Path "$localSkillPath\*" -Destination "$repoPath\global_skills\auto-skill\" -Recurse -Force
}

git add .
$status = git status --porcelain
if ($status) {
    $msg = "auto: periodic sync of expertises and skills ($today)"
    git commit -m $msg
    git push origin main
    Write-Host '已將本地新經驗上傳至 GitHub。'
}

# 5. 紀錄同步時間
$today | Out-File $lastSyncFile
Write-Host 'Auto-Skill 同步完成！'
