import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css', '../../shared/icon.css'],
})
export class EmployeesComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;

  newEmployee: Employee = {
    username: '',
    email: '',
    password: '',
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

  processingNetworkRequest: Boolean = false;

  employees: Employee[] = [
    {
      employeeId: 1,
      type: 'emp',
      username: 'fawad',
      email: '',
      password: '12312',
      priceTime: 69,
      workLogList: [],
    },
    {
      employeeId: 1,
      type: 'asd',
      username: 'zxc',
      email: '',
      password: '2q',
      priceTime: 69,
      workLogList: [],
    },
    {
      employeeId: 1,
      type: 'asd',
      username: '2wre',
      email: '',
      password: 'gbf',
      priceTime: 69,
      workLogList: [],
    },
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private httpEmployeeService: HttpService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.httpEmployeeService
      .getEmployee()
      .subscribe((employeesList: Employee[]) => {
        this.employees = employeesList;
      });
  }

  onSubmit() {
    console.log('employee is ', this.newEmployee);
    if (
      !this.newEmployee.username ||
      this.newEmployee.username.trim().length === 0 ||
      !this.newEmployee.email ||
      this.newEmployee.email.trim().length === 0 ||
      !this.newEmployee.password ||
      this.newEmployee.password.trim().length < 6
    ) {
      return (this.errorMessage =
        'Please enter correct fields , All fields are necessary');
    } else {
      this.errorMessage = '';
      this.processingNetworkRequest = true;
      const { email, password, type, username } = this.newEmployee;
      this.authService
        .signUp(email, password, type, username)
        .then(() => {
           setTimeout(() => {
             this.httpEmployeeService
               .addEmployee(this.newEmployee)
               .subscribe(() => {
                 setTimeout(() => {
                   this.showAddEmployeeForm = false;
                   this.formSubmitted = true;
                   this.errorMessage = '';
                   this.cd.markForCheck();
                 }, 300);
               });
             this.employees.push(this.newEmployee);

             this.processingNetworkRequest = false;
             this.cd.markForCheck();
           }, 900);
        })
        .catch((_error: string) => {
          this.errorMessage = _error;
        });

      return this.errorMessage;
    }
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
  onEditEmployee(employee: Employee) {
    this.updatedEmployee = employee;

    setTimeout(() => {
      this.showEditEmployeeForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', employee);
  }

  onDeleteEmployee(id: any, employee: Employee) {
    console.log('delete', id, employee);
    this.httpEmployeeService.deleteEmployee(id).subscribe((response: Response) => {
      console.log('response',Response)
      this.employees = this.employees.filter(
        (e) => e.username !== employee.username
      );
    });
  }

  onUpdateEmployee(updatedEmployee: Employee) {
    this.processingNetworkRequest = true;

    this.errorMessage = '';

    if (
      !this.updatedEmployee.username ||
      this.updatedEmployee.username.trim().length === 0 ||
      !this.newEmployee.email ||
      this.newEmployee.email.trim().length === 0 ||
      !this.updatedEmployee.password ||
      this.updatedEmployee.password.trim().length < 6
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      return this.errorMessage;
    } else {
      setTimeout(() => {
        this.httpEmployeeService
          .updateEmployee(updatedEmployee)
          .subscribe(() => {
            setTimeout(() => {
              console.log('update', updatedEmployee);
              console.log('customer is ', updatedEmployee.username);
              this.showEditEmployeeForm = false;
              this.errorMessage = '';
              this.processingNetworkRequest = true;
              this.formSubmitted = true;
              this.cd.markForCheck();
            }, 300);
          });
      });
    }

    return this.errorMessage;
  }
}
