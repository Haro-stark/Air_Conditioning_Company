import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminGuardGuard } from './cores/guards/admin-guard.guard';
import { AssistantGuardGuard } from './cores/guards/assistant-guard.guard';
import { OfficerGuardGuard } from './cores/guards/officer-guard.guard';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { OfficerComponent } from './officer/officer.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { AuthenticationService } from './service/authentication.service';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { WorklogComponent } from './worklog/worklog.component';
import { BudgetsComponent } from './shared/budgets/budgets.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardGuard],
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'budgets', component: BudgetsComponent },
      { path: 'workLog', component: WorklogComponent }
    ],
  },
  {
    path: 'officer',
    component: OfficerComponent,
    canActivate: [OfficerGuardGuard],
    children: [
      { path: 'budgets', component: BudgetsComponent },
      { path: 'workLog', component: WorklogComponent }
    ],
  },
  {
    path: 'assistant',
    component: AssistantComponent,
    canActivate: [AssistantGuardGuard],
    children: [
      { path: 'workLog', component: WorklogComponent }
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthenticationService
  ]
})
export class AppRoutingModule { }
