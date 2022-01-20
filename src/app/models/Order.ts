import { Customer } from "./Customer";
import { Product } from "./Product";
import { ServicesEnum } from "./ServicesEnum";

export interface Order {
    orderId: number;
    type: ServicesEnum;
    productList: Product[];
    customer: Customer;
}