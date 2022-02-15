import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { apiRequestError } from 'src/app/models/apiRequestError';
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
  showErrorAlert = false;
  showSuccessAlert = false;
  apiRequestError: apiRequestError = {
    error: {
      text: '',
    },
    name: '',
    message: '',
    status: 0,
    url: '',
  };
  apiSuccessResponse = '';
  apiErrorResponse: string = '';

  newEmployee: Employee = {
    username: '',
    email: '',
    password: '',
    type: '',
    workLogList: [],
  };
  errorMessage!: string;
  formSubmitted: Boolean = false;
  showAddEmployeeForm: Boolean = false;
  updatedEmployee!: Employee;
  services!: string | string[];
  showEditEmployeeForm: Boolean = false;
  processingNetworkRequest: Boolean = false;
  loading: boolean = false;
  employees: Employee[] = [
   
  ];
  ht: any;
  wageHoursPrice: any;
  newWageHoursPrice: any;

  constructor(
    private cd: ChangeDetectorRef,
    private httpEmployeeService: HttpService,
    private authService: AuthenticationService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.loading = true;
    this.httpEmployeeService.getEmployee().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.data && response.status === 200) {
          this.employees = response.data;
        } else {
          this.showApiErrorResponse(response.message);
        }

        this.loading = false;
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
       this.httpEmployeeService.getWageHoursPrice().subscribe({
         next: (response: any) => {
           if (response.data && response.status === 200) {
             console.log(response);
             this.wageHoursPrice = response.data;
             this.newWageHoursPrice = response.data;
           } else {
             this.showApiErrorResponse(response.message);
           }
           this.loading = false;
         },
         error: (error: any) => {
           this.showApiErrorResponse();
         },
       });
  }

  onSubmit(event: any, form: NgForm) {
    event.preventDefault();
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
          this.httpEmployeeService.addEmployee(this.newEmployee).subscribe({
            next: (response: any) => {
              if (response.status === 200) {
                this.authService
                  .signUp(email, password, type, username)
                  .then(
                    () => {
                      this.newEmployee.employeeId = response.data.employeeId;
                      this.employees.push({ ...this.newEmployee });
                      this.showApiSuccessResponse(response.message);
                      this.errorMessage = '';
                      this.showAddEmployeeForm = false;
                      this.formSubmitted = true;
                      form.resetForm();

                      this.processingNetworkRequest = false;
                    },
                    (error: any) => {
                      this.showApiErrorResponse(error);
                    }
                  )
                  .catch((_error: string) => {
                    this.errorMessage = _error;
                    this.showApiErrorResponse(this.errorMessage);
                  });
              } else {
                this.showApiErrorResponse(response.message);
              }
            },
            error: (error: any) => {
              this.showApiErrorResponse();
            },
          });
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
    this.updatedEmployee = { ...employee };

    setTimeout(() => {
      this.showEditEmployeeForm = true;
      this.cd.markForCheck();
    }, 250);
    console.log('edit', employee);
  }

  onDeleteEmployee(id: any, employee: Employee) {
    console.log('delete', id, employee);
    this.processingNetworkRequest = true;
    this.httpEmployeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log('response', response);
        if (response.status === 200) {
          this.authService
            .deleteEmployeeInFirebase(employee.email)
            .finally(() => {
              this.showApiSuccessResponse(response.message);
              this.employees = this.employees.filter(
                (e) => e.employeeId !== employee.employeeId
              );
            })
            .catch((errorMsg: string) => {
              this.showApiErrorResponse(errorMsg);
            });
        } else {
          this.showApiErrorResponse(response.message);
        }
        this.processingNetworkRequest = false;
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
  }

  onUpdateEmployee(updatedEmployee: Employee, event: any) {
    event.preventDefault();
    let updateEmployee = { ...updatedEmployee };
    this.processingNetworkRequest = true;

    this.errorMessage = '';

    if (
      !this.updatedEmployee.username ||
      this.updatedEmployee.username.trim().length === 0 ||
      !this.updatedEmployee.email ||
      this.updatedEmployee.email.trim().length === 0 ||
      !this.updatedEmployee.password ||
      this.updatedEmployee.password.trim().length < 6
    ) {
      this.errorMessage =
        'Please enter correct fields , All fields are necessary';
      this.processingNetworkRequest = false;
      return this.errorMessage;
    } else {
      this.httpEmployeeService.updateEmployee(updateEmployee).subscribe({
        next: (response: any) => {
          if (response.data && response.status === 200) {
            this.employees = this.employees.map((employee: Employee) => {
              if (employee.employeeId == updatedEmployee.employeeId) {
                employee = updatedEmployee;
              }
              return employee;
            });
            this.showApiSuccessResponse(response.message);
            this.showEditEmployeeForm = false;
            this.formSubmitted = true;
            this.processingNetworkRequest = false;
          } else {
            this.showApiErrorResponse(response.message);
          }
        },
        error: (error: any) => {
          this.showApiErrorResponse();
        },
      });
    }

    return this.errorMessage;
  }

  getEmployeeById(id: any) {
    this.httpEmployeeService.getEmployeeById(20).subscribe((response: any) => {
      if (response.data && response.status === 200) {
        this.showApiSuccessResponse(response.message);
        console.log('getEmployeeById', response);
      } else {
        this.showApiErrorResponse(response.message);
      }
      (error: any) => {
        this.showApiErrorResponse();
      };
    });
  }

  showApiErrorResponse(message?: any) {
    if (message) {
      this.apiErrorResponse = message;
    } else {
      this.apiErrorResponse =
        'Error! an error has occurred please try again later';
    }
    this.showErrorAlert = true;
    this.processingNetworkRequest = false;

    setTimeout(() => {
      this.showErrorAlert = false;
      this.loading = false;
    }, 3500);
  }

  showApiSuccessResponse(message: string) {
    this.apiSuccessResponse = message;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3500);
  }
  fixDigitsAfterDecimal(value: number) {
    return parseFloat(value.toFixed(2));
  }

}
