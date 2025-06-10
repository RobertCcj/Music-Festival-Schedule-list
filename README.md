## 🎬 作品展示影片

[[大港開聽作品展示影片]([https://img.youtube.com/vi/ON2lDeVqUcI/maxresdefault.jpg](https://www.youtube.com/watch?v=ON2lDeVqUcI))]

> 🔺 點擊上方連結前往觀看展示影片


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

```
src/
├── components/ # 共用元件（Header, ScheduleTable, StageFilter 等）
├── pages/ # 頁面（Login, PersonalSchedule, TeamSchedule 等）
├── data/ # 前端假資料（演出與舞台清單）
├── contexts/ # 使用者登入狀態管理（Context）
├── utils/ # 共用工具函數（如 className 合併）
```

---

## 🚀 安裝與執行方式

```
git clone https://github.com/your-username/megaport-planner.git
cd megaport-planner
npm install
npm run dev
```

環境變數設定（串接 Spotify）
若要啟用 Spotify OAuth 登入功能，請在專案根目錄建立 .env 檔案，並加入以下內容：

env
複製
編輯
VITE_SPOTIFY_CLIENT_ID=你的_spotify_client_id
註：此專案採用 PKCE 授權流程，無需 client secret。

---

## 📅 開發進度追蹤

- [x] 個人節目選擇與舞台濾鏡切換
- [x] 團隊行程統計（票數亮度顯示）
- [x] Spotify OAuth 登入整合（PKCE 流程）
- [ ] 使用 Redux 儲存跨頁節目選擇狀態
- [ ] 串接 Spotify Web API 建立歌單

---

## 🙋‍♂️ 關於我

本專案由 Robert Chuang 開發，旨在展示我在前端工程開發、元件設計與 API 整合上的實作能力。

若您正在尋找具備 React 開發經驗、熟悉 Tailwind CSS 且能獨立處理 OAuth 整合的前端工程師，歡迎與我聯繫 🙌

📫 **聯絡方式：**

- 🔗 [CakeResume](https://www.cake.me/me/j-cc)
- 🐱 [GitHub](https://github.com/RobertCcj)
- 💼 [LinkedIn](https://www.linkedin.com/in/robert-chuang-68b302211/)
- ✉️ Email：robert0963938708@gmail.com
