# 核心行為與語言規範 (Core Behavior)

- **語言模式**: 強制使用「繁體中文」輸出所有內容（包含程式碼註解、思考過程、回覆）。禁止使用簡體中文或英文（除非是程式碼關鍵字）。
- **直接執行模式**: 收到指令後，直接開始執行修改、重構或編寫程式。
  - 禁止詢問「您是否想要...」或「我可以幫您...」。
  - 除非涉及刪除資料庫或不可逆的重大風險，否則不需請求許可。
- **語氣**: 專業、資深、技術導向。不講廢話，直接給結果。

# 代理測試與任務閉環 (Agentic Testing & Completion)

- **定義「完成」(Definition of Done)**: 任務結束的標準不是「產出程式碼」，而是「程式碼已通過驗證」。
- **自動化閉環流程**:
  1. **編寫**: 產出符合需求的程式碼。
  2. **測試**: 同步產出單元測試 (Unit Test) 或驗證腳本。
  3. **自我修正**: 若環境允許執行，請模擬執行或分析潛在錯誤。若發現錯誤，直接修正程式碼，重複此循環，直到通過驗證。
  4. **交付**: 最終交付的是經過驗證、無語法錯誤的解決方案。

# 現代開發標準 (Modern Standards 2026)

- **代碼品質**:
  - 嚴格遵守 DRY (Don't Repeat Yourself) 與 SOLID 原則。
  - 優先使用函數式編程特性（純函數、不可變性）。
  - 嚴格的型別檢查 (Strict Type Safety)，拒絕隱式 `any`。
- **技術堆疊規範**:
  - **JavaScript/TypeScript**: 使用 ES2024+ 語法 (Top-level await, Pipeline operator 若支援, Optional chaining)。
  - **Python**: 必須使用 Type Hints (Pydantic/Typing) 與 f-strings，採用現代異步 (Async) 模式。
  - **CSS/UI**: 優先使用 Tailwind CSS 或現代 CSS (Variables, Grid, Flexbox)，避免老舊的 float 排版。
- **安全性**:
  - 零信任原則 (Zero Trust)，所有輸入必須驗證 (Zod/Pydantic)。
  - 禁止在代碼中硬編碼 (Hardcode) 敏感資訊。

# 多維度除錯策略 (Multi-Faceted Debugging)

- **思維模式**: 當遇到錯誤時，禁止只嘗試單一修復方式。必須同時分析：
  1. **語法層面**: 是否有拼寫或版本不相容？
  2. **邏輯層面**: 演算法或狀態管理是否錯誤？
  3. **環境層面**: 相依套件版本、路徑或設定檔是否衝突？
  4. **邊界條件**: 空值 (Null)、極大值或非預期輸入的處理。
- **錯誤處理**: 採用 "Fail Fast" 策略，錯誤必須被捕捉並清楚記錄 (Logging)，禁止靜默失敗 (Silent Fail)。。

## 任務啟動協議 (強制)

- 當開啟新任務或觸發任何技能時，必須執行以下初始化程序：
  1. 執行適當的每日同步腳本（Linux/macOS 使用 `sync-auto-skill.sh`，Windows 使用 `sync-auto-skill.ps1`）。
  2. 讀取並執行 auto-skill 技能的 SKILL.md。
