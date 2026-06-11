console.log("====自動販売機====");

// 商品を配列で管理
const product = [
  {
    name: "水",
    price: 100,
    temp: "つめたい",
    stock: 5
  },
  {
    name: "お茶",
    price: 120,
    temp: "つめたい",
    stock: 5
  },
  {
    name: "コーヒー",
    price: 130,
    temp: "つめたい",
    stock: 5
  },
  {
    name: "コーンポタージュ",
    price: 140,
    temp: "あたたかい",
    stock: 5
  },
  {
    name: "ココア",
    price: 150,
    temp: "あたたかい",
    stock: 5
  },
  {
    name: "お茶",
    price: 120,
    temp: "あたたかい",
    stock: 5
  } 
];

// 商品一覧表示
const productList = document.getElementById("product-list");
function renderProducts(){
  productList.innerHTML = "";
  product.forEach((item, index) => {
    // 温度判定の定義
    const tempClass =
      item.temp === "あたたかい"
        ? "hot"
        : "cold";

    const card = document.createElement("div");
    card.className = "card";
  
    card.innerHTML = `
      <p class="product-name">${item.name}
        <span>${item.price}円</span>
      </p>
      <p class="${tempClass}">${item.temp}</p>
      <p>在庫：${item.stock}</p>

      <button
        onclick="buyProduct(${index})"
          ${item.stock <= 0 ? "disabled" : ""}>
        ${item.stock <= 0 ? "売切" : "購入"}
      </button>
    `;

    productList.appendChild(card);
  });
}
renderProducts();

// 履歴管理用の共通関数の定義
const result = document.getElementById("result");

let purchaseLog = [];

function addLog(message) {
  purchaseLog.push(message);

  result.innerHTML = purchaseLog
    .map(log => `<p>${log}</p>`)
    .join("");
}


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

// 購入処理
function buyProduct(index) {
  const selectedProduct =
    product[index];

  const result =
    document.getElementById("result");

  // 売切れチェック
  if(selectedProduct.stock <= 0){
    addLog(
    `${selectedProduct.name}は売り切れです`
    );
    return;
  }

// 金額チェック
  if(insertedMoney <selectedProduct.price){
    addLog(
      `購入失敗：${selectedProduct.name}の購入には ${
      selectedProduct.price - insertedMoney}円不足しています`
    );
    return;
  }

// 購入成立
  insertedMoney -= selectedProduct.price;
  selectedProduct.stock--;

  moneyDisplay.textContent = insertedMoney;

  // ログに追加
  addLog(
  `${selectedProduct.name}を購入しました(残高：${insertedMoney}円)`
  );

  renderProducts();
}

// 返金機能
const refundBtn =
  document.getElementById("refundBtn");

refundBtn.addEventListener(
  "click",
  () => {
    if (insertedMoney === 0) {
      alert("返金するお金がありません");
      return;
    }

    const refundAmount = insertedMoney;

    alert(
      `${insertedMoney}円返却します`
    );

    insertedMoney = 0;

    moneyDisplay.textContent = insertedMoney;

    addLog(
      `${refundAmount}円を返金しました`
    );
});