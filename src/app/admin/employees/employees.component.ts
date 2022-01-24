import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css','../../shared/icon.css'],
})
export class EmployeesComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;

  newEmployee: Employee = {
    userName: '',
    password: '',
    employeeId: 1,
    type: '',
    priceTime: 0,
    workLogList: [],
  };
  errorMessage!: string;
  formSubmitted: Boolean = false;
  showAddEmployeeForm: Boolean = false;
  updatedEmployee!: Employee;
  services!: string | string[];
  showEditEmployeeForm: Boolean = false;

  employees: Employee[] = [
    {
      employeeId: 1,
      type: 'emp',
      userName: 'fawad',
      password: '12312',
      priceTime: 69,
      workLogList: [],
    },
    {
      employeeId: 1,
      type: 'asd',
      userName: 'zxc',
      password: '2q',
      priceTime: 69,
      workLogList: [],
    },
    {
      employeeId: 1,
      type: 'asd',
      userName: '2wre',
      password: 'gbf',
      priceTime: 69,
      workLogList: [],
    },
  ];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('employee is ', this.newEmployee);
    if (
      !this.newEmployee.userName ||
      this.newEmployee.userName.trim().length === 0 ||
      !this.newEmployee.password ||
      this.newEmployee.password.trim().length < 3
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
    } else this.formSubmitted = true;
    return this.errorMessage;
  }

  onClickToggleAddEmployeeForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showAddEmployeeForm = !this.showAddEmployeeForm;

      this.cd.markForCheck();
    }, 200);
  }
  onClickToggleEditEmployeeForm() {
    setTimeout(() => {
      this.errorMessage = '';
      this.showEditEmployeeForm = !this.showEditEmployeeForm;

      this.cd.markForCheck();
    }, 200);
  }
  onEditEmployee(id: number, employee: Employee) {
    this.updatedEmployee = employee;

    setTimeout(() => {
      this.showEditEmployeeForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', id, employee);
  }

  onDeleteEmployee(id: number, employee: Employee) {
    console.log('delete', id, employee);
  }

  onUpdateEmployee(updatedEmployee: Employee) {
    this.errorMessage = '';
    if (
      !this.updatedEmployee.userName ||
      this.updatedEmployee.userName.trim().length === 0 ||
      !this.updatedEmployee.password ||
      this.updatedEmployee.password.trim().length < 3
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    }
    console.log('update', updatedEmployee);
    console.log('customer is ', updatedEmployee.userName);

    setTimeout(() => {
      this.showEditEmployeeForm = false;
      this.cd.markForCheck();
    }, 300);
    this.formSubmitted = true;
    return this.errorMessage;
  }
}
