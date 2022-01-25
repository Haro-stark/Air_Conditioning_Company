import { Customer } from './Customer';
import { Product } from './Product';

export interface Budget {
  budgetId: number;
  name: string;
  totalPrice: number;
  budgetStatus: string;
  productList: Product[];
  customer: Customer;
}
