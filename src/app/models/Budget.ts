import { Customer } from './Customer';
import { Product } from './Product';

export interface Budget {
  budgetId: number;
  name: string;
  totalPrice: number;
  status: string;
  productList: Product[];
  customer: Customer;
}
