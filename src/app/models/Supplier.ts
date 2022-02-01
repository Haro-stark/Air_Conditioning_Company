import { SupplierProducts } from "./SupplierProducts";

export interface Supplier {
  supplierId: any;
  supplierName: string;
  supplierProducts: SupplierProducts[];
}