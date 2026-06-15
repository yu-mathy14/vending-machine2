// モジュールの読み込み
const http = require("http");
const fs = require("fs");
const path = require("path");

// Webサーバーを作るためのモジュール
// サーバーの作成
const server = http.createServer((req, res) => {

  // ファイルパスを入れる変数
  let filePath;

  // トップページの場合
  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  // それ以外
  } else {
    filePath = path.join(__dirname, req.url);
  }

  // 拡張子を取得
  const ext = path.extname(filePath);

  // Content-Typeを決める(初期値)
  let contentType = "text/plain";

  if (ext === ".html") {
    contentType = "text/html"; // html用の設定
  } else if (ext === ".js") {
    contentType = "text/javascript"; // js用の設定
  } else if (ext === ".css") {
    contentType = "text/css"; // css用の設定
  }

  // ファイルの読み込み
  fs.readFile(filePath, (err, data) => {
    // エラー時 -> 404 Not Foundを返す
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    // 正常時のレスポンス -> HTTPステータス：200 OKを返す
    res.writeHead(200, {
      "Content-Type": contentType
    });

    // ファイル内容を返す
    res.end(data);
  });
});

// サーバーの起動
server.listen(3000, "0.0.0.0", () => {
  // 起動確認 サーバー起動時にコンソール出力
  console.log("Server running on port 3000");
});