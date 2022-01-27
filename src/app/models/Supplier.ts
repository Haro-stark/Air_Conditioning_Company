import { SupplierProducts } from "./SupplierProducts";

export interface Supplier {
  supplierId: number;
  name: string;
  supplierProducts?: SupplierProducts[];
  orderNumber?: string;
}