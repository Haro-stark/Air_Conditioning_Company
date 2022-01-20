import { Customer } from './Customer';
import { Product } from './Product';

export interface Budget {
  budgetId: number;
  budgetName: String;
  totalPrice: number;
  budgetStatus: String;
  productList: Product[];
  customer: Customer;
}
