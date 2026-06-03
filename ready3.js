// 投入金額の入力
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";

const rl1 = readline.createInterface({input, output});

// 商品一覧の管理
const water = {
  name: "水",
  price: 120
};
const tea = {
  name: "お茶",
  price: 150
};
const coffee = {
  name: "コーヒー",
  price: 130
};
const product = [water, tea, coffee];

rl1.question("投入金額を入力してください：", (answer1) =>{
  const num1 = Number(answer1);
  console.log(`投入金額：${num1}円`);

  console.log(""); // 空白の行の挿入

  // 商品一覧表示
  for( let i = 0; i < product.length; i++){
    console.log(`${i+1}: ${product[i].name} ${product[i].price}円`);
  }

  console.log(""); // 空白の行の挿入

  // 商品番号入力
  const rl2 = readline.createInterface({input, output});

  rl2.question("商品番号を入力してください：", (answer2) =>{
    const num2 = Number(answer2);
    let index = num2 - 1;
    console.log(index);
  
    console.log(""); // 空白の行の挿入

    // 選択されたオブジェクトを表示
    console.log("選択商品：");
    console.log(product[index]);

    rl2.close();
  });

  rl1.close();

});








