console.log("====自動販売機====");

// 商品一覧の管理
const product = [
  {
    name: "水",
    price: 100,
    temp: "つめたい",
    image: "",
    stock: 5
  },
  {
    name: "お茶",
    price: 120,
    temp: "つめたい",
    image: "",
    stock: 5
  },
  {
    name: "コーヒー",
    price: 130,
    temp: "つめたい",
    image: "",
    stock: 5
  },
  {
    name: "コーンポタージュ",
    price: 140,
    temp: "あたたかい",
    image: "",
    stock: 5
  },
  {
    name: "ココア",
    price: 150,
    temp: "あたたかい",
    image: "",
    stock: 5
  },
  {
    name: "お茶",
    price: 120,
    temp: "あたたかい",
    image: "",
    stock: 5
  } 
];

// 商品一覧表示
const productList = document.getElementById("product-list");
product.forEach((item, index) => {
  // 温度判定の定義
  const tempClass =
    item.temp === "あたたかい" ? "hot" : "cold";
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <img src="${item.image}" alt="${item.name}">
  <p class="product-name">${item.name}
    <span>${item.price}円</span>
  </p>
  <p class="${tempClass}">${item.temp}</p>
  <button onclick="buyProduct(${index})">
    購入
  </button>
  `;

  productList.appendChild(card);
})

// 投入金額の管理
let insertedMoney = 0;

const moneyDisplay =
  document.getElementById("money-display");

// 投入時
function insertMoney(amount){
  if(insertedMoney + amount > 1000){
    alert("1000円以上は投入できません");
    return;
  }
  insertedMoney += amount;
  moneyDisplay.textContent = insertedMoney;
}

const buyBtn = document.getElementById('buyBtn');

buyBtn.addEventListener("click", () => {
  const num1 = insertedMoney;
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
      <p>選択商品：${selectedProduct.name}</p>
      <p>購入に成功しました</p>
      <p>おつり：${change}円</p>
    `;
  } else {
    const short = selectedProduct.price - num1;

    result.innerHTML = `
      <p>選択商品：${selectedProduct.name}</p>
      <p>購入に失敗しました</p>
      <p>不足金額：${short}円</p>
    `;
  }
});