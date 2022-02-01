import { Pipe, PipeTransform } from '@angular/core';
import { Budget } from '../models/Budget';
import { Customer } from '../models/Customer';

@Pipe({
  name: 'filterCustomer',
})
export class FilterCustomerPipe implements PipeTransform {
  transform(value: Customer[], ...args: any): Customer[] {
    let budgets = value.filter(
      (customer, i, arr) =>
        arr.findIndex((a) => customer.customerId == a.customerId) == i
    );
    console.log(budgets);
    return budgets;
  }
}
