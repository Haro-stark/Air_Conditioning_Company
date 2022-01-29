import { SupplierProducts } from "./SupplierProducts";

export interface Supplier {
  supplierId: number;
  supplierName: string;
  supplierProducts: SupplierProducts[];
}