import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/Product';
import { Supplier } from 'src/app/models/Supplier';
import { SupplierProducts } from 'src/app/models/SupplierProducts';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css', '../../shared/icon.css'],
})
export class SuppliersComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;
  newSupplier: Supplier = {
    supplierId: 0,
    supplierName: '',
    supplierProducts: [
      {
        basePrice: 0,
        characteristics: '',
        name: '',
        productCount: 0,
        tax: 0,
      },
    ],
  };
  suppliers: Supplier[] = [
    /*    {
      supplierId: 0,
      supplierName: 'supply 1',
      supplierProducts: [
        {
          productId: 0,
          name: 'prod1',
          characteristics: 'asdfs',
          basePrice: 0,
          tax: 0,
          productCount: 5,
        },
        {
          productId: 0,
          name: 'prod2',
          characteristics: 'xzcv',
          basePrice: 0,
          tax: 0,
          productCount: 2,
        },
      ],
    },
    {
      supplierId: 1,
      supplierName: 'supply 2',
      supplierProducts: [
        {
          productId: 0,
          name: 'v,m',
          characteristics: 'rtyk',
          basePrice: 20,
          tax: 0,
          productCount: 10,
        },
      ],
    }, */
  ];
  supplier!: Supplier;
  showSupplierProducts: Boolean = false;
  showEditSupplierProductForm: Boolean = false;
  updatedSupplier!: Supplier;
  showAddSupplierForm: Boolean = false;
  errorMessage!: string;
  showAddSupplierProductForm = false;
  showEditSupplierForm: Boolean = false;
  formSubmitted = false;
  showErrorAlert = false;
  showSuccessAlert = false;
  loading = false;
  apiRequestError!: {
    error: { text: string };
    name: string;
    message: string;
    status: 0;
    url: string;
  };
  productIndex: number = -1;
  apiSuccessResponse = '';
  apiErrorResponse: string = '';
  numberOfProducts!: number;
  productArray: Product[] = new Array<Product>();
  addSupplierProduct: SupplierProducts = {
    name: '',
    characteristics: '',
    basePrice: 0,
    tax: 0,
    productCount: 0,
  };
  updatedSupplierProduct!: SupplierProducts;
  supplierId!: number;
  processingNetworkRequest = false;

  constructor(
    private cd: ChangeDetectorRef,
    private httpSupplierService: HttpService,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.httpSupplierService.getSupplier().subscribe({
      next: (response: any) => {
        if (response.data && response.status === 200) {
          this.suppliers = response.data;
        } else {
          this.showApiErrorResponse(response.message);
        }
        this.loading = false;
      },

      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
  }

  onSubmit() {
    console.log(
      this.newSupplier.supplierName,
      this.newSupplier.supplierProducts?.map((product) => product)
    );

    if (
      !this.newSupplier.supplierName ||
      this.newSupplier.supplierName.trim().length === 0 ||
      !this.newSupplier.supplierProducts[0].name ||
      this.newSupplier.supplierProducts[0].name.trim().length === 0
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.errorMessage = '';
      this.processingNetworkRequest = true;
      let addNewSupplier = JSON.parse(JSON.stringify(this.newSupplier));
      this.httpSupplierService.addSupplier(addNewSupplier).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            addNewSupplier.supplierId = response.data.supplierId;
            this.suppliers.push(addNewSupplier);
            console.log(response, addNewSupplier);
            this.showApiSuccessResponse(response.message);
            this.showAddSupplierForm = false;
            this.formSubmitted = true;
          } else this.showApiErrorResponse(response.message);
        },
        error: () => {
          this.showApiErrorResponse();
        },
      });
    }
    return this.errorMessage;
  }

  onClickToggleAddSupplierForm() {
    setTimeout(() => {
      this.errorMessage = '';
      console.log('form', this.formSubmitted);
      this.showAddSupplierForm = !this.showAddSupplierForm;
      this.cd.markForCheck();
    }, 200);
  }
  onClickToggleEditSupplierForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showEditSupplierForm = !this.showEditSupplierForm;
      this.cd.markForCheck();
    }, 200);
  }
  onEditSupplier(supplier: Supplier) {
    this.updatedSupplier = { ...supplier };
    console.log('updatedSupplier', this.updatedSupplier);
    setTimeout(() => {
      this.showEditSupplierForm = true;
      this.cd.markForCheck();
    }, 250);
  }

  onUpdateSupplier(updatedSupplier: Supplier) {
    this.errorMessage = '';
    console.log(
      this.updatedSupplier.supplierId,
      this.updatedSupplier.supplierProducts?.map((product) => product)
    );

    if (
      !this.updatedSupplier.supplierName ||
      this.updatedSupplier.supplierName.trim().length === 0
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else {
      console.log(updatedSupplier);
      this.processingNetworkRequest = true;
      this.httpSupplierService.updateSupplier(updatedSupplier).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.showApiSuccessResponse(response.message);
          } else {
            this.showApiErrorResponse(response.message);
          }
        },
        error: (error: any) => {
          this.showApiErrorResponse();
        },
        complete: () => {
          this.showEditSupplierForm = false;
          this.formSubmitted = true;
          this.processingNetworkRequest = false;
        },
      });
    }
    return this.errorMessage;
  }

  onDeleteSupplier(id: number, supplier: Supplier) {
    this.processingNetworkRequest = true;
    this.httpSupplierService.deleteSupplier(id).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.showApiSuccessResponse(response.message);
          this.suppliers = this.suppliers.filter(
            (o) => o.supplierId != supplier.supplierId
          );
          this.processingNetworkRequest = false;
        } else {
          this.showApiErrorResponse(response.message);
        }
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
  }

  buyProduct(productId: any) {
    let quantityToBuy: any = prompt('Enter a Value');
    let quantity!: number;
    console.log('quantity', quantityToBuy, productId);
    if (quantityToBuy && quantityToBuy.trim().length !== 0) {
      quantity = Number.parseInt(quantityToBuy);
    }

    if (quantity && quantity > 0) {
      this.processingNetworkRequest = true;
      this.httpSupplierService
        .buySupplierProducts(productId, quantity)
        .subscribe({
          next: (response: any) => {
            if (response.status === 200) {
              this.showApiSuccessResponse(response.message);
            } else this.showApiErrorResponse(response.message);
            this.processingNetworkRequest = false;
          },
          error: (error: any) => {
            this.showApiErrorResponse();
          },
        });
    } else {
      this.errorMessage = 'please enter a correct quantity value';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3500);
    }
  }

  onEditSupplierProducts(supplier: Supplier, editProduct: SupplierProducts) {
    this.productIndex = supplier.supplierProducts.findIndex(
      (product: SupplierProducts) => product.productId === editProduct.productId
    );

    this.updatedSupplierProduct = { ...editProduct };
    console.log('updatedSupplier', this.updatedSupplier);
    setTimeout(() => {
      this.showEditSupplierProductForm = true;
      this.cd.markForCheck();
    }, 250);

    this.supplierId = supplier.supplierId;
  }
  addSupplierProducts() {
    this.processingNetworkRequest = true;
    this.httpSupplierService
      .addSupplierProducts(this.addSupplierProduct, this.supplierId)
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.showApiSuccessResponse(response.message);
            this.suppliers.map((value) => {
              if (value.supplierId === this.supplierId)
                value.supplierProducts.push(this.addSupplierProduct);
            });
            this.formSubmitted = true;
            this.showAddSupplierProductForm = false;
          } else {
            this.showApiErrorResponse(response.message);
          }
        },
        error: (error: any) => {
          this.showApiErrorResponse();
        },
      });
  }
  updateSupplierProducts() {
    this.errorMessage = '';
    console.log(
      this.updatedSupplierProduct.name,
      this.updatedSupplierProduct.characteristics
    );

    if (
      !this.updatedSupplierProduct.name ||
      this.updatedSupplierProduct.name.trim().length === 0 ||
      !this.updatedSupplierProduct.characteristics
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else {
      this.processingNetworkRequest = true;
      this.httpSupplierService
        .updateSupplierProduct(this.updatedSupplierProduct)
        .subscribe({
          next: (response: any) => {
            if (response.status === 200) {
              this.showApiSuccessResponse(response.message);
            } else {
              this.showApiErrorResponse(response.message);
            }
          },
          error: (error: any) => {
            this.showApiErrorResponse();
          },
          complete: () => {
            this.showEditSupplierForm = false;
            this.formSubmitted = true;
            this.processingNetworkRequest = false;
          },
        });
    }
    return this.errorMessage;
  }
  onDeleteSupplierProduct(productId?: number) {
    console.log(this.supplier, productId);
    //this.processingNetworkRequest = true;
    this.supplier.supplierProducts = this.supplier.supplierProducts.filter(
      (product) => product.productId != productId
    );
    this.suppliers = this.suppliers.map((supplier: Supplier) => {
      if (supplier.supplierId === this.supplier.supplierId)
        supplier = this.supplier;
      return supplier;
    });
    console.log(this.supplier);

    console.log(this.suppliers);
    /*  

     this.httpSupplierService.deleteSupplier(productId).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.showApiSuccessResponse(response.message);
          this.suppliers = this.suppliers.filter((supplier: Supplier) =>
            supplier.supplierProducts.filter(
              (product: SupplierProducts) => product.productId != productId
            )
          );
          this.processingNetworkRequest = false;
        } else {
          this.showApiErrorResponse(response.message);
        }
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    }); 
    
    */
    alert('coming soon');
  }

  toggleAddSupplierProductForm(id?: number) {
    console.log(id);
    this.showAddSupplierProductForm = !this.showAddSupplierProductForm;
    if (id) this.supplierId = id;
  }

  toggleSupplierProductsList(supplier?: Supplier) {
    if (supplier) {
      this.supplier = { ...supplier };
    }
    this.showSupplierProducts = !this.showSupplierProducts;
  }

  showApiErrorResponse(message?: any) {
    if (message) {
      this.apiErrorResponse = message;
    } else {
      this.apiErrorResponse =
        'Error! please check your internet connection and try again';
    }
    this.showErrorAlert = true;
    this.processingNetworkRequest = false;
    setTimeout(() => {
      this.showErrorAlert = false;
      this.loading = false;
    }, 3500);
  }

  showApiSuccessResponse(message: string) {
    this.apiSuccessResponse = message;
    this.showSuccessAlert = true;
    this.processingNetworkRequest = false;
    this.formSubmitted = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3500);
  }
}
