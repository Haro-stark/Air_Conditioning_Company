import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
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
    name: '',
    orderNumber: '',
  };

  suppliers: Supplier[] = [
    {
      supplierId: 0,
      name: 'supply 1',
      orderNumber: 'dscvf213',
      supplierProducts: [
        {
          productId: 0,
          name: 'prod1',
          characteristics: 'asdfs',
          basePrice: 0,
          tax: 0,
        },
        {
          productId: 0,
          name: 'prod2',
          characteristics: 'xzcv',
          basePrice: 0,
          tax: 0,
        },
      ],
    },
    {
      supplierId: 1,
      name: 'supply 2',
      orderNumber: 'asd123',
      supplierProducts: [
        {
          productId: 0,
          name: 'v,m',
          characteristics: 'rtyk',
          basePrice: 20,
          tax: 0,
        },
      ],
    },
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
        this.showApiError(response.message);
      }
      (error: any) => {
        console.log(error), (this.apiRequestError = error);

        console.log(this.apiRequestError);
        this.showErrorAlert = true;

        setTimeout(() => {
          this.showErrorAlert = false;
        }, 3000);
      };
    });
  }

  onSubmit() {
    console.log(
      this.newSupplier.name,
      this.newSupplier.supplierProducts?.map((product) => product)
    );

    if (!this.newSupplier.name || this.newSupplier.name.trim().length === 0) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.httpSupplierService
        .addSupplier(this.newSupplier)
        .subscribe((response: any) => {
          if (response.data && response.status === 200) {
            setTimeout(() => {
              this.showAddSupplierForm = false;
              this.formSubmitted = true;
              this.cd.markForCheck();
            }, 250);
            this.suppliers.push(this.newSupplier);
          } else {
            this.showApiError(response.message);
          }
          (error: any) => {
            console.log(error), (this.apiRequestError = error);

            console.log(this.apiRequestError);
            this.showErrorAlert = true;

            setTimeout(() => {
              this.showErrorAlert = false;
            }, 3000);
          };
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
    this.httpSupplierService.deleteSupplier(id).subscribe((response: any) => {
      if (response.status === 200) {
        this.suppliers = this.suppliers.filter((o) => o.name != supplier.name);
      } else {
        this.showApiError(response.message);
      }
      console.log('delete', id, supplier);
    });
  }
  onUpdateSupplier(updatedSupplier: Supplier) {
    this.errorMessage = '';
    console.log('update', updatedSupplier);
    console.log('supplier is ', updatedSupplier.name);
    console.log(
      this.updatedSupplier.name,
      this.updatedSupplier.supplierProducts?.map((product) => product)
    );

    if (
      !this.updatedSupplier.name ||
      this.updatedSupplier.name.trim().length === 0 ||
      !this.updatedSupplier.supplierProducts
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else {
      this.httpSupplierService
        .updateSupplier(updatedSupplier)
        .subscribe((response: any) => {
          if (response.status === 200) {
            console.log(response);
            setTimeout(() => {
              this.showEditSupplierForm = false;
              this.cd.markForCheck();
            }, 250);
            this.formSubmitted = true;
          } else {
            this.showApiError(response.message);
          }
          (error: any) => {
            console.log(error), (this.apiRequestError = error);

            console.log(this.apiRequestError);
            this.showErrorAlert = true;

            setTimeout(() => {
              this.showErrorAlert = false;
            }, 3000);
          };
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

    if (quantity && quantity != 0) {
      this.httpSupplierService
        .buySupplierProducts(supplier, quantity)
        .subscribe(() => (this.showSuccessAlert = true));

      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 1500);
    } else {
      if (quantityToBuy != undefined) this.showErrorAlert = true;
      setTimeout(() => {
        this.showErrorAlert = false;
      }, 1500);
    }
  }

  showApiError(message: string) {
    this.apiRequestError.message = message;
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 3000);
  }
}
