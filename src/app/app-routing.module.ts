import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { WorklogComponent } from './worklog/worklog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'employees', component: AdminComponent },
  { path: 'budgets', component: AdminComponent },
  { path: 'officer', component: AdminComponent },
  { path: 'assitant', component: AssistantComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'budgets', component: BudgetsComponent },
    ],
  },
  {
    path: 'assistant',
    component: AssistantComponent,
    children: [
      { path: 'workLog', component: WorklogComponent }
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
