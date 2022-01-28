import { Customer } from './Customer';
import { Product } from './Product';
import { Services } from './Services';

export interface Budget {
  budgetId: number;
  budgetName: string;
  totalPrice: number;
  budgetStatus: string;
  productList: Product[];
  customer: Customer;
  service: Services[];
}
