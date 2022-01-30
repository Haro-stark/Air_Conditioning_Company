import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'src/app/services/http.service';
import { ShareDatabetweenComponentsService } from 'src/app/services/share-databetween-components.service';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../../shared/icon.css'],
})
export class OrdersComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;

  orders: Order[] = [
   /*  {
      orderId: 1,
      orderName: 'orderPdfDownload',
      productList: [],
      customer: { customerId: 112, name: 'cus1' },
      empPrice: 0,
      totalPrice: 0,
      service: [],
    }, */
  ];
  newOrder: Order = {
    orderId: 0,
    orderName: '',
    productList: [],
    customer: { customerId: 112, name: 'cus1' },
    empPrice: 0,
    totalPrice: 0,
    service: [],
  };
  showAddOrderForm: Boolean = false;
  errorMessage!: string;
  updatedOrder!: Order;
  showEditOrderForm: Boolean = false;
  formSubmitted = false;
  showErrorAlert = false;
  showSuccessAlert = false;
  apiErrorResponse: string = '';
  apiSuccessResponse = '';
  processingNetworkRequest = false;
  loading = false;
  constructor(
    private cd: ChangeDetectorRef,
    private shareOrderDataService: ShareDatabetweenComponentsService,
    private httpOrderService: HttpService
  ) {this.loading=true;}

  ngOnInit(): void {
    this.httpOrderService.getOrder().subscribe({
      next: (response: any) => {
        console.log(response.message);
        if (response.status === 200 && response.data) {
          this.orders = response.data;
        } else {
          this.showApiErrorResponse(response.message);
        }
        this.loading = false;
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
      
    });
    this.shareOrderDataService.onGenerateOrder().subscribe((value: Order) => {
      if (value) {
        this.newOrder = value;
        this.onSubmit();
      } else console.log(value, 'no value');
    });
  }

  orderPdfDownload(id: number, order: Order): void {
    this.httpOrderService.getOrderPdf(id).subscribe({
      next: (response: any) => {
        if (response.status === 500)
          this.showApiErrorResponse('opps somer server error');
      },
      error: (error: any) => {
        this.showApiErrorResponse(error.message);
      },
    });
    console.log('order to download with id ', id, 'object ', order);
  }

  onSubmit() {
    console.log(
      'inside submit',
      this.newOrder.orderName,
      this.newOrder.productList
    );
    if (
      !this.newOrder.orderName ||
      this.newOrder.orderName.trim().length === 0
      //   ||
      //   !this.customerName ||
      //   this.customerName.trim().length < 2
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.errorMessage = '';
      setTimeout(() => {
        this.httpOrderService.addOrder(this.newOrder).subscribe({
          next: (response: any) => {
            if (response.status === 200) {
              this.showApiSuccessResponse(response.message);
              this.orders.push(this.newOrder);
            } else this.showApiErrorResponse(response.message);
          },
          error: () => {
            this.showApiErrorResponse();
          },
          complete: () => {
            this.showAddOrderForm = false;
            this.formSubmitted = true;
            this.processingNetworkRequest = false;
          },
        });
      });
    }
    return this.errorMessage;
  }

  onClickToggleAddOrderForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showAddOrderForm = !this.showAddOrderForm;

      this.cd.markForCheck();
    }, 200);
  }
  onClickToggleEditOrderForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showEditOrderForm = !this.showEditOrderForm;

      this.cd.markForCheck();
    }, 200);
  }
  onEditOrder(id: number, order: Order) {
    this.updatedOrder = order;
    setTimeout(() => {
      this.showEditOrderForm = true;
      this.cd.markForCheck();
    }, 250);
  }
  onDeleteOrder(id: number, order: Order) {
    console.log('delete', id, order);
    this.httpOrderService.deleteOrder(id).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.showApiSuccessResponse(response.message);
          this.orders = this.orders.filter((o) => o.orderId != order.orderId);
        } else {
          this.showApiErrorResponse(response.message);
        }
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
  }

  onUpdateOrder(updatedOrder: Order) {
    this.errorMessage = '';
    console.log('update', updatedOrder);
    console.log('customer is ', updatedOrder.customer);

    if (
      !this.updatedOrder.orderName ||
      this.updatedOrder.orderName.trim().length === 0
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';

      return this.errorMessage;
    } else {
      this.httpOrderService.updateOrder(this.updatedOrder).subscribe({
        next: (response: any) => {
          if (response.data && response.status === 200) {
            this.showApiSuccessResponse(response.message);
          } else {
            this.showApiErrorResponse(response.message);
          }
        },
        error: (error: any) => {
          console.log(error);
          this.showApiErrorResponse();
        },
        complete: () => {
          this.showEditOrderForm = false;
          this.formSubmitted = true;
          this.processingNetworkRequest = false;
        },
      });
      return this.errorMessage;
    }
  }

  pushOrder(order: Order) {
    this.orders = [...this.orders, order];
    console.log('orderes ', this.orders);
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  showApiErrorResponse(message?: string) {
    if (message) {
      this.apiErrorResponse = message;
    } else {
      this.apiErrorResponse =
        'Error! please check your internet connection and try again';
    }
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
      this.loading = false;
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
