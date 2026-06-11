console.log("====自動販売機====");
// 飲み物温度の定数の定義
/* 配列のtempのvalueに直接"あたたかい"や"つめたい"
   を打ち込むとタイプミスの可能性あり */
/* 後から温度の表記を変えたい時に楽
ex) "あたたかい"->"HOT" "つめたい"->"COLD"など */
const TEMP = {
  HOT: "あったか〜い",
  COLD: "つめた〜い"
};
// 商品を配列で管理
const product = [
  {
    name: "水",
    price: 100,
    temp: TEMP.COLD,
    stock: 5
  },
  {
    name: "お茶",
    price: 120,
    temp: TEMP.COLD,
    stock: 5
  },
  {
    name: "コーヒー",
    price: 130,
    temp: TEMP.COLD,
    stock: 5
  },
  {
    name: "コーンポタージュ",
    price: 140,
    temp: TEMP.HOT,
    stock: 5
  },
  {
    name: "ココア",
    price: 150,
    temp: TEMP.HOT,
    stock: 5
  },
  {
    name: "お茶",
    price: 120,
    temp: TEMP.HOT,
    stock: 5
  } 
];

// 商品一覧表示
/*  */
const productList = document.getElementById("product-list");
function renderProducts(){
  productList.innerHTML = "";
  product.forEach((item, index) => {
    // 温度判定の定義
    const tempClass =
      item.temp === "あたたかい" ? "hot" : "cold";

    const card = document.createElement("div");
    card.className = "card";

    // 在庫0なら売切扱い
    /* UI側の制御(利便性) -> 在庫が0になると購入ボタンを押せない */
    const isSoldOut = item.stock <= 0;
    const disabledAttr = isSoldOut ? "disabled" : "";
    const buttonText = isSoldOut ? "売切" : "購入";

    card.innerHTML = `
      <p class="product-name">${item.name}
        <span>${item.price}円</span>
      </p>
      <p class="${tempClass}">${item.temp}</p>
      <p>在庫：${item.stock}</p>

      <button onclick="buyProduct(${index})" ${disabledAttr}>
        ${buttonText}
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
  const selectedProduct = product[index];

  // 売切れチェック
  /* 処理側の制御(正しさ)
  -> 万が一buyProduct()が呼ばれても購入させないようにする */
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