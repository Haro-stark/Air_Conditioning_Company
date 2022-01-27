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

  constructor(private http: HttpClient) {}

  getBudget(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.budgetApiUrl}/list`);
  }
  getBudgetById(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.budgetApiUrl}`, {
      params: { Id: id },
    });
  }
  addBudget(Budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.budgetApiUrl}/add`, Budget);
  }
  updateBudget(Budget: Budget): Observable<Budget> {
    return this.http.put<any>(
      `${this.budgetApiUrl}/update`,
      Budget,
      httpOptions
    );
  }
  deleteBudget(id: number): Observable<Budget> {
    return this.http.delete<Budget>(`${this.budgetApiUrl}/delete`, {
      params: { Id: id },
    });
  }
  getBudgetPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.budgetApiUrl}/exportToPDF`, {
      params: { Id: id },
    });
  }

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.customerApiUrl}/list`);
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.customerApiUrl}`, {
      responseType: 'text' as 'json',
      params: { Id: id },
    });
  }
  addCustomer(Customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.customerApiUrl}/add`, Customer);
  }
  updateCustomer(Customer: Customer): Observable<Customer> {
    return this.http.put<any>(
      `${this.customerApiUrl}/update`,
      Customer,
      httpOptions
    );
  }
  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.customerApiUrl}/delete`, {
      responseType: 'text' as 'json',
      params: { Id: id },
    });
  }
  getCustomerPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.customerApiUrl}/exportToPDF`);
  }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderApiUrl}/list`);
  }
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.orderApiUrl}`, {
      params: { Id: id },
      responseType: 'text' as 'json',
    });
  }
  addOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.orderApiUrl}/add`, Order);
  }
  updateOrder(Order: Order): Observable<Order> {
    return this.http.put<any>(`${this.orderApiUrl}/update`, Order, httpOptions);
  }
  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.orderApiUrl}/delete`, {
      params: { Id: id },
      responseType: 'text' as 'json',
    });
  }
  getOrderPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.orderApiUrl}/exportToPDF`);
  }

  getEmployee(): Observable<any> {
    return this.http.get<any>(`${this.employeeApiUrl}/list`);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeeApiUrl}/getByID`, {
      params: { Id: id },
      responseType: 'text' as 'json',
    });
  }
  addEmployee(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeeApiUrl}/add`, Employee);
  }
  updateEmployee(Employee: Employee): Observable<Employee> {
    return this.http.put<any>(
      `${this.employeeApiUrl}/update`,
      Employee,
      httpOptions
    );
  }
  deleteEmployee(id: number): Observable<any> {
    const httpOptions: Object = {
      params: { Id: id },
    };
    return this.http.delete<any>(`${this.employeeApiUrl}/delet`, httpOptions);
  }
  getEmployeePdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.employeeApiUrl}/exportToPDF`);
  }

  getProduct(): Observable<any> {
    return this.http.get<any>(`${this.productApiUrl}/list`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productApiUrl}`, {
      params: { Id: id },
    });
  }
  addProduct(Product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productApiUrl}/add`, Product);
  }
  updateProduct(Product: Product): Observable<Product> {
    return this.http.put<any>(
      `${this.productApiUrl}/update`,
      Product,
      httpOptions
    );
  }
  deleteProduct(id: number): Observable<Product> {
    const httpOptions: Object = {
      responseType: 'text' as 'text',
      params: { Id: id },
    };
    return this.http.delete<Product>(
      `${this.productApiUrl}/delete`,
      httpOptions
    );
  }
  getProductPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.productApiUrl}/exportToPDF`);
  }

  getSupplier(): Observable<any> {
    return this.http.get<any>(`${this.supplierApiUrl}/list`);
  }
  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.supplierApiUrl}`, {
      params: { Id: id },
    });
  }
  addSupplier(Supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.supplierApiUrl}/add`, Supplier);
  }
  updateSupplier(Supplier: Supplier): Observable<Supplier> {
    return this.http.put<any>(
      `${this.supplierApiUrl}/update`,
      Supplier,
      httpOptions
    );
  }
  deleteSupplier(id: number): Observable<Supplier> {
    const httpOptions: Object = {
      responseType: 'text' as 'text',
      params: { Id: id },
    };
    return this.http.delete<Supplier>(
      `${this.supplierApiUrl}/delete`,
      httpOptions
    );
  }
  getSupplierPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.supplierApiUrl}/exportToPDF`, {
      params: { Id: id },
    });
  }

  buySupplierProducts(
    Supplier: Supplier,
    quantity: number
  ): Observable<Supplier> {
    return this.http.post<Supplier>(
      `${this.supplierApiUrl}/buyProductFromSupplier`,
      Supplier,
      { params: { quantity: quantity } }
    );
  }

  getWorkLog(email: string): Observable<WorkLog[]> {
    return this.http.get<WorkLog[]>(`${this.employeeApiUrl}/emailWorkLog`);
  }
  getWorkLogById(id: number): Observable<WorkLog> {
    return this.http.get<WorkLog>(`${this.workLogApiUrl}`, {
      params: { Id: id },
    });
  }
  addWorkLog(WorkLog: WorkLog): Observable<WorkLog> {
    return this.http.post<WorkLog>(`${this.workLogApiUrl}/add`, WorkLog);
  }
  updateWorkLog(WorkLog: WorkLog): Observable<WorkLog> {
    return this.http.put<any>(
      `${this.workLogApiUrl}/update`,
      WorkLog,
      httpOptions
    );
  }
  deleteWorkLog(id: number): Observable<WorkLog> {
    const httpOptions: Object = {
      responseType: 'text' as 'text',
      params: { Id: id },
    };
    return this.http.delete<WorkLog>(
      `${this.workLogApiUrl}/delete`,
      httpOptions
    );
  }
  getWorkLogPdf(id: number): Observable<any> {
    return this.http.get<any>(`${this.workLogApiUrl}/exportToPDF`, {
      params: { Id: id },
    });
  }
}
