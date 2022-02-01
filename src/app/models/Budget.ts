import { Customer } from './Customer';
import { Product } from './Product';
import { Services } from './Services';

export interface Budget {
  budgetId: any;
  budgetName: string;
  totalPrice?: number;
  budgetStatus: string;
  assistantHours: number;
  officerHours: number;
  productList: Product[];
  customer: Customer;
  service: Services[];
}
