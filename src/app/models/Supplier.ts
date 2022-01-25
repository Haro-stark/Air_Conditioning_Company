import { Product } from "./Product";

export interface Supplier {
  supplierId: number;
  name: string;
  basePrice: number;
  tax: number;
  productSold?: Product[];
  orderNumber?:string;
}