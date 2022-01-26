import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Supplier } from 'src/app/models/Supplier';

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
    basePrice: 0,
    tax: 0.2,
  };

  suppliers: Supplier[] = [
    {
      supplierId: 0,
      name: 'supply 1',
      orderNumber: 'dscvf213',
      basePrice: 100,
      productSold: [
        {
          productId: 0,
          name: 'prod1',
          characteristics: 'asdfs',
          price: 0,
          quantityInStock: 0,
        },
        {
          productId: 0,
          name: 'prod2',
          characteristics: 'xzcv',
          price: 0,
          quantityInStock: 0,
        },
      ],
      tax: 0.2,
    },
    {
      supplierId: 1,
      name: 'supply 2',
      orderNumber: 'asd123',
      basePrice: 20,
      productSold: [
        {
          productId: 0,
          name: 'v,m',
          characteristics: 'rtyk',
          price: 0,
          quantityInStock: 0,
        },
      ],
      tax: 0.9,
    },
  ];

  updatedSupplier!: Supplier;
  showAddSupplierForm: Boolean = false;
  errorMessage!: string;
  showEditSupplierForm: Boolean = false;
  formSubmitted = false;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(
      this.newSupplier.name,
      this.newSupplier.basePrice,
      this.newSupplier.tax,
      this.newSupplier.productSold?.map((product) => product)
    );

    if (!this.newSupplier.name || this.newSupplier.name.trim().length === 0) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      setTimeout(() => {
        this.showAddSupplierForm = false;
        this.formSubmitted = true;
        this.cd.markForCheck();
      }, 250);
      this.suppliers.push(this.newSupplier);
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
    console.log('delete', id, supplier);
  }
  onUpdateSupplier(updatedSupplier: Supplier) {
    this.errorMessage = '';
    console.log('update', updatedSupplier);
    console.log('supplier is ', updatedSupplier.name);
    console.log(
      this.updatedSupplier.name,
      this.updatedSupplier.basePrice,
      this.updatedSupplier.tax,
      this.updatedSupplier.productSold?.map((product) => product)
    );

    if (
      !this.updatedSupplier.name ||
      this.updatedSupplier.name.trim().length === 0
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else this.formSubmitted = true;

    setTimeout(() => {
      this.showEditSupplierForm = false;
      this.cd.markForCheck();
    }, 250);

    this.formSubmitted = true;
    return this.errorMessage;
  }
}
