import * as Long from "long";

export interface Product {
    productId: Long;
    name: string;
    characteristics: string;
    price: number;
    quantityInStock: number
}