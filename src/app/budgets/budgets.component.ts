import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Budget } from '../models/Budget';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Order } from '../models/Order';
import { ServicesEnum } from '../models/ServicesEnum';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css'],
})
export class BudgetsComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;

  budgetId!: number;
  totalPrice!: number;
  budgetStatus!: string;
  budgetName!: string;
  productList!: Product[];
  customers: Customer[] = [
    { customerId: 1, name: 'rand' },
    { customerId: 2, name: 'asd' },
  ];
  customerName!: string;

  showNewCustomerForm: Boolean = false;
  showAddBudgetForm: Boolean = false;
  errorMessage!: string;
  services!: string | string[];
  updatedBudget!: Budget;
  showEditBudgetForm: Boolean = false;
  formSubmitted = false;
  generateOrder = false;

  budgets: Budget[] = [
    {
      budgetId: 1,
      name: 'abc',
      totalPrice: 546,
      status: 'accepted',
      productList: [],
      customer: { customerId: 112, name: 'cus1' },
    },
  ];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  budgetPdfDownload(id: number, budget: Budget): void {
    console.log('budget to download with id ', id, 'object ', budget);
  }

  onSubmit() {
    console.log('inside submit', this.customerName, this.services);
    if (
      !this.budgetName ||
      this.budgetName.trim().length === 0 ||
      !this.totalPrice ||
      !this.productList
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else this.formSubmitted = true;
    return this.errorMessage;
  }

  onClickToggleAddBudgetForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showAddBudgetForm = !this.showAddBudgetForm;

      this.cd.markForCheck();
    }, 200);
  }
  onClickToggleEditBudgetForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showEditBudgetForm = !this.showEditBudgetForm;

      this.cd.markForCheck();
    }, 200);
  }
  onEditBudget(id: number, budget: Budget) {
    this.updatedBudget = budget;
    if (budget.status.trim().toLowerCase() !== 'accepted') {
      this.generateOrder = true;
    }
    setTimeout(() => {
      this.showEditBudgetForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', id, budget);
  }

  onDeleteBudget(id: number, budget: Budget) {
    console.log('delete', id, budget);
  }

  onUpdateBudget(updatedBudget: Budget) {
    this.errorMessage = '';
    if (
      !this.budgetName ||
      this.budgetName.trim().length === 0 ||
      !this.totalPrice
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    }
    console.log('update', updatedBudget);
    console.log('customer is ', updatedBudget.customer);

    if (
      updatedBudget.status.trim().toLowerCase() === 'accepted' &&
      this.generateOrder
    ) {
      let generateOrder: Order = {
        orderId: updatedBudget.budgetId,
        name: updatedBudget.name,
        status: updatedBudget.status,
        customer: updatedBudget.customer,
        productList: updatedBudget.productList,
      };

      this.createOrder(generateOrder);
    }

    setTimeout(() => {
      this.showEditBudgetForm = false;
      this.cd.markForCheck();
    }, 300);

    return this.errorMessage;
  }

  createOrder(order: Order) {
    console.log('Order generated', order);
  }
}
