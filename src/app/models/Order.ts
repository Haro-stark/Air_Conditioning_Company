import { Optional } from '@angular/core';
import { Customer } from './Customer';
import { Product } from './Product';

export interface Order {
  orderId: number;
  name: string;
  status: string;
  type?: string[];
  productList: Product[];
  customer: Customer;
}
