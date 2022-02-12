import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Response } from 'src/app/models/Response';
import { HttpService } from 'src/app/services/http.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../shared/icon.css'],
})
export class ProductsComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;
  newProduct: Product = {
    productId: 0,
    name: '',
    characteristics: '',
    price: 0,
    quantityInStock: 0,
    tax: 0,
    productQuantity: 0,
    addedToBudgetCart: false,
  };

  products: Product[] = [
    /*    {
      productId: 0,
      name: 'f',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
      tax: 0,
    }, */
  ];

  updatedProduct!: Product;
  showAddProductForm: Boolean = false;
  errorMessage!: string;
  showEditProductForm: Boolean = false;
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
  apiSuccessResponse = '';
  apiErrorResponse: string = '';

  processingNetworkRequest = false;
  constructor(
    private cd: ChangeDetectorRef,
    private HttpProductService: HttpService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.HttpProductService.getProduct().subscribe({
      next: (response: any) => {
        if (response.data && response.status === 200) {
          this.products = response.data;
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
  onSubmit(event: any, form: NgForm) {
    event.preventDefault();
    if (
      !this.newProduct.name ||
      this.newProduct.name.trim().length === 0 ||
      !this.newProduct.characteristics ||
      this.newProduct.characteristics.trim().length < 3
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.HttpProductService.addProduct(this.newProduct).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.products.push(this.newProduct);
            this.showApiSuccessResponse(response.message);
            form.resetForm();
          } else {
            this.showApiErrorResponse(response.message);
          }
        },
        error: () => {
          this.showApiErrorResponse();
        },
        complete: () => {
          this.showAddProductForm = false;
          this.formSubmitted = true;
          this.processingNetworkRequest = false;
        },
      });
    }

    return this.errorMessage;
  }

  onClickToggleAddProductForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showAddProductForm = !this.showAddProductForm;
      this.cd.markForCheck();
    }, 200);
  }
  onClickToggleEditProductForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showEditProductForm = !this.showEditProductForm;
      this.cd.markForCheck();
    }, 200);
  }
  onEditProduct(id: number, product: Product) {
    this.updatedProduct = { ...product };
    setTimeout(() => {
      this.showEditProductForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', id, product);
  }

  onDeleteProduct(id: number, product: Product) {
    this.processingNetworkRequest = true;
    this.HttpProductService.deleteProduct(id).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          console.log('deleted', response);
          this.showApiSuccessResponse(response.message);
          this.products = this.products.filter(
            (o) => o.productId != product.productId
          );
          this.processingNetworkRequest = false;
        } else {
          console.log('else', response);
          const { status } = response;
          console.log('else', status);

          console.log(response.status, response.status === 200);
          this.showApiErrorResponse(response.message);
        }
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
  }

  onUpdateProduct(updatedProduct: Product, event: any) {
    event.preventDefault();
    this.errorMessage = '';
    console.log('update', updatedProduct);
    console.log('customer is ', updatedProduct.name);

    if (
      !this.updatedProduct.name ||
      this.updatedProduct.name.trim().length === 0 ||
      !this.updatedProduct.characteristics ||
      this.updatedProduct.characteristics.trim().length < 3
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else {
      this.processingNetworkRequest = true;
      this.HttpProductService.updateProduct(updatedProduct).subscribe({
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
          this.showEditProductForm = false;
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
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3500);
  }
}
