// 商品一覧表示
/* 1つ1つの商品をオブジェクト(key:value)を使って表現 */
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
/* 商品一覧を配列を使って管理する */
const product = [water, tea, coffee];
for( let i = 0; i < product.length; i++){
  // console.log(`${i+1}: ${name} ${price}円`);
  console.log(product[i]);
  console.log(product[i].name);
  console.log(product[i].price);
  console.log(`${i+1}: ${product[i].name} ${product[i].price}円`);
}