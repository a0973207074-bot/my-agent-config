# My Agent Configuration

這個儲存庫是用來同步我的 AI Agent 設定，包含：

- **Rules (規則)**: 我的全域行為規範。
- **Skills (技能)**: 我自定義的 AI 技能與工作流。

## 如何使用

1. 將此儲存庫 clone 到您的每一台電腦上：
    `git clone https://github.com/a0973207074-bot/my-agent-config.git`
2. 設定您的 AI Agent (如 Antigravity, Cursor, 或其他 Agentic IDE) 讀取此資料夾中的設定。

## 跨裝置同步 Auto-Skill 步驟

若要在新裝置啟動 **Auto-Skill** 自進化功能，請執行以下步驟：

### 1. 連結技能目錄

將本儲存庫中的 `global_skills/auto-skill` 目錄，複製或連結到您 IDE 的技能路徑：

- **Antigravity**: `%USERPROFILE%\.gemini\antigravity\global_skills\`
- **其他 IDE**: 請參考該工具的官方說明。

### 2. 初始化全局規則 (Bootstrapping)

為了確保每次任務都會觸發 Auto-Skill，您必須在該裝置的「全局預設指令 (Global Rules)」中加入以下內容：

```markdown
## 任務啟動協議 (強制)
* 當開啟新任務或觸發任何技能時，必須先讀取並執行 auto-skill 技能的 SKILL.md。
```

- **Antigravity 檔案位置**: `%USERPROFILE%\.gemini\GEMINI.md`
- **Cursor 檔案位置**: `~/.cursorrules` 或 `.cursor/rules/global.mdc`

完成後，在新電腦上的 AI 助理就會自動載入這套共同的「第二大腦」。
