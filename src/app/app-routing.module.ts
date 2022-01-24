import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { BudgetsComponent } from './shared/budgets/budgets.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { SuppliersComponent } from './admin/suppliers/suppliers.component';

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
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'budgets', component: BudgetsComponent },
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
export class AppRoutingModule {}
