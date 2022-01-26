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
    {
      orderId: 1,
      name: 'abc',
      status: 'accepted',
      productList: [],
      customer: { customerId: 112, name: 'cus1' },
    },
  ];
  newOrder: Order = {
    orderId: 0,
    name: '',
    status: '',
    productList: [],
    customer: { customerId: 112, name: 'cus1' },
  };
  showAddOrderForm: Boolean = false;
  errorMessage!: string;
  updatedOrder!: Order;
  showEditOrderForm: Boolean = false;
  formSubmitted = false;
  constructor(
    private cd: ChangeDetectorRef,
    private shareOrderDataService: ShareDatabetweenComponentsService,
    private httpOrderService: HttpService
  ) {}

  ngOnInit(): void {
    this.shareOrderDataService
      .onGenerateOrder()
      .subscribe((value: Order) => this.pushOrder(value));
  }

  orderPdfDownload(id: number, order: Order): void {
    console.log('order to download with id ', id, 'object ', order);
  }

  onSubmit() {
    console.log(
      'inside submit',
      this.newOrder.name,
      this.newOrder.status,
      this.newOrder.productList
    );
    if (
      !this.newOrder.name ||
      this.newOrder.name.trim().length === 0
      //   ||
      //   !this.customerName ||
      //   this.customerName.trim().length < 2
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.errorMessage = '';
      setTimeout(() => {
        this.httpOrderService.addOrder(this.newOrder).subscribe(() => {
          setTimeout(() => {
            this.orders.push(this.newOrder);
            this.showAddOrderForm = false;
            this.formSubmitted = true;
            this.cd.markForCheck();
          }, 900);
        });
      });
    }
    return this.errorMessage;
  }

  addOrder(newOrder: Order) {}

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
    console.log('edit', id, order);
  }

  onDeleteOrder(id: number, order: Order) {
    console.log('delete', id, order);
    this.orders = this.orders.filter((o) => o.name != order.name);
  }

  onUpdateOrder(updatedOrder: Order) {
    this.errorMessage = '';
    console.log('update', updatedOrder);
    console.log('customer is ', updatedOrder.customer);

    if (!this.updatedOrder.name || this.updatedOrder.name.trim().length === 0) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';

      return this.errorMessage;
    }

    setTimeout(() => {
      this.showEditOrderForm = false;
      this.cd.markForCheck();
    }, 250);

    return this.errorMessage;
  }

  pushOrder(order: Order) {
    this.orders = [...this.orders, order];
    console.log('orderes ', this.orders);
    this.cd.markForCheck();
    this.cd.detectChanges();
  }
}
