# Node.js 22が入ったイメージを使う
# -> Node.js 22の箱を作る
FROM node:22-slim

# 作業場所を/workspaceにする
# 作業場所を決める
WORKDIR /workspace

COPY . .

# グローバルにnodeが使えればJSの実行には十分
# 必要に応じてpnpmやtypescriptを追加できる

# ファイルを保存すると自動で再実行してくれるツール
# nodemonを入れる
RUN npm install -g nodemon