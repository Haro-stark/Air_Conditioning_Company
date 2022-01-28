import { Product } from './Product';

export interface SupplierPurchasedHistory {
  supplierOrderId: number;
  totalPrice: number;
  supplierProducts: Product[];
}
