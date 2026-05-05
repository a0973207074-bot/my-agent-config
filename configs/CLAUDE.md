# CLAUDE.md

---

## 行為規則（每次對話必須遵守）

- **語言：** 只用中文回覆，不使用英文（程式碼與技術名詞除外）
- **執行：** 直接執行任務，除非動作不可逆（刪資料、推送遠端）否則不需事先確認
- **開場：** 每次對話開始，主動讀取 memory 檔案，彙報各專案目前狀態與下一步待辦
- **備份：** 開場時執行備份腳本 `D:\kyle\work\kyle-workspace-backup\sync.ps1`
- **測試：** 功能完成後必須實機測試，程式碼完成 ≠ 完成
- **新專案：** 須同步建立記憶檔 + `D:\kyle\work\!開發中專案\` 資料夾 + `計畫書.md`
- **檔案整理：** 使用者給的所有檔案都要移到對應專案資料夾 `D:\kyle\work\!開發中專案\`

---

## 專案狀態

### 專案一：ugo 接待服務
**狀態：** 後端完成，排程待開啟（等實機測試）
**路徑：** `D:\kyle\work\!開發中專案\ugo接待服務\ugo-webhook-server\`
**GitHub：** `a0973207074-bot/ugo-webhook-server`
**部署：** Railway `https://ugo-webhook-server-production.up.railway.app`
**機器人：** KM mini 1（UM01AA-A03560003），只有 CHARGING 狀態才能按接待

**待辦：**
- ⬜ 實機測試後開啟排程（main.py 中目前 comment 掉）
- ⬜ ESP32 韌體開發（自動門 MQTT 控制）
- ⬜ 電量管理 + 狀態監控上線

**重要設計決策：**
- 忙碌判斷：只有 CHARGING 才能按接待（`last_comm` 不即時）
- 排程任務前加 stop_flow()，Reception endpoint 也加 stop_flow()
- 到位後啟動第二段 Flow（背景輪詢等 departure flow 結束）

---

### 專案二：ugo 機器人整合（Cloud/Edge）
**狀態：** Cloud API 可用，WebSocket/Edge SDK 等原廠回覆
**API：** `https://gateway.ugo.works`，Bearer Token 在 .env
**機器人 IP：** `192.168.2.14`（ugo）

**待辦：**
- ⬜ WebSocket endpoint（等原廠文件）
- ⬜ Edge SDK NATS topic 清單（等原廠回覆）

**可用 API：**
- GET `/object/robot/list`、`/object/status`、`/object/flow/list`、`/object/report/list/v2`
- POST `/control/flow/start`、`/control/flow/stop`、`/control/voice-text`

---

### 專案三：MAiRA FastUMI 遙操作
**狀態：** M1 完成，M2 進行中（Vive Tracker 軸向映射與姿態同步）
**機器人：** MAiRA 7M（Neura Robotics），IP：`192.168.2.14`，port：`7410`
**路徑：** `D:\kyle\work\!開發中專案\MAiRA-FastUMI遙操作\`
**控制介面：** neura_ros2 v3.x（ROS2 Humble）
**本地 SDK 路徑：** `D:\Users\Downloads\neura_ros2_humble_maira7m_V5.1\`

**待辦：**
- ⬜ 確認軸向映射
- ⬜ 姿態同步測試
- ⬜ 延遲量測（目標 < 50ms）
- ⬜ 回覆 Alessio（Neura Robotics）：外部 IP + `systemctl status minio` 結果

**ROS2 啟動指令：**
```bash
ros2 launch neura_driver neura_robot_bringup.launch.py \
    robot_name:=maira7M robot_ip:=[192,168,2,14] port:=7410
```
注意：robot_ip 必須用整數陣列格式，不能用字串。

---

### 專案四：宇樹 G1 機器人
**狀態：** 規劃階段，尚未開始
**架構：** Isaac Sim + Isaac Lab + GR00T，Sim-to-Real
**需求：** RTX 4090 / A100，64GB RAM，Ubuntu 22.04，ROS2 Humble
**路徑：** `D:\kyle\work\!開發中專案\宇樹G1開發\`

---

### 專案五：ugo 客戶接待展示（手機控制）
**狀態：** ✅ 展示完成（2026-04-25）
**部署：** `https://ugo-demo-server-9d0j.onrender.com`（Render Free，冷啟動約 50 秒）
**機器人：** ugo Pro（UG04PA-A08450003）、ugo Mini（UM01AA-A04560004）
**功能：** 手機控制 Pro+Mini、LLM 對話、六樓讀錶頭、NVIDIA 自動重辨識、LINE 通知

---

### 專案六：MAiRA Modbus TCP
**狀態：** 規劃階段，尚未開始

---

## 同步架構

- **GitHub：** `a0973207074-bot`（全 private，除 cascade/my-agent-config）
- **Google Drive：** `kyle-dev-setup/`（大型檔案、.env、腳本）
- **每日 09:00：** 自動雙向同步所有 repo + .env，新 repo 自動 clone
- **Sync log：** `~/.kyle-sync.log`

---

## Coding Guidelines（Karpathy）

Behavioral guidelines to reduce common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
