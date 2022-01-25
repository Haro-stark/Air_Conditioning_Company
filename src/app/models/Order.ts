import { Customer } from "./Customer";
import { Product } from "./Product";

export interface Order {
    orderId: number;
    type: string;
    productList?: Product[];
    customer?: Customer;
}