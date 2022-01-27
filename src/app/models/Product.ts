import * as Long from "long";

export interface Product {
  productId: number;
  name: string;
  characteristics: string;
  price: number;
  tax: number;
  quantityInStock: number;
}