import * as Long from "long";

export interface Product {
  productId: any;
  name: string;
  characteristics: string;
  price: number;
  tax: number;
  quantityInStock: number;
}