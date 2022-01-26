import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../models/Budget';
import { Customer } from '../models/Customer';
import { Employee } from '../models/Employee';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Supplier } from '../models/Supplier';
import { WorkLog } from '../models/WorkLog';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private budgetApiUrl = 'http://localhost:8080/Budget';
  private customerApiUrl = 'http://localhost:8080/Customer';
  private employeeApiUrl = 'http://localhost:8080/Employee';
  private orderApiUrl = 'http://localhost:8080/Order';
  private productApiUrl = 'http://localhost:8080/Product';
  private supplierApiUrl = 'http://localhost:8080/Supplier';
  private workLogApiUrl = 'http://localhost:8080/WorkLog';

  private requestParams = new HttpParams();

  constructor(private http: HttpClient) {}

  getBudget(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.budgetApiUrl}/list`);
  }
  getBudgetById(id: number): Observable<Budget> {
    this.requestParams.append('Id', id);
    return this.http.get<Budget>(`${this.budgetApiUrl}`, {
      params: this.requestParams,
    });
  }
  addBudget(Budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.budgetApiUrl}/add`, Budget);
  }
  editBudget(Budget: Budget): Observable<Budget> {
    return this.http.put<any>(
      `${this.budgetApiUrl}/update`,
      Budget,
      httpOptions
    );
  }
  deleteBudget(id: number): Observable<Budget> {
    this.requestParams.append('Id', id);
    return this.http.delete<Budget>(`${this.budgetApiUrl}/delete`, {
      params: this.requestParams,
    });
  }
  getBudgetPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.budgetApiUrl}/exportToPDF`);
  }

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.customerApiUrl}/list`);
  }
  getCustomerById(id: number): Observable<Customer> {
    this.requestParams.append('Id', id);
    return this.http.get<Customer>(`${this.customerApiUrl}`, {
      params: this.requestParams,
    });
  }
  addCustomer(Customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.customerApiUrl}/add`, Customer);
  }
  editCustomer(Customer: Customer): Observable<Customer> {
    return this.http.put<any>(
      `${this.customerApiUrl}/update`,
      Customer,
      httpOptions
    );
  }
  deleteCustomer(id: number): Observable<Customer> {
    this.requestParams.append('Id', id);
    return this.http.delete<Customer>(`${this.customerApiUrl}/delete`, {
      params: this.requestParams,
    });
  }
  getCustomerPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.customerApiUrl}/exportToPDF`);
  }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderApiUrl}/list`);
  }
  getOrderById(id: number): Observable<Order> {
    this.requestParams.append('Id', id);
    return this.http.get<Order>(`${this.orderApiUrl}`, {
      params: this.requestParams,
    });
  }
  addOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.orderApiUrl}/add`, Order);
  }
  editOrder(Order: Order): Observable<Order> {
    return this.http.put<any>(`${this.orderApiUrl}/update`, Order, httpOptions);
  }
  deleteOrder(id: number): Observable<Order> {
    this.requestParams.append('Id', id);
    return this.http.delete<Order>(`${this.orderApiUrl}/delete`, {
      params: this.requestParams,
    });
  }
  getOrderPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.orderApiUrl}/exportToPDF`);
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeeApiUrl}/list`);
  }
  getEmployeeById(id: number): Observable<Employee> {
    this.requestParams.append('Id', id);
    return this.http.get<Employee>(`${this.employeeApiUrl}`, {
      params: this.requestParams,
    });
  }
  addEmployee(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeeApiUrl}/add`, Employee);
  }
  editEmployee(Employee: Employee): Observable<Employee> {
    return this.http.put<any>(
      `${this.employeeApiUrl}/update`,
      Employee,
      httpOptions
    );
  }
  deleteEmployee(id: number): Observable<Employee> {
    this.requestParams.append('Id', id);
    return this.http.delete<Employee>(`${this.employeeApiUrl}/delete`, {
      params: this.requestParams,
    });
  }
  getEmployeePdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.employeeApiUrl}/exportToPDF`);
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApiUrl}/list`);
  }
  getProductById(id: number): Observable<Product> {
    this.requestParams.append('Id', id);
    return this.http.get<Product>(`${this.productApiUrl}`, {
      params: this.requestParams,
    });
  }
  addProduct(Product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productApiUrl}/add`, Product);
  }
  editProduct(Product: Product): Observable<Product> {
    return this.http.put<any>(
      `${this.productApiUrl}/update`,
      Product,
      httpOptions
    );
  }
  deleteProduct(id: number): Observable<Product> {
    this.requestParams.append('Id', id);
    return this.http.delete<Product>(`${this.productApiUrl}/delete`, {
      params: this.requestParams,
    });
  }
  getProductPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.productApiUrl}/exportToPDF`);
  }

  getSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.supplierApiUrl}/list`);
  }
  getSupplierById(id: number): Observable<Supplier> {
    this.requestParams.append('Id', id);
    return this.http.get<Supplier>(`${this.supplierApiUrl}`, {
      params: this.requestParams,
    });
  }
  addSupplier(Supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.supplierApiUrl}/add`, Supplier);
  }
  editSupplier(Supplier: Supplier): Observable<Supplier> {
    return this.http.put<any>(
      `${this.supplierApiUrl}/update`,
      Supplier,
      httpOptions
    );
  }
  deleteSupplier(id: number): Observable<Supplier> {
    this.requestParams.append('Id', id);
    return this.http.delete<Supplier>(`${this.supplierApiUrl}/delete`, {
      params: this.requestParams,
    });
  }
  getSupplierPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.supplierApiUrl}/exportToPDF`);
  }

  getWorkLog(): Observable<WorkLog[]> {
    return this.http.get<WorkLog[]>(`${this.workLogApiUrl}/list`);
  }
  getWorkLogById(id: number): Observable<WorkLog> {
    this.requestParams.append('Id', id);
    return this.http.get<WorkLog>(`${this.workLogApiUrl}`, {
      params: this.requestParams,
    });
  }
  addWorkLog(WorkLog: WorkLog): Observable<WorkLog> {
    return this.http.post<WorkLog>(`${this.workLogApiUrl}/add`, WorkLog);
  }
  editWorkLog(WorkLog: WorkLog): Observable<WorkLog> {
    return this.http.put<any>(
      `${this.workLogApiUrl}/update`,
      WorkLog,
      httpOptions
    );
  }
  deleteWorkLog(id: number): Observable<WorkLog> {
    this.requestParams.append('Id', id);
    return this.http.delete<WorkLog>(`${this.workLogApiUrl}/delete`, {
      params: this.requestParams,
    });
  }
  getWorkLogPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.workLogApiUrl}/exportToPDF`);
  }
}
