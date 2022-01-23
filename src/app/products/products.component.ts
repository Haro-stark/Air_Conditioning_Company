import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
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
  };

  products: Product[] = [
    {
      productId: 0,
      name: 'f',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
    },
  ];

  updatedProduct!: Product;
  showAddProductForm: Boolean = false;
  errorMessage!: string;
  showEditProductForm: Boolean = false;
  formSubmitted = false;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      !this.product.name ||
      this.product.name.trim().length === 0 ||
      !this.product.characteristics ||
      this.product.characteristics.trim().length < 3
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else this.formSubmitted = true;
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
    console.log('delete', id, product);
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
    } else this.formSubmitted = true;

    setTimeout(() => {
      this.showEditProductForm = false;
      this.cd.markForCheck();
    }, 250);

    this.formSubmitted = true;
    return this.errorMessage;
  }
}
