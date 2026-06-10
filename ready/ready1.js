console.log("====自動販売機====");

// 入力を受け取るだけのプログラム
/* 投入金額の入力 */
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";

const rl = readline.createInterface({input, output});

rl.question("投入金額を入力してください：", (answer) =>{
  console.log(typeof answer); // データ型の確認用
  console.log("==文字列を数値に変換==");
  const num = Number(answer);
  console.log(typeof num);
  console.log(`投入金額は${num}円です`);
  rl.close();
});