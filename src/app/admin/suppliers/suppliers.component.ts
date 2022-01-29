import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/Product';
import { Supplier } from 'src/app/models/Supplier';
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
  showEditSupplierForm: Boolean = false;
  formSubmitted = false;
  showErrorAlert = false;
  showSuccessAlert = false;
  apiRequestError!: {
    error: { text: string };
    name: string;
    message: string;
    status: 0;
    url: string;
  };
  apiSuccessResponse = '';
  apiErrorResponse: string = '';
  numberOfProducts!: number;
  productArray: Product[] = new Array<Product>();
  processingNetworkRequest = false;
  constructor(
    private cd: ChangeDetectorRef,
    private httpSupplierService: HttpService
  ) {}

  ngOnInit(): void {
    this.httpSupplierService.getSupplier().subscribe((response: any) => {
      if (response.data && response.status === 200) {
        this.suppliers = response.data;
      } else {
        this.showApiErrorResponse(response.message);
      }
      (error: any) => {
        this.showApiErrorResponse();
      };
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
      this.httpSupplierService.addSupplier(this.newSupplier).subscribe({
        next: (response: any) => {
          if (response === 200) {
            this.showApiSuccessResponse(response.message);
            this.suppliers.push(this.newSupplier);
          } else this.showApiErrorResponse(response.message);
        },
        error: () => {
          this.showApiErrorResponse();
        },
        complete: () => {
          this.showAddSupplierForm = false;
          this.showAddSupplierForm = false;
          this.formSubmitted = true;
        },
      });
    }
    return this.errorMessage;
  }

  onClickToggleAddSupplierForm() {
    setTimeout(() => {
      this.errorMessage = '';
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
  onEditSupplier(id: number, supplier: Supplier) {
    this.updatedSupplier = supplier;
    setTimeout(() => {
      this.showEditSupplierForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', id, supplier);
  }

  onDeleteSupplier(id: number, supplier: Supplier) {
    this.httpSupplierService.deleteSupplier(id).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.showApiSuccessResponse(response.message);
          this.suppliers = this.suppliers.filter(
            (o) => o.supplierId != supplier.supplierId
          );
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
    console.log('update', updatedSupplier);
    console.log('supplier is ', updatedSupplier.supplierId);
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
      this.httpSupplierService.updateSupplier(updatedSupplier).subscribe({
        next: (response: any) => {
          if (response.data && response.status === 200) {
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

  buyProduct(supplier: Supplier) {
    let quantityToBuy: any = prompt('Enter a Value');
    let quantity!: number;
    console.log('quantit', quantityToBuy);
    if (quantityToBuy && quantityToBuy.trim().length !== 0) {
      quantity = Number.parseInt(quantityToBuy);
    }

    if (quantity && quantity > 0) {
      this.httpSupplierService
        .buySupplierProducts(supplier, quantity)
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

  showApiErrorResponse(message?: any) {
    if (message) {
      this.apiErrorResponse = message;
    } else {
      this.apiErrorResponse =
        'Error! please check your internet connection and try again';
    }
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 3500);
  }

  showApiSuccessResponse(message: string) {
    this.apiSuccessResponse = message;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3500);
  }
}
