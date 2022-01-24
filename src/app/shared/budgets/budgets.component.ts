import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Budget } from '../../models/Budget';
import { Customer } from '../../models/Customer';
import { Product } from '../../models/Product';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css', '../icon.css'],
})
export class BudgetsComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;

  customers: Customer[] = [
    { customerId: 1, name: 'rand' },
    { customerId: 2, name: 'asd' },
  ];
  customerName!: string;

  showNewCustomerForm: Boolean = false;
  showAddBudgetForm: Boolean = false;
  errorMessage!: string;
  services!: string | string[];
  showEditBudgetForm: Boolean = false;
  formSubmitted = false;
  generateOrder = false;
  showProducts = false;
  showHoursInput = false;
  otherServicesSelected = false;

  officerHours!: number;
  assistantHours!: number;
  updatedBudget!: Budget;
  newBudget: Budget = {
    budgetId: 0,
    name: '',
    totalPrice: 0,
    status: '',
    productList: [],
    customer: { customerId: 0, name: '' },
  };
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
  products: Product[] = [
    {
      productId: 0,
      name: 'asdsa',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
    },
    {
      productId: 0,
      name: 'czxfzx',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
    },
    {
      productId: 0,
      name: 'wqetrth',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
    },
  ];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  budgetPdfDownload(id: number, budget: Budget): void {
    console.log('budget to download with id ', id, 'object ', budget);
  }

  onSubmit() {
    console.log('inside submit', this.newBudget, this.services);
    console.log(this.newBudget.name, this.newBudget.productList);
    if (!this.newBudget.name || this.newBudget.name.trim().length === 0) {
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
    if (!this.newBudget.name || this.newBudget.name.trim().length === 0) {
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

 

  isInstallationSelected(services: string[]|string) {
    if (services.includes('installation')) {
      this.showProducts = true;
    } else {
      this.showProducts = false;
    }

    if (services.includes('maintenance') || services.includes('labour')) {
      this.showHoursInput = true;
    } else {
      this.showHoursInput = false;
    }
  }
}
