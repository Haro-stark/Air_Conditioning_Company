import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/Product';
import { SupplierPurchasedHistory } from 'src/app/models/SupplierPurchasedHistory';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-supplier-purchased-history',
  templateUrl: './supplier-purchased-history.component.html',
  styleUrls: ['./supplier-purchased-history.component.css'],
})
export class SupplierPurchasedHistoryComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;
  newSupplierPurchasedHistory: SupplierPurchasedHistory = {
    supplierOrderId: 0,
    totalPrice: 0,
    supplierProducts: [],
  };
  supplierPurchasedHistory: SupplierPurchasedHistory[] = [];
  updatedSupplierPurchasedHistory!: SupplierPurchasedHistory;
  showAddSupplierPurchasedHistoryForm: Boolean = false;
  errorMessage!: string;
  showEditSupplierPurchasedHistoryForm: Boolean = false;
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
  loading = false;

  constructor(
    private cd: ChangeDetectorRef,
    private httpSupplierPurchasedHistoryService: HttpService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.httpSupplierPurchasedHistoryService
      .getSupplierPurchasedHistory()
      .subscribe({
        next: (response: any) => {
          if (response.data && response.status === 200) {
            this.supplierPurchasedHistory = response.data;
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
      this.newSupplierPurchasedHistory.totalPrice,
      this.newSupplierPurchasedHistory.supplierProducts?.map(
        (product) => product
      )
    );

    if (!this.newSupplierPurchasedHistory.totalPrice) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.httpSupplierPurchasedHistoryService
        .addSupplierPurchasedHistory(this.newSupplierPurchasedHistory)
        .subscribe({
          next: (response: any) => {
            if (response === 200) {
              this.showApiSuccessResponse(response.message);
              this.supplierPurchasedHistory.push(
                this.newSupplierPurchasedHistory
              );
            } else this.showApiErrorResponse(response.message);
          },
          error: () => {
            this.showApiErrorResponse();
          },
          complete: () => {
            this.showAddSupplierPurchasedHistoryForm = false;
            this.showAddSupplierPurchasedHistoryForm = false;
            this.formSubmitted = true;
          },
        });
    }
    return this.errorMessage;
  }

  onClickToggleAddSupplierPurchasedHistoryForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showAddSupplierPurchasedHistoryForm =
        !this.showAddSupplierPurchasedHistoryForm;
      this.cd.markForCheck();
    }, 200);
  }
  onClickToggleEditSupplierPurchasedHistoryForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showEditSupplierPurchasedHistoryForm =
        !this.showEditSupplierPurchasedHistoryForm;
      this.cd.markForCheck();
    }, 200);
  }
  onEditSupplierPurchasedHistory(
    id: number,
    supplierPurchasedHistory: SupplierPurchasedHistory
  ) {
    this.updatedSupplierPurchasedHistory = {...supplierPurchasedHistory};
    setTimeout(() => {
      this.showEditSupplierPurchasedHistoryForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', id, supplierPurchasedHistory);
  }

  onDeleteSupplierPurchasedHistory(
    id: number,
    supplierPurchasedHistory: SupplierPurchasedHistory
  ) {
    this.httpSupplierPurchasedHistoryService
      .deleteSupplierPurchasedHistory(id)
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.showApiSuccessResponse(response.message);
            this.supplierPurchasedHistory =
              this.supplierPurchasedHistory.filter(
                (o) =>
                  o.supplierOrderId != supplierPurchasedHistory.supplierOrderId
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
  onUpdateSupplierPurchasedHistory(
    updatedSupplierPurchasedHistory: SupplierPurchasedHistory
  ) {
    this.errorMessage = '';
    console.log('update', updatedSupplierPurchasedHistory);
    console.log(
      'supplierPurchasedHistory is ',
      updatedSupplierPurchasedHistory.supplierProducts
    );
    console.log(
      this.updatedSupplierPurchasedHistory.totalPrice,
      this.updatedSupplierPurchasedHistory.supplierProducts?.map(
        (product) => product
      )
    );

    if (
      !this.updatedSupplierPurchasedHistory.totalPrice ||
      !this.updatedSupplierPurchasedHistory.supplierProducts
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else {
      this.processingNetworkRequest = true;
      this.httpSupplierPurchasedHistoryService
        .updateSupplierPurchasedHistory(updatedSupplierPurchasedHistory)
        .subscribe({
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
            this.showEditSupplierPurchasedHistoryForm = false;
            this.formSubmitted = true;
            this.processingNetworkRequest = false;
          },
        });
    }
    return this.errorMessage;
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
