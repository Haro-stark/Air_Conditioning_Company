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
  updatedSupplier!: Supplier;
  showAddSupplierForm: Boolean = false;
  errorMessage!: string;
  showAddProductForm = false;
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
      this.newSupplier.supplierName.trim().length === 0
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.processingNetworkRequest = true;
      this.httpSupplierService.addSupplier(this.newSupplier).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.newSupplier.supplierId = response.data.supplierId;
            this.suppliers.push(this.newSupplier);
            console.log(response, this.newSupplier);
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
  onEditSupplier(id: number, supplier: Supplier, productid: any) {
    this.productIndex = supplier.supplierProducts.findIndex(
      (product: SupplierProducts) => product.productId === productid
    );

    this.updatedSupplier = { ...supplier };
    setTimeout(() => {
      this.showEditSupplierForm = true;
      this.cd.markForCheck();
    }, 250);
  }

  onDeleteSupplier(id: number, supplier: Supplier) {
    this.processingNetworkRequest= true;
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
  onUpdateSupplier(updatedSupplier: Supplier) {
    this.errorMessage = '';
    console.log(
      this.updatedSupplier.supplierId,
      this.updatedSupplier.supplierProducts?.map((product) => product)
    );

    if (
      !this.updatedSupplier.supplierName ||
      this.updatedSupplier.supplierName.trim().length === 0 ||
      !this.updatedSupplier.supplierProducts
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else {
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

  buyProduct(productId: any) {
    let quantityToBuy: any = prompt('Enter a Value');
    let quantity!: number;
    console.log('quantity', quantityToBuy, productId);
    if (quantityToBuy && quantityToBuy.trim().length !== 0) {
      quantity = Number.parseInt(quantityToBuy);
    }

    if (quantity && quantity > 0) {
      this.httpSupplierService
        .buySupplierProducts(productId, quantity)
        .subscribe({
          next: (response: any) => {
            if (response.status === 200) {
              this.showApiSuccessResponse(response.message);
            } else this.showApiErrorResponse(response.message);
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
            this.showAddProductForm = false;
          } else {
            this.showApiErrorResponse(response.message);
          }
        },
        error: (error: any) => {
          this.showApiErrorResponse();
        },
      });
  }

  showSupplierProductsForm(id: number) {
    this.showAddProductForm = true;
    this.supplierId = id;
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
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3500);
  }
}
