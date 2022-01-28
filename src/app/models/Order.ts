import { Optional } from '@angular/core';
import { Customer } from './Customer';
import { Product } from './Product';
import { Services } from './Services';

export interface Order {
  orderId: number;
  orderName: string;
  empPrice: number;
  totalPrice: number;
  productList?: Product[];
  customer: Customer;
  service: Services[];
}
