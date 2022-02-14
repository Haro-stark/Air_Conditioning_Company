import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/Customer';
import { Product } from 'src/app/models/Product';
import { Response } from 'src/app/models/Response';
import { Services } from 'src/app/models/Services';
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
    customer: { customerId: 0, name: '' },
    empPrice: 0,
    totalPrice: 0,
    service: [],
  };
  products: Product[] = [];
  productsId!: any[];
  customers: Customer[] = [];
  services: Services[] = [];
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
  updatedOrderProducts: Product[] = [];
  showProductsButton = false;
  showProductsCart = false;
  showHoursInput = false;
  otherServicesSelected = false;
  showNewCustomerForm: boolean = false;
  isSelected: boolean = false;
  customer: Customer = {
    customerId: 0,
    name: '',
  };
  public createNewProductModal!: NgbModalRef;

  constructor(
    private cd: ChangeDetectorRef,
    private shareOrderDataService: ShareDatabetweenComponentsService,
    private httpOrderService: HttpService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this.loading = true;
    config.backdrop = 'static';
    config.keyboard = false;
  }

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
    this.httpOrderService.getCustomer().subscribe({
      next: (response: any) => {
        if (response.data && response.status === 200) {
          this.customers = response.data.filter(
            (customer: Customer) => customer.name
          );
        }
      },
    });
    this.httpOrderService.getProduct().subscribe({
      next: (response: Response) => {
        if (response.status === 200) {
          this.products = response.data.map((product: Product) => {
            product.productQuantity = 0;
            product.addedToBudgetCart = false;
            return product;
          });
        }
      },
    });
    this.httpOrderService.getServices().subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.services = response.data;
        }
      },
    });
  }
  openCreateAddProductModal(content: any) {
    console.log(this.products);
    this.createNewProductModal = this.modalService.open(content);
  }
  orderPdfDownload(id: number, order: Order): void {
    this.httpOrderService.getOrderPdf(id).subscribe({
      next: (data: any) => {
        this.downloadPdf(data, id);
        this.showApiSuccessResponse();
      },
      error: (error: any) => {
        const errMessage = 'pdf does not exist';

        this.showApiErrorResponse(errMessage);
      },
    });
  }

  onSubmit(event: any, form: NgForm) {
    event.preventDefault();
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
              form.resetForm();
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
    this.updatedOrder = { ...order };
    this.updatedOrder.customer = { ...order.customer };
    this.updatedOrder.productList = [
      ...order.productList.filter((product) => product.productQuantity > 0),
    ];
    this.updatedOrder.productList.map(
      (product: Product) => (product.addedToBudgetCart = true)
    );
    console.log('products  cart', this.updatedOrder.productList);

    this.updatedOrder.productList.sort((a, b) => a.productId - b.productId);
    this.productsId = this.updatedOrder.productList.map(
      (p: Product) => p.productId
    );
    console.log('productss', this.products);
    this.updatedOrderProducts = [...this.updatedOrder.productList];

    this.products.forEach((element, index) => {
      console.log(
        'index',
        index,
        'bp',
        this.updatedOrder.productList[index]?.productId,
        'compare ',
        element.productId
      );

      if (this.productsId.indexOf(element.productId) === -1) {
        this.updatedOrder.productList.push({ ...element });
      }
    });

    console.log('products lps', this.updatedOrder.productList);
    console.log('products to be edited', this.updatedOrderProducts);
    console.log(this.updatedOrder);
    setTimeout(() => {
      this.showEditOrderForm = true;
      this.cd.markForCheck();
    }, 250);
  }
  onDeleteOrder(id: number, order: Order) {
    console.log('delete', id, order);
    this.processingNetworkRequest = true;

    this.httpOrderService.deleteOrder(id).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.showApiSuccessResponse(response.message);
          this.orders = this.orders.filter((o) => o.orderId != order.orderId);
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

  onUpdateOrder(updatedOrder: Order, event: any) {
    event.preventDefault();
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
      this.updatedOrder.productList = this.updatedOrderProducts;

      if (this.showNewCustomerForm) {
        this.updatedOrder.customer = { ...this.customer };
      }
      this.modalService.dismissAll();

      this.processingNetworkRequest = true;
      this.httpOrderService.updateOrder(this.updatedOrder).subscribe({
        next: (response: any) => {
          if (response.data && response.status === 200) {
            this.orders = this.orders.map((order: Order) => {
              if (order.orderId == updatedOrder.orderId) {
                order = updatedOrder;
              }
              return order;
            });
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

  isNewCustomerSelected(customer: any) {
    console.log('isNewCustomer', customer);

    if (customer == 'newCustomer') {
      this.showNewCustomerForm = true;
    } else this.showNewCustomerForm = false;

    return customer;
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
        'Error! an error has occurred please try again later';
    }
    this.showErrorAlert = true;
    this.processingNetworkRequest = false;

    setTimeout(() => {
      this.showErrorAlert = false;
      this.loading = false;
    }, 3500);
  }

  showApiSuccessResponse(message?: string) {
    if (message) this.apiSuccessResponse = message;
    else this.apiSuccessResponse = 'Success';
    this.showSuccessAlert = true;
    this.processingNetworkRequest = false;

    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3500);
  }

  downloadPdf(data: any, id: any) {
    let blob = new Blob([data], { type: 'application/pdf' });
    let downloadURL = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = downloadURL;
    link.target = '_blank';
    link.download = `orderId_${id}.pdf`;

    link.click();
  }

  onOrderUpdationProductCartChanged(
    index: number,
    product: Product,
    event: any,
    newproduct: Boolean = true
  ) {
    console.log(event ? event : 'not event');
    if (
      this.updatedOrderProducts &&
      product.productQuantity == 0 &&
      newproduct &&
      !event
    ) {
      console.log('newproduct', product);
      product.productQuantity += 1;
      product.quantityInStock -= 1;
      product.addedToBudgetCart = true;
      this.updatedOrderProducts.push(product);
      this.productsId.push(product.productId);
      console.log('newproduct pushed', product);
    } else if (event && event.target.checked) {
      console.log('checked', index, product);
      if (product.quantityInStock != 0) {
        product.productQuantity === 0
          ? ((product.productQuantity += 1), (product.quantityInStock -= 1))
          : product.productQuantity;
        product.addedToBudgetCart = true;
        console.log(this.productsId);
        if (this.productsId.indexOf(product.productId) === -1) {
          this.updatedOrderProducts.push(product);
          this.productsId.push(product.productId);
        }
      } else {
        product.addedToBudgetCart = false;
        console.log(product);
        alert(' quantity in stock is less than zero');
      }
    } else {
      console.log('unchecked', index, product.productQuantity, event.value);
      product.quantityInStock += product.productQuantity;
      product.productQuantity = 0;
      this.updatedOrderProducts = this.updatedOrderProducts.filter(
        (p: Product) => p.productId != product.productId
      );
      this.productsId = this.productsId.filter(
        (id: any) => id != product.productId
      );
    }

    console.log('Order products', this.updatedOrderProducts);
  }

  onOrderUpdationChangeProductQuanity(product: any, operation: String) {
    console.log(product.productQuantity);
    if (operation === 'add') {
      if (product.productQuantity === 0) {
        this.onOrderUpdationProductCartChanged(0, product, null, true);
      } else {
        product.productQuantity += 1;
        product.quantityInStock -= 1;
        if (product.quantityInStock < 0) {
          product.quantityInStock = 0;
        }
      }
    } else {
      product.productQuantity -= 1;
      product.quantityInStock += 1;
      if (product.productQuantity == 0) {
        this.onOrderUpdationProductCartChanged(0, product, false, false);
      }
      console.log('qauant', product.productQuantity);
    }

    this.updatedOrderProducts = this.updatedOrderProducts.map((p: Product) => {
      if (p.productId === product.productId) {
        p.productQuantity = product.productQuantity;
      }
      return p;
    });

    console.log(this.updatedOrderProducts);
  }

  fixDigitsAfterDecimal(value: number) {
    return parseFloat(value?.toFixed(2));
  }
}
