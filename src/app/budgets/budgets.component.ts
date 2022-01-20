import { Component, OnInit } from '@angular/core';
import * as Long from 'long';
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
  customer!: Customer;
  showAddBudgetForm: Boolean = false;

  private errorMessage!: any;
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
  constructor() {}

  ngOnInit(): void {}

  budgetPdfDownload(id: number, budget: Budget): void {
    console.log('budget to download with id ', id, 'object ', budget);
  }

  onSubmit() {
    if (
      this.budgetStatus.trim().length === 0 ||
      !this.totalPrice ||
      !this.productList ||
      !this.customer
    ) {
      this.errorMessage = 'Please enter correct fields';
      return this.errorMessage;
    }
  }

  onClickHideAddTaskForm() {
    this.showAddBudgetForm = false;
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
