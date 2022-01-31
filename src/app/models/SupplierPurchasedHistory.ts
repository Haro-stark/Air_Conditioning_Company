import { Product } from './Product';
import { SupplierProducts } from './SupplierProducts';

export interface SupplierPurchasedHistory {
  supplierOrderId: number;
  totalPrice: number;
  supplierProducts: SupplierProducts[];
}
