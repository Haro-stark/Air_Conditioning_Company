import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
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
  product: Product = {
    productId: 0,
    name: '',
    characteristics: '',
    price: 0,
    quantityInStock: 0,
    tax: 0,
  };

  products: Product[] = [
    {
      productId: 0,
      name: 'f',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
      tax: 0,
    },
  ];

  updatedProduct!: Product;
  showAddProductForm: Boolean = false;
  errorMessage!: string;
  showEditProductForm: Boolean = false;
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
    private HttpProductService: HttpService
  ) {}

  ngOnInit(): void {
    this.HttpProductService.getProduct().subscribe((response: any) => {
      if (response.data && response.status === 200) {
        this.products = response.data;
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
    if (
      !this.product.name ||
      this.product.name.trim().length === 0 ||
      !this.product.characteristics ||
      this.product.characteristics.trim().length < 3
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.HttpProductService.addProduct(this.product).subscribe((response) => {
        console.log(response);
        setTimeout(() => {
          this.showAddProductForm = false;
          this.formSubmitted = true;
          this.cd.markForCheck();
        }, 250);
        this.products.push(this.product);
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
    this.updatedProduct = product;
    setTimeout(() => {
      this.showEditProductForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', id, product);
  }

  onDeleteProduct(id: number, product: Product) {
    this.HttpProductService.deleteBudget(id).subscribe((response: any) => {
      if (response.status === 200) {
        this.products = this.products.filter((o) => o.name != product.name);
      } else {
        this.showApiError(response.message);
      }
      console.log(response);
    });
  }

  onUpdateProduct(updatedProduct: Product) {
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
      this.HttpProductService.updateProduct(updatedProduct).subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log(response);
            setTimeout(() => {
              this.showEditProductForm = false;
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
        }
      );
    }
    return this.errorMessage;
  }
  showApiError(message: string) {
    this.apiRequestError.message = message;
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 3000);
  }
}
