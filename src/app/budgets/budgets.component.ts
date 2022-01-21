import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Budget } from '../models/Budget';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css'],
})
export class BudgetsComponent implements OnInit {
  budgetId!: number;
  totalPrice!: number;
  budgetStatus!: String;
  budgetName!: String;
  productList!: Product[];
  customers!: Customer[];
  customer!: Customer;

  showAddBudgetForm: Boolean = false;
  errorMessage!: String;
  services!: String | String[];

  budgets: Budget[] = [
    {
      budgetId: 1,
      budgetName: 'abc',
      totalPrice: 546,
      budgetStatus: 'approved',
      productList: [],
      customer: { csutomerId: 112, name: 'cus1' },
    },
  ];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  budgetPdfDownload(id: number, budget: Budget): void {
    console.log('budget to download with id ', id, 'object ', budget);
  }

  onSubmit() {
    console.log('inside submit');
    if (
      this.budgetName.trim().length === 0 ||
      !this.totalPrice ||
      !this.productList ||
      !this.customer
    ) {
      this.errorMessage = 'Please enter correct fields';
    }
    return this.errorMessage;
  }

  onClickToggleAddTaskForm() {
    setTimeout(() => {
      this.showAddBudgetForm = !this.showAddBudgetForm;
      this.cd.markForCheck();
    }, 200);
    setTimeout(() => {}, 200);
  }
  /* const task: Task = {
    text: this.text,
    category: this.category,
    priority: this.priority,
    dateAdded: this.dateAdded,
    isCompleted: false,
  };*/

  /*    this.onAddTask.emit(task);
      setTimeout(() => {
        this.onClickHideAddTaskForm();
        this.cd.markForCheck();
      }, 300);
     */
}
