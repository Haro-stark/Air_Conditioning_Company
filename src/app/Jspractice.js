let data = [
  {
    supplierId: 1,
    supplierName: "K-Electronics",
    supplierProducts: [
      {
        productId: 1,
        name: "Air Cleaner",
        characteristics: "clean",
        basePrice: 100.0,
        tax: 10.0,
        productCount: 0,
      },
      {
        productId: 2,
        name: "Clothes washer",
        characteristics: "wash",
        basePrice: 500.0,
        tax: 20.0,
        productCount: 0,
      },
      {
        productId: 4,
        name: "car",
        characteristics: "a good car",
        basePrice: 150.0,
        tax: 5.0,
        productCount: 0,
      },
    ],
  },
  {
    supplierId: 2,
    supplierName: "Fawad Electronics",
    supplierProducts: [
      {
        productId: 3,
        name: "Washing Machine",
        characteristics: "wash",
        basePrice: 1110.0,
        tax: 20.0,
        productCount: 0,
      },
      {
        productId: 5,
        name: "oppo phones",
        characteristics: "a great ..",
        basePrice: 200.0,
        tax: 10.0,
        productCount: 0,
      },
    ],
  },
];

/* let newarr = data.forEach((value, index) => {
  if (value.supplierId == 2) {
    console.log(value.supplierName);
    value.supplierProducts.push({
      productId: 10,
      name: "fawad",
      characteristics: "nope",
      basePrice: 0,
      tax: 0,
      productCount: 0,
    });
  }
}); */

let obj = {
  productId: 10,
  name: "fawad",
  characteristics: "nope",
  basePrice: 0,
  tax: 0,
  productCount: 10,
};
console.log(data.findIndex((value, index) => value.supplierId == 2));
data.map((value) => {
  if (value.supplierId == 2) {
    value.supplierProducts.push({...obj});
  }
});

obj.productCount = 200;
console.log(
  data
    .filter((value) => value.supplierId == 2)
    .map((value) => value.supplierProducts)
);
console.log(obj);
// console.log(data.filter((supplier) => (supplier.supplierId==2)).map((product) => product.supplierProducts));
