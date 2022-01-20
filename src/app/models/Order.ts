import { Customer } from "./Customer";
import { Product } from "./Product";
import { ServicesEnum } from "./ServicesEnum";

export interface Order {
    orderId: Long;
    type: ServicesEnum;
    productList: Product[];
    customer: Customer;
}