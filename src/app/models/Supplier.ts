import { Product } from "./Product";

export interface Supplier {
    supplierId: Long;
    orderNumber: string;
    basePrice: number;
    tax: number;
    productSold: Product;
}