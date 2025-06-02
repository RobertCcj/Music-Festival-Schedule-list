# 音樂祭行前節目規劃平台 Megaport Planner

> 🎧 結合 React、Tailwind CSS 與 Spotify OAuth，打造你的音樂祭前個人／團隊節目行程表

這是一個專為音樂祭參加者設計的節目排程規劃平台，幫助使用者在活動前預先確認想看的演出節目，並能與朋友一同規劃共同的觀賞清單。此專案為本人前端工程師求職作品，強調實作能力、元件結構設計與 OAuth 整合。

---

## ✨ 專案特色

### 🎫 個人節目行程規劃
- 顯示每日不同舞台的演出節目表（支援 3/29、3/30 與野人祭日期）
- 點選節目即可標示為「想看」，以 Tailwind CSS 動態呈現選取狀態
- 舞台可篩選、演出日可切換、排程表具備捲動視圖

### 👥 團隊行程投票機制
- 使用者可虛擬加入團隊（如：團隊 X、Y、Z）
- 顯示每場演出有多少隊員想看，票數越多亮度越高
- 幫助團隊間安排共同行程

### 🔐 Spotify OAuth 2.0 (PKCE) 登入整合
- 支援以 Spotify 帳號登入（實作完整 PKCE 流程）
- 顯示使用者暱稱與頭像
- 使用 React Context 與 localStorage 管理登入狀態

### 🎶 未來功能：創建暖身歌單
- 根據使用者勾選節目自動建立對應 Spotify 歌單
- 將使用 Redux 處理跨頁資料同步
- 串接 Spotify Web API 建立真正的個人化歌單

---

## 🛠️ 使用技術

| 分類       | 技術／框架                          |
|------------|-------------------------------------|
| 前端開發   | React (Hooks, Function Components) |
| 樣式框架   | Tailwind CSS                        |
| 狀態管理   | React Context（登入狀態）、Redux（預計加入） |
| 授權整合   | Spotify OAuth 2.0 with PKCE         |
| UI 元件庫 | Headless UI                         |
| 開發工具   | Vite、React Router DOM              |

---

## 📂 專案結構簡介

