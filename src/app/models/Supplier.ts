import { Product } from "./Product";

export interface Supplier {
    supplierId: number;
    orderNumber: string;
    basePrice: number;
    tax: number;
    productSold: Product;
}