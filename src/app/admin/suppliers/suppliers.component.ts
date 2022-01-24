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
  supplier: Supplier = {
    supplierId: 0,
    orderNumber: '',
    basePrice: 0,
    tax: 0,
  };

  suppliers: Supplier[] = [
    {
      supplierId: 0,
      orderNumber: '132',
      basePrice: 0,
      tax: 0,
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
    if (
      !this.supplier.name ||
      this.supplier.name.trim().length === 0 ||
      !this.supplier.characteristics ||
      this.supplier.characteristics.trim().length < 3
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else this.formSubmitted = true;
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
    console.log('customer is ', updatedSupplier.name);

    if (
      !this.updatedSupplier.name ||
      this.updatedSupplier.name.trim().length === 0 ||
      !this.updatedSupplier.characteristics ||
      this.updatedSupplier.characteristics.trim().length < 3
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
