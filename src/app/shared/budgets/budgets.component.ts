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
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShareDatabetweenComponentsService } from 'src/app/services/share-databetween-components.service';

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

  showNewCustomerForm: boolean = false;
  showAddBudgetForm: boolean = false;
  errorMessage!: string;
  services!: string | string[];
  showEditBudgetForm: boolean = false;
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
    budgetStatus: '',
    productList: [],
    customer: { customerId: 0, name: '' },
  };
  budgets: Budget[] = [
    {
      budgetId: 1,
      name: 'abc',
      totalPrice: 546,
      budgetStatus: 'accepted',
      productList: [],
      customer: { customerId: 112, name: 'cus1' },
    },
  ];

  filteredBudgets: Budget[] = [];

  products: Product[] = [
    {
      productId: 0,
      name: 'asdsa',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
    },
    {
      productId: 1,
      name: 'czxfzx',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
    },
    {
      productId: 1,
      name: 'wqetrth',
      characteristics: 'gh',
      price: 0,
      quantityInStock: 0,
    },
  ];
  private subscriptions = new Subscription();

  constructor(
    private cd: ChangeDetectorRef,
    private budgetService: HttpService,
    private generateOrderService: ShareDatabetweenComponentsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.budgetService
        .getBudget()
        .subscribe(
          (data: Budget[]) => ((this.budgets = data), console.log(data))
        )
    );
  }

  budgetPdfDownload(id: number, budget: Budget): void {
    console.log('budget to download with id ', id, 'object ', budget);
  }

  onSubmit() {
    this.errorMessage = '';
    console.log('inside submit', this.newBudget, this.services);
    console.log(
      this.newBudget.name,
      this.newBudget.productList.map((data) => console.log(data))
    );
    if (!this.newBudget.name || this.newBudget.name.trim().length === 0) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else {
      this.budgetService.addBudget(this.newBudget).subscribe((response) => {
        setTimeout(() => {
          this.showAddBudgetForm = false;
          this.formSubmitted = true;
          this.cd.markForCheck();
        }, 250);
        this.budgets.push(this.newBudget);
      });
    }
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
    if (budget.budgetStatus.trim().toLowerCase() !== 'accepted') {
      this.generateOrder = true;
    }
    setTimeout(() => {
      this.showEditBudgetForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', id, budget);
  }

  onDeleteBudget(id: number, budget: Budget) {
    this.budgetService.deleteBudget(id).subscribe((response) => {
      console.log(response);
    });
  }

  onUpdateBudget(updatedBudget: Budget) {
    this.errorMessage = '';
    console.log('update', updatedBudget);
    if (
      !this.updatedBudget.name ||
      this.updatedBudget.name.trim().length === 0
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    }
    console.log('update', updatedBudget);
    console.log('customer is ', updatedBudget.customer);

    if (
      updatedBudget.budgetStatus.trim().toLowerCase() === 'accepted' &&
      this.generateOrder
    ) {
      let generateOrder: Order = {
        orderId: updatedBudget.budgetId,
        name: updatedBudget.name,
        status: updatedBudget.budgetStatus,
        customer: updatedBudget.customer,
        productList: updatedBudget.productList,
      };

      this.createOrder(generateOrder);
    }
    else {
      this.budgetService.updateBudget(updatedBudget).subscribe((response) => {
      console.log(response);
        setTimeout(() => {
          this.showEditBudgetForm = false;
          this.cd.markForCheck();
        }, 300);
      });
    }   return this.errorMessage;
  }

  createOrder(order: Order) {
    this.generateOrderService.generateNewOrder(order);
  }

  isInstallationSelected(services: any) {
    console.log('isInstallation', services);

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
