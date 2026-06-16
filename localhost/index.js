console.log("====自動販売機====");
// 飲み物温度の表示文言を一元管理するための定数
/* 配列のtempのvalueに直接"あたたかい"や"つめたい"
   を打ち込むとタイプミスの可能性あり */
/* 後から温度の表記を変えたい時に楽
ex) "あたたかい"->"HOT" "つめたい"->"COLD"など */
const TEMP = {
  HOT: "あったか〜い",
  COLD: "つめた〜い"
};
// 商品を配列で管理
/* idキーも追加した方がいい */
const products = [
  {
    id: 0,
    name: "水",
    price: 100,
    temp: TEMP.COLD,
    stock: 5
  },
  {
    id: 1,
    name: "お茶",
    price: 120,
    temp: TEMP.COLD,
    stock: 5
  },
  {
    id: 2,
    name: "コーヒー",
    price: 130,
    temp: TEMP.COLD,
    stock: 5
  },
  {
    id: 3,
    name: "コーンポタージュ",
    price: 140,
    temp: TEMP.HOT,
    stock: 5
  },
  {
    id: 4,
    name: "ココア",
    price: 150,
    temp: TEMP.HOT,
    stock: 5
  },
  {
    id: 5,
    name: "お茶",
    price: 120,
    temp: TEMP.HOT,
    stock: 5
  } 
];

// 商品一覧表示
/* HTML要素<section id="product-list"></section>への参照 */
const productList = document.getElementById("product-list");
// 商品一覧を画面に表示(再表示)するための関数
function renderProducts(){
  /* .innerHTML -> HTML文字列を要素に変換して中に入れる */
  /* productList.innerHTML -> productListの中にあるHTMLをすべて削除 */
  productList.innerHTML = "";
  /* forEach() -> 配列の要素を順番に1つずつ取り出して指定した処理を繰り返す
     item -> 配列内のオブジェクトの仮名(商品情報を取り出す)
     index -> インデックス番号(商品番号を取り出す)
    ※第二引数indexは使わないほうがいい、固定の値(item.idなど)を使った方が良い */
  products.forEach((item) => {
    // 温度判定の定義
    /* 三項演算子 -> if-e;se文による条件分岐を簡潔に記述する方法
    ex) 条件式 ? 真の場合の値 : 偽の場合の値 */
    const tempClass =
      item.temp === TEMP.HOT ? "hot" : "cold";
    
    // 商品カードを作るための<div>要素の作成
    /* HTML要素への参照 */
    const card = document.createElement("div");
    card.className = "card";

    // 在庫0なら売切扱い
    /* UI側の制御(利便性) -> 在庫が0になると購入ボタンを押せない */
    const isSoldOut = item.stock <= 0;
    /* 三項演算子 -> if-e;se文による条件分岐を簡潔に記述する方法
    ex) 条件式 ? 真の場合の値 : 偽の場合の値 */
    const disabledAttr = isSoldOut ? "disabled" : "";
    const buttonText = isSoldOut ? "売切" : "購入";

    // 商品カードを作成する -> <div>タグの所に追加
    /* .innerHTML -> HTML文字列を要素に変換して中に入れる */
    card.innerHTML = `
      <p class="product-name">${item.name}
        <span>${item.price}円</span>
      </p>
      <p class="${tempClass}">${item.temp}</p>
      <p>在庫：${item.stock}</p>

      <button onclick="buyProduct(${item.id})" ${disabledAttr}>
        ${buttonText}
      </button>
    `;

    // 作った商品カードを商品一覧に追加する
    /* .appendChild -> 要素の末尾に子要素を追加する */
    productList.appendChild(card);
  });
}
// 商品在庫の初期状態を表示
renderProducts();

// 履歴管理用
/* HTML要素への参照 */
const result = document.getElementById("result");
/* ログを格納する空配列の用意 */
const purchaseLog = [];
/* ログを追加する関数 */
function addLog(message) {
  /* .push() -> 配列の最後に追加する */
  purchaseLog.push(message);
  /* .innerHTML -> HTML文字列を要素に変換して中に入れる */
  result.innerHTML = purchaseLog
    // mapで各ログを配列に変換
    /* .map() -> 元の配列を加工して新しい配列を作る */
    .map(log => `<p>${log}</p>`)
    // join("")で1つのHTML文字列にする
    .join("");
}


// 投入金額の管理
/* 合計投入金額の初期値の定義 */
let insertedMoney = 0;
/* HTML要素への参照 */
const moneyDisplay = document.getElementById("money-display");

// 投入時
function insertMoney(amount){
  /* 条件分岐で投入金額の上限を設定 */
  if(insertedMoney + amount > 1000){
    alert("1000円以上は投入できません");
    return;
  }

  /* 合計投入金額に押されたボタンの数字(amount)を足して、
     その金額を合計投入金額とする */
  insertedMoney += amount;
  /* moneyDisplayに合計投入金額を表示する */
  /* .textContent -> HTMLとして解釈せず文字として表示する */
  moneyDisplay.textContent = insertedMoney;
}

// 購入処理
function buyProduct(index) {
  // 選択商品の定数定義
  const selectedProduct = products[index];

  // 売切れチェック
  /* 処理側の制御(正しさ)
  -> 万が一buyProduct()が呼ばれても購入させないようにする */
  /* 条件分岐で在庫数が0の時の処理 */
  if(selectedProduct.stock <= 0){
    // ログに追加
    addLog(
    `${selectedProduct.name}は売り切れです`
    );
    return;
  }

// 金額チェック
  /* 条件分岐で投入金額不足時の処理 */
  if(insertedMoney < selectedProduct.price){
    // ログに追加
    addLog(
      `購入失敗：${selectedProduct.name}の購入には ${
      selectedProduct.price - insertedMoney}円不足しています`
    );
    return;
  }

// 購入成立
  /* 合計投入金額から選択商品の金額を引いて、
     その金額を最新の合計投入金額とする */
  insertedMoney -= selectedProduct.price;
  /* 購入されたら、選択商品の在庫を1減らす */
  selectedProduct.stock--;

  /* moneyDisplayに合計投入金額を表示する */
  /* .textContent -> HTMLとして解釈せず文字として表示する */
  moneyDisplay.textContent = insertedMoney;

  // ログに追加
  addLog(
  `${selectedProduct.name}(${selectedProduct.temp})を購入しました(残高：${insertedMoney}円)`
  );

  // 商品購入後、変動した在庫を反映してから商品一覧を再表示
  renderProducts();
}

// 返金機能
/* HTML要素への参照 */
const refundBtn = document.getElementById("refundBtn");

// 返金ボタンクリック時の処理
refundBtn.addEventListener(
  "click",
  () => {
    /* 条件分岐で残高0円時の処理 */
    if (insertedMoney === 0) {
      // アラートの表示
      alert("返金するお金がありません");
      return;
    }

    // おつり定数の定義
    /* おつり返却のログ表示の前に合計投入金額が0に更新されてしまうため、
    更新される前の残高を定数に格納しておく */
    const refundAmount = insertedMoney;

    // アラートの表示
    alert(
      `${insertedMoney}円返却します`
    );

    // 返却後は合計投入金額を0円に更新
    insertedMoney = 0;

    /* moneyDisplayに合計投入金額を表示する */
    /* .textContent -> HTMLとして解釈せず文字として表示する */
    moneyDisplay.textContent = insertedMoney;

    // ログに追加
    addLog(
      `${refundAmount}円を返金しました`
    );
});