import { Customer } from "./Customer";
import { Product } from "./Product";

export interface Budget {
    budgetId: Long;
    totalPrice: number;
    budgetStatus: String;
    productList: Product[];
    customer: Customer;
}