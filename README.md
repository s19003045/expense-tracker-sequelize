# 實作前端 + 後端：打造記帳本

## 建議

熟悉 HTML 、CSS、JavaScript 語法，且瞭解 Bootstrap、Font-awesome 前端框架的使用。

## 目標

- 打造記帳本 API。
- 建立 mongoDB 資料庫。
- 使用 mongoose 連接 mongoDB 資料庫。
- 建立使用者註冊/登入/登出功能
- 第三方登入

## 特色

- MVC model & RESTful
- RWD

## 網站功能

- 首頁：瀏灠所有帳本記錄
- 刪除帳本記錄
- 新增帳本記錄
- 修改帳本記錄
- 搜尋帳本記錄：依類別及日期區間
- 使用者註冊/登入/登出
- 第三方認證登入
- 可依據登入使用者，列出該使用者建立的帳本記錄資訊

## 後端工具

Node.js、Express、Express-handlebars
mongoDB、mongoose、method-override、
express-session、passport、
passport-local、passport-facebook、bcryptjs、
connect-flash、dotenv

## 環境建置

環境建置簡略帶過，安裝方式請參考官方網站。
依序介紹完成這支程式需要的軟體及套件：

- 安裝 VS code
  https://code.visualstudio.com/

* 安裝 VS code 常用套件：
  - Emment( Visual studio code 已經預設安裝的擴充套件，提供 快速編寫 HTML 與 CSS 的縮寫 )
    - Emment 常見縮寫： https://docs.emmet.io/cheat-sheet/
  - Bracket Pair Colorizer ( allows matching brackets to be identified with colours )
  - Live Server( 在檔案儲存的同時，就直接在瀏覽器裡同步看到結果)
  - Markdown Preview Enhanced ( 預覽 .md 檔案的 output )

- 安裝 Cmder
  https://cmder.net/
  常用指令同 windows 的 CMD
- 安裝 node.js
  https://nodejs.org/en/download/

  - 查看 node.js 版本指令：`node -v`

  - 以 node 啟動伺服器的指令如下(假設 app.js 是伺服器啟動的進入點)：`node app.js`

- 安裝 npm
  Node.js for Windows 於 0.6.2 版開始內建 npm，使用 nodejs.org 官方提供的安裝程式，不需要進一步的設定，就可以立即使用 npm 指令，對於 Windows 的開發者來說，大幅降低環境設定的問題與門檻。
  - 查看 npm 版本指令：`npm -v`
- 安裝 nodemon：啟動伺服器後，當專案資料夾中的檔案修改時，自動偵測，並自動重啟 server ，不需要手動再一次啟動 server。

  - 參考資料： https://www.npmjs.com/package/nodemon
  - 全域都可使用，不限於某專案資料夾，依下列指令安裝：`npm install -g nodemon`

  - 以 nodemon 啟動伺服器的指令如下(假設 app.js 是伺服器啟動的進入點)：`nodemon app.js`

- 安裝 mongoDB

  - 官方下載：https://www.mongodb.com/download-center/community

- 註冊 heroku 及下載 CLI
  - 註冊 heroku 帳號：https://www.heroku.com/home
  - 下載 heroku CLI：https://devcenter.heroku.com/articles/heroku-cli#download-and-install

## 安裝流程

- 下載專案
  - 從終端機下載：`https://github.com/s19003045/expense-tracker.git`
  - 直接點選 download 下載
- 開啟終端機，進入專案資料夾：
  `cd xpense-tracker`
- 安裝 npm：
  `npm install 10.16.3`
- 使用 npm 安裝 所有套件：
  `npm install express express-handlebars handlebars body-parser mongoose method-override passport passport-local passport-facebook express-session bcryptjs connect-flash dotenv`

- 將帳本記錄種子清單儲存至 mongoDB 資料庫：

  - `cd 專案資料夾/models/seeds`
  - 建立使用者種子清單至本地端 mongoDB 資料庫 `node userSeeder.js`
  - 建立記帳記錄種子清單至本地端 mongoDB 資料庫 `node user_record_seeder.js`

- 資料夾新增 .env 檔案，在檔案中設定環境變數，在開發階段使用。請至 facebook developer 申請 Client_ID、Client_SECRET，並存到 .env 檔案中。

  - `FACEBOOK_ID='xxxxxxxxxxxxx'`
  - `FACEBOOK_SECRET='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'`
  - `FACEBOOK_CALLBACK='http://localhost:3000/auth/facebook/callback'`

- 使用 package.json 的 scripts 執行：
  `npm run dev`
- server 啟動成功：
  `server listen to http://localhost:3000`
- 連線 mongoDB 成功：
  `connect to mongoDB successifully !`
- 啟動瀏灠器：
  網址：http://localhost:3000

## 畫面(手機)

- mobile UI
  ![mobile demo](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/mobile/expense-tracker-demo.png)
  

## 畫面

- 瀏灠所有帳本記錄
  ![首頁..瀏灠所有帳本記錄](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/index_page.png)

- 新增帳本記錄
  ![新增帳本記錄](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/newPage.png)

- 編輯帳本記錄
  ![編輯帳本記錄](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/editPage.png)

- 搜尋帳本記錄功能：依類別及日期區間篩選
  ![搜尋帳本記錄](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/searchFeature.png)

- 搜尋帳本記錄結果
  ![搜尋帳本記錄](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/searchResult.png)

- 註冊頁面
  ![註冊頁面](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/register.png)

- 登入頁面
  ![登入頁面](https://github.com/s19003045/expense-tracker/blob/master/imagesForGithub/login.png)

## 開發人員

[Gary Wu](https://github.com/s19003045)
