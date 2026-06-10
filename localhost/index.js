console.log("====自動販売機====");

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

// 商品一覧表示
const select = document.getElementById("product");
for( let i = 0; i < product.length; i++){
  const option = document.createElement("option");

  option.value = i + 1 ;
  option.textContent = 
    `${i + 1}：${product[i].name} ${product[i].price}円`;
  
  select.appendChild(option);
}

const buyBtn = document.getElementById('buyBtn');

buyBtn.addEventListener("click", () => {
  const num1 = Number(
    document.getElementById("money").value
  );
  const result =document.getElementById("result");
  // abc入力チェック
  if (Number.isNaN(num1) || document.getElementById("money").value === ""){
    result.textContent = "半角数字を入力してください";
    return;
  }

  console.log(`投入金額：${num1}円`);

  const num2 = Number(select.value);
  let index = num2 - 1; 

  // 商品番号の入力チェック
  if (index < 0 || index >= product.length){
    result.textContent = "存在しない商品です";
    return;
  }

  // 選択商品の変数定義
  const selectedProduct = product[index];

  // 条件分岐で購入可能か判定
  if(num1 >= selectedProduct.price){
    const change = num1 - selectedProduct.price;

    result.innerHTML =`
      <p>選択商品：${selectedProduct.namre}</p>
      <p>購入に成功しました</p>
      <p>おつり：${change}円</p>
    `;
  } else {
    const short = selectedProduct.price = num1;

    result.innerHTML = `
      <p>選択商品：${selectedProduct.name}</p>
      <p>購入に失敗しました</p>
      <p>不足金額：${short}円</p>
    `;
  }
});